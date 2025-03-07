import React, { createContext, useContext, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size: string;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  updateQuantity: (id: number, size: string, type: 'increase' | 'decrease') => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (newItem: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === newItem.id && item.size === newItem.size
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === newItem.id && item.size === newItem.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...newItem, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id: number, size: string, action: 'increase' | 'decrease') => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id && item.size === size) {
            if (action === 'increase') {
              return { ...item, quantity: item.quantity + 1 };
            } else if (action === 'decrease') {
              return { ...item, quantity: item.quantity - 1 };
            }
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };
  

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
