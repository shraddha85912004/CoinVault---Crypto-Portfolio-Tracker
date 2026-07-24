"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { updateUserProfile, updateUserPassword } from "@/app/actions/user";

export function SettingsForm({ initialData }: { initialData: { email: string; name: string } }) {
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState({ text: "", type: "" });
  const [name, setName] = useState(initialData.name);

  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState({ text: "", type: "" });
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProfileLoading(true);
    setProfileMessage({ text: "", type: "" });
    
    try {
      await updateUserProfile({ name });
      setProfileMessage({ text: "Profile updated successfully!", type: "success" });
    } catch (error: any) {
      setProfileMessage({ text: error.message || "Failed to update profile", type: "error" });
    } finally {
      setIsProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setPasswordMessage({ text: "New passwords do not match", type: "error" });
      return;
    }
    
    setIsPasswordLoading(true);
    setPasswordMessage({ text: "", type: "" });
    
    try {
      await updateUserPassword({ current: passwords.current, new: passwords.new });
      setPasswordMessage({ text: "Password updated successfully!", type: "success" });
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (error: any) {
      setPasswordMessage({ text: error.message || "Failed to update password", type: "error" });
    } finally {
      setIsPasswordLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleProfileSubmit} className="space-y-4">
        {profileMessage.text && (
          <div className={`p-3 rounded text-sm ${profileMessage.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
            {profileMessage.text}
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
          <Button type="submit" disabled={isProfileLoading} className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-8">
            {isProfileLoading ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </form>

      <div className="border-t border-white/10 pt-8 mt-8">
        <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          {passwordMessage.text && (
            <div className={`p-3 rounded text-sm ${passwordMessage.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
              {passwordMessage.text}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Current Password</label>
            <Input 
              type="password"
              value={passwords.current}
              onChange={(e) => setPasswords({...passwords, current: e.target.value})}
              required
              className="bg-[#09090B] border-white/10 text-white focus-visible:ring-[#7C3AED]"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">New Password</label>
              <Input 
                type="password"
                value={passwords.new}
                onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                required
                minLength={6}
                className="bg-[#09090B] border-white/10 text-white focus-visible:ring-[#7C3AED]"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Confirm New Password</label>
              <Input 
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                required
                minLength={6}
                className="bg-[#09090B] border-white/10 text-white focus-visible:ring-[#7C3AED]"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" disabled={isPasswordLoading} className="bg-[#18181B] border border-white/10 hover:bg-white/5 text-white px-8">
              {isPasswordLoading ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
