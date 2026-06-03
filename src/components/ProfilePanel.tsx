import React, { useState, useRef } from 'react';
import { 
  User, 
  Phone, 
  Wallet, 
  Plus, 
  BookOpen, 
  HelpCircle, 
  LogOut, 
  ShieldCheck, 
  Star,
  Camera,
  Edit2,
  Check
} from 'lucide-react';

interface ProfilePanelProps {
  user: {
    name: string;
    phone: string;
    walletBalance: number;
    avatar: string;
  };
  onUpdateProfile?: (name: string, avatar: string) => void;
  onUpdateWallet: (newBalance: number) => void;
  onLogout: () => void;
}

export const ProfilePanel: React.FC<ProfilePanelProps> = ({
  user,
  onUpdateProfile,
  onUpdateWallet,
  onLogout
}) => {
  const [rechargeAmount, setRechargeAmount] = useState('200');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [typedName, setTypedName] = useState(user.name);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRecharge = (amount: number) => {
    if (!amount || amount <= 0) return;
    const nextBal = user.walletBalance + amount;
    onUpdateWallet(nextBal);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 2500);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdateProfile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onUpdateProfile(user.name, reader.result);
          alert('প্রোফাইল ছবি গ্যালারি থেকে সফলভাবে সেট করা হয়েছে!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveName = () => {
    if (typedName.trim() && onUpdateProfile) {
      onUpdateProfile(typedName.trim(), user.avatar);
      setIsEditing(false);
      alert('প্রোফাইল নাম সফলভাবে পরিবর্তন করা হয়েছে!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Visual Header Profile badge info */}
      <div className="bg-white rounded-3xl border border-slate-150 p-6 shadow-sm flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
        
        {/* Background ambient accents */}
        <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-50 rounded-full blur-2xl opacity-60"></div>
        
        {/* Hidden File Picker Input for Gallery */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageFileChange} 
          className="hidden" 
          accept="image/*" 
        />

        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-24 h-24 rounded-full object-cover border-4 border-emerald-500 shadow-lg group-hover:opacity-90 transition-all"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-200">
            <Camera size={18} className="animate-bounce" />
            <span className="text-[9px] font-bold mt-1">আপলোড করুন</span>
          </div>
          <span className="absolute bottom-1 right-2 w-6 h-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full border-2 border-white flex items-center justify-center shadow-lg transition-all">
            <Camera size={10} />
          </span>
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-2 justify-center md:justify-start">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={typedName}
                  onChange={(e) => setTypedName(e.target.value)}
                  className="bg-slate-50 border border-slate-250 focus:border-emerald-500 rounded-xl px-3 py-1 text-sm font-bold text-slate-800 focus:outline-none"
                  placeholder="আপনার নাম লিখুন..."
                />
                <button
                  onClick={handleSaveName}
                  className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                  title="সেভ করুন"
                >
                  <Check size={14} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-slate-800 text-lg">{user.name}</h4>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-slate-400 hover:text-emerald-600 transition-colors"
                  title="নাম এডিট করুন"
                >
                  <Edit2 size={13} />
                </button>
              </div>
            )}
            <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px] border border-emerald-150 flex items-center gap-0.5">
              <ShieldCheck size={11} /> ভেরিফাইড মেম্বার
            </span>
          </div>
          
          <p className="text-slate-400 text-xs font-semibold mt-1 flex items-center justify-center md:justify-start gap-1">
            <Phone size={13} /> {user.phone}
          </p>

          <p className="text-[10px] text-emerald-600 font-bold mt-1.5 cursor-pointer hover:underline" onClick={() => fileInputRef.current?.click()}>
            👉 গ্যালারি থেকে প্রোফাইল ছবি সেট করতে ছবির উপরে ক্লিক করুন
          </p>

          <div className="flex justify-center md:justify-start items-center gap-1 mt-2 text-amber-500 text-xs">
            <Star size={13} fill="currentColor" />
            <Star size={13} fill="currentColor" />
            <Star size={13} fill="currentColor" />
            <Star size={13} fill="currentColor" />
            <Star size={13} fill="currentColor" />
            <span className="text-slate-650 font-semibold ml-1">(৫.০ চালক ও যাত্রী রেটিং)</span>
          </div>
        </div>
      </div>

      {/* Interactive Wallet Balance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Wallet Credit status card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 shadow-lg flex flex-col justify-between min-h-48 relative overflow-hidden">
          {/* Card background glowing circular decoratives */}
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-emerald-500 rounded-full blur-3xl opacity-20"></div>

          <div className="flex justify-between items-start">
            <div className="p-3 bg-white/10 rounded-2xl">
              <Wallet size={20} className="text-emerald-400" />
            </div>
            <span className="text-[10px] bg-emerald-500/25 border border-emerald-400/30 font-bold text-emerald-300 px-3 py-1 rounded-full">
              মূল ক্রেডিট ওয়ালেট
            </span>
          </div>

          <div className="my-4">
            <span className="text-slate-300 text-[11px] block">বর্তমান ওয়ালেট ব্যালেন্স</span>
            <span className="text-3xl font-extrabold tracking-tight">৳ {user.walletBalance}</span>
          </div>

          <p className="text-[10px] text-slate-400">এই ক্রেডিট দিয়ে টিকিট ও রাইড বুকিং চার্জ করা যাবে।</p>
        </div>

        {/* Dynamic Refill Recharge box */}
        <div className="bg-white rounded-3xl border border-slate-150 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h5 className="font-extrabold text-slate-800 text-sm">ওয়ালেটে ব্যালেন্স রিচার্জ করুন</h5>
            <p className="text-slate-400 text-[10px] mt-0.5">বিকাশ/নগদ এর মাধ্যমে ইনস্ট্যান্ট ব্যালেন্স লোড করুন</p>
          </div>

          {isSuccess && (
            <div className="bg-emerald-50 text-emerald-800 font-bold text-[11px] rounded-xl p-2.5 text-center mt-2 border border-emerald-200">
              🎉 রিচার্জ সফল হয়েছে! মানি এডেড।
            </div>
          )}

          <div className="my-3 flex gap-2">
            {['১০০', '২০০', '৫০০', '১০০০'].map((amount) => (
              <button
                key={amount}
                onClick={() => setRechargeAmount(amount)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border ${
                  rechargeAmount === amount
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow shadow-emerald-200'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                ৳ {amount}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              value={rechargeAmount}
              onChange={(e) => setRechargeAmount(e.target.value)}
              placeholder="আলাদা এমাউন্ট লিখুন"
              className="flex-1 bg-slate-50 border border-slate-200 hover:border-slate-350 focus:border-emerald-500 focus:bg-white rounded-xl px-3 text-xs font-bold text-slate-800 focus:outline-none"
            />
            <button
              onClick={() => handleRecharge(parseInt(rechargeAmount) || 0)}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow transition-all flex items-center gap-1"
            >
              <Plus size={15} /> টাকা অ্যাড করুন
            </button>
          </div>
        </div>

      </div>

      {/* Support & legal contacts list */}
      <div className="bg-white rounded-3xl border border-slate-150 p-5 space-y-4 shadow-sm">
        <h5 className="font-extrabold text-slate-800 text-sm">সহায়তা এবং নীতিসমূহ</h5>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <a
            href="#faq"
            onClick={(e) => { e.preventDefault(); alert('হেল্প সেন্টার খোলার জন্য দয়া করে কল করুন ০১৭৯৯৯৯-৮৮৮৮ এ।'); }}
            className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl hover:bg-emerald-50/50 border border-slate-100 transition-colors"
          >
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <BookOpen size={14} />
            </div>
            <div>
              <strong className="text-slate-800 block text-[11px]">ব্যবহার নির্দেশিকা</strong>
              <span className="text-[10px] text-slate-400">কিভাবে টিকিট বুক বা রাইড পোস্ট করবেন</span>
            </div>
          </a>

          <a
            href="#support"
            onClick={(e) => { e.preventDefault(); alert('কাস্টমার সাপোর্ট এজেন্ট ২৪/৭ লাইভ আছে! কল করুন: ০১৭০০০০০৭১১'); }}
            className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl hover:bg-emerald-50/50 border border-slate-100 transition-colors"
          >
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <HelpCircle size={14} />
            </div>
            <div>
              <strong className="text-slate-800 block text-[11px]">জরুরি কাস্টমার সাপোর্ট</strong>
              <span className="text-[10px] text-slate-400">যেকোনো তথ্যে সরাসরি কল দিন</span>
            </div>
          </a>
        </div>
      </div>

      {/* Logout Row */}
      <div className="pt-2 text-center">
        <button
          onClick={onLogout}
          className="mx-auto flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-extrabold text-xs px-5 py-3 rounded-2xl border border-red-200 transition-all shadow-sm"
        >
          <LogOut size={14} /> একাউন্ট থেকে লগ আউট করুন
        </button>
      </div>

    </div>
  );
};
