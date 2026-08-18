import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://gbsrgzezwlxubohdbuzw.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdic3JnemV6d2x4dWJvaGRidXp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwNzI1MzgsImV4cCI6MjEwMjY0ODUzOH0.0BqYuYGNVzDlfrXrRyB8zEhMTIuKWOfaDmBdakTZ8l0";

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function testConnection() {
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });
    return { ok: res.ok, status: res.status, statusText: res.statusText };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}
