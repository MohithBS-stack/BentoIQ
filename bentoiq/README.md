<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/zap.svg" width="60" height="60" alt="BentoIQ Logo">
  <h1 align="center">BentoIQ</h1>
  <p align="center"><strong>Collective Intelligence for Better Decisions</strong></p>
  <p align="center">
    BentoIQ transforms prediction markets into high-fidelity AI Decision Intelligence reports. It synthesizes real-time community sentiment, verified forecasting accuracy, and Gemini AI reasoning to elevate collective decision-making for individuals and organizations.
  </p>
</div>

---

## 🌟 Hackathon Demo Highlight

BentoIQ is a flagship entry for the AI & Web3 Hackathon. It is engineered as a premium, production-ready frontend experience merging the aesthetic of **Apple**, **Perplexity**, **Bloomberg Terminal**, and **Linear**.

### Key Features:
- **Decision Intelligence Feed**: A high-performance, infinite scroll feed of prediction markets with custom confidence rings.
- **Flagship Decision Reports**: Individual markets (`/markets/[id]`) are presented as executive intelligence briefs rather than standard crypto charts.
- **Signature "Decision DNA"**: Animated visualization of Community Optimism, Evidence Strength, Volatility, Consensus Stability, and AI Confidence.
- **AI Copilot (Gemini)**: Provider-agnostic AI service layer integrated into the Create Market Studio for auto-categorization and title refinement.
- **Complete User Ecosystem**: Built-in User Profiles, Reputations, Leaderboards, Portfolio analytics, and Notifications.

---

## 🚀 Quick Start (Development)

BentoIQ is built on Next.js 14+ (App Router), Tailwind CSS, Framer Motion, and Zustand. 

### Prerequisites
- Node.js 18.x or later
- npm, pnpm, or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy the `.env.example` file to `.env.local`:
```bash
cp .env.example .env.local
```
*Note: BentoIQ uses a graceful mock fallback system. If API keys (like `GEMINI_API_KEY` or `NEXT_PUBLIC_SUPABASE_URL`) are omitted, the UI will automatically fall back to realistic placeholder data without breaking, ensuring a perfect local demo experience.*

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

---

## 🛠 Technology Stack

- **Framework**: Next.js (App Router, React 18)
- **Styling**: Tailwind CSS + Custom CSS Variables (Glassmorphism & Gradients)
- **Animation**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React
- **Authentication**: Bento SDK Signature / Web3 Wallet (Prepared)
- **Database**: Supabase (Prepared)
- **AI**: Google Gemini (Service Layer Prepared)

---

## 🎨 Design Philosophy

BentoIQ consciously moves away from the "crypto dashboard" aesthetic. We employ a "Dark-First" theme prioritizing:
1. **Matte Black Contexts**: `#050507` baseline to make gradient accents pop.
2. **Glassmorphism**: Soft, translucent cards with subtle border highlights (`border-white/[0.06]`).
3. **Micro-interactions**: Hover lifts, glowing active states, and animated layout transitions via Framer Motion.
4. **Data Visualization**: Replaced standard bar charts with custom SVG animated `ConfidenceRings` and `PredictionSparklines`.

---

## 🚀 Deployment (Vercel)

BentoIQ is fully optimized for Vercel deployment. It achieves a 0-error TypeScript compilation and utilizes Next.js Server-Side Rendering (SSR).

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Configure the Environment Variables listed in `.env.example`.
4. Deploy!

```bash
# To test production build locally:
npm run build
npm run start
```

---

<div align="center">
  <p>Built with precision for the Hackathon. 🚀</p>
</div>
