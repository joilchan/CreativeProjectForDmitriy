import React from 'react';
import { PackageOpen } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading, onEdit, onDelete }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-80 rounded-2xl bg-white/50 animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-pink-100 p-6 rounded-full mb-4">
          <PackageOpen className="h-12 w-12 text-pink-400" />
        </div>
        <h3 className="text-lg font-medium text-pink-900">Товары не найдены</h3>
        <p className="text-pink-500 max-w-xs mx-auto mt-2">
          ;(.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};