import React, { useState } from 'react';
import { siteData } from '../data';
import { X, ShoppingBag, Truck, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrderModal({ isOpen, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
    paymentMethod: 'Cash on Delivery (COD)',
  });

  if (!isOpen) return null;

  const unitPrice = siteData.brand.mrp;
  const totalPrice = unitPrice * quantity;
  const totalWeight = quantity * 500;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderId = `BTK-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedOrderId(orderId);

    const payload = {
      orderId: orderId,
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      pincode: formData.pincode,
      quantity: quantity,
      totalPrice: totalPrice,
      paymentMethod: formData.paymentMethod,
      timestamp: new Date().toISOString(),
    };

    // Send order data to Google Sheets in background (Zero WhatsApp interruption)
    if (siteData.orderSettings.googleSheetEndpoint) {
      try {
        await fetch(siteData.orderSettings.googleSheetEndpoint, {
          method: 'POST',
          mode: 'no-cors', // Avoids CORS blocking
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error('Sheet submission notice:', err);
      }
    }

    setIsSubmitting(false);
    setIsOrdered(true);

    // Celebratory Confetti
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F5D061', '#FFF0BD', '#FFFFFF'],
      });
    } catch (err) {
      // safe fallback
    }
  };

  const handleReset = () => {
    setIsOrdered(false);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#071426] border border-[#D4AF37]/40 shadow-2xl p-6 sm:p-8 text-white max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#0D223E] text-[#A0B0C8] hover:text-white flex items-center justify-center transition-colors border border-[#1E3658] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {isOrdered ? (
          /* Success Screen (Clean E-Commerce, Zero WhatsApp Interruption) */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#F5D061] flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8 text-[#F5D061]" />
            </div>

            <span className="font-royal text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Order Placed Successfully
            </span>
            <h3 className="font-display text-3xl font-bold text-white mt-1 mb-1">
              Thank You, {formData.name || 'Friend'}!
            </h3>
            
            {/* Generated Order ID Badge */}
            <div className="inline-block px-3.5 py-1 rounded-full bg-[#0D2444] border border-[#D4AF37]/40 text-[#F5D061] text-xs font-royal font-semibold tracking-wider my-2">
              Order ID: {generatedOrderId}
            </div>

            <p className="text-xs sm:text-sm text-[#A0B3CC] max-w-sm mx-auto leading-relaxed mb-6 font-light">
              Your order for <strong>{quantity} × {siteData.brand.productName} ({totalWeight}g)</strong> has been recorded in our dispatch system. Our team will verify and dispatch your pack shortly.
            </p>

            {/* Order Receipt Card */}
            <div className="p-4 rounded-2xl glass-navy border border-[#D4AF37]/30 text-left text-xs text-[#CBD8E8] space-y-2 mb-6">
              <div className="flex justify-between border-b border-[#1A3152] pb-1.5">
                <span className="text-[#8FA5BE]">Product:</span>
                <span className="font-medium text-white">{siteData.brand.name} - {siteData.brand.productName}</span>
              </div>
              <div className="flex justify-between border-b border-[#1A3152] pb-1.5">
                <span className="text-[#8FA5BE]">Quantity:</span>
                <span className="font-medium text-white">{quantity} Pack(s) ({totalWeight}g)</span>
              </div>
              <div className="flex justify-between border-b border-[#1A3152] pb-1.5">
                <span className="text-[#8FA5BE]">Total Amount:</span>
                <strong className="text-[#F5D061] text-sm">₹{totalPrice}</strong>
              </div>
              <div className="flex justify-between border-b border-[#1A3152] pb-1.5">
                <span className="text-[#8FA5BE]">Payment Mode:</span>
                <span className="uppercase font-semibold text-white">{formData.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-0.5">
                <span className="text-[#8FA5BE]">Estimated Delivery:</span>
                <span className="text-emerald-400 font-semibold">{siteData.orderSettings.estimatedDelivery}</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38612] text-[#050D1A] font-bold text-xs uppercase tracking-wider hover:scale-102 transition-all cursor-pointer shadow-lg"
            >
              Continue Browsing
            </button>
          </div>
        ) : (
          /* Order Form */
          <div>
            {/* Header */}
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-[#D4AF37]/40 shrink-0 bg-white p-0.5">
                <img
                  src={siteData.assets.productPouchFront}
                  alt={siteData.brand.productName}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-royal text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                  Estate Fresh Harvest
                </span>
                <h3 className="font-display text-2xl font-bold text-white leading-tight">
                  {siteData.brand.name} - {siteData.brand.productName}
                </h3>
                <p className="text-xs text-[#A0B0C8]">
                  500g Fresh Zip Pouch · {siteData.brand.fssaiLicense}
                </p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-4 p-3.5 rounded-2xl glass-navy border border-[#D4AF37]/25">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#A0B0C8] block mb-2">
                Select Quantity:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 4].map((qty) => (
                  <button
                    key={qty}
                    type="button"
                    onClick={() => setQuantity(qty)}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                      quantity === qty
                        ? 'bg-[#D4AF37] text-[#050D1A] border-[#D4AF37] font-bold shadow-md'
                        : 'bg-[#0A1A30] text-[#CBD8E9] border-[#1C3352] hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <div>{qty} Pack{qty > 1 ? 's' : ''}</div>
                    <div className="text-[10px] opacity-80">{qty * 500}g</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs text-[#CBD8E9] block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#09172B] border border-[#1E3658] text-white text-sm focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#CBD8E9] block mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#09172B] border border-[#1E3658] text-white text-sm focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#CBD8E9] block mb-1">PIN / Postal Code</label>
                  <input
                    type="text"
                    required
                    placeholder="6-digit pincode"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#09172B] border border-[#1E3658] text-white text-sm focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[#CBD8E9] block mb-1">Delivery Address</label>
                <textarea
                  required
                  rows={2}
                  placeholder="House/Apartment, Street Name, Landmark, City"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-[#09172B] border border-[#1E3658] text-white text-sm focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Price & Delivery Summary */}
              <div className="p-3 rounded-2xl bg-[#09172B]/80 border border-[#D4AF37]/20 text-xs space-y-1">
                <div className="flex justify-between text-[#A0B0C8]">
                  <span>Subtotal ({quantity} × 500g):</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Shipping Fee:</span>
                  <span>{siteData.orderSettings.shippingCharge}</span>
                </div>
                <div className="flex justify-between text-[#CBD8E8]">
                  <span>Estimated Delivery:</span>
                  <span className="text-emerald-400 font-medium">{siteData.orderSettings.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between text-[#F5D061] font-semibold text-sm pt-1 border-t border-[#1B2F4E]">
                  <span>Total Amount:</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#ECC440] via-[#D4AF37] to-[#B38612] text-[#050D1A] font-bold text-xs uppercase tracking-wider shadow-lg gold-glow hover:scale-102 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#050D1A]" />
                    <span>Placing Your Order...</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#050D1A]" />
                    <span>Confirm Order · ₹{totalPrice}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#8EA2BC]">
                <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Cash on Delivery Available · Delivery {siteData.orderSettings.estimatedDelivery}</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
