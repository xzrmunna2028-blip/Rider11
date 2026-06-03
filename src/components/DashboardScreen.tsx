import React, { useState } from 'react';
import { 
  Bell, 
  ChevronRight, 
  ChevronLeft, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Plus, 
  CheckCircle, 
  User, 
  Briefcase, 
  Navigation, 
  Coins, 
  Users, 
  X,
  Info,
  Home,
  ClipboardList,
  Star
} from 'lucide-react';
import { 
  AppState, 
  RidePost, 
  VehicleCategory, 
  LOCATIONS, 
  QUICK_MESSAGES 
} from '../types';
import { MapWidget } from './MapWidget';

interface DashboardScreenProps {
  appState: AppState;
  onTabChange: (tab: AppState['dashboardTab']) => void;
  onCategorySelect: (cat: 'All' | VehicleCategory) => void;
  onFilterChange: (from: string, to: string) => void;
  onBookSeats: (rideId: string, bookedSeats: number) => void;
  onOpenChat: (rideId: string) => void;
  children?: React.ReactNode;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  appState,
  onTabChange,
  onCategorySelect,
  onFilterChange,
  onBookSeats,
  onOpenChat,
  children
}) => {
  const { rides, selectedCategory, fromFilter, toFilter, currentLocation } = appState;
  
  // Local state controls
  const [activeBannerIdx, setActiveBannerIdx] = useState(0);
  const [showNotificationDrop, setShowNotificationDrop] = useState(false);
  const [showLocationDrop, setShowLocationDrop] = useState(false);
  
  // Interactive seat booking dialog state
  const [bookingRide, setBookingRide] = useState<RidePost | null>(null);
  const [requestSeats, setRequestSeats] = useState(1);
  const [bookSuccess, setBookSuccess] = useState(false);

  // Filter rides based on inputs
  const filteredRides = rides.filter(r => {
    const matchesCat = selectedCategory === 'All' || r.category === selectedCategory;
    const matchesFrom = !fromFilter || r.from === fromFilter;
    const matchesTo = !toFilter || r.to === toFilter;
    return matchesCat && matchesFrom && matchesTo;
  });

  const bannerSlides = [
    {
      title: 'দ্রুত রাইড বুক করুন',
      subtitleLine1: 'নিরাপদ ও আরামদায়ক ভ্রমণ',
      subtitleLine2: 'আপনার হাতের মুঠোয়',
      cta: 'এখনই বুক করুন',
      bgGrad: 'from-[#0ca351] to-[#128a47]'
    },
    {
      title: 'মোটরসাইকেলে জরুরি ট্রাভেল',
      subtitleLine1: 'জ্যাম এড়িয়ে দ্রুত ট্রাভেল',
      subtitleLine2: 'হেলমেট নিশ্চিত প্রদান করা হবে',
      cta: 'রাইড খুঁজুন',
      bgGrad: 'from-[#128a47] to-[#0d944d]'
    },
    {
      title: 'মাইক্রোবাসে ফ্যামিলি ট্যুর',
      subtitleLine1: 'আরামদায়ক এসি মাইক্রোবাস সমূহ',
      subtitleLine2: 'সহজ ও নিরাপদ রিজার্ভেশন',
      cta: 'বুক করুন আজই',
      bgGrad: 'from-[#0a8040] to-[#14af5a]'
    }
  ];

  const categoriesList: { name: 'All' | VehicleCategory; label: string; icon: string }[] = [
    { name: 'Car', label: 'Car', icon: '🚗' },
    { name: 'Bike', label: 'Bike', icon: '🏍️' },
    { name: 'CNG', label: 'CNG', icon: '🛺' },
    { name: 'Micro', label: 'Micro', icon: '🚐' },
    { name: 'Pickup', label: 'Pickup', icon: '🛻' }
  ];

  const mockAlerts = [
    { text: 'তৌফিক হাসান আপনার সিট বুকিং অনুমোদন করেছেন।', time: '১ মিনিট আগে' },
    { text: 'কপিলমুনি টু ঢাকা নতুন মাইক্রোবাস পোস্ট দেওয়া হয়েছে।', time: '১২ মিনিট আগে' },
    { text: 'আপনার ওয়ালেটে ২০০ টাকা জমা হয়েছে!', time: '১ ঘন্টা আগে' }
  ];

  const handleSeatBookingTrigger = (ride: RidePost) => {
    setBookingRide(ride);
    setRequestSeats(1);
    setBookSuccess(false);
  };

  const handleConfirmReservation = () => {
    if (!bookingRide) return;
    
    if (appState.user.walletBalance < (bookingRide.price * requestSeats)) {
      alert('দুঃখিত! আপনার প্রোফাইল ব্যালেন্স পর্যাপ্ত নয় দয়া করে প্রোফাইল থেকে ব্যালেন্স অ্যাড করুন।');
      return;
    }

    onBookSeats(bookingRide.id, requestSeats);
    setBookSuccess(true);
    setTimeout(() => {
      setBookingRide(null);
      setBookSuccess(false);
      onTabChange('my-rides');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-28">
      
      {/* 1. Header Toolbar matching screenshot */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm px-4 py-3.5 flex items-center justify-between">
        
        {/* Left Address Picker */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowLocationDrop(!showLocationDrop);
              setShowNotificationDrop(false);
            }}
            className="flex items-center gap-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors px-3 py-1.5 rounded-full text-[11px] font-bold text-slate-700 focus:outline-none"
          >
            <MapPin size={13} className="text-[#0da652]" />
            <span>{currentLocation || 'কপিলমুনি, খুলনা'}</span>
            <span className="text-[8px] text-slate-400">▼</span>
          </button>

          {showLocationDrop && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-slate-150 rounded-2xl shadow-xl z-50 p-2 text-xs">
              <span className="block px-3 py-1.5 font-bold text-slate-400 border-b border-slate-100">স্টেশন নির্বাচন করুন</span>
              {LOCATIONS.slice(0, 8).map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    onFilterChange(loc, toFilter);
                    setShowLocationDrop(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-emerald-50 hover:text-emerald-800 rounded-xl transition-colors font-semibold"
                >
                  {loc}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Center Title: "কপিলমুনি রাইড" dynamically styled */}
        <div className="text-center flex-1 mx-2">
          <h1 className="text-slate-800 font-extrabold text-base md:text-xl tracking-wide flex items-center justify-center gap-1">
            <span className="font-sans">কপিলমুনি</span>
            <span className="text-white bg-[#0da652] px-2 py-0.5 rounded-md text-xs md:text-sm font-extrabold ml-0.5">রাইড</span>
          </h1>
        </div>

        {/* Right Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotificationDrop(!showNotificationDrop);
              setShowLocationDrop(false);
            }}
            className="p-2 bg-slate-100 hover:bg-slate-200 transition-colors rounded-full text-slate-700 relative"
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#0da652] rounded-full border-2 border-white"></span>
          </button>

          {showNotificationDrop && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-150 rounded-2xl shadow-xl z-50 p-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 mb-2">
                <span className="font-extrabold text-slate-800 font-sans">নোটিফিকেশনসমূহ</span>
                <span className="text-[10px] text-emerald-600 font-bold hover:underline cursor-pointer">সব পড়ুন</span>
              </div>
              <div className="space-y-2">
                {mockAlerts.map((malert, idx) => (
                  <div key={idx} className="p-2 bg-slate-50 hover:bg-emerald-50 rounded-xl transition-colors border border-slate-100">
                    <p className="text-slate-700 font-medium leading-normal">{malert.text}</p>
                    <span className="text-[9px] text-slate-400 block mt-1">{malert.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </header>

      {/* Main Tab content area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 space-y-6">
        
        {appState.dashboardTab === 'home' ? (
          <>
            {/* 2. Premium CSS/SVG Replica of Hero Carousel matching image */}
            <div className="relative rounded-3xl overflow-hidden shadow-sm border border-slate-100">
              <div className={`bg-gradient-to-r ${bannerSlides[activeBannerIdx].bgGrad} p-6 md:p-8 text-white min-h-[160px] flex items-center justify-between transition-all duration-500`}>
                
                {/* Left texts */}
                <div className="max-w-[65%] space-y-2">
                  <h3 className="text-xl md:text-2xl font-extrabold leading-tight">
                    {bannerSlides[activeBannerIdx].title}
                  </h3>
                  
                  <div className="text-emerald-100 text-xs md:text-sm font-medium leading-relaxed">
                    <p>{bannerSlides[activeBannerIdx].subtitleLine1}</p>
                    <p>{bannerSlides[activeBannerIdx].subtitleLine2}</p>
                  </div>
                  
                  <button 
                    onClick={() => {
                      onFilterChange('কপিলমুনি', 'ঢাকা');
                      alert('ঢাকা যাওয়ার সমস্ত একটিভ কার ও ক্যাটাগরি ফিল্টার করা হয়েছে!');
                    }}
                    className="mt-3 flex items-center gap-1.5 bg-white text-[#0da652] hover:bg-slate-50 transition-colors px-4 py-2 rounded-full text-xs font-bold shadow-md"
                  >
                    <span>{bannerSlides[activeBannerIdx].cta}</span>
                    <ChevronRight size={13} strokeWidth={3} />
                  </button>
                </div>

                {/* Right Green Sedan Car Graphic representation */}
                <div className="relative opacity-100 hidden sm:block pointer-events-none pr-4">
                  <svg className="w-36 h-24 text-[#7df0a8]" viewBox="0 0 120 60" fill="currentColor">
                    {/* Modern Sedan Shape */}
                    <path d="M 20,32 C 20,28 26,26 34,26 L 44,14 C 48,10 56,10 60,11 L 82,24 C 92,25 98,28 98,33 L 96,44 C 96,46 94,48 91,48 L 19,48 C 16,48 14,46 14,44 Z" />
                    {/* Windows */}
                    <path d="M 36,25 L 42,16 L 56,16 L 56,25 Z" fill="#ffffff" opacity="0.8" />
                    <path d="M 59,25 L 59,16 L 72,21 L 76,25 Z" fill="#ffffff" opacity="0.8" />
                    {/* Wheels */}
                    <circle cx="34" cy="48" r="9" fill="#1e293b" />
                    <circle cx="34" cy="48" r="4" fill="#ffffff" />
                    <circle cx="76" cy="48" r="9" fill="#1e293b" />
                    <circle cx="76" cy="48" r="4" fill="#ffffff" />
                    {/* Map Pin Hovering on top */}
                    <g transform="translate(68, -4) scale(0.6)">
                      <circle cx="20" cy="20" r="14" fill="#ffffff" opacity="0.25" />
                      <path d="M20,6 C13,6 8,11 8,17 C8,25 20,34 20,34 C20,34 32,25 32,17 C32,11 27,6 20,6 Z" fill="#ffffff" />
                      <circle cx="20" cy="16" r="4" fill="#0da652" />
                    </g>
                  </svg>
                </div>

              </div>

              {/* Slider Controls */}
              <button 
                onClick={() => setActiveBannerIdx(prev => prev > 0 ? prev - 1 : bannerSlides.length - 1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/15 hover:bg-black/30 text-white transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={() => setActiveBannerIdx(prev => prev < bannerSlides.length - 1 ? prev + 1 : 0)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/15 hover:bg-black/30 text-white transition-colors"
              >
                <ChevronRight size={16} />
              </button>

              {/* Pagination Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {bannerSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveBannerIdx(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      activeBannerIdx === idx ? 'bg-white' : 'bg-white/40'
                    }`}
                  ></button>
                ))}
              </div>

            </div>

            {/* 3. Service Categories with sub titles in English */}
            <section className="space-y-3.5">
              <div className="flex justify-between items-center px-1">
                <span className="font-extrabold text-[#111111] text-xs uppercase tracking-wide">সার্ভিস ক্যাটাগরি</span>
                <button 
                  onClick={() => onCategorySelect('All')}
                  className="text-[#0da652] hover:underline text-xs font-bold flex items-center gap-1"
                >
                  সব দেখুন <ChevronRight size={12} />
                </button>
              </div>

              {/* Grid cards */}
              <div className="grid grid-cols-5 gap-2.5">
                {categoriesList.map((cat) => {
                  const isActive = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => onCategorySelect(isActive ? 'All' : cat.name)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                        isActive 
                          ? 'bg-emerald-50/50 text-[#0da652] border-[#0da652] font-extrabold shadow-sm scale-102'
                          : 'bg-white text-slate-700 border-slate-150 hover:border-slate-350 hover:bg-slate-50/20'
                      }`}
                    >
                      <span className="text-3xl mb-1.5">{cat.icon}</span>
                      <span className="text-xs font-extrabold text-slate-800">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 4. Resolved Double Map Area - Render only MapWidget */}
            <section className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <span className="font-extrabold text-[#111111] text-xs uppercase tracking-wide">আপনার এলাকার ম্যাপ</span>
              </div>
              <div className="w-full">
                <MapWidget 
                  fromLoc={fromFilter} 
                  toLoc={toFilter}
                  onSelectLocations={(from, to) => onFilterChange(from, to)}
                />
              </div>
            </section>

            {/* Quick Route Filter Selector dropdowns */}
            <section className="bg-white rounded-3xl border border-slate-150 p-4 shadow-sm space-y-3">
              <div className="flex items-center gap-1 text-slate-800 font-extrabold text-xs">
                <span>🔍 দ্রুত ফিল্টার করুন</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-150 rounded-2xl p-2">
                  <span className="text-slate-400 text-[10px] uppercase font-bold pl-1">যাত্রার শুরু:</span>
                  <select
                    value={fromFilter}
                    onChange={(e) => onFilterChange(e.target.value, toFilter)}
                    className="flex-1 bg-transparent text-xs font-bold text-slate-800 focus:outline-none"
                  >
                    <option value="">যাত্রা স্থান বেছে নিন</option>
                    {LOCATIONS.slice(0, 15).map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                </div>

                <div className="flex items-center gap-2 bg-slate-50 border border-slate-150 rounded-2xl p-2">
                  <span className="text-slate-400 text-[10px] uppercase font-bold pl-1">গন্তব্য:</span>
                  <select
                    value={toFilter}
                    onChange={(e) => onFilterChange(fromFilter, e.target.value)}
                    className="flex-1 bg-transparent text-xs font-bold text-slate-800 focus:outline-none"
                  >
                    <option value="">গন্তব্য বেছে নিন</option>
                    {LOCATIONS.slice(0, 15).map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                </div>
              </div>
            </section>

            {/* 5. Recent Ride Posts Feed formatted exactly like the screenshot */}
            <section className="space-y-3.5">
              <div className="flex justify-between items-center px-1">
                <span className="font-extrabold text-[#111111] text-xs uppercase tracking-wide">সাম্প্রতিক রাইড পোস্ট</span>
                <button 
                  onClick={() => {
                    onFilterChange('', ''); 
                    onCategorySelect('All');
                  }} 
                  className="text-xs text-[#0da652] hover:underline font-bold"
                >
                  সব দেখুন ➔
                </button>
              </div>

              {filteredRides.length === 0 ? (
                <div className="bg-white rounded-3xl border border-slate-150 p-12 text-center text-slate-400">
                  <Info size={28} className="mx-auto text-slate-300 mb-2" />
                  <p className="font-bold text-sm">দুঃখিত, কোনো সক্রিয় রাইড পাওয়া যায়নি।</p>
                  <p className="text-xs mt-1">দয়া করে অনুসন্ধানের ফিল্টার পরিবর্তন করুন এবং পুনরায় চেষ্টা করুন।</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredRides.map((ride) => {
                    const isBooked = appState.bookings.some(b => b.ride.id === ride.id);
                    return (
                      <div 
                        key={ride.id}
                        className="bg-white rounded-3xl border border-slate-150 p-5 shadow-sm transition-all relative"
                      >
                        {/* Upper Section */}
                        <div className="flex justify-between items-start pb-4 border-b border-slate-100">
                          
                          {/* Driver Column */}
                          <div className="flex items-start gap-4">
                            <div className="flex flex-col items-center shrink-0">
                              <img 
                                src={ride.driver.avatar} 
                                alt={ride.driver.name}
                                className="w-12 h-12 rounded-full object-cover border border-slate-150 shadow-sm"
                                referrerPolicy="no-referrer"
                              />
                              <span className="text-amber-500 text-[10.5px] font-bold flex items-center gap-0.5 mt-1">
                                ★ {ride.driver.rating || 4.8}
                              </span>
                            </div>

                            {/* Center travel path detail with nice circles */}
                            <div className="space-y-2">
                              <h5 className="font-extrabold text-slate-800 text-sm leading-tight">{ride.driver.name}</h5>
                              
                              {/* Path rendering */}
                              <div className="flex flex-col space-y-1 pl-0.5">
                                <div className="flex items-center gap-1.5 text-xs text-slate-700">
                                  <span className="w-2 h-2 rounded-full bg-[#0da652] shrink-0"></span>
                                  <span className="font-bold text-slate-800">{ride.from}</span>
                                </div>
                                <div className="pl-1 border-l border-dashed border-slate-300 h-3 ml-1"></div>
                                <div className="flex items-center gap-1.5 text-xs text-slate-700">
                                  <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                                  <span className="font-bold text-slate-800">{ride.to}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right Side Price detail */}
                          <div className="text-right flex flex-col items-end">
                            <strong className="text-[#0da652] text-xl font-extrabold leading-none">৳ {ride.price}</strong>
                            <span className="text-[10px] text-slate-400 block mt-1.5 font-bold">{ride.time}</span>
                          </div>

                        </div>

                        {/* Mid Section for Vehicle Badges & available seats */}
                        <div className="py-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {/* Green vehicle category tag */}
                            <span className="text-xs bg-emerald-50 border border-[#0da652]/30 text-[#0da652] px-3 py-1 rounded-lg font-bold">
                              {ride.category || 'Car'}
                            </span>
                            
                            {/* Empty Seat details */}
                            <span className="text-xs text-slate-500 font-semibold pl-1.5">
                              {ride.seatsAvailable} সিট খালি
                            </span>
                          </div>

                          {/* Tagline / driver advice */}
                          <span className="text-[10px] text-slate-400 truncate max-w-xs italic font-medium hidden md:inline">
                            "{ride.tagline || 'নিরাপদ ভ্রমণ।'}"
                          </span>
                        </div>

                        {/* Three Bottom buttons exactly matching picture CTAs! */}
                        <div className="pt-3.5 border-t border-slate-100 grid grid-cols-3 gap-2.5">
                          
                          {/* 1. Call Button */}
                          <a 
                            href={`tel:${ride.phone}`}
                            onClick={(e) => {
                              e.preventDefault();
                              alert(`চালকের ফোন নম্বর: ${ride.phone}\nসরাসরি কল ডায়াল শুরু হচ্ছে...`);
                              window.location.href = `tel:${ride.phone}`;
                            }}
                            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-[#0da652] font-bold text-xs shadow-sm transition-all text-center"
                          >
                            <Phone size={13} className="text-[#0da652]" />
                            <span>কল করুন</span>
                          </a>

                          {/* 2. Message Button */}
                          <button
                            onClick={() => onOpenChat(ride.id)}
                            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-[#0da652] font-bold text-xs shadow-sm transition-all"
                          >
                            <MessageSquare size={13} className="text-[#0da652]" />
                            <span>মেসেজ</span>
                          </button>

                          {/* 3. Solid Green Button for tracking/booking */}
                          {isBooked ? (
                            <button
                              onClick={() => onTabChange('my-rides')}
                              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#0da652] hover:bg-[#128f49] text-white font-bold text-xs shadow-md transition-all animate-pulse"
                            >
                              <MapPin size={13} className="text-white" />
                              <span>ট্র্যাক করুন</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleSeatBookingTrigger(ride)}
                              disabled={ride.seatsAvailable <= 0}
                              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#0da652] hover:bg-[#128f49] disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold text-xs shadow-md transition-all"
                            >
                              <Navigation size={13} className="text-white rotate-45" />
                              <span>বুক করুন</span>
                            </button>
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </>
        ) : (
          children
        )}

      </main>

      {/* BOOKING MODAL PANEL */}
      {bookingRide && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 relative border border-slate-150 shadow-2xl">
            <button 
              onClick={() => setBookingRide(null)}
              className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
            >
              <X size={18} />
            </button>

            {bookSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-[#0da652] text-2xl scale-110">
                  ✓
                </div>
                <h4 className="text-lg font-bold text-slate-800">বুকিং সম্পন্ন হয়েছে!</h4>
                <p className="text-slate-500 text-xs">আপনার টিকিট ব্যালেন্স কাটা হয়েছে। লাইভ ট্র্যাকিং মডিউলে আপনাকে রিডায়রেক্ট করা হচ্ছে...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <h4 className="font-extrabold text-slate-800 text-base">আসন বুকিং নিশ্চিত করুন</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{bookingRide.driver.name} ({bookingRide.category})</p>
                </div>

                {/* Ride details */}
                <div className="bg-slate-50 rounded-2xl p-3 border text-xs text-slate-705 space-y-2 font-semibold">
                  <div className="flex justify-between">
                    <span>রুট কাউন্টার:</span>
                    <span className="font-bold text-slate-800">{bookingRide.from} ➔ {bookingRide.to}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ভাড়া (প্রতি সিট):</span>
                    <span className="font-bold text-emerald-700">৳ {bookingRide.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>মোট ফাকা আসন:</span>
                    <span className="font-bold text-slate-800">{bookingRide.seatsAvailable}টি আসন</span>
                  </div>
                </div>

                {/* Seat Selector */}
                <div>
                  <label className="block text-slate-700 text-[11px] mb-1 font-bold">কতটি সিট বুক করতে চান?</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setRequestSeats(prev => Math.max(1, prev - 1))}
                      className="w-10 h-10 bg-slate-100 rounded-xl font-bold hover:bg-slate-200"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-extrabold text-sm text-slate-850">
                      {requestSeats} টি সিট
                    </span>
                    <button
                      onClick={() => setRequestSeats(prev => Math.min(bookingRide.seatsAvailable, prev + 1))}
                      className="w-10 h-10 bg-slate-100 rounded-xl font-bold hover:bg-slate-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total Invoice */}
                <div className="pt-3 border-t flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-404 block font-bold">সর্বমোট প্রদেয় ভাড়া</span>
                    <strong className="text-emerald-705 text-[17px] font-extrabold">৳ {bookingRide.price * requestSeats}</strong>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-[10px] text-slate-404 block">ওয়ালেট ব্যালেন্স:</span>
                    <strong className="text-slate-700 text-xs font-mono">৳ {appState.user.walletBalance}</strong>
                  </div>
                </div>

                <button
                  onClick={handleConfirmReservation}
                  className="w-full py-2.5 bg-[#0da652] hover:bg-[#128f49] text-white text-xs font-bold rounded-xl transition shadow-md"
                >
                  কনফার্ম রিজার্ভেশন করুন
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. PERSISTENT FLOATING BAR TAB BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2.5 px-3 z-40 shadow-2xl flex items-center justify-around max-w-md mx-auto rounded-t-3xl">
        
        {/* Home */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center transition-colors focus:outline-none flex-1 ${
            appState.dashboardTab === 'home' ? 'text-[#0da652] font-bold' : 'text-slate-500'
          }`}
        >
          <Home size={22} className={appState.dashboardTab === 'home' ? 'text-[#0da652] fill-[#0da652]/10' : 'text-slate-400'} />
          <span className="text-[10px] mt-1">হোম</span>
        </button>

        {/* My Rides */}
        <button
          onClick={() => onTabChange('my-rides')}
          className={`flex flex-col items-center justify-center transition-colors focus:outline-none flex-1 ${
            appState.dashboardTab === 'my-rides' ? 'text-[#0da652] font-bold' : 'text-slate-500'
          }`}
        >
          <ClipboardList size={22} className={appState.dashboardTab === 'my-rides' ? 'text-[#0da652]' : 'text-slate-400'} />
          <span className="text-[10px] mt-1">আমার রাইড</span>
        </button>

        {/* Centered Post Ride Button */}
        <button
          onClick={() => onTabChange('post-ride')}
          className={`flex flex-col items-center justify-center transition-all focus:outline-none flex-1 -mt-3`}
        >
          <div className="w-11 h-11 bg-[#0da652] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all">
            <Plus size={24} strokeWidth={3} />
          </div>
          <span className="text-[10px] text-slate-550 font-semibold mt-1">পোস্ট রাইড</span>
        </button>

        {/* Messaging */}
        <button
          onClick={() => onTabChange('messages')}
          className={`flex flex-col items-center justify-center transition-colors relative focus:outline-none flex-1 ${
            appState.dashboardTab === 'messages' ? 'text-[#0da652] font-bold' : 'text-slate-500'
          }`}
        >
          <MessageSquare size={22} className={appState.dashboardTab === 'messages' ? 'text-[#0da652]' : 'text-slate-400'} />
          <span className="text-[10px] mt-1">মেসেজ</span>
          {appState.chats.some(c => c.unread) && (
            <span className="absolute top-1 right-5 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </button>

        {/* Profile */}
        <button
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center justify-center transition-colors focus:outline-none flex-1 ${
            appState.dashboardTab === 'profile' ? 'text-[#0da652] font-bold' : 'text-slate-500'
          }`}
        >
          <User size={22} className={appState.dashboardTab === 'profile' ? 'text-[#0da652]' : 'text-slate-400'} />
          <span className="text-[10px] mt-1">প্রোফাইল</span>
        </button>

      </nav>

    </div>
  );
};
