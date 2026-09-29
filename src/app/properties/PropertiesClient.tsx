'use client';

import React, { useState, useMemo } from 'react';
import { Property, PropertyType } from '@/lib/types';
import PropertyCard from '@/components/properties/PropertyCard';
import { Building2 } from 'lucide-react';

interface PropertiesClientProps {
  initialProperties: Property[];
}

export default function PropertiesClient({ initialProperties }: PropertiesClientProps) {
  const [selectedType, setSelectedType] = useState<PropertyType | 'all'>('all');

  const filteredProperties = useMemo(() => {
    return initialProperties.filter((property) => {
      if (selectedType !== 'all' && property.type !== selectedType) {
        return false;
      }
      return true;
    });
  }, [initialProperties, selectedType]);

  return (
    <section className="py-6 sm:py-10 bg-[#f8fafc] grow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        
        {/* Clean Category Filter Tabs Only (Search bar removed per user request) */}
        <div className="flex items-center justify-between sm:justify-start gap-2 overflow-x-auto pb-1 scrollbar-none">
          {(['all', 'plot', 'villa', 'house'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all capitalize shadow-2xs ${
                selectedType === type
                  ? 'bg-[#0a4ba6] text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {type === 'all' ? 'All Properties' : `${type}s`}
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-0.5">
          <p>
            Showing <span className="font-bold text-slate-900">{filteredProperties.length}</span> verified properties in Ongole
          </p>
        </div>

        {/* Properties Grid (1 card per row on mobile, 2 on tablet, 3 on desktop) */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 max-w-md mx-auto space-y-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">No properties in this category</h3>
            <p className="text-xs text-slate-500">
              New developments are being prepared. Contact us directly for upcoming plots & homes.
            </p>
            <button
              onClick={() => setSelectedType('all')}
              className="px-4 py-2 bg-[#0a4ba6] text-white rounded-lg text-xs font-semibold shadow-2xs"
            >
              Show All Properties
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
