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
import { Briefcase, Mail, Lock, ArrowRight, ShieldCheck, UserCircle, Building } from 'lucide-react';
import { toast } from 'sonner';

const OfficialRegister: React.FC = () => {
  const { language } = useLanguage();
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

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
      await register(email, password, fullName, 'official');
      toast.success(language === 'mr' ? 'नोंदणी यशस्वी!' : 'Registration successful!');
      navigate('/official/dashboard');
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
                {language === 'mr' ? 'अधिकारी नोंदणी' : 'Official Registration'}
              </CardTitle>
              <CardDescription>
                {language === 'mr' ? 'नवीन अधिकारी खाते तयार करा' : 'Create a new official account'}
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
                  <Label htmlFor="department">
                    {language === 'mr' ? 'विभाग' : 'Department'}
                  </Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="department"
                      type="text"
                      placeholder={language === 'mr' ? 'विभागाचे नाव' : 'Department name'}
                      className="pl-10"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    />
                  </div>
                </div>
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
                  <Label htmlFor="password">
                    {language === 'mr' ? 'पासवर्ड' : 'Password'}
                  </Label>
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
                      {language === 'mr' ? 'नोंदणी करा' : 'Register'}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                {language === 'mr' ? 'आधीच खाते आहे?' : 'Already have an account?'}{' '}
                <Link to="/official/login" className="text-accent font-medium hover:underline">
                  {language === 'mr' ? 'साइन इन करा' : 'Sign In'}
                </Link>
              </div>

              <div className="mt-4 pt-4 border-t border-border text-center">
                <Link to="/register" className="text-sm text-muted-foreground hover:text-primary">
                  {language === 'mr' ? '← नागरिक नोंदणी' : '← Citizen Registration'}
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

export default OfficialRegister;
