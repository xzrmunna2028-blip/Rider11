import React, { useState } from 'react';
import { 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle 
} from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (name: string, phone: string) => void;
  onNavigateToSignup: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ 
  onLoginSuccess, 
  onNavigateToSignup 
}) => {
  const [phone, setPhone] = useState('01712345678'); // Loaded with user's demo phone
  const [password, setPassword] = useState('123456'); // Loaded with demo password
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.replace(/\D/g, '').trim()) {
      setErrorMsg('মোবাইল নাম্বার দিন।');
      return;
    }
    if (password.length < 4) {
      setErrorMsg('পাসওয়ার্ডটি সঠিক নয় বা খুব ছোট।');
      return;
    }

    // Success action
    setErrorMsg('');
    // Automatically match names or give demo name
    let name = 'তৌফিক হাসান';
    if (phone === '01712345678') name = 'তৌফিক হাসান';
    else if (phone === '01912345678') name = 'আবিদ হাসান';
    else name = 'সম্মানিত ইউজার';

    onLoginSuccess(name, phone);
  };

  const handleDemoCredentials = () => {
    setPhone('01712345678');
    setPassword('123456');
    setToastMessage('ডেমো তথ্য পূরন করা হয়েছে!');
    setTimeout(() => setToastMessage(''), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col">
        {/* Customized Elegant Header */}
        <div className="px-6 pt-6 pb-2 text-center border-b border-slate-100 bg-slate-50/50">
          <span className="text-emerald-700 font-extrabold text-sm tracking-tight block">
            পাইকগাছা কপিলমুনি খুলনা ঢাকা রাইড
          </span>
        </div>

        <div className="p-6 flex-1 overflow-y-auto max-h-[85vh]">
          {/* Main Titles */}
          <div className="text-center mb-5">
            <h2 className="text-2xl font-bold text-slate-800">স্বাগতম</h2>
            <p className="text-slate-500 text-xs mt-1">আপনার যাত্রা শুরু করুন</p>
          </div>

          {/* Aesthetic Car Illustration with skyline background */}
          <div className="flex justify-center mb-6 relative">
            <div className="relative w-48 h-24 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl flex items-center justify-center overflow-hidden">
              {/* Skyline background outline columns */}
              <div className="absolute bottom-2 left-0 right-0 h-8 flex items-end justify-around opacity-20">
                <div className="w-3 h-8 bg-emerald-800 rounded-t-sm"></div>
                <div className="w-4 h-12 bg-emerald-800 rounded-t-sm"></div>
                <div className="w-2 h-6 bg-emerald-800 rounded-t-sm"></div>
                <div className="w-5 h-10 bg-emerald-800 rounded-t-sm"></div>
              </div>
              
              {/* Green Pin animated bounce */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center shadow-md">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="w-2 h-2 bg-emerald-600 rotate-45 mx-auto -mt-1.5"></div>
              </div>

              {/* Vector Green Car SVG matching actual picture exactly */}
              <svg className="w-24 h-12 text-emerald-600 relative z-10 mt-4" viewBox="0 0 100 50" fill="currentColor">
                <path d="M15 25 L85 25 C90 25 93 28 93 32 L93 42 C93 44 91 46 89 46 L11 46 C9 46 7 44 7 42 L7 32 C7 28 10 25 15 25 Z" />
                <path d="M22 25 L32 10 L68 10 L78 25 Z" fill="#ffffff" opacity="0.8" />
                <circle cx="28" cy="45" r="7" fill="#1e293b" />
                <circle cx="28" cy="45" r="3" fill="#ffffff" />
                <circle cx="72" cy="45" r="7" fill="#1e293b" />
                <circle cx="72" cy="45" r="3" fill="#ffffff" />
              </svg>
            </div>
          </div>

          {errorMsg && (
            <div className="mb-4 bg-red-50 text-red-600 text-xs px-3 py-2 rounded-xl text-center border border-red-150 font-medium">
              {errorMsg}
            </div>
          )}

          {toastMessage && (
            <div className="mb-4 bg-emerald-50 text-emerald-700 text-xs px-3 py-2 rounded-xl text-center border border-emerald-150 font-bold">
              {toastMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Phone input with validation icon */}
            <div>
              <label className="block text-slate-700 text-xs font-semibold mb-1">মোবাইল নাম্বার</label>
              <div className="relative flex">
                <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-l-2xl px-3 text-xs font-bold text-slate-600 select-none">
                  <span>+৮৮০</span>
                </div>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Phone size={18} />
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="আপনার মোবাইল নাম্বার দিন"
                    maxLength={11}
                    className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border-t border-b border-r border-slate-200 rounded-r-2xl focus:outline-none focus:border-emerald-500 focus:bg-white text-slate-800 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Password input with eye toggle right */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-slate-700 text-xs font-semibold">পাসওয়ার্ড</label>
                <button 
                  type="button"
                  onClick={() => {
                    setToastMessage('পাসওয়ার্ড রিস্টোর করতে এডমিন বা কল করুন!');
                    setTimeout(() => setToastMessage(''), 2500);
                  }}
                  className="text-emerald-700 hover:underline text-xs font-bold"
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="আপনার পাসওয়ার্ড দিন"
                  className="w-full pl-10 pr-10 py-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white text-slate-800 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Quick Demo Helper Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleDemoCredentials}
                className="text-[11px] text-slate-500 hover:text-emerald-600 bg-slate-100 hover:bg-emerald-50 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 border border-slate-200 font-semibold"
              >
                <AlertCircle size={12} /> ডেমো লগইন ডাটা দিন
              </button>
            </div>

            {/* Login Action Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-100 transition-all text-sm mt-4 flex items-center justify-center gap-2"
            >
              লগইন
            </button>
          </form>

          {/* Social connections */}
          <div className="my-6">
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-150"></div>
              <span className="flex-shrink mx-4 text-slate-400 text-xs font-medium">অথবা লগইন করুন</span>
              <div className="flex-grow border-t border-slate-150"></div>
            </div>

            <div className="flex justify-center gap-4 mt-3">
              <button 
                onClick={() => onLoginSuccess('গুগল ডেমো ইউজার', '01700112233')}
                className="w-11 h-11 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm"
              >
                <span className="font-extrabold text-blue-600 text-base">G</span>
              </button>
              <button 
                onClick={() => onLoginSuccess('ফেসবুক ডেমো ইউজার', '01800112233')}
                className="w-11 h-11 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm"
              >
                <span className="font-extrabold text-blue-800 text-base">f</span>
              </button>
            </div>
          </div>

          {/* Footer navigator */}
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={onNavigateToSignup}
              className="text-slate-500 hover:text-emerald-600 text-xs font-semibold transition-colors"
            >
              একাউন্ট নেই? <span className="text-emerald-600 font-bold underline">সাইন আপ করুন</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
