"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { updateUserProfile } from "@/app/actions/user";

export function SettingsForm({ initialData }: { initialData: { email: string; name: string } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [name, setName] = useState(initialData.name);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });
    
    try {
      await updateUserProfile({ name });
      setMessage({ text: "Profile updated successfully!", type: "success" });
    } catch (error: any) {
      setMessage({ text: error.message || "Failed to update profile", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message.text && (
        <div className={`p-3 rounded text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
          {message.text}
        </div>
      )}
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Email Address</label>
        <Input 
          value={initialData.email}
          disabled
          className="bg-[#09090B] border-white/10 text-gray-500 cursor-not-allowed opacity-50"
        />
        <p className="text-xs text-gray-500">Email cannot be changed once registered.</p>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Display Name</label>
        <Input 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name" 
          className="bg-[#09090B] border-white/10 text-white focus-visible:ring-[#7C3AED]"
        />
      </div>

      <div className="pt-4 flex justify-end">
        <Button type="submit" disabled={isLoading} className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-8">
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
