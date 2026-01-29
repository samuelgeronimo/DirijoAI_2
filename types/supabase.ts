export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      coupons: {
        Row: {
          code: string
          created_at: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          max_uses: number | null
          rules: Json | null
          type: Database["public"]["Enums"]["coupon_type"]
          uses: number | null
          value: number
        }
        Insert: {
          code: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          rules?: Json | null
          type: Database["public"]["Enums"]["coupon_type"]
          uses?: number | null
          value: number
        }
        Update: {
          code?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          rules?: Json | null
          type?: Database["public"]["Enums"]["coupon_type"]
          uses?: number | null
          value?: number
        }
        Relationships: []
      }
      dispute_messages: {
        Row: {
          content: string
          created_at: string | null
          dispute_id: string
          evidence_url: string | null
          id: string
          is_system_message: boolean | null
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          dispute_id: string
          evidence_url?: string | null
          id?: string
          is_system_message?: boolean | null
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          dispute_id?: string
          evidence_url?: string | null
          id?: string
          is_system_message?: boolean | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dispute_messages_dispute_id_fkey"
            columns: ["dispute_id"]
            isOneToOne: false
            referencedRelation: "disputes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dispute_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      disputes: {
        Row: {
          admin_notes: string | null
          created_at: string | null
          id: string
          instructor_id: string
          lesson_id: string | null
          reason: string
          sla_deadline: string | null
          status: Database["public"]["Enums"]["dispute_status"] | null
          student_id: string
          verdict: Database["public"]["Enums"]["dispute_verdict"] | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string | null
          id?: string
          instructor_id: string
          lesson_id?: string | null
          reason: string
          sla_deadline?: string | null
          status?: Database["public"]["Enums"]["dispute_status"] | null
          student_id: string
          verdict?: Database["public"]["Enums"]["dispute_verdict"] | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string | null
          id?: string
          instructor_id?: string
          lesson_id?: string | null
          reason?: string
          sla_deadline?: string | null
          status?: Database["public"]["Enums"]["dispute_status"] | null
          student_id?: string
          verdict?: Database["public"]["Enums"]["dispute_verdict"] | null
        }
        Relationships: [
          {
            foreignKeyName: "disputes_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "disputes_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "disputes_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          created_at: string | null
          id: string
          metadata: Json | null
          owner_id: string
          status: Database["public"]["Enums"]["doc_status"] | null
          type: Database["public"]["Enums"]["doc_type"]
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          owner_id: string
          status?: Database["public"]["Enums"]["doc_status"] | null
          type: Database["public"]["Enums"]["doc_type"]
          url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          owner_id?: string
          status?: Database["public"]["Enums"]["doc_status"] | null
          type?: Database["public"]["Enums"]["doc_type"]
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      instructor_availability: {
        Row: {
          created_at: string | null
          day_of_week: number
          end_time: string
          hourly_rate_cents: number | null
          id: string
          instructor_id: string
          start_time: string
        }
        Insert: {
          created_at?: string | null
          day_of_week: number
          end_time: string
          hourly_rate_cents?: number | null
          id?: string
          instructor_id: string
          start_time: string
        }
        Update: {
          created_at?: string | null
          day_of_week?: number
          end_time?: string
          hourly_rate_cents?: number | null
          id?: string
          instructor_id?: string
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "instructor_availability_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["id"]
          },
        ]
      }
      instructors: {
        Row: {
          accepted_terms: boolean | null
          balance_cents: number | null
          bio: string | null
          city: string | null
          cnh_category: string | null
          cnh_issue_state: string | null
          cnh_number: string | null
          complement: string | null
          cpf: string | null
          created_at: string | null
          current_onboarding_step: number | null
          detran_registry_number: string | null
          id: string
          meeting_point_name: string | null
          neighborhood: string | null
          number: string | null
          phone: string | null
          pix_key: string | null
          bank_name: string | null
          account_number: string | null
          agency_number: string | null
          account_type: string | null
          rating: number | null
          service_city: string | null
          service_mode: string | null
          state: string | null
          status: Database["public"]["Enums"]["instructor_status"] | null
          street: string | null
          superpowers: string[] | null
          updated_at: string | null
          video_url: string | null
          zip_code: string | null
        }
        Insert: {
          accepted_terms?: boolean | null
          balance_cents?: number | null
          bio?: string | null
          city?: string | null
          cnh_category?: string | null
          cnh_issue_state?: string | null
          cnh_number?: string | null
          complement?: string | null
          cpf?: string | null
          created_at?: string | null
          current_onboarding_step?: number | null
          detran_registry_number?: string | null
          id: string
          meeting_point_name?: string | null
          neighborhood?: string | null
          number?: string | null
          phone?: string | null
          pix_key?: string | null
          bank_name?: string | null
          account_number?: string | null
          agency_number?: string | null
          account_type?: string | null
          rating?: number | null
          service_city?: string | null
          service_mode?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["instructor_status"] | null
          street?: string | null
          superpowers?: string[] | null
          updated_at?: string | null
          video_url?: string | null
          zip_code?: string | null
        }
        Update: {
          accepted_terms?: boolean | null
          balance_cents?: number | null
          bio?: string | null
          city?: string | null
          cnh_category?: string | null
          cnh_issue_state?: string | null
          cnh_number?: string | null
          complement?: string | null
          cpf?: string | null
          created_at?: string | null
          current_onboarding_step?: number | null
          detran_registry_number?: string | null
          id?: string
          meeting_point_name?: string | null
          neighborhood?: string | null
          number?: string | null
          phone?: string | null
          pix_key?: string | null
          bank_name?: string | null
          account_number?: string | null
          agency_number?: string | null
          account_type?: string | null
          rating?: number | null
          service_city?: string | null
          service_mode?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["instructor_status"] | null
          street?: string | null
          superpowers?: string[] | null
          updated_at?: string | null
          video_url?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "instructors_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ledger_entries: {
        Row: {
          amount_cents: number
          category: string
          created_at: string | null
          description: string
          id: string
          metadata: Json | null
          operation_type: Database["public"]["Enums"]["transaction_type"]
          profile_id: string
        }
        Insert: {
          amount_cents: number
          category: string
          created_at?: string | null
          description: string
          id?: string
          metadata?: Json | null
          operation_type: Database["public"]["Enums"]["transaction_type"]
          profile_id: string
        }
        Update: {
          amount_cents?: number
          category?: string
          created_at?: string | null
          description?: string
          id?: string
          metadata?: Json | null
          operation_type?: Database["public"]["Enums"]["transaction_type"]
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ledger_entries_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          created_at: string | null
          duration_minutes: number | null
          id: string
          instructor_id: string
          instructor_notes: string | null
          instructor_score: number | null
          pickup_address: string | null
          pickup_lat: number | null
          pickup_lng: number | null
          price_cents: number
          scheduled_at: string
          skills_evaluation: Json | null
          status: Database["public"]["Enums"]["lesson_status"] | null
          student_id: string
          student_notes: string | null
          updated_at: string | null
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          instructor_id: string
          instructor_notes?: string | null
          instructor_score?: number | null
          pickup_address?: string | null
          pickup_lat?: number | null
          pickup_lng?: number | null
          price_cents: number
          scheduled_at: string
          skills_evaluation?: Json | null
          status?: Database["public"]["Enums"]["lesson_status"] | null
          student_id: string
          student_notes?: string | null
          updated_at?: string | null
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          instructor_id?: string
          instructor_notes?: string | null
          instructor_score?: number | null
          pickup_address?: string | null
          pickup_lat?: number | null
          pickup_lng?: number | null
          price_cents?: number
          scheduled_at?: string
          skills_evaluation?: Json | null
          status?: Database["public"]["Enums"]["lesson_status"] | null
          student_id?: string
          student_notes?: string | null
          updated_at?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      order_bumps: {
        Row: {
          conversion_rate: number | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          price_cents: number
          type: string
        }
        Insert: {
          conversion_rate?: number | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          price_cents: number
          type: string
        }
        Update: {
          conversion_rate?: number | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          price_cents?: number
          type?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          amount_cents: number
          created_at: string | null
          id: string
          instructor_id: string
          lessons_count: number
          metadata: Json | null
          order_number: number | null
          plan_name: string
          status: Database["public"]["Enums"]["order_status"] | null
          student_id: string
          updated_at: string | null
        }
        Insert: {
          amount_cents: number
          created_at?: string | null
          id?: string
          instructor_id: string
          lessons_count: number
          metadata?: Json | null
          order_number?: number | null
          plan_name: string
          status?: Database["public"]["Enums"]["order_status"] | null
          student_id: string
          updated_at?: string | null
        }
        Update: {
          amount_cents?: number
          created_at?: string | null
          id?: string
          instructor_id?: string
          lessons_count?: number
          metadata?: Json | null
          order_number?: number | null
          plan_name?: string
          status?: Database["public"]["Enums"]["order_status"] | null
          student_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payouts: {
        Row: {
          amount_cents: number
          created_at: string | null
          id: string
          instructor_id: string
          processed_at: string | null
          risk_notes: string | null
          risk_score: number | null
          status: Database["public"]["Enums"]["payout_status"] | null
        }
        Insert: {
          amount_cents: number
          created_at?: string | null
          id?: string
          instructor_id: string
          processed_at?: string | null
          risk_notes?: string | null
          risk_score?: number | null
          status?: Database["public"]["Enums"]["payout_status"] | null
        }
        Update: {
          amount_cents?: number
          created_at?: string | null
          id?: string
          instructor_id?: string
          processed_at?: string | null
          risk_notes?: string | null
          risk_score?: number | null
          status?: Database["public"]["Enums"]["payout_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "payouts_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_settings: {
        Row: {
          description: string | null
          key: string
          value: Json
        }
        Insert: {
          description?: string | null
          key: string
          value: Json
        }
        Update: {
          description?: string | null
          key?: string
          value?: Json
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          preferences: Json | null
          reputation_score: number | null
          role: Database["public"]["Enums"]["user_role"] | null
          saved_addresses: Json | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          preferences?: Json | null
          reputation_score?: number | null
          role?: Database["public"]["Enums"]["user_role"] | null
          saved_addresses?: Json | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          preferences?: Json | null
          reputation_score?: number | null
          role?: Database["public"]["Enums"]["user_role"] | null
          saved_addresses?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          instructor_id: string
          lesson_id: string | null
          order_id: string | null
          rating: number
          student_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          instructor_id: string
          lesson_id?: string | null
          order_id?: string | null
          rating: number
          student_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          instructor_id?: string
          lesson_id?: string | null
          order_id?: string | null
          rating?: number
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      success_stories: {
        Row: {
          badge: string
          created_at: string | null
          id: string
          instructor_id: string
          photo_url: string
          student_name: string
          updated_at: string | null
        }
        Insert: {
          badge: string
          created_at?: string | null
          id?: string
          instructor_id: string
          photo_url: string
          student_name: string
          updated_at?: string | null
        }
        Update: {
          badge?: string
          created_at?: string | null
          id?: string
          instructor_id?: string
          photo_url?: string
          student_name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "success_stories_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          brand: string
          color: string | null
          created_at: string | null
          features: string[] | null
          id: string
          instructor_id: string
          is_active: boolean | null
          model: string
          photo_url: string | null
          photo_urls: string[] | null
          plate: string
          transmission: string | null
          updated_at: string | null
          year: number
        }
        Insert: {
          brand: string
          color?: string | null
          created_at?: string | null
          features?: string[] | null
          id?: string
          instructor_id: string
          is_active?: boolean | null
          model: string
          photo_url?: string | null
          photo_urls?: string[] | null
          plate: string
          transmission?: string | null
          updated_at?: string | null
          year: number
        }
        Update: {
          brand?: string
          color?: string | null
          created_at?: string | null
          features?: string[] | null
          id?: string
          instructor_id?: string
          is_active?: boolean | null
          model?: string
          photo_url?: string | null
          photo_urls?: string[] | null
          plate?: string
          transmission?: string | null
          updated_at?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_instructor_busy_slots: {
        Args: {
          p_end_date: string
          p_instructor_id: string
          p_start_date: string
        }
        Returns: {
          scheduled_at: string
        }[]
      }
      increment_instructor_balance: {
        Args: { amount_cents: number; instructor_uuid: string }
        Returns: number
      }
    }
    Enums: {
      coupon_type: "percentage" | "fixed"
      dispute_status: "open" | "analyzing" | "resolved"
      dispute_verdict: "student_fault" | "instructor_fault" | "force_majeure"
      doc_status: "pending" | "valid" | "rejected"
      doc_type: "cnh" | "crlv" | "background_check" | "dispute_evidence"
      instructor_status: "pending_docs" | "active" | "suspended"
      lesson_status:
      | "scheduled"
      | "in_progress"
      | "completed"
      | "canceled"
      | "no_show"
      | "disputed"
      order_status: "pending" | "paid" | "canceled" | "refunded"
      payout_status:
      | "requested"
      | "risk_check"
      | "approved"
      | "paid"
      | "rejected"
      transaction_type: "credit" | "debit"
      user_role: "admin" | "instructor" | "student"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
  | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
  ? R
  : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
    DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
    DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
  ? R
  : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I
  }
  ? I
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Insert: infer I
  }
  ? I
  : never
  : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U
  }
  ? U
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Update: infer U
  }
  ? U
  : never
  : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
  | keyof DefaultSchema["Enums"]
  | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
  | keyof DefaultSchema["CompositeTypes"]
  | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
  : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  public: {
    Enums: {
      coupon_type: ["percentage", "fixed"],
      dispute_status: ["open", "analyzing", "resolved"],
      dispute_verdict: ["student_fault", "instructor_fault", "force_majeure"],
      doc_status: ["pending", "valid", "rejected"],
      doc_type: ["cnh", "crlv", "background_check", "dispute_evidence"],
      instructor_status: ["pending_docs", "active", "suspended"],
      lesson_status: [
        "scheduled",
        "in_progress",
        "completed",
        "canceled",
        "no_show",
        "disputed",
      ],
      order_status: ["pending", "paid", "canceled", "refunded"],
      payout_status: [
        "requested",
        "risk_check",
        "approved",
        "paid",
        "rejected",
      ],
      transaction_type: ["credit", "debit"],
      user_role: ["admin", "instructor", "student"],
    },
  },
} as const
