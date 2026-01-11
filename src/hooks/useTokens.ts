import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export interface Token {
  id: string;
  token_number: string;
  user_id: string;
  office_id: string;
  office_name: string;
  service_id: string;
  service_name: string;
  appointment_date: string;
  appointment_time: string;
  status: 'pending' | 'waiting' | 'serving' | 'completed' | 'skipped' | 'cancelled';
  position_in_queue: number | null;
  estimated_wait_minutes: number | null;
  created_at: string;
  updated_at: string;
  served_at: string | null;
  served_by: string | null;
}

// Hook for citizens to fetch their tokens
export const useMyTokens = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['my-tokens', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tokens')
        .select('*')
        .order('appointment_date', { ascending: false })
        .order('appointment_time', { ascending: false });
      
      if (error) throw error;
      return data as Token[];
    },
    enabled: !!user?.id,
  });
};

// Hook for officials to fetch all tokens (for queue management)
export const useQueueTokens = (officeId?: string) => {
  return useQuery({
    queryKey: ['queue-tokens', officeId],
    queryFn: async () => {
      let query = supabase
        .from('tokens')
        .select('*')
        .in('status', ['waiting', 'serving', 'pending'])
        .eq('appointment_date', new Date().toISOString().split('T')[0])
        .order('created_at', { ascending: true });
      
      if (officeId) {
        query = query.eq('office_id', officeId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as Token[];
    },
  });
};

// Hook to get today's stats for officials
export const useTodayStats = () => {
  return useQuery({
    queryKey: ['today-stats'],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('tokens')
        .select('status')
        .eq('appointment_date', today);
      
      if (error) throw error;
      
      const tokens = data || [];
      return {
        total: tokens.length,
        served: tokens.filter(t => t.status === 'completed').length,
        waiting: tokens.filter(t => t.status === 'waiting' || t.status === 'pending').length,
        serving: tokens.filter(t => t.status === 'serving').length,
      };
    },
  });
};

// Hook for booking a token
export const useBookToken = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (tokenData: {
      office_id: string;
      office_name: string;
      service_id: string;
      service_name: string;
      appointment_date: string;
      appointment_time: string;
    }) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const tokenNumber = `TK-${Date.now().toString(36).toUpperCase()}`;
      
      const { data, error } = await supabase
        .from('tokens')
        .insert({
          ...tokenData,
          user_id: user.id,
          token_number: tokenNumber,
          status: 'pending',
          position_in_queue: null,
          estimated_wait_minutes: Math.floor(15 + Math.random() * 30),
        })
        .select()
        .single();
      
      if (error) throw error;
      return data as Token;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-tokens'] });
    },
  });
};

// Hook for canceling a token (citizen)
export const useCancelToken = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (tokenId: string) => {
      const { error } = await supabase
        .from('tokens')
        .update({ status: 'cancelled' })
        .eq('id', tokenId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-tokens'] });
    },
  });
};

// Hook for officials to update token status
export const useUpdateTokenStatus = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async ({ tokenId, status }: { tokenId: string; status: Token['status'] }) => {
      const updateData: any = { status };
      
      if (status === 'completed' || status === 'skipped') {
        updateData.served_at = new Date().toISOString();
        updateData.served_by = user?.id;
      }
      
      const { error } = await supabase
        .from('tokens')
        .update(updateData)
        .eq('id', tokenId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['queue-tokens'] });
      queryClient.invalidateQueries({ queryKey: ['today-stats'] });
    },
  });
};

// Hook for officials to call next token
export const useCallNextToken = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async () => {
      // First complete current serving token
      const { data: currentServing } = await supabase
        .from('tokens')
        .select('id')
        .eq('status', 'serving')
        .single();
      
      if (currentServing) {
        await supabase
          .from('tokens')
          .update({ 
            status: 'completed',
            served_at: new Date().toISOString(),
            served_by: user?.id,
          })
          .eq('id', currentServing.id);
      }
      
      // Get next waiting/pending token
      const { data: nextToken, error } = await supabase
        .from('tokens')
        .select('*')
        .in('status', ['waiting', 'pending'])
        .eq('appointment_date', new Date().toISOString().split('T')[0])
        .order('created_at', { ascending: true })
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      
      if (nextToken) {
        await supabase
          .from('tokens')
          .update({ status: 'serving' })
          .eq('id', nextToken.id);
        
        return nextToken as Token;
      }
      
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['queue-tokens'] });
      queryClient.invalidateQueries({ queryKey: ['today-stats'] });
    },
  });
};
