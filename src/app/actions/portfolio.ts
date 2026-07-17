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
        averagePrice: data.pricePerCoin,
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
