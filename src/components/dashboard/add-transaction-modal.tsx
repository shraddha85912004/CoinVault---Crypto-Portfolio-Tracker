"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTransactionModal({ isOpen, onClose }: AddTransactionModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 1000);
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
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Coin Symbol</label>
            <Input 
              placeholder="e.g. BTC, ETH" 
              className="bg-[#09090B] border-white/10 text-white focus-visible:ring-[#7C3AED]"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Amount</label>
              <Input 
                type="number" 
                step="any"
                placeholder="0.00" 
                className="bg-[#09090B] border-white/10 text-white focus-visible:ring-[#7C3AED]"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Price per coin ($)</label>
              <Input 
                type="number" 
                step="any"
                placeholder="0.00" 
                className="bg-[#09090B] border-white/10 text-white focus-visible:ring-[#7C3AED]"
                required
              />
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
