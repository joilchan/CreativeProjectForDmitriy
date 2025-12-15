import React, { useState, useEffect } from 'react';
import { ProductInput } from '../types';
import { Save, AlertCircle } from 'lucide-react';

interface ProductFormProps {
  initialData?: ProductInput;
  onSubmit: (data: ProductInput) => void;
  isLoading: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<ProductInput>({
    name: '',
    price: 0,
    stock: 0,
    image: '',
    description: ''
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ name: '', price: 0, stock: 0, image: '', description: '' });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || formData.price < 0 || formData.stock < 0) {
      setError('Please fill in all required fields with valid numbers.');
      return;
    }
    setError(null);
    onSubmit(formData);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  
  if (value === '' || /^\d*\.?\d*$/.test(value)) {
    setFormData({
      ...formData,
      price: value
    });
  }
};

const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  
  // Разрешаем только цифры и пустую строку
  if (value === '' || /^\d+$/.test(value)) {
    setFormData({
      ...formData,
      stock: value
    });
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-pink-900">Название</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="block w-full rounded-lg border border-pink-200 bg-pink-50/50 p-2.5 text-sm text-gray-900 focus:border-pink-500 focus:ring-pink-500 outline-none transition-colors"
          placeholder="Классный товар"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="mb-2 block text-sm font-medium text-pink-900">Цена (р)</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handlePriceChange}
            min="0"
            required
            className="block w-full rounded-lg border border-pink-200 bg-pink-50/50 p-2.5 text-sm text-gray-900 focus:border-pink-500 focus:ring-pink-500 outline-none transition-colors"
          />
        </div>
        <div>
          <label htmlFor="stock" className="mb-2 block text-sm font-medium text-pink-900">Остаток на складе</label>
          <input
            type="text"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleStockChange}
            min="0"
            required
            className="block w-full rounded-lg border border-pink-200 bg-pink-50/50 p-2.5 text-sm text-gray-900 focus:border-pink-500 focus:ring-pink-500 outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="image" className="mb-2 block text-sm font-medium text-pink-900">Image URL</label>
        <input
          type="url"
          id="image"
          name="image"
          value={formData.image || ''}
          onChange={handleChange}
          className="block w-full rounded-lg border border-pink-200 bg-pink-50/50 p-2.5 text-sm text-gray-900 focus:border-pink-500 focus:ring-pink-500 outline-none transition-colors"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-2 block text-sm font-medium text-pink-900">Описание</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description || ''}
          onChange={handleChange}
          className="block w-full rounded-lg border border-pink-200 bg-pink-50/50 p-2.5 text-sm text-gray-900 focus:border-pink-500 focus:ring-pink-500 outline-none transition-colors"
          placeholder="Описание товара..."
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:from-pink-600 hover:to-rose-600 focus:outline-none focus:ring-4 focus:ring-pink-300 disabled:opacity-50 transition-all shadow-md shadow-pink-200"
      >
        {isLoading ? 'Saving...' : <><Save className="h-4 w-4" /> Сохранить</>}
      </button>
    </form>
  );
};