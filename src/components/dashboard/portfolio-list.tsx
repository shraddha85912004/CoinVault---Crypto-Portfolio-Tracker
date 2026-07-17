"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle, Wallet2 } from "lucide-react";
import { useState } from "react";
import { AddTransactionModal } from "./add-transaction-modal";

export function PortfolioList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]); // Will replace with real data

  return (
    <div className="rounded-xl border border-white/10 bg-[#18181B] flex flex-col h-full">
      <div className="p-6 flex items-center justify-between border-b border-white/5">
        <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white h-8 px-3 text-xs"
        >
          <PlusCircle className="mr-2 h-3.5 w-3.5" />
          Add Asset
        </Button>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        {transactions.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
            <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Wallet2 className="h-6 w-6 text-gray-400" />
            </div>
            <h4 className="text-white font-medium mb-1">No assets yet</h4>
            <p className="text-sm text-gray-500 max-w-[200px] mb-6">
              Add your first transaction to start tracking your portfolio.
            </p>
            <Button 
              onClick={() => setIsModalOpen(true)}
              variant="outline" 
              className="border-white/10 text-white hover:bg-white/5"
            >
              Add Transaction
            </Button>
          </div>
        ) : (
          <div>
            {/* Table goes here */}
          </div>
        )}
      </div>

      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
