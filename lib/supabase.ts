import { createClient } from "@supabase/supabase-js"
import { neon } from "@neondatabase/serverless" // light-weight serverless PG driver

/* -------------------------------------------------------------------------- */
/* 1.  Supabase client (for normal CRUD)                                      */
/* -------------------------------------------------------------------------- */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ""

if (!supabaseUrl || !supabaseKey) {
  console.error("❌  Missing Supabase env vars.")
  throw new Error("Supabase credentials not found")
}

export const supabase = createClient(supabaseUrl, supabaseKey)

/* -------------------------------------------------------------------------- */
/* 2.  Neon Postgres client (only needed to run DDL once)                     */
/* -------------------------------------------------------------------------- */
const hasPgUrl = typeof process.env.POSTGRES_URL === "string" && process.env.POSTGRES_URL.trim().length > 0

const sql = hasPgUrl ? neon(process.env.POSTGRES_URL!) : null
const ensureTablesOnce = (async () => {
  if (!sql) return // ⬅️ nothing to do without a PG connection

  await sql`
    CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(100) NOT NULL,
      last_name  VARCHAR(100) NOT NULL,
      email      VARCHAR(255) UNIQUE NOT NULL,
      phone      VARCHAR(20)  NOT NULL,
      parish     VARCHAR(50),
      course     VARCHAR(200) NOT NULL,
      status     VARCHAR(20)  DEFAULT 'pending'
                 CHECK (status IN ('pending','active','completed','expelled')),
      start_date DATE,
      end_date   DATE,
      weeks_total      INTEGER DEFAULT 0,
      weeks_completed  INTEGER DEFAULT 0,
      days_attended    INTEGER DEFAULT 0,
      total_days       INTEGER DEFAULT 0,
      payment_status   VARCHAR(20) DEFAULT 'unpaid'
                 CHECK (payment_status IN ('paid','partial','unpaid')),
      notes      TEXT,
      is_temp    BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `
})()

/* -------------------------------------------------------------------------- */
/* 3.  Helpers that auto-create the table on first use                        */
/* -------------------------------------------------------------------------- */
async function withStudentsTable<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn()
  } catch (err: any) {
    // PostgREST returns code "PGRST116" when the relation is missing
    if (err?.code === "PGRST116" || /does not exist/.test(err?.message || "")) {
      console.warn("⚠️  Students table not found – creating it now…")
      await ensureTablesOnce
      // retry once
      return await fn()
    }
    throw err
  }
}

/* -------------------------------------------------------------------------- */
/* 4.  Typed helper API used by /admin/students                               */
/* -------------------------------------------------------------------------- */
export const studentDB = {
  async getAllStudents() {
    // Always return the raw Supabase response { data, error }
    return withStudentsTable(async () => {
      return await supabase.from("students").select("*").order("created_at", { ascending: false })
    })
  },

  async addStudent(student: any) {
    return withStudentsTable(async () => {
      const { data, error } = await supabase.from("students").insert([student]).select()
      if (error) throw error
      return data![0]
    })
  },

  async updateStudent(id: number, updates: any) {
    const { data, error } = await supabase.from("students").update(updates).eq("id", id).select()
    if (error) throw error
    return data![0]
  },

  async deleteStudent(id: number) {
    const { error } = await supabase.from("students").delete().eq("id", id)
    if (error) throw error
  },

  async updateStatus(id: number, status: "pending" | "active" | "completed" | "expelled", notes?: string) {
    const updates: any = { status, updated_at: new Date().toISOString() }
    if (notes) updates.notes = notes
    const { error } = await supabase.from("students").update(updates).eq("id", id)
    if (error) throw error
  },
}

// Application functions
export const applicationDB = {
  async getAllApplications() {
    const { data, error } = await supabase.from("applications").select("*").order("submitted_at", { ascending: false })

    if (error) throw error
    return data
  },

  async updateApplicationStatus(id: number, status: string, rejectionReason?: string) {
    const updates: any = {
      status,
      reviewed_at: new Date().toISOString(),
    }
    if (rejectionReason) updates.rejection_reason = rejectionReason

    const { error } = await supabase.from("applications").update(updates).eq("id", id)

    if (error) throw error
  },
}
