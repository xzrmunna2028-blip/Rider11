/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RidePost {
  id: string;
  driverName: string;
  driverAvatar: string;
  driverRating: number;
  driverPhone: string;
  source: string;
  destination: string;
  category: 'Car' | 'Bike' | 'CNG' | 'Micro' | 'Pickup';
  seatsAvailable: number;
  seatsTotal: number;
  price: number;
  departureTime: string;
  status: 'active' | 'completed' | 'cancelled';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'driver';
  text: string;
  timestamp: string;
}

export interface ChatSession {
  driverId: string;
  driverName: string;
  driverAvatar: string;
  driverPhone: string;
  lastMessage: string;
  lastTimestamp: string;
  messages: ChatMessage[];
  unread: boolean;
}

export interface UserProfile {
  name: string;
  phone: string;
  role: 'passenger' | 'driver';
  avatar: string;
  walletBalance: number;
  isLoggedIn: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  type: 'booking' | 'payment' | 'system';
}

export const ROUTE_LOCATIONS = [
  'পাইকগাছা',
  'কপিলমুনি',
  'খুলনা',
  'ঢাকা'
];

export const INITIAL_RIDE_POSTS: RidePost[] = [
  {
    id: 'ride-1',
    driverName: 'তৌফিক হাসান',
    driverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    driverRating: 4.8,
    driverPhone: '01712345678',
    source: 'কপিলমুনি',
    destination: 'খুলনা',
    category: 'Car',
    seatsAvailable: 3,
    seatsTotal: 4,
    price: 250,
    departureTime: 'আজ, 10:30 AM',
    status: 'active'
  },
  {
    id: 'ride-2',
    driverName: 'রাকিবুল ইসলাম',
    driverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    driverRating: 4.7,
    driverPhone: '01812345679',
    source: 'পাইকগাছা',
    destination: 'ঢাকা',
    category: 'Car',
    seatsAvailable: 2,
    seatsTotal: 4,
    price: 300,
    departureTime: 'আজ, 11:00 AM',
    status: 'active'
  },
  {
    id: 'ride-3',
    driverName: 'বাপ্পী রহমান',
    driverAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    driverRating: 4.9,
    driverPhone: '01912345680',
    source: 'খুলনা',
    destination: 'পাইকগাছা',
    category: 'CNG',
    seatsAvailable: 2,
    seatsTotal: 3,
    price: 150,
    departureTime: 'আজ, 12:15 PM',
    status: 'active'
  },
  {
    id: 'ride-4',
    driverName: 'ইমরান খান',
    driverAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    driverRating: 4.6,
    driverPhone: '01512345681',
    source: 'ঢাকা',
    destination: 'কপিলমুনি',
    category: 'Micro',
    seatsAvailable: 6,
    seatsTotal: 10,
    price: 850,
    departureTime: 'আজ, 02:30 PM',
    status: 'active'
  },
  {
    id: 'ride-5',
    driverName: 'আরিফুল ইসলাম',
    driverAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    driverRating: 4.5,
    driverPhone: '01312345682',
    source: 'পাইকগাছা',
    destination: 'খুলনা',
    category: 'Bike',
    seatsAvailable: 1,
    seatsTotal: 1,
    price: 350,
    departureTime: 'আজ, 01:10 PM',
    status: 'active'
  },
  {
    id: 'ride-6',
    driverName: 'মেহেদী হাসান',
    driverAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
    driverRating: 4.8,
    driverPhone: '01612345683',
    source: 'খুলনা',
    destination: 'ঢাকা',
    category: 'Pickup',
    seatsAvailable: 1,
    seatsTotal: 2,
    price: 1500,
    departureTime: 'আজ, 04:00 PM',
    status: 'active'
  }
];

export const INITIAL_CHATS: ChatSession[] = [
  {
    driverId: 'ride-1',
    driverName: 'তৌফিক হাসান',
    driverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    driverPhone: '01712345678',
    lastMessage: 'হ্যাঁ ভাই, আমি কপিলমুনি বাসস্ট্যান্ডে আছি।',
    lastTimestamp: '১ মিনিট আগে',
    unread: true,
    messages: [
      { id: '1', sender: 'user', text: 'আসসালামু আলাইকুম তৌফিক ভাই, গাড়ির সিট খালি আছে?', timestamp: '10:15 AM' },
      { id: '2', sender: 'driver', text: 'ওয়ালাইকুম আসসালাম ভাই, হ্যাঁ, ৩টি সিট খালি আছে।', timestamp: '10:16 AM' },
      { id: '3', sender: 'user', text: 'আমি খুলনা যাবো, আপনার গাড়ি ঠিক কখন ছাড়বে?', timestamp: '10:17 AM' },
      { id: '4', sender: 'driver', text: 'হ্যাঁ ভাই, আমি কপিলমুনি বাসস্ট্যান্ডে আছি। সাড়ে ১০টার মধ্যে ছাড়বো।', timestamp: '10:18 AM' }
    ]
  },
  {
    driverId: 'ride-2',
    driverName: 'রাকিবুল ইসলাম',
    driverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    driverPhone: '01812345679',
    lastMessage: 'ঠিক আছে ভাই, আপনি পাইকগাছা থানা মোড়ে চলে আসুন।',
    lastTimestamp: '১০ মিনিট আগে',
    unread: false,
    messages: [
      { id: '1', sender: 'user', text: 'ভাইয়া, ঢাকা যাবেন কখন?', timestamp: '09:45 AM' },
      { id: '2', sender: 'driver', text: 'ভাইয়া, ১১:০০ টায় গাড়ি ছাড়বো।', timestamp: '09:47 AM' },
      { id: '3', sender: 'user', text: 'আমি পাইকগাছা থেকে উঠবো। সিট বুক করুন আমার জন্য।', timestamp: '09:50 AM' },
      { id: '4', sender: 'driver', text: 'ঠিক আছে ভাই, আপনি পাইকগাছা থানা মোড়ে চলে আসুন।', timestamp: '09:52 AM' }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n-1',
    title: 'বুকিং সফল হয়েছে!',
    body: 'তৌফিক হাসান এর গাড়িতে আপনার সফল বুকিং সম্পন্ন হয়েছে। গাড়ি ছাড়বে আজ সকাল ১০:৩০ টায়।',
    time: '২ মিনিট আগে',
    read: false,
    type: 'booking'
  },
  {
    id: 'n-2',
    title: 'নতুন রাইড পোস্ট',
    body: 'আপনার প্রিয় রুট পাইকগাছা থেকে খুলনায় নতুন রাইডার তৌফিক যুক্ত হয়েছেন।',
    time: '২০ মিনিট আগে',
    read: false,
    type: 'system'
  },
  {
    id: 'n-3',
    title: 'ওয়ালেট রিচার্জ সফল',
    body: 'আপনার ওয়ালেটে ৫০০ টাকা সফলভাবে যোগ করা হয়েছে। বর্তমান ব্যালেন্স ১২৫০ টাকা।',
    time: '১ ঘণ্টা আগে',
    read: true,
    type: 'payment'
  }
];

export const SUGGESTED_QUICK_MESSAGES = [
  'আসসালামু আলাইকুম ভাই, গাড়ি কোথায় আছে?',
  'কতক্ষণ লাগবে আসতে?',
  'আমি লোকেশনে দাঁড়িয়ে আছি ভাই।',
  'আমি কপিলমুনি বাসস্ট্যান্ডে আছি ভাই।',
  'গাড়ি ছাড়তে আর কতক্ষণ লাগবে?',
  'আমার সিটটা কনফার্ম রাখুন ভাই।'
];

export const DRIVER_MOCK_RESPONSES: Record<string, string[]> = {
  'ride-1': [
    'হ্যাঁ ভাই, আমি আসছি, ২ মিনিট লাগবে।',
    'ঠিক আছে ভাই, ম্যাপে আমার লাইভ ট্র্যাকিং দেখতে পারেন।',
    'গাড়ি এখনই ছাড়বে ভাই, আপনি জলদি আসুন।',
    'ওয়ালাইকুম আসসালাম, হ্যাঁ ভাই, আমি অপেক্ষা করছি।'
  ],
  'ride-2': [
    'আমি এখন জ্যামে আছি ভাই, ১০ মিনিট দেরি হতে পারে।',
    'ঠিক আছে ভাইয়া, আমি পৌঁছালে আপনাকে রিং দিবো।',
    'আপনার সিট নিশ্চিত করা হয়েছে।'
  ]
};
