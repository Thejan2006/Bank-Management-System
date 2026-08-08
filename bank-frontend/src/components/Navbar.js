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
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', backgroundColor: '#1e293b', color: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', flexWrap: 'wrap', gap: '10px' }}>
      
      {/* Brand / Logo section - Arcana */}
      <div style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>
        <Link href="/" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logo.png" alt="Arcana Logo" style={{ height: '30px', width: 'auto' }} />
          <span>Arcana</span>
        </Link>
      </div>

      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
        
        <Link href="/" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: '500' }}>Home</Link>

        {/* only for logged-in users */}
        {isLoggedIn ? (
          <>
            <Link href="/dashboard" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: '500' }}>Dashboard</Link>
            <Link href="/transactions" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: '500' }}>Transactions</Link>
            <Link href="create-account" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: '500' }}>Create Account</Link>
            <Link href="/transfer" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: '500' }}>Transfer</Link>
            <Link href="/history" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: '500' }}>History</Link>
            <Link href="/profile" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: '500' }}>Profile</Link>
            <button onClick={handleLogout} style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}>
              Logout
            </button>
          </>
        ) : (
          /* this is for not logged-in users */
          <>
            <Link href="/login" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: '500' }}>Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}