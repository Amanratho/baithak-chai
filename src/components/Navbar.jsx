import React, { useState, useEffect } from 'react';
import { siteData } from '../data';
import { ShoppingBag } from 'lucide-react';

export default function Navbar({ onOpenCheckout }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-2.5 bg-[#050D1A]/90 backdrop-blur-xl border-b border-[#D4AF37]/25 shadow-xl shadow-black/40'
          : 'py-4 sm:py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a href="#hero" className="flex items-center gap-2.5 sm:gap-3 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-[#D4AF37]/60 bg-white p-0.5 group-hover:scale-105 transition-transform shadow-md">
            <img
              src={siteData.assets.brandLogo}
              alt={siteData.brand.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-royal text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#D4AF37]">
              {siteData.brand.name}
            </span>
            <span className="font-display text-base sm:text-lg tracking-wider text-white font-bold leading-none group-hover:text-[#FFF4D0] transition-colors">
              {siteData.brand.productName}
            </span>
          </div>
        </a>

        {/* Navigation Links via .map() */}
        <nav className="hidden md:flex items-center gap-7">
          {siteData.navigation.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="text-xs uppercase tracking-[0.2em] text-[#E0D7C6]/80 hover:text-[#D4AF37] transition-colors duration-200 py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-[10px] uppercase tracking-wider text-[#A0B0C8]">Net Wt.</span>
            <span className="text-xs font-semibold text-[#D4AF37]">{siteData.brand.netWeight}</span>
          </div>

          <button
            onClick={onOpenCheckout}
            id="nav-order-button"
            className="group relative inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3C669] to-[#C59B27] text-[#050D1A] font-bold text-[11px] sm:text-xs tracking-wider uppercase shadow-lg shadow-[#D4AF37]/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#050D1A]" />
            <span>Order ₹{siteData.brand.mrp}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
