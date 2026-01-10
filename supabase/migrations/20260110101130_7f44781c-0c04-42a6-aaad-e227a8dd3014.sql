-- Fix security issue: Add restrictive policies for user_roles table
-- Only allow the handle_new_user trigger (via SECURITY DEFINER) to insert roles
-- Users should not be able to modify roles themselves

CREATE POLICY "Service role can manage user roles"
ON public.user_roles
FOR ALL
USING (false)
WITH CHECK (false);

-- Note: The handle_new_user function uses SECURITY DEFINER which bypasses RLS,
-- allowing it to insert roles during registration. Regular users cannot modify roles.