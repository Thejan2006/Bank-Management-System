'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-black flex flex-col relative overflow-x-hidden selection:bg-black selection:text-white">

      {/* Background Decorative Gradient (Grayscale) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-zinc-50 blur-[120px]"></div>
        <div className="absolute bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-zinc-100 blur-[100px]"></div>
      </div>

      {/* Top Navbar */}
      <nav className="w-full px-8 md:px-12 lg:px-20 py-8 flex items-center justify-between relative z-20">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="text-black font-extrabold text-2xl tracking-tight flex items-center gap-1">
            {/* Custom 'A' matching the vibe of your provided logo */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-black">
              <path d="M4 20h16" />
              <path d="m12 4 8 16" />
              <path d="m12 4-8 16" />
              <path d="M8 14h8" />
            </svg>
            Arcana.
          </div>
        </div>

        {/* Middle Links (From the Screenshot) */}
        <div className="hidden lg:flex items-center gap-10 text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
          <Link href="/" className="text-black transition-colors">Home</Link>
          <Link href="#benefits" className="hover:text-black transition-colors">Benefits</Link>
          <Link href="#portfolio" className="hover:text-black transition-colors">Portfolio</Link>
          <Link href="#pricing" className="hover:text-black transition-colors">Pricing</Link>
        </div>

        {/* Right Side (Hamburger / Login) */}
        <div className="flex items-center gap-8">
          <Link 
            href="/login" 
            className="hidden md:block text-xs font-bold tracking-widest uppercase border-b-2 border-transparent hover:border-black transition-all pb-1"
          >
            Login
          </Link>
          <button className="flex flex-col gap-1.5 focus:outline-none hover:opacity-70 transition-opacity">
            <span className="w-7 h-[2px] bg-black block"></span>
            <span className="w-7 h-[2px] bg-black block"></span>
          </button>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main className="flex-1 w-full px-8 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center relative z-10 max-w-[1800px] mx-auto w-full">

        {/* Left Content (Text) */}
        <div className="w-full lg:w-1/2 flex flex-col items-start pt-10 lg:pt-0">
          <p className="text-xs md:text-sm font-bold tracking-[0.25em] text-zinc-500 uppercase mb-6">
            Secure and manage your money
          </p>
          <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-extrabold tracking-tighter text-black leading-[1.05] mb-10">
            Improve <br /> Financial <br /> Performance
          </h1>

          {/* Button with background shape matching design */}
          <div className="relative inline-block group">
            {/* Decorative background shape */}
            <div className="absolute -inset-y-6 -inset-x-8 bg-zinc-100 rounded-[2.5rem] rounded-bl-none -z-10 hidden md:block transition-all group-hover:bg-zinc-200"></div>
            
            <Link 
              href="/login" 
              className="inline-flex items-center gap-3 bg-zinc-900 text-white px-8 py-5 rounded-2xl text-xs md:text-sm font-bold tracking-widest uppercase hover:bg-black transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Get Started
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

        {/* Right Content (Overlapping Cards) */}
        <div className="w-full lg:w-1/2 relative h-[450px] sm:h-[600px] lg:h-[700px] flex justify-center items-center mt-16 lg:mt-0 perspective-[1200px]">

          {/* Back Card (Dark Gray) */}
          <div className="absolute w-[280px] sm:w-[420px] h-[180px] sm:h-[260px] bg-zinc-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl rotate-[12deg] translate-x-8 sm:translate-x-20 -translate-y-10 sm:-translate-y-16 transition-all duration-700 hover:rotate-[16deg] hover:-translate-y-20 border border-zinc-700/50">
            <div className="flex justify-between items-start">
              <div className="font-extrabold text-xl sm:text-2xl italic tracking-wider text-zinc-400">VISA</div>
              {/* Contactless Icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 text-zinc-300"><path d="M8.5 14c-.3-1-.5-2.2-.5-3.5s.2-2.5.5-3.5"/><path d="M11.5 16.5c-.7-1.4-1-3-1-4.5s.3-3.1 1-4.5"/><path d="M14.5 19c-1-2-1.5-4.4-1.5-7s.5-5 1.5-7"/><path d="M17.5 21.5c-1.3-2.6-2-5.9-2-9.5s.7-6.9 2-9.5"/></svg>
            </div>
            <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8">
              <div className="text-lg sm:text-2xl font-mono tracking-widest mb-1 sm:mb-2 text-zinc-300">
                3456 5467 3455 9875
              </div>
              <div className="text-[10px] sm:text-xs tracking-[0.2em] text-zinc-500 uppercase font-semibold">
                Secure User
              </div>
            </div>
          </div>

          {/* Front Card (Pure Black) */}
          <div className="absolute w-[280px] sm:w-[420px] h-[180px] sm:h-[260px] bg-black rounded-3xl p-6 sm:p-8 text-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] -rotate-[6deg] -translate-x-8 sm:-translate-x-16 translate-y-10 sm:translate-y-16 border border-zinc-800 transition-all duration-700 hover:-rotate-[2deg] hover:translate-y-10 backdrop-blur-xl">
            <div className="flex justify-between items-start">
              <div className="font-bold text-lg sm:text-xl tracking-wide flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-white">A</span>rcana
              </div>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80"><path d="M8.5 14c-.3-1-.5-2.2-.5-3.5s.2-2.5.5-3.5"/><path d="M11.5 16.5c-.7-1.4-1-3-1-4.5s.3-3.1 1-4.5"/><path d="M14.5 19c-1-2-1.5-4.4-1.5-7s.5-5 1.5-7"/><path d="M17.5 21.5c-1.3-2.6-2-5.9-2-9.5s.7-6.9 2-9.5"/></svg>
            </div>
            <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8">
              <div className="text-lg sm:text-2xl font-mono tracking-widest mb-3 sm:mb-5 text-white">
                •••• •••• •••• 1893
              </div>
              <div className="flex justify-between items-end">
                <div className="text-[10px] sm:text-xs tracking-[0.2em] text-zinc-400 uppercase font-semibold">
                  Secure User
                </div>
                {/* Mastercard style circles in Grayscale */}
                <div className="flex items-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-zinc-500 opacity-90 mix-blend-screen"></div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-zinc-700 opacity-90 mix-blend-screen -ml-3 sm:-ml-4"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Bottom Banner Section */}
      <div className="w-full px-4 sm:px-8 lg:px-12 pb-6 sm:pb-8 mt-12 z-20">
        <div className="bg-zinc-100/80 backdrop-blur-sm rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 w-full max-w-[1800px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 shadow-sm border border-zinc-200/50">
          
          <div className="w-full lg:w-5/12">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-black leading-tight tracking-tight">
              A Bank especially crafted towards businesses.
            </h3>
          </div>
          
          <div className="w-full lg:w-7/12 lg:pl-16 lg:border-l border-zinc-300 pt-6 lg:pt-0">
            <p className="text-zinc-600 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
              Get access to cash for your business, personalised budgeting, and manage your assets with maximum security, speed, and absolute clarity.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}