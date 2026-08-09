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
        toast.success(data.message || 'Transaction successful');
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
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans">
      <Toaster position="top-right" />

      {/* Left Branding Side */}
      <div className="md:w-1/3 bg-zinc-950 text-white p-10 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">ArcanaBank.</h1>
          <p className="text-zinc-400 text-sm">Manage your deposits and withdrawals.</p>
        </div>
        <div className="hidden md:block">
          <div className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Account ID</div>
          <div className="text-lg font-semibold">{userId || 'Loading...'}</div>
        </div>
      </div>

      {/* Right Form Side */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-zinc-50">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 p-8 md:p-10">
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">Transactions</h2>
            <p className="text-sm text-zinc-500">Deposit or withdraw funds securely.</p>
          </div>

          <form onSubmit={handleTransaction} className="space-y-6">
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Transaction Type</label>
                <select 
                  value={type} 
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4 text-zinc-900 font-semibold focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all cursor-pointer appearance-none"
                >
                  <option value="deposit">Deposit Money</option>
                  <option value="withdraw">Withdraw Money</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Amount (Rs.)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)} 
                  required
                  placeholder="0.00"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4 text-zinc-900 font-semibold focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all placeholder-zinc-300"
                />
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <button 
                type="submit" 
                className="w-full bg-zinc-900 hover:bg-black text-white font-bold text-xs tracking-widest uppercase py-4 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2"
              >
                Proceed {type === 'deposit' ? 'Deposit' : 'Withdrawal'}
              </button>

              <button 
                type="button" 
                onClick={() => router.push('/dashboard')}
                className="w-full bg-white border border-zinc-200 text-zinc-700 font-bold text-xs tracking-widest uppercase py-4 rounded-xl transition hover:bg-zinc-50 flex justify-center items-center"
              >
                Back to Dashboard
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}