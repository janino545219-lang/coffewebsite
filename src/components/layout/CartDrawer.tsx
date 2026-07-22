import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Tag, ArrowRight, CheckCircle2, ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    tax,
    discount,
    total,
    promoCode,
    applyPromoCode,
    clearCart,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ success: boolean; text: string } | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    setPromoMessage({ success: res.success, text: res.message });
    setInputCode('');
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      
      // Trigger golden celebratory confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#d4a373', '#e6b800', '#c87d55', '#f7f1e5'],
      });

      setTimeout(() => {
        clearCart();
        setOrderComplete(false);
        setIsCartOpen(false);
      }, 3500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* BACKDROP */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-coffee-950/95 backdrop-blur-2xl border-l border-amber-500/20 text-stone-100 flex flex-col shadow-2xl">
          {/* DRAWER HEADER */}
          <div className="p-6 border-b border-coffee-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-amber-100">Your Coffee Order</h3>
                <p className="text-xs text-amber-200/50">{cartItems.length} unique items in bag</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-coffee-800 text-amber-200/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ORDER COMPLETE OVERLAY */}
          {orderComplete ? (
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4 animate-scaleUp">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-2xl">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-gold-gradient">Order Placed Successfully!</h4>
              <p className="text-xs text-amber-100/70 max-w-xs leading-relaxed">
                Your artisanal coffee order <span className="font-mono text-amber-300 font-bold">#AUR-{Math.floor(1000 + Math.random() * 9000)}</span> is being crafted by our master baristas.
              </p>
              <div className="p-4 rounded-xl bg-coffee-900/60 border border-amber-500/20 text-xs text-amber-200/80 space-y-1 w-full max-w-xs">
                <p>Estimated Prep Time: <span className="text-amber-400 font-bold">8–12 mins</span></p>
                <p>Pickup Location: <span className="text-amber-400 font-bold">Glasshouse Express Counter</span></p>
              </div>
            </div>
          ) : (
            <>
              {/* ITEM LIST */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-amber-200/40 space-y-3">
                    <ShoppingBag className="w-12 h-12 stroke-[1]" />
                    <p className="font-serif text-lg text-amber-200/70">Your cart is currently empty</p>
                    <p className="text-xs max-w-xs">
                      Explore our artisanal coffee menu and add single-origin espresso or pastries to begin.
                    </p>
                  </div>
                ) : (
                  cartItems.map((cartItem) => {
                    let multiplier = 1;
                    if (cartItem.size === 'Grand') multiplier = 1.25;
                    if (cartItem.size === 'Reserve') multiplier = 1.5;
                    const itemPrice = cartItem.item.price * multiplier;

                    return (
                      <div
                        key={cartItem.cartId}
                        className="p-4 rounded-xl bg-coffee-900/40 border border-amber-500/15 flex gap-4 hover:border-amber-500/30 transition-all"
                      >
                        <img
                          src={cartItem.item.image}
                          alt={cartItem.item.name}
                          className="w-16 h-16 rounded-lg object-cover border border-amber-500/20"
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-start justify-between">
                            <h4 className="font-serif text-sm font-bold text-amber-100">
                              {cartItem.item.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(cartItem.cartId)}
                              className="text-amber-200/40 hover:text-red-400 transition-colors p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-1 text-[10px] text-amber-300/80">
                            <span className="px-1.5 py-0.5 rounded bg-coffee-800 border border-amber-500/20">
                              {cartItem.size}
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-coffee-800 border border-amber-500/20">
                              {cartItem.milk} Milk
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-coffee-800 border border-amber-500/20">
                              {cartItem.sweetness} Sweet
                            </span>
                          </div>
                          <div className="flex items-center justify-between pt-2">
                            <span className="font-mono text-xs font-bold text-amber-400">
                              ${(itemPrice * cartItem.quantity).toFixed(2)}
                            </span>
                            <div className="flex items-center gap-2 bg-coffee-950 border border-amber-500/20 rounded-lg px-2 py-0.5">
                              <button
                                onClick={() => updateQuantity(cartItem.cartId, -1)}
                                className="text-amber-200/70 hover:text-amber-400"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-mono font-bold w-4 text-center">
                                {cartItem.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(cartItem.cartId, 1)}
                                className="text-amber-200/70 hover:text-amber-400"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* SUMMARY & CHECKOUT SECTION */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-coffee-800/80 bg-coffee-950/80 space-y-4">
                  {/* PROMO CODE */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-amber-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Promo code (e.g. AURA15)"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-lg bg-coffee-900 border border-amber-500/20 text-xs text-amber-100 uppercase placeholder-amber-200/30 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-lg bg-coffee-800 hover:bg-coffee-700 text-amber-300 border border-amber-500/30 text-xs font-semibold"
                    >
                      Apply
                    </button>
                  </form>
                  {promoMessage && (
                    <p
                      className={`text-[11px] font-medium ${
                        promoMessage.success ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {promoMessage.text}
                    </p>
                  )}

                  {/* PRICE SUMMARY BREAKDOWN */}
                  <div className="space-y-1.5 text-xs text-amber-200/70 border-t border-coffee-800/60 pt-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono text-amber-100">${subtotal.toFixed(2)}</span>
                    </div>
                    {promoCode && (
                      <div className="flex justify-between text-emerald-400 font-medium">
                        <span>Promo Discount ({promoCode})</span>
                        <span className="font-mono">-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Estimated Tax (8%)</span>
                      <span className="font-mono text-amber-100">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-amber-300 pt-2 border-t border-coffee-800">
                      <span>Total Amount</span>
                      <span className="font-mono text-gold-gradient text-base">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* CHECKOUT BUTTON */}
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-coffee-950 font-bold text-sm tracking-wider uppercase shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50"
                  >
                    {isCheckingOut ? (
                      <div className="w-5 h-5 border-2 border-coffee-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Complete Order</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
