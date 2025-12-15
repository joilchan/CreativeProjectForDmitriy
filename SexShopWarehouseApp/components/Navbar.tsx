import React from 'react';
import { Heart, Package } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-pink-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-pink-600">
            <Heart className="h-6 w-6 fill-current" />
          </div>
          <span className="self-center whitespace-nowrap text-2xl font-bold tracking-tight text-pink-900">
            Amour<span className="font-light text-pink-500"></span>
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-pink-50 px-3 py-1 text-sm font-medium text-pink-700">
          <Package className="h-4 w-4" />
          <span>Склад</span>
        </div>
      </div>
    </nav>
  );
};