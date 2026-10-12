-- ============================================================
-- ReGrade — Auth Role Selection & Escalation Protection
-- Migration: 002_role_onboarding.sql
--
-- 1. Updates handle_new_user() trigger to safely read the
--    user's intended role ('buyer' | 'seller') from auth metadata.
-- 2. Strictly forbids 'admin' from public signup (falls back to 'buyer').
-- 3. Adds trigger to prevent authenticated users from self-assigning
--    the 'admin' role on public updates.
-- 4. Tightens RLS UPDATE policy on profiles.
-- ============================================================

-- 1. Update the profile auto-create trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  assigned_role user_role := 'buyer';
  raw_role text;
BEGIN
  -- Read role from signup metadata
  raw_role := NEW.raw_user_meta_data ->> 'role';

  -- Strictly validate: only 'seller' or 'buyer' are allowed via public signup.
  -- Any unexpected string or 'admin' safely defaults to 'buyer'.
  IF raw_role = 'seller' THEN
    assigned_role := 'seller';
  ELSE
    assigned_role := 'buyer';
  END IF;

  INSERT INTO public.profiles (id, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data ->> 'full_name',
      NEW.raw_user_meta_data ->> 'name',
      NULL
    ),
    COALESCE(
      NEW.raw_user_meta_data ->> 'avatar_url',
      NEW.raw_user_meta_data ->> 'picture',
      NULL
    ),
    assigned_role
  )
  ON CONFLICT (id) DO UPDATE
  SET
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, profiles.avatar_url),
    role = CASE
      -- Only update role if current role is unassigned or default buyer
      WHEN profiles.role = 'buyer' AND EXCLUDED.role = 'seller' THEN 'seller'::user_role
      ELSE profiles.role
    END,
    updated_at = now();

  RETURN NEW;
END;
$$;

-- 2. Trigger function to prevent non-admins from self-escalating to 'admin'
CREATE OR REPLACE FUNCTION public.prevent_self_admin_escalation()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- If role is being changed to 'admin'
  IF NEW.role = 'admin' AND (OLD.role IS DISTINCT FROM 'admin') THEN
    -- Check if the calling authenticated user is already an admin
    IF NOT EXISTS (
      SELECT 1
      FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    ) THEN
      RAISE EXCEPTION 'Unauthorized: The admin role cannot be self-assigned.';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS check_admin_escalation ON public.profiles;

CREATE TRIGGER check_admin_escalation
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_self_admin_escalation();

-- 3. Tighten RLS UPDATE policy on profiles
DROP POLICY IF EXISTS "profiles: owner can update own" ON public.profiles;

CREATE POLICY "profiles: owner can update own"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND (
      -- Regular users can only set buyer or seller
      role IN ('buyer', 'seller')
      -- Only existing admins can assign admin
      OR EXISTS (
        SELECT 1
        FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
      )
    )
  );
