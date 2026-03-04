import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import FeaturedProjects from './components/FeaturedProjects';
import Solutions from './components/Solutions';
import Highlights from './components/Highlights';
import CoreValues from './components/CoreValues';
import HowWeWork from './components/HowWeWork';
import Testimonials from './components/Testimonials';
import Services from './components/Services';
import Marquee from './components/Marquee';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef();
  const [masterTimeline, setMasterTimeline] = useState(null);

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    // Sync GSAP ticker with Lenis raf
    gsap.ticker.add(update);
    // Cleanup
    return () => gsap.ticker.remove(update);
  }, []);

  useLayoutEffect(() => {
    // We create the master timeline
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      setMasterTimeline(tl);
    });
    return () => ctx.revert();
  }, []);

  // Standard smooth scroll physics for maximum performance and "buttery" feel
  const lenisOptions = {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
  };

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false} options={lenisOptions}>
      {masterTimeline && <Header timeline={masterTimeline} />}
      <main className="relative w-full flex flex-col bg-primary-bg text-primary-fg font-sans antialiased text-body">
        {masterTimeline && <Hero timeline={masterTimeline} />}
        <FeaturedProjects />
        <About />
        <Solutions />
        <Highlights />
        <CoreValues />
        <HowWeWork />
        <Testimonials />
        <Marquee />
        <Footer />
      </main>
    </ReactLenis>
  );
}
