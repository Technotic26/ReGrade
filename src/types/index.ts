export type UserRole = "buyer" | "seller" | "partner" | "admin";

export type ConditionGrade = "A" | "B" | "C" | "D";

export type ListingStatus =
  | "draft"
  | "processing"
  | "active"
  | "flagged_review"
  | "reserved"
  | "sold"
  | "delisted";

export type OrderMode = "as_is" | "refurbished";

export type OrderStatus =
  | "payment_pending"
  | "held"
  | "in_transit_direct"
  | "at_partner"
  | "repaired_and_qc"
  | "in_transit_buyer"
  | "delivered"
  | "payout_eligible"
  | "settled"
  | "disputed"
  | "refunded"
  | "cancelled";

export type DisputeStatus =
  | "opened"
  | "under_review"
  | "resolved_refund"
  | "resolved_payout"
  | "rejected";

export interface Category {
  id: string;
  slug: string;
  name: string;
  iconName: string;
  tier: 1 | 2;
  isActive: boolean;
}
