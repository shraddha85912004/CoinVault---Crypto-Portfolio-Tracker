import { getPortfolioWithLiveMetrics } from "@/app/actions/portfolio";
import { PortfolioCharts } from "@/components/dashboard/portfolio-charts";
import Link from "next/link";

export default async function AnalyticsPage() {
  const transactions = await getPortfolioWithLiveMetrics();
  
  // Aggregate portfolio data
  const holdings: Record<string, { symbol: string; name: string; amount: number; totalValue: number }> = {};
  
  transactions.forEach((tx) => {
    if (!holdings[tx.symbol]) {
      holdings[tx.symbol] = {
        symbol: tx.symbol,
        name: tx.name,
        amount: 0,
        totalValue: 0,
      };
    }
    
    // In a real app with sell functionality, we'd subtract sells.
    // For now we assume they are all holdings.
    holdings[tx.symbol].amount += tx.amount;
    holdings[tx.symbol].totalValue += tx.currentValue;
  });

  const chartData = Object.values(holdings).sort((a, b) => b.totalValue - a.totalValue);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Analytics</h1>
        <p className="text-gray-400 mt-1">Visualize your portfolio distribution and performance.</p>
      </div>
      
      {chartData.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#18181B] p-12 text-center flex flex-col items-center">
          <h3 className="text-xl font-semibold text-white mb-2">No data available</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            You don't have any assets in your portfolio yet. Add some transactions to unlock powerful analytics and distribution charts.
          </p>
          <Link href="/dashboard" className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 py-2 rounded-md font-medium transition-colors">
            Go to Dashboard
          </Link>
        </div>
      ) : (
        <PortfolioCharts data={chartData} />
      )}
    </div>
  );
}
