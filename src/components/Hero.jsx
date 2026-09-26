import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { siteData } from '../data';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function Hero({ onOpenCheckout }) {
  const containerRef = useRef(null);
  const crestRef = useRef(null);
  const brandRef = useRef(null);
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const taglineRef = useRef(null);
  const englishSubtextRef = useRef(null);
  const ctaGroupRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useGSAP(
    () => {
      // Instant, silky smooth 0.7s intro timeline for zero perceived load delay
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        crestRef.current,
        { opacity: 0, scale: 0.85, y: -15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45 },
        0.05
      )
      .fromTo(
        brandRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4 },
        0.15
      )
      .fromTo(
        headingRef.current,
        { opacity: 0, y: 25, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5 },
        0.25
      )
      .fromTo(
        subHeadingRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35 },
        0.35
      )
      .fromTo(
        taglineRef.current,
        { opacity: 0, y: 15, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45 },
        0.45
      )
      .fromTo(
        [englishSubtextRef.current, ctaGroupRef.current],
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
        0.55
      )
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
        0.7
      );

      gsap.to(scrollIndicatorRef.current, {
        y: 6,
        repeat: -1,
        yoyo: true,
        duration: 1.1,
        ease: 'sine.inOut',
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[92vh] sm:min-h-screen w-full flex items-center justify-center overflow-hidden bg-black select-none"
    >
      {/* Background WebP Image */}
      <img
        src={siteData.assets.heroBackground}
        alt="Assam Tea Estate"
        fetchPriority="high"
        loading="eager"
        className="absolute inset-0 w-full h-full object-cover object-center transform-gpu scale-102"
      />

      {/* Dark Luxury Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050D1A]/90 via-[#050D1A]/60 to-[#050D1A] transform-gpu pointer-events-none" />

      {/* Warm Golden Glow Orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[380px] sm:w-[550px] h-[380px] sm:h-[550px] bg-[#D4AF37]/12 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-14 text-center flex flex-col items-center">
        
        {/* Heritage Crest Emblem */}
        <div
          ref={crestRef}
          className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/70 shadow-2xl bg-white p-1 mb-3.5 transform-gpu"
        >
          <img
            src={siteData.assets.baithakCrest}
            alt="Baithak Royal Emblem"
            className="w-full h-full object-contain rounded-xl"
            loading="eager"
          />
        </div>

        {/* Origin Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D4AF37]/30 bg-[#050D1A]/75 backdrop-blur-md mb-3.5">
          <Sparkles className="w-3 h-3 text-[#F5D061]" />
          <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase text-[#F5D061]">
            {siteData.hero.badge}
          </span>
        </div>

        {/* Brand Name */}
        <p
          ref={brandRef}
          className="font-royal text-xs sm:text-sm md:text-base font-bold text-[#D4AF37] uppercase tracking-[0.3em] mb-1.5 drop-shadow"
        >
          {siteData.hero.brandTitle}
        </p>

        {/* Main Heading: Baithak */}
        <h1
          ref={headingRef}
          className="font-display text-6xl sm:text-8xl md:text-9xl font-bold text-white tracking-tight leading-none mb-1 text-gold-shimmer"
        >
          {siteData.hero.mainHeading}
        </h1>

        {/* Subtitle */}
        <p
          ref={subHeadingRef}
          className="font-royal text-[11px] sm:text-xs tracking-[0.35em] text-[#C0D0E5] uppercase font-semibold mb-5 sm:mb-6"
        >
          {siteData.hero.subHeading}
        </p>

        {/* Tagline Box with English & Hindi Subtitle */}
        <div
          ref={taglineRef}
          className="relative px-5 py-3 sm:px-7 sm:py-4 rounded-2xl bg-[#050D1A]/65 backdrop-blur-md border border-[#D4AF37]/35 max-w-2xl mb-4 shadow-2xl"
        >
          <p className="font-display text-xl sm:text-2xl md:text-3.5xl italic text-[#FFF7DC] tracking-wide leading-relaxed font-semibold">
            "{siteData.hero.tagline}"
          </p>
          <p className="font-royal text-[11px] tracking-widest text-[#D4AF37]/90 mt-1 uppercase">
            {siteData.hero.hindiTagline}
          </p>
        </div>

        {/* Descriptive context */}
        <p
          ref={englishSubtextRef}
          className="max-w-xl text-xs sm:text-sm text-[#C7D4E6] leading-relaxed font-light mb-7 sm:mb-8 text-balance px-4"
        >
          {siteData.hero.englishSubtext}
        </p>

        {/* Call to Actions */}
        <div
          ref={ctaGroupRef}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full sm:w-auto"
        >
          <button
            onClick={onOpenCheckout}
            id="hero-primary-cta"
            className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-[#ECC440] via-[#D4AF37] to-[#B38612] text-[#050D1A] font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl gold-glow hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            {siteData.hero.ctaPrimary}
          </button>

          <a
            href="#product-reveal"
            className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-full border border-[#D4AF37]/50 text-[#F5F0E6] hover:bg-[#D4AF37]/15 hover:border-[#D4AF37] transition-all duration-200 text-xs sm:text-sm tracking-wider uppercase font-medium text-center"
          >
            {siteData.hero.ctaSecondary}
          </a>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="mt-8 sm:mt-12 flex flex-col items-center gap-1 text-[#D4AF37]/80 hover:text-[#D4AF37] transition-colors"
        >
          <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-medium">
            {siteData.hero.scrollHint}
          </span>
          <ChevronDown className="w-4 h-4 text-[#D4AF37]" />
        </div>
      </div>
    </section>
  );
}
