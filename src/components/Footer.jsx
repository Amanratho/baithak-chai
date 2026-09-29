import React from 'react';
import { siteData } from '../data';
import { ShieldCheck, Mail, Phone, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#030914] text-white pt-16 pb-32 border-t border-[#D4AF37]/20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Trust Badges Strip via .map() */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pb-12 border-b border-[#13253E]">
          {siteData.footer.trustBadges.map((badge, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 sm:gap-3 p-3.5 sm:p-4 rounded-2xl glass-navy border border-[#D4AF37]/15"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#09172B] text-[#D4AF37] flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
                <Sparkles className="w-3.5 h-3.5 text-[#F5D061]" />
              </div>
              <span className="text-xs font-medium text-[#C8D7EA]">
                {badge}
              </span>
            </div>
          ))}
        </div>

        {/* Brand Information & Direct Contacts */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-6 space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#D4AF37]/60 bg-white p-0.5 shrink-0 shadow-md">
                <img
                  src={siteData.assets.brandLogo}
                  alt={siteData.footer.brandName}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-royal text-xs font-bold tracking-[0.25em] text-[#D4AF37] block">
                  {siteData.footer.companyName}
                </span>
                <span className="font-display text-2xl font-bold text-white">
                  {siteData.brand.productName}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#8EA2BC] font-light max-w-md leading-relaxed">
              {siteData.footer.tagline}. Bringing people together over the finest, richest Upper Assam kadak chai.
            </p>

            {/* Regulatory & FSSAI Details */}
            <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-[#E5DCCB]">
              <span className="px-3 py-1 rounded-full bg-[#0B1E38] border border-[#D4AF37]/30 text-[#D4AF37] font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                {siteData.footer.fssaiText}
              </span>
              <span className="text-[#8EA2BC]">
                Net Wt: <strong className="text-white">{siteData.brand.netWeight}</strong>
              </span>
            </div>
          </div>

          {/* Consumer Care & Contact Details (No Address) */}
          <div className="md:col-span-6 space-y-3 text-xs text-[#9EB3CC]">
            <h5 className="font-royal text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#D4AF37]">
              Consumer Care & Inquiries
            </h5>

            <div className="space-y-2.5">
              <a
                href={`mailto:${siteData.footer.contactEmail}`}
                className="flex items-center gap-2.5 hover:text-[#D4AF37] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="text-sm text-[#E2EAF4] hover:underline">{siteData.footer.contactEmail}</span>
              </a>

              <a
                href={`tel:${siteData.footer.contactPhone}`}
                className="flex items-center gap-2.5 hover:text-[#D4AF37] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="text-sm text-[#E2EAF4] font-medium">{siteData.footer.contactPhone}</span>
                <span className="text-[11px] text-[#7E93AC]">(Mon - Sat, 9:00 AM - 7:00 PM IST)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-[#13253E] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6F8299] gap-3">
          <p>{siteData.footer.copyright}</p>
          <p className="flex items-center gap-1 text-[#8FA3BC]">
            Brewed with <Heart className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" /> for heartfelt moments.
          </p>
        </div>
      </div>
    </footer>
  );
}
