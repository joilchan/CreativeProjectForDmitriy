import React, { useEffect, useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { ProductForm } from './components/ProductForm';
import { Modal } from './components/Modal';
import { ProductGrid } from './components/ProductGrid';
import { productService } from './services/productService';
import { Product, ProductInput } from './types';
import { Plus, Search, AlertTriangle } from 'lucide-react';

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
      setError("Не удалось загрузить продукты.");
      setProducts([]);
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
    if (!window.confirm("Вы уверен, что хотите удалить этот товар?")) return;

    try {
      await productService.delete(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert("Ошибка при удалении товара.");
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
      alert("Операция провалена. Пожалуйста, попробуйте еще раз.");
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
            <h1 className="text-3xl font-bold text-pink-900">Остатки склада</h1>
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
        <ProductGrid 
          products={filteredProducts}
          isLoading={loading}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? "Редактирование товара" : "Добавить новый товар"}
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