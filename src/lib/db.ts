import fs from 'fs';
import path from 'path';
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

interface DatabaseSchema {
  cms: CMSSettings;
  properties: Property[];
  leads: Lead[];
  siteVisits: SiteVisit[];
  testimonials: Testimonial[];
  locations: LocationItem[];
  services: ServiceItem[];
  gallery: GalleryItem[];
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

function ensureDb(): DatabaseSchema {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const defaultData: DatabaseSchema = {
      cms: initialCMS,
      properties: initialProperties,
      leads: initialLeads,
      siteVisits: initialSiteVisits,
      testimonials: initialTestimonials,
      locations: initialLocations,
      services: initialServices,
      gallery: initialGallery
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
    return defaultData;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return {
      cms: { ...initialCMS, ...(parsed.cms || {}) },
      properties: Array.isArray(parsed.properties) ? parsed.properties : initialProperties,
      leads: Array.isArray(parsed.leads) ? parsed.leads : initialLeads,
      siteVisits: Array.isArray(parsed.siteVisits) ? parsed.siteVisits : initialSiteVisits,
      testimonials: Array.isArray(parsed.testimonials) ? parsed.testimonials : initialTestimonials,
      locations: Array.isArray(parsed.locations) ? parsed.locations : initialLocations,
      services: Array.isArray(parsed.services) ? parsed.services : initialServices,
      gallery: Array.isArray(parsed.gallery) ? parsed.gallery : initialGallery,
    };
  } catch {
    const defaultData: DatabaseSchema = {
      cms: initialCMS,
      properties: initialProperties,
      leads: initialLeads,
      siteVisits: initialSiteVisits,
      testimonials: initialTestimonials,
      locations: initialLocations,
      services: initialServices,
      gallery: initialGallery
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
    return defaultData;
  }
}

function saveDb(data: DatabaseSchema): void {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export const db = {
  // CMS
  getCMS: (): CMSSettings => {
    return ensureDb().cms;
  },
  updateCMS: (updates: Partial<CMSSettings>): CMSSettings => {
    const current = ensureDb();
    current.cms = { ...current.cms, ...updates };
    saveDb(current);
    return current.cms;
  },

  // Properties
  getProperties: (): Property[] => {
    return ensureDb().properties;
  },
  getPropertyBySlug: (slug: string): Property | undefined => {
    return ensureDb().properties.find((p) => p.slug === slug);
  },
  getPropertyById: (id: string): Property | undefined => {
    return ensureDb().properties.find((p) => p.id === id);
  },
  saveProperty: (property: Property): Property => {
    const current = ensureDb();
    const index = current.properties.findIndex((p) => p.id === property.id);
    if (index >= 0) {
      current.properties[index] = { ...property, updatedAt: new Date().toISOString() };
    } else {
      current.properties.unshift({ ...property, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    saveDb(current);
    return property;
  },
  deleteProperty: (id: string): boolean => {
    const current = ensureDb();
    const initialLen = current.properties.length;
    current.properties = current.properties.filter((p) => p.id !== id);
    if (current.properties.length !== initialLen) {
      saveDb(current);
      return true;
    }
    return false;
  },

  // Leads
  getLeads: (): Lead[] => {
    return ensureDb().leads;
  },
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Lead => {
    const current = ensureDb();
    const newLead: Lead = {
      ...lead,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    current.leads.unshift(newLead);
    saveDb(current);
    return newLead;
  },
  updateLead: (id: string, updates: Partial<Lead>): Lead | null => {
    const current = ensureDb();
    const index = current.leads.findIndex((l) => l.id === id);
    if (index >= 0) {
      current.leads[index] = { ...current.leads[index], ...updates, updatedAt: new Date().toISOString() };
      saveDb(current);
      return current.leads[index];
    }
    return null;
  },
  deleteLead: (id: string): boolean => {
    const current = ensureDb();
    const initialLen = current.leads.length;
    current.leads = current.leads.filter((l) => l.id !== id);
    if (current.leads.length !== initialLen) {
      saveDb(current);
      return true;
    }
    return false;
  },

  // Site Visits
  getSiteVisits: (): SiteVisit[] => {
    return ensureDb().siteVisits;
  },
  addSiteVisit: (visit: Omit<SiteVisit, 'id' | 'createdAt'>): SiteVisit => {
    const current = ensureDb();
    const newVisit: SiteVisit = {
      ...visit,
      id: `visit-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    current.siteVisits.unshift(newVisit);
    saveDb(current);
    return newVisit;
  },
  updateSiteVisit: (id: string, updates: Partial<SiteVisit>): SiteVisit | null => {
    const current = ensureDb();
    const index = current.siteVisits.findIndex((v) => v.id === id);
    if (index >= 0) {
      current.siteVisits[index] = { ...current.siteVisits[index], ...updates };
      saveDb(current);
      return current.siteVisits[index];
    }
    return null;
  },
  deleteSiteVisit: (id: string): boolean => {
    const current = ensureDb();
    const initialLen = current.siteVisits.length;
    current.siteVisits = current.siteVisits.filter((v) => v.id !== id);
    if (current.siteVisits.length !== initialLen) {
      saveDb(current);
      return true;
    }
    return false;
  },

  // Testimonials
  getTestimonials: (): Testimonial[] => {
    return ensureDb().testimonials;
  },
  saveTestimonial: (item: Testimonial): Testimonial => {
    const current = ensureDb();
    const idx = current.testimonials.findIndex((t) => t.id === item.id);
    if (idx >= 0) {
      current.testimonials[idx] = item;
    } else {
      current.testimonials.unshift(item);
    }
    saveDb(current);
    return item;
  },
  deleteTestimonial: (id: string): boolean => {
    const current = ensureDb();
    const initialLen = current.testimonials.length;
    current.testimonials = current.testimonials.filter((t) => t.id !== id);
    if (current.testimonials.length !== initialLen) {
      saveDb(current);
      return true;
    }
    return false;
  },

  // Locations
  getLocations: (): LocationItem[] => {
    return ensureDb().locations;
  },
  saveLocation: (item: LocationItem): LocationItem => {
    const current = ensureDb();
    const idx = current.locations.findIndex((l) => l.id === item.id);
    if (idx >= 0) {
      current.locations[idx] = item;
    } else {
      current.locations.push(item);
    }
    saveDb(current);
    return item;
  },
  deleteLocation: (id: string): boolean => {
    const current = ensureDb();
    const initialLen = current.locations.length;
    current.locations = current.locations.filter((l) => l.id !== id);
    if (current.locations.length !== initialLen) {
      saveDb(current);
      return true;
    }
    return false;
  },

  // Services
  getServices: (): ServiceItem[] => {
    return ensureDb().services;
  },
  saveService: (item: ServiceItem): ServiceItem => {
    const current = ensureDb();
    const idx = current.services.findIndex((s) => s.id === item.id);
    if (idx >= 0) {
      current.services[idx] = item;
    } else {
      current.services.push(item);
    }
    saveDb(current);
    return item;
  },

  // Gallery
  getGallery: (): GalleryItem[] => {
    return ensureDb().gallery;
  },
  saveGalleryItem: (item: GalleryItem): GalleryItem => {
    const current = ensureDb();
    const idx = current.gallery.findIndex((g) => g.id === item.id);
    if (idx >= 0) {
      current.gallery[idx] = item;
    } else {
      current.gallery.unshift(item);
    }
    saveDb(current);
    return item;
  },
  deleteGalleryItem: (id: string): boolean => {
    const current = ensureDb();
    const initialLen = current.gallery.length;
    current.gallery = current.gallery.filter((g) => g.id !== id);
    if (current.gallery.length !== initialLen) {
      saveDb(current);
      return true;
    }
    return false;
  }
};
