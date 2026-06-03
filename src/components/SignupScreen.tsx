import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  ChevronLeft 
} from 'lucide-react';

interface SignupScreenProps {
  onBackToLogin: () => void;
  onSignupSuccess: (name: string, phone: string) => void;
}

export const SignupScreen: React.FC<SignupScreenProps> = ({ 
  onBackToLogin, 
  onSignupSuccess 
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('দয়া করে আপনার নাম লিখুন।');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setErrorMsg('সঠিক ১১ ডিজিটের মোবাইল নাম্বার দিন।');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('পাসওয়ার্ড কমপক্ষে ৬ ডিজিটের হতে হবে।');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('পাসওয়ার্ড দুটি মেলেনি।');
      return;
    }
    if (!agree) {
      setErrorMsg('শর্তাবলী এবং গোপনীয়তা নীতিমালায় সম্মতি দিন।');
      return;
    }

    // Success
    setErrorMsg('');
    onSignupSuccess(name, phone);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col">
        {/* Customized Elegant Header */}
        <div className="px-6 pt-6 pb-2 flex items-center justify-between border-b border-slate-100">
          <button 
            onClick={onBackToLogin}
            className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600"
            aria-label="Back"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="flex-1 text-center mr-6">
            <span className="text-emerald-700 font-bold text-sm tracking-tight block">
              পাইকগাছা কপিলমুনি খুলনা ঢাকা রাইড
            </span>
          </div>
        </div>

        <div className="p-6 flex-1 overflow-y-auto max-h-[85vh]">
          {/* Sign Up titles */}
          <div className="text-center mb-5">
            <h2 className="text-2xl font-bold text-slate-800">নতুন একাউন্ট তৈরি করুন</h2>
            <p className="text-slate-500 text-xs mt-1">কিছু তথ্য দিন এবং আপনার একাউন্ট তৈরি করুন</p>
          </div>

          {/* Aesthetic Car/Skyline Illustration */}
          <div className="flex justify-center mb-6 relative">
            <div className="relative w-48 h-24 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl flex items-center justify-center overflow-hidden">
              {/* Skyline Background lines */}
              <div className="absolute bottom-2 left-0 right-0 h-8 flex items-end justify-around opacity-20">
                <div className="w-3 h-8 bg-emerald-800 rounded-t-sm"></div>
                <div className="w-4 h-12 bg-emerald-800 rounded-t-sm"></div>
                <div className="w-2 h-6 bg-emerald-800 rounded-t-sm"></div>
                <div className="w-5 h-10 bg-emerald-800 rounded-t-sm"></div>
              </div>
              
              {/* Green Map Pin floating */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center shadow-md">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="w-2 h-2 bg-emerald-600 rotate-45 mx-auto -mt-1.5"></div>
              </div>

              {/* Vector Green Car */}
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
            <div className="mb-4 bg-red-50 text-red-600 text-xs px-3 py-2 rounded-xl text-center border border-red-100 font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-slate-700 text-xs font-semibold mb-1">পুরো নাম লিখুন</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="আপনার পুরো নাম লিখুন"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white text-slate-800 transition-all font-medium"
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-slate-700 text-xs font-semibold mb-1">মোবাইল নাম্বার দিন</label>
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
                    placeholder="মোবাইল নাম্বার দিন"
                    maxLength={11}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border-t border-b border-r border-slate-200 rounded-r-2xl focus:outline-none focus:border-emerald-500 focus:bg-white text-slate-800 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-slate-700 text-xs font-semibold mb-1">পাসওয়ার্ড দিন</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="পাসওয়ার্ড দিন"
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white text-slate-800 transition-all font-medium"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-slate-700 text-xs font-semibold mb-1">পাসওয়ার্ড নিশ্চিত করুন</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock size={18} />
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white text-slate-800 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Accord Terms Checkbox */}
            <div className="flex items-center gap-2 py-1">
              <input
                id="agree-checkbox"
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
                className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
              />
              <label htmlFor="agree-checkbox" className="text-slate-500 text-xs select-none">
                আমি <span className="text-emerald-700 font-semibold cursor-pointer">শর্তাবলী</span> এবং <span className="text-emerald-700 font-semibold cursor-pointer">গোপনীয়তা নীতিমালা</span> একমত।
              </label>
            </div>

            {/* Sign up Primary Button */}
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-100 transition-all text-sm mt-2 flex items-center justify-center gap-2"
            >
              সাইন আপ
            </button>
          </form>

          {/* Social Sign up */}
          <div className="my-6">
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-150"></div>
              <span className="flex-shrink mx-4 text-slate-400 text-xs font-medium">অথবা সাইন আপ করুন</span>
              <div className="flex-grow border-t border-slate-150"></div>
            </div>

            <div className="flex justify-center gap-4 mt-3">
              <button 
                onClick={() => onSignupSuccess('গুগল ইউজার', '01700000000')}
                className="w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm"
              >
                <span className="font-extrabold text-blue-600 text-lg">G</span>
              </button>
              <button 
                onClick={() => onSignupSuccess('ফেসবুক ইউজার', '01800000000')}
                className="w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm"
              >
                <span className="font-extrabold text-blue-800 text-lg">f</span>
              </button>
            </div>
          </div>

          {/* Login navigation footer */}
          <div className="text-center mt-6">
            <button
              onClick={onBackToLogin}
              className="text-slate-500 hover:text-emerald-600 text-xs font-semibold transition-colors"
            >
              আগে থেকেই একাউন্ট আছে? <span className="text-emerald-600 font-bold underline">লগইন করুন</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
