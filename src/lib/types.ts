export type PropertyType = 'plot' | 'villa' | 'house' | 'commercial';
export type PropertyStatus = 'available' | 'booked' | 'sold' | 'upcoming';
export type AreaUnit = 'sq.ft' | 'sq.yards' | 'cents' | 'acres';

export interface Property {
  id: string;
  slug: string;
  title: string;
  type: PropertyType;
  status: PropertyStatus;
  featured: boolean;
  location: string;
  address: string;
  price: number;
  priceLabel: string; // e.g. "₹ 24 Lakhs onwards" or "Contact for Price"
  area: number;
  areaUnit: AreaUnit;
  dimensions?: string; // e.g. "30 x 40 ft"
  facing?: string; // e.g. "East Facing", "North-East Corner"
  bedrooms?: number;
  bathrooms?: number;
  description: string;
  highlights: string[];
  amenities: string[];
  images: string[];
  floorPlanUrl?: string;
  videoUrl?: string;
  reraApproved?: boolean;
  dtcpApproved?: boolean;
  possessionDate?: string;
  createdAt: string;
  updatedAt: string;
}

export type LeadStatus = 'New' | 'Contacted' | 'Site Visit Scheduled' | 'Follow Up' | 'Converted' | 'Closed';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  interestedPropertyId?: string;
  interestedPropertyName?: string;
  propertyType?: string;
  source: string; // e.g. "Website Form", "Site Visit Page", "Property Page"
  message?: string;
  status: LeadStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type SiteVisitStatus = 'Requested' | 'Confirmed' | 'Completed' | 'Rescheduled' | 'Cancelled';

export interface SiteVisit {
  id: string;
  name: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  propertyId?: string;
  propertyName: string;
  preferredDate: string;
  preferredTime: string;
  attendeesCount?: number;
  pickupRequired?: boolean;
  message?: string;
  status: SiteVisitStatus;
  notes?: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  role?: string;
  rating: number; // 1 to 5
  comment: string;
  propertyName?: string;
  avatarUrl?: string;
  isPublished: boolean;
  createdAt: string;
}

export interface LocationItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  imageUrl: string;
  isActive: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
  ctaText: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'plots' | 'villas' | 'houses' | 'office' | 'developments';
  imageUrl: string;
  caption?: string;
  featured: boolean;
  createdAt: string;
}

export interface CMSSettings {
  businessName: string;
  founderName: string;
  founderTitle: string;
  founderAddress: string;
  businessAddress: string;
  primaryPhone: string;
  whatsappNumber: string;
  email: string;
  instagram: string;
  youtube: string;
  heroHeadline: string;
  heroSubheadline: string;
  aboutStory: string;
  bannerNotice?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
}
