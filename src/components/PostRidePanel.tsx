import React, { useState, useRef } from 'react';
import { 
  Truck, 
  Navigation, 
  DollarSign, 
  Users, 
  Calendar, 
  Sparkles, 
  Camera, 
  Sun, 
  Moon,
  Info
} from 'lucide-react';
import { VehicleCategory, RidePost, LOCATIONS } from '../types';

interface PostRidePanelProps {
  onPostCreated: (newRide: RidePost) => void;
  userPhone: string;
  userName: string;
}

export const PostRidePanel: React.FC<PostRidePanelProps> = ({
  onPostCreated,
  userPhone,
  userName
}) => {
  const [fromLoc, setFromLoc] = useState('কপিলমুনি');
  const [toLoc, setToLoc] = useState('ঢাকা');
  const [category, setCategory] = useState<VehicleCategory>('Car');
  const [price, setPrice] = useState('250');
  const [seats, setSeats] = useState('4');
  
  // Morning (সকাল) or Evening (বিকাল)
  const [shift, setShift] = useState<'Morning' | 'Evening'>('Morning');
  const [customTime, setCustomTime] = useState('১০:৩০ AM');
  
  const [tagline, setTagline] = useState('');
  const [driverPhone, setDriverPhone] = useState(userPhone || '01712345678');
  const [driverName, setDriverName] = useState(userName || 'সম্মানিত চালক');
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Custom driver photo state (Default placeholder, or Base64 updated image)
  const [driverAvatar, setDriverAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setDriverAvatar(reader.result);
          alert('চালকের ছবি গ্যালারি থেকে সফলভাবে লোড হয়েছে!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShiftSelect = (selectedShift: 'Morning' | 'Evening') => {
    setShift(selectedShift);
    if (selectedShift === 'Morning') {
      setCustomTime('১০:৩০ AM');
    } else {
      setCustomTime('০৪:৩০ PM');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fromLoc === toLoc) {
      alert('যাত্রার প্রথম স্থান এবং গন্তব্য স্থান একই হতে পারবে না!');
      return;
    }

    const priceNum = parseInt(price) || 0;
    const seatsNum = parseInt(seats) || 1;
    const finalTime = `আজ, ${shift === 'Morning' ? 'সকাল' : 'বিকাল'} ${customTime}`;

    const newRide: RidePost = {
      id: `ride-${Date.now()}`,
      driver: {
        id: `d-${Date.now()}`,
        name: driverName.trim() || 'সম্মানিত চালক',
        avatar: driverAvatar,
        rating: 4.8,
        phone: driverPhone
      },
      from: fromLoc,
      to: toLoc,
      price: priceNum,
      time: finalTime,
      category: category,
      seatsTotal: seatsNum,
      seatsAvailable: seatsNum,
      tagline: tagline.trim() || 'নিরাপদ এবং আনন্দদায়ক যাতায়াত করুন সাশ্রয়ী খরচে।',
      phone: driverPhone
    };

    onPostCreated(newRide);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };

  const vehicleDetails: { value: VehicleCategory; label: string; icon: string }[] = [
    { value: 'Car', label: 'প্রাইভেট কার', icon: '🚗' },
    { value: 'Bike', label: 'বাইক', icon: '🏍️' },
    { value: 'CNG', label: 'সিএনজি', icon: '🛺' },
    { value: 'Micro', label: 'মাইক্রোবাস', icon: '🚐' },
    { value: 'Pickup', label: 'পিকআপ ভ্যান', icon: '🛻' }
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-150 shadow-sm p-6 max-w-xl mx-auto space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-extrabold text-slate-800">কপিলমুনি রাইড • নতুন পোস্ট</h3>
        <p className="text-slate-400 text-xs mt-1">বাংলাদেশের যেকোনো জেলা বা থানায় যাতায়াত পোস্ট তৈরি করুন</p>
      </div>

      {isSuccess && (
        <div className="bg-gradient-to-r from-emerald-600 to-green-500 text-white rounded-2xl p-4 text-center shadow-lg transition-all font-bold text-xs">
          🎉 অভিনন্দন! আপনার রাইডটি সফলভাবে কপিলমুনি রাইড নেটওয়ার্কে লাইভ হয়েছে।
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* 1. Driver Photo Upload & Identity Details */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-4">
          <label className="block text-slate-800 text-xs font-bold">১. চালক প্রোফাইল ও গ্যালারি ফটো</label>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Gallery Uploader Preview */}
            <div 
              className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-emerald-500 cursor-pointer shadow-md group hover:opacity-90 transition-all"
              onClick={() => fileInputRef.current?.click()}
            >
              <img 
                src={driverAvatar} 
                alt="Driver profile preview" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                <Camera size={16} className="text-white" />
              </div>
            </div>

            {/* Upload Button Details */}
            <div className="flex-1 space-y-2 w-full">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*" 
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-350 text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
              >
                <Camera size={14} className="text-emerald-600" /> গ্যালারি থেকে ছবি সিলেক্ট করুন
              </button>
              <p className="text-[10px] text-slate-400">আপনার মোবাইল গ্যালারি অথবা ক্যামেরা থেকে সরাসরি আসল ছবি যুক্ত করুন।</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-slate-650 text-[11px] font-bold mb-1">চালকের নাম</label>
              <input
                type="text"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                placeholder="যেমন: শফিকুল ইসলাম"
                className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-slate-650 text-[11px] font-bold mb-1">মোবাইল নাম্বার</label>
              <input
                type="tel"
                value={driverPhone}
                onChange={(e) => setDriverPhone(e.target.value)}
                placeholder="যেমন: ০১৭১২XXXXXX"
                className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none"
                required
              />
            </div>
          </div>
        </div>

        {/* 2. Departure and Destination Divided Layout */}
        <div className="bg-emerald-50/20 rounded-2xl p-4 border border-emerald-100 space-y-3">
          <label className="block text-emerald-800 text-xs font-extrabold flex items-center gap-1">
            <span className="bg-emerald-600 text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px]">২</span>
            যাত্রার কাউন্টার ও গন্তব্য জেলাস (দুইভাগে বিভক্ত)
          </label>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Left Counter */}
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 block font-bold">কোথা হতে যাত্রা শুরু হবে</span>
              <div className="relative">
                <select
                  value={fromLoc}
                  onChange={(e) => setFromLoc(e.target.value)}
                  className="w-full bg-white border border-slate-250 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none font-bold"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-2.5 pointer-events-none text-emerald-600 text-xs">🚗</div>
              </div>
            </div>

            {/* Right Destination */}
            <div className="space-y-1">
              <span className="text-[10px] text-indigo-500 block font-bold">কোথায় শেষ হবে / নামাবে</span>
              <div className="relative">
                <select
                  value={toLoc}
                  onChange={(e) => setToLoc(e.target.value)}
                  className="w-full bg-white border border-slate-250 focus:border-emerald-500 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none font-bold"
                >
                  {[...LOCATIONS].reverse().map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-2.5 pointer-events-none text-indigo-600 text-xs">🏁</div>
              </div>
            </div>
          </div>
          
          <div className="text-[10px] bg-white border border-emerald-150 p-2.5 rounded-xl text-emerald-800 font-semibold flex items-center gap-1.5 leading-relaxed">
            <Info size={12} className="shrink-0" />
            <span>যাত্রী নির্বাচন করতে প্রথমে <b>{fromLoc}</b> সিলেক্ট থাকবে, অতঃপর যাত্রীর গন্তব্য তথা <b>{toLoc}</b> বাছাই করে বুকিং সম্পন্ন হবে।</span>
          </div>
        </div>

        {/* 3. Shift Selection morning vs. evening */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
          <label className="block text-slate-800 text-xs font-bold mb-1 flex items-center gap-1">
            <span className="bg-slate-600 text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px]">৩</span>
            যাত্রার শিফট এবং সময় নির্ধারণ
          </label>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleShiftSelect('Morning')}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-xs transition-all ${
                shift === 'Morning'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow shadow-emerald-100 scale-102 font-bold'
                  : 'bg-white text-slate-650 border-slate-200 hover:border-slate-300'
              }`}
            >
              <Sun size={15} className={shift === 'Morning' ? 'text-amber-200 animate-spin' : 'text-slate-400'} />
              <span>সকালে রওনা হবেন</span>
            </button>

            <button
              type="button"
              onClick={() => handleShiftSelect('Evening')}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-bold text-xs transition-all ${
                shift === 'Evening'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow shadow-emerald-100 scale-102 font-bold'
                  : 'bg-white text-slate-650 border-slate-200 hover:border-slate-300'
              }`}
            >
              <Moon size={15} className={shift === 'Evening' ? 'text-indigo-200' : 'text-slate-400'} />
              <span>বিকালে রওনা হবেন</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-1.5">
            <span className="text-[11px] text-slate-500 font-semibold leading-normal">
              শিফট সিলেক্ট করলেই ডিফল্ট সময় সেট হবে, তবে আপনি চাইলে নিচের ঘরে নির্দিষ্ট সময় সংশোধন করতে পারেন:
            </span>
            <input
              type="text"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              placeholder="যেমন: ১০:৩০ AM বা ০৪:৩০ PM"
              className="w-full bg-white border border-slate-200 focus:border-red-500 focus:bg-white rounded-xl px-4 py-2 text-xs font-bold text-slate-800 focus:outline-none"
            />
          </div>
        </div>

        {/* 4. Medium Details selection */}
        <div>
          <label className="block text-slate-700 text-xs font-bold mb-2">সার্ভিস ক্যাটাগরি</label>
          <div className="grid grid-cols-5 gap-2">
            {vehicleDetails.map((v) => (
              <button
                key={v.value}
                type="button"
                onClick={() => setCategory(v.value)}
                className={`flex flex-col items-center justify-center p-2 rounded-2xl border transition-all ${
                  category === v.value
                    ? 'bg-emerald-650 border-emerald-500 text-emerald-800 font-bold scale-102 shadow-sm'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <span className="text-xl mb-1">{v.icon}</span>
                <span className="text-[10px] text-center whitespace-nowrap">{v.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 5. Cost & empty seats count */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 text-xs font-bold mb-1.5 flex items-center gap-1">
              <DollarSign size={13} className="text-emerald-600" /> প্রতি সিট ভাড়া (৳)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="যেমন: ২৫০"
              className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none font-bold text-center"
            />
          </div>

          <div>
            <label className="block text-slate-700 text-xs font-bold mb-1.5 flex items-center gap-1">
              <Users size={13} className="text-emerald-600" /> সিট সংখ্যা খালি
            </label>
            <input
              type="number"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              placeholder="৪"
              min={1}
              max={15}
              className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none font-bold text-center"
            />
          </div>
        </div>

        {/* 6. Taglines info */}
        <div>
          <label className="block text-slate-705 text-xs font-bold mb-1.5 flex items-center gap-1">
            <Sparkles size={13} className="text-emerald-600" /> সুন্দর একটি বিবরণ / ট্যাগলাইন (ঐচ্ছিক)
          </label>
          <textarea
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="উদাহরণ: এসি গাড়ি, ব্যাগ রাখার পর্যাপ্ত জায়গা আছে।"
            rows={2}
            className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-2xl px-4 py-2 text-xs text-slate-800 focus:outline-none resize-none"
          />
        </div>

        {/* Submission Panel button */}
        <button
          type="submit"
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-100 transition-all text-xs flex items-center justify-center gap-2 uppercase tracking-wide"
        >
          কপিলমুনি রাইডে পোস্ট করুন 🚀
        </button>
      </form>
    </div>
  );
};
