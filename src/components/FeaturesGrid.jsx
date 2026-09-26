import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../data';
import { Sparkles, CheckCircle2, Award, ShieldCheck, HeartHandshake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturesGrid() {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useGSAP(
    () => {
      // Staggered fade in & slide up of the 4 glassmorphism cards
      const cards = gsap.utils.toArray('.feature-card');

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 70,
          scale: 0.94,
          filter: 'blur(6px)',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.1,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Parallax effect on scroll
      cards.forEach((card, index) => {
        const speed = index % 2 === 0 ? 30 : -25;
        gsap.to(card, {
          y: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-28 md:py-36 bg-[#050D1A] text-white overflow-hidden border-t border-[#D4AF37]/15"
    >
      {/* Background Ambient Lighting & Glow */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#163660]/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D4AF37]/30 bg-[#09172B]/60 backdrop-blur mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#F5D061]" />
            <span className="text-[11px] font-royal uppercase tracking-[0.25em] text-[#F5D061]">
              The Craft of Royal Blending
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Four Pillars Of <span className="text-gold-gradient">Unrivaled Excellence</span>
          </h2>
          <p className="text-base text-[#9EB2CB] font-light leading-relaxed">
            Every grain of Baithak CTC tea embodies decades of tea-making heritage, calibrated for the discerning Indian palate that demands intensity, malty sweetness, and true hospitality.
          </p>
        </div>

        {/* 4 Glassmorphism Cards Rendered via .map() */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {siteData.features.map((feature, index) => (
            <div
              key={feature.id || index}
              className="feature-card group relative p-8 rounded-3xl glass-navy border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#D4AF37]/15 flex flex-col justify-between"
            >
              {/* Top Accent Gradient Border on Hover */}
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 group-hover:via-[#F5D061] to-transparent transition-all duration-500" />

              <div>
                {/* Index & Tag */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-royal text-sm font-bold text-[#D4AF37]/80 group-hover:text-[#F5D061] transition-colors">
                    0{index + 1}
                  </span>
                  <span className="text-[10px] uppercase font-semibold tracking-wider px-2.5 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/25">
                    {feature.tag}
                  </span>
                </div>

                {/* Feature Title */}
                <h3 className="font-display text-2xl font-bold text-[#FFF5DF] mb-3 group-hover:text-[#FFE386] transition-colors">
                  {feature.title}
                </h3>

                {/* Feature Description */}
                <p className="text-sm text-[#A5B6CB] leading-relaxed font-light mb-6">
                  {feature.description}
                </p>
              </div>

              {/* Bottom Badge Highlight */}
              <div className="pt-4 border-t border-[#1C3252]/80 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="text-xs font-medium tracking-wide text-[#E8EDF5]">
                  {feature.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
