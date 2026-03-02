import React from 'react';
import MagneticButton from './MagneticButton';

export default function Footer() {
    return (
        <footer className="relative w-full min-h-[80vh] bg-primary-bg pt-32 pb-8 flex flex-col justify-between overflow-hidden">

            {/* Top Section: The Hook & Magnetic Button */}
            <div className="flex-1 flex flex-col items-center justify-center relative px-4 md:px-8">

                {/* Massive Typography */}
                <h2 className="text-[15vw] font-bold uppercase tracking-tighter text-primary-fg leading-[0.8] text-center max-w-full">
                    Let's<br />Talk
                </h2>

                {/* Magnetic Button Absolute Positioned near the typography */}
                <div className="absolute top-1/2 left-1/2 md:left-2/3 -translate-x-1/2 -translate-y-1/2 mt-12 md:mt-0">
                    <MagneticButton
                        className="w-32 h-32 md:w-40 md:h-40 bg-accent text-white hover:bg-white hover:text-accent transition-colors duration-300 shadow-2xl"
                    >
                        <span className="text-body font-bold uppercase tracking-widest text-center">
                            Get in<br />Touch
                        </span>
                    </MagneticButton>
                </div>
            </div>

            {/* Bottom Section: Links & Credits */}
            <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 mt-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-border">

                    {/* Copyright */}
                    <div className="flex flex-col gap-2">
                        <span className="text-meta text-muted uppercase tracking-widest">Version</span>
                        <p className="text-body text-primary-fg font-medium">2026 © Edition</p>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col gap-2 md:items-center">
                        <span className="text-meta text-muted uppercase tracking-widest">Direct</span>
                        <a
                            href="mailto:hello@vantax.studio"
                            className="text-body text-primary-fg font-medium hover:text-accent transition-colors"
                        >
                            hello@vantax.studio
                        </a>
                    </div>

                    {/* Socials */}
                    <div className="flex flex-col gap-2 md:items-end">
                        <span className="text-meta text-muted uppercase tracking-widest">Socials</span>
                        <div className="flex gap-4">
                            {['Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="text-body text-primary-fg font-medium hover:text-accent transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-accent hover:after:w-full after:transition-all after:duration-300"
                                >
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

        </footer>
    );
}
