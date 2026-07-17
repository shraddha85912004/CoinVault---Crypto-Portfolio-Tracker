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

const COINGECKO_API = "https://api.coingecko.com/api/v3";

export async function getTopCoins(limit: number = 10): Promise<CoinMarketData[]> {
  try {
    const res = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true`,
      {
        next: { revalidate: 60 }, // Cache for 60 seconds to avoid rate limits
      }
    );

    if (!res.ok) {
      console.error("CoinGecko API Error:", await res.text());
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch top coins:", error);
    return [];
  }
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
