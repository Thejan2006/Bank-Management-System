'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    setIsLoggedIn(!!userId);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-black flex flex-col relative overflow-x-hidden selection:bg-black selection:text-white">
      
      {/* ---------------- CUSTOM ANIMATIONS ---------------- */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(var(--rot)); }
          50% { transform: translateY(-20px) rotate(calc(var(--rot) + 2deg)); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 40px -10px rgba(59, 130, 246, 0.4); }
          50% { box-shadow: 0 0 60px 5px rgba(59, 130, 246, 0.7); }
        }
        .animate-float-slow { 
          animation: float 7s ease-in-out infinite; 
        }
        .animate-float-fast { 
          animation: float 5s ease-in-out infinite; 
          animation-delay: 1s;
        }
        .glow-effect {
          animation: glow 4s ease-in-out infinite;
        }
      `}} />

      {/* Background Decorative Gradient (Grayscale) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-zinc-50 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-zinc-100 blur-[100px]"></div>
      </div>

      {/* Main Hero Section */}
      <main className="w-full px-8 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center relative z-10 max-w-[1800px] mx-auto pt-16 pb-12">
        
        {/* Left Content (Text) */}
        <div className="w-full lg:w-1/2 flex flex-col items-start pt-10 lg:pt-0">
          
          {/* NEW UI: Trust Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-100/80 border border-zinc-200 mb-8 backdrop-blur-sm transition-transform hover:scale-105 cursor-default">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-40"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-zinc-600">
              Trusted by 10,000+ Businesses
            </span>
          </div>

          <p className="text-xs md:text-sm font-bold tracking-[0.25em] text-zinc-500 uppercase mb-4">
            Secure and manage your money
          </p>
          
          <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-extrabold tracking-tighter text-black leading-[1.05] mb-10 relative">
            Improve <br /> Financial <br /> Performance
            {/* Decorative Dot */}
            <span className="absolute bottom-4 -right-8 w-4 h-4 bg-black rounded-full hidden md:block"></span>
          </h1>

          {/* Button with background shape */}
          <div className="relative inline-block group">
            <div className="absolute -inset-y-6 -inset-x-8 bg-zinc-100 rounded-[2.5rem] rounded-bl-none -z-10 hidden md:block transition-all duration-500 group-hover:bg-zinc-200 group-hover:scale-105"></div>
            <Link 
              href={isLoggedIn ? "/dashboard" : "/login"} 
              className="inline-flex items-center gap-3 bg-zinc-900 text-white px-8 py-5 rounded-2xl text-xs md:text-sm font-bold tracking-widest uppercase hover:bg-black transition-all duration-300 shadow-xl hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:-translate-y-1"
            >
              {isLoggedIn ? "Go to Dashboard" : "Get Started"}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

        {/* Right Content (Overlapping Cards with Advanced Animations) */}
        <div className="w-full lg:w-1/2 relative h-[450px] sm:h-[600px] lg:h-[700px] flex justify-center items-center mt-16 lg:mt-0 perspective-[1200px]">
          
          {/* Ambient Glow behind the cards */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-blue-600/20 blur-[100px] rounded-full z-0"></div>

          {/* Back Card (Blue) */}
          <div 
            className="absolute w-[280px] sm:w-[420px] h-[180px] sm:h-[260px] bg-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-blue-700/50 glow-effect animate-float-slow transition-all duration-500 hover:z-30 cursor-pointer"
            style={{ '--rot': '12deg', transform: 'translate(50px, -40px) rotate(12deg)' }}
          >
            <div className="flex justify-between items-start">
              <div className="font-extrabold text-xl sm:text-2xl italic tracking-wider text-zinc-300">VISA</div>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 text-zinc-300"><path d="M8.5 14c-.3-1-.5-2.2-.5-3.5s.2-2.5.5-3.5" /><path d="M11.5 16.5c-.7-1.4-1-3-1-4.5s.3-3.1 1-4.5" /><path d="M14.5 19c-1-2-1.5-4.4-1.5-7s.5-5 1.5-7" /><path d="M17.5 21.5c-1.3-2.6-2-5.9-2-9.5s.7-6.9 2-9.5" /></svg>
            </div>
            <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8">
              <div className="text-lg sm:text-2xl font-mono tracking-widest mb-1 sm:mb-2 text-zinc-200">
                3456 5467 3455 9875
              </div>
              <div className="text-[10px] sm:text-xs tracking-[0.2em] text-zinc-300 uppercase font-semibold">
                Secure User
              </div>
            </div>
          </div>

          {/* Front Card (Gray Arcana) */}
          <div 
            className="absolute w-[280px] sm:w-[420px] h-[180px] sm:h-[260px] bg-gray-600 rounded-3xl p-6 sm:p-8 text-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] border border-gray-500/50 backdrop-blur-xl animate-float-fast transition-all duration-500 z-20 cursor-pointer"
            style={{ '--rot': '-6deg', transform: 'translate(-30px, 40px) rotate(-6deg)' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translate(-30px, 20px) rotate(-2deg) scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translate(-30px, 40px) rotate(-6deg)'}
          >
            <div className="flex justify-between items-start">
              <div className="font-bold text-lg sm:text-xl tracking-wide flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-white">A</span>rcana
              </div>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80"><path d="M8.5 14c-.3-1-.5-2.2-.5-3.5s.2-2.5.5-3.5"/><path d="M11.5 16.5c-.7-1.4-1-3-1-4.5s.3-3.1 1-4.5"/><path d="M14.5 19c-1-2-1.5-4.4-1.5-7s.5-5 1.5-7"/><path d="M17.5 21.5c-1.3-2.6-2-5.9-2-9.5s.7-6.9 2-9.5"/></svg>
            </div>
            
            {/* Subtle card shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-3xl pointer-events-none"></div>

            <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8">
              <div className="text-lg sm:text-2xl font-mono tracking-widest mb-3 sm:mb-5 text-white drop-shadow-md">
                •••• •••• •••• 1893
              </div>
              <div className="flex justify-between items-end">
                <div className="text-[10px] sm:text-xs tracking-[0.2em] text-white uppercase font-semibold">
                  Secure User
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-orange-500 opacity-100 shadow-inner"></div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-yellow-400 opacity-100 -ml-3 sm:-ml-4 shadow-inner mix-blend-screen"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* NEW UI: Key Statistics Section */}
      <div className="w-full px-8 md:px-12 lg:px-20 max-w-[1800px] mx-auto mt-4 mb-16 z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-zinc-200/60">
          {[
            { value: 'Rs. 50B+', label: 'Processed Volume' },
            { value: '1.2M+', label: 'Active Users' },
            { value: '99.9%', label: 'Uptime Guarantee' },
            { value: '0% Fees', label: 'On internal transfers' }
          ].map((stat, index) => (
            <div key={index} className="flex flex-col">
              <h4 className="text-3xl sm:text-4xl font-extrabold text-black mb-1">{stat.value}</h4>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Banner Section */}
      <div className="w-full px-4 sm:px-8 lg:px-12 pb-6 sm:pb-8 z-20">
        <div className="bg-zinc-100/80 backdrop-blur-sm rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 w-full max-w-[1800px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 shadow-sm border border-zinc-200/50 hover:bg-zinc-100 transition-colors duration-500">
          <div className="w-full lg:w-5/12">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-black leading-tight tracking-tight">
              A Bank especially crafted towards businesses.
            </h3>
          </div>
          <div className="w-full lg:w-7/12 lg:pl-16 lg:border-l border-zinc-300 pt-6 lg:pt-0">
            <p className="text-zinc-600 text-base sm:text-lg font-medium leading-relaxed max-w-2xl mb-6">
              Get access to cash for your business, personalised budgeting, and manage your assets with maximum security, speed, and absolute clarity.
            </p>
            
            {/* NEW UI: Quick Features under banner text */}
            <div className="flex flex-wrap gap-4">
              {['Instant Setup', 'Advanced Analytics', '24/7 Support'].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  <span className="text-sm font-bold text-black">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}