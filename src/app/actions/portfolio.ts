"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function addTransaction(data: {
  coinId: string;
  symbol: string;
  name: string;
  type: "BUY" | "SELL";
  amount: number;
  pricePerCoin: number;
}) {
  const session = await getSession();
  if (!session || !session.userId) {
    throw new Error("Unauthorized");
  }

  const userId = session.userId as string;

  try {
    const portfolio = await prisma.portfolio.create({
      data: {
        userId,
        coinId: data.coinId,
        symbol: data.symbol,
        name: data.name,
        amount: data.amount,
        buyPrice: data.pricePerCoin,
      },
    });

    revalidatePath("/dashboard");
    return { success: true, portfolio };
  } catch (error: any) {
    console.error("Failed to add transaction:", error);
    throw new Error(error.message || "Failed to add transaction");
  }
}

export async function getPortfolio() {
  const session = await getSession();
  if (!session || !session.userId) {
    throw new Error("Unauthorized");
  }

  const userId = session.userId as string;

  try {
    const portfolio = await prisma.portfolio.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    
    return portfolio;
  } catch (error: any) {
    console.error("Failed to fetch portfolio:", error);
    return [];
  }
}

export async function deleteTransaction(id: string) {
  const session = await getSession();
  if (!session || !session.userId) {
    throw new Error("Unauthorized");
  }

  const userId = session.userId as string;

  try {
    // Ensure the transaction belongs to the user before deleting
    const transaction = await prisma.portfolio.findUnique({
      where: { id },
    });

    if (!transaction || transaction.userId !== userId) {
      throw new Error("Transaction not found or unauthorized");
    }

    await prisma.portfolio.delete({
      where: { id },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete transaction:", error);
    throw new Error(error.message || "Failed to delete transaction");
  }
}

import { getLivePrices } from "@/lib/coingecko";

export type PortfolioWithMetrics = {
  id: string;
  coinId: string;
  symbol: string;
  name: string;
  amount: number;
  buyPrice: number;
  createdAt: Date;
  currentPrice: number;
  currentValue: number;
  profitAmount: number;
  profitPercentage: number;
  change24h: number;
};

export async function getPortfolioWithLiveMetrics(): Promise<PortfolioWithMetrics[]> {
  const transactions = await getPortfolio();
  if (transactions.length === 0) return [];

  const coinIds = transactions.map(t => t.coinId);
  const livePrices = await getLivePrices(coinIds);

  return transactions.map(tx => {
    const liveData = livePrices[tx.coinId] || { usd: tx.buyPrice, usd_24h_change: 0 };
    const currentPrice = liveData.usd;
    const change24h = liveData.usd_24h_change || 0;
    
    const currentValue = tx.amount * currentPrice;
    const totalInvested = tx.amount * tx.buyPrice;
    const profitAmount = currentValue - totalInvested;
    const profitPercentage = totalInvested > 0 ? (profitAmount / totalInvested) * 100 : 0;

    return {
      ...tx,
      currentPrice,
      currentValue,
      profitAmount,
      profitPercentage,
      change24h
    };
  });
}
