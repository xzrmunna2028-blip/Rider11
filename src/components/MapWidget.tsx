import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Car, Bike, Info, ArrowRight, RefreshCw } from 'lucide-react';
import { VehicleCategory } from '../types';

interface MapWidgetProps {
  fromLoc: string;
  toLoc: string;
  onSelectLocations: (from: string, to: string) => void;
}

interface SimulatedRider {
  id: string;
  name: string;
  avatar: string;
  type: VehicleCategory;
  progress: number; // 0 to 100 along the path
  speed: number;
}

export const MapWidget: React.FC<MapWidgetProps> = ({
  fromLoc,
  toLoc,
  onSelectLocations
}) => {
  // Region Stations coordinates for our interactive styled SVG map container
  const STATIONS = [
    { name: 'পাইকগাছা', label: 'পাইকগাছা (কাউন্টার)', x: 15, y: 75, desc: 'সদর স্ট্যান্ড কাউন্টার' },
    { name: 'কপিলমুনি', label: 'কপিলমুনি (বাজার)', x: 38, y: 58, desc: 'কপিলমুনি মোড়' },
    { name: 'খুলনা', label: 'খুলনা (সোনাডাঙ্গা)', x: 65, y: 40, desc: 'নতুন বাস টার্মিনাল' },
    { name: 'ঢাকা', label: 'ঢাকা (গাবতলী)', x: 88, y: 20, desc: 'গাবতলী বাস কাউন্টার' }
  ];

  // Moving riders along the highway coordinates
  const [riders, setRiders] = useState<SimulatedRider[]>([
    { 
      id: 'rider-1', 
      name: 'তৌফিক হাসান', 
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120', 
      type: 'Car', 
      progress: 25, 
      speed: 0.8 
    },
    { 
      id: 'rider-2', 
      name: 'রাকিবুল ইসলাম', 
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120', 
      type: 'Car', 
      progress: 58, 
      speed: 0.6 
    },
    { 
      id: 'rider-3', 
      name: 'মেহেদী হাসান', 
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120', 
      type: 'CNG', 
      progress: 12, 
      speed: 1.2 
    },
    { 
      id: 'rider-4', 
      name: 'তরিকুল ইসলাম', 
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120', 
      type: 'Bike', 
      progress: 82, 
      speed: 1.4 
    }
  ]);

  // Smooth drift and progression loop for live simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setRiders(prev => prev.map(r => {
        let nextProg = r.progress + r.speed;
        if (nextProg > 100) {
          nextProg = 0; // wrap around route
        }
        return {
          ...r,
          progress: nextProg
        };
      }));
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Quick Station selection handling
  const handleStationClick = (stationName: string) => {
    if (!fromLoc || (fromLoc && toLoc)) {
      // First click: select as Departure
      onSelectLocations(stationName, '');
    } else if (fromLoc && !toLoc) {
      if (fromLoc === stationName) {
        // Unselect if clicking same
        onSelectLocations('', '');
      } else {
        // Second click: select as Destination
        onSelectLocations(fromLoc, stationName);
      }
    }
  };

  const clearFilters = () => {
    onSelectLocations('', '');
  };

  // Helper calculation to map progress (0-100) to an SVG bezier curve path
  // Main route path approximation: M 15,75 C 30,70 45,50 65,40 S 80,30 88,20
  const getCoordinatesAlongPath = (progress: number) => {
    const t = progress / 100;
    // Cubic Bezier curve points: P0(15,75), P1(35,65), P2(60,45), P3(88,20)
    const p0 = { x: 15, y: 75 };
    const p1 = { x: 35, y: 65 };
    const p2 = { x: 60, y: 45 };
    const p3 = { x: 88, y: 20 };

    // Bezier formula
    const x = Math.pow(1 - t, 3) * p0.x + 3 * Math.pow(1 - t, 2) * t * p1.x + 3 * (1 - t) * Math.pow(t, 2) * p2.x + Math.pow(t, 3) * p3.x;
    const y = Math.pow(1 - t, 3) * p0.y + 3 * Math.pow(1 - t, 2) * t * p1.y + 3 * (1 - t) * Math.pow(t, 2) * p2.y + Math.pow(t, 3) * p3.y;

    return { x, y };
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm space-y-4" id="map-widget-container">
      {/* Title block */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#0da652] animate-pulse"></span>
            আপনার এলাকার লাইভ ম্যাপ
          </h3>
          <p className="text-[11px] text-slate-400">স্টেশনে ট্যাপ করে সরাসরি যাত্রা ও গন্তব্য ঠিক করুন</p>
        </div>
        
        <div className="flex items-center gap-1.5">
          <span className="flex items-center gap-1 bg-emerald-50 text-[#0da652] text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
            <RefreshCw size={10} className="animate-spin text-[#0da652]" />
            ০৪টি গাড়ি সচল
          </span>
        </div>
      </div>

      {/* Styled Interactive Live Map canvas (Bypassed real Google Maps perfectly) */}
      <div className="relative w-full h-[280px] bg-[#f8fafc] rounded-2xl overflow-hidden border border-slate-150 shadow-inner">
        
        {/* Soft grid map background mockup lines for realistic cartographic layout */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" 
          style={{ 
            backgroundImage: `radial-gradient(#0da652 1.5px, transparent 1.5px), radial-gradient(#06b6d4 1.5px, transparent 1.5px)`, 
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px'
          }} 
        />

        {/* Rivers / Canal backgrounds vectors */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <path d="M -10,120 Q 80,110 120,160 T 320,180 T 450,220" fill="none" stroke="#e0f2fe" strokeWidth="22" strokeLinecap="round" />
          <path d="M -10,120 Q 80,110 120,160 T 320,180 T 450,220" fill="none" stroke="#bae6fd" strokeWidth="12" strokeLinecap="round" strokeDasharray="3,6" />
        </svg>

        {/* Legend overlay */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-xl border border-slate-100 shadow-sm z-10 flex flex-col gap-1 pointer-events-none">
          <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-slate-600">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
            <span>আমদের অবস্থান (পাইকগাছা)</span>
          </div>
          <div className="flex items-center gap-1.5 text-[9.5px] font-bold text-slate-600">
            <span className="w-2 h-2 rounded-[3px] bg-[#0da652]"></span>
            <span>লাইভ সার্ভিস এক্সপ্রেস রুট</span>
          </div>
        </div>

        {/* Highway road path visualization */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Main highway base lane shadow */}
          <path 
            d="M 15,75 Q 38,62 65,40 T 88,20" 
            className="stroke-slate-200 fill-none" 
            strokeWidth="4" 
            strokeLinecap="round"
          />
          {/* Main high-density vibrant route overlay */}
          <path 
            d="M 15,75 Q 38,62 65,40 T 88,20" 
            className="stroke-[#0da652]/85 fill-none" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeDasharray="2, 2"
          />
        </svg>

        {/* Active Route Selection Highlights paths */}
        {fromLoc && toLoc && (
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path 
                d="M 15,75 Q 38,62 65,40 T 88,20" 
                className="stroke-emerald-500 fill-none animate-pulse" 
                strokeWidth="4" 
                strokeLinecap="round"
                opacity="0.3"
              />
            </svg>
          </div>
        )}

        {/* Your Location Ping (Radar Beacon at Paikgachha) */}
        <div className="absolute pointer-events-none" style={{ left: '15%', top: '75%' }}>
          <div className="relative">
            <span className="absolute -inset-3 rounded-full bg-blue-500/30 animate-ping"></span>
            <div className="w-3.5 h-3.5 bg-blue-500 rounded-full border-2 border-white shadow-md flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            </div>
            <span className="absolute left-4 -top-3 bg-blue-600 text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">
              আপনি এখানে আছেন
            </span>
          </div>
        </div>

        {/* Live Moving Simulated Drivers along path */}
        {riders.map((r) => {
          const coords = getCoordinatesAlongPath(r.progress);
          const isBike = r.type === 'Bike';

          return (
            <div 
              key={r.id} 
              className="absolute transition-all duration-150 ease-linear pointer-events-none"
              style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
            >
              <div className="relative -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                {/* Micro avatar pin badge */}
                <div className="relative">
                  <span className="absolute -inset-1.5 bg-[#0da652]/15 rounded-full animate-pulse"></span>
                  <div className="w-7 h-7 rounded-full bg-white p-0.5 border border-[#0da652] shadow-md overflow-hidden flex items-center justify-center">
                    <img 
                      src={r.avatar} 
                      alt={r.name}
                      className="w-full h-full rounded-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {/* Vehicle tag */}
                  <span className="absolute -bottom-1 -right-1 bg-[#0da652] text-white p-0.5 rounded-full text-[7px] border border-white">
                    {isBike ? <Bike size={6} /> : <Car size={6} />}
                  </span>
                </div>

                {/* Driver floating name */}
                <div className="bg-slate-900/90 text-white text-[7.5px] font-bold px-1 py-0.2 rounded mt-0.5 shadow-sm whitespace-nowrap">
                  {r.name.split(' ')[0]} ({r.type})
                </div>
              </div>
            </div>
          );
        })}

        {/* STATION CLICKABLE PINS NODES */}
        {STATIONS.map((st) => {
          const isFrom = fromLoc === st.name;
          const isTo = toLoc === st.name;
          const isSelected = isFrom || isTo;

          return (
            <button
              key={st.name}
              onClick={() => handleStationClick(st.name)}
              className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none transition-transform hover:scale-115 active:scale-95"
              style={{ left: `${st.x}%`, top: `${st.y}%` }}
              title={`ক্লিক করুন: ${st.desc}`}
            >
              <div className="relative flex flex-col items-center">
                {/* Radar ping for selected point */}
                {isSelected && (
                  <span className={`absolute -inset-2.5 rounded-full animate-ping ${isFrom ? 'bg-[#0da652]/30' : 'bg-indigo-500/30'}`}></span>
                )}

                {/* Styled Pin Marker */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all border-2 ${
                  isFrom ? 'bg-[#0da652] text-white border-white scale-110' :
                  isTo ? 'bg-indigo-600 text-white border-white scale-110' :
                  'bg-white text-slate-700 border-slate-300 hover:border-[#0da652]'
                }`}>
                  <MapPin size={15} className={isSelected ? 'animate-bounce' : ''} />
                </div>

                {/* Popover labels */}
                <div className={`mt-1 font-bold text-[10px] px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap border ${
                  isFrom ? 'bg-emerald-600 text-white border-emerald-500' :
                  isTo ? 'bg-indigo-600 text-white border-indigo-500' :
                  'bg-white text-slate-800 border-slate-150'
                }`}>
                  {st.name}
                  {isFrom && ' (যাত্রা)'}
                  {isTo && ' (গন্তব্য)'}
                </div>
              </div>
            </button>
          );
        })}

        {/* Compass indicator overlay */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm p-1.5 rounded-xl border border-slate-100 flex items-center gap-1 shadow-sm">
          <Navigation size={12} className="text-[#0da652] rotate-45" />
          <span className="text-[9px] font-bold text-slate-650">লাইভ ট্র্যাকিং সক্রিয়</span>
        </div>

      </div>

      {/* Selected travel feedback and quick clean button */}
      <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-3 flex items-center justify-between text-xs gap-3">
        <div className="flex items-start gap-2">
          <Info size={16} className="text-[#0da652] flex-shrink-0 mt-0.5" />
          <div className="text-[11px] leading-relaxed text-slate-600">
            {fromLoc || toLoc ? (
              <p className="flex items-center flex-wrap gap-1">
                সক্রিয় ফিল্টার: 
                {fromLoc && <span className="bg-[#0da652]/10 text-[#0da652] px-2 py-0.5 rounded-lg font-bold">{fromLoc} (যাত্রা)</span>}
                {toLoc && <ArrowRight size={10} className="text-slate-400" />}
                {toLoc && <span className="bg-indigo-50/80 text-indigo-700 px-2 py-0.5 rounded-lg font-bold">{toLoc} (গন্তব্য)</span>}
              </p>
            ) : (
              <p>রুট বরাবর যেকোনো স্টেশনে ট্যাপ করে সরাসরি গাড়ি সার্চ করুন। আমাদের সার্ভিস রুট: <strong className="text-slate-800">পাইকগাছা ➔ কপিলমুনি ➔ খুলনা ➔ ঢাকা</strong>।</p>
            )}
          </div>
        </div>

        {(fromLoc || toLoc) && (
          <button 
            onClick={clearFilters}
            className="text-red-500 hover:text-red-600 hover:underline font-bold text-[10.5px] shrink-0 active:scale-95 transition-transform"
          >
            ফিল্টার মুছুন
          </button>
        )}
      </div>

    </div>
  );
};
