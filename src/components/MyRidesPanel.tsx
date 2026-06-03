import React, { useState, useEffect } from 'react';
import { ShieldCheck, Phone, RefreshCw, MessageSquare, MapPin, CheckCircle, Crosshair } from 'lucide-react';
import { Booking } from '../types';

interface MyRidesPanelProps {
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
  onOpenChat: (rideId: string) => void;
}

export const MyRidesPanel: React.FC<MyRidesPanelProps> = ({
  bookings,
  onCancelBooking,
  onOpenChat
}) => {
  const [activeTrackingBooking, setActiveTrackingBooking] = useState<string | null>(
    bookings[0]?.id || null
  );
  const [trackingStep, setTrackingStep] = useState(1);

  // Pick the tracked active booking
  const currentTrackingObj = bookings.find(b => b.id === activeTrackingBooking) || bookings[0];

  // Auto progression of simulated tracking to show real-time operation interface
  useEffect(() => {
    if (!currentTrackingObj) return;
    
    // Reset tracker stage if we change current tracked ride
    setTrackingStep(1);

    const interval = setInterval(() => {
      setTrackingStep((prev) => (prev < 4 ? prev + 1 : 4));
    }, 8000);

    return () => clearInterval(interval);
  }, [currentTrackingObj?.id]);

  const stages = [
    { title: ' বুকিং নিশ্চিত হয়েছে', desc: 'ড্রাইভার আপনার রিকোয়েস্ট গ্রহণ করেছেন', icon: '📝' },
    { title: 'ড্রাইভার রওয়ানা হয়েছেন', desc: 'লাইভ ম্যাপে অবস্থান চেক করুন', icon: '🚗' },
    { title: 'যাত্রী পিকআপ সম্পন্ন', desc: 'আপনার নিরাপদ ভ্রমণ নিশ্চিত করা হচ্ছে', icon: '🏁' },
    { title: 'গন্তব্যে পৌঁছেছেন', desc: 'ভ্রমণ সফলভাবে সম্পন্ন হয়েছে, পেমেন্ট দিন', icon: '🎉' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Page titles */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-md">
        <h3 className="text-xl font-bold">আমার বুকিং ও ট্র্যাকিং হিস্টোরি</h3>
        <p className="text-emerald-100 text-xs mt-1">সবগুলো বুকিং টিকিট এবং রিয়েল-টাইম লাইভ ট্র্যাকিং স্ট্যাটাস নিচে দেখুন</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Booking Tickets List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-slate-800 text-sm">সিট বুকিং এবং পোস্টসমূহ ({bookings.length})</h4>
          </div>

          {bookings.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-150 p-12 text-center text-slate-400">
              <p className="font-bold text-sm">এখনো কোনো টিকিট বুক করা হয়নি।</p>
              <p className="text-xs mt-1 text-slate-400">হোম ট্যাব থেকে যেকোনো রাইডারের সিট বুক করুন এবং লাইভ ট্র্যাকিং করুন।</p>
            </div>
          ) : (
            bookings.map((b) => (
              <div 
                key={b.id} 
                onClick={() => setActiveTrackingBooking(b.id)}
                className={`bg-white rounded-3xl border transition-all p-5 hover:shadow-md cursor-pointer ${
                  activeTrackingBooking === b.id 
                    ? 'border-emerald-500 ring-2 ring-emerald-500/10' 
                    : 'border-slate-150'
                }`}
              >
                {/* Driver information */}
                <div className="flex justify-between items-start pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <img 
                      src={b.ride.driver.avatar} 
                      alt={b.ride.driver.name} 
                      className="w-10 h-10 rounded-full object-cover border"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h5 className="font-bold text-slate-800 text-sm">{b.ride.driver.name}</h5>
                      <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                        ⭐ {b.ride.driver.rating} • {b.ride.category}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                    b.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                    b.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-amber-100 text-amber-800 animate-pulse'
                  }`}>
                    {b.status === 'Completed' ? 'সম্পন্ন' : 'চলমান যাত্রা'}
                  </span>
                </div>

                {/* Travel route detail */}
                <div className="py-4 flex justify-between items-center bg-slate-50 rounded-2xl px-4 my-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">যাত্রার শুরু</span>
                    <strong className="text-slate-800 text-sm">{b.ride.from}</strong>
                  </div>
                  <div className="text-center">
                    <span className="text-slate-400 block text-[10px]">মোট সিট বুক</span>
                    <strong className="text-slate-800">{b.bookedSeats}টি সিট</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-bold text-indigo-700">গন্তব্য</span>
                    <strong className="text-slate-800 text-sm">{b.ride.to}</strong>
                  </div>
                </div>

                {/* Invoice Footer total cost */}
                <div className="flex justify-between items-center pt-3 text-xs">
                  <div>
                    <span className="text-slate-400">ভাড়া: </span>
                    <strong className="text-emerald-700 text-sm">৳ {b.ride.price * b.bookedSeats}</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenChat(b.ride.id);
                      }}
                      className="p-1.5 rounded-xl bg-slate-100 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 border border-slate-200"
                      title="চ্যাট করুন"
                    >
                      <MessageSquare size={14} />
                    </button>
                    
                    {b.status !== 'Completed' && b.status !== 'Cancelled' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('আপনি কি সত্যিই এই বুকিং বাতিল করতে চান?')) {
                            onCancelBooking(b.id);
                          }
                        }}
                        className="text-[11px] font-bold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-xl border border-red-200 transition-all"
                      >
                        বাতিল করুন
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Side: Active Real-time Tracker Simulation details */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-150 p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-150 mb-4">
            <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
              <Crosshair size={15} className="text-emerald-600 animate-spin" /> রিয়েল-টাইম লাইভ ট্র্যাকিং 
            </h4>
            <span className="bg-red-50 text-red-500 font-bold px-2 py-0.5 rounded-full text-[9px] border border-red-150 animate-pulse">
              লাইভ ট্র্যাকিং চালু
            </span>
          </div>

          {currentTrackingObj ? (
            <div className="space-y-6">
              
              {/* Tracker Route badge header */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
                <span className="text-[10px] text-slate-400">বর্তমান ট্র্যাকিং টিকিট আইডি: #{currentTrackingObj.id}</span>
                <p className="font-extrabold text-slate-800 mt-1 text-sm">
                  {currentTrackingObj.ride.from} ➔ {currentTrackingObj.ride.to} ({currentTrackingObj.ride.category})
                </p>
              </div>

              {/* Stepper Timeline UI */}
              <div className="relative pl-6 space-y-6">
                {/* Downwards line */}
                <div className="absolute left-2.5 top-2.5 bottom-2.5 w-0.5 bg-slate-100"></div>

                {stages.map((stg, index) => {
                  const stepNum = index + 1;
                  const isActive = stepNum <= trackingStep;
                  const isCurrent = stepNum === trackingStep;

                  return (
                    <div key={index} className="relative flex items-start gap-4">
                      {/* Step node indicators */}
                      <span className={`absolute -left-6 z-10 w-5.5 h-5.5 rounded-full border-2 flex items-center justify-center text-xs transition-all ${
                        isCurrent ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white scale-125 border-white ring-4 ring-emerald-100' :
                        isActive ? 'bg-emerald-600 text-white border-emerald-600' :
                        'bg-white text-slate-300 border-slate-200'
                      }`}>
                        {isActive ? '✓' : stepNum}
                      </span>

                      <div>
                        <h5 className={`text-xs font-bold ${isActive ? 'text-slate-800' : 'text-slate-400'} flex items-center gap-1`}>
                          <span>{stg.icon}</span> {stg.title}
                          {isCurrent && (
                            <span className="text-[9px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.2 rounded-full font-extrabold animate-pulse">
                              [বর্তমান অবস্থা]
                            </span>
                          )}
                        </h5>
                        <p className={`text-[11px] mt-0.5 ${isActive ? 'text-slate-500' : 'text-slate-300'}`}>
                          {stg.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Progress visual bar percentage indicator */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">অগ্রগতি মাত্রা:</span>
                <strong className="text-emerald-700">{trackingStep * 25}% শেষ হয়েছে</strong>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-600 h-full transition-all duration-[1000ms] ease-out rounded-full"
                  style={{ width: `${trackingStep * 25}%` }}
                />
              </div>

              {/* Helper instruction box */}
              <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-3 flex gap-2 text-[10px] text-amber-800">
                <ShieldCheck size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed font-semibold">
                  নিরাপত্তা সতর্কতা: যাত্রীদের অনুরোধ করা হচ্ছে চালকের সাথে যাত্রার পূর্বে আপনার পরিচয় মিলিয়ে নেওয়ার জন্য।
                </p>
              </div>

            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs">
              ট্র্যাকিং করার জন্য বাম পাশের যেকোনো চালুরত লাইড টিকিট কার্ডে ক্লিক করুন।
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
