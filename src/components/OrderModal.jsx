import React, { useState } from 'react';
import { siteData } from '../data';
import { X, ShoppingBag, Truck, CheckCircle2, MessageCircle, Send, PhoneCall } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrderModal({ isOpen, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [isOrdered, setIsOrdered] = useState(false);
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

  // Construct message for WhatsApp / SMS notification
  const generateOrderMessage = () => {
    return `📦 *NEW ORDER - NICE & GOOD BAITHAK TEA*
---------------------------------------
👤 *Customer:* ${formData.name || 'Not Provided'}
📱 *Phone:* ${formData.phone || 'Not Provided'}
📍 *Address:* ${formData.address || 'Not Provided'}
📮 *Pincode:* ${formData.pincode || 'Not Provided'}
---------------------------------------
☕ *Product:* ${siteData.brand.name} - ${siteData.brand.productName}
🔢 *Quantity:* ${quantity} Pack(s) (${totalWeight}g)
💰 *Total Amount:* ₹${totalPrice}
💳 *Payment Mode:* ${formData.paymentMethod}
🚚 *Estimated Delivery:* ${siteData.orderSettings.estimatedDelivery}
---------------------------------------
_Sent automatically via Baithak Tea Web Portal_`;
  };

  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(generateOrderMessage());
    return `https://wa.me/${siteData.orderSettings.notificationWhatsapp}?text=${text}`;
  };

  const getSmsUrl = () => {
    const text = encodeURIComponent(generateOrderMessage());
    return `sms:+91${siteData.orderSettings.notificationPhone}?body=${text}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOrdered(true);

    // Automatically trigger WhatsApp in new window/tab
    try {
      const whatsappUrl = getWhatsAppUrl();
      window.open(whatsappUrl, '_blank');
    } catch (err) {
      console.log('Popup prevented, user can click the button directly');
    }

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F5D061', '#FFF0BD', '#FFFFFF'],
      });
    } catch (err) {
      // safe fallback
    }
  };

  const handleReset = () => {
    setIsOrdered(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#071426] border border-[#D4AF37]/40 shadow-2xl p-6 sm:p-8 text-white max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#0D223E] text-[#A0B0C8] hover:text-white flex items-center justify-center transition-colors border border-[#1E3658] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {isOrdered ? (
          /* Success Screen */
          <div className="text-center py-5">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#F5D061] flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8 text-[#F5D061]" />
            </div>

            <span className="font-royal text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Order Placed Successfully
            </span>
            <h3 className="font-display text-3xl font-bold text-white mt-1 mb-2">
              Thank You, {formData.name || 'Friend'}!
            </h3>
            
            <p className="text-xs sm:text-sm text-[#A0B3CC] max-w-sm mx-auto leading-relaxed mb-5 font-light">
              Your order details for <strong>{quantity} × {siteData.brand.productName} ({totalWeight}g)</strong> have been compiled. A notification is sent directly to dispatch at <strong>{siteData.orderSettings.notificationPhoneDisplay}</strong>.
            </p>

            {/* Direct WhatsApp Action Button */}
            <div className="space-y-2.5 mb-5">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-green-900/30 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Send Order to WhatsApp ({siteData.orderSettings.notificationPhoneDisplay})</span>
              </a>

              <a
                href={getSmsUrl()}
                className="w-full py-2.5 px-4 rounded-full bg-[#0E2442] hover:bg-[#163660] border border-[#D4AF37]/30 text-[#E1D6C5] font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Send via SMS to {siteData.orderSettings.notificationPhoneDisplay}</span>
              </a>
            </div>

            {/* Order Summary Receipt */}
            <div className="p-4 rounded-2xl glass-navy border border-[#D4AF37]/30 text-left text-xs text-[#CBD8E8] space-y-1.5 mb-5">
              <div className="flex justify-between">
                <span>Total Amount Payable:</span>
                <strong className="text-[#F5D061] text-sm">₹{totalPrice}</strong>
              </div>
              <div className="flex justify-between">
                <span>Payment Mode:</span>
                <span className="uppercase font-semibold text-white">{formData.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Delivery:</span>
                <span className="text-emerald-400 font-semibold">{siteData.orderSettings.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between">
                <span>Dispatch Helpline:</span>
                <span className="text-[#D4AF37] font-semibold">{siteData.orderSettings.notificationPhoneDisplay}</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38612] text-[#050D1A] font-bold text-xs uppercase tracking-wider hover:scale-102 transition-all cursor-pointer"
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
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#ECC440] via-[#D4AF37] to-[#B38612] text-[#050D1A] font-bold text-xs uppercase tracking-wider shadow-lg gold-glow hover:scale-102 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#050D1A]" />
                <span>Confirm Order · ₹{totalPrice}</span>
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
