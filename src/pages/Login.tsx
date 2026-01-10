import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { User, Briefcase, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const { t, language } = useLanguage();
  const { login, role, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated - citizen login always goes to citizen dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/citizen/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast.success(language === 'mr' ? 'लॉगिन यशस्वी!' : 'Login successful!');
    } catch (error: any) {
      toast.error(error.message || (language === 'mr' ? 'लॉगिन अयशस्वी' : 'Login failed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Header />
      
      <main className="container mx-auto px-4 pt-28 pb-20 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-lg">
          <Card variant="elevated" className="animate-fade-in">
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4 shadow-lg">
                <User className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">
                {language === 'mr' ? 'नागरिक लॉगिन' : 'Citizen Login'}
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
                <Link to="/register" className="text-primary font-medium hover:underline">
                  {t.login.register}
                </Link>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <Link to="/official/login">
                  <Button variant="outline" className="w-full" size="lg">
                    <Briefcase className="h-4 w-4 mr-2" />
                    {language === 'mr' ? 'शासकीय अधिकारी लॉगिन' : 'Government Official Login'}
                    <ShieldCheck className="h-4 w-4 ml-2 text-accent" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
