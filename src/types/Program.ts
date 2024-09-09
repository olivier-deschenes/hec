import { ID, Timestamp } from "@/types"
import { User } from "@supabase/supabase-js"

export type ProgramType = {
  id: ID
  created_at: Timestamp
  created_by: User["id"]
}