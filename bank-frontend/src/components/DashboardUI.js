'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';

export default function DashboardUI({ name, balance, chartData, loading }) {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const COLORS = ['#10b981', '#ef4444']; 
  const totalIncome = chartData[0]?.value || 0;
  const totalExpense = chartData[1]?.value || 0;

  const lineGraphData = [
    { name: 'Mon', amount: 20000 },
    { name: 'Tue', amount: 35000 },
    { name: 'Wed', amount: 28000 },
    { name: 'Thu', amount: 48000 },
    { name: 'Fri', amount: 42000 },
    { name: 'Sat', amount: 54420 },
  ];

  // Balance Growth / Monthly Spending Data matching your reference UI
  const monthlyGrowthData = [
    { month: 'Dec', height: '70%', amount: 'Rs 3,800' },
    { month: 'Jan', height: '65%', amount: 'Rs 3,500' },
    { month: 'Feb', height: '30%', amount: 'Rs 1,600' },
    { month: 'Mar', height: '32%', amount: 'Rs 1,750' },
    { month: 'Apr', height: '50%', amount: 'Rs 2,700' },
    { month: 'May', height: '90%', amount: 'Rs 4,800' },
    { month: 'Jun', height: '25%', amount: 'Rs 1,200' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9fafb]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] font-sans text-gray-900 pb-12 transition-colors duration-500">
      
      {/* ---------------- DASHBOARD CONTENT ---------------- */}
      <div className="max-w-7xl mx-auto pt-8 px-4">
        
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="text-gray-500 text-sm font-medium">Total balance:</div>
            <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mt-1">
              Rs {parseFloat(balance || 54420).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              <span className="ml-3 text-xs bg-green-600 text-white px-2.5 py-1 rounded-full">+22%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
          
          {/* Left Column */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">My Cards</h3>
              </div>

              {/* Arcana Interactive Card */}
              <div
                onClick={() => {
                  router.push("/cards");
                  setIsDarkMode(!isDarkMode);
                }}
                className="bg-gradient-to-br from-blue-300 via-blue-700 to-blue-500 p-6 rounded-2xl text-white shadow-xl relative overflow-hidden h-52 flex flex-col justify-between transition transform hover:scale-[1.02] duration-300 cursor-pointer group"
              >
                <div className="flex justify-between items-center relative z-10">
                  <span className="font-bold text-lg tracking-wider text-white">
                    Arcana
                  </span>
                  <div className="w-10 h-7 bg-amber-400 rounded-md"></div>
                </div>
                
                <div className="relative z-10 text-xl font-mono tracking-widest text-gray-300">
                  **** **** **** 9102
                </div>

                <div className="flex justify-between items-end relative z-10">
                  <div>
                    <div className="text-[10px] uppercase text-white tracking-wider">Card Holder</div>
                    <div className="font-semibold text-sm">{name}</div>
                  </div>
                  <div className="text-xl font-bold italic tracking-tighter text-blue-950">
                    VISA
                  </div>
                </div>
                <div className="absolute top-[-30px] right-[-30px] w-28 h-28 bg-gray-600/30 rounded-full blur-2xl group-hover:bg-gray-500/50 transition-all"></div>
              </div>

              {/* Status & Balance Info Box */}
              <div className="mt-6 border border-gray-200 p-4 rounded-2xl flex justify-between items-center bg-gray-50">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Your Balance</div>
                  <div className="text-xl font-bold text-gray-900">
                    Rs. {parseFloat(balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 mb-1">Status</div>
                  <div className="text-green-600 font-semibold text-sm">Active</div>
                </div>
              </div>
            </div>

            {/* Currency Rates Widget */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Currency Exchange</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">$</span>
                    <span className="font-medium text-gray-700">EUR / LKR</span>
                  </div>
                  <div className="font-bold text-gray-900">Rs. 348.50</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">¥</span>
                    <span className="font-medium text-gray-700">JPY / LKR</span>
                  </div>
                  <div className="font-bold text-gray-900">Rs. 2.15</div>
                </div>
              </div>
            </div>

            {/* Quick Transfer */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Transfer</h3>
              <input
                type="text"
                placeholder="Card Number / Account"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                onClick={() => router.push("/transfer")}
                className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-xl font-semibold transition shadow-md"
              >
                Send Money
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-green-500 font-medium text-sm">Balance</span>
                </div>
                <div className="text-xl font-bold text-gray-900">
                  Rs. {parseFloat(balance || 0).toLocaleString()}
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-4 bg-gray-700 rounded-full"></div>
                  <span className="text-gray-500 font-medium text-sm">Income</span>
                </div>
                <div className="text-xl font-bold text-gray-900">
                  Rs. {totalIncome.toLocaleString()}
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-red-500 font-medium text-sm">Expense</span>
                </div>
                <div className="text-xl font-bold text-gray-900">
                  Rs. {totalExpense.toLocaleString()}
                </div>
              </div>
            </div>

            {/* BALANCE GROWTH THIS YEAR - CUSTOM PILL BAR CHART CARD */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-green-600 text-sm font-medium">Balance growth this year</div>
                  <div className="text-3xl font-extrabold text-gray-900 mt-1">Rs {parseFloat(balance || 54420).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                  
                </div>
                
                  <span className="text-gray-600 text-4xl  font-bold">💳</span>
                
              </div>

              {/* Vertical Bars Container */}
              <div className="grid grid-cols-7 gap-3 h-48 items-end pt-4 pb-2">
                {monthlyGrowthData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center h-full justify-end group">
                    <div className="w-full bg-gray-100 rounded-full relative h-full flex items-end p-1">
                      <div 
                        className="w-full bg-gradient-to-t from-gray-700 via-gray-800 to-gray-900 rounded-full transition-all duration-500 group-hover:brightness-110"
                        style={{ height: item.height }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-gray-500 mt-3">{item.month}</span>
                  </div>
                ))}
              </div>

              {/* Footer Badges */}
              <div className="flex flex-wrap justify-between items-center mt-6 pt-4 border-t border-gray-100 gap-3">
                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold">
                  <span>↗</span> +18.6% <span className="text-gray-500 font-normal ml-1">vs last year</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 border border-gray-100">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px]">★</span>
                  Best month: <span className="font-bold text-gray-900">May</span>
                </div>
              </div>
            </div>

            {/* Weekly Activity Graph Section */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-black mb-4">Weekly Spending Activity</h3>
              <div className="w-full h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineGraphData}>
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb', borderRadius: '12px', color: '#111827' }} />
                    <Line type="monotone" dataKey="amount" stroke="#111827" strokeWidth={3} dot={{ fill: '#111827' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Cash Flow Analysis */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Cash Flow Analysis</h3>
                {totalIncome === 0 && totalExpense === 0 ? (
                  <p className="text-center text-gray-400 mt-20">
                    No transaction data available.
                  </p>
                ) : (
                  <div className="w-full h-[250px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={65}
                          outerRadius={85}
                          paddingAngle={8}
                          dataKey="value"
                          stroke="none"
                          cornerRadius={4}
                        >
                          {chartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb', borderRadius: '12px', color: '#111827' }}
                          formatter={(value) => `Rs. ${value.toLocaleString()}`}
                        />
                        <Legend
                          verticalAlign="bottom"
                          height={36}
                          iconType="circle"
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              {/* Recent Transactions */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Recent Transactions</h3>
                </div>
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center text-xl">
                        🛒
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Supermarket</div>
                        <div className="text-xs text-gray-400">Dec 19, 2021 at 09:33</div>
                      </div>
                    </div>
                    <div className="font-bold text-red-500">- Rs. 4,500</div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center text-xl">
                        🎬
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Netflix Sub</div>
                        <div className="text-xs text-gray-400">Dec 18, 2021 at 14:20</div>
                      </div>
                    </div>
                    <div className="font-bold text-red-500">- Rs. 1,300</div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center text-xl">
                        💼
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Salary Deposit</div>
                        <div className="text-xs text-gray-400">Dec 15, 2021 at 10:00</div>
                      </div>
                    </div>
                    <div className="font-bold text-green-500">+ Rs. 85,000</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}