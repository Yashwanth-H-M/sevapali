import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { User, Briefcase, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const { t, language } = useLanguage();
  const { login, selectedRole, setSelectedRole } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    setIsLoading(true);
    try {
      await login(email, password, selectedRole);
      toast.success(language === 'mr' ? 'लॉगिन यशस्वी!' : 'Login successful!');
      navigate(selectedRole === 'citizen' ? '/citizen/dashboard' : '/official/dashboard');
    } catch (error) {
      toast.error(language === 'mr' ? 'लॉगिन अयशस्वी' : 'Login failed');
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
                <h1 className="text-3xl font-bold text-foreground mb-2">{t.login.title}</h1>
                <p className="text-muted-foreground">{t.login.subtitle}</p>
              </div>

              <div className="grid gap-4">
                <Card
                  variant="interactive"
                  className="border-2 hover:border-primary"
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
                  className="border-2 hover:border-accent"
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
            </div>
          ) : (
            // Login Form
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
                  {language === 'mr' ? 'आपल्या खात्यात साइन इन करा' : 'Sign in to your account'}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <form onSubmit={handleLogin} className="space-y-4">
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
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">{t.login.password}</Label>
                      <a href="#" className="text-xs text-primary hover:underline">
                        {t.login.forgotPassword}
                      </a>
                    </div>
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
                        {t.login.signIn}
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                  {t.login.noAccount}{' '}
                  <a href="#" className="text-primary font-medium hover:underline">
                    {t.login.register}
                  </a>
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

export default Login;
