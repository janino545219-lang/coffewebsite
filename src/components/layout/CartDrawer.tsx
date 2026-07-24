import React, { useEffect, useState, useRef } from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { gsap } from 'gsap';

export const CartDrawer: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, discount, total, subtotal } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    window.addEventListener('toggle-cart', handleToggle);
    return () => window.removeEventListener('toggle-cart', handleToggle);
  }, []);

  // Use GSAP for entry/exit animations instead of just CSS classes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Disable lenis smooth scroll while cart is open
      if ((window as any).__lenis) (window as any).__lenis.stop();
      
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out', display: 'block' });
      gsap.to(drawerRef.current, { x: 0, duration: 0.5, ease: 'power3.out' });
      
      if (itemsRef.current && itemsRef.current.children.length > 0) {
        gsap.fromTo(itemsRef.current.children,
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2, ease: 'power2.out' }
        );
      }
    } else {
      document.body.style.overflow = 'auto';
      if ((window as any).__lenis) (window as any).__lenis.start();

      gsap.to(drawerRef.current, { x: '100%', duration: 0.4, ease: 'power3.in' });
      gsap.to(overlayRef.current, { 
        opacity: 0, duration: 0.4, ease: 'power2.in', 
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = 'none';
        }
      });
    }
  }, [isOpen]);

  const closeCart = () => setIsOpen(false);

  const totalAmount = total;

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-coffee-950/80 backdrop-blur-sm z-50 hidden opacity-0"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed inset-y-0 right-0 w-full max-w-md bg-coffee-950 border-l border-amber-500/20 shadow-2xl z-50 flex flex-col transform translate-x-full"
      >
        <div className="flex items-center justify-between p-6 border-b border-amber-500/10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="font-serif text-2xl font-bold text-stone-100">Your Order</h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-amber-500/10 text-amber-200/50 hover:text-amber-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div ref={itemsRef} className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-amber-200/50 space-y-4">
              <ShoppingBag className="w-12 h-12 opacity-20" />
              <p className="font-serif text-lg">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((cartItem) => (
              <div key={cartItem.cartId} className="flex gap-4 p-4 rounded-2xl bg-coffee-900/50 border border-amber-500/10">
                <img src={cartItem.item.image} alt={cartItem.item.name} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-stone-200">{cartItem.item.name}</h3>
                    <p className="text-amber-400 font-mono text-sm">${cartItem.item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 bg-coffee-950 rounded-lg p-1 border border-amber-500/20">
                      <button
                        onClick={() => updateQuantity(cartItem.cartId, -1)}
                        className="p-1 hover:text-amber-400 transition-colors text-amber-200/70"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{cartItem.quantity}</span>
                      <button
                        onClick={() => updateQuantity(cartItem.cartId, 1)}
                        className="p-1 hover:text-amber-400 transition-colors text-amber-200/70"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(cartItem.cartId)}
                      className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t border-amber-500/10 bg-coffee-950">
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm text-amber-100/70">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-emerald-400">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold text-amber-200 pt-2 border-t border-amber-500/10">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <button className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-coffee-950 font-bold tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all group">
              <span>Secure Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
