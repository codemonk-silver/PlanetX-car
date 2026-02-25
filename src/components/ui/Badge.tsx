// src/components/ui/Badge.tsx
import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'sale' | 'swap' | 'both' | 'pending' | 'approved' | 'sold' | 'swapped' | 'default';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default',
  size = 'sm' 
}) => {
  const variants = {
    sale: 'bg-green-100 text-green-800 border-green-200',
    swap: 'bg-purple-100 text-purple-800 border-purple-200',
    both: 'bg-blue-100 text-blue-800 border-blue-200',
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    approved: 'bg-green-100 text-green-800 border-green-200',
    sold: 'bg-gray-100 text-gray-800 border-gray-200',
    swapped: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    default: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span className={`
      inline-flex items-center font-medium rounded-full border
      ${variants[variant]}
      ${sizes[size]}
    `}>
      {children}
    </span>
  );
};