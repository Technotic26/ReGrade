-- ============================================================
-- ReGrade — Fix Profiles RLS Recursion & Hardened Admin Access
-- Migration: 004_fix_profiles_rls_recursion.sql
-- ============================================================

-- ------------------------------------------------------------
-- STEP 1: DROP DEPENDENT POLICIES FIRST
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "profiles: owner can read own" ON public.profiles;
DROP POLICY IF EXISTS "profiles: admin can read all" ON public.profiles;
DROP POLICY IF EXISTS "profiles: owner can update own" ON public.profiles;
DROP POLICY IF EXISTS "profiles: owner can insert own" ON public.profiles;
DROP POLICY IF EXISTS "profiles: read access" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_policy" ON public.profiles;

DROP POLICY IF EXISTS "categories: admin full access" ON public.categories;
DROP POLICY IF EXISTS "listings: admin read all" ON public.listings;

-- ------------------------------------------------------------
-- STEP 2: DROP TRIGGER & OLD FUNCTIONS (WITHOUT CASCADE)
-- ------------------------------------------------------------
DROP TRIGGER IF EXISTS check_admin_escalation ON public.profiles;
DROP FUNCTION IF EXISTS public.prevent_self_admin_escalation();
DROP FUNCTION IF EXISTS public.is_admin(uuid);
DROP FUNCTION IF EXISTS public.is_admin();

-- ------------------------------------------------------------
-- STEP 3: CREATE PARAMETERLESS is_admin() SECURITY DEFINER HELPER
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  current_uid uuid;
BEGIN
  current_uid := auth.uid();

  IF current_uid IS NULL THEN
    RETURN false;
  END IF;

  RETURN EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = current_uid AND role = 'admin'
  );
END;
$$;

COMMENT ON FUNCTION public.is_admin() IS
  'Securely checks if current session caller is admin without parameter oracle or RLS recursion.';

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_admin() FROM anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO service_role;

-- ------------------------------------------------------------
-- STEP 4: CREATE ESCALATION TRIGGER FUNCTION & ATTACH TRIGGER
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.prevent_self_admin_escalation()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NEW.role = 'admin' AND (OLD.role IS DISTINCT FROM 'admin') THEN
    IF NOT public.is_admin() THEN
      RAISE EXCEPTION 'Unauthorized: The admin role cannot be self-assigned.';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.prevent_self_admin_escalation() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.prevent_self_admin_escalation() FROM anon;
GRANT EXECUTE ON FUNCTION public.prevent_self_admin_escalation() TO authenticated;
GRANT EXECUTE ON FUNCTION public.prevent_self_admin_escalation() TO service_role;

CREATE TRIGGER check_admin_escalation
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_self_admin_escalation();

-- ------------------------------------------------------------
-- STEP 5: RECREATE NON-RECURSIVE RLS POLICIES FOR profiles
-- ------------------------------------------------------------

-- SELECT: authenticated owner reads their own profile
CREATE POLICY "profiles: owner can read own"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- SELECT: admin reads all profiles
CREATE POLICY "profiles: admin can read all"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- INSERT: user can insert own profile with role buyer or seller (or admin if caller is already admin)
CREATE POLICY "profiles: owner can insert own"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = id
    AND (
      role IN ('buyer', 'seller')
      OR public.is_admin()
    )
  );

-- UPDATE: user can update own profile with role buyer or seller (or admin if caller is already admin)
CREATE POLICY "profiles: owner can update own"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND (
      role IN ('buyer', 'seller')
      OR public.is_admin()
    )
  );

-- ------------------------------------------------------------
-- STEP 6: RECREATE ADMIN POLICIES FOR categories & listings
-- ------------------------------------------------------------
CREATE POLICY "categories: admin full access"
  ON public.categories
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "listings: admin read all"
  ON public.listings
  FOR SELECT
  TO authenticated
  USING (public.is_admin());
