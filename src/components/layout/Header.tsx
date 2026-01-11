import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, Globe, LogOut, User } from 'lucide-react';

const Header: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const isLandingPage = location.pathname === '/';
  const isDashboard = location.pathname.includes('/dashboard');

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'mr' : 'en');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isLandingPage ? 'bg-transparent' : 'bg-card/95 backdrop-blur-xl border-b border-border/50 shadow-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold text-lg">स</span>
            </div>
            <div className="hidden sm:block">
              <h1 className={`font-bold text-lg ${isLandingPage ? 'text-primary-foreground' : 'text-foreground'}`}>
                SevaPali
              </h1>
              <p className={`text-xs ${isLandingPage ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                {language === 'mr' ? 'सेवापाली' : 'Digital Token System'}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className={`text-sm font-medium transition-colors hover:text-accent ${
              isLandingPage ? 'text-primary-foreground/90' : 'text-foreground'
            }`}>
              {t.nav.home}
            </Link>
            <Link to="/schemes" className={`text-sm font-medium transition-colors hover:text-accent ${
              isLandingPage ? 'text-primary-foreground/90' : 'text-foreground'
            }`}>
              {t.nav.schemes}
            </Link>
            <Link to="/about" className={`text-sm font-medium transition-colors hover:text-accent ${
              isLandingPage ? 'text-primary-foreground/90' : 'text-foreground'
            }`}>
              {t.nav.about}
            </Link>
            <Link to="/feedback" className={`text-sm font-medium transition-colors hover:text-accent ${
              isLandingPage ? 'text-primary-foreground/90' : 'text-foreground'
            }`}>
              {t.nav.feedback}
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <Button
              variant={isLandingPage ? 'heroOutline' : 'ghost'}
              size="sm"
              onClick={toggleLanguage}
              className="gap-1.5"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{language === 'en' ? 'मराठी' : 'English'}</span>
            </Button>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link to={user?.role === 'citizen' ? '/citizen/dashboard' : '/official/dashboard'}>
                  <Button variant={isLandingPage ? 'heroOutline' : 'secondary'} size="sm">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{t.nav.dashboard}</span>
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  className={isLandingPage ? 'text-primary-foreground' : ''}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant={isLandingPage ? 'hero' : 'default'} size="sm">
                  {t.nav.login}
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden ${isLandingPage ? 'text-primary-foreground' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/20">
            <nav className="flex flex-col gap-2">
              <Link
                to="/"
                className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.home}
              </Link>
              <Link
                to="/schemes"
                className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.schemes}
              </Link>
              <Link
                to="/about"
                className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.about}
              </Link>
              <Link
                to="/feedback"
                className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.feedback}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
