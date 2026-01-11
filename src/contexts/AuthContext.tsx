import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

export type UserRole = 'citizen' | 'official' | null;

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  phone: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  selectedRole: UserRole;
  setSelectedRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  const fetchProfile = async (userId: string) => {
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    
    setProfile(profileData);
  };

  const fetchRole = async (userId: string) => {
    const { data: roleData, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Failed to fetch role:', error);
      setRole(null);
      return;
    }

    setRole((roleData?.role as UserRole) ?? null);
  };

  const ensureAppRecords = async (u: User) => {
    const desiredRole = (u.user_metadata?.role as UserRole) ?? 'citizen';
    const fullName = (u.user_metadata?.full_name as string | undefined) ?? null;

    // Best-effort: if rows already exist this is a no-op due to onConflict.
    await Promise.all([
      supabase.from('profiles').upsert(
        {
          user_id: u.id,
          full_name: fullName,
        },
        { onConflict: 'user_id' }
      ),
      supabase.from('user_roles').upsert(
        {
          user_id: u.id,
          role: desiredRole === 'official' ? 'official' : 'citizen',
        },
        { onConflict: 'user_id' }
      ),
    ]);
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Use setTimeout to avoid potential deadlock with Supabase client
          setTimeout(async () => {
            await ensureAppRecords(session.user);
            await Promise.all([
              fetchProfile(session.user.id),
              fetchRole(session.user.id),
            ]);
            setIsLoading(false);
          }, 0);
        } else {
          setProfile(null);
          setRole(null);
          setIsLoading(false);
        }
      }
    );

    // THEN check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        setTimeout(async () => {
          await ensureAppRecords(session.user);
          await Promise.all([
            fetchProfile(session.user.id),
            fetchRole(session.user.id),
          ]);
          setIsLoading(false);
        }, 0);
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
  };

  const register = async (email: string, password: string, fullName: string, role: UserRole) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          full_name: fullName,
          role,
        },
      },
    });

    if (error) throw error;

    // IMPORTANT: create app-side records (profiles + user_roles)
    // We rely on DB RLS (auth.uid() = user_id) for safety.
    const userId = data.user?.id;
    if (!userId) return;

    const desiredRole: Exclude<UserRole, null> = role ?? 'citizen';

    const [{ error: profileError }, { error: roleError }] = await Promise.all([
      supabase
        .from('profiles')
        .upsert(
          {
            user_id: userId,
            full_name: fullName || null,
          },
          { onConflict: 'user_id' }
        ),
      supabase
        .from('user_roles')
        .upsert(
          {
            user_id: userId,
            role: desiredRole,
          },
          { onConflict: 'user_id' }
        ),
    ]);

    if (profileError) throw profileError;
    if (roleError) throw roleError;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setSelectedRole(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      role,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      selectedRole,
      setSelectedRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
