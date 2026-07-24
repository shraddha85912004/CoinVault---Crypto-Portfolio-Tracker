"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { searchCoins } from "@/lib/coingecko";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { addTransaction } from "@/app/actions/portfolio";
import { toast } from "sonner"; // Assuming sonner is or will be installed

const transactionSchema = z.object({
  symbol: z.string().min(1, "Symbol is required").toUpperCase(),
  amount: z.coerce.number().positive("Amount must be positive"),
  pricePerCoin: z.coerce.number().positive("Price must be positive"),
});

type TransactionFormValues = z.infer<typeof transactionSchema>;

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSymbol?: string;
}

export function AddTransactionModal({ isOpen, onClose, initialSymbol = "" }: AddTransactionModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      symbol: initialSymbol,
      amount: 0,
      pricePerCoin: 0,
    }
  });

  const symbolValue = watch("symbol");
  const debouncedQuery = useDebounce(symbolValue, 500);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function performSearch() {
      if (!debouncedQuery) {
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const results = await searchCoins(debouncedQuery);
        setSearchResults(results.slice(0, 5));
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

  useEffect(() => {
    if (initialSymbol) {
      setValue("symbol", initialSymbol);
    }
  }, [initialSymbol, setValue]);

  const onSubmit = async (data: TransactionFormValues) => {
    setIsLoading(true);
    setError("");
    try {
      await addTransaction({
        coinId: data.symbol.toLowerCase(),
        name: data.symbol.toUpperCase(),
        symbol: data.symbol.toUpperCase(),
        type: "BUY",
        amount: data.amount,
        pricePerCoin: data.pricePerCoin,
      });
      reset();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to add transaction");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-[#18181B] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription className="text-gray-400">
            Record a new buy or sell transaction to your portfolio.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {error && <div className="text-sm text-red-500 bg-red-500/10 p-2 rounded break-words max-h-32 overflow-y-auto">{error}</div>}
          
          <div className="space-y-2 relative" ref={searchRef}>
            <label className="text-sm font-medium text-gray-300">Coin Symbol</label>
            <div className="relative">
              <Input 
                {...register("symbol")}
                onChange={(e) => {
                  register("symbol").onChange(e);
                  setShowResults(true);
                }}
                onFocus={() => {
                  if (symbolValue?.length > 0) setShowResults(true);
                }}
                placeholder="e.g. BTC, ETH" 
                className="bg-[#09090B] border-white/10 text-white focus-visible:ring-[#7C3AED]"
              />
              {isSearching && (
                <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7C3AED] animate-spin" />
              )}
            </div>
            {errors.symbol && <p className="text-sm text-red-500">{errors.symbol.message}</p>}

            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#18181B] border border-white/10 rounded-lg shadow-2xl overflow-hidden z-50">
                <div className="py-2">
                  {searchResults.map((coin) => (
                    <div 
                      key={coin.id} 
                      className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 transition-colors cursor-pointer"
                      onClick={() => {
                        setValue("symbol", coin.symbol.toUpperCase());
                        setShowResults(false);
                      }}
                    >
                      <img src={coin.thumb} alt={coin.name} className="w-5 h-5 rounded-full" />
                      <div>
                        <p className="text-sm font-medium text-white">{coin.name}</p>
                        <p className="text-xs text-gray-500 uppercase">{coin.symbol}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Amount</label>
              <Input 
                {...register("amount")}
                type="number" 
                step="any"
                placeholder="0.00" 
                className="bg-[#09090B] border-white/10 text-white focus-visible:ring-[#7C3AED]"
              />
              {errors.amount && <p className="text-sm text-red-500">{errors.amount.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Price per coin ($)</label>
              <Input 
                {...register("pricePerCoin")}
                type="number" 
                step="any"
                placeholder="0.00" 
                className="bg-[#09090B] border-white/10 text-white focus-visible:ring-[#7C3AED]"
              />
              {errors.pricePerCoin && <p className="text-sm text-red-500">{errors.pricePerCoin.message}</p>}
            </div>
          </div>

          <div className="pt-4 flex justify-end space-x-2">
            <Button type="button" variant="ghost" onClick={onClose} className="hover:bg-white/5 text-gray-300">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white">
              {isLoading ? "Saving..." : "Save Transaction"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
