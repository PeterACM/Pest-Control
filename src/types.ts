export type PageView = 'home' | 'about' | 'services' | 'testimonials' | 'blog' | 'contact';

export interface ServiceItem {
  id: string;
  name: string;
  category: 'pest' | 'handyman';
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  bioAdvantage: string;
  priceEstimate: string;
  isFlagship?: boolean;
}

export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string[];
  readTime: string;
  date: string;
  author: string;
  tags: string[];
  seoDescription: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  suburb: string;
  quote: string;
  rating: number;
  serviceType: string;
  year: string;
  verifiedBadge?: boolean | string;
}

export interface BookingFormData {
  pestType: string;
  propertyType: 'apartment' | 'house' | 'commercial';
  suburb: string;
  propertySize: string;
  preferredDate: string;
  preferredTime: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  specialNotes: string;
  urgent: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'grant';
  text: string;
  timestamp: string;
}
