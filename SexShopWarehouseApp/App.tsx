import React, { useEffect, useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { ProductForm } from './components/ProductForm';
import { Modal } from './components/Modal';
import { productService } from './services/productService';
import { Product, ProductInput } from './types';
import { PLACEHOLDER_IMAGE } from './constants';
import { Plus, Pencil, Trash2, Search, AlertTriangle, PackageOpen } from 'lucide-react';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Initial Fetch
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await productService.getAll();
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Не можем подключиться к серверу. Пожалуйста, попробуйте позже.");
      // Fallback data for visual demonstration if API fails
      setProducts([
        { id: 1, name: "Silk Blindfold", price: 15.99, stock: 45, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300", description: "Soft black silk blindfold." },
        { id: 2, name: "Massage Oil - Rose", price: 24.50, stock: 12, image: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=300", description: "Scented massage oil, 200ml." },
        { id: 3, name: "Lace Lingerie Set", price: 89.00, stock: 5, image: "https://images.unsplash.com/photo-1596451190630-186aff535bf2?auto=format&fit=crop&q=80&w=300", description: "Red lace set, size M." },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Вы уверены, что хотите удалить товар?")) return;

    try {
      await productService.delete(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert("Ошибка удаления товара.");
    }
  };

  const handleFormSubmit = async (data: ProductInput) => {
    setActionLoading(true);
    try {
      if (editingProduct && editingProduct.id) {
        // Update
        await productService.update(editingProduct.id, data);
        setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...data, id: editingProduct.id! } : p));
      } else {
        // Create
        const newProduct = await productService.create(data);
        setProducts(prev => [...prev, newProduct]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Операция не удалась. Пожалуйста, попробуйте снова.");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-rose-50 text-gray-800 pb-20">
      <Navbar />

      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-pink-900">Остаток на складе</h1>
            <p className="mt-1 text-pink-600">Удобно и с любовью</p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-pink-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-pink-200 transition-all hover:bg-pink-600 hover:scale-105 active:scale-95"
          >
            <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
            Добавить товар
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-pink-400" />
            </div>
            <input 
                type="text" 
                className="block w-full pl-10 pr-4 py-3 border border-pink-100 rounded-xl leading-5 bg-white placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 sm:text-sm shadow-sm text-gray-700"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl bg-amber-50 border border-amber-100 p-4 text-amber-800 shadow-sm">
            <AlertTriangle className="h-5 w-5" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Grid */}
        {loading ? (
           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
               {[1,2,3,4].map(i => (
                   <div key={i} className="h-80 rounded-2xl bg-white/50 animate-pulse"></div>
               ))}
           </div>
        ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-pink-100 p-6 rounded-full mb-4">
                    <PackageOpen className="h-12 w-12 text-pink-400" />
                </div>
                <h3 className="text-lg font-medium text-pink-900">Товар не найден</h3>
                <p className="text-pink-500 max-w-xs mx-auto mt-2">;(</p>
            </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
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
                    {product.stock > 0 ? `${product.stock} шт` : 'Out of Stock'}
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-1 text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                  <p className="mb-4 text-sm text-gray-500 line-clamp-2 min-h-[2.5em]">
                    {product.description || "No description provided."}
                  </p>
                  
                  <div className="mt-auto flex items-end justify-between">
                    <span className="text-xl font-bold text-pink-600">{product.price.toFixed(2)}р</span>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenEdit(product)}
                        className="rounded-lg bg-pink-50 p-2 text-pink-600 transition-colors hover:bg-pink-100 hover:text-pink-700"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="rounded-lg bg-red-50 p-2 text-red-600 transition-colors hover:bg-red-100 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? "Edit Product" : "Add New Product"}
      >
        <ProductForm
          initialData={editingProduct || undefined}
          onSubmit={handleFormSubmit}
          isLoading={actionLoading}
        />
      </Modal>
    </div>
  );
};

export default App;