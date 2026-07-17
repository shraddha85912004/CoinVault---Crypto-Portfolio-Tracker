import Link from "next/link";
import { LayoutDashboard, Wallet, LineChart, Settings, LogOut } from "lucide-react";

export function Sidebar() {
  return (
    <div className="hidden md:flex h-screen w-64 flex-col border-r border-white/10 bg-[#09090B] px-4 py-6">
      <Link href="/dashboard" className="flex items-center gap-2 mb-10 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7C3AED] font-bold text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]">
          C
        </div>
        <span className="text-xl font-bold text-white tracking-tight">CoinVault</span>
      </Link>

      <nav className="flex flex-1 flex-col gap-2">
        <Link href="/dashboard" className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10">
          <LayoutDashboard className="h-4 w-4 text-[#7C3AED]" />
          Dashboard
        </Link>
        <Link href="/dashboard/portfolio" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:bg-white/5 hover:text-white">
          <Wallet className="h-4 w-4" />
          Portfolio
        </Link>
        <Link href="/dashboard/analytics" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:bg-white/5 hover:text-white">
          <LineChart className="h-4 w-4" />
          Analytics
        </Link>
        <Link href="/dashboard/settings" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:bg-white/5 hover:text-white">
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </nav>

      <div className="mt-auto">
        <form action="/api/auth/logout" method="POST">
          <button type="submit" className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:bg-red-500/10 hover:text-red-500">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
