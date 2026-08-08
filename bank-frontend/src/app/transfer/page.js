'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast'; // 🔴 Toaster import කළා

export default function TransferPage() {
  const [senderId, setSenderId] = useState('');
  const [receiverAccountNumber, setReceiverAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');

    // Only check for user_id to match Navbar behavior
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

    // Set headers dynamically (include Authorization header if token exists)
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
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4 font-sans">
      {/* 🔴 Toaster component show massage */}
      <Toaster position="top-right" />

      {/* Main Card */}
      <div className="bg-white w-full max-w-[420px] rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
        
        {/* Top Header */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-5 mb-6">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-200 to-blue-500 flex items-center justify-center text-white font-bold">💸</div>
          <div className="text-right">
            <div className="text-sm font-semibold text-gray-800 flex items-center justify-end gap-2">
              <span>💳 ID: {senderId || 'Loading...'}</span>
            </div>
            <div className="text-xs text-gray-400 font-medium mt-1">ArcanaBank Secure</div>
          </div>
        </div>

        {/* Title Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Bank transfer</h2>
          <p className="text-sm text-gray-500">Make transfer to the account details below</p>
        </div>

        {/* Form */}
        <form onSubmit={handleTransfer}>
          
          {/* Inner Grey Box for Inputs (Matching the image style) */}
          <div className="bg-[#f8f9fa] rounded-2xl p-5 mb-6 border border-gray-100 space-y-5">
            
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Receiver Account Number</label>
              <input 
                type="text" 
                value={receiverAccountNumber} 
                onChange={(e) => setReceiverAccountNumber(e.target.value)} 
                required
                placeholder="e.g. ACC123456"
                className="w-full bg-transparent border-none p-0 text-gray-900 font-bold text-lg focus:ring-0 placeholder-gray-300"
              />
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

          {/* Info Text */}
          <div className="flex justify-center items-center gap-2 mb-4 text-sm font-medium text-indigo-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            Only confirm if details are correct
          </div>

          {/* Primary Button */}
          <button 
            type="submit" 
            className="w-full bg-[#5642ea] hover:bg-[#4632c9] text-white font-semibold py-3.5 rounded-2xl transition shadow-md flex justify-center items-center gap-2"
          >
            Confirm payment {amount ? `(Rs. ${amount})` : ''}
          </button>

          {/* Secondary Button */}
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