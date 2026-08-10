'use client';
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';

export default function DashboardUI({ name = "Yasho", balance: serverBalance = 0, chartData: serverChartData = [], loading }) {
  // State Management for Dynamic Updates synchronized with Backend/Logic Page
  const [balance, setBalance] = useState(serverBalance);
  const [chartData, setChartData] = useState([
    { name: 'Income', value: 0 },
    { name: 'Expense', value: 0 }
  ]);
  const [transferAmount, setTransferAmount] = useState('');
  const [showCardModal, setShowCardModal] = useState(false);

  // Sync with props from DashboardPage logic
  useEffect(() => {
    setBalance(serverBalance);
  }, [serverBalance]);

  useEffect(() => {
    if (serverChartData && serverChartData.length > 0) {
      const mapped = serverChartData.map(item => ({
        name: item.name.replace('Total ', '').replace('Expenses', 'Expense'),
        value: item.value
      }));
      setChartData(mapped);
    }
  }, [serverChartData]);

  // Transactions State
  const [transactions, setTransactions] = useState([
    { id: 1, title: 'Seylan Bank - Dividend', date: 'Dec 19, 2023 at 09:33', amount: 12500, type: 'income', icon: '📈' },
    { id: 2, title: 'Dialog Axiata - Bill', date: 'Dec 18, 2023 at 14:20', amount: -2500, type: 'expense', icon: '📱' },
    { id: 3, title: 'Supermarket', date: 'Dec 15, 2023 at 10:00', amount: -4500, type: 'expense', icon: '🛒' }
  ]);

  // Derived Calculations from synchronized chartData
  const totalIncome = chartData.find(c => c.name === 'Income')?.value || 0;
  const totalExpense = chartData.find(c => c.name === 'Expense')?.value || 0;

  const PIE_COLORS = ['#10B981', '#EF4444'];

  const lineGraphData = [
    { name: 'Mon', amount: 20000 },
    { name: 'Tue', amount: 35000 },
    { name: 'Wed', amount: 28000 },
    { name: 'Thu', amount: 48000 },
    { name: 'Fri', amount: 42000 },
    { name: 'Sat', amount: balance * 0.15 }, 
  ];

  const monthlyGrowthData = [
    { month: 'Jan', height: '65%' }, { month: 'Feb', height: '30%' },
    { month: 'Mar', height: '42%' }, { month: 'Apr', height: '50%' },
    { month: 'May', height: '90%' }, { month: 'Jun', height: '25%' },
    { month: 'Jul', height: '75%' }
  ];

  const exchangeRatesData = [
    { day: 'Mon', rate: 301.2 },
    { day: 'Tue', rate: 301.8 },
    { day: 'Wed', rate: 302.1 },
    { day: 'Thu', rate: 302.0 },
    { day: 'Fri', rate: 302.5 }
  ];

  // Transfer Logic
  const handleTransfer = (e) => {
    e.preventDefault();
    const amount = parseFloat(transferAmount);
    if (amount > 0 && amount <= balance) {
      setBalance(prev => prev - amount);
      const newTransaction = {
        id: Date.now(),
        title: 'Quick Transfer',
        date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' }),
        amount: -amount,
        type: 'expense',
        icon: '💸'
      };
      setTransactions([newTransaction, ...transactions]);
      setTransferAmount('');
    } else {
      alert("Invalid amount or insufficient balance!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f4f5]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f4f5] font-sans text-gray-900 pb-12 relative">
      
      {/* ---------------- CARD DETAILS MODAL ---------------- */}
      {showCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md transition-opacity duration-300">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-[90%] max-w-md transform scale-100 animate-[fadeIn_0.3s_ease-out]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-extrabold text-gray-900">Card Details</h2>
              <button onClick={() => setShowCardModal(false)} className="text-gray-400 hover:text-black transition-colors text-xl font-bold">
                ✕
              </button>
            </div>
            
            {/* Modal Card Display */}
            <div className="bg-linear-to-br from-blue-600 via-blue-500 to-blue-300 p-6 rounded-2xl text-white shadow-lg mb-6">
               <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-lg tracking-wider text-gray-300">Arcana Premium</span>
                  <div className="w-12 h-8 bg-yellow-400 rounded-md backdrop-blur-sm"></div>
               </div>
               <div className="text-2xl font-mono tracking-widest text-white mb-6">4532  8921  3312  9102</div>
               <div className="flex justify-between text-sm text-white">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider">Card Holder</div>
                    <div className="font-semibold text-white uppercase">{name}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider">Expires</div>
                    <div className="font-semibold text-white">12/28</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider">CVV</div>
                    <div className="font-semibold text-white">***</div>
                  </div>
               </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-gray-500 font-medium">Daily Limit</span>
                <span className="font-bold">Rs. 100,000.00</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-gray-500 font-medium">Card Status</span>
                <span className="font-bold text-green-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span> Active
                </span>
              </div>
            </div>

            <button onClick={() => setShowCardModal(false)} className="w-full mt-6 bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors">
              Close Details
            </button>
          </div>
        </div>
      )}

      {/* ---------------- DASHBOARD CONTENT ---------------- */}
      <div className="max-w-7xl mx-auto pt-8 px-4">
        
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="animate-[slideDown_0.5s_ease-out]">
            <div className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Total balance</div>
            <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-black mt-1 transition-all duration-500">
              Rs {parseFloat(balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              <span className="ml-4 text-sm bg-black text-white px-3 py-1 rounded-full align-middle">+22%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ---------------- LEFT COLUMN ---------------- */}
          <div className="space-y-8">
            
            {/* My Cards Section */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-xl font-extrabold text-black">My Cards</h3>
              </div>

              {/* Advanced Black/Gray Card */}
              <div
                onClick={() => setShowCardModal(true)}
                className="bg-gradient-to-br from-blue-600 via-blue-500 to-blue-300 p-6 rounded-2xl text-white shadow-2xl relative overflow-hidden h-52 flex flex-col justify-between transition-all transform hover:scale-[1.03] hover:-translate-y-1 duration-300 cursor-pointer group"
              >
                <div className="flex justify-between items-center relative z-10">
                  <span className="font-extrabold text-lg tracking-widest text-gray-200">
                    ARCANA
                  </span>
                  <div className="w-10 h-7 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-md opacity-80"></div>
                </div>
                
                <div className="relative z-10 text-xl font-mono tracking-[0.3em] text-gray-300">
                  **** **** **** 9102
                </div>

                <div className="flex justify-between items-end relative z-10">
                  <div>
                    <div className="text-[10px] uppercase text-white tracking-widest">Card Holder</div>
                    <div className="font-bold text-sm tracking-wide uppercase">{name}</div>
                  </div>
                  <div className="text-2xl font-black italic tracking-tighter text-blue-700">
                    VISA
                  </div>
                </div>
                {/* Minimalist Card Effects */}
                <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-white opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-all duration-500"></div>
                <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 bg-gray-500 opacity-10 rounded-full blur-2xl"></div>
              </div>
              
              {/* Balance Summary Box */}
              <div className="mt-6 border border-gray-100 p-5 rounded-2xl flex justify-between items-center bg-[#fafafa]">
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Available Funds</div>
                  <div className="text-xl font-extrabold text-black transition-all duration-500">
                    Rs. {parseFloat(balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="text-right flex flex-col items-end">
                  <div className="text-xs font-semibold text-black uppercase tracking-wider mb-1">Status</div>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span>
                    </span>
                    <span className="text-green-500 font-bold text-sm">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Currency Exchange Widget */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-black">Currency Exchange</h3>
                  <p className="text-xs font-semibold text-gray-400 mt-0.5">USD / LKR Forex Rates</p>
                </div>
                <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Rs. 302.50
                </span>
              </div>
              <div className="w-full h-[140px] mt-2">
                <ResponsiveContainer width={"100%"} height={"100%"}>
                   <LineChart data={exchangeRatesData}>
                    <XAxis dataKey="day" stroke="#9ca3af" tick={{ fontSize: 11, fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                      <YAxis domain={['dataMin - 1', 'dataMax + 1']} hide={true} />
                      <Tooltip contentStyle={{ backgroundColor: '#111827', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                      <Line type="monotone" dataKey="rate" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#10B981' }} activeDot={{ r: 6 }} />
                   </LineChart>
                </ResponsiveContainer>
              </div>
            </div> 

            {/* Quick Transfer Widget */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-extrabold text-black mb-5">Quick Transfer</h3>
              <form onSubmit={handleTransfer}>
                <input
                  type="number"
                  required
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  placeholder="Enter Amount (Rs.)"
                  className="w-full bg-[#f4f4f5] border-none text-black font-bold rounded-xl px-5 py-4 mb-4 focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-400 transition-all"
                />
                <button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-xl font-extrabold tracking-wide transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex justify-center items-center gap-2"
                >
                  Send Money <span className="text-lg">→</span>
                </button>
              </form>
            </div>
          </div>

          {/* ---------------- RIGHT COLUMN ---------------- */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { label: 'Total Balance', value: balance, color: 'bg-black' },
                { label: 'Total Income', value: totalIncome, color: 'bg-gray-400' },
                { label: 'Total Expense', value: totalExpense, color: 'bg-gray-200' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-2 h-6 rounded-full ${stat.color}`}></div>
                    <span className="text-gray-500 font-bold text-sm uppercase tracking-wider">{stat.label}</span>
                  </div>
                  <div className="text-2xl font-black text-black">
                    Rs. {parseFloat(stat.value).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Bar Chart */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="text-gray-500 text-sm font-bold uppercase tracking-wider">Balance growth this year</div>
                  <div className="text-3xl font-black text-black mt-1 transition-all duration-500">
                    Rs {parseFloat(balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl shadow-inner">
                  📈
                </div>
              </div>

              <div className="grid grid-cols-7 gap-4 h-48 items-end pb-2">
                {monthlyGrowthData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center h-full justify-end group cursor-pointer">
                    <div className="w-full max-w-[40px] bg-[#f4f4f5] rounded-full relative h-full flex items-end p-1 transition-all">
                      <div 
                        className="w-full bg-gradient-to-t from-black to-gray-500 rounded-full transition-all duration-700 ease-out group-hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] group-hover:opacity-80"
                        style={{ height: item.height }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-gray-400 mt-4 uppercase">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Spending - Advanced Area Chart */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
              <h3 className="text-xl font-extrabold text-black mb-6">Weekly Spending Activity</h3>
              <div className="w-full h-[250px]">
                <ResponsiveContainer height="100%" width="100%">
                  <AreaChart data={lineGraphData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#111827" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#111827" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#f3f4f6" strokeDasharray="3 3" vertical={false}/>
                    <XAxis dataKey="name" stroke="#9ca3af" tick={{fontWeight: 'bold', fontSize: 12}} axisLine={false} tickLine={false}/>
                    <YAxis stroke="#9ca3af" tick={{fontWeight: 'bold', fontSize: 12}} axisLine={false} tickLine={false}/>
                    <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#111827', borderRadius: '16px', color: '#fff', fontWeight: 'bold' }} itemStyle={{ color: '#fff' }}/>
                    <Area type="monotone" dataKey="amount" stroke="#111827" strokeWidth={4} fillOpacity={1} fill="url(#colorAmount)" activeDot={{ r: 8, stroke: '#fff', strokeWidth: 3, fill: '#111827' }}/>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bottom Row - Pie Chart & Transactions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                <h3 className="text-xl font-extrabold text-black mb-4">Cash Flow Analysis</h3>
                <div className="w-full h-[250px] mt-4">
                  <ResponsiveContainer height="100%" width="100%">
                    <PieChart>
                      <Pie data={chartData} cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={8} dataKey="value" stroke="none" cornerRadius={8}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} className="hover:opacity-80 transition-opacity duration-300 cursor-pointer"/>
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#111827', borderRadius: '12px', color: '#fff', fontWeight: 'bold' }} formatter={(value) => `Rs. ${value.toLocaleString()}`}/>
                      <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontWeight: 'bold' }}/>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[340px]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-extrabold text-black">Recent Transactions</h3>
                </div>
                <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex justify-between items-center p-3 hover:bg-[#f4f4f5] rounded-2xl transition-colors duration-300 group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#f4f4f5] text-black group-hover:bg-white group-hover:shadow-sm transition-all flex items-center justify-center text-xl shadow-inner">
                          {tx.icon}
                        </div>
                        <div>
                          <div className="font-bold text-black">{tx.title}</div>
                          <div className="text-xs font-semibold text-gray-400 mt-0.5">{tx.date}</div>
                        </div>
                      </div>
                      <div className={`font-extrabold ${tx.type === 'income' ? 'text-black' : 'text-gray-500'}`}>
                        {tx.amount > 0 ? '+' : ''} Rs. {Math.abs(tx.amount).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #d1d5db; }
      `}} />
    </div>
  );
}