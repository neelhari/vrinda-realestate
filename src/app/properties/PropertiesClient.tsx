'use client';

import React, { useState, useMemo } from 'react';
import { Property, PropertyType } from '@/lib/types';
import PropertyCard from '@/components/properties/PropertyCard';
import { Search, Filter, RotateCcw, Building2, SlidersHorizontal } from 'lucide-react';

interface PropertiesClientProps {
  initialProperties: Property[];
}

export default function PropertiesClient({ initialProperties }: PropertiesClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<PropertyType | 'all'>('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');

  const filteredProperties = useMemo(() => {
    return initialProperties.filter((property) => {
      // Search text match
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchTitle = property.title.toLowerCase().includes(query);
        const matchLocation = property.location.toLowerCase().includes(query);
        const matchAddress = property.address.toLowerCase().includes(query);
        if (!matchTitle && !matchLocation && !matchAddress) {
          return false;
        }
      }

      // Type match
      if (selectedType !== 'all' && property.type !== selectedType) {
        return false;
      }

      // Location match
      if (selectedLocation !== 'all') {
        if (!property.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
          return false;
        }
      }

      // Budget match
      if (selectedBudget !== 'all') {
        const price = property.price || 0;
        if (selectedBudget === 'under25' && price > 2500000) return false;
        if (selectedBudget === '25to50' && (price < 2500000 || price > 5000000)) return false;
        if (selectedBudget === '50to100' && (price < 5000000 || price > 10000000)) return false;
        if (selectedBudget === 'above100' && price < 10000000) return false;
      }

      return true;
    });
  }, [initialProperties, searchTerm, selectedType, selectedLocation, selectedBudget]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    setSelectedLocation('all');
    setSelectedBudget('all');
  };

  return (
    <section className="py-12 bg-[#f8fafc] grow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search & Filter Bar */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-200 mb-10 space-y-4">
          
          {/* Top Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by location (e.g. Koppolu, Kurnool Road), property title, or keyword..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-[#0a4ba6] focus:bg-white transition-all"
            />
          </div>

          {/* Filter Dropdowns Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            
            {/* Property Type */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                Property Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-[#0a4ba6]"
              >
                <option value="all">All Property Types</option>
                <option value="plot">Residential Plots</option>
                <option value="villa">Luxury Villas</option>
                <option value="house">Independent Houses</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                Location Area
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-[#0a4ba6]"
              >
                <option value="all">All Locations</option>
                <option value="koppolu">Koppolu Belt</option>
                <option value="ongole">Ongole City Central</option>
                <option value="singarakonda">Singarakonda Corridor</option>
                <option value="kurnool">Kurnool Road Bypass</option>
              </select>
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                Budget Range
              </label>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-[#0a4ba6]"
              >
                <option value="all">Any Budget</option>
                <option value="under25">Under ₹ 25 Lakhs</option>
                <option value="25to50">₹ 25 Lakhs - ₹ 50 Lakhs</option>
                <option value="50to100">₹ 50 Lakhs - ₹ 1 Crore</option>
                <option value="above100">Above ₹ 1 Crore</option>
              </select>
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>

          </div>

        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-semibold text-slate-500">
            Showing <span className="text-slate-900 font-bold">{filteredProperties.length}</span> properties
          </p>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-lg mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No matching properties found</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search criteria or reset filters to view all available listings.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-[#0a4ba6] text-white rounded-lg text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
