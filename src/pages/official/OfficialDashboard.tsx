import React, { useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useQueueTokens, useTodayStats, useCallNextToken, useUpdateTokenStatus } from '@/hooks/useTokens';
import { supabase } from '@/integrations/supabase/client';
import { Users, Ticket, Clock, TrendingUp, Play, SkipForward, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

const OfficialDashboard: React.FC = () => {
  const { language } = useLanguage();
  const { user, profile } = useAuth();
  const queryClient = useQueryClient();
  
  const { data: queueTokens, isLoading: queueLoading } = useQueueTokens();
  const { data: stats, isLoading: statsLoading } = useTodayStats();
  const callNextMutation = useCallNextToken();
  const updateStatusMutation = useUpdateTokenStatus();

  // Subscribe to realtime updates
  useEffect(() => {
    const channel = supabase
      .channel('tokens-realtime')
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

  const handleSkip = async (tokenId: string) => {
    try {
      await updateStatusMutation.mutateAsync({ tokenId, status: 'skipped' });
      toast.info(language === 'mr' ? 'टोकन वगळला' : 'Token skipped');
    } catch (error) {
      toast.error(language === 'mr' ? 'त्रुटी आली' : 'Error occurred');
    }
  };

  const currentlyServing = queueTokens?.find(t => t.status === 'serving');
  const waitingQueue = queueTokens?.filter(t => t.status === 'waiting' || t.status === 'pending') || [];

  const statCards = [
    { 
      label: language === 'mr' ? 'आजचे टोकन' : "Today's Tokens", 
      value: statsLoading ? '...' : stats?.total || 0, 
      icon: Ticket, 
      color: 'bg-primary' 
    },
    { 
      label: language === 'mr' ? 'सेवित' : 'Served', 
      value: statsLoading ? '...' : stats?.served || 0, 
      icon: CheckCircle, 
      color: 'bg-success' 
    },
    { 
      label: language === 'mr' ? 'प्रतीक्षारत' : 'Waiting', 
      value: statsLoading ? '...' : stats?.waiting || 0, 
      icon: Clock, 
      color: 'bg-warning' 
    },
    { 
      label: language === 'mr' ? 'सध्या सेवेत' : 'Now Serving', 
      value: currentlyServing?.token_number || '-', 
      icon: TrendingUp, 
      color: 'bg-accent' 
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {language === 'mr' ? 'नमस्कार' : 'Welcome'}, {profile?.full_name?.split(' ')[0] || user?.email?.split('@')[0]}! 👋
          </h1>
          <p className="text-muted-foreground">{language === 'mr' ? 'रांग व्यवस्थापन डॅशबोर्ड' : 'Queue Management Dashboard'}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, i) => (
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

        {/* Quick Action */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>{language === 'mr' ? 'त्वरित कृती' : 'Quick Action'}</CardTitle>
          </CardHeader>
          <CardContent>
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
              {language === 'mr' ? 'पुढील टोकन कॉल करा' : 'Call Next Token'}
            </Button>
          </CardContent>
        </Card>

        <Card variant="elevated">
          <CardHeader>
            <CardTitle>{language === 'mr' ? 'वर्तमान रांग' : 'Current Queue'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {queueLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : waitingQueue.length === 0 && !currentlyServing ? (
              <p className="text-center py-8 text-muted-foreground">
                {language === 'mr' ? 'रांगेत कोणी नाही' : 'No one in queue'}
              </p>
            ) : (
              <>
                {currentlyServing && (
                  <div className="flex items-center justify-between p-4 bg-success/10 border border-success/30 rounded-xl">
                    <div className="flex items-center gap-4">
                      <Badge variant="success">{currentlyServing.token_number}</Badge>
                      <div>
                        <p className="font-medium">{currentlyServing.service_name}</p>
                        <p className="text-sm text-muted-foreground">{currentlyServing.office_name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="success">{language === 'mr' ? 'सेवेत' : 'Serving'}</Badge>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleSkip(currentlyServing.id)}
                        disabled={updateStatusMutation.isPending}
                      >
                        <SkipForward className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                {waitingQueue.map((item, i) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary">{item.token_number}</Badge>
                      <div>
                        <p className="font-medium">{item.service_name}</p>
                        <p className="text-sm text-muted-foreground">{item.office_name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {item.appointment_time}
                      </span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default OfficialDashboard;
