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
        <div className="rounded-xl border border-white/10 bg-[#18181B] p-6 md:col-span-4">
          <h3 className="text-lg font-semibold text-white mb-4">Market Overview</h3>
          <div className="h-64 flex items-center justify-center border border-dashed border-white/10 rounded-lg">
            <span className="text-gray-500">Live prices loading...</span>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#18181B] p-6 md:col-span-3">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
          <div className="h-64 flex items-center justify-center border border-dashed border-white/10 rounded-lg">
            <span className="text-gray-500">No recent transactions</span>
          </div>
        </div>
      </div>
    </div>
  );
}
