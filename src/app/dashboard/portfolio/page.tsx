import { PortfolioList } from "@/components/dashboard/portfolio-list";
import { getPortfolioWithLiveMetrics } from "@/app/actions/portfolio";
import { Suspense } from "react";

export default async function PortfolioPage() {
  const transactions = await getPortfolioWithLiveMetrics();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Your Portfolio</h1>
        <p className="text-gray-400 mt-1">Manage all your cryptocurrency assets and transactions.</p>
      </div>
      
      <div className="w-full">
        <Suspense fallback={
          <div className="rounded-xl border border-white/10 bg-[#18181B] p-6 h-[400px] flex items-center justify-center">
            <span className="text-gray-500 animate-pulse">Loading portfolio data...</span>
          </div>
        }>
          <PortfolioList initialTransactions={transactions} />
        </Suspense>
      </div>
    </div>
  );
}
