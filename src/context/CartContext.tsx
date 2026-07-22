import React, { createContext, useContext, useState } from 'react';
import { MenuItem, CartItem } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: MenuItem, options?: Partial<CartItem>) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  promoCode: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  totalItemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [discountRate, setDiscountRate] = useState<number>(0);

  const addToCart = (item: MenuItem, options?: Partial<CartItem>) => {
    const size = options?.size || 'Standard';
    const milk = options?.milk || 'Whole';
    const sweetness = options?.sweetness || '100%';
    const quantity = options?.quantity || 1;
    const notes = options?.notes || '';

    const cartId = `${item.id}-${size}-${milk}-${sweetness}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.cartId === cartId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          cartId,
          item,
          quantity,
          size,
          milk,
          sweetness,
          notes,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setPromoCode(null);
    setDiscountRate(0);
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'AURA15' || clean === 'LUXURY15') {
      setPromoCode(clean);
      setDiscountRate(0.15);
      return { success: true, message: '15% Luxury discount applied!' };
    }
    if (clean === 'COFFEE20') {
      setPromoCode(clean);
      setDiscountRate(0.20);
      return { success: true, message: '20% Coffee Enthusiast discount applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try AURA15.' };
  };

  const subtotal = cartItems.reduce((acc, curr) => {
    let priceMultiplier = 1;
    if (curr.size === 'Grand') priceMultiplier = 1.25;
    if (curr.size === 'Reserve') priceMultiplier = 1.5;
    return acc + curr.item.price * priceMultiplier * curr.quantity;
  }, 0);

  const discount = subtotal * discountRate;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + tax;
  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        subtotal,
        tax,
        discount,
        total,
        promoCode,
        applyPromoCode,
        totalItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
