import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Ticket,
  FileText,
  MessageCircle,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Globe,
  ChevronRight,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { t, language, setLanguage } = useLanguage();
  const { user, profile, role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isCitizen = role === 'citizen';
  const basePath = isCitizen ? '/citizen' : '/official';

  const citizenMenuItems = [
    { icon: LayoutDashboard, label: language === 'mr' ? 'डॅशबोर्ड' : 'Dashboard', path: `${basePath}/dashboard` },
    { icon: Ticket, label: language === 'mr' ? 'टोकन बुक करा' : 'Book Token', path: `${basePath}/book-token` },
    { icon: FileText, label: language === 'mr' ? 'माझे टोकन' : 'My Tokens', path: `${basePath}/my-tokens` },
    { icon: MessageCircle, label: language === 'mr' ? 'AI सहाय्यक' : 'AI Assistant', path: `${basePath}/assistant` },
    { icon: Bell, label: language === 'mr' ? 'सूचना' : 'Notifications', path: `${basePath}/notifications` },
  ];

  const officialMenuItems = [
    { icon: LayoutDashboard, label: language === 'mr' ? 'डॅशबोर्ड' : 'Dashboard', path: `${basePath}/dashboard` },
    { icon: Ticket, label: language === 'mr' ? 'रांग व्यवस्थापन' : 'Queue Management', path: `${basePath}/queue` },
    { icon: FileText, label: language === 'mr' ? 'विश्लेषण' : 'Analytics', path: `${basePath}/analytics` },
    { icon: Settings, label: language === 'mr' ? 'सेटिंग्ज' : 'Settings', path: `${basePath}/settings` },
  ];

  const menuItems = isCitizen ? citizenMenuItems : officialMenuItems;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'mr' : 'en');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border h-16 flex items-center px-4">
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex-1 flex items-center justify-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">स</span>
            </div>
            <span className="font-bold text-foreground">SevaPali</span>
          </Link>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleLanguage}>
          <Globe className="h-5 w-5" />
        </Button>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-foreground/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-screen w-72 bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-border">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
                <span className="text-primary-foreground font-bold text-lg">स</span>
              </div>
              <div>
                <h1 className="font-bold text-foreground">SevaPali</h1>
                <p className="text-xs text-muted-foreground">सेवापाली</p>
              </div>
            </Link>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
                {profile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{profile?.full_name || user?.email}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {isCitizen ? (language === 'mr' ? 'नागरिक' : 'Citizen') : (language === 'mr' ? 'अधिकारी' : 'Official')}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                      {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Schemes Link for Citizens */}
            {isCitizen && (
              <div className="mt-6 pt-6 border-t border-border">
                <Link
                  to="/schemes"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-accent hover:bg-accent/10 transition-colors"
                  onClick={() => setSidebarOpen(false)}
                >
                  <FileText className="h-5 w-5" />
                  <span className="font-medium">{language === 'mr' ? 'शासकीय योजना' : 'Government Schemes'}</span>
                </Link>
              </div>
            )}
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-border space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
              onClick={toggleLanguage}
            >
              <Globe className="h-5 w-5" />
              {language === 'en' ? 'मराठी' : 'English'}
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              {t.nav.logout}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 pt-16 lg:pt-0 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
