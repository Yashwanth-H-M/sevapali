import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Ticket,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreVertical,
} from 'lucide-react';

const MyTokens: React.FC = () => {
  const { language } = useLanguage();

  const tokens = [
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
    {
      id: 'TK-2025-001200',
      office: language === 'mr' ? 'ससून रुग्णालय' : 'Sassoon Hospital',
      service: language === 'mr' ? 'बाह्यरुग्ण विभाग' : 'OPD Consultation',
      date: '08 Jan 2025',
      time: '09:30 AM',
      position: null,
      estimatedWait: null,
      status: 'completed',
    },
    {
      id: 'TK-2025-001180',
      office: language === 'mr' ? 'पुणे महानगरपालिका' : 'Pune Municipal Corp',
      service: language === 'mr' ? 'मालमत्ता कर' : 'Property Tax',
      date: '05 Jan 2025',
      time: '02:00 PM',
      position: null,
      estimatedWait: null,
      status: 'cancelled',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">{language === 'mr' ? 'सक्रिय' : 'Active'}</Badge>;
      case 'upcoming':
        return <Badge variant="secondary">{language === 'mr' ? 'आगामी' : 'Upcoming'}</Badge>;
      case 'completed':
        return <Badge variant="default">{language === 'mr' ? 'पूर्ण' : 'Completed'}</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">{language === 'mr' ? 'रद्द' : 'Cancelled'}</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <AlertCircle className="h-5 w-5 text-success" />;
      case 'upcoming':
        return <Clock className="h-5 w-5 text-muted-foreground" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-primary" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {language === 'mr' ? 'माझे टोकन' : 'My Tokens'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'mr'
                ? 'तुमच्या सर्व टोकनची स्थिती पहा'
                : 'View the status of all your tokens'}
            </p>
          </div>
        </div>

        {/* Tokens List */}
        <div className="space-y-4">
          {tokens.map((token) => (
            <Card key={token.id} variant="elevated" className={token.status === 'active' ? 'border-success/50' : ''}>
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="hidden md:flex w-12 h-12 rounded-xl bg-primary/10 items-center justify-center">
                      {getStatusIcon(token.status)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusBadge(token.status)}
                        <span className="text-sm font-mono text-muted-foreground">{token.id}</span>
                      </div>
                      <h3 className="font-semibold text-foreground text-lg">{token.service}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {token.office}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {token.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {token.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {token.status === 'active' && token.position && (
                      <div className="flex items-center gap-3">
                        <div className="text-center px-4 py-2 bg-primary/10 rounded-xl">
                          <p className="text-xl font-bold text-primary">#{token.position}</p>
                          <p className="text-xs text-muted-foreground">
                            {language === 'mr' ? 'रांगेत' : 'In Queue'}
                          </p>
                        </div>
                        <div className="text-center px-4 py-2 bg-accent/10 rounded-xl">
                          <p className="text-xl font-bold text-accent">{token.estimatedWait}</p>
                          <p className="text-xs text-muted-foreground">
                            {language === 'mr' ? 'मिनिटे' : 'min'}
                          </p>
                        </div>
                      </div>
                    )}

                    {(token.status === 'active' || token.status === 'upcoming') && (
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyTokens;
