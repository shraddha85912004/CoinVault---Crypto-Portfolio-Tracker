"use client";

import { Bell, Search, User, LogOut, Settings, Menu, LayoutDashboard, Wallet, LineChart, Loader2, PlusCircle } from "lucide-react";
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
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import Link from "next/link";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState, useEffect, useRef } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { searchCoins } from "@/lib/coingecko";
import { AddTransactionModal } from "./add-transaction-modal";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(searchQuery, 500);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoinSymbol, setSelectedCoinSymbol] = useState("");

  useEffect(() => {
    async function performSearch() {
      if (!debouncedQuery) {
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const results = await searchCoins(debouncedQuery);
        setSearchResults(results.slice(0, 5)); // Keep top 5
        setShowResults(true);
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setIsSearching(false);
      }
    }
    performSearch();
  }, [debouncedQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddClick = (symbol: string) => {
    setSelectedCoinSymbol(symbol);
    setIsModalOpen(true);
    setShowResults(false);
    setSearchQuery("");
  };

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b border-white/10 bg-[#09090B]/50 px-4 md:px-6 backdrop-blur-md">
        <div className="flex items-center gap-4 w-full max-w-md">
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden text-gray-400 hover:text-white" />}>
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-[#09090B] border-r border-white/10 p-0 text-white">
              <VisuallyHidden>
                <SheetTitle>Mobile Navigation</SheetTitle>
                <SheetDescription>Navigation menu for mobile devices</SheetDescription>
              </VisuallyHidden>
              <div className="flex h-screen flex-col px-4 py-6">
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
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          
          <div className="relative w-full hidden sm:block" ref={searchRef}>
            {isSearching ? (
              <Loader2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7C3AED] animate-spin" />
            ) : (
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            )}
            <Input 
              type="search" 
              placeholder="Search coins, portfolios..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.length > 0) setShowResults(true);
              }}
              onFocus={() => {
                if (searchQuery.length > 0) setShowResults(true);
              }}
              className="w-full rounded-full bg-white/5 pl-10 border-none text-white focus-visible:ring-1 focus-visible:ring-[#7C3AED]"
            />
            
            {showResults && searchQuery.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#18181B] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                {searchResults.length > 0 ? (
                  <div className="py-2">
                    {searchResults.map((coin) => (
                      <div key={coin.id} className="flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors group">
                        <div className="flex items-center gap-3">
                          <img src={coin.thumb} alt={coin.name} className="w-6 h-6 rounded-full" />
                          <div>
                            <p className="text-sm font-medium text-white">{coin.name}</p>
                            <p className="text-xs text-gray-500 uppercase">{coin.symbol}</p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleAddClick(coin.symbol.toUpperCase())}
                          className="opacity-0 group-hover:opacity-100 h-7 px-2 text-[#7C3AED] hover:bg-[#7C3AED]/10 hover:text-[#7C3AED]"
                        >
                          <PlusCircle className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : !isSearching ? (
                  <div className="px-4 py-6 text-center text-sm text-gray-500">
                    No coins found for "{searchQuery}"
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full">
          <Bell className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger render={<button className="h-8 w-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#3B82F6] p-[2px] outline-none" />}>
            <div className="h-full w-full rounded-full bg-[#18181B] flex items-center justify-center hover:bg-[#27272A] transition-colors">
              <User className="h-4 w-4 text-white" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-[#18181B] border-white/10 text-white">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="hover:bg-white/10 cursor-pointer" render={<Link href="/dashboard/settings" className="flex items-center w-full" />}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="hover:bg-red-500/10 text-red-500 cursor-pointer focus:bg-red-500/10 focus:text-red-500" render={<form action="/api/auth/logout" method="POST" className="w-full" />}>
              <button type="submit" className="flex items-center w-full">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
    <AddTransactionModal 
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      initialSymbol={selectedCoinSymbol}
    />
  </>
  );
}
