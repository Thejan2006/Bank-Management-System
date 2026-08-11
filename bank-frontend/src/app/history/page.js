'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { API_BASE_URL } from '../../lib/api';

export default function HistoryPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Protected Route Check: Redirect to login if user_id is missing
    const storedUserId = localStorage.getItem('user_id');
    if (!storedUserId) {
      router.push('/login');
      return;
    }
    
    setUserId(storedUserId);

    // Fetch transaction history from backend
    fetch(`${API_BASE_URL}/transactions/${storedUserId}`)
      .then((res) => res.json())
      .then((data) => {
        let txList = [];
        if (Array.isArray(data)) {
          txList = data;
        } else if (data.transactions && Array.isArray(data.transactions)) {
          txList = data.transactions;
        }
        setTransactions(txList);
      })
      .catch((err) => console.error('Fetch history error:', err))
      .finally(() => setLoading(false));
  }, [router]);

  // Function to generate and download PDF bank statement
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // PDF Header
    doc.setFontSize(18);
    doc.text('MyBank - Account Statement', 14, 20);
    
    doc.setFontSize(11);
    doc.text(`User ID: ${userId}`, 14, 30);
    doc.text(`Generated Date: ${new Date().toLocaleDateString()}`, 14, 36);

    // Prepare Table Columns and Rows
    const tableColumn = ["#", "Type", "Amount (Rs.)"];
    const tableRows = [];

    transactions.forEach((tx, index) => {
      let type = 'Transaction';
      let amount = 0;

      if (Array.isArray(tx)) {
        const knownTypes = ['deposit', 'withdraw', 'transfer'];
        const foundType = tx.find(val => typeof val === 'string' && knownTypes.includes(val.toLowerCase()));
        if (foundType) type = foundType;
        
        const numericVal = tx.find(val => typeof val === 'number' || (!isNaN(parseFloat(val)) && isFinite(val) && typeof val !== 'boolean'));
        if (numericVal !== undefined) amount = parseFloat(numericVal);
      } else if (typeof tx === 'object' && tx !== null) {
        type = tx.type || tx.transaction_type || tx.tx_type || 'Transaction';
        amount = tx.amount !== undefined ? parseFloat(tx.amount) : parseFloat(tx.tx_amount || tx.value || 0);
      }

      tableRows.push([index + 1, String(type).toUpperCase(), parseFloat(amount).toFixed(2)]);
    });

    // Generate Auto Table inside PDF
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 45,
      headStyles: { fillColor: [15, 23, 42] }
    });

    // Save generated PDF
    doc.save(`Bank_Statement_User_${userId}.pdf`);
  };

  // Filter transactions based on search input
  const filteredTransactions = transactions.filter((tx) => {
    let type = 'Transaction';
    if (Array.isArray(tx)) {
      const found = tx.find(val => typeof val === 'string');
      if (found) type = found;
    } else if (typeof tx === 'object' && tx !== null) {
      type = tx.type || tx.transaction_type || tx.tx_type || 'Transaction';
    }
    return String(type).toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 font-medium text-lg animate-pulse">Loading transaction history...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-10 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">All transactions</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and track your account activities</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={() => router.push('/dashboard')}
              className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold px-4 py-2.5 rounded-xl transition text-sm shadow-sm"
            >
              Back to Dashboard
            </button>

            {transactions.length > 0 && (
              <button 
                onClick={handleDownloadPDF} 
                className="bg-black hover:bg-gray-700 text-white font-semibold px-5 py-2.5 rounded-xl transition text-sm shadow-sm flex items-center gap-2"
              >
                📥 Download PDF
              </button>
            )}
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">🔍</span>
            <input 
              type="text"
              placeholder="Search transaction type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          
          <div className="text-xs text-gray-400 font-medium">
            Total Transactions: <span className="font-bold text-gray-700">{transactions.length}</span>
          </div>
        </div>

        {/* Transactions Table Container */}
        {filteredTransactions.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm">
            <p className="text-gray-400 font-medium">No transactions found matching your search.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="py-4 px-6">#</th>
                    <th className="py-4 px-6">Transaction Type</th>
                    <th className="py-4 px-6 text-right">Amount (Rs.)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {filteredTransactions.map((tx, index) => {
                    let type = 'Transaction';
                    let amount = 0;

                    if (Array.isArray(tx)) {
                      const knownTypes = ['deposit', 'withdraw', 'transfer'];
                      const foundType = tx.find(val => typeof val === 'string' && knownTypes.includes(val.toLowerCase()));
                      if (foundType) type = foundType;
                      
                      const numericVal = tx.find(val => typeof val === 'number' || (!isNaN(parseFloat(val)) && isFinite(val) && typeof val !== 'boolean'));
                      if (numericVal !== undefined) amount = parseFloat(numericVal);
                    } else if (typeof tx === 'object' && tx !== null) {
                      type = tx.type || tx.transaction_type || tx.tx_type || 'Transaction';
                      amount = tx.amount !== undefined ? parseFloat(tx.amount) : parseFloat(tx.tx_amount || tx.value || 0);
                    }

                    const isDeposit = String(type).toLowerCase() === 'deposit';

                    return (
                      <tr key={index} className="hover:bg-gray-50/60 transition">
                        <td className="py-4 px-6 text-gray-400 font-medium">{index + 1}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                              isDeposit ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                            }`}>
                              {isDeposit ? '↓' : '↑'}
                            </span>
                            <span className="font-bold text-gray-900 tracking-wide">
                              {String(type).toUpperCase()}
                            </span>
                          </div>
                        </td>
                        <td className={`py-4 px-6 text-right font-bold text-base ${
                          isDeposit ? 'text-emerald-600' : 'text-rose-600'
                        }`}>
                          {isDeposit ? '+' : '-'} Rs. {parseFloat(amount).toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
