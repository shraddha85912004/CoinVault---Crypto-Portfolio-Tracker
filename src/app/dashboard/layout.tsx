import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  let userName = "My Account";
  
  if (session?.userId) {
    const user = await prisma.user.findUnique({
      where: { id: session.userId as string },
      select: { name: true }
    });
    if (user?.name) {
      userName = user.name;
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#000000]">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header userName={userName} />
        <main className="flex-1 overflow-y-auto bg-[#09090B] p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
