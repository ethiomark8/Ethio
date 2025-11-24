import { Listing, JobListing, ChatPreview } from './types';

export const CITIES = [
  'Addis Ababa',
  'Dire Dawa',
  'Mekelle',
  'Gondar',
  'Bahir Dar',
  'Hawassa',
  'Jimma',
  'Adama',
];

export const CATEGORIES = [
  { id: 'items', name: 'Marketplace', icon: 'ShoppingBag' },
  { id: 'cars', name: 'Vehicles', icon: 'Car' },
  { id: 'properties', name: 'Real Estate', icon: 'Home' },
  { id: 'jobs', name: 'Jobs', icon: 'Briefcase' },
  { id: 'services', name: 'Services', icon: 'Wrench' },
];

export const FEATURED_LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'Toyota Vitz 2018 Compact',
    price: '1,200,000',
    currency: 'ETB',
    location: 'Bole, Addis Ababa',
    image: 'https://picsum.photos/400/300?random=1',
    category: 'cars',
    description: 'Excellent condition, low mileage, first owner. Automatic transmission.',
    seller: { name: 'Abebe Bikila', verified: true, phone: '0911234567', rating: 4.8 },
    postedAt: '2 hrs ago',
    features: ['Automatic', '35,000 km', 'Silver'],
  },
  {
    id: '2',
    title: 'Modern Apartment for Rent',
    price: '45,000',
    currency: 'ETB/mo',
    location: 'Kazanchis, Addis Ababa',
    image: 'https://picsum.photos/400/300?random=2',
    category: 'properties',
    description: '2 Bedroom furnished apartment with city view. Generator and elevator available.',
    seller: { name: 'Addis Homes', verified: true, phone: '0922334455', rating: 4.5 },
    postedAt: '5 hrs ago',
    features: ['2 Bed', 'Furnished', '120 sqm'],
  },
  {
    id: '3',
    title: 'MacBook Pro M1 2020',
    price: '85,000',
    currency: 'ETB',
    location: 'Piassa, Addis Ababa',
    image: 'https://picsum.photos/400/300?random=3',
    category: 'items',
    description: 'Slightly used, battery cycle 50. Comes with original charger.',
    seller: { name: 'Tech Hub', verified: false, phone: '0933445566', rating: 4.2 },
    postedAt: '1 day ago',
  },
];

export const JOB_LISTINGS: JobListing[] = [
  {
    id: 'j1',
    title: 'Senior Flutter Developer',
    company: 'EthioTelecom',
    location: 'Addis Ababa',
    salary: 'Negotiable',
    type: 'Full-time',
    description: 'Looking for an experienced mobile app developer.',
    postedAt: '1 day ago',
  },
  {
    id: 'j2',
    title: 'Marketing Manager',
    company: 'Zemen Bank',
    location: 'Addis Ababa',
    salary: '25,000 ETB',
    type: 'Full-time',
    description: 'Lead our digital marketing campaigns.',
    postedAt: '3 days ago',
  },
];

export const CHATS: ChatPreview[] = [
  {
    id: 'c1',
    name: 'Dawit Mekonnen',
    avatar: 'https://picsum.photos/100/100?random=10',
    lastMessage: 'Is the price negotiable?',
    unread: 2,
    timestamp: '10:30 AM',
  },
  {
    id: 'c2',
    name: 'Saron Alemu',
    avatar: 'https://picsum.photos/100/100?random=11',
    lastMessage: 'Location please?',
    unread: 0,
    timestamp: 'Yesterday',
  },
];
