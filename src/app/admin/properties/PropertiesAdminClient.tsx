'use client';

import React, { useState } from 'react';
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
  MapPin
} from 'lucide-react';

interface PropertiesAdminClientProps {
  initialProperties: Property[];
}

export default function PropertiesAdminClient({ initialProperties }: PropertiesAdminClientProps) {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [type, setType] = useState<PropertyType>('plot');
  const [status, setStatus] = useState<PropertyStatus>('available');
  const [featured, setFeatured] = useState(false);
  const [location, setLocation] = useState('Koppolu, Ongole');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('1850000');
  const [priceLabel, setPriceLabel] = useState('₹ 18.5 Lakhs onwards');
  const [area, setArea] = useState('167');
  const [areaUnit, setAreaUnit] = useState<AreaUnit>('sq.yards');
  const [dimensions, setDimensions] = useState('33 x 45.5 ft');
  const [facing, setFacing] = useState('East Facing');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [description, setDescription] = useState('');
  const [highlightsText, setHighlightsText] = useState('');
  const [amenitiesText, setAmenitiesText] = useState('');
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
    setPrice('1850000');
    setPriceLabel('₹ 18.5 Lakhs onwards');
    setArea('167');
    setAreaUnit('sq.yards');
    setDimensions('33 x 45.5 ft');
    setFacing('East Facing');
    setBedrooms('');
    setBathrooms('');
    setDescription('Meticulously planned gated residential plotted layout in Koppolu.');
    setHighlightsText('Immediate Clear-Title Registration\n40 ft Wide Blacktop Roads\nUnderground Drainage & Water Lines');
    setAmenitiesText('Gated Community\nAvenue Plantation\nStreet Lighting');
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
    setPrice(String(prop.price || ''));
    setPriceLabel(prop.priceLabel);
    setArea(String(prop.area || ''));
    setAreaUnit(prop.areaUnit);
    setDimensions(prop.dimensions || '');
    setFacing(prop.facing || '');
    setBedrooms(prop.bedrooms ? String(prop.bedrooms) : '');
    setBathrooms(prop.bathrooms ? String(prop.bathrooms) : '');
    setDescription(prop.description);
    setHighlightsText(prop.highlights ? prop.highlights.join('\n') : '');
    setAmenitiesText(prop.amenities ? prop.amenities.join('\n') : '');
    setImageUrl(prop.images && prop.images[0] ? prop.images[0] : '/images/category-plots.jpg');
    setDtcpApproved(Boolean(prop.dtcpApproved));
    setPossessionDate(prop.possessionDate || 'Immediate');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const propertyPayload = {
      id: editingProperty ? editingProperty.id : `prop-${Date.now()}`,
      title,
      slug: slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      type,
      status,
      featured,
      location,
      address,
      price: Number(price) || 0,
      priceLabel,
      area: Number(area) || 0,
      areaUnit,
      dimensions,
      facing,
      bedrooms: bedrooms ? Number(bedrooms) : undefined,
      bathrooms: bathrooms ? Number(bathrooms) : undefined,
      description,
      highlights: highlightsText.split('\n').filter(Boolean),
      amenities: amenitiesText.split('\n').filter(Boolean),
      images: [imageUrl],
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
    if (!confirm('Are you sure you want to delete this property?')) return;
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
    try {
      const res = await fetch(`/api/properties/${prop.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !prop.featured })
      });
      if (res.ok) {
        setProperties((prev) =>
          prev.map((p) => (p.id === prop.id ? { ...p, featured: !p.featured } : p))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">Property Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Add, edit, manage pricing and publish real estate listings.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0a4ba6] hover:bg-[#073575] text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Property</span>
        </button>
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Property</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {properties.map((prop) => (
                <tr key={prop.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-16 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                        <Image
                          src={prop.images && prop.images[0] ? prop.images[0] : '/images/category-plots.jpg'}
                          alt={prop.title}
                          fill
                          sizes="64px"
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
                  <td className="py-3.5 px-4 capitalize font-medium text-slate-800">
                    {prop.type}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {prop.location}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#0a4ba6]">
                    {prop.priceLabel}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        prop.status === 'available'
                          ? 'bg-emerald-100 text-emerald-800'
                          : prop.status === 'booked'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {prop.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => toggleFeatured(prop)}
                      className={`p-1.5 rounded-lg text-xs font-semibold ${
                        prop.featured ? 'text-amber-500' : 'text-slate-300'
                      }`}
                      title="Toggle Featured"
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <a
                        href={`/properties/${prop.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600"
                        title="View Public Page"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => openEditModal(prop)}
                        className="p-1.5 rounded-lg bg-blue-50 hover:bg-[#0a4ba6] hover:text-white text-[#0a4ba6]"
                        title="Edit Property"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(prop.id)}
                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600"
                        title="Delete Property"
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
      </div>

      {/* Add / Edit Property Modal Drawer */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-slate-900">
                  {editingProperty ? 'Edit Property Details' : 'Add New Property Listing'}
                </h3>
                <p className="text-xs text-slate-500">
                  Fill in the verified specifications for this property.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Vrinda Green Meadows – Koppolu"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#0a4ba6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    URL Slug (Optional)
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. vrinda-green-meadows-koppolu"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#0a4ba6]"
                  />
                </div>
              </div>

              {/* Type, Status, Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Property Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
                  >
                    <option value="plot">Residential Plot</option>
                    <option value="villa">Luxury Villa</option>
                    <option value="house">Independent House</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Availability Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
                  >
                    <option value="available">Available</option>
                    <option value="booked">Booked</option>
                    <option value="sold">Sold Out</option>
                  </select>
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="w-4 h-4 text-[#0a4ba6] rounded"
                    />
                    <span>Mark as Featured</span>
                  </label>
                </div>
              </div>

              {/* Location & Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Location Area *
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Koppolu, Ongole"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#0a4ba6]"
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
                    placeholder="e.g. Main Ring Road, Koppolu, Ongole"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#0a4ba6]"
                  />
                </div>
              </div>

              {/* Price & Price Label */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Numeric Price (INR)
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="1850000"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#0a4ba6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Price Label Text
                  </label>
                  <input
                    type="text"
                    value={priceLabel}
                    onChange={(e) => setPriceLabel(e.target.value)}
                    placeholder="e.g. ₹ 18.5 Lakhs onwards"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#0a4ba6]"
                  />
                </div>
              </div>

              {/* Area & Unit */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Area Value
                  </label>
                  <input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="167"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Area Unit
                  </label>
                  <select
                    value={areaUnit}
                    onChange={(e) => setAreaUnit(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
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
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Photo Asset Path
                </label>
                <select
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
                >
                  <option value="/images/category-plots.jpg">Plots Layout (/images/category-plots.jpg)</option>
                  <option value="/images/category-villas.jpg">Luxury Villas (/images/category-villas.jpg)</option>
                  <option value="/images/category-houses.jpg">Independent Houses (/images/category-houses.jpg)</option>
                  <option value="/images/hero-luxury-villa.jpg">Hero Luxury Villa (/images/hero-luxury-villa.jpg)</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden"
                />
              </div>

              {/* Highlights & Amenities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Highlights (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={highlightsText}
                    onChange={(e) => setHighlightsText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Amenities (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={amenitiesText}
                    onChange={(e) => setAmenitiesText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-hidden font-mono"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-[#0a4ba6] hover:bg-[#073575] text-white text-xs font-bold flex items-center gap-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? 'Saving...' : 'Save Property'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
