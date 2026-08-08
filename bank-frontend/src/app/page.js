'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-gray-900 flex flex-col justify-between selection:bg-gray-900 selection:text-white">
      {/* Top Navbar */}
      <nav className="max-w-7xl mx-auto w-full px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-2xl tracking-wide text-gray-900">
          <div className=""></div>
          
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          
        </div>
        <div>
          <Link 
            href="/login" 
            className=""
          >
            
          </Link>
        </div>
      </nav>

      {/* Main Hero Container */}
      <main className="max-w-7xl mx-auto w-full px-4 py-8">
        <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-xl p-8 md:p-14 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[520px]">
          
          {/* Left Text Content */}
          <div className="lg:col-span-6 space-y-6 z-10">
            <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-700 tracking-wide uppercase">
              Secure & Smart Banking
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
              Improve Financial Performance
            </h1>
            <p className="text-gray-500 text-base md:text-lg max-w-lg leading-relaxed">
              Get access to cash for your business and manage your assets with maximum security, speed, and absolute clarity.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <Link 
                href="/login" 
                className="px-7 py-3.5 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold text-base transition shadow-md flex items-center gap-2 group"
              >
                Get Started
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* Right Floating Card & Layout (matching image style) */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center h-full">
            {/* Number indicators on the right side */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3 text-right font-mono text-sm text-gray-400">
              <span className="text-gray-900 font-bold text-lg flex items-center justify-end gap-2"><span className="w-4 h-[2px] bg-gray-900"></span> 01</span>
              <span className="hover:text-gray-700 cursor-pointer transition">02</span>
              <span className="hover:text-gray-700 cursor-pointer transition">03</span>
              <span className="hover:text-gray-700 cursor-pointer transition">04</span>
            </div>

            {/* Main Featured Credit Card */}
            <div className="w-full max-w-md bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-7 rounded-3xl shadow-2xl relative overflow-hidden transform hover:scale-[1.02] transition duration-300">
              <div className="flex justify-between items-center relative z-10">
                <span className="font-bold text-lg tracking-wider">arcana</span>
                <span className="text-xs tracking-widest uppercase opacity-70 bg-white/10 px-2.5 py-1 rounded-md">Essentials</span>
              </div>
              <div className="relative z-10 text-2xl font-mono tracking-widest my-10">
                •••• 1893
              </div>
              <div className="flex justify-between items-end relative z-10 text-xs">
                <div>
                  <span className="opacity-60 block">Card Holder</span>
                  <span className="font-semibold text-sm">SECURE USER</span>
                </div>
                <div className="flex gap-1 items-center">
                  <div className="w-6 h-6 rounded-full bg-red-500/80"></div>
                  <div className="w-6 h-6 rounded-full bg-yellow-500/80 -ml-3"></div>
                </div>
              </div>
              {/* Background glowing blur */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
            </div>

            {/* Bottom Right Smaller Cards Preview */}
            <div className="w-full max-w-md flex justify-end gap-3 mt-6">
              <div className="w-32 bg-gray-100 p-3 rounded-2xl border border-gray-200/60 shadow-sm">
                <div className="text-[10px] font-bold text-gray-800">arcana</div>
                <div className="text-[10px] font-mono mt-2 text-gray-500">•••• 4821</div>
              </div>
              <div className="w-32 bg-gray-900 text-white p-3 rounded-2xl shadow-md">
                <div className="text-[10px] font-bold">arcana</div>
                <div className="text-[10px] font-mono mt-2 text-gray-400">•••• 9102</div>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full px-8 py-6 text-center text-xs text-gray-400 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>© 2026 Arcana Banking System. All rights reserved.</div>
        <div className="flex gap-6">
          <span className="hover:text-gray-600 cursor-pointer transition">Privacy Policy</span>
          <span className="hover:text-gray-600 cursor-pointer transition">Terms of Service</span>
          <span className="hover:text-gray-600 cursor-pointer transition">Support</span>
        </div>
      </footer>
    </div>
  );
}