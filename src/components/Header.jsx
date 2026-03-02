import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Header({ timeline }) {
    const headerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Start hidden/shifted
            gsap.set(headerRef.current, { opacity: 0, yPercent: -100 });

            // Reveal at the end of the Hero timeline (using the shared Master Timeline)
            // The timeline is passed in. We inject our animation.
            timeline.to(headerRef.current, {
                opacity: 1,
                yPercent: 0,
                duration: 0.8,
                ease: 'power3.out',
                onComplete: () => {
                    // Enable hide-on-scroll behavior after initial reveal
                    ScrollTrigger.create({
                        start: 'top top',
                        end: 'max',
                        onUpdate: (self) => {
                            if (self.direction === 1 && self.scroll() > 100) {
                                // Scrolling down and past 100px - Hide header
                                gsap.to(headerRef.current, { yPercent: -100, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
                            } else if (self.direction === -1 || self.scroll() <= 100) {
                                // Scrolling up or near the top - Show header
                                gsap.to(headerRef.current, { yPercent: 0, duration: 0.3, ease: 'power3.out', overwrite: 'auto' });
                            }
                        }
                    });
                }
            }, '-=0.5'); // Slightly overlap with Hero's finish
        }, headerRef);

        return () => ctx.revert();
    }, [timeline]);

    return (
        <header ref={headerRef} className="fixed top-0 left-0 w-full z-40 bg-[#050505]/60 backdrop-blur-xl border-b border-white/5 text-white shadow-sm">
            <div className="max-w-[1440px] mx-auto w-full px-4 md:px-8 lg:px-12 py-5 flex justify-between items-center">
                {/* Logo */}
                <div
                    className="text-body-lg font-bold tracking-tight uppercase cursor-pointer"
                >
                    vantax<span className="text-accent">.</span>studio
                </div>

                {/* Menu Trigger */}
                <button
                    className="text-body font-medium uppercase tracking-widest hover:text-accent transition-colors"
                >
                    Menu
                </button>
            </div>
        </header>
    );
}
