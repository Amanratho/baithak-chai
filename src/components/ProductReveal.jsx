import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../data';
import { Leaf, ShieldCheck, Sparkles, RotateCw, Hand, PackageCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ProductReveal({ onOpenCheckout }) {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const badgesRef = useRef([]);

  // 3D Turntable & Physics State
  const [rotationY, setRotationY] = useState(0);
  const [tiltZ, setTiltZ] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeSide, setActiveSide] = useState('front');
  
  const dragStartX = useRef(0);
  const startRotation = useRef(0);
  const reqIdRef = useRef(null);

  // Auto idle rotation (Silky 60fps/120fps)
  useEffect(() => {
    let lastTime = performance.now();
    const loop = (time) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (autoRotate && !isDragging) {
        setRotationY((prev) => (prev + delta * 24) % 360);
        setTiltZ(Math.sin(time * 0.002) * 1.2);
      }
      reqIdRef.current = requestAnimationFrame(loop);
    };

    reqIdRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(reqIdRef.current);
  }, [autoRotate, isDragging]);

  // Determine active side
  useEffect(() => {
    const normalized = ((rotationY % 360) + 360) % 360;
    const isBack = normalized > 90 && normalized < 270;
    setActiveSide(isBack ? 'back' : 'front');
  }, [rotationY]);

  // Touch and Mouse handlers
  const handlePointerDown = (e) => {
    setIsDragging(true);
    setAutoRotate(false);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    dragStartX.current = clientX;
    startRotation.current = rotationY;
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - dragStartX.current;
    
    setRotationY(startRotation.current + deltaX * 0.8);
    setTiltZ(Math.max(-4, Math.min(4, deltaX * 0.07)));
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    gsap.to({ val: tiltZ }, {
      val: 0,
      duration: 0.4,
      ease: 'power2.out',
      onUpdate: function () {
        setTiltZ(this.targets()[0].val);
      },
    });
  };

  // Flip smoothly to Front or Back
  const flipTo = (side) => {
    setAutoRotate(false);
    const target = side === 'front' ? 0 : 180;
    gsap.to({ val: rotationY }, {
      val: target,
      duration: 0.6,
      ease: 'power2.out',
      onUpdate: function () {
        setRotationY(this.targets()[0].val);
      },
    });
  };

  useGSAP(
    () => {
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
    },
    { scope: sectionRef }
  );

  const lightOffset = Math.sin((rotationY * Math.PI) / 180) * 40;

  return (
    <section
      id="product-reveal"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#F6F1E7] text-[#0A192F] py-14 sm:py-20 flex items-center justify-center overflow-hidden select-none"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
    >
      {/* Background Soft Luxury Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:26px_26px] opacity-15 pointer-events-none" />
      <div className="absolute w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] bg-[#D4AF37]/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Container */}
      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center"
      >
        {/* Section Heading (English) */}
        <div className="text-center mb-5 max-w-2xl px-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050D1A] text-[#F5D061] text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] font-royal mb-2 shadow-md">
            <PackageCheck className="w-3 h-3 text-[#D4AF37]" />
            <span>{siteData.productReveal.badge}</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-[#050D1A] tracking-tight">
            {siteData.productReveal.sectionTitle}
          </h2>

          <p className="mt-2 text-xs sm:text-base text-[#4A5568] font-light max-w-xl mx-auto">
            {siteData.productReveal.subtitle}
          </p>

          {/* Interactive Drag Hint */}
          <div className="mt-2.5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#8B6B15] text-xs font-medium animate-pulse">
            <Hand className="w-4 h-4 text-[#8B6B15]" />
            <span>{siteData.productReveal.dragHint}</span>
          </div>
        </div>

        {/* 3D Stage & Floating Features Layout */}
        <div className="relative w-full max-w-5xl flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 my-2">
          
          {/* Left Floating Badges */}
          <div className="flex flex-row lg:flex-col gap-3 sm:gap-4 w-full lg:w-72 justify-center lg:justify-start order-2 lg:order-1">
            <div
              ref={(el) => (badgesRef.current[0] = el)}
              className="flex-1 lg:flex-none p-3.5 sm:p-5 rounded-2xl glass-cream shadow-xl border border-[#D4AF37]/35"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#09172B] text-[#D4AF37] flex items-center justify-center mb-1.5 sm:mb-2 shadow-inner">
                <Leaf className="w-4 h-4 text-emerald-500" />
              </div>
              <h4 className="font-display text-sm sm:text-base md:text-lg font-bold text-[#050D1A] leading-snug">
                {siteData.productReveal.floatingBadges[0].title}
              </h4>
              <p className="text-[11px] sm:text-xs text-[#526075] mt-1 leading-relaxed hidden sm:block">
                {siteData.productReveal.floatingBadges[0].desc}
              </p>
            </div>

            <div
              ref={(el) => (badgesRef.current[1] = el)}
              className="flex-1 lg:flex-none p-3.5 sm:p-5 rounded-2xl glass-cream shadow-xl border border-[#D4AF37]/35"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#09172B] text-[#D4AF37] flex items-center justify-center mb-1.5 sm:mb-2 shadow-inner">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <h4 className="font-display text-sm sm:text-base md:text-lg font-bold text-[#050D1A] leading-snug">
                {siteData.productReveal.floatingBadges[1].title}
              </h4>
              <p className="text-[11px] sm:text-xs text-[#526075] mt-1 leading-relaxed hidden sm:block">
                {siteData.productReveal.floatingBadges[1].desc}
              </p>
            </div>
          </div>

          {/* Center 3D Volumetric Bulging Pouch on Round Turntable Stage */}
          <div className="relative flex flex-col items-center justify-center order-1 lg:order-2 my-1">
            
            {/* The 3D Pouch Viewport */}
            <div
              className="relative w-[280px] sm:w-[350px] md:w-[390px] h-[390px] sm:h-[470px] cursor-grab active:cursor-grabbing flex items-center justify-center"
              onPointerDown={handlePointerDown}
              onTouchStart={handlePointerDown}
              style={{ perspective: '1100px' }}
            >
              {/* Rotating Container */}
              <div
                className="relative w-full h-full flex items-center justify-center will-change-transform"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateX(4deg) rotateY(${rotationY}deg) rotateZ(${tiltZ}deg)`,
                  transition: isDragging ? 'none' : 'transform 0.08s ease-out',
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

                {/* FRONT FACE: Volumetric Puffed Front of 500g Tea Pouch */}
                <div
                  className="absolute inset-0 flex items-center justify-center will-change-transform"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'translateZ(10px)',
                  }}
                >
                  <div className="relative w-auto h-[92%] sm:h-[96%] flex items-center justify-center">
                    
                    {/* The Front Transparent Cutout WebP */}
                    <img
                      src={siteData.assets.productPouchFront}
                      alt="Baithak Tea Front Packaging"
                      className="w-auto h-full object-contain drop-shadow-[0_20px_28px_rgba(5,13,26,0.38)] pointer-events-none"
                      draggable={false}
                      loading="eager"
                    />

                    {/* GPU-Accelerated Dynamic Specular Sheen (Curved metallic glare) */}
                    <div
                      className="absolute inset-0 pointer-events-none rounded-3xl"
                      style={{
                        background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.01) ${35 + lightOffset}%, rgba(255,255,255,0.22) ${50 + lightOffset}%, rgba(255,255,255,0.01) ${65 + lightOffset}%, transparent 100%)`,
                        mixBlendMode: 'overlay',
                      }}
                    />

                    {/* Front Badge Tag */}
                    <span className="absolute top-2 right-2 sm:right-4 bg-[#050D1A]/95 text-[#F5D061] text-[10px] font-royal uppercase px-3 py-1 rounded-full border border-[#D4AF37]/50 shadow-md">
                      Front View · 500g
                    </span>
                  </div>
                </div>

                {/* BACK FACE: Volumetric Puffed Reverse Face */}
                <div
                  className="absolute inset-0 flex items-center justify-center will-change-transform"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg) translateZ(10px)',
                  }}
                >
                  <div className="relative w-auto h-[92%] sm:h-[96%] flex items-center justify-center">
                    
                    {/* The Back Transparent Cutout WebP */}
                    <img
                      src={siteData.assets.productPouchBack}
                      alt="Baithak Tea Back Packaging"
                      className="w-auto h-full object-contain drop-shadow-[0_20px_28px_rgba(5,13,26,0.38)] pointer-events-none"
                      draggable={false}
                      loading="eager"
                    />

                    {/* Back Dynamic Specular Sheen */}
                    <div
                      className="absolute inset-0 pointer-events-none rounded-3xl"
                      style={{
                        background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.01) ${35 - lightOffset}%, rgba(255,255,255,0.22) ${50 - lightOffset}%, rgba(255,255,255,0.01) ${65 - lightOffset}%, transparent 100%)`,
                        mixBlendMode: 'overlay',
                      }}
                    />

                    {/* Back Badge Tag */}
                    <span className="absolute top-2 right-2 sm:right-4 bg-[#050D1A]/95 text-[#F5D061] text-[10px] font-royal uppercase px-3 py-1 rounded-full border border-[#D4AF37]/50 shadow-md">
                      Back View · Details
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* REALISTIC 3D ROUND PEDESTAL SURFACE */}
            <div className="relative -mt-8 sm:-mt-10 flex flex-col items-center pointer-events-none">
              
              {/* Contact Shadow beneath Pouch */}
              <div
                className="w-[180px] sm:w-[240px] h-[30px] sm:h-[38px] rounded-[50%] bg-[#02070F] blur-[6px] opacity-80 -mb-6 sm:-mb-8 will-change-transform"
                style={{
                  transform: `scaleX(${1 - Math.abs(Math.sin((rotationY * Math.PI) / 180)) * 0.2})`,
                }}
              />

              {/* Upper Pedestal Disc */}
              <div className="w-[280px] sm:w-[360px] h-[60px] sm:h-[76px] rounded-[50%] bg-gradient-to-b from-[#11243E] via-[#09182E] to-[#040C18] border-[3px] border-[#D4AF37] shadow-[0_15px_35px_rgba(0,0,0,0.5),inset_0_2px_8px_rgba(255,226,138,0.5)] flex items-center justify-center relative overflow-hidden">
                
                {/* Radial Light Reflection */}
                <div
                  className="absolute inset-1.5 rounded-[50%] border border-[#FFE28A]/40 bg-radial-gradient from-[#D4AF37]/35 via-transparent to-transparent will-change-transform"
                  style={{
                    transform: `rotate(${rotationY * 0.6}deg)`,
                  }}
                />

                {/* Inner Gold Inlay Ring */}
                <div className="w-[220px] sm:w-[290px] h-[40px] sm:h-[50px] rounded-[50%] border border-[#D4AF37]/60 bg-gradient-to-b from-[#0B1E38] to-[#050D1A] flex items-center justify-center shadow-inner">
                  <span className="text-[10px] sm:text-[11px] font-royal tracking-[0.3em] uppercase text-[#D4AF37]/90 font-semibold drop-shadow">
                    360° Round Pedestal
                  </span>
                </div>
              </div>

              {/* Pedestal Base Drop Shadow */}
              <div className="w-[320px] sm:w-[420px] h-[35px] rounded-[50%] bg-black/35 blur-lg -mt-4" />
            </div>

            {/* Turntable Interactive Controls */}
            <div className="mt-4 sm:mt-5 flex items-center gap-2 sm:gap-3 bg-[#050D1A] px-3.5 sm:px-4 py-2 rounded-full border border-[#D4AF37]/40 shadow-xl">
              <button
                type="button"
                onClick={() => flipTo('front')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeSide === 'front'
                    ? 'bg-[#D4AF37] text-[#050D1A] shadow-md'
                    : 'text-[#C5D4E8] hover:text-white'
                }`}
              >
                Front View
              </button>

              <button
                type="button"
                onClick={() => flipTo('back')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeSide === 'back'
                    ? 'bg-[#D4AF37] text-[#050D1A] shadow-md'
                    : 'text-[#C5D4E8] hover:text-white'
                }`}
              >
                Back View
              </button>

              <div className="w-[1px] h-4 bg-[#233854]" />

              <button
                type="button"
                onClick={() => setAutoRotate(!autoRotate)}
                className={`flex items-center gap-1.5 text-[11px] font-medium transition-colors cursor-pointer ${
                  autoRotate ? 'text-[#F5D061]' : 'text-[#8597AD]'
                }`}
              >
                <RotateCw className={`w-3 h-3 ${autoRotate ? 'animate-spin' : ''}`} />
                <span>{autoRotate ? 'Auto Rotate' : 'Paused'}</span>
              </button>
            </div>
          </div>

          {/* Right Floating Badges */}
          <div className="flex flex-row lg:flex-col gap-3 sm:gap-4 w-full lg:w-72 justify-center lg:justify-end order-3">
            <div
              ref={(el) => (badgesRef.current[2] = el)}
              className="flex-1 lg:flex-none p-3.5 sm:p-5 rounded-2xl glass-cream shadow-xl border border-[#D4AF37]/35"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#09172B] text-[#D4AF37] flex items-center justify-center mb-1.5 sm:mb-2 shadow-inner">
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <h4 className="font-display text-sm sm:text-base md:text-lg font-bold text-[#050D1A] leading-snug">
                {siteData.productReveal.floatingBadges[2].title}
              </h4>
              <p className="text-[11px] sm:text-xs text-[#526075] mt-1 leading-relaxed hidden sm:block">
                {siteData.productReveal.floatingBadges[2].desc}
              </p>
            </div>

            {/* Quick Buy Card */}
            <div className="flex-1 lg:flex-none p-3.5 sm:p-5 rounded-2xl bg-[#050D1A] text-white shadow-2xl border border-[#D4AF37]/40 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-royal uppercase tracking-wider text-[#D4AF37] block">
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
                className="mt-2.5 sm:mt-3 w-full py-2.5 rounded-full bg-gradient-to-r from-[#ECC440] to-[#B38612] text-[#050D1A] font-bold text-xs uppercase tracking-wider hover:scale-102 active:scale-98 transition-all cursor-pointer shadow-md"
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
