-- ==============================================================================
-- VRINDA REAL ESTATE - SUPABASE SQL SCHEMA (SAFE IDEMPOTENT RUN)
-- ==============================================================================
-- This script safely drops existing policies first so it can be run multiple times
-- without any "already exists" errors.
-- ==============================================================================

-- 1. PROPERTIES TABLE
CREATE TABLE IF NOT EXISTS public.properties (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('plot', 'villa', 'house', 'commercial')),
    status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'booked', 'sold', 'upcoming')),
    featured BOOLEAN DEFAULT false,
    location TEXT NOT NULL,
    address TEXT NOT NULL,
    price NUMERIC NOT NULL,
    price_label TEXT NOT NULL,
    area NUMERIC NOT NULL,
    area_unit TEXT NOT NULL DEFAULT 'sq.ft',
    dimensions TEXT,
    facing TEXT,
    bedrooms INTEGER,
    bathrooms INTEGER,
    description TEXT NOT NULL,
    highlights JSONB DEFAULT '[]'::jsonb,
    amenities JSONB DEFAULT '[]'::jsonb,
    images JSONB DEFAULT '[]'::jsonb,
    floor_plan_url TEXT,
    video_url TEXT,
    rera_approved BOOLEAN DEFAULT false,
    dtcp_approved BOOLEAN DEFAULT false,
    possession_date TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. LEADS TABLE
CREATE TABLE IF NOT EXISTS public.leads (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    whatsapp TEXT,
    email TEXT,
    interested_property_id TEXT,
    interested_property_name TEXT,
    property_type TEXT,
    source TEXT NOT NULL DEFAULT 'Website Form',
    message TEXT,
    status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Site Visit Scheduled', 'Follow Up', 'Converted', 'Closed')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SITE VISITS TABLE
CREATE TABLE IF NOT EXISTS public.site_visits (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    whatsapp TEXT,
    email TEXT,
    property_id TEXT,
    property_name TEXT NOT NULL,
    preferred_date TEXT NOT NULL,
    preferred_time TEXT NOT NULL,
    attendees_count INTEGER DEFAULT 1,
    pickup_required BOOLEAN DEFAULT false,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'Requested' CHECK (status IN ('Requested', 'Confirmed', 'Completed', 'Rescheduled', 'Cancelled')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    role TEXT,
    rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    property_name TEXT,
    avatar_url TEXT,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. LOCATIONS TABLE
CREATE TABLE IF NOT EXISTS public.locations (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,
    highlights JSONB DEFAULT '[]'::jsonb,
    image_url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true
);

-- 6. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    short_desc TEXT NOT NULL,
    full_desc TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    features JSONB DEFAULT '[]'::jsonb,
    cta_text TEXT NOT NULL
);

-- 7. GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.gallery (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('plots', 'villas', 'houses', 'office', 'developments')),
    image_url TEXT NOT NULL,
    caption TEXT,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. CMS SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.cms_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    business_name TEXT NOT NULL DEFAULT 'Vrinda Real Estate',
    founder_name TEXT NOT NULL DEFAULT 'Bejapur Ayyappa Sai',
    founder_title TEXT NOT NULL DEFAULT 'Founder & Managing Director',
    founder_address TEXT,
    business_address TEXT,
    primary_phone TEXT,
    whatsapp_number TEXT,
    email TEXT,
    instagram TEXT,
    youtube TEXT,
    hero_headline TEXT,
    hero_subheadline TEXT,
    about_story TEXT,
    banner_notice TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ==============================================================================
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_settings ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- SAFELY CLEAN PREVIOUS POLICIES (Prevents "already exists" errors)
-- ==============================================================================
DROP POLICY IF EXISTS "Public Read Properties" ON public.properties;
DROP POLICY IF EXISTS "Public Read Testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Public Read Locations" ON public.locations;
DROP POLICY IF EXISTS "Public Read Services" ON public.services;
DROP POLICY IF EXISTS "Public Read Gallery" ON public.gallery;
DROP POLICY IF EXISTS "Public Read CMS" ON public.cms_settings;

DROP POLICY IF EXISTS "Public Insert Leads" ON public.leads;
DROP POLICY IF EXISTS "Public Insert Site Visits" ON public.site_visits;

DROP POLICY IF EXISTS "Admin Full Access Properties" ON public.properties;
DROP POLICY IF EXISTS "Admin Full Access Leads" ON public.leads;
DROP POLICY IF EXISTS "Admin Full Access Site Visits" ON public.site_visits;
DROP POLICY IF EXISTS "Admin Full Access Testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admin Full Access Locations" ON public.locations;
DROP POLICY IF EXISTS "Admin Full Access Services" ON public.services;
DROP POLICY IF EXISTS "Admin Full Access Gallery" ON public.gallery;
DROP POLICY IF EXISTS "Admin Full Access CMS" ON public.cms_settings;

-- ==============================================================================
-- RECREATE POLICIES
-- ==============================================================================

-- Public Read
CREATE POLICY "Public Read Properties" ON public.properties FOR SELECT USING (true);
CREATE POLICY "Public Read Testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Public Read Locations" ON public.locations FOR SELECT USING (true);
CREATE POLICY "Public Read Services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public Read Gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Public Read CMS" ON public.cms_settings FOR SELECT USING (true);

-- Public Submissions
CREATE POLICY "Public Insert Leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Site Visits" ON public.site_visits FOR INSERT WITH CHECK (true);

-- Admin / Service Full Access
CREATE POLICY "Admin Full Access Properties" ON public.properties FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Leads" ON public.leads FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Site Visits" ON public.site_visits FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Testimonials" ON public.testimonials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Locations" ON public.locations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Services" ON public.services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Gallery" ON public.gallery FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access CMS" ON public.cms_settings FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- INITIAL DEFAULT CMS ROW
-- ==============================================================================
INSERT INTO public.cms_settings (
    id,
    business_name,
    founder_name,
    founder_title,
    founder_address,
    business_address,
    primary_phone,
    whatsapp_number,
    email,
    instagram,
    youtube,
    hero_headline,
    hero_subheadline,
    about_story
) VALUES (
    'default',
    'Vrinda Real Estate',
    'Bejapur Ayyappa Sai',
    'Founder & Managing Director',
    '42-106-243, FCI Rd, N. T. R Colony, Koppolu, Ongole, Andhra Pradesh 523286',
    '42-106-243, FCI Rd, N. T. R Colony, Koppolu, Ongole, Andhra Pradesh 523286',
    '8464882925',
    '9959912500',
    'vrindarealestates0@gmail.com',
    'vrindarealstate_in_ongole',
    '@VrindaRealestate-r8f',
    'Find a Place Worth Calling Home.',
    'Premium residential open plots, luxury villas, and independent houses in prime, high-growth corridors across Ongole, Koppolu, and Andhra Pradesh.',
    'Founded by Bejapur Ayyappa Sai, Vrinda Real Estate was established with a clear mission: to bring absolute transparency, verified documentation, and genuine investment value to every homebuyer and land investor in Prakasam district and Andhra Pradesh.'
) ON CONFLICT (id) DO NOTHING;
