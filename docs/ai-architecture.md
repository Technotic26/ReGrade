# ReGrade: AI & Algorithmic Architecture
**Version:** 1.0 (Finalized)  
**Implementation Pattern:** In-App TypeScript Service Adapters (Zero Python Microservice Dependency)  
**Target Market:** Indian Used Electronics Recommerce (INR ₹)

---

## 1. Architectural Overview & Design Philosophy

The ReGrade AI architecture is built around the **Replaceable Service Adapter Pattern**. All AI capabilities are integrated directly into the Next.js application using standard TypeScript interfaces. 

```
                                NEXT.JS APPLICATION LAYER
                                            │
                                            ▼
                           +---------------------------------+
                           |   IConditionGradingService      |
                           +----------------+----------------+
                                            |
                    +-----------------------+-----------------------+
                    |                                               |
                    v                                               v
    +-------------------------------+               +-------------------------------+
    |   MockConditionService        |               |   RoboflowVisionService       |
    |   • Deterministic demo data   |               |   • Real YOLOv8 Cloud API     |
    |   • Rule-based heuristics     |               |   • Bounding box predictions  |
    |   • 100% offline reliability  |               |   • Active when online        |
    +-------------------------------+               +-------------------------------+
```

### Core Design Principles
1. **Zero Mandatory Python Microservices:** The application calls external vision APIs (Roboflow / HuggingFace) or in-app rule engines via standard `fetch()`, avoiding complex multi-server DevOps.
2. **Offline-First Resilience:** If third-party AI APIs are unreachable or out of credits, the system gracefully falls back to deterministic mock adapters without crashing the user flow.
3. **Academic Explainability:** Every AI decision (Grade, Price, Trust Score) is backed by transparent formulas and visual bounding boxes rather than black-box outputs.

---

## 2. Category Tiering: Vision AI vs. Rule-Based Declarative Engine

```
┌───────────────────────────────────────────────┬───────────────────────────────────────────────┐
│ TIER 1: VISION AI (CORE MVP FOCUS)            │ TIER 2: DECLARATIVE & RULE-BASED (MVP READY)  │
├───────────────────────────────────────────────┼───────────────────────────────────────────────┤
│ • Smartphones                                 │ • Tablets                                     │
│ • Laptops                                     │ • Headphones / Earbuds                        │
│ • Gaming Consoles                             │ • Smartwatches                                │
│                                               │ • Cameras & Lenses                            │
│                                               │ • Monitors & Displays                         │
├───────────────────────────────────────────────┼───────────────────────────────────────────────┤
│ • Guided multi-angle image upload             │ • Standard 4-photo gallery upload             │
│ • Real defect detection (Roboflow / YOLO)     │ • Structured seller functional questionnaire  │
│ • Bounding box coordinates on images          │ • Heuristic rule engine computes Grade/Price  │
│ • Automated Grade A/B/C/D + Confidence Score  │ • Flagged for manual review if divergent      │
└───────────────────────────────────────────────┴───────────────────────────────────────────────┘
```

---

## 3. Condition Grading & Defect Localization

### 3.1. Standard Grading Scale Definitions

* **Grade A (Pristine / Like New):** Screen and housing 100% scratch-free from $30\text{ cm}$; zero cracks; battery health $\ge 85\%$; all ports and buttons fully functional.
* **Grade B (Good / Light Wear):** Minor hairline micro-scratches on casing or bezel; screen completely intact with no cracks; battery health $80\text{--}84\%$; 100% functionally sound.
* **Grade C (Fair / Noticeable Wear):** Visible deep scratches or casing scuffs; minor paint chipping; battery health $< 80\%$; screen intact with no cracks; 100% functionally sound.
* **Grade D (Needs Repair / Heavily Used):** Cracked glass/casing, broken ports, sticky keys, or major functional defect; prime candidate for the **Buy Refurbished** pathway.

### 3.2. Tier-1 Category Inspection Matrix

| Category | Mandatory Guided Image Angles | Evaluated Defect Classes |
| :--- | :--- | :--- |
| **Smartphones** | 1. Screen ON (White screen)<br>2. Screen OFF (Reflections)<br>3. Back Panel<br>4. Camera Cluster<br>5. Top/Bottom Ports | Screen scratches, glass cracks, dead pixels, OLED burn, edge dents, camera lens scuffs, charging port wear. |
| **Laptops** | 1. Screen ON<br>2. Keyboard & Trackpad<br>3. Top Lid<br>4. Bottom Base<br>5. Left/Right I/O Ports | Keycap shine/wear, trackpad friction loss, chassis dents, screen anti-glare peeling, hinge misalignment. |
| **Gaming Consoles** | 1. Top/Front Shell<br>2. Rear Exhaust Vents<br>3. All I/O Ports<br>4. Controller Face & Sticks | Dust clogging, port pin bending, shell drops/cracks, analog thumbstick rubber wear. |

### 3.3. In-App Adapter Code Design

```typescript
// src/lib/ai/types.ts
export interface DefectItem {
  defectClass: 'scratch' | 'dent' | 'crack' | 'burn' | 'wear';
  zone: string; // 'screen', 'keyboard', 'back', 'bezel', 'ports'
  boundingBox?: [number, number, number, number]; // [ymin, xmin, ymax, xmax] in % (0-100)
  severity: 'minor' | 'moderate' | 'severe';
}

export interface ConditionResult {
  grade: 'A' | 'B' | 'C' | 'D';
  confidenceScore: number; // 0 - 100
  detectedDefects: DefectItem[];
  explanation: string;
  isMock: boolean;
}

export interface IConditionGradingService {
  gradeListing(params: {
    categorySlug: string;
    modelName: string;
    imageUrls: string[];
    declaredFunctionalIssues?: string[];
    batteryHealth?: number;
  }): Promise<ConditionResult>;
}
```

```typescript
// src/lib/ai/condition-service.ts
import { IConditionGradingService, ConditionResult } from './types';

export class MockConditionService implements IConditionGradingService {
  async gradeListing({ categorySlug, declaredFunctionalIssues, batteryHealth }: any): Promise<ConditionResult> {
    if (declaredFunctionalIssues && declaredFunctionalIssues.length > 0) {
      return {
        grade: 'D',
        confidenceScore: 94,
        detectedDefects: [{
          defectClass: 'wear',
          zone: 'hardware',
          severity: 'severe',
          boundingBox: [25, 25, 75, 75]
        }],
        explanation: `Hardware defect declared: ${declaredFunctionalIssues.join(', ')}. Eligible for Refurbishment.`,
        isMock: true
      };
    }

    if (batteryHealth && batteryHealth < 80) {
      return {
        grade: 'C',
        confidenceScore: 89,
        detectedDefects: [{ defectClass: 'wear', zone: 'battery', severity: 'moderate' }],
        explanation: `Cosmetic condition is good, but battery health is at ${batteryHealth}% (below 80% threshold).`,
        isMock: true
      };
    }

    return {
      grade: 'A',
      confidenceScore: 92,
      detectedDefects: [{
        defectClass: 'scratch',
        zone: 'bezel',
        severity: 'minor',
        boundingBox: [12, 40, 22, 55]
      }],
      explanation: `Verified under standard ${categorySlug} guidelines. Zero critical screen or structural defects detected.`,
      isMock: true
    };
  }
}

export class RoboflowVisionService implements IConditionGradingService {
  constructor(private apiKey: string, private endpointUrl: string) {}

  async gradeListing({ categorySlug, imageUrls }: any): Promise<ConditionResult> {
    try {
      const res = await fetch(`${this.endpointUrl}?api_key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageUrls[0] })
      });

      if (!res.ok) throw new Error('Roboflow API error');
      const data = await res.json();

      const detectedDefects = (data.predictions || []).map((p: any) => ({
        defectClass: p.class.includes('crack') ? 'crack' : 'scratch',
        zone: p.class.includes('screen') ? 'screen' : 'body',
        boundingBox: [
          Math.max(0, p.y - p.height / 2),
          Math.max(0, p.x - p.width / 2),
          Math.min(100, p.y + p.height / 2),
          Math.min(100, p.x + p.width / 2)
        ],
        severity: p.confidence > 0.8 ? 'severe' : 'minor'
      }));

      const hasCrack = detectedDefects.some((d: any) => d.defectClass === 'crack');
      const grade = hasCrack ? 'D' : detectedDefects.length > 2 ? 'C' : detectedDefects.length > 0 ? 'B' : 'A';

      return {
        grade,
        confidenceScore: Math.round((data.predictions?.[0]?.confidence || 0.88) * 100),
        detectedDefects,
        explanation: `AI detected ${detectedDefects.length} defect(s). Graded as ${grade}.`,
        isMock: false
      };
    } catch (err) {
      console.warn('Vision API call failed, using mock adapter fallback.');
      return new MockConditionService().gradeListing({ categorySlug, imageUrls });
    }
  }
}

export class AIServiceFactory {
  static getConditionService(): IConditionGradingService {
    if (process.env.USE_REAL_ML_SERVICE === 'true' && process.env.ROBOFLOW_API_KEY) {
      return new RoboflowVisionService(process.env.ROBOFLOW_API_KEY, process.env.ROBOFLOW_MODEL_URL!);
    }
    return new MockConditionService();
  }
}
```

---

## 4. Dynamic Fair Pricing Engine (Indian Market Calibration)

### 4.1. Mathematical Valuation Model (INR ₹)

$$P_{\text{recommended}} = P_{\text{launch\_msrp}} \times e^{-k_{\text{cat}} \cdot t_{\text{months}}} \times \gamma_{\text{grade}} \times \beta_{\text{battery}} \times \mu_{\text{spec}}$$

Where:
* $P_{\text{launch\_msrp}}$: Original launch price in India in ₹.
* $k_{\text{cat}}$: Category-specific exponential monthly depreciation coefficient:
  * Smartphones: $k = 0.025$ (depreciates $\sim 26\%$ in Year 1)
  * Laptops: $k = 0.018$ (depreciates $\sim 19\%$ in Year 1)
  * Gaming Consoles: $k = 0.012$ (depreciates $\sim 13\%$ in Year 1, highest retention)
  * Tablets: $k = 0.020$
  * Audio / Smartwatches: $k = 0.022$
  * Cameras: $k = 0.014$
  * Monitors: $k = 0.016$
* $\gamma_{\text{grade}}$: Condition grade multiplier:
  * Grade A: $0.88$
  * Grade B: $0.75$
  * Grade C: $0.60$
  * Grade D: $0.42$
* $\beta_{\text{battery}}$: Battery health multiplier:
  * $\text{Health} \ge 85\% \implies \beta = 1.00$
  * $80\% \le \text{Health} < 85\% \implies \beta = 0.95$
  * $\text{Health} < 80\% \implies \beta = 0.88$
* Suggested Listing Range:
  $$P_{\min} = \text{round}(P_{\text{recommended}} \times 0.93), \quad P_{\max} = \text{round}(P_{\text{recommended}} \times 1.07)$$

### 4.2. Concrete Indian Device Calculations

```
┌──────────────────────────────┬────────────┬─────────┬─────────┬──────────────────────┬─────────────────────────┐
│ Device Model                 │ Launch (₹) │ Age (t) │ Grade   │ Recommended Price    │ Fair Suggested Band     │
├──────────────────────────────┼────────────┼─────────┼─────────┼──────────────────────┼─────────────────────────┤
│ Apple iPhone 13 (128GB)      │ ₹69,900    │ 24 mo   │ Grade A │ ₹34,500              │ ₹32,000 – ₹37,000       │
│ Apple iPhone 13 (128GB)      │ ₹69,900    │ 24 mo   │ Grade C │ ₹23,500              │ ₹21,500 – ₹25,000       │
│ Apple MacBook Air M1 (256GB) │ ₹92,900    │ 36 mo   │ Grade B │ ₹44,000              │ ₹41,000 – ₹47,000       │
│ Sony PS5 Digital Edition     │ ₹44,900    │ 18 mo   │ Grade A │ ₹31,500              │ ₹29,000 – ₹33,500       │
│ Sony WH-1000XM4 Headphones   │ ₹29,990    │ 14 mo   │ Grade B │ ₹13,500              │ ₹12,000 – ₹15,000       │
│ Canon EOS 200D II DSLR       │ ₹58,995    │ 20 mo   │ Grade B │ ₹32,000              │ ₹29,500 – ₹34,500       │
└──────────────────────────────┴────────────┴─────────┴─────────┴──────────────────────┴─────────────────────────┘
```

---

## 5. ReGrade Trust Score Architecture

The Trust Score $T \in [0, 100]$ provides an objective, transparent measure of transaction reliability:

$$T = (0.30 \times S_{\text{ai}}) + (0.25 \times S_{\text{seller}}) + (0.20 \times S_{\text{fraud}}) + (0.15 \times S_{\text{price}}) + (0.10 \times S_{\text{spec}})$$

### 5.1. Sub-Score Formulations
1. **$S_{\text{ai}}$ (AI Visual Confidence):** Direct model confidence score ($0\text{--}100$).
2. **$S_{\text{seller}}$ (Seller Reliability):** Based on seller rating ($R \in [1, 5]$) and completed sales ($N$):
   $$S_{\text{seller}} = (R \times 16) + \min(20, N \times 4)$$
3. **$S_{\text{fraud}}$ (Anti-Fraud Clearance):** $100 - \text{Risk Score}$.
4. **$S_{\text{price}}$ (Price Fairness Index):** Penalizes deviations from fair market median:
   $$S_{\text{price}} = \max\left(0, 100 - 200 \times \left| \frac{P_{\text{listing}} - P_{\text{recommended}}}{P_{\text{recommended}}} \right|\right)$$
5. **$S_{\text{spec}}$ (Spec & Identifier Proof):** Full score if 15-digit IMEI/serial provided, battery health logged, and all specs filled.

```
                                  TRUST SCORE BREAKDOWN (Example: 89/100)
┌──────────────────────────────────────────┬────────┬───────────┬───────────────────────┐
│ Component                                │ Weight │ Raw Score │ Contribution          │
├──────────────────────────────────────────┼────────┼───────────┼───────────────────────┤
│ 1. AI Verification Confidence            │ 30%    │ 92 / 100  │ 27.6 pts              │
│ 2. Seller Reliability & Past Orders      │ 25%    │ 80 / 100  │ 20.0 pts              │
│ 3. Anti-Fraud & Authenticity Clearance   │ 20%    │ 95 / 100  │ 19.0 pts              │
│ 4. Price Fairness (vs. Indian Market)    │ 15%    │ 90 / 100  │ 13.5 pts              │
│ 5. Hardware Spec & IMEI Verification     │ 10%    │ 85 / 100  │ 8.5 pts               │
├──────────────────────────────────────────┴────────┴───────────┼───────────────────────┤
│ COMPOSITE REGRADE TRUST SCORE                                 │ 88.6 -> 89 / 100      │
│ Trust Badge Classification                                    │ VERIFIED EXCELLENT    │
└───────────────────────────────────────────────────────────────┴───────────────────────┘
```

---

## 6. Fraud & Risk Screening Engine

```
                             SELLER SUBMITS LISTING
                                       │
            ┌──────────────────────────┼──────────────────────────┐
            ▼                          ▼                          ▼
   [Image Hash Check]         [Pricing Bound Check]      [IMEI / Serial Check]
   sharp-phash computation    Flags if price < 35% of    Luhn algorithm validation;
   Hamming distance < 5 flag  depreciated base value     duplicate active DB check
            │                          │                          │
            └──────────────────────────┼──────────────────────────┘
                                       │
                                       ▼
                       [Rule-Based Risk Aggregator]
                       • Duplicate image found:  +60 Risk Points
                       • Unrealistic low price:  +35 Risk Points
                       • Invalid IMEI format:    +25 Risk Points
                                       │
                      ┌────────────────┴────────────────┐
                      ▼                                 ▼
             Risk Score <= 30                  Risk Score > 30
             Action: APPROVE                   Action: FLAGGED_REVIEW
             Listing Status: `active`          Listing Status: `flagged_review`
```

---

## 7. Partner Refurbishment Cost Matrix

When a buyer selects **Buy Refurbished**, the system references this standard repair cost matrix to calculate the upfront refurbishment fee:

$$\text{Refurb Fee} = \text{Part Cost (₹)} + \text{Partner Labor Fee (₹)}$$

```
┌──────────────────┬─────────────────────────────┬───────────────┬────────────────┬──────────────────┐
│ Category         │ Defect / Component Service  │ Part Cost (₹) │ Labor Cost (₹) │ Total Refurb Fee │
├──────────────────┼─────────────────────────────┼───────────────┼────────────────┼──────────────────┤
│ **Smartphones**  │ Battery Replacement (<80%)  │ ₹2,200        │ ₹600           │ **₹2,800**       │
│ **Smartphones**  │ Display Glass / Screen Unit │ ₹4,500        │ ₹800           │ **₹5,300**       │
│ **Laptops**      │ Thermal Repaste + Deep Clean│ ₹200 (Paste)  │ ₹1,000         │ **₹1,200**       │
│ **Laptops**      │ Battery Replacement         │ ₹3,200        │ ₹800           │ **₹4,000**       │
│ **Consoles**     │ Fan Clean + Thermal Service │ ₹100          │ ₹900           │ **₹1,000**       │
│ **Audio**        │ Earcup Cushion Replacement  │ ₹600          │ ₹300           │ **₹900**         │
│ **Smartwatches** │ Strap + Glass Polish        │ ₹500          │ ₹400           │ **₹900**         │
│ **Monitors**     │ Power Supply Board Swap     │ ₹1,400        │ ₹600           │ **₹2,000**       │
└──────────────────┴─────────────────────────────┴───────────────┴────────────────┴──────────────────┘
```

---

## 8. 100% Offline Demo Guarantee

To guarantee that final project evaluations run with zero risk of external API failures or network timeouts:
1. `MockConditionService` contains realistic bounding boxes for sample test images.
2. `PricingEngine` executes fully locally in TypeScript.
3. `TrustScoreCalculator` is deterministic and instantaneous.
4. Setting `USE_REAL_ML_SERVICE=false` in `.env` runs the entire system self-contained in Next.js.
