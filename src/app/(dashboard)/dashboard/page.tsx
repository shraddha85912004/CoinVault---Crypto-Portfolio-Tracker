import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getSession();
  
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#09090B] text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-400 mb-8">Welcome back. Your portfolio is looking good.</p>
      
      <form action="/api/auth/logout" method="POST">
        <Button type="submit" variant="destructive">Logout</Button>
      </form>
    </div>
  );
}
