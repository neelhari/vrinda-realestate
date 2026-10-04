import { Property, Lead, SiteVisit, Testimonial, LocationItem, ServiceItem, GalleryItem, CMSSettings } from './types';

export const initialCMS: CMSSettings = {
  businessName: "Vrinda Real Estate",
  founderName: "Bejapur Ayyappa Sai",
  founderTitle: "Founder & Managing Director",
  founderAddress: "42-106-243, FCI Rd, N. T. R Colony, Koppolu, Ongole, Andhra Pradesh 523286",
  businessAddress: "42-106-243, FCI Rd, N. T. R Colony, Koppolu, Ongole, Andhra Pradesh 523286",
  primaryPhone: "8464882925",
  whatsappNumber: "9959912500",
  email: "vrindarealestates0@gmail.com",
  instagram: "vrindarealstate_in_ongole",
  youtube: "@VrindaRealestate-r8f",
  heroHeadline: "Find a Place Worth Calling Home.",
  heroSubheadline: "Premium residential open plots, luxury villas, and independent houses in prime, high-growth corridors across Ongole, Koppolu, and Andhra Pradesh.",
  aboutStory: "Founded by Bejapur Ayyappa Sai, Vrinda Real Estate was established with a clear mission: to bring absolute transparency, verified documentation, and genuine investment value to every homebuyer and land investor in Prakasam district and Andhra Pradesh. We guide you from initial site exploration to clear-title legal registration with complete peace of mind.",
  promoBanners: [
    {
      id: 'plots-range',
      title: '₹4 Lakhs – ₹5 Crores Plots',
      subtitle: 'Affordable to Luxury • Ongole & Highway',
      href: '/plots',
      image: '/images/category-plots.jpg',
    },
    {
      id: 'free-car-service',
      title: 'Free Car Pickup & Drop',
      subtitle: 'Doorstep AC Ride for All Site Visits',
      href: '/site-visit',
      image: '/images/category-villas.jpg',
    },
    {
      id: 'years-experience',
      title: '15+ Years Experience',
      subtitle: '5,000+ Happy Families • 100% Clear Titles',
      href: '/about',
      image: '/images/hero-luxury-villa.jpg',
    },
    {
      id: 'growth-corridors',
      title: 'Prime Growth Corridors',
      subtitle: 'Koppolu & Bypass • Spot Registration',
      href: '/properties',
      image: '/images/category-houses.jpg',
    },
  ]
};

export const initialProperties: Property[] = [
  {
    id: "prop-1",
    slug: "vrinda-green-meadows-koppolu",
    title: "Vrinda Green Meadows – Premium Residential Plots",
    type: "plot",
    status: "available",
    featured: true,
    location: "Koppolu, Ongole",
    address: "Main Growth Corridor, Near Koppolu Ring Road, Ongole, Andhra Pradesh",
    price: 1850000,
    priceLabel: "₹ 18.5 Lakhs onwards",
    area: 167,
    areaUnit: "sq.yards",
    dimensions: "33 x 45.5 ft",
    facing: "East & North Facing Plots Available",
    description: "Vrinda Green Meadows is a meticulously planned gated residential plotted layout located in the high-growth Koppolu belt of Ongole. Featuring 40-foot wide BT roads, underground drainage, avenue plantations, and instant registration with verified clear titles.",
    highlights: [
      "Immediate Clear-Title Registration",
      "40 ft & 33 ft Wide Blacktop Roads",
      "Underground Drainage & Water Lines",
      "Electricity with Modern LED Streetlights",
      "Grand Entrance Arch with 24/7 Security",
      "100% Vaastu Compliant Layout"
    ],
    amenities: [
      "Gated Community",
      "Avenue Plantation",
      "Children's Play Area",
      "Compound Wall Security",
      "Water Supply Pipeline",
      "Street Lighting"
    ],
    images: [
      "/images/category-plots.jpg",
      "/images/hero-luxury-villa.jpg"
    ],
    dtcpApproved: true,
    reraApproved: true,
    possessionDate: "Immediate Registration",
    createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "prop-2",
    slug: "vrinda-royal-enclave-ongole",
    title: "Vrinda Royal Enclave – Contemporary Luxury Villas",
    type: "villa",
    status: "available",
    featured: true,
    location: "Kurnool Road, Ongole",
    address: "Opposite Tech Zone, Kurnool Road Bypass, Ongole, Andhra Pradesh",
    price: 6800000,
    priceLabel: "₹ 68 Lakhs",
    area: 2150,
    areaUnit: "sq.ft",
    dimensions: "35 x 55 ft Plot Area",
    facing: "North-East Corner",
    bedrooms: 3,
    bathrooms: 4,
    description: "An exclusive boutique collection of contemporary 3BHK duplex villas offering refined architectural aesthetics, private manicured garden spaces, covered car parking, and premium finishings in the heart of Ongole's premier residential enclave.",
    highlights: [
      "Spacious 3BHK Duplex with Double-Height Living Room",
      "Private Landscaped Garden & Car Porch",
      "Vitrified Italian-Finish Tile Flooring",
      "Modular Kitchen Ready Infrastructure",
      "Dedicated Pooja Room & Balcony Deck",
      "Solar Water Heating & Rainwater Harvesting"
    ],
    amenities: [
      "24/7 CCTV & Security",
      "Private Terrace Lounge",
      "Power Backup Inverter Provision",
      "Individual Borewell & Overhead Tank",
      "Covered 2-Car Parking"
    ],
    images: [
      "/images/category-villas.jpg",
      "/images/hero-luxury-villa.jpg"
    ],
    dtcpApproved: true,
    reraApproved: true,
    possessionDate: "Ready for Interior Work",
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "prop-3",
    slug: "vrinda-serene-homes-ongole",
    title: "Vrinda Serene Homes – Independent Custom House",
    type: "house",
    status: "available",
    featured: true,
    location: "Near Venugopalaswami Temple Area, Ongole",
    address: "Venugopalaswami Layout, Ongole, Andhra Pradesh",
    price: 5200000,
    priceLabel: "₹ 52 Lakhs",
    area: 1750,
    areaUnit: "sq.ft",
    dimensions: "30 x 50 ft",
    facing: "East Facing",
    bedrooms: 3,
    bathrooms: 3,
    description: "A beautifully built standalone independent family home designed around sunlight, ventilation, and peaceful family living. Situated in a prime, highly connected residential sector close to schools, healthcare, and temples.",
    highlights: [
      "Clear Title Standalone Freehold House",
      "East-Facing Main Entrance & Vaastu Aligned",
      "Teak Wood Doors & Premium UPVC Windows",
      "Covered Vehicle Parking Portico",
      "Terrace with Rooftop Garden Scope"
    ],
    amenities: [
      "Borewell & Municipal Water Connection",
      "Dedicated Utility Area",
      "Pooja Mandir Niche",
      "Anti-skid Balcony Flooring"
    ],
    images: [
      "/images/category-houses.jpg",
      "/images/hero-luxury-villa.jpg"
    ],
    dtcpApproved: true,
    possessionDate: "Immediate Handover",
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "prop-4",
    slug: "vrinda-hills-view-singarakonda",
    title: "Vrinda Hills View – Growth Corridor Plotted Venture",
    type: "plot",
    status: "available",
    featured: false,
    location: "Singarakonda Highway Corridor",
    address: "Near Singarakonda Growth Junction, Andhra Pradesh",
    price: 1250000,
    priceLabel: "₹ 12.5 Lakhs onwards",
    area: 200,
    areaUnit: "sq.yards",
    dimensions: "36 x 50 ft",
    facing: "East, North & West Plots",
    description: "High-potential long-term appreciation residential open plots located strategically along the expanding Singarakonda development axis. Ideal for both capital appreciation and building custom vacation or retirement homes.",
    highlights: [
      "Highway Touch Layout with Easy Accessibility",
      "33-ft Wide Internal Roads with Curb Stones",
      "Boundary Fencing for Entire Venture",
      "Rapidly Developing Commercial & Residential Belt",
      "Transparent Spot Registration"
    ],
    amenities: [
      "Compound Wall Boundary",
      "Water Supply Points",
      "Street Lighting",
      "Clear Demarcation Stones"
    ],
    images: [
      "/images/category-plots.jpg",
      "/images/category-houses.jpg"
    ],
    dtcpApproved: true,
    possessionDate: "Immediate Registration",
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const initialLocations: LocationItem[] = [
  {
    id: "loc-1",
    name: "Ongole City Central",
    tagline: "Prime Urban Heart & Established Enclaves",
    description: "Heart of Prakasam district with top schools, multi-speciality hospitals, commercial centers, and peaceful residential neighborhoods.",
    highlights: ["Established infrastructure", "Close to temples & markets", "High rental & resale value"],
    imageUrl: "/images/hero-luxury-villa.jpg",
    isActive: true
  },
  {
    id: "loc-2",
    name: "Koppolu Growth Belt",
    tagline: "Fastest Appreciating Residential Hub",
    description: "Directly positioned on Ongole's primary expansion corridor with upcoming ring road connectivity and master-planned layouts.",
    highlights: ["Wide blacktop roads", "High capital growth rate", "Rapid residential development"],
    imageUrl: "/images/category-plots.jpg",
    isActive: true
  },
  {
    id: "loc-3",
    name: "Singarakonda Corridor",
    tagline: "Scenic & High-Potential Investment Zone",
    description: "Serene, green surroundings with highway access making it prime for affordable open plots, farmhouses, and long-term land banking.",
    highlights: ["Highway connectivity", "Peaceful green environment", "Attractive entry pricing"],
    imageUrl: "/images/category-houses.jpg",
    isActive: true
  },
  {
    id: "loc-4",
    name: "Guntur & Vijayawada Link",
    tagline: "Regional Highway Connectivity",
    description: "Connecting Ongole to Guntur, Vijayawada, and Amaravati growth zones along NH-16.",
    highlights: ["National Highway proximity", "Commercial synergy", "Strategic long-term asset"],
    imageUrl: "/images/category-villas.jpg",
    isActive: true
  }
];

export const initialServices: ServiceItem[] = [
  {
    id: "srv-1",
    title: "Residential Open Plots",
    shortDesc: "Verified, clear-title open plots in master-planned gated layouts.",
    fullDesc: "We curate premium residential plots with DTCP/RERA approvals, wide BT roads, underground drainage, and immediate registration in top growth corridors.",
    iconName: "MapPin",
    features: [
      "100% Verified clear land titles",
      "Immediate spot registration assistance",
      "Master-planned layouts with amenities",
      "High investment return potential"
    ],
    ctaText: "Explore Available Plots"
  },
  {
    id: "srv-2",
    title: "Guided Property Site Visits",
    shortDesc: "Complimentary, private guided tours with our local property specialists.",
    fullDesc: "Experience the layout, surrounding developments, road widths, and facing options firsthand with complete transparency and zero sales pressure.",
    iconName: "Car",
    features: [
      "Flexible weekend & weekday timings",
      "In-depth boundary & plan walkthrough",
      "Local neighborhood & connectivity tour",
      "Direct consultation with founder"
    ],
    ctaText: "Schedule a Site Visit"
  },
  {
    id: "srv-3",
    title: "Real Estate Consultation",
    shortDesc: "Independent, honest advisory on property valuation and growth areas.",
    fullDesc: "Whether you are a first-time homebuyer or an NRI investor, we provide data-driven insights into land trends, legal diligence, and market trajectories.",
    iconName: "Compass",
    features: [
      "Budget-aligned property matching",
      "Future appreciation trend analysis",
      "Legal verification guidance",
      "Portfolio diversification for NRIs"
    ],
    ctaText: "Book Free Consultation"
  },
  {
    id: "srv-4",
    title: "Plot Booking & Registration Assistance",
    shortDesc: "Seamless end-to-end documentation from agreement to registration.",
    fullDesc: "We handle the complete paperwork, sub-registrar office scheduling, EC verification, and revenue department procedures without stress.",
    iconName: "FileCheck",
    features: [
      "Title search & encumbrance check",
      "Drafting legal sale agreements",
      "Sub-registrar coordination",
      "Mutation & tax record guidance"
    ],
    ctaText: "Talk to Registration Specialist"
  },
  {
    id: "srv-5",
    title: "Residential Villas & Houses",
    shortDesc: "Custom-built independent houses and luxury gated community villas.",
    fullDesc: "Discover modern 2BHK and 3BHK residences built with quality materials, Vaastu principles, elegant finishes, and peaceful neighborhood settings.",
    iconName: "Home",
    features: [
      "100% Vaastu compliant architecture",
      "Quality construction with warranty",
      "Dedicated car parking & gardens",
      "Move-in ready & under-construction choices"
    ],
    ctaText: "View Villas & Houses"
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Ramesh Babu K.",
    location: "Ongole, Andhra Pradesh",
    role: "Government Employee & Plot Owner",
    rating: 5,
    comment: "Ayyappa Sai garu made our plot purchase in Koppolu completely hassle-free. All documents were 100% verified and the registration was completed on the exact scheduled date without any hidden surprises. Very trustworthy team!",
    propertyName: "Vrinda Green Meadows, Koppolu",
    isPublished: true,
    createdAt: new Date(Date.now() - 25 * 86400000).toISOString()
  },
  {
    id: "test-2",
    name: "Srinivas Rao M.",
    location: "Hyderabad / Ongole Native",
    role: "Software Architect (NRI Investor)",
    rating: 5,
    comment: "Being based outside Ongole, I needed someone with genuine local knowledge and absolute integrity. Vrinda Real Estate took care of everything from site video tours to legal documentation. Highly recommended.",
    propertyName: "Residential Open Plot, Ongole",
    isPublished: true,
    createdAt: new Date(Date.now() - 14 * 86400000).toISOString()
  },
  {
    id: "test-3",
    name: "P. Venkata Lakshmi",
    location: "Ongole",
    role: "Homeowner",
    rating: 5,
    comment: "We purchased our independent family home through Vrinda. The build quality, clear title deed, and friendly guidance made our dream of owning a home a pleasant reality. Thank you Ayyappa Sai!",
    propertyName: "Independent House, Ongole",
    isPublished: true,
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString()
  }
];

export const initialLeads: Lead[] = [
  {
    id: "lead-1",
    name: "Kalyan Chakravarthy",
    phone: "9848012345",
    whatsapp: "9848012345",
    email: "kalyan.c@gmail.com",
    interestedPropertyName: "Vrinda Green Meadows – Premium Residential Plots",
    propertyType: "plot",
    source: "Website Hero CTA",
    message: "Interested in 200 sq.yards East facing plot in Koppolu. Looking for immediate registration.",
    status: "New",
    notes: "Follow up regarding site visit on Sunday morning.",
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 3600000).toISOString()
  },
  {
    id: "lead-2",
    name: "Dr. B. Sudhakar",
    phone: "9440156789",
    whatsapp: "9440156789",
    email: "sudhakar.doc@yahoo.com",
    interestedPropertyName: "Vrinda Royal Enclave – Contemporary Luxury Villas",
    propertyType: "villa",
    source: "Property Detail Page",
    message: "Want to know pricing and floor plan for 3BHK villa with corner facing.",
    status: "Contacted",
    notes: "Spoke on phone, shared brochure via WhatsApp. Requested weekend site visit.",
    createdAt: new Date(Date.now() - 26 * 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 3600000).toISOString()
  }
];

export const initialSiteVisits: SiteVisit[] = [
  {
    id: "visit-1",
    name: "Kalyan Chakravarthy",
    phone: "9848012345",
    whatsapp: "9848012345",
    email: "kalyan.c@gmail.com",
    propertyName: "Vrinda Green Meadows – Premium Residential Plots",
    preferredDate: "2026-10-04",
    preferredTime: "10:30 AM",
    attendeesCount: 3,
    pickupRequired: false,
    message: "Coming with family to review plot dimensions.",
    status: "Confirmed",
    notes: "Site manager to be present at Koppolu entrance arch.",
    createdAt: new Date(Date.now() - 5 * 3600000).toISOString()
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Vrinda Green Meadows Avenue & Demarcation",
    category: "plots",
    imageUrl: "/images/category-plots.jpg",
    caption: "Wide blacktop layout roads with clear plot stones in Koppolu",
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "gal-2",
    title: "Contemporary Villa Gated Enclave",
    category: "villas",
    imageUrl: "/images/category-villas.jpg",
    caption: "Modern duplex architectural design with private lawns",
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "gal-3",
    title: "Independent Family Residence",
    category: "houses",
    imageUrl: "/images/category-houses.jpg",
    caption: "Stand-alone 3BHK home with spacious portico",
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: "gal-4",
    title: "Luxury Estate Architecture",
    category: "developments",
    imageUrl: "/images/hero-luxury-villa.jpg",
    caption: "Architectural excellence and lush surroundings",
    featured: true,
    createdAt: new Date().toISOString()
  }
];
