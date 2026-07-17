import { Bell, Search, User, LogOut, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 bg-[#09090B]/50 px-6 backdrop-blur-md">
      <div className="flex items-center gap-4 w-full max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input 
            type="search" 
            placeholder="Search coins, portfolios..." 
            className="w-full rounded-full bg-white/5 pl-10 border-none text-white focus-visible:ring-1 focus-visible:ring-[#7C3AED]"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full">
          <Bell className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-8 w-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#3B82F6] p-[2px] outline-none">
              <div className="h-full w-full rounded-full bg-[#18181B] flex items-center justify-center hover:bg-[#27272A] transition-colors">
                <User className="h-4 w-4 text-white" />
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-[#18181B] border-white/10 text-white">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem asChild className="hover:bg-white/10 cursor-pointer">
              <Link href="/dashboard/settings" className="flex items-center w-full">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem asChild className="hover:bg-red-500/10 text-red-500 cursor-pointer focus:bg-red-500/10 focus:text-red-500">
              <form action="/api/auth/logout" method="POST" className="w-full">
                <button type="submit" className="flex items-center w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
