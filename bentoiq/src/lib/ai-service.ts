/**
 * AI Service Layer
 * Provider-agnostic wrapper for AI functionalities (Gemini, OpenAI, Claude, etc).
 * Falls back gracefully to mock responses if API keys are missing.
 */

const AI_PROVIDER = process.env.NEXT_PUBLIC_AI_PROVIDER || "gemini";
const HAS_KEYS = !!process.env.GEMINI_API_KEY;

export async function generateExecutiveBrief(marketTitle: string, context: string): Promise<string> {
  if (!HAS_KEYS) {
    // Graceful Mock Fallback
    return `Community forecasting currently leans strongly toward success for "${marketTitle}". Growing confidence is driven by accelerating progress, increased investment, and positive historical trend alignment. Primary uncertainty remains regulatory approval timelines.`;
  }
  
  // Real Implementation Placeholder
  // Example: return fetch('/api/ai/brief', { method: 'POST', body: JSON.stringify({ marketTitle, context }) })
  return "Real AI response placeholder";
}

export async function improveTitle(currentTitle: string): Promise<string> {
  if (!HAS_KEYS) {
    if (currentTitle.toLowerCase().includes("gpt")) return "Will GPT-6 achieve autonomous agentic execution benchmarks before 2027?";
    return `Will ${currentTitle || "this specific event"} occur by the end of this quarter?`;
  }
  return "Real AI improved title";
}

export async function generateScenarioAnalysis(marketId: string) {
  if (!HAS_KEYS) {
    return {
      bull: "Accelerating efficiency and next-generation architectures provide overwhelming structural tailwinds. Key industry partners are committing capital expenditure.",
      bear: "Unforeseen regulatory delays or semiconductor fab yield bottlenecks could stall deployment by 6 to 12 months. Power grid constraints remain a risk.",
    };
  }
  return { bull: "Real Bull Case", bear: "Real Bear Case" };
}

export async function suggestCategories(context: string): Promise<string[]> {
  if (!HAS_KEYS) {
    return ["Technology", "AI", "Finance"];
  }
  return ["AI", "Crypto"];
}
