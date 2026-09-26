import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../data';
import { Coffee, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function BrewingSteps() {
  const sectionRef = useRef(null);
  const stepsContainerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useGSAP(
    () => {
      const steps = gsap.utils.toArray('.brewing-step-item');

      gsap.fromTo(
        steps,
        {
          opacity: 0,
          y: 25,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stepsContainerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="brewing"
      ref={sectionRef}
      className="relative py-20 sm:py-32 bg-[#071324] text-white overflow-hidden border-t border-[#D4AF37]/15"
    >
      {/* Decorative Aura */}
      <div className="absolute right-0 top-1/3 w-[450px] h-[450px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="font-royal text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37] block mb-2">
            The Brewing Ritual · Step-by-Step
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-3">
            How To Brew The <span className="text-gold-gradient">Perfect Cup</span>
          </h2>
          <p className="text-xs sm:text-base text-[#9EB2CB] font-light max-w-xl mx-auto">
            Follow this master brewing guide to release the full-bodied malty richness, brisk golden liquor, and comforting aroma of Baithak CTC.
          </p>
        </div>

        {/* Two-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Authentic Steaming Chai Showcase */}
          <div className="lg:col-span-5 relative group">
            <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl glass-navy">
              <img
                src={siteData.assets.steamingChaiCup}
                alt="Perfect Baithak Chai"
                loading="lazy"
                className="w-full h-[360px] sm:h-[440px] object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050D1A] via-transparent to-black/20" />

              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#050D1A]/90 backdrop-blur-md border border-[#D4AF37]/30">
                <div className="flex items-center gap-2 mb-1">
                  <Coffee className="w-4 h-4 text-[#D4AF37]" />
                  <span className="font-royal text-xs uppercase tracking-wider text-[#F5D061] font-semibold">
                    The Golden Pour
                  </span>
                </div>
                <p className="text-xs text-[#CBD8E9] leading-relaxed">
                  Notice the caramel-amber crema. Pure Assam CTC granules yield strong body that harmonizes beautifully with fresh milk.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Brewing Steps */}
          <div ref={stepsContainerRef} className="lg:col-span-7 flex flex-col gap-4">
            {siteData.brewingSteps.map((stepItem, idx) => (
              <div
                key={stepItem.step || idx}
                className={`brewing-step-item relative p-5 sm:p-6 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  activeStep === idx
                    ? 'bg-[#0A1B33] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                    : 'glass-navy border-[#1E3557]/60 hover:border-[#D4AF37]/40'
                }`}
                onClick={() => setActiveStep(idx)}
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 font-royal font-bold text-sm sm:text-base transition-all ${
                      activeStep === idx
                        ? 'bg-gradient-to-br from-[#ECC440] to-[#B38612] text-[#050D1A] shadow-md shadow-[#D4AF37]/30'
                        : 'bg-[#09172B] text-[#D4AF37] border border-[#D4AF37]/30'
                    }`}
                  >
                    {stepItem.stepNumber}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
                      <h4 className="font-display text-lg sm:text-xl font-bold text-[#FFF5DF]">
                        {stepItem.title}
                      </h4>
                      <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#F5D061] border border-[#D4AF37]/30">
                        {stepItem.temperature || stepItem.measurement || stepItem.timer || stepItem.finishing}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#A0B3CC] leading-relaxed font-light mb-2.5">
                      {stepItem.detail}
                    </p>

                    <div className="flex items-center gap-2 text-[11px] sm:text-xs text-[#D4AF37]/90 bg-[#D4AF37]/5 px-3 py-1.5 rounded-lg border border-[#D4AF37]/15">
                      <Lightbulb className="w-3.5 h-3.5 shrink-0 text-[#F5D061]" />
                      <span><strong>Tea Master Tip:</strong> {stepItem.proTip}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
