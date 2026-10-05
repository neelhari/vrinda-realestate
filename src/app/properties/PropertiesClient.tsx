'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Property, PropertyType } from '@/lib/types';
import PropertyCard from '@/components/properties/PropertyCard';
import { Building2, ChevronDown, X, Sparkles, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface PropertiesClientProps {
  initialProperties: Property[];
}

const BUDGET_PRESETS = [
  { label: 'Under \u20B925L', min: 400000, max: 2500000 },
  { label: '\u20B925L \u2013 \u20B950L', min: 2500000, max: 5000000 },
  { label: '\u20B950L \u2013 \u20B91 Cr', min: 5000000, max: 10000000 },
  { label: '\u20B91 Cr \u2013 \u20B92.5 Cr', min: 10000000, max: 25000000 },
  { label: '\u20B92.5 Cr \u2013 \u20B94 Cr', min: 25000000, max: 40000000 },
  { label: 'Above \u20B94 Cr', min: 40000000, max: 100000000 },
];

function formatPriceShort(amount: number): string {
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return Number.isInteger(cr) ? ('\u20B9' + cr + ' Cr') : ('\u20B9' + cr.toFixed(1) + ' Cr');
  }
  const l = amount / 100000;
  return Number.isInteger(l) ? ('\u20B9' + l + 'L') : ('\u20B9' + l.toFixed(1) + 'L');
}

export default function PropertiesClient({ initialProperties }: PropertiesClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedType, setSelectedType] = useState<PropertyType | 'all'>('all');
  const [minPrice, setMinPrice] = useState<number>(400000);
  const [maxPrice, setMaxPrice] = useState<number>(40000000);
  const [isBudgetActive, setIsBudgetActive] = useState<boolean>(false);
  const [activePresetLabel, setActivePresetLabel] = useState<string>('');
  const [isBudgetOpen, setIsBudgetOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync state with URL search params on load or navigation
  useEffect(() => {
    const typeParam = searchParams.get('type') as PropertyType | 'all' | null;
    if (typeParam && ['plot', 'villa', 'house', 'commercial', 'all'].includes(typeParam)) {
      setSelectedType(typeParam);
    } else {
      setSelectedType('all');
    }

    const minParam = searchParams.get('minPrice');
    const maxParam = searchParams.get('maxPrice');

    if (minParam || maxParam) {
      const min = minParam ? parseInt(minParam, 10) : 400000;
      const max = maxParam ? parseInt(maxParam, 10) : 40000000;
      setMinPrice(min);
      setMaxPrice(max);
      setIsBudgetActive(true);

      const matchedPreset = BUDGET_PRESETS.find(p => p.min === min && p.max === max);
      if (matchedPreset) {
        setActivePresetLabel(matchedPreset.label);
      } else {
        setActivePresetLabel(`${formatPriceShort(min)} – ${formatPriceShort(max)}`);
      }
    } else {
      setMinPrice(400000);
      setMaxPrice(40000000);
      setIsBudgetActive(false);
      setActivePresetLabel('');
    }
  }, [searchParams]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsBudgetOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updateURL = (type: PropertyType | 'all', min?: number, max?: number, budgetActive?: boolean) => {
    const params = new URLSearchParams();
    if (type !== 'all') {
      params.set('type', type);
    }
    if (budgetActive && min !== undefined && max !== undefined) {
      params.set('minPrice', min.toString());
      params.set('maxPrice', max.toString());
    }
    const query = params.toString();
    router.push(query ? `/properties?${query}` : '/properties', { scroll: false });
  };

  const handleTypeChange = (type: PropertyType | 'all') => {
    setSelectedType(type);
    updateURL(type, minPrice, maxPrice, isBudgetActive);
  };

  const handleApplyPreset = (preset: typeof BUDGET_PRESETS[0]) => {
    setMinPrice(preset.min);
    setMaxPrice(preset.max);
    setIsBudgetActive(true);
    setActivePresetLabel(preset.label);
    setIsBudgetOpen(false);
    updateURL(selectedType, preset.min, preset.max, true);
  };

  const handleApplyCustom = () => {
    setIsBudgetActive(true);
    setActivePresetLabel(`${formatPriceShort(minPrice)} – ${formatPriceShort(maxPrice)}`);
    setIsBudgetOpen(false);
    updateURL(selectedType, minPrice, maxPrice, true);
  };

  const handleResetBudget = () => {
    setMinPrice(400000);
    setMaxPrice(40000000);
    setIsBudgetActive(false);
    setActivePresetLabel('');
    setIsBudgetOpen(false);
    updateURL(selectedType, 400000, 40000000, false);
  };

  const filteredProperties = useMemo(() => {
    return initialProperties.filter((property) => {
      // 1. Filter by Property Type
      if (selectedType !== 'all' && property.type !== selectedType) {
        return false;
      }

      // 2. Filter by Budget Range (Evaluates against actual property.price)
      if (isBudgetActive) {
        const pPrice = property.price || 0;
        // If property has a valid numerical price, ensure it falls in range
        if (pPrice > 0 && (pPrice < minPrice || pPrice > maxPrice)) {
          return false;
        }
      }

      return true;
    });
  }, [initialProperties, selectedType, isBudgetActive, minPrice, maxPrice]);

  return (
    <section className="py-6 sm:py-10 bg-[#f8fafc] grow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        
        {/* Filter Controls Row: Category Tabs + Price / Budget Dropdown */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200/90 shadow-xs">
          
          {/* Left: Category Filter Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-0.5 scrollbar-none">
            {(['all', 'plot', 'villa', 'house'] as const).map((type) => (
              <button
                key={type}
                onClick={() => handleTypeChange(type)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all capitalize ${
                  selectedType === type
                    ? 'bg-[#0a4ba6] text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/70'
                }`}
              >
                {type === 'all' ? 'All Properties' : `${type}s`}
              </button>
            ))}
          </div>

          {/* Right: Budget Filter Dropdown (₹4 Lakhs – ₹4 Crores) */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsBudgetOpen(!isBudgetOpen)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                isBudgetActive
                  ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-2xs'
                  : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="text-amber-600">💰</span>
              <span>{isBudgetActive ? activePresetLabel : 'Budget (₹4L – ₹4Cr)'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isBudgetOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Card */}
            {isBudgetOpen && (
              <div className="absolute right-0 mt-2 w-[310px] sm:w-[350px] bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-slate-900">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#0a4ba6]" />
                    <span>Select Price Range</span>
                  </div>
                  {isBudgetActive && (
                    <button
                      type="button"
                      onClick={handleResetBudget}
                      className="flex items-center gap-1 text-[11px] font-bold text-red-600 hover:text-red-700"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>

                {/* 1-Click Preset Chips (₹4 Lakhs to ₹4 Crores) */}
                <div className="grid grid-cols-2 gap-2 my-3.5">
                  {BUDGET_PRESETS.map((preset) => {
                    const isSelected = isBudgetActive && minPrice === preset.min && maxPrice === preset.max;
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => handleApplyPreset(preset)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all border ${
                          isSelected
                            ? 'bg-[#0a4ba6] text-white border-[#0a4ba6] shadow-2xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:border-[#0a4ba6]/40 hover:bg-blue-50/50'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Min / Max Selectors */}
                <div className="pt-3 border-t border-slate-100 space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Custom Range</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-semibold text-slate-500 block mb-1">Min Price</label>
                      <select
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#0a4ba6]"
                      >
                        <option value={400000}>₹4 Lakhs</option>
                        <option value={1000000}>₹10 Lakhs</option>
                        <option value={2500000}>₹25 Lakhs</option>
                        <option value={5000000}>₹50 Lakhs</option>
                        <option value={10000000}>₹1 Crore</option>
                        <option value={20000000}>₹2 Crores</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold text-slate-500 block mb-1">Max Price</label>
                      <select
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#0a4ba6]"
                      >
                        <option value={2500000}>₹25 Lakhs</option>
                        <option value={5000000}>₹50 Lakhs</option>
                        <option value={10000000}>₹1 Crore</option>
                        <option value={25000000}>₹2.5 Crores</option>
                        <option value={40000000}>₹4 Crores</option>
                        <option value={100000000}>₹10 Crores+</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleApplyCustom}
                    className="w-full py-2 mt-1 rounded-xl bg-[#0a4ba6] text-white text-xs font-bold shadow-2xs hover:bg-[#083a82] transition-colors"
                  >
                    Apply Custom Filter
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>

        {/* Active Filter Chips & Counter */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 font-medium px-0.5">
          <p>
            Showing <span className="font-bold text-slate-900">{filteredProperties.length}</span> verified properties in Ongole
            {selectedType !== 'all' && <span className="capitalize font-semibold text-[#0a4ba6]"> ({selectedType}s)</span>}
            {isBudgetActive && <span className="font-semibold text-amber-700"> [{activePresetLabel}]</span>}
          </p>

          {isBudgetActive && (
            <button
              type="button"
              onClick={handleResetBudget}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-red-600 bg-slate-100 hover:bg-red-50 px-2 py-1 rounded-md transition-colors"
            >
              <X className="w-3 h-3" />
              <span>Clear Budget Filter</span>
            </button>
          )}
        </div>

        {/* Properties Grid */}
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
            <h3 className="text-sm font-bold text-slate-800">No properties in this range</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your price filter or explore all available plots and villas.
            </p>
            <div className="flex items-center justify-center gap-2 pt-1">
              <button
                onClick={handleResetBudget}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold"
              >
                Reset Price Filter
              </button>
              <button
                onClick={() => { setSelectedType('all'); handleResetBudget(); }}
                className="px-4 py-2 bg-[#0a4ba6] text-white rounded-lg text-xs font-semibold shadow-2xs"
              >
                Show All
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
