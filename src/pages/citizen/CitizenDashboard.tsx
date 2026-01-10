import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  Ticket,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  MapPin,
  Calendar,
  Bot,
  TrendingUp,
} from 'lucide-react';

const CitizenDashboard: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();

  // Mock data
  const stats = [
    {
      label: language === 'mr' ? 'सक्रिय टोकन' : 'Active Tokens',
      value: '2',
      icon: Ticket,
      color: 'bg-primary',
      trend: '+1 today',
    },
    {
      label: language === 'mr' ? 'सरासरी प्रतीक्षा' : 'Avg. Wait Time',
      value: '25 min',
      icon: Clock,
      color: 'bg-accent',
      trend: '-5 min',
    },
    {
      label: language === 'mr' ? 'पूर्ण झाले' : 'Completed',
      value: '12',
      icon: CheckCircle,
      color: 'bg-success',
      trend: 'This month',
    },
    {
      label: language === 'mr' ? 'रांगेत' : 'In Queue',
      value: '1',
      icon: AlertCircle,
      color: 'bg-warning',
      trend: 'Position #4',
    },
  ];

  const activeTokens = [
    {
      id: 'TK-2025-001234',
      office: language === 'mr' ? 'आरटीओ पुणे' : 'RTO Pune',
      service: language === 'mr' ? 'वाहन नोंदणी' : 'Vehicle Registration',
      date: '10 Jan 2025',
      time: '10:30 AM',
      position: 4,
      estimatedWait: 25,
      status: 'active',
    },
    {
      id: 'TK-2025-001235',
      office: language === 'mr' ? 'तहसील कार्यालय' : 'Tahsil Office',
      service: language === 'mr' ? '७/१२ उतारा' : '7/12 Extract',
      date: '11 Jan 2025',
      time: '11:00 AM',
      position: null,
      estimatedWait: null,
      status: 'upcoming',
    },
  ];

  const quickActions = [
    {
      label: language === 'mr' ? 'नवीन टोकन बुक करा' : 'Book New Token',
      icon: Ticket,
      path: '/citizen/book-token',
      color: 'bg-primary',
    },
    {
      label: language === 'mr' ? 'AI सहाय्यक' : 'AI Assistant',
      icon: Bot,
      path: '/citizen/assistant',
      color: 'bg-accent',
    },
    {
      label: language === 'mr' ? 'शासकीय योजना' : 'Government Schemes',
      icon: TrendingUp,
      path: '/schemes',
      color: 'bg-success',
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {language === 'mr' ? 'नमस्कार' : 'Welcome'}, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'mr'
                ? 'आजची तुमची रांग स्थिती येथे आहे'
                : "Here's your queue status for today"}
            </p>
          </div>
          <Link to="/citizen/book-token">
            <Button variant="hero" size="lg">
              <Ticket className="h-5 w-5" />
              {language === 'mr' ? 'नवीन टोकन' : 'New Token'}
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} variant="stat">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
                  </div>
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${stat.color} flex items-center justify-center shadow-md`}>
                    <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Active Tokens */}
          <div className="lg:col-span-2">
            <Card variant="elevated">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {language === 'mr' ? 'माझे टोकन' : 'My Tokens'}
                  </CardTitle>
                  <Link to="/citizen/my-tokens">
                    <Button variant="ghost" size="sm">
                      {language === 'mr' ? 'सर्व पहा' : 'View All'}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeTokens.map((token) => (
                  <div
                    key={token.id}
                    className="p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={token.status === 'active' ? 'success' : 'secondary'}>
                            {token.status === 'active'
                              ? (language === 'mr' ? 'सक्रिय' : 'Active')
                              : (language === 'mr' ? 'आगामी' : 'Upcoming')}
                          </Badge>
                          <span className="text-sm font-mono text-muted-foreground">{token.id}</span>
                        </div>
                        <h3 className="font-semibold text-foreground">{token.service}</h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {token.office}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {token.date}, {token.time}
                          </span>
                        </div>
                      </div>
                      {token.status === 'active' && token.position && (
                        <div className="flex items-center gap-4">
                          <div className="text-center px-4 py-2 bg-primary/10 rounded-xl">
                            <p className="text-2xl font-bold text-primary">#{token.position}</p>
                            <p className="text-xs text-muted-foreground">
                              {language === 'mr' ? 'रांगेत' : 'In Queue'}
                            </p>
                          </div>
                          <div className="text-center px-4 py-2 bg-accent/10 rounded-xl">
                            <p className="text-2xl font-bold text-accent">{token.estimatedWait}</p>
                            <p className="text-xs text-muted-foreground">
                              {language === 'mr' ? 'मिनिटे' : 'min wait'}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card variant="elevated">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  {language === 'mr' ? 'द्रुत क्रिया' : 'Quick Actions'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => (
                  <Link key={index} to={action.path}>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer group">
                      <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center shadow-md`}>
                        <action.icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <span className="font-medium text-foreground flex-1">{action.label}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* AI Assistant Preview */}
            <Card variant="glass" className="mt-6 bg-gradient-to-br from-accent/5 to-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-lg">
                    <Bot className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {language === 'mr' ? 'AI सहाय्यक' : 'AI Assistant'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {language === 'mr' ? 'मराठीत बोला' : 'Speak in Marathi'}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {language === 'mr'
                    ? 'प्रश्न विचारा, योजना शोधा, किंवा मदत घ्या.'
                    : 'Ask questions, find schemes, or get help.'}
                </p>
                <Link to="/citizen/assistant">
                  <Button variant="accent" className="w-full">
                    {language === 'mr' ? 'सुरू करा' : 'Start Chat'}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CitizenDashboard;
