'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Route check every time the pathname changes to update the login state
  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    setIsLoggedIn(!!userId);
  }, [pathname]);

  const handleLogout = () => {
    // Clear JWT token and user session data
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');

    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <nav className="w-full px-8 md:px-12 lg:px-20 py-8 flex items-center justify-between relative z-50 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <Link href="/" className="text-black font-extrabold text-2xl tracking-tight flex items-center gap-1 text-decoration-none">
          {/* Custom 'A' matching the vibe of your provided logo */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-black">
            <path d="M4 20h16" />
            <path d="m12 4 8 16" />
            <path d="m12 4-8 16" />
            <path d="M8 14h8" />
          </svg>
          Arcana.
        </Link>
      </div>

      {/* Middle Links */}
      <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        
        {isLoggedIn ? (
          <>
            <Link href="/dashboard" className="hover:text-black transition-colors">Dashboard</Link>
            <Link href="/transactions" className="hover:text-black transition-colors">Transactions</Link>
            <Link href="/transfer" className="hover:text-black transition-colors">Transfer</Link>
            <Link href="/history" className="hover:text-black transition-colors">History</Link>
          </>
        ) : (
          <>
            <Link href="#benefits" className="hover:text-black transition-colors">Benefits</Link>
            <Link href="#portfolio" className="hover:text-black transition-colors">Portfolio</Link>
            <Link href="#pricing" className="hover:text-black transition-colors">Pricing</Link>
          </>
        )}
      </div>

      {/* Right Side (Profile/Logout OR Login) */}
      <div className="flex items-center gap-6 xl:gap-8">
        {isLoggedIn ? (
          <>
            <Link href="/create-account" className="hidden md:block text-[10px] xl:text-[11px] font-bold tracking-widest uppercase hover:text-black transition-colors text-zinc-500">
              Create Account
            </Link>
            <Link href="/profile" className="hidden md:block text-[10px] xl:text-[11px] font-bold tracking-widest uppercase hover:text-black transition-colors text-zinc-500">
              Profile
            </Link>
            <button 
              onClick={handleLogout} 
              className="hidden md:block bg-black text-white px-5 py-2.5 rounded-xl text-[10px] xl:text-xs font-bold tracking-widest uppercase hover:bg-zinc-800 hover:shadow-lg transition-all"
            >
              Logout
            </button>
          </>
        ) : (
          <Link 
            href="/login" 
            className="hidden md:block text-xs font-bold tracking-widest uppercase border-b-2 border-transparent hover:border-black text-black transition-all pb-1"
          >
            Login
          </Link>
        )}
        
        {/* Hamburger Menu for Mobile */}
        <button className="flex flex-col gap-1.5 focus:outline-none hover:opacity-70 transition-opacity lg:hidden">
          <span className="w-7 h-[2px] bg-black block"></span>
          <span className="w-7 h-[2px] bg-black block"></span>
        </button>
      </div>
    </nav>
  );
}