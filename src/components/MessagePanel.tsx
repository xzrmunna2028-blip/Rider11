import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCheck, Smile, Phone, Circle, MessageSquare, MapPin, Star, Sparkles, ChevronLeft } from 'lucide-react';
import { ChatThread, QUICK_MESSAGES } from '../types';

interface MessagePanelProps {
  chats: ChatThread[];
  onSendMessage: (threadId: string, text: string) => void;
  onReceiveSystemReply: (threadId: string, replyText: string) => void;
}

export const MessagePanel: React.FC<MessagePanelProps> = ({
  chats,
  onSendMessage,
  onReceiveSystemReply
}) => {
  const [activeThreadId, setActiveThreadId] = useState<string | null>(chats[0]?.id || null);
  const [isMobileThreadOpen, setIsMobileThreadOpen] = useState<boolean>(chats[0]?.id ? true : false);
  const [typedMessage, setTypedMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const activeThread = chats.find(c => c.id === activeThreadId);

  // Automatically open the thread view on mobile screens when activeThreadId changes
  useEffect(() => {
    if (activeThreadId) {
      setIsMobileThreadOpen(true);
    }
  }, [activeThreadId]);

  // Scroll to bottom whenever messages or typing status updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThread?.messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim() || !activeThreadId) return;
    
    // 1. Send user message
    onSendMessage(activeThreadId, text);
    setTypedMessage('');

    // Start authentic "rider is typing" visual effect
    setIsTyping(true);

    // 2. Trigger smart simulated reply based on user message text after 1500ms
    setTimeout(() => {
      let reply = 'ধন্যবাদ ভাই, আমি দেখতেছি।';
      const promptLower = text.toLowerCase();
      
      if (promptLower.includes('কোথায়') || promptLower.includes('গাড়ি')) {
        reply = 'ভাই আমি স্ট্যান্ডের কাছেই আছি, এখনই স্টার্ট করতেছি।';
      } else if (promptLower.includes('কতক্ষণ') || promptLower.includes('সময়')) {
        reply = '৫ থেকে ১০ মিনিটের মধ্যে আসছি ইনশাআল্লাহ।';
      } else if (promptLower.includes('দাঁড়িয়ে') || promptLower.includes('লোকেশনে')) {
        reply = 'হুম ভাইয়া, আমি দেখতে পেয়েছি আপনাকে। একটু অপেক্ষা করুন।';
      } else if (promptLower.includes('কম') || promptLower.includes('ভাড়া') || promptLower.includes('কমানো')) {
        reply = 'ভাই একদম সীমিত ভাড়ার পোস্ট করা হয়েছে, জাস্ট খরচ টুকু উঠানোর জন্য।';
      } else if (promptLower.includes('সিট') || promptLower.includes('কনফার্ম')) {
        reply = 'আপনার সিট কনফার্ম করা হয়েছে ভাই। ঠিক সময়ে চলে আসুন।';
      } else if (promptLower.includes('রওনা') || promptLower.includes('বাহির')) {
        reply = 'হ্যাঁ ভাই, গাড়ি স্টার্ট দিয়ে দিয়েছি। ৪ মিনিটের মধ্যে চলে আসবো।';
      }
      
      onReceiveSystemReply(activeThreadId, reply);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-150 shadow-sm overflow-hidden flex flex-col md:flex-row h-[580px]">
      
      {/* Thread list (Left panel) */}
      <div className={`w-full md:w-80 border-r border-slate-150 flex flex-col bg-slate-50/50 ${
        isMobileThreadOpen ? 'hidden md:flex' : 'flex'
      }`}>
        <div className="p-4 border-b border-slate-150 bg-white">
          <h3 className="font-extrabold text-slate-800 text-sm md:text-base flex items-center gap-1.5">
            <MessageSquare size={16} className="text-[#0da652]" />
            <span>বার্তালাপ বক্স</span>
          </h3>
          <p className="text-slate-400 text-[10px] md:text-[11px] mt-0.5">সবগুলো একটিভ চ্যাট হিস্ট্রি দেখুন</p>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {chats.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs flex flex-col items-center justify-center space-y-2 h-full bg-white">
              <span className="text-2xl">💬</span>
              <p className="font-bold">কোন চ্যাট থ্রেড নেই!</p>
              <p className="text-[10px]">রাইড পোস্ট বুক করার পর সরাসরি ড্রাইভারের সাথে বার্তালাপ শুরু হবে।</p>
            </div>
          ) : (
            chats.map((c) => {
              const selected = c.id === activeThreadId;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setActiveThreadId(c.id);
                    setIsTyping(false);
                    setIsMobileThreadOpen(true);
                  }}
                  className={`w-full text-left p-4 transition-all flex items-center gap-3 relative border-b border-slate-100 ${
                    selected 
                      ? 'bg-emerald-50/75 border-l-4 border-emerald-600 shadow-sm' 
                      : 'bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img 
                      src={c.driverAvatar} 
                      alt={c.driverName}
                      className="w-11 h-11 rounded-full object-cover border border-slate-200 shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-extrabold text-slate-800 text-xs truncate">{c.driverName}</span>
                      <span className="text-[10px] text-slate-400 font-mono font-bold shrink-0">{c.lastTime}</span>
                    </div>
                    
                    <p className="text-slate-500 text-xs truncate font-medium pr-2 leading-relaxed">
                      {c.lastMessage}
                    </p>
                    
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="inline-block bg-emerald-50 text-emerald-800 text-[9px] px-2 py-0.5 rounded font-bold border border-emerald-100">
                        {c.vehicleType || 'Car'}
                      </span>
                    </div>
                  </div>

                  {c.unread && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-emerald-600 rounded-full animate-pulse shadow-sm"></span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Main chatting board (Right panel) */}
      <div className={`flex-1 flex flex-col bg-slate-55/40 relative ${
        isMobileThreadOpen ? 'flex' : 'hidden md:flex'
      }`}>
        {activeThread ? (
          <>
            {/* Thread driver top details header card */}
            <div className="p-4 bg-white border-b border-slate-150 flex items-center justify-between shadow-sm z-10">
              <div className="flex items-center gap-2">
                {/* Back to List button for mobile */}
                <button
                  type="button"
                  onClick={() => setIsMobileThreadOpen(false)}
                  className="p-2 -ml-2 text-slate-500 hover:text-[#0da652] hover:bg-slate-50 rounded-xl md:hidden transition-all flex items-center justify-center shrink-0"
                  title="বার্তা তালিকায় ফিরুন"
                >
                  <ChevronLeft size={20} strokeWidth={2.5} />
                </button>

                <div className="relative shrink-0">
                  <img 
                    src={activeThread.driverAvatar} 
                    alt={activeThread.driverName}
                    className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-extrabold text-slate-800 text-sm whitespace-nowrap">{activeThread.driverName}</h4>
                    <span className="bg-emerald-50 text-emerald-700 text-[9px] px-1.5 py-0.2 rounded-full border border-emerald-100 font-extrabold flex items-center gap-0.5">
                      <Sparkles size={8} fill="currentColor" /> চালক
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 whitespace-nowrap">
                      <Circle size={6} className="fill-emerald-500 text-emerald-500" /> বর্তমানে লাইভ
                    </span>
                    <span className="text-[10px] text-amber-500 font-bold flex items-center gap-0.5 whitespace-nowrap">
                      ★ ৪.৮
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Dialer call button */}
              <a 
                href={`tel:${activeThread.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  alert(`ড্রাইভারের অফিসিয়াল মোবাইল নাম্বার: ${activeThread.id}\nকল করা হচ্ছে...`);
                  window.location.href = `tel:${activeThread.id}`;
                }}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-3 py-2.5 rounded-xl shadow-lg shadow-emerald-100 transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <Phone size={13} className="animate-wiggle" /> 
                <span className="hidden sm:inline">কল করুন</span>
              </a>
            </div>

            {/* Bubble logs Workspace list with real-time design */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/40" style={{ backgroundImage: "radial-gradient(#10b98110 0.8px, transparent 0.8px)", backgroundSize: "16px 16px" }}>
              
              <div className="text-center my-2">
                <span className="bg-slate-100 border border-slate-200 text-slate-400 text-[9px] font-bold px-3 py-1 rounded-full shadow-xs uppercase tracking-wider font-sans">
                  আজকের বার্তালাপ
                </span>
              </div>

              {activeThread.messages.map((m) => {
                const isUser = m.sender === 'user';
                return (
                  <div 
                    key={m.id}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-end gap-2`}
                  >
                    {/* Render small driver avatar beside incoming message */}
                    {!isUser && (
                      <img 
                        src={activeThread.driverAvatar} 
                        alt={activeThread.driverName}
                        className="w-7 h-7 rounded-full object-cover border border-slate-200 shadow-sm shrink-0 mb-1"
                        referrerPolicy="no-referrer"
                      />
                    )}

                    <div className={`max-w-[75%] rounded-2xl p-3 shadow-md border leading-relaxed ${
                      isUser 
                        ? 'bg-[#0da652] text-white rounded-tr-none border-emerald-500/10' 
                        : 'bg-white text-slate-800 rounded-tl-none border-slate-150'
                    }`}>
                      <p className="text-xs font-semibold whitespace-pre-line">{m.text}</p>
                      
                      <div className={`flex items-center gap-1 mt-1.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
                        <span className={`text-[8.5px] font-mono ${isUser ? 'text-emerald-100 font-semibold' : 'text-slate-400 font-bold'}`}>
                          {m.time}
                        </span>
                        {isUser && <CheckCheck size={11} className="text-emerald-100 shrink-0" />}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Dynamic typed indication */}
              {isTyping && (
                <div className="flex justify-start items-end gap-2 animate-pulse mt-2">
                  <img 
                    src={activeThread.driverAvatar} 
                    alt={activeThread.driverName}
                    className="w-7 h-7 rounded-full object-cover border border-slate-200 shadow-xs shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="bg-white border border-slate-150 text-slate-800 rounded-2xl rounded-tl-none px-4 py-2.5 shadow-sm max-w-[150px] flex items-center gap-1.5">
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="w-1.5 h-1.5 bg-[#0da652] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-[#0da652] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1.5 h-1.5 bg-[#0da652] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                    <span className="text-[10px] text-[#0da652] font-bold">টাইপ করছে...</span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Intelligent presets quick-update chips bar */}
            <div className="px-4 py-3 bg-white border-t border-slate-100">
              <span className="text-[9px] text-[#0da652] font-extrabold uppercase tracking-wide block mb-1.5">💡 দ্রুত মেসেজ পাঠান:</span>
              <div className="flex gap-2 overflow-x-auto whitespace-nowrap pb-1.5 scrollbar-thin">
                {QUICK_MESSAGES.map((qm, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(qm)}
                    className="bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-800 text-[11px] px-3.5 py-2 rounded-full font-extrabold transition-all active:scale-95"
                  >
                    {qm}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer custom text input layout exactly like premium platforms */}
            <div className="p-3 bg-white border-t border-slate-150 flex items-center gap-2">
              <input
                type="text"
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                onKeyDown={(e) => { 
                  if (e.key === 'Enter') {
                    handleSend(typedMessage); 
                  }
                }}
                placeholder="ড্রাইভারের উদ্দেশ্যে বার্তাটি এখানে লিখুন..."
                className="flex-1 bg-slate-50 border border-slate-200 hover:border-slate-350 focus:border-emerald-500 focus:bg-white rounded-2xl px-4 py-3 text-xs text-slate-800 focus:outline-none transition-all font-semibold"
              />
              <button
                onClick={() => handleSend(typedMessage)}
                disabled={!typedMessage.trim()}
                className="p-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-150 disabled:text-slate-400 text-white rounded-2xl transition-all shadow-md active:scale-95 flex items-center justify-center shrink-0"
              >
                <Send size={15} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center space-y-3">
            <span className="text-4xl">💬</span>
            <span className="text-sm font-extrabold text-slate-700">একটি চ্যাট বা রাইডার সিলেক্ট করুন</span>
            <p className="text-[11px] text-slate-450 max-w-xs leading-relaxed font-semibold">
              কপিলমুনি রাইড চালক বা রাইডারদের তালিকা থেকে যোগাযোগ করতে বাম পাশের প্যানেল মেম্বারদের উপরে ক্লিক করুন।
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
