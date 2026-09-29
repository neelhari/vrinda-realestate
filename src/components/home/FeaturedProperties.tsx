'use client';

import React, { useState } from 'react';
import { Property, PropertyType } from '@/lib/types';
import PropertyCard from '@/components/properties/PropertyCard';
import { motion } from 'framer-motion';
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
    <section className="py-14 sm:py-18 bg-[#f8fafc] border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title and Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a4ba6]/10 text-[#0a4ba6] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HANDPICKED INVENTORY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#0b1329] font-bold">
              Featured Properties
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-xl self-start md:self-auto overflow-x-auto">
            {(['all', 'plot', 'villa', 'house'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${
                  activeType === type
                    ? 'bg-white text-[#0a4ba6] shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {type === 'all' ? 'All Properties' : `${type}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Properties: Vertical Grid on Mobile, 2 on Tablet, 3 on Desktop */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredProperties.map((property, idx) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 max-w-md mx-auto space-y-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">No properties in this category</h3>
            <p className="text-xs text-slate-500">
              New developments are being prepared. Contact us directly for upcoming plots & homes in Ongole.
            </p>
          </div>
        )}

        {/* View All Button */}
        <div className="mt-10 text-center">
          <a
            href="/properties"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 hover:border-[#0a4ba6] text-slate-800 hover:text-[#0a4ba6] rounded-full text-xs font-bold uppercase tracking-wider shadow-2xs hover:shadow-xs transition-all group"
          >
            <span>Explore All Properties ({properties.length})</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

      </div>
    </section>
  );
}
