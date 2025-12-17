import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { PLACEHOLDER_IMAGE } from '../constants';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-pink-100 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-100/50"
    >
      {/* Image Area */}
      <div className="relative aspect-square overflow-hidden bg-pink-50">
        <img
          src={product.image || PLACEHOLDER_IMAGE}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
              (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
          }}
        />
        {/* Stock Badge */}
        <div className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold backdrop-blur-md ${
            product.stock > 10 
            ? 'bg-green-500/90 text-white' 
            : product.stock > 0 
              ? 'bg-amber-500/90 text-white' 
              : 'bg-red-500/90 text-white'
        }`}>
          {product.stock > 0 ? `${product.stock} шт` : 'Нет на складе'}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
        <p className="mb-4 text-sm text-gray-500 line-clamp-2 min-h-[2.5em]">
          {product.description || "Описание недоступно"}
        </p>
        
        <div className="mt-auto flex items-end justify-between">
          <span className="text-xl font-bold text-pink-600">{product.price.toFixed(2)}р</span>
          
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(product)}
              className="rounded-lg bg-pink-50 p-2 text-pink-600 transition-colors hover:bg-pink-100 hover:text-pink-700"
              title="Edit"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="rounded-lg bg-red-50 p-2 text-red-600 transition-colors hover:bg-red-100 hover:text-red-700"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};