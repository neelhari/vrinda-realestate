'use client';

import React, { useState } from 'react';
import { Property, PropertyType } from '@/lib/types';
import PropertyCard from '@/components/properties/PropertyCard';
import { Building2, ArrowRight, Sparkles } from 'lucide-react';

interface FeaturedPropertiesProps {
  properties: Property[];
}

export default function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  const [activeType, setActiveType] = useState<PropertyType | 'all'>('all');

  const filteredProperties = properties.filter((p) => {
    if (activeType === 'all') return true;
    return p.type === activeType;
  });

  return (
    <section className="py-20 lg:py-24 bg-[#f8fafc] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title and Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a4ba6]/10 text-[#0a4ba6] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HANDPICKED INVENTORY</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif text-[#0b1329] font-bold">
              Featured Properties
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Explore selected residential plots and ready developments verified for clear titles and high growth in Ongole.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-200/70 p-1.5 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveType('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeType === 'all'
                  ? 'bg-white text-[#0a4ba6] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setActiveType('plot')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeType === 'plot'
                  ? 'bg-white text-[#0a4ba6] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Plots
            </button>
            <button
              onClick={() => setActiveType('villa')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeType === 'villa'
                  ? 'bg-white text-[#0a4ba6] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Villas
            </button>
            <button
              onClick={() => setActiveType('house')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeType === 'house'
                  ? 'bg-white text-[#0a4ba6] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Houses
            </button>
          </div>
        </div>

        {/* Property Grid or Empty State */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProperties.slice(0, 6).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-lg mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No properties found</h3>
            <p className="text-xs text-slate-500">
              New properties in this category are being added soon. You can directly contact us to enquire about upcoming ventures.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0a4ba6] text-white rounded-lg text-xs font-semibold"
            >
              Contact Vrinda
            </a>
          </div>
        )}

        {/* View All Button */}
        <div className="mt-12 text-center">
          <a
            href="/properties"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 hover:border-[#0a4ba6] text-slate-800 hover:text-[#0a4ba6] rounded-full text-xs font-bold uppercase tracking-wider shadow-xs hover:shadow-md transition-all group"
          >
            <span>View All Available Properties</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

      </div>
    </section>
  );
}
