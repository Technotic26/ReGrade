ReGrade — Project Handoff

Read this file before modifying the project. The actual codebase remains the ultimate source of truth.
Current state: September 24, 2026. This version supersedes older handoffs.

1. Project

ReGrade is an AI-assisted recommerce marketplace for pre-owned consumer electronics.

Core flow:
Seller lists used product → details + guided photos → condition inspection → Grade A/B/C/D → defect explanation → ReGrade Trust Score → fair price → listing → buyer chooses Buy As-Is or Buy Refurbished → checkout → refurbishment if required → delivery → 72-hour buyer protection/dispute flow.

Build incrementally. Never claim mock/demo functionality is real.

2. Categories

Smartphones

Laptops & MacBooks

Tablets & iPads

Gaming Consoles

Headphones & Audio

Smartwatches

Cameras & Lenses

Monitors & Displays

3. AI Scope

Real visual grading should initially target Smartphones, Laptops, and Gaming Consoles.
Other categories may initially use structured declarations, deterministic rules, manual verification, or mock AI.

AI architecture should remain replaceable:
Mock AI → Real AI provider.

Future AI: defect detection, pricing, fraud/risk detection, visual search, refurbishment cost estimation, marketplace assistant, recommendations, demand forecasting.

4. Current Stack

Next.js

React

TypeScript

Tailwind CSS

Lucide React

Supabase

@supabase/supabase-js

@supabase/ssr

PostgreSQL

Vercel intended for deployment

Architecture: modular monolith using Next.js App Router.

Do not introduce unnecessary microservices, Kubernetes, Kafka, RabbitMQ, Redis, or a separate Python/FastAPI ML service unless explicitly approved.

5. Brand / UI

Terracotta: #D96532

Warm ivory: #FAF8F4

Charcoal: #26231F

Warm grey: #716960

Soft beige: #F6F2EC

Border: #E4DBD2

Feel: premium, trustworthy, modern, warm, editorial, clean.
Do not copy Cashify/OLX or use generic SaaS purple/blue styling.

6. Existing Frontend

Implemented:

Landing page

Navbar

Hero

Category grid

Featured listings

Browse/search

8 category pages

Product detail pages

As-Is vs Refurbished UI

Dark mode

Responsive navigation

Local product assets

Catalogue screens remain largely mock data by design until a later real-data milestone.

7. Milestone 2 — Supabase + Authentication — COMPLETE

Implemented:

Supabase client/server/middleware

database types

auth middleware

email/password signup/login

Google OAuth

SSR sessions

protected dashboard

logout

auth onboarding

Important files include:

src/lib/supabase/client.ts

src/lib/supabase/server.ts

src/lib/supabase/middleware.ts

src/types/database.ts

middleware.ts

supabase/migrations/001_initial_schema.sql

src/app/auth/login/page.tsx

src/app/auth/signup/page.tsx

src/app/auth/callback/route.ts

src/app/auth/onboarding/page.tsx

src/app/dashboard/page.tsx

8. Buyer / Seller Role System — COMPLETE

Signup/onboarding allows:

Buy Used Tech → buyer

Sell Your Device → seller

Public signup must never allow admin.

Role selection/persistence is working and verified. Dashboard and Navbar are role-aware.

Do not rebuild this unless an actual regression is found.

9. Supabase Schema

Migration:
supabase/migrations/001_initial_schema.sql

Enums:

user_role: buyer, seller, admin

condition_grade: A, B, C, D

listing_status: draft, processing, active, flagged_review, reserved, sold, delisted

Tables:

profiles

id, full_name, avatar_url, role, created_at, updated_at

categories

id, slug, name, description, created_at
All 8 categories are seeded.

listings

id, seller_id, category_id, title, description, price, condition_grade, status, city, created_at, updated_at

Price is stored as integer Indian Paise.
Do not invent category UUIDs; resolve seeded categories by ID/slug.

10. Supabase RLS — IMPORTANT

A live RLS recursion bug was found and fixed.

Old policies recursively queried public.profiles from policies on public.profiles, causing:
42P17: infinite recursion detected in policy for relation "profiles"

Fix migration:
supabase/migrations/004_fix_profiles_rls_recursion.sql

Current requirements:

authenticated users can read their own profile

authenticated users can update their own profile

users cannot update another user's profile

public signup can only create buyer/seller roles

users cannot self-assign admin

admin authorization uses parameterless public.is_admin()

profiles policies must not directly query public.profiles

Categories: public read, admin modification.
Listings: public active-read, seller own CRUD, admin read.

Never weaken RLS for convenience.

11. Current Security Helper

public.is_admin() is:

parameterless

SECURITY DEFINER

based on auth.uid()

hardened with restricted search path

protected by appropriate EXECUTE permissions

designed to avoid RLS recursion

Do not replace it with insecure client-side admin checks.

12. Milestone 3A — Seller Listing Foundation — COMPLETE

Implemented guided wizard:

Category

Product Details

Condition / Device Information

Photos

Review

Implemented:

seller-only access control

buyer/unauthenticated protection

all 8 categories

common product details

limited category-specific fields

structured condition declarations

local browser photo previews

photo removal

review screen

Back/Next navigation

required-field validation

ReGrade visual styling

Category-specific examples:

Smartphone: storage, RAM, battery health

Laptop: RAM, storage, processor

Gaming Console: storage, edition/model

Condition inputs:

overall condition

screen/display

body

functional issues

accessories

Not included yet:

Cloudinary

real AI grading

Roboflow/Hugging Face

dynamic pricing

fraud detection

Razorpay

orders

refurbishment

disputes

Photos are local browser previews only.

13. CURRENT BLOCKER — REAL LISTING PERSISTENCE

During QA, the wizard works without visible UI errors, but Submit Listing displays:
"Listing created successfully"

while no corresponding row appears in Supabase public.listings.

This means the current submit flow is demo-only, silently failing, or not actually wired to Supabase.

This MUST be fixed before the next milestone.

Required flow:
Seller Wizard → real Supabase listing insert → verify returned row → genuine success state.

Never show success unless Supabase confirms a successful insert.

14. Required Listing Persistence

Use the existing public.listings table. Do not create a duplicate listings table.

Use the authenticated user's real Supabase user ID for seller_id. Never trust a browser-supplied seller_id.

Resolve category_id using existing public.categories.

Persist appropriate existing fields:

seller_id

category_id

title

description

city

price if collected

condition_grade only according to the existing schema and without falsely claiming AI grading

status

Do not invent an AI-generated A/B/C/D grade. If condition_grade is required, inspect the actual schema and choose a safe temporary/demo representation without claiming it came from AI.

15. Listing Persistence Error Handling

The submit handler must inspect:

error

error.message

error.code

error.details

error.hint

Only show success when the insert returns no error and the returned row is confirmed.

Never swallow an insert error and then display success.

16. Listing RLS Requirements

unauthenticated users cannot create listings

buyers cannot create seller listings

sellers can create their own listings

Seller A cannot create/update/delete as Seller B

server-side auth context and database RLS both matter

Do not weaken RLS to make the insert work.

17. IMMEDIATE NEXT TASK FOR ANY NEW AI CODING AGENT

Before changing anything:

Read this handoff.

Inspect the actual current codebase.

Inspect the Seller Listing submit handler.

Inspect current public.listings schema.

Inspect current listings RLS policies.

Determine why UI says success while no Supabase row exists.

Fix ONLY listing persistence.

Verify an actual row appears in Supabase.

Run validation.

Stop.

Do NOT start AI grading.

18. Exact Current Scope

SELLER WIZARD → REAL SUPABASE LISTING INSERT

Expected:
Seller logs in → Sell A Device → complete wizard → Submit Listing → authenticated Supabase insert → returned listing row → genuine success state → seller can confirm the created listing.

19. NOT CURRENT SCOPE

Do NOT implement yet:

Cloudinary

Roboflow

Hugging Face

real AI grading

AI A/B/C/D model

defect bounding boxes

Trust Score

dynamic pricing

fraud detection/pHash

visual search

recommendations

AI assistant

demand forecasting

Razorpay

checkout

orders

refurbishment workflow

repair-shop dashboard

disputes

admin panel

production deployment

20. Environment

Local:
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

Never expose service-role keys to client code. Never commit secrets.

21. Current Validation

Verified:

Buyer/Seller onboarding works

buyer role saves

seller role saves

admin self-assignment is blocked

Supabase RLS recursion was fixed

seller listing wizard opens

buyer/unauthenticated seller-flow access is protected

all 8 categories render

wizard navigation works

validation works

local photo previews work

review step works

Outstanding:

real seller listing row creation in Supabase

22. Testing Checklist

Seller:
→ create listing
→ verify row in public.listings
→ correct seller_id
→ correct category_id
→ correct title/description/city
→ correct status

Buyer:
→ cannot create listing

Unauthenticated:
→ cannot create listing

Ownership:
→ Seller A cannot create/update/delete Seller B's listing

Regression:

homepage

browse

product detail

signup

login

buyer dashboard

seller dashboard

logout

onboarding

Run:
npm run lint
npx tsc --noEmit
npm run build

23. Future Work

After listing persistence:

Seller listing images / Cloudinary

condition-assessment data model

mock/deterministic grading adapter

real Tier-1 AI grading

defect visualization

Trust Score

fair/dynamic pricing

seller dashboard

real marketplace catalogue

buyer orders

Razorpay test checkout

refurbishment workflow

72-hour protection/disputes

admin panel

visual search

AI assistant

recommendations

demand forecasting

Keep these separate and incremental.

24. Payment Vocabulary

Never call the system legal escrow.

Use:
PAYMENT_PENDING
PAID
HELD
PAYOUT_ELIGIBLE
SETTLED
DISPUTED
REFUNDED

Razorpay will initially be test-mode.

25. Development Rules

Every AI coding agent must:

Read this file first.

Inspect actual files before modifying.

Treat the actual codebase as source of truth.

Work incrementally.

Preserve working functionality.

Avoid unnecessary rewrites/dependencies.

Protect secrets and RLS.

Clearly label mock/demo functionality.

Run validation after meaningful changes.

Do not commit/push unless explicitly instructed.

Do not automatically start another milestone.

Do not silently change architecture.

Do not create duplicate database tables when an existing table is intended.

Do not claim database persistence unless the database confirms it.

Stop after the assigned task and report exactly what changed.

26. Git / GitHub

GitHub push is NOT required for development.
Do not commit or push unless explicitly instructed.
Local development should continue normally.

27. Source of Truth

The actual codebase is the ultimate source of truth.

If this handoff conflicts with current code:

inspect the code

identify the discrepancy

report it

make only the necessary correction

Do not blindly follow stale instructions.

28. CURRENT STATE

COMPLETE

Milestone 1 — Frontend foundation

Milestone 2 — Supabase + authentication

Buyer/Seller role selection and persistence

Profiles RLS recursion fix

Milestone 3A — Seller Listing Foundation

CURRENT BLOCKER

Real seller listing persistence to public.listings

The UI currently reports successful creation, but the listing is not appearing in Supabase. Fix and verify this before proceeding.

NOT STARTED / LATER

Cloudinary

Real AI/ML grading

Pricing engine

Fraud detection

Orders

Razorpay

Refurbishment

Disputes

Admin panel

Advanced AI features

Production deployment