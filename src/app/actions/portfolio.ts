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
