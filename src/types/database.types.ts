export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      course: {
        Row: {
          code: string
          created_at: string
          done: boolean
          id: number
          prefix: string
          program_id: number
          title: string
        }
        Insert: {
          code: string
          created_at?: string
          done?: boolean
          id?: number
          prefix: string
          program_id: number
          title: string
        }
        Update: {
          code?: string
          created_at?: string
          done?: boolean
          id?: number
          prefix?: string
          program_id?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "program_v2"
            referencedColumns: ["id"]
          },
        ]
      }
      course_block: {
        Row: {
          course_block_id: number
          created_at: string
          id: number
          title: string
        }
        Insert: {
          course_block_id: number
          created_at?: string
          id?: number
          title: string
        }
        Update: {
          course_block_id?: number
          created_at?: string
          id?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_block_course_block_id_fkey"
            columns: ["course_block_id"]
            isOneToOne: false
            referencedRelation: "course_block_group"
            referencedColumns: ["id"]
          },
        ]
      }
      course_block_group: {
        Row: {
          created_at: string
          id: number
          optional: boolean
          program_id: number
          title: string
        }
        Insert: {
          created_at?: string
          id?: number
          optional?: boolean
          program_id: number
          title: string
        }
        Update: {
          created_at?: string
          id?: number
          optional?: boolean
          program_id?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_block_group_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "program_v2"
            referencedColumns: ["id"]
          },
        ]
      }
      program: {
        Row: {
          created_at: string
          created_by: string | null
          id: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "program_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      program_v2: {
        Row: {
          created_at: string
          created_by: string
          id: number
          title: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          id?: number
          title: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "test_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
