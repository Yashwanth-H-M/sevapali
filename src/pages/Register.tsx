import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { User, Briefcase, Mail, Lock, ArrowRight, ArrowLeft, UserCircle } from 'lucide-react';
import { toast } from 'sonner';

const Register: React.FC = () => {
  const { t, language } = useLanguage();
  const { register, selectedRole, setSelectedRole } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    if (password !== confirmPassword) {
      toast.error(language === 'mr' ? 'पासवर्ड जुळत नाहीत' : 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error(language === 'mr' ? 'पासवर्ड किमान 6 अक्षरांचा असावा' : 'Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      await register(email, password, fullName, selectedRole);
      toast.success(language === 'mr' ? 'नोंदणी यशस्वी!' : 'Registration successful!');
      navigate(selectedRole === 'citizen' ? '/citizen/dashboard' : '/official/dashboard');
    } catch (error: any) {
      toast.error(error.message || (language === 'mr' ? 'नोंदणी अयशस्वी' : 'Registration failed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Header />
      
      <main className="container mx-auto px-4 pt-28 pb-20 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-lg">
          {!selectedRole ? (
            // Role Selection
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-primary-foreground font-bold text-2xl">स</span>
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {language === 'mr' ? 'नवीन खाते तयार करा' : 'Create New Account'}
                </h1>
                <p className="text-muted-foreground">
                  {language === 'mr' ? 'तुमची भूमिका निवडा' : 'Select your role'}
                </p>
              </div>

              <div className="grid gap-4">
                <Card
                  variant="interactive"
                  className="border-2 hover:border-primary cursor-pointer"
                  onClick={() => handleRoleSelect('citizen')}
                >
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <User className="h-7 w-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">{t.login.citizen}</h3>
                      <p className="text-sm text-muted-foreground">{t.login.citizenDesc}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>

                <Card
                  variant="interactive"
                  className="border-2 hover:border-accent cursor-pointer"
                  onClick={() => handleRoleSelect('official')}
                >
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Briefcase className="h-7 w-7 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">{t.login.official}</h3>
                      <p className="text-sm text-muted-foreground">{t.login.officialDesc}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                {language === 'mr' ? 'आधीच खाते आहे?' : 'Already have an account?'}{' '}
                <Link to="/login" className="text-primary font-medium hover:underline">
                  {language === 'mr' ? 'साइन इन करा' : 'Sign In'}
                </Link>
              </div>
            </div>
          ) : (
            // Registration Form
            <Card variant="elevated" className="animate-fade-in">
              <CardHeader className="text-center pb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-4 top-4"
                  onClick={() => setSelectedRole(null)}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  {language === 'mr' ? 'मागे' : 'Back'}
                </Button>
                <div className={`w-14 h-14 rounded-xl ${selectedRole === 'citizen' ? 'bg-primary' : 'bg-accent'} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  {selectedRole === 'citizen' ? (
                    <User className="h-7 w-7 text-primary-foreground" />
                  ) : (
                    <Briefcase className="h-7 w-7 text-accent-foreground" />
                  )}
                </div>
                <CardTitle className="text-2xl">
                  {selectedRole === 'citizen' ? t.login.citizen : t.login.official}
                </CardTitle>
                <CardDescription>
                  {language === 'mr' ? 'नवीन खाते तयार करा' : 'Create a new account'}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">
                      {language === 'mr' ? 'पूर्ण नाव' : 'Full Name'}
                    </Label>
                    <div className="relative">
                      <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder={language === 'mr' ? 'तुमचे नाव' : 'Your name'}
                        className="pl-10"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.login.email}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">{t.login.password}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      {language === 'mr' ? 'पासवर्ड पुष्टी करा' : 'Confirm Password'}
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    variant={selectedRole === 'citizen' ? 'default' : 'accent'}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        {t.common.loading}
                      </span>
                    ) : (
                      <>
                        {language === 'mr' ? 'नोंदणी करा' : 'Register'}
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                  {language === 'mr' ? 'आधीच खाते आहे?' : 'Already have an account?'}{' '}
                  <Link to="/login" className="text-primary font-medium hover:underline">
                    {language === 'mr' ? 'साइन इन करा' : 'Sign In'}
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
