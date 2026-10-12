-- ============================================================
-- ReGrade — Initial Schema
-- Migration: 001_initial_schema.sql
--
-- Tables:    profiles, categories, listings
-- Enums:     user_role, condition_grade, listing_status
-- RLS:       profiles, categories, listings
-- Trigger:   auto-create profile on auth.users insert
-- Seeds:     8 ReGrade categories
-- ============================================================

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE user_role AS ENUM ('buyer', 'seller', 'admin');

CREATE TYPE condition_grade AS ENUM ('A', 'B', 'C', 'D');

CREATE TYPE listing_status AS ENUM (
  'draft',
  'processing',
  'active',
  'flagged_review',
  'reserved',
  'sold',
  'delisted'
);

-- ============================================================
-- TABLE: profiles
--
-- One row per Supabase Auth user.
-- Created automatically via trigger on auth.users INSERT.
-- The id is a foreign key to auth.users.id.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID        NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  full_name   TEXT,
  avatar_url  TEXT,
  role        user_role   NOT NULL DEFAULT 'buyer',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_full_name_length CHECK (
    full_name IS NULL OR (char_length(full_name) >= 2 AND char_length(full_name) <= 100)
  )
);

COMMENT ON TABLE public.profiles IS
  'Extended user profile data. One row per auth.users entry.';

COMMENT ON COLUMN public.profiles.role IS
  'ReGrade domain role: buyer (default), seller, admin.';

-- ============================================================
-- TABLE: categories
--
-- The 8 ReGrade product categories.
-- Read-only for public users. Only admins may modify.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.categories (
  id          UUID        NOT NULL DEFAULT gen_random_uuid(),
  slug        TEXT        NOT NULL,
  name        TEXT        NOT NULL,
  description TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT categories_pkey   PRIMARY KEY (id),
  CONSTRAINT categories_slug_unique UNIQUE (slug),
  CONSTRAINT categories_slug_format CHECK (slug ~ '^[a-z0-9-]+$')
);

COMMENT ON TABLE public.categories IS
  'ReGrade product categories. Seeded at migration time.';

-- ============================================================
-- TABLE: listings
--
-- A single seller listing for one physical device.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.listings (
  id               UUID           NOT NULL DEFAULT gen_random_uuid(),
  seller_id        UUID           NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  category_id      UUID           NOT NULL REFERENCES public.categories (id),
  title            TEXT           NOT NULL,
  description      TEXT,
  price            INTEGER        NOT NULL,           -- price in Indian Paise (₹ × 100)
  condition_grade  condition_grade NOT NULL,
  status           listing_status  NOT NULL DEFAULT 'draft',
  city             TEXT,
  created_at       TIMESTAMPTZ    NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ    NOT NULL DEFAULT now(),

  CONSTRAINT listings_pkey           PRIMARY KEY (id),
  CONSTRAINT listings_title_length   CHECK (char_length(title) >= 5 AND char_length(title) <= 200),
  CONSTRAINT listings_price_positive CHECK (price > 0)
);

COMMENT ON TABLE public.listings IS
  'Device listings created by sellers. Price stored in Paise (₹ × 100).';

COMMENT ON COLUMN public.listings.seller_id IS
  'The seller who owns this listing. Must be a valid profiles.id.';

COMMENT ON COLUMN public.listings.price IS
  'Price in Indian Paise (INR × 100). Divide by 100 to display as ₹.';

-- ============================================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER listings_set_updated_at
  BEFORE UPDATE ON public.listings
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER profiles_set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- PROFILE AUTO-CREATE TRIGGER
--
-- Fires after every new user is inserted into auth.users.
-- Creates a matching row in public.profiles automatically.
-- This eliminates the need for any application-level profile
-- creation logic and is the Supabase-recommended approach.
-- ============================================================

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
      WHEN profiles.role = 'buyer' AND EXCLUDED.role = 'seller' THEN 'seller'::user_role
      ELSE profiles.role
    END,
    updated_at = now();

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Trigger function to prevent non-admins from self-escalating to 'admin'
CREATE OR REPLACE FUNCTION public.prevent_self_admin_escalation()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.role = 'admin' AND (OLD.role IS DISTINCT FROM 'admin') THEN
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

CREATE TRIGGER check_admin_escalation
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_self_admin_escalation();

-- ============================================================
-- ROW LEVEL SECURITY — Enable on all tables
-- ============================================================

ALTER TABLE public.profiles  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings   ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- RLS POLICIES — profiles
-- ============================================================

-- Any authenticated user can read their own profile.
CREATE POLICY "profiles: owner can read own"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- A user can update only their own profile.
-- Regular users can only set buyer or seller; admin role cannot be self-assigned.
CREATE POLICY "profiles: owner can update own"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
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

-- Admins can read any profile (for moderation).
CREATE POLICY "profiles: admin can read all"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- ============================================================
-- RLS POLICIES — categories
-- ============================================================

-- Anyone (including unauthenticated visitors) can read categories.
CREATE POLICY "categories: public read"
  ON public.categories
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only admins can insert/update/delete categories.
CREATE POLICY "categories: admin full access"
  ON public.categories
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- ============================================================
-- RLS POLICIES — listings
-- ============================================================

-- Unauthenticated and authenticated visitors can see active listings.
CREATE POLICY "listings: public can read active"
  ON public.listings
  FOR SELECT
  TO anon, authenticated
  USING (status = 'active');

-- Sellers can also see their own listings regardless of status.
CREATE POLICY "listings: seller can read own"
  ON public.listings
  FOR SELECT
  TO authenticated
  USING (seller_id = auth.uid());

-- Sellers can create listings only for themselves.
CREATE POLICY "listings: seller can insert own"
  ON public.listings
  FOR INSERT
  TO authenticated
  WITH CHECK (seller_id = auth.uid());

-- Sellers can update only their own listings.
CREATE POLICY "listings: seller can update own"
  ON public.listings
  FOR UPDATE
  TO authenticated
  USING (seller_id = auth.uid())
  WITH CHECK (seller_id = auth.uid());

-- Sellers can delete/delist only their own listings.
CREATE POLICY "listings: seller can delete own"
  ON public.listings
  FOR DELETE
  TO authenticated
  USING (seller_id = auth.uid());

-- Admins can read all listings.
CREATE POLICY "listings: admin read all"
  ON public.listings
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- ============================================================
-- SEED DATA — 8 ReGrade Categories
-- ============================================================

INSERT INTO public.categories (slug, name, description) VALUES
  ('smartphones',       'Smartphones',           'Pre-owned Android and Apple smartphones with full condition grading.'),
  ('laptops',           'Laptops & MacBooks',     'Work-ready laptops and MacBooks, clearly inspected and documented.'),
  ('tablets',           'Tablets & iPads',        'Portable tablets and iPads with honest usage and screen details.'),
  ('gaming-consoles',   'Gaming Consoles',        'Play-tested consoles with verified hardware and storage details.'),
  ('headphones-audio',  'Headphones & Audio',     'Earbuds, headphones, and audio gear with battery and condition notes.'),
  ('smartwatches',      'Smartwatches',           'Wearables with battery health, screen, and strap condition declared.'),
  ('cameras-lenses',    'Cameras & Lenses',       'DSLR, mirrorless, and lens gear with shutter count and cosmetic notes.'),
  ('monitors-displays', 'Monitors & Displays',    'Screens assessed for pixel health, backlight, and stand condition.')
ON CONFLICT (slug) DO NOTHING;
