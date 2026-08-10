'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function TransactionsPage() {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('deposit');
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (!storedUserId) {
      toast.error('Session expired. Please login again.');
      router.push('/login');
      return;
    }
    setUserId(storedUserId);
  }, [router]);

  const handleTransaction = async (e) => {
    e.preventDefault();
    const formattedUserId = parseInt(userId);
    const numericAmount = parseFloat(amount);
    const token = localStorage.getItem('access_token');

    if (!formattedUserId) {
      toast.error('User ID cannot find, please login first.');
      return;
    }
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast.error('Please enter a valid amount greater than 0.');
      return;
    }

    const endpoint = type === 'deposit' ? 'http://localhost:8000/deposit' : 'http://localhost:8000/withdraw';
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          user_id: formattedUserId,
          amount: numericAmount
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.detail) {
          const detailMsg = Array.isArray(data.detail)
            ? data.detail.map((err) => `${err.loc[err.loc.length - 1]}: ${err.msg}`).join(', ')
            : JSON.stringify(data.detail);
          toast.error(`Validation Error: ${detailMsg}`);
        } else if (data.error) {
          toast.error(typeof data.error === 'object' ? JSON.stringify(data.error) : data.error);
        } else {
          toast.error('Server error occurred.');
        }
        return;
      }

      if (data.error) {
        toast.error(typeof data.error === 'object' ? JSON.stringify(data.error) : data.error);
      } else {
        toast.success(data.message || 'Transaction successful! Email alert sent');
        setAmount('');
        setTimeout(() => {
          router.push('/dashboard'); 
        }, 1500);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error('Failed to connect to the backend server.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans bg-zinc-50 selection:bg-zinc-900 selection:text-white">
      <Toaster position="top-right" />

      {/* Enhanced Left Panel */}
      <div className="md:w-5/12 bg-zinc-950 text-white p-12 flex flex-col justify-between relative overflow-hidden z-0 shadow-2xl">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f15_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f15_1px,transparent_1px)] bg-[size:30px_30px]"></div>
        
        {/* Dynamic Background Glow based on Type */}
        <div className={`absolute right-0 bottom-0 -z-10 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px] transition-colors duration-700 ${type === 'deposit' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-bold tracking-widest uppercase mb-8">
            <span className="text-lg">⚡</span>
            Live Gateway
          </div>
          <h1 className="text-5xl font-black tracking-tight mb-4 leading-tight">
            Manage<br/>your liquidity<br/>instantly.
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
            Move funds in and out of your vault with zero latency. Your transactions are cryptographically secured.
          </p>
        </div>

        {/* Session Widget */}
        <div className="relative z-10">
          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md shadow-2xl">
            <div className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-2">Connected Account</div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-xl border border-zinc-700">👤</div>
              <div>
                <div className="text-2xl font-mono font-black text-white">{userId || 'Loading...'}</div>
                <div className="text-xs text-emerald-400 font-medium">Session Active & Verified</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-16 relative">
        <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white/60 p-10 md:p-12 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500">
          
          <div className="mb-10">
            <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Transactions</h2>
            <p className="text-sm text-zinc-500 mt-2">Execute deposits or withdrawals securely.</p>
          </div>

          <form onSubmit={handleTransaction} className="space-y-8">
            
            <div className="space-y-6">
              {/* Custom Toggle Switch */}
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Operation Mode</label>
                <div className="flex bg-zinc-100 p-1.5 rounded-2xl relative">
                  <button
                    type="button"
                    onClick={() => setType('deposit')}
                    className={`flex-1 py-4 text-sm font-bold tracking-wider uppercase rounded-xl transition-all duration-300 z-10 ${
                      type === 'deposit' ? 'text-white shadow-sm bg-green-500' : 'text-zinc-400 hover:text-zinc-600'
                    }`}
                  >
                    Deposit 📥
                  </button>
                  <button
                    type="button"
                    onClick={() => setType('withdraw')}
                    className={`flex-1 py-4 text-sm font-bold tracking-wider uppercase rounded-xl transition-all duration-300 z-10 ${
                      type === 'withdraw' ? 'text-white shadow-sm bg-red-500 ' : 'text-zinc-400 hover:text-zinc-600'
                    }`}
                  >
                    Withdraw 📤
                  </button>
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 group-focus-within:text-zinc-900 transition-colors">Amount</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-zinc-400 font-bold">Rs.</span>
                  <input 
                    type="number" 
                    step="0.01"
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    required
                    placeholder="0.00"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-12 pr-5 py-5 text-zinc-900 font-black text-2xl focus:outline-none focus:ring-4 focus:ring-zinc-900/5 focus:border-zinc-900 transition-all duration-300 placeholder-zinc-300 shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <button 
                type="submit" 
                className={`w-full text-white font-bold text-sm tracking-widest uppercase py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex justify-center items-center gap-2 group ${type === 'deposit' ? 'bg-zinc-900 hover:bg-zinc-800' : 'bg-zinc-900 hover:bg-zinc-800'}`}
              >
                <span>Execute {type}</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>

              <button 
                type="button" 
                onClick={() => router.push('/dashboard')}
                className="w-full bg-transparent border-2 border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-900 font-bold text-sm tracking-widest uppercase py-4 rounded-2xl transition-all duration-300 flex justify-center items-center"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}