'use client';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function CreateAccountPage() {
  const [userId, setUserId] = useState('');
  const [initialDeposit, setInitialDeposit] = useState('');
  const [message, setMessage] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    toast.dismiss();
    setAccountNumber('');
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/create_account', {
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
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans">
      <Toaster position="top-right" />

      {/* Left Branding Side */}
      <div className="md:w-1/3 bg-zinc-950 text-white p-10 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">ArcanaBank.</h1>
          <p className="text-zinc-400 text-sm">Welcome to the future of finance.</p>
        </div>
        <div className="hidden md:block">
          <div className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Status</div>
          <div className="text-lg font-semibold text-zinc-300">Registration Portal</div>
        </div>
      </div>

      {/* Right Form Side */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-zinc-50">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 p-8 md:p-10">
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">Create Account</h2>
            <p className="text-sm text-zinc-500">Enter your details to open a new bank account.</p>
          </div>

          <form onSubmit={handleCreateAccount} className="space-y-6">
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">User ID</label>
                <input 
                  type="number" 
                  value={userId} 
                  onChange={(e) => setUserId(e.target.value)} 
                  required
                  placeholder="Enter your ID"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4 text-zinc-900 font-semibold focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all placeholder-zinc-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Initial Deposit (Rs.)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={initialDeposit} 
                  onChange={(e) => setInitialDeposit(e.target.value)} 
                  required
                  placeholder="0.00"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4 text-zinc-900 font-semibold focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-all placeholder-zinc-300"
                />
              </div>
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-zinc-900 hover:bg-black text-white font-bold text-xs tracking-widest uppercase py-4 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-zinc-500 border-t-white rounded-full animate-spin"></div>
                ) : (
                  'Open Account'
                )}
              </button>
            </div>
          </form>

          {/* Generated Account Number Display */}
          {accountNumber && (
            <div className="mt-8 p-6 bg-zinc-50 border border-zinc-200 rounded-2xl text-center animate-fade-in">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Account Successfully Created</p>
              <p className="text-2xl font-mono font-black text-zinc-900 tracking-wider">{accountNumber}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}