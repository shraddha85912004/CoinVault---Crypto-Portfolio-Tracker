import { MarketOverview } from "@/components/dashboard/market-overview";
import { PortfolioList } from "@/components/dashboard/portfolio-list";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back! Here's an overview of your crypto portfolio.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder cards */}
        <div className="rounded-xl border border-white/10 bg-[#18181B] p-6">
          <h3 className="text-sm font-medium text-gray-400">Total Balance</h3>
          <p className="text-3xl font-bold text-white mt-2">$0.00</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#18181B] p-6">
          <h3 className="text-sm font-medium text-gray-400">24h Change</h3>
          <p className="text-3xl font-bold text-white mt-2">0.00%</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#18181B] p-6">
          <h3 className="text-sm font-medium text-gray-400">Active Assets</h3>
          <p className="text-3xl font-bold text-white mt-2">0</p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
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
          <PortfolioList />
        </div>
      </div>
    </div>
  );
}
