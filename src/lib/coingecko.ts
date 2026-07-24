export interface CoinMarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  total_volume: number;
  sparkline_in_7d?: {
    price: number[];
  };
}

export const SYMBOL_TO_ID: Record<string, string> = {
  btc: "bitcoin",
  eth: "ethereum",
  sol: "solana",
  bnb: "binancecoin",
  xrp: "ripple",
  ada: "cardano",
  doge: "dogecoin",
  usdt: "tether",
  usdc: "usd-coin",
  dot: "polkadot",
  matic: "matic-network",
  shib: "shiba-inu",
  ltc: "litecoin",
  link: "chainlink",
  etc: "ethereum-classic",
};

export function normalizeCoinId(idOrSymbol: string) {
  const lowered = idOrSymbol.toLowerCase();
  return SYMBOL_TO_ID[lowered] || lowered;
}

const COINGECKO_API = "https://api.coingecko.com/api/v3";

export async function getTopCoins(limit: number = 10): Promise<CoinMarketData[]> {
  try {
    const res = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true`,
      {
        next: { revalidate: 120 }, // Cache for 120 seconds to be extremely safe from rate limits
      }
    );

    if (!res.ok) {
      console.warn("CoinGecko API Error (possibly rate limited):", res.status);
      return getMockData(limit);
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch top coins:", error);
    return getMockData(limit);
  }
}

// Fallback data in case the free API hits the rate limit
function getMockData(limit: number): CoinMarketData[] {
  return [
    {
      id: "bitcoin", symbol: "btc", name: "Bitcoin", image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
      current_price: 64230.12, market_cap: 1250000000000, market_cap_rank: 1, price_change_percentage_24h: 2.45, total_volume: 35000000000
    },
    {
      id: "ethereum", symbol: "eth", name: "Ethereum", image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
      current_price: 3450.89, market_cap: 415000000000, market_cap_rank: 2, price_change_percentage_24h: -1.2, total_volume: 15000000000
    },
    {
      id: "solana", symbol: "sol", name: "Solana", image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
      current_price: 145.67, market_cap: 65000000000, market_cap_rank: 5, price_change_percentage_24h: 5.67, total_volume: 5000000000
    },
    {
      id: "binancecoin", symbol: "bnb", name: "BNB", image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
      current_price: 590.23, market_cap: 87000000000, market_cap_rank: 4, price_change_percentage_24h: 0.8, total_volume: 1200000000
    },
    {
      id: "ripple", symbol: "xrp", name: "XRP", image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white.png",
      current_price: 0.51, market_cap: 28000000000, market_cap_rank: 7, price_change_percentage_24h: -0.5, total_volume: 800000000
    }
  ].slice(0, limit);
}

export async function searchCoins(query: string) {
  try {
    const res = await fetch(`${COINGECKO_API}/search?query=${query}`, {
      next: { revalidate: 3600 },
    });
    
    if (!res.ok) return [];
    
    const data = await res.json();
    return data.coins || [];
  } catch (error) {
    console.error("Failed to search coins:", error);
    return [];
  }
}

export async function getLivePrices(coinIds: string[]) {
  if (coinIds.length === 0) return {};
  
  // Dedup coinIds and join
  const ids = Array.from(new Set(coinIds)).join(",");
  
  try {
    const res = await fetch(
      `${COINGECKO_API}/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`,
      {
        next: { revalidate: 60 }, // Cache for 60 seconds
      }
    );

    if (!res.ok) {
      console.warn("CoinGecko Live Price API Error:", res.status);
      return getMockLivePrices(coinIds);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch live prices:", error);
    return getMockLivePrices(coinIds);
  }
}

function getMockLivePrices(coinIds: string[]) {
  const mockPrices: Record<string, any> = {};
  
  const defaultMocks: Record<string, any> = {
    bitcoin: { usd: 65000, usd_24h_change: 2.5 },
    ethereum: { usd: 3500, usd_24h_change: -1.2 },
    solana: { usd: 150, usd_24h_change: 5.6 },
    binancecoin: { usd: 600, usd_24h_change: 0.8 },
    ripple: { usd: 0.55, usd_24h_change: -0.5 },
  };

  coinIds.forEach(id => {
    // If we have a mock for it, use it. Otherwise randomize a bit.
    if (defaultMocks[id]) {
      mockPrices[id] = defaultMocks[id];
    } else {
      mockPrices[id] = { usd: 10 + Math.random() * 100, usd_24h_change: (Math.random() * 10) - 5 };
    }
  });

  return mockPrices;
}
