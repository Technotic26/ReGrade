-- ============================================================
-- ReGrade — Profiles Insert Policy
-- Migration: 003_profiles_insert_policy.sql
--
-- Adds an explicit INSERT policy for public.profiles so authenticated
-- users can self-heal / insert their own profile row if the auth trigger
-- was missed or during profile upsert.
--
-- Security:
-- 1. Strictly enforces auth.uid() = id.
-- 2. Strictly restricts role to 'buyer' or 'seller' (admin is forbidden).
-- ============================================================

DROP POLICY IF EXISTS "profiles: owner can insert own" ON public.profiles;

CREATE POLICY "profiles: owner can insert own"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = id
    AND (
      role IN ('buyer', 'seller')
      OR EXISTS (
        SELECT 1
        FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
      )
    )
  );
