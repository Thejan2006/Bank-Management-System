'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function TransferPage() {
  const [senderId, setSenderId] = useState('');
  const [receiverAccountNumber, setReceiverAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (!storedUserId) {
      toast.error('Session expired. Please login again.');
      router.push('/login');
      return;
    }
    setSenderId(storedUserId);
  }, [router]);

  const handleTransfer = async (e) => {
    e.preventDefault();
    const formattedSenderId = parseInt(senderId);
    const numericAmount = parseFloat(amount);
    const token = localStorage.getItem('access_token');

    if (!receiverAccountNumber.trim()) {
      toast.error('Please enter the receiver account number.');
      return;
    }
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast.error('Please enter a valid amount greater than 0.');
      return;
    }

    const headers = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch('http://localhost:8000/transfer', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          sender_id: formattedSenderId,
          receiver_account_number: receiverAccountNumber.trim(),
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
        toast.success(data.message || 'Transfer completed successfully!');
        setAmount('');
        setReceiverAccountNumber('');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      }
    } catch (err) {
      console.error('Fetch Error:', err);
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
          <p className="text-zinc-400 text-sm">Secure and fast fund transfers.</p>
        </div>
        <div className="hidden md:block">
          <div className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Current Session</div>
          <div className="text-lg font-semibold">User ID: {senderId || 'Loading...'}</div>
        </div>
      </div>

      {/* Right Form Side */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-zinc-50">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 p-8 md:p-10">
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">Send Money</h2>
            <p className="text-sm text-zinc-500">Transfer funds instantly to any account.</p>
          </div>

          <form onSubmit={handleTransfer} className="space-y-6">
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Receiver Account Number</label>
                <input 
                  type="text" 
                  value={receiverAccountNumber} 
                  onChange={(e) => setReceiverAccountNumber(e.target.value)} 
                  required
                  placeholder="e.g. ACC123456"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4 text-zinc-900 font-semibold focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all placeholder-zinc-300"
                />
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

            <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
              <span className="text-lg">🔒</span>
              Only confirm if the receiver details are correct.
            </div>

            <div className="pt-2 space-y-3">
              <button 
                type="submit" 
                className="w-full bg-zinc-900 hover:bg-black text-white font-bold text-xs tracking-widest uppercase py-4 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2"
              >
                Confirm Payment {amount ? `(Rs. ${amount})` : ''}
              </button>

              <button 
                type="button" 
                onClick={() => router.push('/dashboard')}
                className="w-full bg-white border border-zinc-200 text-zinc-700 font-bold text-xs tracking-widest uppercase py-4 rounded-xl transition hover:bg-zinc-50 flex justify-center items-center"
              >
                Cancel & Return
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}