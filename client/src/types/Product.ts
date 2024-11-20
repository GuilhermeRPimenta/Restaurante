interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string | undefined;
  imageUrl: string | undefined;
}

interface ProductsByCategory {
  [key: string]: {
    id: number;
    name: string;
    category: string;
    price: string;
    description: string | undefined;
    imageUrl: string | undefined;
  }[];
}

interface ProductWithQuantity {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string | undefined;
  imageUrl: string | undefined;
  quantity: number;
}

export { type Product, type ProductsByCategory, type ProductWithQuantity };
