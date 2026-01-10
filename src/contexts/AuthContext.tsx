import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'citizen' | 'official' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  selectedRole: UserRole;
  setSelectedRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  const login = async (email: string, password: string, role: UserRole) => {
    // Simulate login - in production, this would call the backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUser({
      id: '1',
      name: role === 'citizen' ? 'राहुल शर्मा' : 'अधिकारी पाटील',
      email,
      role,
      phone: '+91 9876543210',
    });
  };

  const logout = () => {
    setUser(null);
    setSelectedRole(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
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
