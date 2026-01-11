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
import { Briefcase, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

const OfficialLogin: React.FC = () => {
  const { language } = useLanguage();
  const { login, role, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated based on role
  React.useEffect(() => {
    if (isAuthenticated && role) {
      navigate(role === 'official' ? '/official/dashboard' : '/citizen/dashboard');
    }
  }, [isAuthenticated, role, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      // Check role after login
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
          <Card variant="elevated" className="animate-fade-in border-accent/20">
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Briefcase className="h-8 w-8 text-accent-foreground" />
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <ShieldCheck className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium text-accent">
                  {language === 'mr' ? 'अधिकारी पोर्टल' : 'Official Portal'}
                </span>
              </div>
              <CardTitle className="text-2xl">
                {language === 'mr' ? 'शासकीय अधिकारी लॉगिन' : 'Government Official Login'}
              </CardTitle>
              <CardDescription>
                {language === 'mr' ? 'आपल्या अधिकारी खात्यात साइन इन करा' : 'Sign in to your official account'}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    {language === 'mr' ? 'अधिकृत ईमेल' : 'Official Email'}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="official@gov.in"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">
                      {language === 'mr' ? 'पासवर्ड' : 'Password'}
                    </Label>
                    <a href="#" className="text-xs text-accent hover:underline">
                      {language === 'mr' ? 'पासवर्ड विसरलात?' : 'Forgot password?'}
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
                  variant="accent"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                      {language === 'mr' ? 'लोड होत आहे...' : 'Loading...'}
                    </span>
                  ) : (
                    <>
                      {language === 'mr' ? 'साइन इन करा' : 'Sign In'}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                {language === 'mr' ? 'नवीन अधिकारी?' : 'New official?'}{' '}
                <Link to="/official/register" className="text-accent font-medium hover:underline">
                  {language === 'mr' ? 'नोंदणी करा' : 'Register'}
                </Link>
              </div>

              <div className="mt-4 pt-4 border-t border-border text-center">
                <Link to="/login" className="text-sm text-muted-foreground hover:text-primary">
                  {language === 'mr' ? '← नागरिक लॉगिन' : '← Citizen Login'}
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

export default OfficialLogin;
