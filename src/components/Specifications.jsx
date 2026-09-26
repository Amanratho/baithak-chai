import React from 'react';
import { siteData } from '../data';
import { Award, MapPin } from 'lucide-react';

export default function Specifications({ onOpenCheckout }) {
  return (
    <section className="py-20 sm:py-28 bg-[#09172B] text-white border-t border-[#D4AF37]/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-center">
          {/* Left Info Column */}
          <div className="lg:col-span-5">
            <span className="font-royal text-xs uppercase tracking-[0.3em] text-[#D4AF37] block mb-2 font-semibold">
              Authentic Assurance
            </span>
            <h3 className="font-display text-3xl sm:text-4xl font-bold mb-3 text-[#FFF4D0]">
              The Baithak Guarantee
            </h3>
            <p className="text-xs sm:text-sm text-[#9FB3CD] leading-relaxed mb-6 font-light">
              Cultivated in pristine high-altitude Assam tea gardens nurtured by monsoon showers and mineral-rich Brahmaputra soils. Every 500g pouch undergoes rigorous multi-stage quality grading.
            </p>

            <div className="p-4 rounded-2xl glass-navy border border-[#D4AF37]/25 mb-6 space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#E1D6C5]">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span><strong>Origin:</strong> {siteData.brand.origin}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#E1D6C5]">
                <Award className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span><strong>Grade:</strong> {siteData.brand.grade}</span>
              </div>
            </div>

            <button
              onClick={onOpenCheckout}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38612] text-[#050D1A] font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Order 500g Pack · ₹{siteData.brand.mrp}
            </button>
          </div>

          {/* Right Specifications Table */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl glass-navy border border-[#D4AF37]/25 p-5 sm:p-7 divide-y divide-[#1D3557]/60">
              {siteData.productSpecs.map((spec, idx) => (
                <div key={idx} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-[11px] sm:text-xs uppercase tracking-wider text-[#A0B0C8] font-medium">
                    {spec.label}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#FFF3D2] font-display">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
