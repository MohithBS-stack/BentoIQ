import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const getSupabaseBrowserClient = () => createBrowserClient(supabaseUrl, supabaseAnonKey);
export const hasDatabase = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
