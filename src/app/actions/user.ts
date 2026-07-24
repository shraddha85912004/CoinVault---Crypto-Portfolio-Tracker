"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateUserProfile(data: { name: string }) {
  const session = await getSession();
  
  if (!session || !session.userId) {
    throw new Error("Unauthorized");
  }

  const userId = session.userId as string;

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { name: data.name },
    });

    revalidatePath("/dashboard/settings");
    return { success: true, user: { name: user.name, email: user.email } };
  } catch (error: any) {
    console.error("Failed to update profile:", error);
    throw new Error("Failed to update profile");
  }
}

import bcrypt from "bcryptjs";

export async function updateUserPassword(data: { current: string; new: string }) {
  const session = await getSession();
  
  if (!session || !session.userId) {
    throw new Error("Unauthorized");
  }

  const userId = session.userId as string;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(data.current, user.password);
    if (!isMatch) {
      throw new Error("Current password is incorrect");
    }

    const hashedPassword = await bcrypt.hash(data.new, 10);
    
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { success: true };
  } catch (error: any) {
    console.error("Failed to update password:", error);
    throw new Error(error.message || "Failed to update password");
  }
}
