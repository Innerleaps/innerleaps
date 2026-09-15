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
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      calculator_submissions: {
        Row: {
          avg_employee_costs: number | null
          avg_gross_annual_salary: number | null
          calculation_results: Json
          company: string
          created_at: string
          current_absenteeism: number
          current_turnover: number | null
          email: string
          employee_turnover: number | null
          employees: number | null
          functie: string | null
          id: string
          name: string
          number_of_employees: number | null
          phone: string | null
        }
        Insert: {
          avg_employee_costs?: number | null
          avg_gross_annual_salary?: number | null
          calculation_results: Json
          company: string
          created_at?: string
          current_absenteeism: number
          current_turnover?: number | null
          email: string
          employee_turnover?: number | null
          employees?: number | null
          functie?: string | null
          id?: string
          name: string
          number_of_employees?: number | null
          phone?: string | null
        }
        Update: {
          avg_employee_costs?: number | null
          avg_gross_annual_salary?: number | null
          calculation_results?: Json
          company?: string
          created_at?: string
          current_absenteeism?: number
          current_turnover?: number | null
          email?: string
          employee_turnover?: number | null
          employees?: number | null
          functie?: string | null
          id?: string
          name?: string
          number_of_employees?: number | null
          phone?: string | null
        }
        Relationships: []
      }
      keep_alive_logs: {
        Row: {
          created_at: string
          id: string
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          status?: string
        }
        Relationships: []
      }
      masterclass_registrations: {
        Row: {
          calendar_url: string | null
          created_at: string
          email: string
          functie_titel: string
          id: string
          is_leidinggevende: boolean
          naam: string
          selected_timeslot: string
          source_page: string | null
          timeslot_display: string
        }
        Insert: {
          calendar_url?: string | null
          created_at?: string
          email: string
          functie_titel: string
          id?: string
          is_leidinggevende: boolean
          naam: string
          selected_timeslot: string
          source_page?: string | null
          timeslot_display: string
        }
        Update: {
          calendar_url?: string | null
          created_at?: string
          email?: string
          functie_titel?: string
          id?: string
          is_leidinggevende?: boolean
          naam?: string
          selected_timeslot?: string
          source_page?: string | null
          timeslot_display?: string
        }
        Relationships: []
      }
      program_registrations: {
        Row: {
          additional_info: string | null
          address: string
          agreed_to_terms: boolean
          birth_date: string
          company_name: string | null
          created_at: string
          department_cost_center: string | null
          email: string
          full_name: string
          id: string
          phone: string
          program_type: string
          registration_type: string
          selected_timeslot: string
        }
        Insert: {
          additional_info?: string | null
          address: string
          agreed_to_terms?: boolean
          birth_date: string
          company_name?: string | null
          created_at?: string
          department_cost_center?: string | null
          email: string
          full_name: string
          id?: string
          phone: string
          program_type: string
          registration_type: string
          selected_timeslot: string
        }
        Update: {
          additional_info?: string | null
          address?: string
          agreed_to_terms?: boolean
          birth_date?: string
          company_name?: string | null
          created_at?: string
          department_cost_center?: string | null
          email?: string
          full_name?: string
          id?: string
          phone?: string
          program_type?: string
          registration_type?: string
          selected_timeslot?: string
        }
        Relationships: []
      }
      scientific_report_requests: {
        Row: {
          company: string
          created_at: string
          email: string
          functie: string
          id: string
          name: string
          phone: string | null
        }
        Insert: {
          company: string
          created_at?: string
          email: string
          functie: string
          id?: string
          name: string
          phone?: string | null
        }
        Update: {
          company?: string
          created_at?: string
          email?: string
          functie?: string
          id?: string
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      stress_questionnaire_submissions: {
        Row: {
          created_at: string
          email: string | null
          id: string
          language: string | null
          naam: string | null
          organisatie: string | null
          q1: number
          q10: number
          q2: number
          q3: number
          q4: number
          q5: number
          q6: number
          q7: number
          q8: number
          q9: number
          total_score: number
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          language?: string | null
          naam?: string | null
          organisatie?: string | null
          q1: number
          q10: number
          q2: number
          q3: number
          q4: number
          q5: number
          q6: number
          q7: number
          q8: number
          q9: number
          total_score: number
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          language?: string | null
          naam?: string | null
          organisatie?: string | null
          q1?: number
          q10?: number
          q2?: number
          q3?: number
          q4?: number
          q5?: number
          q6?: number
          q7?: number
          q8?: number
          q9?: number
          total_score?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
