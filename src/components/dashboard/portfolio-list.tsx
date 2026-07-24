"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle, Wallet2, Trash2 } from "lucide-react";
import { useState } from "react";
import { AddTransactionModal } from "./add-transaction-modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteTransaction } from "@/app/actions/portfolio";
import { PortfolioWithMetrics } from "@/app/actions/portfolio";

interface PortfolioListProps {
  initialTransactions?: PortfolioWithMetrics[];
}

export function PortfolioList({ initialTransactions = [] }: PortfolioListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(id);
      await deleteTransaction(id);
    } catch (error) {
      console.error("Failed to delete", error);
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-[#18181B] flex flex-col h-full">
      <div className="p-6 flex items-center justify-between border-b border-white/5">
        <h3 className="text-lg font-semibold text-white">Your Assets</h3>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white h-8 px-3 text-xs"
        >
          <PlusCircle className="mr-2 h-3.5 w-3.5" />
          Add Asset
        </Button>
      </div>

      <div className="p-0 flex-1 flex flex-col">
        {initialTransactions.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-6">
            <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Wallet2 className="h-6 w-6 text-gray-400" />
            </div>
            <h4 className="text-white font-medium mb-1">No assets yet</h4>
            <p className="text-sm text-gray-500 max-w-[200px] mb-6">
              Add your first transaction to start tracking your portfolio.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto max-h-[400px]">
            <Table>
              <TableHeader className="bg-white/5 sticky top-0 border-b border-white/10">
                <TableRow className="border-0 hover:bg-transparent">
                  <TableHead className="text-gray-400 font-medium whitespace-nowrap">Asset</TableHead>
                  <TableHead className="text-gray-400 font-medium text-right whitespace-nowrap">Holdings</TableHead>
                  <TableHead className="text-gray-400 font-medium text-right whitespace-nowrap">Price</TableHead>
                  <TableHead className="text-gray-400 font-medium text-right whitespace-nowrap">P/L</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {initialTransactions.map((tx) => {
                  const isProfit = tx.profitAmount >= 0;
                  return (
                    <TableRow key={tx.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <TableCell className="font-medium text-white">
                        <div className="flex flex-col">
                          <span>{tx.name}</span>
                          <span className="text-xs text-gray-500 uppercase">{tx.symbol}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col">
                          <span className="text-white">${tx.currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                          <span className="text-xs text-gray-500">{tx.amount.toLocaleString(undefined, { maximumFractionDigits: 6 })} {tx.symbol.toUpperCase()}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col">
                          <span className="text-white">${tx.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}</span>
                          <span className="text-xs text-gray-500">Avg Buy: ${tx.buyPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className={`flex flex-col ${isProfit ? "text-green-500" : "text-red-500"}`}>
                          <span>{isProfit ? "+" : ""}{tx.profitPercentage.toFixed(2)}%</span>
                          <span className="text-xs opacity-80">{isProfit ? "+" : ""}${tx.profitAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500 hover:text-red-500 hover:bg-red-500/10"
                          onClick={() => handleDelete(tx.id)}
                          disabled={isDeleting === tx.id}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
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
