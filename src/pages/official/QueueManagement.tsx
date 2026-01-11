import React, { useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQueueTokens, useTodayStats, useCallNextToken, useUpdateTokenStatus } from '@/hooks/useTokens';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { 
  Play, 
  SkipForward, 
  CheckCircle, 
  Clock, 
  Users,
  Ticket,
  Volume2,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';

const QueueManagement: React.FC = () => {
  const { language } = useLanguage();
  const queryClient = useQueryClient();
  
  const { data: queueTokens, isLoading, refetch } = useQueueTokens();
  const { data: stats } = useTodayStats();
  const callNextMutation = useCallNextToken();
  const updateStatusMutation = useUpdateTokenStatus();

  // Subscribe to realtime updates
  useEffect(() => {
    const channel = supabase
      .channel('queue-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tokens' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['queue-tokens'] });
          queryClient.invalidateQueries({ queryKey: ['today-stats'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const currentlyServing = queueTokens?.find(t => t.status === 'serving');
  const waitingQueue = queueTokens?.filter(t => t.status === 'waiting' || t.status === 'pending') || [];

  const statCards = [
    { 
      label: language === 'mr' ? 'एकूण रांगेत' : 'Total in Queue', 
      value: waitingQueue.length, 
      icon: Users, 
      color: 'bg-primary' 
    },
    { 
      label: language === 'mr' ? 'सध्या सेवा' : 'Currently Serving', 
      value: currentlyServing?.token_number || '-', 
      icon: Ticket, 
      color: 'bg-success' 
    },
    { 
      label: language === 'mr' ? 'सरासरी प्रतीक्षा' : 'Avg. Wait', 
      value: '15 min', 
      icon: Clock, 
      color: 'bg-warning' 
    },
    { 
      label: language === 'mr' ? 'आज पूर्ण' : 'Completed Today', 
      value: stats?.served || 0, 
      icon: CheckCircle, 
      color: 'bg-accent' 
    },
  ];

  const handleCallNext = async () => {
    try {
      const nextToken = await callNextMutation.mutateAsync();
      if (nextToken) {
        toast.success(
          language === 'mr' 
            ? `पुढील टोकन: ${nextToken.token_number}` 
            : `Next token: ${nextToken.token_number}`
        );
      } else {
        toast.info(
          language === 'mr' 
            ? 'रांगेत कोणी नाही' 
            : 'No one in queue'
        );
      }
    } catch (error) {
      toast.error(language === 'mr' ? 'त्रुटी आली' : 'Error occurred');
    }
  };

  const handleComplete = async () => {
    if (!currentlyServing) return;
    try {
      await updateStatusMutation.mutateAsync({ tokenId: currentlyServing.id, status: 'completed' });
      toast.success(language === 'mr' ? 'सेवा पूर्ण' : 'Service completed');
    } catch (error) {
      toast.error(language === 'mr' ? 'त्रुटी आली' : 'Error occurred');
    }
  };

  const handleSkip = async () => {
    if (!currentlyServing) return;
    try {
      await updateStatusMutation.mutateAsync({ tokenId: currentlyServing.id, status: 'skipped' });
      toast.info(language === 'mr' ? 'टोकन वगळला' : 'Token skipped');
    } catch (error) {
      toast.error(language === 'mr' ? 'त्रुटी आली' : 'Error occurred');
    }
  };

  const announceToken = () => {
    if (currentlyServing) {
      toast.success(
        language === 'mr' 
          ? `टोकन ${currentlyServing.token_number} घोषित केला` 
          : `Token ${currentlyServing.token_number} announced`
      );
    }
  };

  const refreshQueue = () => {
    refetch();
    toast.success(language === 'mr' ? 'रांग रिफ्रेश केली' : 'Queue refreshed');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'serving': return <Badge variant="success">{language === 'mr' ? 'सेवेत' : 'Serving'}</Badge>;
      case 'waiting': 
      case 'pending': return <Badge variant="secondary">{language === 'mr' ? 'प्रतीक्षेत' : 'Waiting'}</Badge>;
      case 'completed': return <Badge variant="default">{language === 'mr' ? 'पूर्ण' : 'Completed'}</Badge>;
      case 'skipped': return <Badge variant="destructive">{language === 'mr' ? 'वगळले' : 'Skipped'}</Badge>;
      default: return null;
    }
  };

  const allTokens = [
    ...(currentlyServing ? [currentlyServing] : []),
    ...waitingQueue,
  ];

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
            <Button variant="outline" onClick={announceToken} disabled={!currentlyServing}>
              <Volume2 className="h-4 w-4 mr-2" />
              {language === 'mr' ? 'घोषणा' : 'Announce'}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, i) => (
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
              <Button 
                variant="success" 
                size="lg" 
                onClick={handleCallNext}
                disabled={callNextMutation.isPending}
              >
                {callNextMutation.isPending ? (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <Play className="h-5 w-5 mr-2" />
                )}
                {language === 'mr' ? 'पुढील कॉल करा' : 'Call Next'}
              </Button>
              <Button 
                variant="default" 
                size="lg" 
                onClick={handleComplete}
                disabled={!currentlyServing || updateStatusMutation.isPending}
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                {language === 'mr' ? 'पूर्ण करा' : 'Complete'}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleSkip}
                disabled={!currentlyServing || updateStatusMutation.isPending}
              >
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
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : allTokens.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">
                {language === 'mr' ? 'रांगेत कोणी नाही' : 'No one in queue'}
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                        {language === 'mr' ? 'टोकन' : 'Token'}
                      </th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                        {language === 'mr' ? 'सेवा' : 'Service'}
                      </th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                        {language === 'mr' ? 'कार्यालय' : 'Office'}
                      </th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                        {language === 'mr' ? 'वेळ' : 'Time'}
                      </th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                        {language === 'mr' ? 'स्थिती' : 'Status'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allTokens.map((item) => (
                      <tr 
                        key={item.id} 
                        className={`border-b border-border hover:bg-muted/50 ${item.status === 'serving' ? 'bg-success/10' : ''}`}
                      >
                        <td className="py-3 px-4 font-mono font-semibold">{item.token_number}</td>
                        <td className="py-3 px-4">{item.service_name}</td>
                        <td className="py-3 px-4 text-muted-foreground">{item.office_name}</td>
                        <td className="py-3 px-4 text-muted-foreground">{item.appointment_time}</td>
                        <td className="py-3 px-4">{getStatusBadge(item.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default QueueManagement;
