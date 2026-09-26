import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../data';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function EmotionalClimax() {
  const sectionRef = useRef(null);
  const wordsContainerRef = useRef(null);
  const authorRef = useRef(null);
  const subtextRef = useRef(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray('.quote-word');

      // Fast, responsive 0.3s scrub for word revelation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=110%',
          pin: true,
          scrub: 0.3, // Fast & silky smooth
        },
      });

      tl.fromTo(
        words,
        {
          opacity: 0.15,
          color: '#24344E',
          y: 12,
        },
        {
          opacity: 1,
          color: '#FFE28A',
          y: 0,
          stagger: 0.1,
          ease: 'power1.out',
        }
      )
      .fromTo(
        authorRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power1.out' },
        '-=0.1'
      )
      .fromTo(
        subtextRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power1.out' },
        '-=0.2'
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#050D1A] text-white flex items-center justify-center overflow-hidden border-t border-[#D4AF37]/20 select-none"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Royal Monogram in background */}
      <div className="absolute opacity-[0.03] pointer-events-none text-[#D4AF37] select-none font-royal text-[12rem] sm:text-[18rem] font-bold">
        N&G
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 text-center flex flex-col items-center">
        {/* Pre-title */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D4AF37]/30 bg-[#09172B]/80 mb-8">
          <Sparkles className="w-3.5 h-3.5 text-[#F5D061]" />
          <span className="font-royal text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#F5D061]">
            {siteData.emotionalClimax.preTitle}
          </span>
        </div>

        {/* Word-by-word Reveal Container */}
        <div
          ref={wordsContainerRef}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.25] tracking-tight mb-8 flex flex-wrap justify-center gap-x-3 sm:gap-x-5 gap-y-1.5 sm:gap-y-3 max-w-4xl"
        >
          {siteData.emotionalClimax.quoteWords.map((word, i) => (
            <span
              key={i}
              className="quote-word transform-gpu will-change-transform inline-block font-display"
            >
              {word}
            </span>
          ))}
        </div>

        {/* Philosophy Author Tag */}
        <p
          ref={authorRef}
          className="font-royal text-xs sm:text-sm tracking-[0.35em] uppercase text-[#D4AF37] font-semibold mb-4"
        >
          {siteData.emotionalClimax.author}
        </p>

        {/* Emotional Subtext */}
        <p
          ref={subtextRef}
          className="max-w-xl text-xs sm:text-sm md:text-base text-[#9EB2CB] font-light leading-relaxed text-balance px-4"
        >
          {siteData.emotionalClimax.subtext}
        </p>
      </div>
    </section>
  );
}
