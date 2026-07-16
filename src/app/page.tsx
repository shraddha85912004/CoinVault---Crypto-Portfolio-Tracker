import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Lock, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#09090B] text-[#FAFAFA] selection:bg-[#7C3AED]/30">
      {/* Navigation */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/10 sticky top-0 z-50 bg-[#09090B]/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#7C3AED] flex items-center justify-center font-bold text-lg shadow-[0_0_15px_rgba(124,58,237,0.5)]">
            C
          </div>
          <span className="text-xl font-bold tracking-tight">CoinVault</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-gray-300 hover:text-white transition-colors">
            Login
          </Link>
          <Link href="/register">
            <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full px-6 transition-all hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]">
              Get Started
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="flex flex-col items-center justify-center text-center px-4 pt-32 pb-24 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7C3AED]/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8 relative z-10 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#22C55E] animate-pulse"></span>
            The modern way to track crypto
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-gray-500 relative z-10">
            Manage your crypto portfolio like a pro.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 relative z-10">
            CoinVault helps crypto investors track, analyze, and manage their portfolios in one secure, modern dashboard with real-time market data.
          </p>
          
          <div className="flex items-center gap-4 flex-col sm:flex-row relative z-10">
            <Link href="/register">
              <Button size="lg" className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white h-14 px-8 text-lg rounded-full w-full sm:w-auto transition-all hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] group">
                Create Free Account 
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-white/10 text-white hover:bg-white/10 hover:text-white w-full sm:w-auto bg-transparent transition-colors">
                View Dashboard
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-6 py-24 bg-[#18181B]/50 border-y border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to succeed</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Stop using messy spreadsheets. CoinVault provides institutional-grade tools for everyday investors.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-[#09090B] border border-white/10 hover:border-[#7C3AED]/50 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center mb-6 group-hover:bg-[#7C3AED]/20 transition-colors">
                  <BarChart3 className="w-6 h-6 text-[#7C3AED]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Real-time Analytics</h3>
                <p className="text-gray-400 leading-relaxed">Track your profit and loss down to the second with live price feeds directly from global exchanges.</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#09090B] border border-white/10 hover:border-[#7C3AED]/50 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center mb-6 group-hover:bg-[#7C3AED]/20 transition-colors">
                  <Lock className="w-6 h-6 text-[#7C3AED]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Bank-grade Security</h3>
                <p className="text-gray-400 leading-relaxed">Your data is encrypted and securely stored. We never ask for your wallet private keys or exchange APIs.</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#09090B] border border-white/10 hover:border-[#7C3AED]/50 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center mb-6 group-hover:bg-[#7C3AED]/20 transition-colors">
                  <Zap className="w-6 h-6 text-[#7C3AED]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
                <p className="text-gray-400 leading-relaxed">Built on modern Edge infrastructure to ensure your dashboard loads instantly, no matter where you are.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-white/10 bg-[#09090B]">
        <p>© {new Date().getFullYear()} CoinVault. Designed for Web3 investors.</p>
      </footer>
    </div>
  );
}
