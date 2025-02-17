import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://bvlkfsclzidahqfmnwav.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2bGtmc2NsemlkYWhxZm1ud2F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1ODAzODIsImV4cCI6MjA1MzE1NjM4Mn0.g8-Vku0QStWh1MMUrh3B_sWHTfuMzvL665cpKbltv6k";

if (!supabaseUrl) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
if (!supabaseAnonKey) throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY');

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined
  },
});
