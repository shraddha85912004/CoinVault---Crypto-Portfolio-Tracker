"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Lock, Mail } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to login");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090B] p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7C3AED]/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <Card className="w-full max-w-md bg-[#18181B] border-white/10 text-white relative z-10">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Link href="/" className="w-10 h-10 rounded-full bg-[#7C3AED] flex items-center justify-center font-bold text-xl shadow-[0_0_15px_rgba(124,58,237,0.5)]">
              C
            </Link>
          </div>
          <CardTitle className="text-2xl text-center font-bold">Welcome back</CardTitle>
          <CardDescription className="text-center text-gray-400">
            Enter your email and password to sign in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <Input 
                  {...register("email")}
                  placeholder="name@example.com" 
                  className="pl-10 bg-[#09090B] border-white/10 text-white focus-visible:ring-[#7C3AED]"
                />
              </div>
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <Input 
                  {...register("password")}
                  type="password" 
                  placeholder="Password" 
                  className="pl-10 bg-[#09090B] border-white/10 text-white focus-visible:ring-[#7C3AED]"
                />
              </div>
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <Button disabled={isLoading} className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white">
              {isLoading ? "Signing in..." : (
                <>Sign In <ArrowRight className="ml-2 w-4 h-4" /></>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-white/5 pt-6">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#7C3AED] hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
