import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SettingsForm } from "@/components/dashboard/settings-form";

export default async function SettingsPage() {
  const session = await getSession();
  
  if (!session || !session.userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId as string },
    select: { email: true, name: true }
  });

  if (!user) return null;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
        <p className="text-gray-400 mt-1">Manage your account preferences and profile.</p>
      </div>
      
      <div className="rounded-xl border border-white/10 bg-[#18181B] overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/5">
          <h3 className="text-lg font-semibold text-white">Profile Information</h3>
          <p className="text-sm text-gray-400">Update your account details here.</p>
        </div>
        
        <div className="p-6">
          <SettingsForm initialData={{ email: user.email, name: user.name || "" }} />
        </div>
      </div>
    </div>
  );
}
