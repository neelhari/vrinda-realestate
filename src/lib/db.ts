import { supabaseAdmin } from './supabase';
import { Property, Lead, SiteVisit, Testimonial, LocationItem, ServiceItem, GalleryItem, CMSSettings } from './types';
import { 
  initialCMS, 
  initialProperties, 
  initialLocations, 
  initialServices, 
  initialTestimonials, 
  initialLeads, 
  initialSiteVisits, 
  initialGallery 
} from './initial-data';

// In-memory cache for fast SSR renders and fallback
let cache = {
  cms: { ...initialCMS },
  properties: [...initialProperties],
  leads: [...initialLeads],
  siteVisits: [...initialSiteVisits],
  testimonials: [...initialTestimonials],
  locations: [...initialLocations],
  services: [...initialServices],
  gallery: [...initialGallery],
};

// Transformers: Postgres snake_case <-> TypeScript camelCase
function mapPropertyFromDb(row: any): Property {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    type: row.type,
    status: row.status,
    featured: Boolean(row.featured),
    location: row.location,
    address: row.address,
    price: Number(row.price) || 0,
    priceLabel: row.price_label || 'Contact for Price',
    area: Number(row.area) || 0,
    areaUnit: row.area_unit || 'sq.yards',
    dimensions: row.dimensions || '',
    facing: row.facing || '',
    bedrooms: row.bedrooms ? Number(row.bedrooms) : undefined,
    bathrooms: row.bathrooms ? Number(row.bathrooms) : undefined,
    description: row.description || '',
    highlights: Array.isArray(row.highlights) ? row.highlights : [],
    amenities: Array.isArray(row.amenities) ? row.amenities : [],
    images: Array.isArray(row.images) && row.images.length > 0 ? row.images : ['/images/category-plots.jpg'],
    videos: Array.isArray(row.videos) ? row.videos : (row.video_url ? [row.video_url] : []),
    floorPlanUrl: row.floor_plan_url || '',
    videoUrl: row.video_url || '',
    dtcpApproved: Boolean(row.dtcp_approved),
    reraApproved: Boolean(row.rera_approved),
    possessionDate: row.possession_date || 'Immediate',
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || new Date().toISOString()
  };
}

function mapPropertyToDb(p: Property): any {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    type: p.type,
    status: p.status,
    featured: Boolean(p.featured),
    location: p.location,
    address: p.address,
    price: Number(p.price) || 0,
    price_label: p.priceLabel || 'Contact for Price',
    area: Number(p.area) || 0,
    area_unit: p.areaUnit || 'sq.yards',
    dimensions: p.dimensions || null,
    facing: p.facing || null,
    bedrooms: p.bedrooms ? Number(p.bedrooms) : null,
    bathrooms: p.bathrooms ? Number(p.bathrooms) : null,
    description: p.description || '',
    highlights: Array.isArray(p.highlights) ? p.highlights : [],
    amenities: Array.isArray(p.amenities) ? p.amenities : [],
    images: Array.isArray(p.images) && p.images.length > 0 ? p.images : ['/images/category-plots.jpg'],
    videos: Array.isArray(p.videos) ? p.videos : [],
    floor_plan_url: p.floorPlanUrl || null,
    video_url: p.videoUrl || (Array.isArray(p.videos) && p.videos[0]) || null,
    dtcp_approved: Boolean(p.dtcpApproved),
    rera_approved: Boolean(p.reraApproved),
    possession_date: p.possessionDate || null,
    updated_at: new Date().toISOString()
  };
}

function mapLeadFromDb(row: any): Lead {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    whatsapp: row.whatsapp,
    email: row.email,
    interestedPropertyId: row.interested_property_id,
    interestedPropertyName: row.interested_property_name,
    propertyType: row.property_type,
    source: row.source || 'Website Form',
    message: row.message,
    status: row.status || 'New',
    notes: row.notes,
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || new Date().toISOString()
  };
}

function mapSiteVisitFromDb(row: any): SiteVisit {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    whatsapp: row.whatsapp,
    email: row.email,
    propertyId: row.property_id,
    propertyName: row.property_name,
    preferredDate: row.preferred_date,
    preferredTime: row.preferred_time,
    attendeesCount: row.attendees_count || 1,
    pickupRequired: Boolean(row.pickup_required),
    message: row.message,
    status: row.status || 'Requested',
    notes: row.notes,
    createdAt: row.created_at || new Date().toISOString()
  };
}

function mapTestimonialFromDb(row: any): Testimonial {
  return {
    id: row.id,
    name: row.name,
    location: row.location,
    role: row.role,
    rating: row.rating || 5,
    comment: row.comment,
    propertyName: row.property_name,
    avatarUrl: row.avatar_url,
    isPublished: row.is_published !== false,
    createdAt: row.created_at || new Date().toISOString()
  };
}

function mapLocationFromDb(row: any): LocationItem {
  return {
    id: row.id,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    highlights: Array.isArray(row.highlights) ? row.highlights : [],
    imageUrl: row.image_url || '/images/category-plots.jpg',
    isActive: row.is_active !== false
  };
}

function mapGalleryFromDb(row: any): GalleryItem {
  return {
    id: row.id,
    title: row.title,
    category: row.category || 'plots',
    imageUrl: row.image_url || '/images/category-plots.jpg',
    caption: row.caption,
    featured: Boolean(row.featured),
    createdAt: row.created_at || new Date().toISOString()
  };
}

function mapCMSFromDb(row: any): CMSSettings {
  return {
    businessName: row.business_name || initialCMS.businessName,
    founderName: row.founder_name || initialCMS.founderName,
    founderTitle: row.founder_title || initialCMS.founderTitle,
    founderAddress: row.founder_address || initialCMS.founderAddress,
    businessAddress: row.business_address || initialCMS.businessAddress,
    primaryPhone: row.primary_phone || initialCMS.primaryPhone,
    whatsappNumber: row.whatsapp_number || initialCMS.whatsappNumber,
    email: row.email || initialCMS.email,
    instagram: row.instagram || initialCMS.instagram,
    youtube: row.youtube || initialCMS.youtube,
    heroHeadline: row.hero_headline || initialCMS.heroHeadline,
    heroSubheadline: row.hero_subheadline || initialCMS.heroSubheadline,
    aboutStory: row.about_story || initialCMS.aboutStory,
    bannerNotice: row.banner_notice || undefined,
    promoBanners: Array.isArray(row.promo_banners) && row.promo_banners.length > 0 ? row.promo_banners : initialCMS.promoBanners,
  };
}

export const db = {
  // CMS
  getCMS: (): CMSSettings => {
    return cache.cms;
  },
  fetchCMS: async (): Promise<CMSSettings> => {
    try {
      const { data, error } = await supabaseAdmin
        .from('cms_settings')
        .select('*')
        .eq('id', 'default')
        .single();
      if (!error && data) {
        cache.cms = mapCMSFromDb(data);
      }
    } catch (err) {
      console.warn('Supabase fetchCMS fallback:', err);
    }
    return cache.cms;
  },
  updateCMS: async (updates: Partial<CMSSettings>): Promise<CMSSettings> => {
    cache.cms = { ...cache.cms, ...updates };
    try {
      await supabaseAdmin.from('cms_settings').upsert({
        id: 'default',
        business_name: cache.cms.businessName,
        founder_name: cache.cms.founderName,
        founder_title: cache.cms.founderTitle,
        founder_address: cache.cms.founderAddress,
        business_address: cache.cms.businessAddress,
        primary_phone: cache.cms.primaryPhone,
        whatsapp_number: cache.cms.whatsappNumber,
        email: cache.cms.email,
        instagram: cache.cms.instagram,
        youtube: cache.cms.youtube,
        hero_headline: cache.cms.heroHeadline,
        hero_subheadline: cache.cms.heroSubheadline,
        about_story: cache.cms.aboutStory,
        banner_notice: cache.cms.bannerNotice,
        promo_banners: cache.cms.promoBanners || null,
        updated_at: new Date().toISOString()
      });
    } catch (err) {
      console.error('Supabase updateCMS error:', err);
    }
    return cache.cms;
  },

  // Properties
  getProperties: (): Property[] => {
    return cache.properties;
  },
  fetchProperties: async (): Promise<Property[]> => {
    try {
      const { data, error } = await supabaseAdmin
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        cache.properties = data.map(mapPropertyFromDb);
      }
    } catch (err) {
      console.warn('Supabase fetchProperties fallback:', err);
    }
    return cache.properties;
  },
  getPropertyBySlug: (slug: string): Property | undefined => {
    return cache.properties.find((p) => p.slug === slug);
  },
  getPropertyById: (id: string): Property | undefined => {
    return cache.properties.find((p) => p.id === id);
  },
  saveProperty: async (property: Property): Promise<Property> => {
    const idx = cache.properties.findIndex((p) => p.id === property.id);
    if (idx >= 0) {
      cache.properties[idx] = { ...property, updatedAt: new Date().toISOString() };
    } else {
      cache.properties.unshift({ ...property, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }

    try {
      const dbRow = mapPropertyToDb(property);
      const { error } = await supabaseAdmin.from('properties').upsert(dbRow);
      if (error) {
        console.error('Supabase saveProperty error:', error);
        throw new Error(error.message || 'Supabase rejected property save');
      }
    } catch (err: any) {
      console.error('Supabase saveProperty error:', err);
      throw err;
    }
    return property;
  },
  deleteProperty: async (id: string): Promise<boolean> => {
    cache.properties = cache.properties.filter((p) => p.id !== id);
    try {
      const { error } = await supabaseAdmin.from('properties').delete().eq('id', id);
      if (error) {
        console.error('Supabase deleteProperty error:', error);
        throw new Error(error.message);
      }
      return true;
    } catch (err) {
      console.error('Supabase deleteProperty error:', err);
      return false;
    }
  },

  // Leads
  getLeads: (): Lead[] => {
    return cache.leads;
  },
  fetchLeads: async (): Promise<Lead[]> => {
    try {
      const { data, error } = await supabaseAdmin
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        cache.leads = data.map(mapLeadFromDb);
      }
    } catch (err) {
      console.warn('Supabase fetchLeads fallback:', err);
    }
    return cache.leads;
  },
  addLead: async (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Promise<Lead> => {
    const newLead: Lead = {
      ...lead,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    cache.leads.unshift(newLead);
    try {
      const { error } = await supabaseAdmin.from('leads').insert({
        id: newLead.id,
        name: newLead.name,
        phone: newLead.phone,
        whatsapp: newLead.whatsapp,
        email: newLead.email,
        interested_property_id: newLead.interestedPropertyId,
        interested_property_name: newLead.interestedPropertyName,
        property_type: newLead.propertyType,
        source: newLead.source,
        message: newLead.message,
        status: newLead.status,
        notes: newLead.notes
      });
      if (error) {
        console.error('Supabase addLead error:', error);
        throw new Error(error.message);
      }
    } catch (err) {
      console.error('Supabase addLead error:', err);
      throw err;
    }
    return newLead;
  },
  updateLead: async (id: string, updates: Partial<Lead>): Promise<Lead | null> => {
    const idx = cache.leads.findIndex((l) => l.id === id);
    if (idx >= 0) {
      cache.leads[idx] = { ...cache.leads[idx], ...updates, updatedAt: new Date().toISOString() };
      try {
        const payload: any = {};
        if (updates.status) payload.status = updates.status;
        if (updates.notes !== undefined) payload.notes = updates.notes;
        payload.updated_at = new Date().toISOString();
        const { error } = await supabaseAdmin.from('leads').update(payload).eq('id', id);
        if (error) throw new Error(error.message);
      } catch (err) {
        console.error('Supabase updateLead error:', err);
        throw err;
      }
      return cache.leads[idx];
    }
    return null;
  },
  deleteLead: async (id: string): Promise<boolean> => {
    cache.leads = cache.leads.filter((l) => l.id !== id);
    try {
      const { error } = await supabaseAdmin.from('leads').delete().eq('id', id);
      if (error) throw new Error(error.message);
      return true;
    } catch (err) {
      console.error('Supabase deleteLead error:', err);
      throw err;
    }
  },

  // Site Visits
  getSiteVisits: (): SiteVisit[] => {
    return cache.siteVisits;
  },
  fetchSiteVisits: async (): Promise<SiteVisit[]> => {
    try {
      const { data, error } = await supabaseAdmin
        .from('site_visits')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        cache.siteVisits = data.map(mapSiteVisitFromDb);
      }
    } catch (err) {
      console.warn('Supabase fetchSiteVisits fallback:', err);
    }
    return cache.siteVisits;
  },
  addSiteVisit: async (visit: Omit<SiteVisit, 'id' | 'createdAt'>): Promise<SiteVisit> => {
    const newVisit: SiteVisit = {
      ...visit,
      id: `visit-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    cache.siteVisits.unshift(newVisit);
    try {
      const { error } = await supabaseAdmin.from('site_visits').insert({
        id: newVisit.id,
        name: newVisit.name,
        phone: newVisit.phone,
        whatsapp: newVisit.whatsapp,
        email: newVisit.email,
        property_id: newVisit.propertyId,
        property_name: newVisit.propertyName,
        preferred_date: newVisit.preferredDate,
        preferred_time: newVisit.preferredTime,
        attendees_count: newVisit.attendeesCount,
        pickup_required: newVisit.pickupRequired,
        message: newVisit.message,
        status: newVisit.status,
        notes: newVisit.notes
      });
      if (error) throw new Error(error.message);
    } catch (err) {
      console.error('Supabase addSiteVisit error:', err);
      throw err;
    }
    return newVisit;
  },
  updateSiteVisit: async (id: string, updates: Partial<SiteVisit>): Promise<SiteVisit | null> => {
    const idx = cache.siteVisits.findIndex((v) => v.id === id);
    if (idx >= 0) {
      cache.siteVisits[idx] = { ...cache.siteVisits[idx], ...updates };
      try {
        const payload: any = {};
        if (updates.status) payload.status = updates.status;
        if (updates.notes !== undefined) payload.notes = updates.notes;
        const { error } = await supabaseAdmin.from('site_visits').update(payload).eq('id', id);
        if (error) throw new Error(error.message);
      } catch (err) {
        console.error('Supabase updateSiteVisit error:', err);
        throw err;
      }
      return cache.siteVisits[idx];
    }
    return null;
  },
  deleteSiteVisit: async (id: string): Promise<boolean> => {
    cache.siteVisits = cache.siteVisits.filter((v) => v.id !== id);
    try {
      const { error } = await supabaseAdmin.from('site_visits').delete().eq('id', id);
      if (error) throw new Error(error.message);
      return true;
    } catch (err) {
      console.error('Supabase deleteSiteVisit error:', err);
      throw err;
    }
  },

  // Testimonials
  getTestimonials: (): Testimonial[] => {
    return cache.testimonials;
  },
  fetchTestimonials: async (): Promise<Testimonial[]> => {
    try {
      const { data, error } = await supabaseAdmin
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        cache.testimonials = data.map(mapTestimonialFromDb);
      }
    } catch (err) {
      console.warn('Supabase fetchTestimonials fallback:', err);
    }
    return cache.testimonials;
  },
  saveTestimonial: async (item: Testimonial): Promise<Testimonial> => {
    const idx = cache.testimonials.findIndex((t) => t.id === item.id);
    if (idx >= 0) {
      cache.testimonials[idx] = item;
    } else {
      cache.testimonials.unshift(item);
    }
    try {
      const { error } = await supabaseAdmin.from('testimonials').upsert({
        id: item.id,
        name: item.name,
        location: item.location,
        role: item.role,
        rating: item.rating,
        comment: item.comment,
        property_name: item.propertyName,
        avatar_url: item.avatarUrl,
        is_published: item.isPublished
      });
      if (error) throw new Error(error.message);
    } catch (err) {
      console.error('Supabase saveTestimonial error:', err);
      throw err;
    }
    return item;
  },
  deleteTestimonial: async (id: string): Promise<boolean> => {
    cache.testimonials = cache.testimonials.filter((t) => t.id !== id);
    try {
      const { error } = await supabaseAdmin.from('testimonials').delete().eq('id', id);
      if (error) throw new Error(error.message);
      return true;
    } catch (err) {
      console.error('Supabase deleteTestimonial error:', err);
      throw err;
    }
  },

  // Locations
  getLocations: (): LocationItem[] => {
    return cache.locations;
  },
  fetchLocations: async (): Promise<LocationItem[]> => {
    try {
      const { data, error } = await supabaseAdmin
        .from('locations')
        .select('*');
      if (!error && data && data.length > 0) {
        cache.locations = data.map(mapLocationFromDb);
      }
    } catch (err) {
      console.warn('Supabase fetchLocations fallback:', err);
    }
    return cache.locations;
  },
  saveLocation: async (item: LocationItem): Promise<LocationItem> => {
    const idx = cache.locations.findIndex((l) => l.id === item.id);
    if (idx >= 0) {
      cache.locations[idx] = item;
    } else {
      cache.locations.push(item);
    }
    try {
      const { error } = await supabaseAdmin.from('locations').upsert({
        id: item.id,
        name: item.name,
        tagline: item.tagline,
        description: item.description,
        highlights: item.highlights || [],
        image_url: item.imageUrl,
        is_active: item.isActive
      });
      if (error) throw new Error(error.message);
    } catch (err) {
      console.error('Supabase saveLocation error:', err);
      throw err;
    }
    return item;
  },
  deleteLocation: async (id: string): Promise<boolean> => {
    cache.locations = cache.locations.filter((l) => l.id !== id);
    try {
      const { error } = await supabaseAdmin.from('locations').delete().eq('id', id);
      if (error) throw new Error(error.message);
      return true;
    } catch (err) {
      console.error('Supabase deleteLocation error:', err);
      throw err;
    }
  },

  // Gallery
  getGallery: (): GalleryItem[] => {
    return cache.gallery;
  },
  fetchGallery: async (): Promise<GalleryItem[]> => {
    try {
      const { data, error } = await supabaseAdmin
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        cache.gallery = data.map(mapGalleryFromDb);
      }
    } catch (err) {
      console.warn('Supabase fetchGallery fallback:', err);
    }
    return cache.gallery;
  },
  saveGalleryItem: async (item: GalleryItem): Promise<GalleryItem> => {
    const idx = cache.gallery.findIndex((g) => g.id === item.id);
    if (idx >= 0) {
      cache.gallery[idx] = item;
    } else {
      cache.gallery.unshift(item);
    }
    try {
      const { error } = await supabaseAdmin.from('gallery').upsert({
        id: item.id,
        title: item.title,
        category: item.category,
        image_url: item.imageUrl,
        caption: item.caption,
        featured: item.featured
      });
      if (error) throw new Error(error.message);
    } catch (err) {
      console.error('Supabase saveGalleryItem error:', err);
      throw err;
    }
    return item;
  },
  deleteGalleryItem: async (id: string): Promise<boolean> => {
    cache.gallery = cache.gallery.filter((g) => g.id !== id);
    try {
      const { error } = await supabaseAdmin.from('gallery').delete().eq('id', id);
      if (error) throw new Error(error.message);
      return true;
    } catch (err) {
      console.error('Supabase deleteGalleryItem error:', err);
      throw err;
    }
  }
};
