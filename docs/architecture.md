# ReGrade: Primary Architecture Blueprint
**Version:** 1.0 (Finalized)  
**Project Type:** Final-Year B.Tech Project  
**Architecture Style:** Modular Monolith (Next.js App Router + Supabase)  
**Target Market:** Indian Used Electronics Recommerce (All prices in INR ₹)

---

## 1. Executive Summary & Product Vision

**ReGrade** is an AI-assisted recommerce platform designed specifically to solve the trust, grading, and pricing dilemmas in the Indian peer-to-peer (P2P) used electronics marketplace.

Existing platforms (OLX, Quickr, Facebook Marketplace) suffer from:
1. **Information Asymmetry:** Subjective descriptions ("Like New") concealing severe physical or internal defects.
2. **Pricing Ambiguity:** Sellers overvaluing aged goods; buyers having no objective benchmark.
3. **High Fraud Rates:** Fake bills, duplicate images, stolen/blacklisted devices.
4. **No Refurbishment Bridge:** Repairable devices are sold as scrap because buyers lack trusted repair avenues.

### ReGrade Solution
ReGrade acts as an intelligent verification and transaction coordination layer:
* **AI Condition Assessment:** Standardized multi-angle inspection with defect localization.
* **Fair Market Valuation:** Indian market depreciation algorithm providing realistic price bands in ₹.
* **ReGrade Trust Score:** An explainable $0\text{--}100$ rating for every listing.
* **Dual Fulfillment:** Buyers choose **Buy As-Is** (direct delivery) or **Buy Refurbished** (routed via certified local repair partners).
* **72-Hour Inspection Window:** Escrow-style payment protection holding funds in a `HELD` state until verified.

---

## 2. Technology Stack

| Layer | Selected Technology | Purpose & Rationale |
| :--- | :--- | :--- |
| **Frontend & Backend** | **Next.js 14+ (App Router)** | Monolithic architecture using React Server Components, Server Actions, and Route Handlers (`src/app/api/...`). Eliminates the need for a separate Express backend. |
| **Language** | **TypeScript** | Strict end-to-end type safety across database entities, API payloads, and UI components. |
| **Styling** | **Tailwind CSS + Lucide React** | Fast, responsive UI design with standard modern components. |
| **Database** | **PostgreSQL (via Supabase)** | Relational integrity, JSONB support for dynamic device specs, and Row-Level Security (RLS). |
| **Authentication** | **Supabase Auth** | Built-in email/password, OTP, Google OAuth, and JWT session handling. |
| **Storage** | **Cloudinary / Supabase Storage** | Optimized storage, transformation, and CDN delivery of device photos. |
| **Payments** | **Razorpay (Test Mode)** | Standard Indian payment gateway (UPI, Cards, NetBanking). |
| **AI / ML Integration** | **TypeScript Service Adapters** | In-app adapters consuming Roboflow / HuggingFace REST APIs with seamless fallback to deterministic mock engines. |
| **Deployment** | **Vercel** | Zero-configuration continuous deployment linked directly to GitHub. |

---

## 3. User Roles & Permission Matrix

```
┌─────────────────┬─────────────────────────────────────────────────────────────────────────────┐
│ Role            │ Capabilities & Responsibilities                                             │
├─────────────────┼─────────────────────────────────────────────────────────────────────────────┤
│ **Buyer**       │ Browse catalog, inspect AI condition reports, select As-Is / Refurbished,   │
│                 │ checkout via Razorpay, track order, confirm delivery or raise 72h dispute.  │
├─────────────────┼─────────────────────────────────────────────────────────────────────────────┤
│ **Seller**      │ Follow guided multi-angle upload wizard, review AI assessment & valuation,   │
│                 │ set price within suggested bands, ship device upon sale, view payout ledger.│
├─────────────────┼─────────────────────────────────────────────────────────────────────────────┤
│ **Partner Shop**│ Receive local refurbishment jobs, log physical intake diagnostic checklist, │
│                 │ perform repairs/cleaning, submit post-repair QC photos, dispatch to buyer.  │
├─────────────────┼─────────────────────────────────────────────────────────────────────────────┤
│ **Admin**       │ Moderate flagged listings (fraud engine triggers), arbitrate 72-hour buyer  │
│                 │ disputes, manage master device catalog, oversee platform settlement status. │
└─────────────────┴─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. 8-Category Taxonomy & Processing Tiers

The platform supports 8 electronic categories from Day 1, divided into two execution tiers:

```
                                  REGRADE 8-CATEGORY TAXONOMY
┌───────────────────────────────────────────────┬───────────────────────────────────────────────┐
│ TIER 1: VISION AI (CORE MVP FOCUS)            │ TIER 2: DECLARATIVE & RULE-BASED (MVP READY)  │
├───────────────────────────────────────────────┼───────────────────────────────────────────────┤
│ 1. Smartphones                                │ 4. Tablets                                    │
│ 2. Laptops                                    │ 5. Headphones / Earbuds                       │
│ 3. Gaming Consoles                            │ 6. Smartwatches                               │
│                                               │ 7. Cameras & Lenses                           │
│                                               │ 8. Monitors & Displays                        │
├───────────────────────────────────────────────┼───────────────────────────────────────────────┤
│ • Guided multi-angle capture                  │ • Standard photo gallery upload               │
│ • Real defect detection (Roboflow / YOLO)     │ • Structured seller functional checklist      │
│ • Visual bounding boxes (scratches/dents)     │ • Heuristic rule engine calculates Grade/Price│
│ • Automated Grade (A, B, C, D) + Confidence   │ • Manual review fallback if values diverge    │
│ • Mock adapter for offline academic demo      │ • Upgradable to vision AI in Phase 2          │
└───────────────────────────────────────────────┴───────────────────────────────────────────────┘
```

---

## 5. Core System Lifecycles

### 5.1. Listing Lifecycle

```
[DRAFT] ──(Submit Images & Specs)──> [AI_PROCESSING]
                                           │
                ┌──────────────────────────┴──────────────────────────┐
                ▼ (Risk Score <= 30)                                  ▼ (Risk Score > 30)
            [ACTIVE]                                          [FLAGGED_REVIEW]
                │                                                     │
      ┌─────────┴─────────┐                                ┌──────────┴──────────┐
      ▼                   ▼                                ▼                     ▼
 [RESERVED]          [DELISTED]                        [ACTIVE]              [REJECTED]
(In Checkout)     (Seller Deleted)                 (Admin Approved)       (Admin Blocked)
      │
      ▼
   [SOLD]
```

### 5.2. Order & Payment State Machine

```
[PAYMENT_PENDING] ──(Razorpay Success)──> [HELD]
                                            │
               ┌────────────────────────────┴────────────────────────────┐
               ▼ (Mode = AS_IS)                                          ▼ (Mode = REFURBISHED)
       [IN_TRANSIT_DIRECT]                                         [AT_PARTNER]
               │                                                         │
               │                                                 [REPAIRED_AND_QC]
               │                                                         │
               └────────────────────────────┬────────────────────────────┘
                                            ▼
                                       [DELIVERED]
                                            │
                                  [72h INSPECTION WINDOW]
                                            │
               ┌────────────────────────────┴────────────────────────────┐
               ▼ (Buyer Accepts / 72h Expires)                           ▼ (Dispute Raised)
       [PAYOUT_ELIGIBLE]                                             [DISPUTED]
               │                                                         │
               ▼                                            ┌────────────┴────────────┐
           [SETTLED]                                        ▼                         ▼
                                                    [REFUND_APPROVED]         [PAYOUT_ELIGIBLE]
                                                            │                 (Dispute Rejected)
                                                            ▼
                                                        [REFUNDED]
```

> **Payment Architecture Principle:** Payments are captured via Razorpay Test Mode and recorded as `HELD` in the database. Payout eligibility is determined after buyer confirmation or 72-hour inspection window expiration. Settlement is handled as an internal ledger state, avoiding complex banking regulations while maintaining an escrow-like experience.

### 5.3. Partner Refurbishment Workflow

```
1. Order Created (Mode: Refurbished)
   │
   ▼
2. Seller ships device to assigned local Partner Shop
   │
   ▼
3. Partner receives item -> Logs Intake Diagnostic Checklist
   │
   ├── If diagnostic matches listing: Partner proceeds with repair
   └── If major undisclosed defect found: Platform notifies Buyer for approval
   │
   ▼
4. Partner replaces parts & cleans device (e.g., Battery replacement, thermal paste)
   │
   ▼
5. Partner uploads post-repair QC photos & marks QC Passed
   │
   ▼
6. Device dispatched to Buyer -> 72-Hour Inspection Window starts upon delivery
```

### 5.4. 72-Hour Dispute Lifecycle

```
1. Buyer receives device -> 72h timer starts (stored in `orders.inspection_deadline`)
2. If device diverges from AI Condition Report, Buyer clicks [Raise Dispute]
3. Order moves to `DISPUTED`; funds remain frozen in `HELD`
4. Buyer submits evidence photos and defect description
5. Admin reviews split-screen comparison:
   - Original listing AI photos & detected bounding boxes
   - Buyer-uploaded evidence photos
6. Admin Resolution:
   - Option A (Dispute Upheld): Return label generated -> Status moves to `REFUNDED`
   - Option B (Dispute Rejected): Status moves to `PAYOUT_ELIGIBLE` -> Funds released
```

---

## 6. Database Schema (Supabase PostgreSQL)

```sql
-- 1. ENUMS
CREATE TYPE user_role AS ENUM ('buyer', 'seller', 'partner', 'admin');
CREATE TYPE condition_grade AS ENUM ('A', 'B', 'C', 'D');
CREATE TYPE listing_status AS ENUM ('draft', 'processing', 'active', 'flagged_review', 'reserved', 'sold', 'delisted');
CREATE TYPE order_mode AS ENUM ('as_is', 'refurbished');
CREATE TYPE order_status AS ENUM (
    'payment_pending', 'held', 'in_transit_direct', 
    'at_partner', 'repaired_and_qc', 'in_transit_buyer', 
    'delivered', 'payout_eligible', 'settled', 'disputed', 'refunded', 'cancelled'
);
CREATE TYPE dispute_status AS ENUM ('opened', 'under_review', 'resolved_refund', 'resolved_payout', 'rejected');

-- 2. PROFILES
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'buyer',
    full_name TEXT NOT NULL,
    phone_number TEXT,
    city TEXT DEFAULT 'Bangalore',
    pincode TEXT,
    avatar_url TEXT,
    seller_rating NUMERIC(3,2) DEFAULT 5.00,
    total_sales_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PARTNER SHOPS
CREATE TABLE partner_shops (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
    shop_name TEXT NOT NULL,
    gstin TEXT,
    service_city TEXT NOT NULL,
    pincode TEXT NOT NULL,
    supported_categories TEXT[] NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CATEGORIES & MASTER CATALOG
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    icon_name TEXT,
    tier INT DEFAULT 1, -- 1: Vision AI, 2: Declarative/Rule-based
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE products_master (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES categories(id) ON DELETE RESTRICT,
    brand TEXT NOT NULL,
    model_name TEXT NOT NULL,
    release_year INT,
    launch_msrp_inr NUMERIC(10,2) NOT NULL,
    spec_options JSONB NOT NULL, -- e.g., {"storage": ["128GB", "256GB"], "ram": ["8GB", "16GB"]}
    image_url TEXT
);

-- 5. LISTINGS & AI OUTPUTS
CREATE TABLE listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    product_master_id UUID REFERENCES products_master(id) ON DELETE RESTRICT,
    title TEXT NOT NULL,
    description TEXT,
    selected_specs JSONB NOT NULL,
    condition_grade condition_grade,
    listing_price_inr NUMERIC(10,2) NOT NULL,
    status listing_status DEFAULT 'draft',
    trust_score NUMERIC(5,2),
    serial_imei TEXT,
    is_refurb_available BOOLEAN DEFAULT TRUE,
    estimated_refurb_cost_inr NUMERIC(10,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE listing_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    angle_label TEXT NOT NULL, -- 'front', 'back', 'ports', 'screen_on'
    phash TEXT,
    is_primary BOOLEAN DEFAULT FALSE
);

CREATE TABLE condition_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID UNIQUE REFERENCES listings(id) ON DELETE CASCADE,
    predicted_grade condition_grade NOT NULL,
    confidence_score NUMERIC(5,2) NOT NULL,
    detected_defects JSONB NOT NULL,
    explanation_text TEXT NOT NULL,
    is_mock BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE fraud_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID UNIQUE REFERENCES listings(id) ON DELETE CASCADE,
    risk_score NUMERIC(5,2) NOT NULL,
    flags_detected TEXT[] NOT NULL,
    recommendation TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ORDERS, REFURBISHMENT & DISPUTES
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    buyer_id UUID REFERENCES profiles(id) ON DELETE RESTRICT,
    listing_id UUID REFERENCES listings(id) ON DELETE RESTRICT,
    fulfillment_mode order_mode NOT NULL,
    total_amount_inr NUMERIC(10,2) NOT NULL,
    item_price_inr NUMERIC(10,2) NOT NULL,
    refurb_fee_inr NUMERIC(10,2) DEFAULT 0.00,
    shipping_fee_inr NUMERIC(10,2) DEFAULT 150.00,
    order_status order_status DEFAULT 'payment_pending',
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT,
    shipping_address JSONB NOT NULL,
    inspection_deadline TIMESTAMPTZ, -- Set to NOW() + INTERVAL '72 hours' on delivery
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE refurbishment_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
    partner_id UUID REFERENCES partner_shops(id) ON DELETE RESTRICT,
    diagnostic_notes TEXT,
    parts_replaced TEXT[],
    repair_cost_inr NUMERIC(10,2) NOT NULL,
    qc_passed BOOLEAN DEFAULT FALSE,
    qc_images TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE disputes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
    raised_by UUID REFERENCES profiles(id) ON DELETE RESTRICT,
    reason TEXT NOT NULL,
    description TEXT NOT NULL,
    evidence_images TEXT[] NOT NULL,
    status dispute_status DEFAULT 'opened',
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);
```

### 6.1. Row-Level Security (RLS) Policies

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;

-- 1. Anyone can view active listings
CREATE POLICY "Public Read Active Listings" ON listings
    FOR SELECT USING (status = 'active');

-- 2. Sellers manage their own listings
CREATE POLICY "Sellers Manage Own Listings" ON listings
    FOR ALL USING (auth.uid() = seller_id);

-- 3. Users view their own orders (as Buyer or Seller)
CREATE POLICY "Users Access Own Orders" ON orders
    FOR SELECT USING (
        auth.uid() = buyer_id OR 
        auth.uid() IN (SELECT seller_id FROM listings WHERE listings.id = orders.listing_id)
    );

-- 4. Admins have full access to all tables
CREATE POLICY "Admins Full Access Profiles" ON profiles FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins Full Access Listings" ON listings FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins Full Access Orders" ON orders FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins Full Access Disputes" ON disputes FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
```

---

## 7. Application Architecture & Project Structure

```
regrade/
├── docs/
│   ├── architecture.md             # This document
│   ├── roadmap.md                  # Implementation roadmap & build order
│   └── ai-architecture.md          # Detailed AI/ML architecture & formulas
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (marketplace)/
│   │   │   ├── page.tsx            # Landing page
│   │   │   ├── explore/page.tsx    # Catalog with multi-faceted filters
│   │   │   └── product/[id]/page.tsx # Listing detail & AI condition card
│   │   ├── sell/
│   │   │   └── page.tsx            # Guided listing wizard
│   │   ├── checkout/[listingId]/page.tsx # Dual checkout (As-Is / Refurb)
│   │   ├── dashboard/
│   │   │   ├── buyer/page.tsx      # Orders, 72h timer, dispute button
│   │   │   ├── seller/page.tsx     # Active listings & payout ledger
│   │   │   ├── partner/page.tsx    # Refurbishment queue & QC logger
│   │   │   └── admin/page.tsx      # Fraud review & dispute desk
│   │   └── api/                    # Route Handlers (Backend API)
│   │       ├── catalog/route.ts
│   │       ├── listings/route.ts
│   │       ├── listings/[id]/assess/route.ts
│   │       ├── orders/route.ts
│   │       ├── orders/[id]/verify-payment/route.ts
│   │       ├── partner/jobs/route.ts
│   │       └── disputes/route.ts
│   ├── components/
│   │   ├── ui/                     # Base UI components (Button, Modal, Badge)
│   │   ├── marketplace/            # ProductCard, PriceTag, CategoryFilter
│   │   ├── ai-inspect/             # BoundingBoxViewer, TrustScoreGauge
│   │   └── forms/                  # GuidedCaptureForm, DiagnosticForm
│   ├── lib/
│   │   ├── supabase/               # Supabase client helpers
│   │   ├── ai/                     # Replaceable AI Adapter implementations
│   │   │   ├── types.ts
│   │   │   ├── condition-service.ts
│   │   │   ├── pricing-engine.ts
│   │   │   └── fraud-detector.ts
│   │   ├── payments/               # Razorpay helper & HMAC verifier
│   │   └── utils/                  # Trust score calculator & formatters
│   └── types/                      # TypeScript definitions
├── supabase/
│   ├── migrations/                 # PostgreSQL migrations
│   └── seed.sql                    # 50 pre-seeded Indian electronics items
├── public/                         # Icons, test images
├── .env.example
├── package.json
└── tailwind.config.ts
```

---

## 8. Security & Environment Configuration

### Security Rules
1. **Never trust client prices:** All order totals and refurb fees are calculated server-side from database records.
2. **Signature Verification:** Razorpay payment webhooks and callback payloads verify HMAC SHA-256 signatures before updating order status to `HELD`.
3. **EXIF Metadata Stripping:** All uploaded listing images have geolocation and private metadata stripped before storage.
4. **Service Role Isolation:** `SUPABASE_SERVICE_ROLE_KEY` is restricted strictly to server-side Route Handlers.

### Environment Variables Template (`.env.example`)
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Razorpay Test Credentials
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=your_razorpay_secret

# AI Service Configuration
USE_REAL_ML_SERVICE=false
ROBOFLOW_API_KEY=rf_...
ROBOFLOW_MODEL_URL=https://detect.roboflow.com/electronics-defects/1

# Storage (Cloudinary / Supabase)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```
