import { MarketOverview } from "@/components/dashboard/market-overview";
import { PortfolioList } from "@/components/dashboard/portfolio-list";
import { Suspense } from "react";
import { getPortfolio } from "@/app/actions/portfolio";

export default async function DashboardPage() {
  const transactions = await getPortfolio();
  
  // Calculate total balance from transactions
  // In a real app we would multiply by live price, for now just sum the amounts spent/held
  const totalBalance = transactions.reduce((acc, tx) => acc + (tx.amount * tx.averagePrice), 0);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back! Here's an overview of your crypto portfolio.</p>
      </div>
      
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder cards */}
        <div className="rounded-xl border border-white/10 bg-[#18181B] p-6">
          <h3 className="text-sm font-medium text-gray-400">Total Balance (Est)</h3>
          <p className="text-3xl font-bold text-white mt-2">
            ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#18181B] p-6">
          <h3 className="text-sm font-medium text-gray-400">24h Change</h3>
          <p className="text-3xl font-bold text-white mt-2">0.00%</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#18181B] p-6 sm:col-span-2 lg:col-span-1">
          <h3 className="text-sm font-medium text-gray-400">Active Assets</h3>
          <p className="text-3xl font-bold text-white mt-2">
            {new Set(transactions.map(t => t.symbol)).size}
          </p>
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
