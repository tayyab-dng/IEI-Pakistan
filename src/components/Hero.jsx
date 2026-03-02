import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HeroCanvas from './HeroCanvas';
import TextFlipper from './TextFlipper';

export default function Hero({ timeline }) {
    const heroRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Setup initial state: wrap lines are hidden
            gsap.set('.hero-text-line', { yPercent: 100 });
            gsap.set('.hero-subhead', { opacity: 0, y: 20 });
            gsap.set('.hero-para', { opacity: 0, y: 20 });

            // Hero Entry Sequence
            timeline.to('.hero-text-line', {
                yPercent: 0,
                duration: 1.2,
                ease: 'power4.out',
                stagger: 0.1,
            }, 0) // Start at time 0 of the timeline
                .to('.hero-subhead', {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                }, '-=0.8')
                .to('.hero-para', {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                }, '-=1.0');

        }, heroRef);

        return () => ctx.revert();
    }, [timeline]);

    return (
        <section ref={heroRef} className="relative w-full min-h-screen flex flex-col justify-end pb-section overflow-hidden z-0">
            {/* Interactive Particle Background Element */}
            <HeroCanvas />

            <div className="relative z-10 max-w-[1440px] mx-auto w-full px-4 md:px-8 lg:px-12 pt-32">
                <div className="flex flex-col gap-6 max-w-5xl">
                    <p className="hero-subhead text-body-lg text-muted uppercase tracking-widest font-medium">
                        Digital Agency
                    </p>

                    <h1 className="text-hero font-bold leading-[0.85] tracking-tighter uppercase text-primary-fg mix-blend-difference">
                        <div className="overflow-hidden pb-2 mb-[-8px]">
                            <div className="hero-text-line">We Build</div>
                        </div>
                        <div className="overflow-hidden pb-6 mb-[-24px] flex items-baseline flex-wrap">
                            <div className="hero-text-line mr-4">Digital</div>
                            <div className="hero-text-line inline-flex"><TextFlipper /></div>
                        </div>
                    </h1>

                    <p className="hero-para text-body-lg text-primary-fg/80 max-w-xl mt-4 leading-relaxed mix-blend-difference">
                        A premium tailored experience. We transform ideas into high-end immersive digital products.
                    </p>
                </div>
            </div>
        </section>
    );
}
