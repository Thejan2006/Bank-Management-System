'use client';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { API_BASE_URL } from '../../lib/api';

export default function CreateAccountPage() {
  const [userId, setUserId] = useState('');
  const [initialDeposit, setInitialDeposit] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    toast.dismiss();
    setAccountNumber('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/create_account`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: parseInt(userId),
          initial_deposit: parseFloat(initialDeposit)
        }),
      });

      const data = await response.json();

      if (data.error) {
        const errorText = typeof data.error === 'object' 
          ? (data.error.message || JSON.stringify(data.error)) 
          : data.error;
        toast.error(errorText);
      } else if (data.message) {
        const successText = typeof data.message === 'object'
          ? JSON.stringify(data.message)
          : data.message;

        toast.success(successText);
        setAccountNumber(data.account_number || '');
      } else {
        toast.error('Unexpected response format from server.');
      }
    } catch (err) {
      toast.error('Failed to connect to the backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans bg-zinc-50 selection:bg-zinc-900 selection:text-white">
      <Toaster position="top-right" />

      {/* Enhanced Left Panel */}
      <div className="md:w-5/12 bg-zinc-950 text-white p-12 flex flex-col justify-between relative overflow-hidden z-0 shadow-2xl">
        {/* Abstract Background Effects */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f15_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f15_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-zinc-800 opacity-20 blur-[120px] mix-blend-screen"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            System Online
          </div>
          <h1 className="text-5xl font-black tracking-tight mb-4 leading-tight">
            Start your<br/>financial<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-600">journey here.</span>
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
            ArcanaBank provides institutional-grade security for your personal wealth. Setup takes less than a minute.
          </p>
        </div>

        {/* Info Widgets to fill space */}
        <div className="relative z-10 space-y-4">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition hover:bg-white/10 duration-300">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-xl">🛡️</div>
              <div>
                <p className="text-sm font-bold text-white">Bank-Grade Encryption</p>
                <p className="text-xs text-zinc-500">AES-256 bit secured network</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-16 relative">
        {/* Subtle background glow on the right side too */}
        <div className="absolute right-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-zinc-200 opacity-50 blur-[100px]"></div>

        <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white/60 p-10 md:p-12 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-shadow duration-500">
          
          <div className="mb-10 text-center">
            <div className="w-16 h-16 bg-zinc-100 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl shadow-inner border border-zinc-200/50">💲</div>
            <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Create Account</h2>
            <p className="text-sm text-zinc-500 mt-2">Enter credentials to initialize your vault.</p>
          </div>

          <form onSubmit={handleCreateAccount} className="space-y-6">
            
            <div className="space-y-5">
              <div className="group">
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 group-focus-within:text-zinc-900 transition-colors">User Identification</label>
                <input 
                  type="number" 
                  value={userId} 
                  onChange={(e) => setUserId(e.target.value)} 
                  required
                  placeholder="Enter your ID"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-zinc-900 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-zinc-900/5 focus:border-zinc-900 transition-all duration-300 placeholder-zinc-300 shadow-sm"
                />
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 group-focus-within:text-zinc-900 transition-colors">Initial Deposit</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-zinc-400 font-bold">Rs.</span>
                  <input 
                    type="number" 
                    step="0.01"
                    value={initialDeposit} 
                    onChange={(e) => setInitialDeposit(e.target.value)} 
                    required
                    placeholder="0.00"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-12 pr-5 py-4 text-zinc-900 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-zinc-900/5 focus:border-zinc-900 transition-all duration-300 placeholder-zinc-300 shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full relative overflow-hidden bg-zinc-900 text-white font-bold text-sm tracking-widest uppercase py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0 group"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-zinc-500 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>Open Vault <span>→</span></>
                  )}
                </span>
              </button>
            </div>
          </form>

          {/* Animated Success Message */}
          {accountNumber && (
            <div className="mt-8 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl text-center transform hover:scale-105 transition-transform duration-300">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">Account Active</p>
              <p className="text-3xl font-mono font-black text-emerald-900 tracking-widest">{accountNumber}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
