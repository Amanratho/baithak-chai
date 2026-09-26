import React, { useState, useEffect } from 'react';
import { siteData } from '../data';
import { ShieldCheck, Zap } from 'lucide-react';

export default function CheckoutBar({ onOpenCheckout }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-300 transform ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-[#050D1A]/95 backdrop-blur-2xl border-t border-[#D4AF37]/35 shadow-[0_-10px_35px_rgba(0,0,0,0.6)] px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Product & Pricing Info */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#D4AF37]/40 shrink-0 bg-white p-0.5">
                <img
                  src={siteData.assets.productPouchFront}
                  alt={siteData.brand.productName}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-sm sm:text-base font-bold text-white leading-tight">
                  {siteData.brand.name} - {siteData.brand.productName}
                </span>
                <span className="text-[11px] text-[#A6B7CE]">
                  Net Wt. <strong className="text-[#D4AF37] font-semibold">{siteData.brand.netWeight}</strong> · {siteData.checkoutBar.variant}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 pl-2">
              <span className="text-xl sm:text-2xl font-bold text-[#F5D061] font-display">
                ₹{siteData.checkoutBar.price}
              </span>
              <span className="text-xs text-[#8292A6] line-through">
                ₹{siteData.checkoutBar.strikePrice}
              </span>
            </div>
          </div>

          {/* Compliance & Contact badges (Middle - Desktop) */}
          <div className="hidden lg:flex items-center gap-6 text-[11px] text-[#A5B6CB] border-x border-[#1A2E4B] px-6">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{siteData.brand.fssaiLicense}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span>Care: <strong className="text-[#E0D7C6]">{siteData.brand.customerCare}</strong></span>
            </div>
          </div>

          {/* Glowing Buy Now Button */}
          <div className="w-full md:w-auto flex items-center justify-end gap-3">
            <button
              onClick={onOpenCheckout}
              id="sticky-buy-now-button"
              className="w-full sm:w-auto relative group overflow-hidden px-7 py-3 rounded-full bg-gradient-to-r from-[#ECC440] via-[#D4AF37] to-[#B38612] text-[#050D1A] font-bold text-xs uppercase tracking-wider shadow-lg gold-glow hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-[#050D1A] fill-[#050D1A]" />
              <span>{siteData.checkoutBar.buttonText} · ₹{siteData.checkoutBar.price}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
