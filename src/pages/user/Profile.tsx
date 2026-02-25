// src/pages/user/Profile.tsx
import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useUIStore } from '../../stores/uiStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export const Profile: React.FC = () => {
  const { user, updateProfile } = useAuthStore();
  const { addToast } = useUIStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    addToast('Profile updated successfully', 'success');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Profile & Settings</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <img 
              src={user?.avatar || 'https://via.placeholder.com/100'} 
              alt={user?.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2
              ${user?.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}
            `}>
              {user?.role === 'admin' ? 'Administrator' : 'Member'}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={!isEditing}
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              disabled
            />
            <Input
              label="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              disabled={!isEditing}
              placeholder="+1 555-0123"
            />
            <Input
              label="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              disabled={!isEditing}
              placeholder="City, State"
            />
          </div>

          <div className="flex gap-3 pt-4">
            {isEditing ? (
              <>
                <Button 
                  type="button" 
                  variant="outline" 
                  fullWidth
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: user?.name || '',
                      email: user?.email || '',
                      phone: user?.phone || '',
                      location: user?.location || '',
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" fullWidth>
                  Save Changes
                </Button>
              </>
            ) : (
              <Button 
                type="button" 
                fullWidth
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Account Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">Member</p>
            <p className="text-sm text-gray-600">Since {new Date(user?.createdAt || '').toLocaleDateString()}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{user?.role === 'admin' ? 'Admin' : 'User'}</p>
            <p className="text-sm text-gray-600">Account Type</p>
          </div>
        </div>
      </div>
    </div>
  );
};