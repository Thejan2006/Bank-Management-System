"use client";
import React from 'react';
import { FaGoogle, FaGithub, FaFacebookF } from "react-icons/fa";
export default function LoginUI({
  isLogin,
  setIsLogin,
  username,
  setUsername,
  password,
  setPassword,
  email,
  setEmail,
  handleSubmit
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="flex w-full max-w-6xl bg-white rounded-4xl shadow-2xl overflow-hidden min-h-150">
        
        {/* ---------------- LEFT SIDE: FORM ---------------- */}
        <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          
          {/*  1. IMAGE PLACEHOLDER: LOGO */}
          <div className="mb-8">
            <img src="/logo.png" alt="Logo" className="w-16 h-16" />
            <div className="flex items-center gap-2 font-bold text-xl tracking-wide">
              <span className="text-3xl"></span>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {isLogin ? 'Sign in' : 'Sign up'}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            {/* Username / Name Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                {isLogin ? 'Username' : 'Full Name'}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder={isLogin ? "Enter your username" : "John Doe"}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              />
            </div>

            
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="johndoe@gmail.com"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                />
              </div>
            )}

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                {isLogin ? 'Password' : 'Create Password (PIN)'}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              />
            </div>

            {/* Remember me & Forgot Password */}
            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer text-gray-700 font-medium">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900" />
                  Remember me
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-2 bg-[#18181b] text-white font-semibold py-3.5 rounded-xl hover:bg-black transition-colors shadow-lg"
            >
              {isLogin ? 'Sign in' : 'Create Account'}
            </button>
          </form>

          {/* Toggle Login/Register */}
          <div className="mt-6 text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} className="font-bold text-gray-900 hover:underline">
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
            {isLogin && <p className="mt-2 text-gray-500 cursor-pointer hover:text-gray-900">Forgot Password</p>}
          </div>

          {/* Social Logins */}
          <div className="mt-8 flex gap-4">
            
            
                      <button className="flex items-center justify-center p-3 bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100 transition">
                          <FaGoogle className="w-5 h-5 text-gray-700" />
                      </button>
                      <button className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100 transition">
                          <FaGithub className="w-5 h-5 text-gray-700" />
                          <span className="text-sm font-medium text-gray-700">GitHub</span>
                      </button>
                      <button className="flex items-center justify-center p-3 bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100 transition">
                          <FaFacebookF className="w-5 h-5 text-blue-600" />
                      </button>
          </div>
        </div>

        {/* ---------------- RIGHT SIDE: DARK THEME VISUALS ---------------- */}
        <div className="hidden lg:flex w-1/2 bg-[#0a0a0a] relative p-12 flex-col justify-center overflow-hidden">
          
          
          <img src="https://images.unsplash.com/photo-1640595969602-a683e6a92ec4?q=80&w=678&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Background" className="absolute inset-0 w-full h-full object-cover opacity-50" /> 

          <div className="relative z-10 text-white">
            <h3 className="text-xl font-semibold mb-4 text-gray-300">Arcana</h3>
            <h1 className="text-5xl font-bold mb-6 leading-tight">Welcome to Arcana</h1>
            <p className="text-amber-50 max-w-md mb-12 leading-relaxed ">
              <span className="text-amber-50 font-bold block">Arcana Your digital fortress for a secure future</span> 
              The protective shield encircling the logo guarantees top-tier security for customer assets and data. The harmonious blend of deep and electric blue signifies the union of traditional trust and cutting-edge technology
              <br/><br/>
              More than 17k people joined us, it's your turn.
            </p>

            {/* Floating Card Design */}
            
            <div className="bg-[#27272a] p-6 rounded-2xl max-w-sm border border-gray-700 shadow-2xl relative">
              <h4 className="text-lg font-bold mb-2">Create your account and find the right safe</h4>
              <p className="text-sm text-gray-400 mb-4">underscore financial stability and value. Arcana is where timeless trust meets tomorrow's digital security.</p>
              
              
                          <div className="flex -space-x-3">
                              {/* Image 1 */}
                              <img
                                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
                                  alt="User 1"
                                  className="w-8 h-8 rounded-full object-cover border-2 border-[#27272a]"
                              />

                              {/* Image 2 */}
                              <img
                                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
                                  alt="User 2"
                                  className="w-8 h-8 rounded-full object-cover border-2 border-[#27272a]"
                              />

                              {/* Image 3 */}
                              <img
                                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
                                  alt="User 3"
                                  className="w-8 h-8 rounded-full object-cover border-2 border-[#27272a]"
                              />

                              {/* +2 Count Badge */}
                              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-700 text-xs font-medium text-white border-2 border-[#27272a]">
                                  +2
                              </div>
                          </div>
            </div>
          </div>
          
          {/* Decorative Lines/Shapes from Figma can go here */}
          <div className="absolute top-0 right-0 w-64 h-full bg-linear-to-l from-white/10 to-transparent transform skew-x-12 translate-x-32"></div>
        </div>

      </div>
    </div>
  );
}