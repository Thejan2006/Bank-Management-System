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
    <div className="min-h-screen flex flex-col md:flex-row font-sans bg-zinc-50 selection:bg-zinc-900 selection:text-white">
      <Toaster position="top-right" />

      {/* Enhanced Left Panel */}
      <div className="md:w-5/12 bg-zinc-950 text-white p-12 flex flex-col justify-between relative overflow-hidden z-0 shadow-2xl">
        {/* Radar / Network Effect */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="w-[400px] h-[400px] border border-white rounded-full absolute animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
          <div className="w-[600px] h-[600px] border border-white rounded-full absolute animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 -z-10 h-[400px] w-[400px] rounded-full bg-blue-600 opacity-20 blur-[120px]"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            Peer-to-Peer Network
          </div>
          <h1 className="text-5xl font-black tracking-tight mb-4 leading-tight">
            Global wire<br/>transfers,<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">reimagined.</span>
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
            Send money to anyone, anywhere, instantly. Authenticated and verified via Arcana protocols.
          </p>
        </div>

        <div className="relative z-10">
           <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
            <div className="flex justify-between items-end">
              <div>
                <div className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-1">Sender Node</div>
                <div className="text-xl font-mono font-bold text-zinc-200">ID: {senderId || 'Loading...'}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                 <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-16 relative">
        <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white/60 p-10 md:p-12 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500">
          
          <div className="mb-10 text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl shadow-sm border border-blue-100">💸</div>
            <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Send Money</h2>
            <p className="text-sm text-zinc-500 mt-2">Provide destination details to wire funds.</p>
          </div>

          <form onSubmit={handleTransfer} className="space-y-6">
            
            <div className="space-y-5">
              <div className="group">
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 group-focus-within:text-zinc-900 transition-colors">Receiver Account</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-zinc-400 font-bold">#</span>
                  <input 
                    type="text" 
                    value={receiverAccountNumber} 
                    onChange={(e) => setReceiverAccountNumber(e.target.value)} 
                    required
                    placeholder="ACC123456"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-12 pr-5 py-4 text-zinc-900 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-zinc-900/5 focus:border-zinc-900 transition-all duration-300 placeholder-zinc-300 shadow-sm"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 group-focus-within:text-zinc-900 transition-colors">Transfer Amount</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-zinc-400 font-bold">Rs.</span>
                  <input 
                    type="number" 
                    step="0.01"
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    required
                    placeholder="0.00"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-12 pr-5 py-4 text-zinc-900 font-black text-2xl focus:outline-none focus:ring-4 focus:ring-zinc-900/5 focus:border-zinc-900 transition-all duration-300 placeholder-zinc-300 shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-center gap-4 animate-fade-in mt-2">
              <span className="text-xl">🔒</span>
              <p className="text-xs font-semibold text-amber-800 leading-relaxed">Transactions are final. Please verify the receiver details before confirming.</p>
            </div>

            <div className="pt-4 space-y-3">
              <button 
                type="submit" 
                className="w-full bg-zinc-900 hover:bg-black text-white font-bold text-sm tracking-widest uppercase py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex justify-center items-center gap-3 group"
              >
                <span>Authorize Transfer</span>
                <span className="group-hover:translate-x-2 transition-transform duration-300">↗</span>
              </button>

              <button 
                type="button" 
                onClick={() => router.push('/dashboard')}
                className="w-full bg-transparent border-2 border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-900 font-bold text-sm tracking-widest uppercase py-4 rounded-2xl transition-all duration-300 flex justify-center items-center"
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