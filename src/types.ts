/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type VehicleCategory = 'Car' | 'Bike' | 'CNG' | 'Micro' | 'Pickup';

export interface Driver {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  phone: string;
}

export interface RidePost {
  id: string;
  driver: Driver;
  from: string;
  to: string;
  price: number;
  time: string;
  category: VehicleCategory;
  seatsTotal: number;
  seatsAvailable: number;
  tagline?: string;
  phone: string;
}

export interface Booking {
  id: string;
  ride: RidePost;
  bookedSeats: number;
  status: 'Pending' | 'Approved' | 'Ongoing' | 'Completed' | 'Cancelled';
  timestamp: string;
}

export interface MessageLine {
  id: string;
  sender: 'user' | 'driver';
  text: string;
  time: string;
}

export interface ChatThread {
  id: string; // matches ride.id
  driverName: string;
  driverAvatar: string;
  vehicleType: VehicleCategory;
  lastMessage: string;
  lastTime: string;
  messages: MessageLine[];
  unread: boolean;
}

export interface AppState {
  screen: 'signup' | 'login' | 'dashboard';
  dashboardTab: 'home' | 'my-rides' | 'post-ride' | 'messages' | 'profile';
  user: {
    name: string;
    phone: string;
    isLoggedIn: boolean;
    walletBalance: number;
    avatar: string;
  };
  rides: RidePost[];
  bookings: Booking[];
  chats: ChatThread[];
  selectedCategory: 'All' | VehicleCategory;
  fromFilter: string;
  toFilter: string;
  currentLocation: string;
}

export const INITIAL_DRIVERS: Driver[] = [
  {
    id: 'd-1',
    name: 'তৌফিক হাসান',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 4.8,
    phone: '01712345678'
  },
  {
    id: 'd-2',
    name: 'রাকিবুল ইসলাম',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 4.7,
    phone: '01815522334'
  },
  {
    id: 'd-3',
    name: 'মেহেদী হাসান',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    rating: 4.9,
    phone: '01912445566'
  },
  {
    id: 'd-4',
    name: 'তরিকুল ইসলাম',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    rating: 4.6,
    phone: '01309876543'
  },
  {
    id: 'd-5',
    name: 'আসলাম শেখ',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    rating: 4.5,
    phone: '01512334455'
  }
];

export const INITIAL_RIDES: RidePost[] = [
  {
    id: 'ride-1',
    driver: INITIAL_DRIVERS[0],
    from: 'কপিলমুনি',
    to: 'ঢাকা',
    price: 250,
    time: 'আজ, ১০:৩০ AM',
    category: 'Car',
    seatsTotal: 4,
    seatsAvailable: 3,
    tagline: 'নিরাপদ ও আরামদায়ক ভ্রমণ আপনার হাতের মুঠোয়',
    phone: INITIAL_DRIVERS[0].phone
  },
  {
    id: 'ride-2',
    driver: INITIAL_DRIVERS[1],
    from: 'কপিলমুনি',
    to: 'খুলনা',
    price: 300,
    time: 'আজ, ১১:০০ AM',
    category: 'Car',
    seatsTotal: 4,
    seatsAvailable: 2,
    tagline: 'লাক্সারি প্রাইভেট কার, এসি অন থাকবে',
    phone: INITIAL_DRIVERS[1].phone
  },
  {
    id: 'ride-3',
    driver: INITIAL_DRIVERS[2],
    from: 'পাইকগাছা',
    to: 'কপিলমুনি',
    price: 60,
    time: 'আজ, ১২:১৫ PM',
    category: 'CNG',
    seatsTotal: 3,
    seatsAvailable: 3,
    tagline: 'লোকাল রেটে কপিলমুনি জরুরি যাতায়াত',
    phone: INITIAL_DRIVERS[2].phone
  },
  {
    id: 'ride-4',
    driver: INITIAL_DRIVERS[3],
    from: 'খুলনা',
    to: 'কপিলমুনি',
    price: 180,
    time: 'আজ, ০১:৪৫ PM',
    category: 'Bike',
    seatsTotal: 1,
    seatsAvailable: 1,
    tagline: 'দ্রুত পৌঁছাতে ওয়ান-টু-ওয়ান রাইড। হেলমেট দেয়া হবে।',
    phone: INITIAL_DRIVERS[3].phone
  },
  {
    id: 'ride-5',
    driver: INITIAL_DRIVERS[4],
    from: 'ঢাকা',
    to: 'কপিলমুনি',
    price: 1200,
    time: 'আজ, ০৩:৩০ PM',
    category: 'Micro',
    seatsTotal: 10,
    seatsAvailable: 8,
    tagline: 'খুলনা হয়ে কপিলমুনি হাইওয়ে মাইক্রোবাস সার্ভিস।',
    phone: INITIAL_DRIVERS[4].phone
  }
];

export const LOCATIONS = [
  'কপিলমুনি', 'পাইকগাছা', 'খুলনা', 'ঢাকা', 'বাগেরহাট', 'সাতক্ষীরা', 'যশোর', 'ঝিনাইদহ', 'মাগুরা', 'নড়াইল', 'কুষ্টিয়া', 'মেহেরপুর', 'চুয়াডাঙ্গা', 'বরিশাল', 'ভোলা', 'পটুয়াখালী', 'পিরোজপুর', 'ঝালকাঠি', 'বরগুনা', 'চট্টগ্রাম', 'কক্সবাজার', 'রাঙ্গামাটি', 'বান্দরবান', 'খাগড়াছড়ি', 'ফেনী', 'লক্ষ্মীপুর', 'কুমিল্লা', 'চাঁদপুর', 'ব্রাহ্মণবাড়ীয়া', 'সিলেট', 'মৌলভীবাজার', 'হবিগঞ্জ', 'সুনামগঞ্জ', 'রাজশাহী', 'নাটোর', 'পাবনা', 'বগুড়া', 'জয়পুরহাট', 'নওগাঁ', 'সিরাজগঞ্জ', 'চাঁপাইনবাবগঞ্জ', 'রংপুর', 'দিনাজপুর', 'পঞ্চগড়', 'ঠাকুরগাঁও', 'গাইবান্ধা', 'কুড়িগ্রাম', 'নীলফামারী', 'লালমনিরহাট', 'ময়মনসিংহ', 'নেত্রকোণা', 'শেরপুর', 'জামালপুর', 'গাজীপুর', 'নারায়ণগঞ্জ', 'মুন্সীগঞ্জ', 'ফরিদপুর', 'মাদারীপুর', 'শরীয়তপুর', 'রাজবাড়ী', 'গোপালগঞ্জ', 'মানিকগঞ্জ', 'টাঙ্গাইল', 'নরসিংদী', 'কিশোরগঞ্জ'
];

export const BANGLADESH_DISTRICTS = LOCATIONS;

export const QUICK_MESSAGES = [
  'আসসালামু আলাইকুম ভাই, গাড়ি কোথায় আছে?',
  'কতক্ষণ লাগবে আসতে?',
  'আমি লোকেশনে দাঁড়িয়ে আছি ভাই।',
  'রওনা হয়েছেন কি ভাই?',
  'ভাড়া কি কিছুটা কম রাখা যাবে?',
  'আমার সিট নিশ্চিত করুন দয়া করে।'
];

export const MAP_DRIVER_POSITIONS = [
  { id: 'pos-1', name: 'তৌফিক হাসান', lat: 25, lng: 45, type: 'Car' as VehicleCategory },
  { id: 'pos-2', name: 'রাকিবুল ইসলাম', lat: 60, lng: 75, type: 'Car' as VehicleCategory },
  { id: 'pos-3', name: 'মেহেদী হাসান', lat: 35, lng: 20, type: 'CNG' as VehicleCategory },
  { id: 'pos-4', name: 'তরিকুল ইসলাম', lat: 80, lng: 55, type: 'Bike' as VehicleCategory }
];
