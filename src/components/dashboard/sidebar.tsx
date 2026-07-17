"use client";

import Link from "next/link";
import { LayoutDashboard, Wallet, LineChart, Settings, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Portfolio", href: "/dashboard/portfolio", icon: Wallet },
    { name: "Analytics", href: "/dashboard/analytics", icon: LineChart },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="hidden md:flex h-screen w-64 flex-col border-r border-white/10 bg-[#09090B] px-4 py-6">
      <Link href="/dashboard" className="flex items-center gap-2 mb-10 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7C3AED] font-bold text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]">
          C
        </div>
        <span className="text-xl font-bold text-white tracking-tight">CoinVault</span>
      </Link>

      <nav className="flex flex-1 flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href}
              href={item.href} 
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive 
                  ? "bg-white/10 text-white" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn("h-4 w-4", isActive ? "text-[#7C3AED]" : "")} />
              {item.name}
            </Link>
          );
        })}
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
