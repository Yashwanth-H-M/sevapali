import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Play, 
  SkipForward, 
  Pause, 
  CheckCircle, 
  Clock, 
  Users,
  Ticket,
  Volume2,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';

interface QueueItem {
  id: string;
  token: string;
  name: string;
  service: string;
  waitTime: string;
  status: 'waiting' | 'serving' | 'completed' | 'skipped';
}

const QueueManagement: React.FC = () => {
  const { language } = useLanguage();
  
  const [queue, setQueue] = useState<QueueItem[]>([
    { id: '1', token: 'TK-089', name: 'राहुल शर्मा', service: language === 'mr' ? 'वाहन नोंदणी' : 'Vehicle Registration', waitTime: '5 min', status: 'serving' },
    { id: '2', token: 'TK-090', name: 'प्रिया पाटील', service: language === 'mr' ? 'परवाना नूतनीकरण' : 'License Renewal', waitTime: '12 min', status: 'waiting' },
    { id: '3', token: 'TK-091', name: 'अमित देशमुख', service: language === 'mr' ? 'वाहन हस्तांतरण' : 'Vehicle Transfer', waitTime: '18 min', status: 'waiting' },
    { id: '4', token: 'TK-092', name: 'सुनीता जाधव', service: language === 'mr' ? 'डुप्लिकेट परवाना' : 'Duplicate License', waitTime: '25 min', status: 'waiting' },
    { id: '5', token: 'TK-093', name: 'विकास कुलकर्णी', service: language === 'mr' ? 'पत्ता बदल' : 'Address Change', waitTime: '32 min', status: 'waiting' },
  ]);

  const [currentServing, setCurrentServing] = useState<string | null>('TK-089');

  const stats = [
    { label: language === 'mr' ? 'एकूण रांगेत' : 'Total in Queue', value: queue.filter(q => q.status === 'waiting').length, icon: Users, color: 'bg-primary' },
    { label: language === 'mr' ? 'सध्या सेवा' : 'Currently Serving', value: currentServing || '-', icon: Ticket, color: 'bg-success' },
    { label: language === 'mr' ? 'सरासरी प्रतीक्षा' : 'Avg. Wait', value: '15 min', icon: Clock, color: 'bg-warning' },
    { label: language === 'mr' ? 'आज पूर्ण' : 'Completed Today', value: '89', icon: CheckCircle, color: 'bg-accent' },
  ];

  const callNext = () => {
    const nextItem = queue.find(q => q.status === 'waiting');
    if (nextItem) {
      setQueue(prev => prev.map(q => 
        q.id === nextItem.id ? { ...q, status: 'serving' } : 
        q.status === 'serving' ? { ...q, status: 'completed' } : q
      ));
      setCurrentServing(nextItem.token);
      toast.success(`${language === 'mr' ? 'पुढील टोकन कॉल केला' : 'Called next token'}: ${nextItem.token}`);
    }
  };

  const skipCurrent = () => {
    const servingItem = queue.find(q => q.status === 'serving');
    if (servingItem) {
      setQueue(prev => prev.map(q => 
        q.id === servingItem.id ? { ...q, status: 'skipped' } : q
      ));
      callNext();
      toast.info(`${language === 'mr' ? 'टोकन वगळला' : 'Skipped token'}: ${servingItem.token}`);
    }
  };

  const completeCurrent = () => {
    const servingItem = queue.find(q => q.status === 'serving');
    if (servingItem) {
      setQueue(prev => prev.map(q => 
        q.id === servingItem.id ? { ...q, status: 'completed' } : q
      ));
      setCurrentServing(null);
      toast.success(`${language === 'mr' ? 'सेवा पूर्ण' : 'Service completed'}: ${servingItem.token}`);
    }
  };

  const announceToken = () => {
    toast.success(language === 'mr' ? 'टोकन घोषित केला' : 'Token announced');
  };

  const refreshQueue = () => {
    toast.success(language === 'mr' ? 'रांग रिफ्रेश केली' : 'Queue refreshed');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'serving': return <Badge variant="success">{language === 'mr' ? 'सेवेत' : 'Serving'}</Badge>;
      case 'waiting': return <Badge variant="secondary">{language === 'mr' ? 'प्रतीक्षेत' : 'Waiting'}</Badge>;
      case 'completed': return <Badge variant="default">{language === 'mr' ? 'पूर्ण' : 'Completed'}</Badge>;
      case 'skipped': return <Badge variant="destructive">{language === 'mr' ? 'वगळले' : 'Skipped'}</Badge>;
      default: return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {language === 'mr' ? 'रांग व्यवस्थापन' : 'Queue Management'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'mr' ? 'टोकन रांग व्यवस्थापित करा' : 'Manage the token queue'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={refreshQueue}>
              <RefreshCw className="h-4 w-4 mr-2" />
              {language === 'mr' ? 'रिफ्रेश' : 'Refresh'}
            </Button>
            <Button variant="outline" onClick={announceToken}>
              <Volume2 className="h-4 w-4 mr-2" />
              {language === 'mr' ? 'घोषणा' : 'Announce'}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} variant="stat">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>{language === 'mr' ? 'रांग नियंत्रण' : 'Queue Controls'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button variant="success" size="lg" onClick={callNext}>
                <Play className="h-5 w-5 mr-2" />
                {language === 'mr' ? 'पुढील कॉल करा' : 'Call Next'}
              </Button>
              <Button variant="default" size="lg" onClick={completeCurrent}>
                <CheckCircle className="h-5 w-5 mr-2" />
                {language === 'mr' ? 'पूर्ण करा' : 'Complete'}
              </Button>
              <Button variant="outline" size="lg" onClick={skipCurrent}>
                <SkipForward className="h-5 w-5 mr-2" />
                {language === 'mr' ? 'वगळा' : 'Skip'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Queue List */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>{language === 'mr' ? 'वर्तमान रांग' : 'Current Queue'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                      {language === 'mr' ? 'टोकन' : 'Token'}
                    </th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                      {language === 'mr' ? 'नाव' : 'Name'}
                    </th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                      {language === 'mr' ? 'सेवा' : 'Service'}
                    </th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                      {language === 'mr' ? 'प्रतीक्षा वेळ' : 'Wait Time'}
                    </th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                      {language === 'mr' ? 'स्थिती' : 'Status'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {queue.map((item) => (
                    <tr 
                      key={item.id} 
                      className={`border-b border-border hover:bg-muted/50 ${item.status === 'serving' ? 'bg-success/10' : ''}`}
                    >
                      <td className="py-3 px-4 font-mono font-semibold">{item.token}</td>
                      <td className="py-3 px-4">{item.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{item.service}</td>
                      <td className="py-3 px-4 text-muted-foreground">{item.waitTime}</td>
                      <td className="py-3 px-4">{getStatusBadge(item.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default QueueManagement;