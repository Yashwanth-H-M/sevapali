import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Users, Ticket, Clock, TrendingUp, Play, SkipForward, CheckCircle } from 'lucide-react';

const OfficialDashboard: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();

  const stats = [
    { label: language === 'mr' ? 'आजचे टोकन' : 'Today\'s Tokens', value: '156', icon: Ticket, color: 'bg-primary' },
    { label: language === 'mr' ? 'सेवित' : 'Served', value: '89', icon: CheckCircle, color: 'bg-success' },
    { label: language === 'mr' ? 'प्रतीक्षारत' : 'Waiting', value: '67', icon: Clock, color: 'bg-warning' },
    { label: language === 'mr' ? 'सरासरी वेळ' : 'Avg. Time', value: '12 min', icon: TrendingUp, color: 'bg-accent' },
  ];

  const currentQueue = [
    { token: 'TK-089', name: 'राहुल शर्मा', service: language === 'mr' ? 'वाहन नोंदणी' : 'Vehicle Registration', wait: '5 min' },
    { token: 'TK-090', name: 'प्रिया पाटील', service: language === 'mr' ? 'परवाना नूतनीकरण' : 'License Renewal', wait: '12 min' },
    { token: 'TK-091', name: 'अमित देशमुख', service: language === 'mr' ? 'वाहन हस्तांतरण' : 'Vehicle Transfer', wait: '18 min' },
  ];

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {language === 'mr' ? 'नमस्कार' : 'Welcome'}, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground">{language === 'mr' ? 'रांग व्यवस्थापन डॅशबोर्ड' : 'Queue Management Dashboard'}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} variant="stat">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card variant="elevated">
          <CardHeader>
            <CardTitle>{language === 'mr' ? 'वर्तमान रांग' : 'Current Queue'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentQueue.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-4">
                  <Badge variant={i === 0 ? 'success' : 'secondary'}>{item.token}</Badge>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.service}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{item.wait}</span>
                  {i === 0 && (
                    <div className="flex gap-1">
                      <Button size="sm" variant="success"><Play className="h-4 w-4" /></Button>
                      <Button size="sm" variant="ghost"><SkipForward className="h-4 w-4" /></Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default OfficialDashboard;
