import Link from "next/link";
import { ArrowRight, Wallet, LineChart, Shield, Zap, Globe, Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#09090B] text-white overflow-hidden selection:bg-[#7C3AED] selection:text-white">
      {/* Animated Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-[#7C3AED]/20 blur-[120px] mix-blend-screen" />
        <div className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-[#3B82F6]/20 blur-[120px] mix-blend-screen" />
        <div className="absolute -bottom-[40%] left-[10%] w-[70%] h-[70%] rounded-full bg-[#EC4899]/10 blur-[120px] mix-blend-screen" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7C3AED] font-bold text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]">
            C
          </div>
          <span className="text-xl font-bold tracking-tight">CoinVault</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Log in
          </Link>
          <Link href="/register" className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors">
            Sign up
          </Link>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pt-24 pb-32 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Live Market Data Integrated
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
              Track your crypto portfolio with precision.
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              The most beautiful and powerful cryptocurrency portfolio tracker. Get real-time prices, deep analytics, and complete control over your digital assets.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/register" 
                className="flex items-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(124,58,237,0.3)] w-full sm:w-auto justify-center"
              >
                Get Started for Free
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link 
                href="#features" 
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-full font-semibold transition-all w-full sm:w-auto justify-center backdrop-blur-sm"
              >
                View Features
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5 bg-black/20 backdrop-blur-3xl rounded-[3rem] mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to succeed</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Built for both beginners and advanced traders to keep a watchful eye on the market.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:bg-white/10 transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-[#7C3AED]/20 flex items-center justify-center mb-6 text-[#7C3AED]">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Live Market Data</h3>
              <p className="text-gray-400">Powered by CoinGecko, get real-time price updates for thousands of cryptocurrencies instantly.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:bg-white/10 transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-[#3B82F6]/20 flex items-center justify-center mb-6 text-[#3B82F6]">
                <LineChart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Deep Analytics</h3>
              <p className="text-gray-400">Visualize your portfolio distribution and performance over time with beautiful, interactive charts.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:bg-white/10 transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-[#10B981]/20 flex items-center justify-center mb-6 text-[#10B981]">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
              <p className="text-gray-400">Your data is yours. We use enterprise-grade encryption and secure authentication to keep your portfolio safe.</p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:bg-white/10 transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-[#F59E0B]/20 flex items-center justify-center mb-6 text-[#F59E0B]">
                <Wallet className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Management</h3>
              <p className="text-gray-400">Add, edit, or remove assets with just a few clicks. Keeping your portfolio up to date has never been easier.</p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:bg-white/10 transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-[#EC4899]/20 flex items-center justify-center mb-6 text-[#EC4899]">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Global Search</h3>
              <p className="text-gray-400">Quickly search for any coin across the global crypto market right from your dashboard header.</p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:bg-white/10 transition-colors">
              <div className="h-12 w-12 rounded-2xl bg-[#8B5CF6]/20 flex items-center justify-center mb-6 text-[#8B5CF6]">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-gray-400">Built on Next.js 14, CoinVault is incredibly fast and responsive on any device, anywhere.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-6 pb-32 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to take control?</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already tracking their crypto portfolios with CoinVault.
          </p>
          <Link 
            href="/register" 
            className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95"
          >
            Create Your Account
            <ArrowRight className="h-5 w-5" />
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7C3AED] font-bold text-white text-xs">
              C
            </div>
            <span className="font-semibold text-gray-300">CoinVault</span>
          </div>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} CoinVault. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
