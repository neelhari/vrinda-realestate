import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import MobileBottomBar from "@/components/layout/MobileBottomBar";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#0a4ba6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Vrinda Real Estate | Premium Plots, Luxury Villas & Houses in Ongole",
    template: "%s | Vrinda Real Estate Ongole",
  },
  description: "Vrinda Real Estate offers verified residential open plots, contemporary luxury villas, and independent houses across Koppolu, Ongole, and Andhra Pradesh. Guided by founder Bejapur Ayyappa Sai.",
  keywords: [
    "Vrinda Real Estate",
    "Real estate in Ongole",
    "Residential plots in Ongole",
    "Plots for sale in Ongole",
    "Villas in Ongole",
    "Independent houses in Ongole",
    "Property in Koppolu",
    "Open plots in Koppolu Ongole",
    "Bejapur Ayyappa Sai",
    "Prakasam district real estate"
  ],
  authors: [{ name: "Bejapur Ayyappa Sai" }],
  creator: "Vrinda Real Estate",
  publisher: "Vrinda Real Estate",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  metadataBase: new URL("https://vrindarealestate.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vrinda Real Estate | Premium Properties & Open Plots in Ongole",
    description: "Discover verified residential plots, luxury villas, and independent homes in Ongole with complete legal transparency and registration support.",
    url: "https://vrindarealestate.com",
    siteName: "Vrinda Real Estate",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero-luxury-villa.jpg",
        width: 1200,
        height: 630,
        alt: "Vrinda Real Estate - Luxury Homes & Plots",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vrinda Real Estate | Premium Properties & Plots in Ongole",
    description: "Verified residential plots, luxury villas & independent houses in Ongole and Koppolu.",
    images: ["/images/hero-luxury-villa.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "LocalBusiness"],
    name: "Vrinda Real Estate",
    image: "https://vrindarealestate.com/images/vrinda-logo.png",
    founder: {
      "@type": "Person",
      name: "Bejapur Ayyappa Sai"
    },
    telephone: "+91-8464882925",
    email: "vrindarealestates0@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Koppolu",
      addressLocality: "Ongole",
      addressRegion: "Andhra Pradesh",
      addressCountry: "IN"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "15.5057",
      longitude: "80.0499"
    },
    url: "https://vrindarealestate.com",
    priceRange: "₹₹ - ₹₹₹₹",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        opens: "08:00",
        closes: "20:00"
      }
    ],
    sameAs: [
      "https://www.instagram.com/vrindarealstate_in_ongole",
      "https://www.youtube.com/@VrindaRealestate-r8f"
    ]
  };

  return (
    <html lang="en" className={`${jakartaSans.variable} ${playfairDisplay.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-[#ffffff] text-[#0b1329] selection:bg-[#0a4ba6]/10 selection:text-[#0a4ba6]">
        {children}
        <FloatingWhatsApp />
        <MobileBottomBar />
      </body>
    </html>
  );
}
