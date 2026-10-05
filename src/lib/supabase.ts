import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

<<<<<<< HEAD
const supabaseUrl =
=======
const rawSupabaseUrl =
>>>>>>> 79ef313aabc4ad316b8ee8d663b807b138155234
  process.env.EXPO_PUBLIC_SUPABASE_URL ??
  "https://tmrlooalutwvtxqmqotq.supabase.co";

<<<<<<< HEAD
const supabaseAnonKey =
  process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
=======
const rawSupabaseAnonKey =
>>>>>>> 79ef313aabc4ad316b8ee8d663b807b138155234
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtcmxvb2FsdXR3dnR4cW1xb3RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0NzkwMDEsImV4cCI6MjEwNjA1NTAwMX0.udzfTutxo6CEy2C5jb7pgKDkCfuK7NlLh1yGpaB5i4I";

<<<<<<< HEAD
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Falta la clave de Supabase. Revisa EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY en .env.local"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    persistSession: true,
    autoRefreshToken: true,
=======

const supabaseUrl = rawSupabaseUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
const supabaseAnonKey = rawSupabaseAnonKey.trim();

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
>>>>>>> 79ef313aabc4ad316b8ee8d663b807b138155234
    detectSessionInUrl: false,
  },
});