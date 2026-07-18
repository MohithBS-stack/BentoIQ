/**
 * Bento SDK Wrapper
 *
 * This module provides a typed interface over the Bento Prediction Markets SDK.
 * All Bento SDK calls should go through this wrapper to ensure:
 *   - Consistent error handling
 *   - Easy mocking in tests
 *   - Centralized configuration
 *
 * TODO: Replace stub implementations with actual Bento SDK calls once integrated.
 */

export interface BentoConfig {
  apiKey:      string;
  environment: "mainnet" | "testnet";
  rpcUrl?:     string;
}

export interface BentoMarket {
  id:          string;
  title:       string;
  probability: number;
  volume:      number;
}

export interface BentoPosition {
  marketId:  string;
  shares:    number;
  outcome:   string;
  avgPrice:  number;
}

// ─── Bento SDK Wrapper Class ──────────────────────────────────────────────────
class BentoSDKWrapper {
  private config: BentoConfig | null = null;
  private initialized = false;

  /**
   * Initialize the Bento SDK with configuration.
   * Must be called before any other SDK methods.
   */
  initialize(config: BentoConfig): void {
    this.config      = config;
    this.initialized = true;
    // TODO: new BentoSDK(config)
  }

  private assertInitialized(): void {
    if (!this.initialized) {
      throw new Error(
        "[BentoSDK] SDK not initialized. Call bentoSDK.initialize() first."
      );
    }
  }

  // ── Markets ────────────────────────────────────────────────────────────────

  /**
   * Fetch all open markets from Bento.
   * TODO: Implement with actual Bento SDK call.
   */
  async getMarkets(): Promise<BentoMarket[]> {
    this.assertInitialized();
    // STUB — replace with: return await bentoClient.markets.list();
    return [];
  }

  /**
   * Fetch a single market from Bento.
   * TODO: Implement with actual Bento SDK call.
   */
  async getMarket(_id: string): Promise<BentoMarket | null> {
    this.assertInitialized();
    // STUB
    return null;
  }

  // ── Trading ────────────────────────────────────────────────────────────────

  /**
   * Buy shares in a market outcome.
   * TODO: Implement with actual Bento SDK call.
   */
  async buyShares(
    _marketId:  string,
    _outcomeId: string,
    _amount:    number
  ): Promise<{ txHash: string }> {
    this.assertInitialized();
    // STUB
    throw new Error("[BentoSDK] buyShares not yet implemented.");
  }

  /**
   * Sell shares in a market outcome.
   * TODO: Implement with actual Bento SDK call.
   */
  async sellShares(
    _marketId:  string,
    _outcomeId: string,
    _shares:    number
  ): Promise<{ txHash: string }> {
    this.assertInitialized();
    // STUB
    throw new Error("[BentoSDK] sellShares not yet implemented.");
  }

  // ── Wallet ─────────────────────────────────────────────────────────────────

  /**
   * Connect a wallet via Bento's wallet connect flow.
   * TODO: Implement with actual Bento SDK call.
   */
  async connectWallet(): Promise<{ address: string }> {
    this.assertInitialized();
    // STUB
    throw new Error("[BentoSDK] connectWallet not yet implemented.");
  }

  /**
   * Get the connected wallet's balance.
   * TODO: Implement with actual Bento SDK call.
   */
  async getBalance(_address: string): Promise<number> {
    this.assertInitialized();
    // STUB
    return 0;
  }
}

// ─── Singleton Instance ───────────────────────────────────────────────────────
export const bentoSDK = new BentoSDKWrapper();
