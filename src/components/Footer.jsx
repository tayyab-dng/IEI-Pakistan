import React from 'react';
import MagneticButton from './MagneticButton';

export default function Footer() {
    return (
        <footer className="relative w-full min-h-[80vh] bg-primary-bg pt-32 pb-8 flex flex-col justify-between overflow-hidden">

            {/* Top Section: The Hook / CTA */}
            <div className="flex-1 flex flex-col items-center justify-center relative px-4 md:px-8">

                {/* Massive Typography - Static Yellow Text */}
                <h2 className="text-[14vw] font-bold uppercase tracking-tighter leading-[0.8] text-center max-w-full text-[#FFD43B]">
                    Let's Create<br />Impact
                </h2>

            </div>

            {/* Bottom Section: Links & Credits */}
            <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 mt-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-border">

                    {/* Copyright & Organization */}
                    <div className="flex flex-col gap-2">
                        <span className="text-meta text-muted uppercase tracking-widest">ORGANIZATION</span>
                        <p className="text-body text-primary-fg font-medium">Founded 2016</p>
                        <p className="text-body text-primary-fg font-medium">Registered Non-Profit Organization</p>
                    </div>

                    {/* Direct Contact */}
                    <div className="flex flex-col gap-2 md:items-center">
                        <span className="text-meta text-muted uppercase tracking-widest">DIRECT</span>
                        <div className="flex flex-col items-start md:items-center gap-1">
                            <a
                                href="mailto:info@ieipakistan.org"
                                className="text-body text-primary-fg font-medium hover:text-[#FFD43B] transition-colors"
                            >
                                info@ieipakistan.org
                            </a>
                            <a
                                href="tel:03143596116"
                                className="text-body text-primary-fg font-medium hover:text-[#FFD43B] transition-colors"
                            >
                                0314 3596116
                            </a>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="flex flex-col gap-2 md:items-end">
                        <span className="text-meta text-muted uppercase tracking-widest">SOCIALS</span>
                        <div className="flex gap-6">
                            {[
                                {
                                    name: 'Facebook',
                                    url: 'https://www.facebook.com/ieipakistan/',
                                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                },
                                {
                                    name: 'Instagram',
                                    url: 'https://www.instagram.com/team.ieipakistan/',
                                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                                },
                                {
                                    name: 'LinkedIn',
                                    url: 'https://www.linkedin.com/company/iei-pakistan/',
                                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                },
                                {
                                    name: 'Twitter/X',
                                    url: 'https://twitter.com/ieipakistan',
                                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                                }
                            ].map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-fg hover:text-[#FFD43B] transition-colors duration-300"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

        </footer>
    );
}
