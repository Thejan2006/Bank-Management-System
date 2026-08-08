'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DashboardUI({ name, balance, chartData, loading }) {
  const router = useRouter();

  const COLORS = ['#2dd4bf', '#f43f5e'];
  const totalIncome = chartData[0]?.value || 0;
  const totalExpense = chartData[1]?.value || 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-gray-800 pb-10">
      {/* ---------------- TOP NAVIGATION ---------------- */}
      <nav className="">
        <div className="flex items-center gap-10 pl-2">
          <div
            className="flex items-center gap-3 font-bold text-2xl text-gray-900 tracking-wide cursor-pointer"
            onClick={() => router.push("/dashboard")}
          >   
          </div>

          {/* Navbar Links with Routing  remove */}
          <div className="hidden md:flex items-center gap-6 font-semibold text-sm text-gray-400">
            <span
              onClick={() => router.push("/dashboard")}
              className="cursor-pointer transition pb-1 text-teal-500 border-b-2 border-teal-500"
            >
              
            </span>
            <span
              onClick={() => router.push("/transactions")}
              className="cursor-pointer transition pb-1 hover:text-gray-900"
            >
              
            </span>
            <span
              onClick={() => router.push("/profile")}
              className="cursor-pointer transition pb-1 hover:text-gray-900"
            >
              
            </span>
          </div>
        </div>

        <div className="flex items-center gap-5">
        </div>
      </nav>

      {/* ---------------- DASHBOARD OVERVIEW CONTENT ---------------- */}
      <div className="max-w-7xl mx-auto mt-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">My Cards</h3>
              </div>

              <div
                onClick={() => router.push("/cards")}
                className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-6 rounded-2xl text-white shadow-xl relative overflow-hidden h-48 flex flex-col justify-between transition transform hover:scale-105 duration-300 cursor-pointer"
              >
                <div className="flex justify-between items-center relative z-10">
                  <span className="font-semibold text-lg opacity-90">
                    ArcanaBank
                  </span>
                  <div className="w-10 h-7 bg-yellow-400/80 rounded-md"></div>
                </div>
                <div className="relative z-10 text-2xl font-mono tracking-widest mt-4">
                  **** **** **** 9102
                </div>
                <div className="flex justify-between items-end relative z-10">
                  <div>
                    <div className="text-xs text-gray-400">Card Holder</div>
                    <div className="font-semibold">{name}</div>
                  </div>
                  <div className="text-xl font-bold italic opacity-90">
                    VISA
                  </div>
                </div>
                <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
              </div>

              <div className="mt-6 border border-gray-100 p-4 rounded-2xl flex justify-between items-center bg-gray-50/50">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Your Balance</div>
                  <div className="text-2xl font-bold">
                    Rs.{" "}
                    {parseFloat(balance || 0).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">Status</div>
                  <div className="text-teal-500 font-semibold">Active</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-4">Quick Transfer</h3>
              <input
                type="text"
                placeholder="Card Number / Account"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <div className="flex gap-4">
                <button
                  onClick={() => router.push("/transfer")}
                  className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-semibold transition"
                >
                  Send Money
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-4 bg-teal-500 rounded-full"></div>
                  <span className="text-gray-500 font-medium">Balance</span>
                </div>
                <div className="text-2xl font-bold">
                  Rs. {parseFloat(balance || 0).toLocaleString()}
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-4 bg-green-400 rounded-full"></div>
                  <span className="text-gray-500 font-medium">Income</span>
                </div>
                <div className="text-2xl font-bold">
                  Rs. {totalIncome.toLocaleString()}
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-4 bg-red-400 rounded-full"></div>
                  <span className="text-gray-500 font-medium">Expense</span>
                </div>
                <div className="text-2xl font-bold">
                  Rs. {totalExpense.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-4">Cash Flow Analysis</h3>
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

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Recent Transactions</h3>
                </div>
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-xl">
                        🛒
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          Supermarket
                        </div>
                        <div className="text-xs text-gray-400">
                          Dec 19, 2021 at 09:33
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-gray-900">- Rs. 4,500</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">
                        🎬
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          Netflix Sub
                        </div>
                        <div className="text-xs text-gray-400">
                          Dec 18, 2021 at 14:20
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-gray-900">- Rs. 1,300</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl">
                        💼
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          Salary Deposit
                        </div>
                        <div className="text-xs text-gray-400">
                          Dec 15, 2021 at 10:00
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-teal-500">+ Rs. 85,000</div>
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