// src/pages/user/AddCar.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useCarStore } from '../../stores/carStore';
import { useUIStore } from '../../stores/uiStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';

const brands = ['Toyota', 'Honda', 'Tesla', 'BMW', 'Mercedes-Benz', 'Ford', 'Audi', 'Lexus', 'Other'];

const transmissions: { value: 'Automatic' | 'Manual' | 'CVT'; label: string }[] = [
  { value: 'Automatic', label: 'Automatic' },
  { value: 'Manual', label: 'Manual' },
  { value: 'CVT', label: 'CVT' },
];

const fuelTypes: { value: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid'; label: string }[] = [
  { value: 'Petrol', label: 'Petrol' },
  { value: 'Diesel', label: 'Diesel' },
  { value: 'Electric', label: 'Electric' },
  { value: 'Hybrid', label: 'Hybrid' },
];

const listingTypes: { value: 'sale' | 'swap' | 'both'; label: string }[] = [
  { value: 'sale', label: 'For Sale' },
  { value: 'swap', label: 'For Swap' },
  { value: 'both', label: 'Sale or Swap' },
];

interface FormData {
  title: string;
  brand: string;
  model: string;
  year: number;
  price: string;
  mileage: string;
  transmission: 'Automatic' | 'Manual' | 'CVT' | '';
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | '';
  description: string;
  listingType: 'sale' | 'swap' | 'both';
}

export const AddCar: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addCar } = useCarStore();
  const { addToast } = useUIStore();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    mileage: '',
    transmission: '',
    fuelType: '',
    description: '',
    listingType: 'sale',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!formData.transmission || !formData.fuelType) {
      addToast('Please select transmission and fuel type', 'error');
      return;
    }

    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));

    addCar({
      title: formData.title,
      brand: formData.brand,
      model: formData.model,
      year: Number(formData.year),
      price: Number(formData.price),
      mileage: Number(formData.mileage),
      transmission: formData.transmission,
      fuelType: formData.fuelType,
      images: images.length > 0 ? images : ['https://via.placeholder.com/800x600'],
      description: formData.description,
      ownerId: user.id,
      location: user.location || 'Unknown',
      listingType: formData.listingType,
    });

    addToast('Car listed successfully! Pending approval.', 'success');
    setIsSubmitting(false);
    navigate('/my-listings');
  };

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">List Your Car</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Photos</label>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {images.map((img, idx) => (
              <div key={idx} className="relative aspect-square rounded-lg overflow-hidden">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
              <Plus className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">Add Photo</span>
              <input 
                type="file" 
                accept="image/*" 
                multiple 
                className="hidden" 
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <p className="text-xs text-gray-500">Upload up to 8 photos. First photo will be the cover.</p>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Title"
            required
            value={formData.title}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="e.g., Toyota Camry 2020 - Excellent Condition"
          />
          
          <Select
            label="Brand"
            required
            options={brands.map(b => ({ value: b, label: b }))}
            value={formData.brand}
            onChange={(e) => updateField('brand', e.target.value)}
          />
          
          <Input
            label="Model"
            required
            value={formData.model}
            onChange={(e) => updateField('model', e.target.value)}
            placeholder="e.g., Camry"
          />
          
          <Input
            label="Year"
            type="number"
            required
            min="1900"
            max={new Date().getFullYear() + 1}
            value={formData.year}
            onChange={(e) => updateField('year', Number(e.target.value))}
          />
        </div>

        {/* Pricing & Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Price ($)"
            type="number"
            required
            min="0"
            value={formData.price}
            onChange={(e) => updateField('price', e.target.value)}
            placeholder="25000"
          />
          
          <Input
            label="Mileage"
            type="number"
            required
            min="0"
            value={formData.mileage}
            onChange={(e) => updateField('mileage', e.target.value)}
            placeholder="45000"
          />
          
          <Select
            label="Transmission"
            required
            options={transmissions}
            value={formData.transmission}
            onChange={(e) => updateField('transmission', e.target.value as 'Automatic' | 'Manual' | 'CVT')}
          />
          
          <Select
            label="Fuel Type"
            required
            options={fuelTypes}
            value={formData.fuelType}
            onChange={(e) => updateField('fuelType', e.target.value as 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid')}
          />
        </div>

        {/* Listing Type */}
        <Select
          label="Listing Type"
          required
          options={listingTypes}
          value={formData.listingType}
          onChange={(e) => updateField('listingType', e.target.value as 'sale' | 'swap' | 'both')}
        />

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="Describe your car's condition, features, history..."
            className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            fullWidth
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            fullWidth 
            isLoading={isSubmitting}
          >
            List Car
          </Button>
        </div>
      </form>
    </div>
  );
};