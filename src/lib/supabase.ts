import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const rawSupabaseUrl =
  process.env.EXPO_PUBLIC_SUPABASE_URL ??
  "https://tmrlooalutwvtxqmqotq.supabase.co";

const rawSupabaseAnonKey =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtcmxvb2FsdXR3dnR4cW1xb3RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0NzkwMDEsImV4cCI6MjEwNjA1NTAwMX0.udzfTutxo6CEy2C5jb7pgKDkCfuK7NlLh1yGpaB5i4I";


const supabaseUrl = rawSupabaseUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
const supabaseAnonKey = rawSupabaseAnonKey.trim();

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});