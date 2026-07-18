import { createBentoSdk, walletAuthProvider } from "@bento.fun/sdk";
import { bentoFetch } from "@/lib/bento-fetch";

export const publicBentoSdk = createBentoSdk({
  baseUrl: process.env.NEXT_PUBLIC_BENTO_URL ?? process.env.BENTO_URL ?? "https://internal-server.bento.fun",
  apiKey: process.env.NEXT_PUBLIC_BUILDER_API_KEY ?? process.env.BUILDER_API_KEY ?? process.env.NEXT_PUBLIC_BENTO_API_KEY ?? "",
  tournamentsBaseUrl: process.env.NEXT_PUBLIC_PARLAY_TOURNMENT_URL ?? process.env.PARLAY_TOURNMENT_URL,
  auth: walletAuthProvider(() => ({})),
  fetch: bentoFetch,
});
