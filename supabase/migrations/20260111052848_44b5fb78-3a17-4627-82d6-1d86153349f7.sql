-- Create tokens table for queue management
CREATE TABLE public.tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  token_number TEXT NOT NULL UNIQUE,
  user_id UUID NOT NULL,
  office_id TEXT NOT NULL,
  office_name TEXT NOT NULL,
  service_id TEXT NOT NULL,
  service_name TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'waiting', 'serving', 'completed', 'skipped', 'cancelled')),
  position_in_queue INTEGER,
  estimated_wait_minutes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  served_at TIMESTAMP WITH TIME ZONE,
  served_by UUID
);

-- Enable RLS
ALTER TABLE public.tokens ENABLE ROW LEVEL SECURITY;

-- Citizens can view their own tokens
CREATE POLICY "Citizens can view their own tokens"
ON public.tokens
FOR SELECT
USING (auth.uid() = user_id);

-- Citizens can create their own tokens
CREATE POLICY "Citizens can create their own tokens"
ON public.tokens
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Citizens can cancel their own pending/waiting tokens
CREATE POLICY "Citizens can update their own tokens"
ON public.tokens
FOR UPDATE
USING (auth.uid() = user_id AND status IN ('pending', 'waiting'));

-- Officials can view all tokens
CREATE POLICY "Officials can view all tokens"
ON public.tokens
FOR SELECT
USING (public.has_role(auth.uid(), 'official'));

-- Officials can update tokens (for queue management)
CREATE POLICY "Officials can update tokens"
ON public.tokens
FOR UPDATE
USING (public.has_role(auth.uid(), 'official'));

-- Create trigger for updated_at
CREATE TRIGGER update_tokens_updated_at
BEFORE UPDATE ON public.tokens
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for tokens
ALTER PUBLICATION supabase_realtime ADD TABLE public.tokens;

-- Create index for efficient queries
CREATE INDEX idx_tokens_user_id ON public.tokens(user_id);
CREATE INDEX idx_tokens_status ON public.tokens(status);
CREATE INDEX idx_tokens_appointment_date ON public.tokens(appointment_date);
CREATE INDEX idx_tokens_office_id ON public.tokens(office_id);