'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Property, PropertyType, PropertyStatus, AreaUnit } from '@/lib/types';
import { 
  Building2, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Star, 
  CheckCircle2, 
  X, 
  Save, 
  Layers,
  MapPin,
  Video,
  FileText,
  Search,
  Upload,
  Loader2,
  ImageIcon
} from 'lucide-react';

interface PropertiesAdminClientProps {
  initialProperties: Property[];
}

export default function PropertiesAdminClient({ initialProperties }: PropertiesAdminClientProps) {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [type, setType] = useState<PropertyType>('plot');
  const [status, setStatus] = useState<PropertyStatus>('available');
  const [featured, setFeatured] = useState(false);
  const [location, setLocation] = useState('Koppolu, Ongole');
  const [address, setAddress] = useState('');
  
  // Price toggle (Show / Hide price)
  const [showPrice, setShowPrice] = useState(true);
  const [price, setPrice] = useState('1850000');
  const [priceLabel, setPriceLabel] = useState('₹ 18.5 Lakhs onwards');
  
  const [area, setArea] = useState('167');
  const [areaUnit, setAreaUnit] = useState<AreaUnit>('sq.yards');
  const [dimensions, setDimensions] = useState('33 x 45.5 ft');
  const [facing, setFacing] = useState('East Facing');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [floorPlanUrl, setFloorPlanUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('/images/category-plots.jpg');
  const [dtcpApproved, setDtcpApproved] = useState(true);
  const [possessionDate, setPossessionDate] = useState('Immediate Registration');

  const openNewModal = () => {
    setEditingProperty(null);
    setTitle('');
    setSlug('');
    setType('plot');
    setStatus('available');
    setFeatured(false);
    setLocation('Koppolu, Ongole');
    setAddress('Main Growth Corridor, Koppolu, Ongole, Andhra Pradesh');
    setShowPrice(true);
    setPrice('1850000');
    setPriceLabel('₹ 18.5 Lakhs onwards');
    setArea('167');
    setAreaUnit('sq.yards');
    setDimensions('33 x 45.5 ft');
    setFacing('East Facing');
    setDescription('Meticulously planned gated residential plotted layout with 40-foot wide BT roads, underground drainage, avenue plantation, and instant Sub-Registrar registration with clear titles in Koppolu.');
    setVideoUrl('');
    setFloorPlanUrl('');
    setImageUrl('/images/category-plots.jpg');
    setDtcpApproved(true);
    setPossessionDate('Immediate Registration');
    setIsModalOpen(true);
  };

  const openEditModal = (prop: Property) => {
    setEditingProperty(prop);
    setTitle(prop.title);
    setSlug(prop.slug);
    setType(prop.type);
    setStatus(prop.status);
    setFeatured(prop.featured);
    setLocation(prop.location);
    setAddress(prop.address);
    
    // Check if price is hidden
    const isHidden = !prop.price || prop.price === 0 || prop.priceLabel.toLowerCase().includes('request') || prop.priceLabel.toLowerCase().includes('contact');
    setShowPrice(!isHidden);
    setPrice(String(prop.price || ''));
    setPriceLabel(prop.priceLabel || (isHidden ? 'Price on Request' : ''));
    
    setArea(String(prop.area || ''));
    setAreaUnit(prop.areaUnit);
    setDimensions(prop.dimensions || '');
    setFacing(prop.facing || '');
    setDescription(prop.description || '');
    setVideoUrl(prop.videoUrl || '');
    setFloorPlanUrl(prop.floorPlanUrl || '');
    setImageUrl(prop.images && prop.images[0] ? prop.images[0] : '/images/category-plots.jpg');
    setDtcpApproved(Boolean(prop.dtcpApproved));
    setPossessionDate(prop.possessionDate || 'Immediate');
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setImageUrl(data.url);
      } else {
        alert('Upload failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const effectivePriceLabel = showPrice 
      ? (priceLabel.trim() || `₹ ${price} onwards`)
      : (priceLabel.trim() || 'Price on Request');

    const propertyPayload = {
      id: editingProperty ? editingProperty.id : `prop-${Date.now()}`,
      title,
      slug: slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      type,
      status,
      featured,
      location,
      address,
      price: showPrice ? (Number(price) || 0) : 0,
      priceLabel: effectivePriceLabel,
      area: Number(area) || 0,
      areaUnit,
      dimensions,
      facing,
      description,
      images: [imageUrl],
      videoUrl: videoUrl.trim() || undefined,
      floorPlanUrl: floorPlanUrl.trim() || undefined,
      dtcpApproved,
      reraApproved: dtcpApproved,
      possessionDate
    };

    try {
      if (editingProperty) {
        const res = await fetch(`/api/properties/${editingProperty.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(propertyPayload)
        });
        if (res.ok) {
          const data = await res.json();
          setProperties((prev) =>
            prev.map((p) => (p.id === editingProperty.id ? data.property : p))
          );
          setIsModalOpen(false);
        }
      } else {
        const res = await fetch('/api/properties', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(propertyPayload)
        });
        if (res.ok) {
          const data = await res.json();
          setProperties((prev) => [data.property, ...prev]);
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property listing?')) return;
    try {
      const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProperties((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFeatured = async (prop: Property) => {
    const updatedFeatured = !prop.featured;
    try {
      const res = await fetch(`/api/properties/${prop.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: updatedFeatured })
      });
      if (res.ok) {
        setProperties((prev) =>
          prev.map((p) => (p.id === prop.id ? { ...p, featured: updatedFeatured } : p))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChangeDirect = async (prop: Property, newStatus: PropertyStatus) => {
    try {
      const res = await fetch(`/api/properties/${prop.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setProperties((prev) =>
          prev.map((p) => (p.id === prop.id ? { ...p, status: newStatus } : p))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProperties = properties.filter((prop) => {
    if (filterType !== 'all' && prop.type !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        prop.title.toLowerCase().includes(q) ||
        prop.location.toLowerCase().includes(q) ||
        prop.address.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">Property Listings</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Easily showcase, highlight, or update your ventures across Ongole & Koppolu.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0a4ba6] hover:bg-[#073575] text-white rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Property</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by venture name or location..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#0a4ba6]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-500">Category:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-hidden"
          >
            <option value="all">All Properties ({properties.length})</option>
            <option value="plot">Plots</option>
            <option value="villa">Villas</option>
            <option value="house">Houses</option>
          </select>
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {filteredProperties.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Property / Venture</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-center">Featured on Home</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProperties.map((prop) => (
                  <tr key={prop.id} className="hover:bg-slate-50 transition-colors">
                    {/* Venture Name & Photo */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                          <Image
                            src={prop.images && prop.images[0] ? prop.images[0] : '/images/category-plots.jpg'}
                            alt={prop.title}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <a
                            href={`/properties/${prop.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-slate-900 hover:text-[#0a4ba6] line-clamp-1"
                          >
                            {prop.title}
                          </a>
                          <p className="text-[11px] text-slate-500">
                            {prop.area} {prop.areaUnit} {prop.facing ? `• ${prop.facing}` : ''}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 capitalize font-semibold text-slate-800">
                      {prop.type === 'plot' ? 'Residential Plot' : prop.type === 'villa' ? 'Luxury Villa' : 'Independent House'}
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {prop.location}
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 font-bold text-[#0a4ba6]">
                      {prop.priceLabel}
                    </td>

                    {/* Quick 1-Click Status Switcher */}
                    <td className="py-3.5 px-4">
                      <select
                        value={prop.status}
                        onChange={(e) => handleStatusChangeDirect(prop, e.target.value as PropertyStatus)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full border border-slate-200 focus:outline-hidden cursor-pointer ${
                          prop.status === 'available'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : prop.status === 'booked'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-red-50 text-red-700 border-red-200'
                        }`}
                      >
                        <option value="available">🟢 Available</option>
                        <option value="booked">🟡 Booked</option>
                        <option value="sold">🔴 Sold Out</option>
                      </select>
                    </td>

                    {/* Featured Star Toggle */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => toggleFeatured(prop)}
                        className={`p-2 rounded-xl transition-all ${
                          prop.featured ? 'bg-amber-50 text-amber-500' : 'text-slate-300 hover:text-slate-400'
                        }`}
                        title={prop.featured ? 'Featured on Homepage (Click to unpin)' : 'Click to Feature on Homepage'}
                      >
                        <Star className={`w-4 h-4 ${prop.featured ? 'fill-current' : ''}`} />
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`/properties/${prop.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                          title="View on Website"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => openEditModal(prop)}
                          className="p-2 rounded-xl bg-blue-50 hover:bg-[#0a4ba6] hover:text-white text-[#0a4ba6] transition-colors"
                          title="Edit Details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(prop.id)}
                          className="p-2 rounded-xl bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition-colors"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center text-slate-400 space-y-2">
            <Building2 className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-xs">No properties found matching your search.</p>
          </div>
        )}
      </div>

      {/* Simple, Non-Coder Friendly Property Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-serif font-bold text-slate-900">
                  {editingProperty ? 'Edit Property Listing' : 'Add New Property Listing'}
                </h3>
                <p className="text-xs text-slate-500">
                  Fill in the venture details below to showcase on your website.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              
              {/* 1. Venture Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Venture / Property Name *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Vrinda Green Meadows – Koppolu"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#0a4ba6]"
                />
              </div>

              {/* 2. Type & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Property Category
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden font-semibold"
                  >
                    <option value="plot">Residential Open Plot</option>
                    <option value="villa">Luxury Duplex Villa</option>
                    <option value="house">Independent Custom House</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Availability Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden font-semibold"
                  >
                    <option value="available">🟢 Available for Sale</option>
                    <option value="booked">🟡 Booked / Advance Taken</option>
                    <option value="sold">🔴 Sold Out</option>
                  </select>
                </div>
              </div>

              {/* 3. Price Control: Show or Hide Price */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900">Show Exact Price on Website?</p>
                    <p className="text-[11px] text-slate-500">
                      Turn OFF to hide price and show &quot;Price on Request&quot;
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showPrice}
                      onChange={(e) => setShowPrice(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0a4ba6]"></div>
                  </label>
                </div>

                {showPrice ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                        Numeric Amount (in ₹)
                      </label>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                          if (!priceLabel || priceLabel === 'Price on Request') {
                            setPriceLabel(`₹ ${e.target.value} onwards`);
                          }
                        }}
                        placeholder="e.g. 1850000"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                        Price Display Text
                      </label>
                      <input
                        type="text"
                        value={priceLabel}
                        onChange={(e) => setPriceLabel(e.target.value)}
                        placeholder="e.g. ₹ 18.5 Lakhs onwards"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      Hidden Price Display Text
                    </label>
                    <input
                      type="text"
                      value={priceLabel}
                      onChange={(e) => setPriceLabel(e.target.value)}
                      placeholder="Price on Request"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
                    />
                  </div>
                )}
              </div>

              {/* 4. Area, Unit, Facing & Dimensions */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Plot / Size *
                  </label>
                  <input
                    type="number"
                    required
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="167"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Unit
                  </label>
                  <select
                    value={areaUnit}
                    onChange={(e) => setAreaUnit(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden font-semibold"
                  >
                    <option value="sq.yards">Sq.Yards</option>
                    <option value="sq.ft">Sq.Ft</option>
                    <option value="cents">Cents</option>
                    <option value="acres">Acres</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Facing
                  </label>
                  <input
                    type="text"
                    value={facing}
                    onChange={(e) => setFacing(e.target.value)}
                    placeholder="e.g. East Facing"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    placeholder="e.g. 33 x 45.5 ft"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* 5. Location in Ongole */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Location Belt *
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Koppolu, Ongole"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Full Address / Landmark
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Near Koppolu Ring Road, Ongole"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* 6. Media: Real Photo Upload, YouTube Video & Layout Plan */}
              <div className="space-y-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-xs font-bold text-slate-900 uppercase">Media & Layout Documents</p>
                
                {/* Real File Upload + Preview */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-2">
                    Property Photo (Upload File or Select Preset)
                  </label>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* Live Preview Thumbnail */}
                    <div className="relative h-24 w-32 rounded-xl overflow-hidden bg-slate-200 border-2 border-slate-300 shrink-0">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt="Cover Preview"
                          fill
                          sizes="128px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-slate-400">
                          <ImageIcon className="w-8 h-8" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 grow w-full">
                      {/* Hidden File Input */}
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept="image/*"
                        className="hidden"
                      />

                      {/* Upload Button */}
                      <button
                        type="button"
                        disabled={isUploading}
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold shadow-2xs transition-all cursor-pointer"
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-[#0a4ba6]" />
                            <span>Uploading Photo...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 text-[#0a4ba6]" />
                            <span>Upload Image from Phone/PC</span>
                          </>
                        )}
                      </button>

                      {/* Stock Preset Selector */}
                      <select
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 focus:outline-hidden"
                      >
                        <option value={imageUrl}>Selected Image ({imageUrl})</option>
                        <option value="/images/category-plots.jpg">Plots Preset (/images/category-plots.jpg)</option>
                        <option value="/images/category-villas.jpg">Luxury Villa Preset (/images/category-villas.jpg)</option>
                        <option value="/images/category-houses.jpg">Independent House Preset (/images/category-houses.jpg)</option>
                        <option value="/images/hero-luxury-villa.jpg">Hero Villa Preset (/images/hero-luxury-villa.jpg)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* YouTube Link & Layout Plan Link */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200/80">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1 flex items-center gap-1">
                      <Video className="w-3.5 h-3.5 text-red-600" />
                      <span>YouTube Drone / Video Link</span>
                    </label>
                    <input
                      type="url"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-[#0a4ba6]" />
                      <span>Master Layout Plan / PDF Link</span>
                    </label>
                    <input
                      type="text"
                      value={floorPlanUrl}
                      onChange={(e) => setFloorPlanUrl(e.target.value)}
                      placeholder="e.g. Link to Layout Sketch or Brochure PDF"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* 7. Spacious Short Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Property Description & Venture Highlights *
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write details about the road widths (e.g. 40ft blacktop), underground drainage, water supply, DTCP sanctions, nearby landmarks, and immediate registration in Koppolu..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#0a4ba6] leading-relaxed"
                />
              </div>

              {/* 8. Bottom Actions Bar: Featured Checkbox | Cancel | Save Button */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                
                {/* Left: Compact Featured Checkbox */}
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800 bg-amber-50/80 px-3 py-2 rounded-xl border border-amber-200 hover:bg-amber-100/70 transition-colors w-full sm:w-auto">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 text-[#0a4ba6] rounded cursor-pointer accent-[#0a4ba6]"
                  />
                  <span className="flex items-center gap-1">
                    <Star className={`w-3.5 h-3.5 ${featured ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
                    <span>Feature on Homepage</span>
                  </span>
                </label>

                {/* Right: Cancel & Save Buttons */}
                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2.5 rounded-xl bg-[#0a4ba6] hover:bg-[#073575] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isSaving ? 'Saving...' : 'Save Property Listing'}</span>
                  </button>
                </div>

              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
