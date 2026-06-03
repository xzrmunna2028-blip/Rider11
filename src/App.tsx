import React, { useState, useEffect } from 'react';
import { SignupScreen } from './components/SignupScreen';
import { LoginScreen } from './components/LoginScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { MyRidesPanel } from './components/MyRidesPanel';
import { PostRidePanel } from './components/PostRidePanel';
import { MessagePanel } from './components/MessagePanel';
import { ProfilePanel } from './components/ProfilePanel';
import { 
  AppState, 
  Booking, 
  ChatThread, 
  INITIAL_RIDES, 
  RidePost, 
  VehicleCategory 
} from './types';

// Root application layout and state manager
export default function App() {
  const [state, setState] = useState<AppState>(() => {
    // Attempt local storage restoring
    try {
      const savedUser = localStorage.getItem('pkkd_user');
      const savedRides = localStorage.getItem('pkkd_rides');
      const savedBookings = localStorage.getItem('pkkd_bookings');
      const savedChats = localStorage.getItem('pkkd_chats');

      return {
        screen: savedUser ? 'dashboard' : 'login',
        dashboardTab: 'home',
        user: savedUser ? JSON.parse(savedUser) : {
          name: 'সম্মানিত ইউজার',
          phone: '',
          isLoggedIn: false,
          walletBalance: 1250,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'
        },
        rides: savedRides ? JSON.parse(savedRides) : INITIAL_RIDES,
        bookings: savedBookings ? JSON.parse(savedBookings) : [],
        chats: savedChats ? JSON.parse(savedChats) : [],
        selectedCategory: 'All',
        fromFilter: '',
        toFilter: '',
        currentLocation: 'কপিলমুনি'
      };
    } catch (e) {
      // Fallback
      return {
        screen: 'login',
        dashboardTab: 'home',
        user: {
          name: 'সম্মানিত ইউজার',
          phone: '',
          isLoggedIn: false,
          walletBalance: 1250,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'
        },
        rides: INITIAL_RIDES,
        bookings: [],
        chats: [],
        selectedCategory: 'All',
        fromFilter: '',
        toFilter: '',
        currentLocation: 'কপিলমুনি'
      };
    }
  });

  // Keep local storage synchronized
  useEffect(() => {
    localStorage.setItem('pkkd_user', JSON.stringify(state.user));
    localStorage.setItem('pkkd_rides', JSON.stringify(state.rides));
    localStorage.setItem('pkkd_bookings', JSON.stringify(state.bookings));
    localStorage.setItem('pkkd_chats', JSON.stringify(state.chats));
  }, [state.user, state.rides, state.bookings, state.chats]);

  // Tab switcher
  const handleTabChange = (tab: AppState['dashboardTab']) => {
    setState(prev => ({ ...prev, dashboardTab: tab }));
  };

  // Category selection filter
  const handleCategorySelect = (cat: 'All' | VehicleCategory) => {
    setState(prev => ({ ...prev, selectedCategory: cat }));
  };

  // Location filters selection
  const handleFilterChange = (from: string, to: string) => {
    setState(prev => ({ 
      ...prev, 
      fromFilter: from, 
      toFilter: to,
      currentLocation: from ? from : prev.currentLocation
    }));
  };

  // Passenger registers/Signs up
  const handleSignupSuccess = (name: string, phone: string) => {
    setState(prev => ({
      ...prev,
      screen: 'dashboard',
      dashboardTab: 'home',
      user: {
        ...prev.user,
        name,
        phone,
        isLoggedIn: true
      }
    }));
  };

  // Passenger logs in
  const handleLoginSuccess = (name: string, phone: string) => {
    setState(prev => ({
      ...prev,
      screen: 'dashboard',
      dashboardTab: 'home',
      user: {
        ...prev.user,
        name,
        phone,
        isLoggedIn: true
      }
    }));
  };

  // Log out
  const handleLogout = () => {
    setState(prev => ({
      ...prev,
      screen: 'login',
      user: {
        name: 'সম্মানিত ইউজার',
        phone: '',
        isLoggedIn: false,
        walletBalance: 1250,
        avatar: prev.user.avatar
      },
      bookings: [],
      chats: []
    }));
    localStorage.removeItem('pkkd_user');
    localStorage.removeItem('pkkd_bookings');
    localStorage.removeItem('pkkd_chats');
  };

  // Booking seat action
  const handleBookSeats = (rideId: string, bookedSeats: number) => {
    const selectedRide = state.rides.find(r => r.id === rideId);
    if (!selectedRide) return;

    const totalCost = selectedRide.price * bookedSeats;

    const newBooking: Booking = {
      id: `book-${Date.now()}`,
      ride: { ...selectedRide },
      bookedSeats,
      status: 'Ongoing',
      timestamp: 'আজ, ' + new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })
    };

    // Auto-create/open associated chat thread for direct conversation
    const existingChat = state.chats.find(c => c.id === selectedRide.id);
    let updatedChats = [...state.chats];

    if (!existingChat) {
      const initialThread: ChatThread = {
        id: selectedRide.id,
        driverName: selectedRide.driver.name,
        driverAvatar: selectedRide.driver.avatar,
        vehicleType: selectedRide.category,
        lastMessage: `আসসালামু আলাইকুম, আমি ${bookedSeats}টি সিট বুক করেছি। গাড়ি কখন ছাড়বে?`,
        lastTime: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
        messages: [
          {
            id: `msg-${Date.now()}`,
            sender: 'user',
            text: `আসসালামু আলাইকুম, আমি ${bookedSeats}টি সিট বুক করেছি। গাড়ি কখন ছাড়বে?`,
            time: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })
          }
        ],
        unread: false
      };
      updatedChats = [initialThread, ...updatedChats];
    }

    setState(prev => ({
      ...prev,
      user: {
        ...prev.user,
        walletBalance: Math.max(0, prev.user.walletBalance - totalCost)
      },
      rides: prev.rides.map(r => r.id === rideId ? { ...r, seatsAvailable: Math.max(0, r.seatsAvailable - bookedSeats) } : r),
      bookings: [newBooking, ...prev.bookings],
      chats: updatedChats
    }));
  };

  // Cancel reservation
  const handleCancelBooking = (bookingId: string) => {
    const targetBooking = state.bookings.find(b => b.id === bookingId);
    if (!targetBooking) return;

    const refundAmnt = targetBooking.ride.price * targetBooking.bookedSeats;

    setState(prev => ({
      ...prev,
      user: {
        ...prev.user,
        walletBalance: prev.user.walletBalance + refundAmnt
      },
      rides: prev.rides.map(r => r.id === targetBooking.ride.id ? { ...r, seatsAvailable: Math.min(r.seatsTotal, r.seatsAvailable + targetBooking.bookedSeats) } : r),
      bookings: prev.bookings.filter(b => b.id !== bookingId)
    }));
  };

  // Open Direct Message thread
  const handleOpenChat = (rideId: string) => {
    const selectedRide = state.rides.find(r => r.id === rideId);
    if (!selectedRide) return;

    const existingChat = state.chats.find(c => c.id === rideId);
    if (!existingChat) {
      const newThread: ChatThread = {
        id: rideId,
        driverName: selectedRide.driver.name,
        driverAvatar: selectedRide.driver.avatar,
        vehicleType: selectedRide.category,
        lastMessage: 'যোগাযোগ শুরু করা হয়েছে 👋',
        lastTime: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
        messages: [
          {
            id: `msg-${Date.now()}`,
            sender: 'user',
            text: 'হ্যালো ভাইয়া, আপনার গাড়ি কাউন্টার থেকে কখন ছাড়বে?',
            time: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })
          }
        ],
        unread: false
      };
      setState(prev => ({
        ...prev,
        chats: [newThread, ...prev.chats],
        dashboardTab: 'messages'
      }));
    } else {
      setState(prev => ({
        ...prev,
        chats: [existingChat, ...prev.chats.filter(c => c.id !== rideId)],
        dashboardTab: 'messages'
      }));
    }
  };

  // Send message
  const handleSendMessage = (threadId: string, text: string) => {
    setState(prev => ({
      ...prev,
      chats: prev.chats.map(c => {
        if (c.id === threadId) {
          const nextMsg = {
            id: `msg-${Date.now()}`,
            sender: 'user' as const,
            text,
            time: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })
          };
          return {
            ...c,
            lastMessage: text,
            lastTime: nextMsg.time,
            messages: [...c.messages, nextMsg]
          };
        }
        return c;
      })
    }));
  };

  // Receive message reply from driver
  const handleReceiveSystemReply = (threadId: string, replyText: string) => {
    setState(prev => ({
      ...prev,
      chats: prev.chats.map(c => {
        if (c.id === threadId) {
          const nextMsg = {
            id: `msg-${Date.now()}`,
            sender: 'driver' as const,
            text: replyText,
            time: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })
          };
          return {
            ...c,
            lastMessage: replyText,
            lastTime: nextMsg.time,
            messages: [...c.messages, nextMsg],
            unread: true
          };
        }
        return c;
      })
    }));
  };

  // Add customized posted ride
  const handlePostCreated = (newRide: RidePost) => {
    setState(prev => ({
      ...prev,
      rides: [newRide, ...prev.rides],
      dashboardTab: 'home'
    }));
  };

  // Wallet updates
  const handleUpdateWallet = (newBalance: number) => {
    setState(prev => ({
      ...prev,
      user: {
        ...prev.user,
        walletBalance: newBalance
      }
    }));
  };

  return (
    <>
      {state.screen === 'signup' && (
        <SignupScreen 
          onBackToLogin={() => setState(prev => ({ ...prev, screen: 'login' }))} 
          onSignupSuccess={handleSignupSuccess}
        />
      )}

      {state.screen === 'login' && (
        <LoginScreen 
          onLoginSuccess={handleLoginSuccess}
          onNavigateToSignup={() => setState(prev => ({ ...prev, screen: 'signup' }))}
        />
      )}

      {state.screen === 'dashboard' && (
        <DashboardScreen
          appState={state}
          onTabChange={handleTabChange}
          onCategorySelect={handleCategorySelect}
          onFilterChange={handleFilterChange}
          onBookSeats={handleBookSeats}
          onOpenChat={handleOpenChat}
        >
          {state.dashboardTab === 'my-rides' && (
            <MyRidesPanel 
              bookings={state.bookings} 
              onCancelBooking={handleCancelBooking}
              onOpenChat={handleOpenChat}
            />
          )}

          {state.dashboardTab === 'post-ride' && (
            <PostRidePanel 
              userPhone={state.user.phone} 
              userName={state.user.name}
              onPostCreated={handlePostCreated}
            />
          )}

          {state.dashboardTab === 'messages' && (
            <MessagePanel 
              chats={state.chats} 
              onSendMessage={handleSendMessage}
              onReceiveSystemReply={handleReceiveSystemReply}
            />
          )}

          {state.dashboardTab === 'profile' && (
            <ProfilePanel 
              user={state.user} 
              onUpdateProfile={(name, avatar) => {
                setState(prev => ({
                  ...prev,
                  user: {
                    ...prev.user,
                    name,
                    avatar
                  }
                }));
              }}
              onUpdateWallet={handleUpdateWallet}
              onLogout={handleLogout}
            />
          )}
        </DashboardScreen>
      )}
    </>
  );
}
