export type CategoryType = 'items' | 'services' | 'jobs' | 'cars' | 'properties';

export interface Listing {
  id: string;
  title: string;
  price: number | string;
  currency: string;
  location: string;
  image: string;
  category: CategoryType;
  description: string;
  seller: {
    name: string;
    verified: boolean;
    phone: string;
    rating: number;
  };
  postedAt: string;
  features?: string[]; // For cars/properties
  tags?: string[];
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  description: string;
  postedAt: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: Date;
}

export interface ChatPreview {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  unread: number;
  timestamp: string;
}

export type ViewState = 'splash' | 'home' | 'explore' | 'post' | 'messages' | 'profile' | 'detail' | 'jobs';

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}
