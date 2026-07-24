import { MarketOverview } from "@/components/dashboard/market-overview";
import { PortfolioList } from "@/components/dashboard/portfolio-list";
import { Suspense } from "react";
import { getPortfolioWithLiveMetrics } from "@/app/actions/portfolio";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default async function DashboardPage() {
  const transactions = await getPortfolioWithLiveMetrics();
  
  // Calculate total balance from live values
  const totalBalance = transactions.reduce((acc, tx) => acc + tx.currentValue, 0);
  const totalInvested = transactions.reduce((acc, tx) => acc + (tx.amount * tx.buyPrice), 0);
  
  const totalProfit = totalBalance - totalInvested;
  const totalProfitPercentage = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;
  
  // Calculate aggregate 24h change by weighting each asset's 24h change by its portfolio value percentage
  let aggregate24hChange = 0;
  if (totalBalance > 0) {
    aggregate24hChange = transactions.reduce((acc, tx) => {
      const weight = tx.currentValue / totalBalance;
      return acc + (tx.change24h * weight);
    }, 0);
  }
  
  const isProfit = totalProfit >= 0;
  const is24hPositive = aggregate24hChange >= 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back! Here's an overview of your crypto portfolio.</p>
      </div>
      
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Balance Card */}
        <div className="rounded-xl border border-white/10 bg-[#18181B] p-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-sm font-medium text-gray-400">Total Balance (Live)</h3>
          <p className="text-3xl font-bold text-white mt-2 tracking-tight">
            ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${isProfit ? "text-green-500" : "text-red-500"}`}>
            {isProfit ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            <span>${Math.abs(totalProfit).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span className="text-gray-500 ml-1">({isProfit ? "+" : ""}{totalProfitPercentage.toFixed(2)}% All-Time)</span>
          </div>
        </div>
        
        {/* 24h Change Card */}
        <div className="rounded-xl border border-white/10 bg-[#18181B] p-6">
          <h3 className="text-sm font-medium text-gray-400">24h Change</h3>
          <p className="text-3xl font-bold text-white mt-2 tracking-tight">
            {is24hPositive ? "+" : ""}{aggregate24hChange.toFixed(2)}%
          </p>
          <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${is24hPositive ? "text-green-500" : "text-red-500"}`}>
            {is24hPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            <span>{is24hPositive ? "Trending Up" : "Trending Down"}</span>
          </div>
        </div>
        
        {/* Active Assets Card */}
        <div className="rounded-xl border border-white/10 bg-[#18181B] p-6 sm:col-span-2 lg:col-span-1">
          <h3 className="text-sm font-medium text-gray-400">Active Assets</h3>
          <p className="text-3xl font-bold text-white mt-2 tracking-tight">
            {new Set(transactions.map(t => t.symbol)).size}
          </p>
          <div className="mt-2 text-sm text-gray-500">
            Across {transactions.length} total transactions
          </div>
        </div>
      </div>
      
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <div className="md:col-span-4">
          <Suspense fallback={
            <div className="rounded-xl border border-white/10 bg-[#18181B] p-6 h-[400px] flex items-center justify-center">
              <span className="text-gray-500 animate-pulse">Loading live market data...</span>
            </div>
          }>
            <MarketOverview />
          </Suspense>
        </div>
        <div className="md:col-span-3">
          <PortfolioList initialTransactions={transactions} />
        </div>
      </div>
    </div>
  );
}
