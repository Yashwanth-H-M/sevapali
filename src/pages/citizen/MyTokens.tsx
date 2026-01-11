import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Ticket,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreVertical,
  Eye,
  RefreshCw,
  Trash2,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';
import { useMyTokens, useCancelToken, Token } from '@/hooks/useTokens';
import { format, parseISO } from 'date-fns';

const MyTokens: React.FC = () => {
  const { language } = useLanguage();
  const { data: tokens, isLoading, refetch } = useMyTokens();
  const cancelMutation = useCancelToken();

  const handleRefreshPosition = () => {
    refetch();
    toast.success(language === 'mr' ? 'स्थिती अपडेट केली' : 'Status refreshed');
  };

  const handleCancelToken = async (tokenId: string) => {
    try {
      await cancelMutation.mutateAsync(tokenId);
      toast.success(language === 'mr' ? 'टोकन रद्द केले' : 'Token cancelled');
    } catch (error) {
      toast.error(language === 'mr' ? 'त्रुटी आली' : 'Error cancelling token');
    }
  };

  const getStatus = (token: Token) => {
    const today = new Date().toISOString().split('T')[0];
    if (token.status === 'cancelled') return 'cancelled';
    if (token.status === 'completed') return 'completed';
    if (token.status === 'serving') return 'active';
    if (token.appointment_date === today && (token.status === 'waiting' || token.status === 'pending')) return 'active';
    if (token.appointment_date > today) return 'upcoming';
    return 'completed';
  };

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

  const formatDate = (dateStr: string) => {
    try {
      return format(parseISO(dateStr), 'dd MMM yyyy');
    } catch {
      return dateStr;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {language === 'mr' ? 'माझे टोकन' : 'My Tokens'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'mr' ? 'तुमच्या सर्व टोकनची स्थिती पहा' : 'View the status of all your tokens'}
            </p>
          </div>
          <Button variant="outline" onClick={handleRefreshPosition}>
            <RefreshCw className="h-4 w-4 mr-2" />
            {language === 'mr' ? 'रिफ्रेश' : 'Refresh'}
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : !tokens || tokens.length === 0 ? (
          <Card variant="elevated">
            <CardContent className="p-8 text-center">
              <Ticket className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {language === 'mr' ? 'तुमची कोणतेही टोकन नाहीत' : 'You have no tokens'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {tokens.map((token) => {
              const status = getStatus(token);
              return (
                <Card key={token.id} variant="elevated" className={status === 'active' ? 'border-success/50' : ''}>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="hidden md:flex w-12 h-12 rounded-xl bg-primary/10 items-center justify-center">
                          {getStatusIcon(status)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            {getStatusBadge(status)}
                            <span className="text-sm font-mono text-muted-foreground">{token.token_number}</span>
                          </div>
                          <h3 className="font-semibold text-foreground text-lg">{token.service_name}</h3>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {token.office_name}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {formatDate(token.appointment_date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {token.appointment_time}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {status === 'active' && token.position_in_queue && (
                          <div className="flex items-center gap-3">
                            <div className="text-center px-4 py-2 bg-primary/10 rounded-xl">
                              <p className="text-xl font-bold text-primary">#{token.position_in_queue}</p>
                              <p className="text-xs text-muted-foreground">
                                {language === 'mr' ? 'रांगेत' : 'In Queue'}
                              </p>
                            </div>
                            {token.estimated_wait_minutes && (
                              <div className="text-center px-4 py-2 bg-accent/10 rounded-xl">
                                <p className="text-xl font-bold text-accent">{token.estimated_wait_minutes}</p>
                                <p className="text-xs text-muted-foreground">
                                  {language === 'mr' ? 'मिनिटे' : 'min'}
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {(status === 'active' || status === 'upcoming') && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-5 w-5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {status === 'active' && (
                                <DropdownMenuItem onClick={handleRefreshPosition}>
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  {language === 'mr' ? 'स्थिती रिफ्रेश करा' : 'Refresh Status'}
                                </DropdownMenuItem>
                              )}
                              {status === 'upcoming' && (
                                <DropdownMenuItem 
                                  onClick={() => handleCancelToken(token.id)}
                                  className="text-destructive"
                                  disabled={cancelMutation.isPending}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  {language === 'mr' ? 'टोकन रद्द करा' : 'Cancel Token'}
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyTokens;
