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
        <div className="fixed top-4 md:top-6 left-0 w-full z-50 flex justify-center pointer-events-none">
            <header ref={headerRef} className="pointer-events-auto w-[95%] max-w-7xl bg-[#050505]/35 backdrop-blur-2xl border border-white/10 rounded-full text-white shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                <div className="w-full px-5 md:px-10 py-3 md:py-4 flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer flex-shrink-0">
                        <img src="/images/logowhitehdr.png" alt="IEI Logo" className="h-8 w-auto md:h-10 lg:h-10" />
                        <div className="text-xl md:text-3xl lg:text-4xl font-bold tracking-tight whitespace-nowrap">
                            IEI <span className="text-[#ffcc00]">Pakistan</span>
                        </div>
                    </div>

                    {/* Navigation Links (Desktop) */}
                    <nav className="hidden md:flex items-center gap-8">
                        {['Home', 'Programmes', 'Join Us', 'About Us'].map((link) => (
                            <a
                                key={link}
                                href={`#${link.toLowerCase().replace(' ', '-')}`}
                                className="text-sm font-medium uppercase tracking-wider hover:text-[#ffcc00] transition-colors duration-300"
                            >
                                {link}
                            </a>
                        ))}
                    </nav>

                    {/* Mobile Menu Trigger (Hamburger) */}
                    <button className="md:hidden text-white hover:text-[#ffcc00] transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </header>
        </div>
    );
}
