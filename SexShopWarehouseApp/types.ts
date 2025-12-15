export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image?: string;
  description?: string;
}

// Utility type for creating/editing where ID might not be present yet (creation)
export type ProductInput = Omit<Product, 'id'> & { id?: number };