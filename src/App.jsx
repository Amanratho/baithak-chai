import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Centralized Dynamic Data
import { siteData } from './data';

// Import UI & Section Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductReveal from './components/ProductReveal';
import FeaturesGrid from './components/FeaturesGrid';
import BrewingSteps from './components/BrewingSteps';
import EmotionalClimax from './components/EmotionalClimax';
import Specifications from './components/Specifications';
import CheckoutBar from './components/CheckoutBar';
import Footer from './components/Footer';
import OrderModal from './components/OrderModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Initialize Ultra-Smooth Momentum Scrolling
  useEffect(() => {
    // Check if the user is on mobile/touch screen
    const isTouch =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    let lenis = null;

    if (!isTouch) {
      // Desktop: Ultra-smooth Lenis with snappy responsiveness
      lenis = new Lenis({
        duration: 0.7,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.1,
      });

      lenis.on('scroll', ScrollTrigger.update);
      const updateTicker = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(updateTicker);
      gsap.ticker.lagSmoothing(500, 33);
    } else {
      // Mobile: Native 120Hz hardware scroll for zero input lag and instant responsiveness
      ScrollTrigger.config({ ignoreMobileResize: true });
    }

    // Refresh ScrollTrigger once DOM is ready
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050D1A] text-[#F5F0E6] selection:bg-[#D4AF37]/30 selection:text-[#FFF4D0] overflow-x-hidden">
      {/* Floating Header */}
      <Navbar onOpenCheckout={() => setIsCheckoutOpen(true)} />

      {/* Main Content Flow */}
      <main>
        {/* 1. Cinematic Hero with Instant Smooth Animation */}
        <Hero onOpenCheckout={() => setIsCheckoutOpen(true)} />

        {/* 2. 3D Volumetric Pouch Turntable (60-120fps GPU accelerated) */}
        <ProductReveal onOpenCheckout={() => setIsCheckoutOpen(true)} />

        {/* 3. Features Grid with Staggered Fade-in */}
        <FeaturesGrid />

        {/* 4. Brewing Ritual (Bananey Ki Vidhi) with Visual Showcase */}
        <BrewingSteps />

        {/* 5. Emotional Climax (Word-by-word Golden Text Reveal) */}
        <EmotionalClimax />

        {/* 6. Product Specifications & Heritage */}
        <Specifications onOpenCheckout={() => setIsCheckoutOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Bottom Checkout Bar */}
      <CheckoutBar onOpenCheckout={() => setIsCheckoutOpen(true)} />

      {/* Interactive Quick Order Modal */}
      <OrderModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}
