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
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4 font-sans">
      <Toaster position="top-right" />

      <div className="bg-white w-full max-w-[420px] rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
        
        {/* Top Header */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-5 mb-6">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-200 to-emerald-400 flex items-center justify-center text-white font-bold">
            💸
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-gray-800">
              ID: {userId || 'Loading...'}
            </div>
            <div className="text-xs text-gray-400 font-medium mt-1">ArcanaBank Secure</div>
          </div>
        </div>

        {/* Title Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Bank Transactions</h2>
          <p className="text-sm text-gray-500">Deposit or withdraw funds securely</p>
        </div>

        {/* Form */}
        <form onSubmit={handleTransaction}>
          
          <div className="bg-[#f8f9fa] rounded-2xl p-5 mb-6 border border-gray-100 space-y-5">
            
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Transaction Type</label>
              <select 
                value={type} 
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-transparent border-none p-0 text-gray-900 font-bold text-base focus:ring-0 cursor-pointer"
              >
                <option value="deposit">Deposit Money</option>
                <option value="withdraw">Withdraw Money</option>
              </select>
              <div className="h-[1px] w-full bg-gray-200 mt-2"></div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Amount (Rs.)</label>
              <input 
                type="number" 
                step="0.01"
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                required
                placeholder="0.00"
                className="w-full bg-transparent border-none p-0 text-gray-900 font-bold text-lg focus:ring-0 placeholder-gray-300"
              />
              <div className="h-[1px] w-full bg-gray-200 mt-2"></div>
            </div>

          </div>

          <button 
            type="submit" 
            className={`w-full text-white font-semibold py-3.5 rounded-2xl transition shadow-md flex justify-center items-center gap-2 ${
              type === 'deposit' ? 'bg-[#10b981] hover:bg-[#059669]' : 'bg-[#ef4444] hover:bg-[#dc2626]'
            }`}
          >
            {type === 'deposit' ? 'Proceed Deposit' : 'Proceed Withdrawal'}
          </button>

          <button 
            type="button" 
            onClick={() => router.push('/dashboard')}
            className="w-full mt-3 bg-white border border-gray-200 text-gray-800 font-semibold py-3.5 rounded-2xl transition hover:bg-gray-50 flex justify-center items-center"
          >
            Back to dashboard
          </button>
        </form>
      </div>
    </div>
  );
}