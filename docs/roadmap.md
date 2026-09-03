# ReGrade: Implementation Roadmap & Build Order
**Version:** 1.0 (Finalized)  
**Target Duration:** 12 Weeks  
**Team Composition:** 4-Person B.Tech Student Team  
**Architecture:** Next.js Monolith + Supabase + In-App AI Adapters

---

## 1. Team Responsibilities & Ownership Matrix

```
┌───────────────────────────────────────────────────────────────────────────────────────────┐
│                               TEAM RESPONSIBILITY MATRIX                                  │
├────────────────────┬───────────────────────────────────┬──────────────────────────────────┤
│ Member             │ Primary Ownership Area            │ Core Deliverables                │
├────────────────────┼───────────────────────────────────┼──────────────────────────────────┤
│ **Person 1 (P1)**  │ Buyer Experience & Marketplace UI │ • Catalog explore & multi-filters│
│                    │                                   │ • Product page & AI defect viewer│
│                    │                                   │ • Dual-mode checkout interface   │
├────────────────────┼───────────────────────────────────┼──────────────────────────────────┤
│ **Person 2 (P2)**  │ Database, Auth & Payment Backend  │ • Supabase schema & RLS policies │
│                    │                                   │ • Razorpay Test Mode integration │
│                    │                                   │ • Order & payment state machine  │
├────────────────────┼───────────────────────────────────┼──────────────────────────────────┤
│ **Person 3 (P3)**  │ AI Adapters & Algorithmic Engines │ • Roboflow / YOLO vision adapter │
│                    │                                   │ • Indian dynamic pricing formula │
│                    │                                   │ • Fraud pHash & Trust Score math │
├────────────────────┼───────────────────────────────────┼──────────────────────────────────┤
│ **Person 4 (P4)**  │ Seller, Partner, Admin & Disputes │ • Guided listing wizard (angles) │
│                    │                                   │ • Partner repair shop portal & QC│
│                    │                                   │ • 72h dispute & Admin console    │
└────────────────────┴───────────────────────────────────┴──────────────────────────────────┘
```

---

## 2. 12-Week Academic Implementation Timeline

```
┌───────────────────────────────────────────────────────────────────────────────────────────┐
│                                12-WEEK SPRINT BREAKDOWN                                   │
├─────────┬──────────────────────────────────┬──────────────────────────────────────────────┤
│ Week    │ Sprint Focus                     │ Individual Team Deliverables                 │
├─────────┼──────────────────────────────────┼──────────────────────────────────────────────┤
│ **W 1** │ Project Initialization & DB      │ • P2: Setup Next.js 14, Supabase & Auth RLS  │
│         │                                  │ • P4: Draft DDL schema & master seed data    │
│         │                                  │ • P1: Setup Tailwind CSS & layout components │
│         │                                  │ • P3: Setup AI adapter types & mock stubs    │
├─────────┼──────────────────────────────────┼──────────────────────────────────────────────┤
│ **W 2** │ Master Catalog & Static Pages    │ • P1: Landing page & category navigation     │
│         │                                  │ • P4: Seed 50 Indian models with INR MSRPs   │
│         │                                  │ • P2: Catalog API routes (`/api/catalog/*`)  │
│         │                                  │ • P3: Implement dynamic pricing formula in ₹ │
├─────────┼──────────────────────────────────┼──────────────────────────────────────────────┤
│ **W 3** │ Guided Seller Listing Wizard     │ • P4: Multi-step angle capture UI wizard     │
│         │                                  │ • P1: Image upload & thumbnail preview grid  │
│         │                                  │ • P2: Cloudinary/Supabase image storage route│
│         │                                  │ • P3: sharp-phash duplicate image check      │
├─────────┼──────────────────────────────────┼──────────────────────────────────────────────┤
│ **W 4** │ In-App AI Assessment Pipeline    │ • P3: MockConditionService with fixtures     │
│         │                                  │ • P3: Trust Score composite math calculator  │
│         │                                  │ • P2: Listing assessment endpoint (`/assess`)│
│         │                                  │ • P4: Seller appraisal review & publish page │
├─────────┼──────────────────────────────────┼──────────────────────────────────────────────┤
│ **W 5** │ Marketplace & Faceted Search     │ • P1: Explore catalog with multi-filters     │
│         │                                  │ • P2: Optimized PostgreSQL search queries    │
│         │                                  │ • P4: Category-specific spec badge rendering │
│         │                                  │ • P3: Test pricing consistency across grades │
├─────────┼──────────────────────────────────┼──────────────────────────────────────────────┤
│ **W 6** │ Product Detail & AI Inspect UI   │ • P1: Interactive image zoom & defect boxes  │
│         │                                  │ • P1: Explainable Trust Score modal breakdown│
│         │                                  │ • P3: Defect coordinate mapping ([ymin, xmin])│
│         │                                  │ • P2: Increment view counts & track inventory│
├─────────┼──────────────────────────────────┼──────────────────────────────────────────────┤
│ **W 7** │ Razorpay Checkout & Payout State │ • P1: Dual checkout UI (As-Is vs Refurbished)│
│         │                                  │ • P2: Razorpay Test Mode order creation      │
│         │                                  │ • P2: Webhook signature verify -> HELD state │
│         │                                  │ • P4: Order confirmation & shipping slips    │
├─────────┼──────────────────────────────────┼──────────────────────────────────────────────┤
│ **W 8** │ Partner Repair Shop Portal       │ • P4: Partner job queue & diagnostic intake  │
│         │                                  │ • P3: Repair cost lookup matrix (parts/labor)│
│         │                                  │ • P4: Post-repair QC upload & status dispatch│
│         │                                  │ • P2: Refurbishment job state transitions    │
├─────────┼──────────────────────────────────┼──────────────────────────────────────────────┤
│ **W 9** │ 72-Hour Dispute System           │ • P1: Buyer 72h countdown timer banner       │
│         │                                  │ • P4: Dispute claim submission form (photos) │
│         │                                  │ • P2: Dispute data model & auto-hold escrow  │
│         │                                  │ • P2: Cron job for 72h auto-pass expiration  │
├─────────┼──────────────────────────────────┼──────────────────────────────────────────────┤
│ **W 10**│ Admin Arbitration & Moderation   │ • P4: Admin dispute desk with split-view     │
│         │                                  │ • P4: Admin fraud moderation review queue    │
│         │                                  │ • P2: Resolution actions (Refund vs Payout)  │
│         │                                  │ • P1: Seller & Buyer notification banners    │
├─────────┼──────────────────────────────────┼──────────────────────────────────────────────┤
│ **W 11**│ Real AI Vision Integration       │ • P3: Connect Roboflow YOLOv8 API for Tier 1 │
│         │                                  │ • P3: Configure `USE_REAL_ML_SERVICE` toggle │
│         │                                  │ • ALL: End-to-end regression & bug fixing    │
│         │                                  │ • ALL: Mobile responsiveness & UI polish     │
├─────────┼──────────────────────────────────┼──────────────────────────────────────────────┤
│ **W 12**│ Demo Hardening & Documentation   │ • ALL: Pre-seed 3 demo listing scenarios     │
│         │                                  │ • ALL: Test offline presentation mode        │
│         │                                  │ • ALL: Compile final report & architecture   │
│         │                                  │ • ALL: Rehearse final viva presentation      │
└─────────┴──────────────────────────────────┴──────────────────────────────────────────────┘
```

---

## 3. Concise Build Order (Step-by-Step Milestones)

### Milestone 1: Data & Security Baseline
* Initialize Next.js 14 project with TypeScript and Tailwind CSS.
* Configure Supabase PostgreSQL tables, enums, foreign keys, and Row-Level Security (RLS) policies.
* Configure Supabase Auth with login, registration, and role syncing to `profiles`.
* Execute `seed.sql` to populate 8 categories and 50 device models with Indian MSRP launch prices.

### Milestone 2: AI Service Contracts & Deterministic Mock Engine
* Create `src/lib/ai/types.ts` defining `IConditionGradingService` and `ConditionResult`.
* Implement `MockConditionService` producing deterministic bounding boxes and grades.
* Implement `PricingEngine` calculating Indian market depreciation in ₹.
* Implement `TrustScoreCalculator` computing the composite $0\text{--}100$ score.

### Milestone 3: Guided Seller Wizard & Assessment Flow
* Build `/sell` multi-step wizard:
  1. Select Category $\rightarrow$ Brand $\rightarrow$ Model $\rightarrow$ Specs.
  2. Upload mandatory angle photos (Tier 1: Front ON/OFF, Back, Edges, Ports).
  3. Fill functional checklist (Battery health, functional issues).
* Create API route `POST /api/listings/[id]/assess` invoking AI adapters and saving to `condition_assessments` and `pricing_estimates`.
* Build appraisal summary screen where seller reviews Grade, Trust Score, and Price Band before publishing.

### Milestone 4: Marketplace Catalog & AI Inspection UI
* Build `/explore` page with category chips, price slider (₹), Grade filter ($A, B, C, D$), and Trust Score filter.
* Build `/product/[id]` detail page:
  * High-resolution photo gallery with toggleable defect bounding boxes.
  * Trust Score widget with expandable 5-pillar explanation.
  * Side-by-side pricing card: **Buy As-Is** vs. **Buy Refurbished**.

### Milestone 5: Dual-Mode Checkout & Payment State Engine
* Integrate Razorpay Test Mode client checkout SDK.
* Create Route Handler `POST /api/orders` calculating totals server-side.
* Create Webhook Handler `POST /api/orders/[id]/verify-payment` validating HMAC signature and marking order state as `HELD`.
* Render order tracking stepper on Buyer Dashboard (`/dashboard/buyer`).

### Milestone 6: Partner Repair Shop Portal
* Build `/dashboard/partner` with work order queue for local repair partners.
* Implement Diagnostic Intake Modal to verify physical condition on arrival.
* Implement Repair Cost Logger (parts + labor in ₹).
* Implement QC Submission Form (upload post-repair photos, mark QC Passed, update status to `REPAIRED_AND_QC`).

### Milestone 7: 72-Hour Inspection Window & Dispute Center
* On order status `DELIVERED`, set `inspection_deadline = NOW() + INTERVAL '72 hours'`.
* Render prominent 72-hour countdown timer on Buyer Dashboard with two actions:
  * `[ Accept & Confirm Device ]` $\rightarrow$ Moves order to `PAYOUT_ELIGIBLE`.
  * `[ Raise Condition Dispute ]` $\rightarrow$ Opens dispute modal.
* Build `/dashboard/admin` dispute desk with split-view comparison (Original AI photos vs. Buyer evidence photos) with one-click refund/payout resolution.
* Build daily cron route `GET /api/cron/expire-inspections` to auto-clear orders past 72 hours.

### Milestone 8: Real AI Vision Integration (Tier 1)
* Connect Roboflow/HuggingFace YOLOv8 endpoint inside `RoboflowVisionService`.
* Add environment flag `USE_REAL_ML_SERVICE=true/false` to allow live API calls when online and instant mock fallback when offline.

### Milestone 9: End-to-End Hardening & Viva Demo Preparation
* Seed 3 comprehensive test scenarios (see Section 5 below).
* Run cross-browser and mobile responsive checks.
* Verify offline demo reliability.

---

## 4. MVP vs. Phase 2 Scope Boundaries

```
┌───────────────────────────────────────────────────┬───────────────────────────────────────────────────┐
│ INCLUDED IN MVP (STRICT FOCUS)                    │ DEFERRED TO PHASE 2 / FUTURE                      │
├───────────────────────────────────────────────────┼───────────────────────────────────────────────────┤
│ • 8 marketplace categories                        │ • CLIP-based visual product similarity search     │
│ • Vision AI grading for Phones, Laptops, Consoles │ • AI RAG marketplace assistant / chatbot          │
│ • Declarative rule-based grading for other 5 cats │ • Real bank payout transfers via Razorpay Payouts │
│ • Next.js monolithic Route Handlers (no Express)  │ • Vision AI models for Audio, Watches, Cameras    │
│ • Razorpay Test Mode with HELD payout ledger      │ • Shiprocket / Delhivery courier API integration  │
│ • Partner refurbishment portal & QC logging       │ • Hardware desktop USB diagnostic test utility    │
│ • 72-hour inspection window & dispute arbitration │ • Microservices / Docker / Kubernetes infra       │
│ • 100% offline-capable mock adapter mode          │ • Kafka / RabbitMQ / Redis message brokers        │
└───────────────────────────────────────────────────┴───────────────────────────────────────────────────┘
```

---

## 5. Demonstration Strategy for Final Project Evaluation

To guarantee a flawless presentation during the final academic project viva, the database will be pre-seeded with **3 distinct demo scenarios**:

### Demo Scenario 1: Pristine Flagship (Clean Buy As-Is Flow)
* **Device:** Apple iPhone 13 (128GB, Midnight), 14 months old, 92% Battery Health.
* **AI Output:** Grade A, 95% Confidence, 0 defects, Trust Score: **92/100**, Recommended Price: **₹36,000**.
* **Flow to Demo:** Seller uploads clean photos $\rightarrow$ Instant Grade A $\rightarrow$ Buyer explores catalog $\rightarrow$ Selects *Buy As-Is* $\rightarrow$ Completes Razorpay UPI test payment $\rightarrow$ Order marked `HELD` $\rightarrow$ Buyer confirms receipt $\rightarrow$ Status moves to `PAYOUT_ELIGIBLE`.

### Demo Scenario 2: Repairable Device (Verified Refurbishment Flow)
* **Device:** Lenovo ThinkPad T14 (Gen 2), 30 months old, degraded battery (68% health) and minor lid scratch.
* **AI Output:** Grade C, Trust Score: **78/100**, Recommended As-Is Price: **₹26,000**, Estimated Refurb Cost: **₹3,800** (₹3,000 50Wh Battery + ₹800 Labor).
* **Flow to Demo:** Buyer views product page $\rightarrow$ Compares *As-Is (₹26,000)* vs *Refurbished (₹29,800)* $\rightarrow$ Selects *Buy Refurbished* $\rightarrow$ Partner Shop logs diagnostic $\rightarrow$ Performs battery swap $\rightarrow$ Submits post-repair QC photos (Upgraded to Grade A) $\rightarrow$ Dispatches to buyer.

### Demo Scenario 3: Fraud Prevention & Dispute Handling
* **Fraud Demo:** Seller uploads an image matching an existing listing's perceptual hash (`phash`) $\rightarrow$ System flags listing with Risk Score **75/100** $\rightarrow$ Listing blocked from public view and sent to Admin Moderation Queue.
* **Dispute Demo:** Buyer receives an order where screen was cracked in transit $\rightarrow$ Buyer raises dispute within 72h window $\rightarrow$ Admin opens Arbitration Desk $\rightarrow$ Compares AI listing photos vs. buyer damage evidence $\rightarrow$ Approves full refund $\rightarrow$ Escrow state updates to `REFUNDED`.
