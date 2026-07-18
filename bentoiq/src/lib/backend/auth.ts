import { getSupabaseBrowserClient, hasDatabase } from "./database";

export async function signInWithWallet(walletAddress: string, signature: string) {
  if (!hasDatabase) {
    return { user: { id: "mock-id", wallet: walletAddress }, session: { access_token: "mock-jwt" } };
  }
  // 2026 Production Authentication flow using modern Supabase SSR
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: `${walletAddress}@bento.fun`,
    password: signature // (Simplified for hackathon constraints)
  });
  
  if (error) throw error;
  return data;
}

export async function signOut() {
  if (!hasDatabase) return true;
  const supabase = getSupabaseBrowserClient();
  await supabase.auth.signOut();
  return true;
}
