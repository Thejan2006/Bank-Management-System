'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

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
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#f8fafc] px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-50 text-teal-500 mb-4 text-2xl shadow-sm">
            🏦
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Create Bank Account</h2>
          <p className="text-sm text-gray-400 mt-1">Enter your details to open a new account</p>
        </div>
        
        {/* Form Section */}
        <form onSubmit={handleCreateAccount} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">User ID</label>
            <input 
              type="number" 
              value={userId} 
              onChange={(e) => setUserId(e.target.value)} 
              required
              placeholder="Enter User ID"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Initial Deposit (Rs.)</label>
            <input 
              type="number" 
              step="0.01"
              value={initialDeposit} 
              onChange={(e) => setInitialDeposit(e.target.value)} 
              required
              placeholder="0.00"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3.5 rounded-xl shadow-md transition duration-200 flex items-center justify-center disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Message Display */}
        {message && (
          <p className={`mt-6 text-center text-sm font-semibold ${message.includes('successfully') ? 'text-green-600' : 'text-red-500'}`}>
            {typeof message === 'object' ? JSON.stringify(message) : message}
          </p>
        )}

        {/* Generated Account Number Card */}
        {accountNumber && (
          <div className="mt-6 p-4 bg-teal-50/50 border border-teal-100 rounded-2xl text-center animate-fade-in">
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-1">Account Number Generated</p>
            <p className="text-xl font-mono font-bold text-gray-900 tracking-wider">{accountNumber}</p>
          </div>
        )}
      </div>
    </div>
  );
}