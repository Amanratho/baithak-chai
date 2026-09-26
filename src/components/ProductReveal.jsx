import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../data';
import { Leaf, ShieldCheck, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ProductReveal({ onOpenCheckout }) {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const badgesRef = useRef([]);
  const cardRef = useRef(null);
  const frontGlareRef = useRef(null);
  const backGlareRef = useRef(null);
  const shadowRef = useRef(null);
  const pedestalReflectionRef = useRef(null);

  // Rotation angles tracked via refs for pure 120fps zero-react-overhead animation
  const rotationY = useRef(0);
  const tiltZ = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const startRotation = useRef(0);

  // Apply transforms directly to the DOM for max 120Hz ProMotion smoothness
  const applyTransform = () => {
    const rot = rotationY.current;
    const tilt = tiltZ.current;

    if (cardRef.current) {
      cardRef.current.style.transform = `rotateX(4deg) rotateY(${rot}deg) rotateZ(${tilt}deg)`;
    }

    const lightOffset = Math.sin((rot * Math.PI) / 180) * 40;

    if (frontGlareRef.current) {
      frontGlareRef.current.style.background = `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.01) ${35 + lightOffset}%, rgba(255,255,255,0.22) ${50 + lightOffset}%, rgba(255,255,255,0.01) ${65 + lightOffset}%, transparent 100%)`;
    }

    if (backGlareRef.current) {
      backGlareRef.current.style.background = `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.01) ${35 - lightOffset}%, rgba(255,255,255,0.22) ${50 - lightOffset}%, rgba(255,255,255,0.01) ${65 - lightOffset}%, transparent 100%)`;
    }

    if (shadowRef.current) {
      const scaleX = 1 - Math.abs(Math.sin((rot * Math.PI) / 180)) * 0.2;
      shadowRef.current.style.transform = `scaleX(${scaleX})`;
    }

    if (pedestalReflectionRef.current) {
      pedestalReflectionRef.current.style.transform = `rotate(${rot * 0.6}deg)`;
    }
  };

  // Continuous silky smooth showcase loop
  useGSAP(
    () => {
      let lastTime = performance.now();
      const loop = (time) => {
        const delta = (time - lastTime) / 1000;
        lastTime = time;

        if (!isDragging.current) {
          rotationY.current = (rotationY.current + delta * 24) % 360;
          tiltZ.current = Math.sin(time * 0.002) * 1.2;
          applyTransform();
        }
        reqId = requestAnimationFrame(loop);
      };

      let reqId = requestAnimationFrame(loop);

      // Floating badges entry
      badgesRef.current.forEach((badge) => {
        if (!badge) return;
        gsap.fromTo(
          badge,
          { opacity: 0, y: 20, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      return () => cancelAnimationFrame(reqId);
    },
    { scope: sectionRef }
  );

  // Direct Pointer/Touch interaction
  const handlePointerDown = (e) => {
    isDragging.current = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    dragStartX.current = clientX;
    startRotation.current = rotationY.current;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - dragStartX.current;
    
    rotationY.current = startRotation.current + deltaX * 0.8;
    tiltZ.current = Math.max(-4, Math.min(4, deltaX * 0.07));
    applyTransform();
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    gsap.to(tiltZ, {
      current: 0,
      duration: 0.4,
      ease: 'power2.out',
      onUpdate: applyTransform,
    });
  };

  return (
    <section
      id="product-reveal"
      ref={sectionRef}
      className="relative min-h-[90vh] sm:min-h-screen w-full bg-[#F6F1E7] text-[#0A192F] py-12 sm:py-20 flex items-center justify-center overflow-hidden select-none"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
    >
      {/* Background Soft Luxury Halo */}
      <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:26px_26px] opacity-15 pointer-events-none" />
      <div className="absolute w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] bg-[#D4AF37]/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Container */}
      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center"
      >
        {/* Clean Showcase: Product on Pedestal Flanked by Benefit Badges */}
        <div className="relative w-full max-w-5xl flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 my-auto">
          
          {/* Left Feature Badges */}
          <div className="flex flex-row lg:flex-col gap-3 sm:gap-4 w-full lg:w-72 justify-center lg:justify-start order-2 lg:order-1">
            <div
              ref={(el) => (badgesRef.current[0] = el)}
              className="flex-1 lg:flex-none p-4 sm:p-5 rounded-2xl glass-cream shadow-xl border border-[#D4AF37]/35"
            >
              <div className="w-8 h-8 rounded-lg bg-[#09172B] text-[#D4AF37] flex items-center justify-center mb-2 shadow-inner">
                <Leaf className="w-4 h-4 text-emerald-500" />
              </div>
              <h4 className="font-display text-base sm:text-lg font-bold text-[#050D1A] leading-snug">
                {siteData.productReveal.floatingBadges[0].title}
              </h4>
              <p className="text-[11px] sm:text-xs text-[#526075] mt-1 leading-relaxed hidden sm:block">
                {siteData.productReveal.floatingBadges[0].desc}
              </p>
            </div>

            <div
              ref={(el) => (badgesRef.current[1] = el)}
              className="flex-1 lg:flex-none p-4 sm:p-5 rounded-2xl glass-cream shadow-xl border border-[#D4AF37]/35"
            >
              <div className="w-8 h-8 rounded-lg bg-[#09172B] text-[#D4AF37] flex items-center justify-center mb-2 shadow-inner">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <h4 className="font-display text-base sm:text-lg font-bold text-[#050D1A] leading-snug">
                {siteData.productReveal.floatingBadges[1].title}
              </h4>
              <p className="text-[11px] sm:text-xs text-[#526075] mt-1 leading-relaxed hidden sm:block">
                {siteData.productReveal.floatingBadges[1].desc}
              </p>
            </div>
          </div>

          {/* Center: The Stand-Up Tea Pouch Rotating on Golden Pedestal (Pure Visual, Zero Tech Text) */}
          <div className="relative flex flex-col items-center justify-center order-1 lg:order-2">
            
            {/* The 3D Pouch Viewport */}
            <div
              className="relative w-[280px] sm:w-[350px] md:w-[400px] h-[400px] sm:h-[490px] cursor-grab active:cursor-grabbing flex items-center justify-center"
              onPointerDown={handlePointerDown}
              onTouchStart={handlePointerDown}
              style={{ perspective: '1100px' }}
            >
              {/* Rotating Container */}
              <div
                ref={cardRef}
                className="relative w-full h-full flex items-center justify-center will-change-transform"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'rotateX(4deg) rotateY(0deg) rotateZ(0deg)',
                }}
              >
                
                {/* 3D Depth Spacer / Thickness */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{
                    transform: 'translateZ(-5px) scale(0.985)',
                    filter: 'brightness(0.65)',
                    opacity: 0.5,
                  }}
                >
                  <img
                    src={siteData.assets.productPouchFront}
                    alt=""
                    className="w-auto h-[92%] sm:h-[96%] object-contain"
                    draggable={false}
                  />
                </div>

                {/* FRONT FACE */}
                <div
                  className="absolute inset-0 flex items-center justify-center will-change-transform"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'translateZ(10px)',
                  }}
                >
                  <div className="relative w-auto h-[92%] sm:h-[96%] flex items-center justify-center">
                    <img
                      src={siteData.assets.productPouchFront}
                      alt="Baithak Tea Front Packaging"
                      className="w-auto h-full object-contain drop-shadow-[0_20px_28px_rgba(5,13,26,0.38)] pointer-events-none"
                      draggable={false}
                      loading="eager"
                    />

                    {/* Gliding Specular Sheen */}
                    <div
                      ref={frontGlareRef}
                      className="absolute inset-0 pointer-events-none rounded-3xl"
                      style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.01) 35%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.01) 65%, transparent 100%)',
                        mixBlendMode: 'overlay',
                      }}
                    />
                  </div>
                </div>

                {/* BACK FACE */}
                <div
                  className="absolute inset-0 flex items-center justify-center will-change-transform"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg) translateZ(10px)',
                  }}
                >
                  <div className="relative w-auto h-[92%] sm:h-[96%] flex items-center justify-center">
                    <img
                      src={siteData.assets.productPouchBack}
                      alt="Baithak Tea Back Packaging"
                      className="w-auto h-full object-contain drop-shadow-[0_20px_28px_rgba(5,13,26,0.38)] pointer-events-none"
                      draggable={false}
                      loading="eager"
                    />

                    {/* Back Gliding Specular Sheen */}
                    <div
                      ref={backGlareRef}
                      className="absolute inset-0 pointer-events-none rounded-3xl"
                      style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.01) 35%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.01) 65%, transparent 100%)',
                        mixBlendMode: 'overlay',
                      }}
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* REALISTIC 3D ROUND PEDESTAL SURFACE (Clean, No Cluttered Text) */}
            <div className="relative -mt-8 sm:-mt-10 flex flex-col items-center pointer-events-none">
              
              {/* Contact Shadow beneath Pouch */}
              <div
                ref={shadowRef}
                className="w-[180px] sm:w-[240px] h-[30px] sm:h-[38px] rounded-[50%] bg-[#02070F] blur-[6px] opacity-80 -mb-6 sm:-mb-8 will-change-transform"
                style={{ transform: 'scaleX(1)' }}
              />

              {/* Upper Pedestal Disc: Metallic Navy & Golden Engraved Rim */}
              <div className="w-[280px] sm:w-[360px] h-[60px] sm:h-[76px] rounded-[50%] bg-gradient-to-b from-[#11243E] via-[#09182E] to-[#040C18] border-[3px] border-[#D4AF37] shadow-[0_15px_35px_rgba(0,0,0,0.5),inset_0_2px_8px_rgba(255,226,138,0.5)] flex items-center justify-center relative overflow-hidden">
                
                {/* Radial Light Reflection */}
                <div
                  ref={pedestalReflectionRef}
                  className="absolute inset-1.5 rounded-[50%] border border-[#FFE28A]/40 bg-radial-gradient from-[#D4AF37]/35 via-transparent to-transparent will-change-transform"
                />

                {/* Inner Gold Inlay Ring (Pure Luxury Finish, Zero Clutter) */}
                <div className="w-[220px] sm:w-[290px] h-[40px] sm:h-[50px] rounded-[50%] border border-[#D4AF37]/60 bg-gradient-to-b from-[#0B1E38] to-[#050D1A] flex items-center justify-center shadow-inner" />
              </div>

              {/* Pedestal Base Drop Shadow on Floor */}
              <div className="w-[320px] sm:w-[420px] h-[35px] rounded-[50%] bg-black/35 blur-lg -mt-4" />
            </div>

          </div>

          {/* Right Feature Badges & Direct Buy Card */}
          <div className="flex flex-row lg:flex-col gap-3 sm:gap-4 w-full lg:w-72 justify-center lg:justify-end order-3">
            <div
              ref={(el) => (badgesRef.current[2] = el)}
              className="flex-1 lg:flex-none p-4 sm:p-5 rounded-2xl glass-cream shadow-xl border border-[#D4AF37]/35"
            >
              <div className="w-8 h-8 rounded-lg bg-[#09172B] text-[#D4AF37] flex items-center justify-center mb-2 shadow-inner">
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <h4 className="font-display text-base sm:text-lg font-bold text-[#050D1A] leading-snug">
                {siteData.productReveal.floatingBadges[2].title}
              </h4>
              <p className="text-[11px] sm:text-xs text-[#526075] mt-1 leading-relaxed hidden sm:block">
                {siteData.productReveal.floatingBadges[2].desc}
              </p>
            </div>

            {/* Clean E-Commerce Purchase Card */}
            <div className="flex-1 lg:flex-none p-4 sm:p-5 rounded-2xl bg-[#050D1A] text-white shadow-2xl border border-[#D4AF37]/40 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-royal uppercase tracking-wider text-[#D4AF37] block font-semibold">
                  Net Wt. 500g Pack
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl sm:text-2xl font-bold font-display text-[#F5D061]">
                    ₹{siteData.brand.mrp}
                  </span>
                  <span className="text-xs text-[#7F92A8] line-through">
                    ₹{siteData.brand.originalPrice}
                  </span>
                </div>
              </div>

              <button
                onClick={onOpenCheckout}
                className="mt-3 w-full py-2.5 rounded-full bg-gradient-to-r from-[#ECC440] to-[#B38612] text-[#050D1A] font-bold text-xs uppercase tracking-wider hover:scale-102 active:scale-98 transition-all cursor-pointer shadow-md"
              >
                Buy Now
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
