import React, { createContext, useContext, useState } from "react";
import { ProductWithQuantity } from "../../types/Product";

const CartContext = createContext<{
  cartContent: ProductWithQuantity[];
  modifyCart: (product: ProductWithQuantity) => void;
  clearCart: () => void;
}>({
  cartContent: [],
  modifyCart: () => {},
  clearCart: () => {},
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartContent, setCartContent] = useState<ProductWithQuantity[]>([]);

  const modifyCart = (product: ProductWithQuantity) => {
    if (!cartContent.find((content) => content.id === product.id)) {
      if (product.quantity !== 0) setCartContent((prev) => [...prev, product]);
    } else {
      if (product.quantity === 0) {
        setCartContent((prev) => prev.filter((p) => p.id !== product.id));
        return;
      }
      setCartContent((prev) => {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: product.quantity } : p
        );
      });
    }
  };

  const clearCart = () => {
    setCartContent([]);
  };

  return (
    <CartContext.Provider value={{ cartContent, modifyCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  return useContext(CartContext);
};

export { CartProvider, useCart };
