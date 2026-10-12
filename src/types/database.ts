/**
 * Database type definitions for ReGrade.
 *
 * This file contains hand-authored types that match the Supabase schema
 * defined in supabase/migrations/001_initial_schema.sql.
 *
 * In a future milestone these can be replaced with Supabase CLI generated
 * types via: `npx supabase gen types typescript --local > src/types/database.ts`
 */

export type UserRole = "buyer" | "seller" | "admin";

export type ConditionGrade = "A" | "B" | "C" | "D";

export type ListingStatus =
  | "draft"
  | "processing"
  | "active"
  | "flagged_review"
  | "reserved"
  | "sold"
  | "delisted";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          role: UserRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          full_name?: string | null;
          avatar_url?: string | null;
          role?: UserRole;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          slug?: string;
          name?: string;
          description?: string | null;
        };
      };
      listings: {
        Row: {
          id: string;
          seller_id: string;
          category_id: string;
          title: string;
          description: string | null;
          price: number;
          condition_grade: ConditionGrade;
          status: ListingStatus;
          city: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          seller_id: string;
          category_id: string;
          title: string;
          description?: string | null;
          price: number;
          condition_grade: ConditionGrade;
          status?: ListingStatus;
          city?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          category_id?: string;
          title?: string;
          description?: string | null;
          price?: number;
          condition_grade?: ConditionGrade;
          status?: ListingStatus;
          city?: string | null;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: UserRole;
      condition_grade: ConditionGrade;
      listing_status: ListingStatus;
    };
  };
}
