import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// Lightweight component for creating floating particles in the background
const ParticleBackground = () => {
    const [particles, setParticles] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
        // Generate a static array of particles on mount to avoid hydration mismatch
        // Increased number of particles to 80 as requested
        const generatedParticles = Array.from({ length: 80 }).map((_, i) => ({
            id: i,
            shape: Math.random() > 0.5 ? 'circle' : (Math.random() > 0.5 ? 'triangle' : 'square'),
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: Math.random() * 4 + 2, // 2px to 6px
            opacity: Math.random() * 0.4 + 0.1, // 0.1 to 0.5
        }));
        setParticles(generatedParticles);
    }, []);

    useGSAP(() => {
        if (particles.length === 0) return;

        const elements = gsap.utils.toArray('.contact-particle');

        // Give each particle an irregular, continuous wandering motion
        elements.forEach(el => {
            const moveParticle = () => {
                gsap.to(el, {
                    x: `random(-150, 150)`,
                    y: `random(-150, 150)`,
                    rotation: `random(-360, 360)`,
                    duration: `random(10, 25)`,
                    ease: 'sine.inOut',
                    onComplete: moveParticle
                });
            };
            moveParticle();
        });
    }, { dependencies: [particles], scope: containerRef });

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {particles.map((p) => {
                let shapeClass = "contact-particle absolute ";
                let style = {
                    left: p.left,
                    top: p.top,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    opacity: p.opacity,
                };

                if (p.shape === 'circle') {
                    shapeClass += "bg-white rounded-full";
                } else if (p.shape === 'square') {
                    shapeClass += "bg-white";
                } else if (p.shape === 'triangle') {
                    shapeClass += "w-0 h-0 border-l-transparent border-r-transparent border-b-white";
                    style.width = '0';
                    style.height = '0';
                    style.borderLeftWidth = `${p.size / 2}px`;
                    style.borderRightWidth = `${p.size / 2}px`;
                    style.borderBottomWidth = `${p.size}px`;
                    style.backgroundColor = 'transparent';
                }

                return (
                    <div
                        key={p.id}
                        className={shapeClass}
                        style={style}
                    />
                );
            })}
        </div>
    );
};

export default function Contact() {
    const [activeTab, setActiveTab] = useState('quote');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <section className="relative w-full min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center py-20 px-4 md:px-8">
            <ParticleBackground />

            {/* Header Group */}
            <div className="z-10 flex flex-col items-center text-center mt-12 mb-10">
                <span className="text-[10px] md:text-[11px] font-bold tracking-widest text-[#888] uppercase border border-[#333] rounded-full px-5 py-2 mb-8 bg-[#1a1a1a]/50 backdrop-blur-sm">
                    Let's make it happen
                </span>

                <h2 className="text-[4rem] md:text-[5.5rem] lg:text-[6.5rem] leading-[1.05] tracking-tight font-medium flex flex-col items-center">
                    <span className="text-[#555]">Ready to</span>
                    <span className="text-white">Get started</span>
                </h2>
            </div>

            {/* Pill Tab Switcher */}
            <div className="z-10 bg-[#1a1a1a] rounded-full p-1.5 flex mb-10 w-fit">
                <button
                    onClick={() => handleTabClick('quote')}
                    className={`px-8 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${activeTab === 'quote'
                        ? 'bg-[#333] text-white'
                        : 'text-[#888] hover:text-white'
                        }`}
                >
                    Request a quote
                </button>
                <button
                    onClick={() => handleTabClick('call')}
                    className={`px-8 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${activeTab === 'call'
                        ? 'bg-[#333] text-white'
                        : 'text-[#888] hover:text-white'
                        }`}
                >
                    Book a free call
                </button>
            </div>

            {/* Form Card */}
            <div className="relative z-10 bg-[#181818] border border-[#262626] rounded-[2rem] p-6 md:p-10 w-[98%] max-w-[1200px] mb-20 shadow-2xl overflow-hidden min-h-[550px] md:min-h-[600px] flex flex-col justify-center">

                {activeTab === 'quote' ? (
                    <form className="flex flex-col gap-5 animate-in fade-in duration-500 w-full" onSubmit={(e) => e.preventDefault()}>

                        {/* Top Info section */}
                        <div>
                            <h3 className="text-white font-medium text-lg mb-6">Contact information</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    placeholder="Full name"
                                    className="w-full bg-[#222] border border-[#333] rounded-xl px-5 py-4 text-white placeholder-[#777] focus:outline-none focus:border-[#555] transition-colors"
                                />
                                <input
                                    type="email"
                                    placeholder="Business email"
                                    className="w-full bg-[#222] border border-[#333] rounded-xl px-5 py-4 text-white placeholder-[#777] focus:outline-none focus:border-[#555] transition-colors"
                                />
                            </div>
                        </div>

                        <div className="mt-1">
                            <textarea
                                placeholder="Tell us about your project"
                                rows="3"
                                className="w-full bg-[#222] border border-[#333] rounded-xl px-5 py-4 text-white placeholder-[#777] focus:outline-none focus:border-[#555] transition-colors resize-none"
                            ></textarea>
                        </div>

                        {/* Budget Dropdown */}
                        <div className="mt-1">
                            <label className="block text-white font-medium mb-3">
                                Budget <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select className="w-full bg-[#222] border border-[#333] rounded-xl px-5 py-4 text-white appearance-none focus:outline-none focus:border-[#555] transition-colors cursor-pointer">
                                    <option value="" disabled selected hidden>Select...</option>
                                    <option value="10k-25k">$10k - $25k</option>
                                    <option value="25k-50k">$25k - $50k</option>
                                    <option value="50k+">$50k+</option>
                                </select>
                                {/* Custom caret */}
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#777]">
                                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Checkboxes Group */}
                        <div className="mt-1 mb-1">
                            <label className="block text-white font-medium mb-3">
                                How can we help you <span className="text-red-500">*</span>
                            </label>

                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                                {['Branding', 'Design', 'Development'].map((item) => (
                                    <label key={item} className="flex items-center gap-4 cursor-pointer group w-fit">
                                        <div className="relative flex items-center justify-center w-6 h-6 bg-[#222] border border-[#444] rounded uppercase transition-colors group-hover:border-[#666]">
                                            <input type="checkbox" className="absolute opacity-0 w-0 h-0 peer" />
                                            <svg className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                        <span className="text-[#ccc] group-hover:text-white transition-colors">{item}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-white text-black font-semibold text-lg rounded-xl py-3 mt-2 hover:bg-gray-200 transition-colors"
                        >
                            Send message
                        </button>

                    </form>
                ) : (
                    <div className="flex flex-col items-start justify-center text-left animate-in fade-in duration-500 w-full h-full">
                        {/* Icon */}
                        <div className="mb-8">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0" y="0" width="20" height="20" rx="4" fill="white" />
                                <rect x="24" y="0" width="20" height="20" rx="4" fill="white" />
                                <rect x="0" y="24" width="20" height="20" rx="4" fill="white" />
                                <circle cx="34" cy="34" r="10" fill="white" />
                            </svg>
                        </div>
                        <h3 className="text-white font-semibold text-3xl md:text-[32px] mb-3 tracking-tight">No sales pitch</h3>
                        <p className="text-[#888] text-base mb-12">
                            Just honest advice on whether we're the right fit. Let's bring your vision to life!
                        </p>

                        <div className="flex flex-col gap-4 w-full">
                            {/* 15 Min Meeting */}
                            <a
                                href="https://cal.com/vantax.studio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between w-full bg-[#1e1e1e] hover:bg-[#252525] border border-transparent hover:border-[#333] rounded-2xl p-6 md:p-8 transition-all duration-300 group"
                            >
                                <div className="flex flex-col">
                                    <span className="text-white text-xl font-semibold mb-2">15 Min Meeting</span>
                                    <div className="flex items-center gap-2 text-[#888] text-sm">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                        </svg>
                                        15m
                                    </div>
                                </div>
                                <div className="text-[#555] group-hover:text-white transition-colors duration-300">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </div>
                            </a>

                            {/* 30 Min Meeting */}
                            <a
                                href="https://cal.com/vantax.studio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between w-full bg-[#1e1e1e] hover:bg-[#252525] border border-transparent hover:border-[#333] rounded-2xl p-6 md:p-8 transition-all duration-300 group"
                            >
                                <div className="flex flex-col">
                                    <span className="text-white text-xl font-semibold mb-2">30 Min Meeting</span>
                                    <div className="flex items-center gap-2 text-[#888] text-sm">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                        </svg>
                                        30m
                                    </div>
                                </div>
                                <div className="text-[#555] group-hover:text-white transition-colors duration-300">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </div>
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
