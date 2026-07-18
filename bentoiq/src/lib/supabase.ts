import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

// Legacy export replacement to avoid breaking changes
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

// Maintain graceful fallbacks
export const hasSupabaseKeys = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

// Database abstraction exports
export async function getUserProfile(userId: string) {
  if (!hasSupabaseKeys) {
    return { id: userId, reputation: 2500, tier: "Oracle" };
  }
  const { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
  return data;
}

export async function saveBookmark(userId: string, marketId: string) {
  if (!hasSupabaseKeys) return true;
  await supabase.from("bookmarks").insert({ user_id: userId, market_id: marketId });
  return true;
}
