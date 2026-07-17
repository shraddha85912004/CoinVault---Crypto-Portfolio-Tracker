import { getTopCoins } from "@/lib/coingecko";
import Image from "next/image";

export async function MarketOverview() {
  const coins = await getTopCoins(5); // Fetch top 5 coins for overview

  if (!coins || coins.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-lg">
        <span className="text-gray-500">Failed to load market data.</span>
        <span className="text-xs text-gray-600 mt-2">API might be rate limited.</span>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-[#18181B] p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Market Overview</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-400 uppercase border-b border-white/5">
            <tr>
              <th className="px-4 py-3 font-medium">Asset</th>
              <th className="px-4 py-3 font-medium text-right">Price</th>
              <th className="px-4 py-3 font-medium text-right">24h Change</th>
              <th className="px-4 py-3 font-medium text-right hidden sm:table-cell">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => {
              const isPositive = coin.price_change_percentage_24h > 0;
              return (
                <tr key={coin.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white/10">
                        <Image src={coin.image} alt={coin.name} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="font-medium text-white">{coin.name}</div>
                        <div className="text-xs text-gray-500 uppercase">{coin.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right font-medium text-white">
                    ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${isPositive ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>
                      {isPositive ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right text-gray-400 hidden sm:table-cell">
                    ${(coin.market_cap / 1000000000).toFixed(2)}B
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
