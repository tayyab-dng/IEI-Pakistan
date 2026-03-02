import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const slides = [
    {
        id: '01',
        title: "Discovery &\nUnderstanding",
        description: "We dive deep into your business, goals, and challenges. Through collaboration and research, we identify your unique needs to create a clear vision for your digital solution.",
        duration: "1 - 2 DAYS",
        color: "yellow"
    },
    {
        id: '02',
        title: "Strategy &\nPlanning",
        description: "We analyze your market, competitors, and audience to craft a data-driven strategy. With a solid roadmap, we ensure every step aligns with your objectives, setting the foundation for success.",
        duration: "2 - 3 DAYS",
        color: "pink"
    },
    {
        id: '03',
        title: "Design &\nDevelopment",
        description: "We transform ideas into reality by designing and building a custom solution tailored to your goals. Every detail is meticulously crafted to deliver a user-focused, visually stunning, and high-performing experience.",
        duration: "5 - 7 DAYS",
        color: "green"
    },
    {
        id: '04',
        title: "Launch &\nOptimization",
        description: "We ensure your solution is polished, functional, and ready to shine. Post-launch, we continuously refine and optimize to maximize performance, ensuring long-term success.",
        duration: "1 - 2 DAYS",
        color: "blue"
    }
];

// SVGs for the slider
const SlideIcon = ({ type }) => {
    switch (type) {
        case 'yellow':
            return (
                <svg width="240" height="240" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad-yellow" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FEFBB0" />
                            <stop offset="1" stopColor="#F9EDA4" />
                        </linearGradient>
                    </defs>
                    <path fillRule="evenodd" clipRule="evenodd" d="M20 0C8.9543 0 0 8.9543 0 20V80C0 91.0457 8.9543 100 20 100H80C91.0457 100 100 91.0457 100 80V20C100 8.9543 91.0457 0 80 0H20ZM50 20C50 36.5685 36.5685 50 20 50C36.5685 50 50 63.4315 50 80C50 63.4315 63.4315 50 80 50C63.4315 50 50 36.5685 50 20Z" fill="url(#grad-yellow)" />
                    <path d="M50 20C50 36.5685 36.5685 50 20 50C36.5685 50 50 63.4315 50 80C50 63.4315 63.4315 50 80 50C63.4315 50 50 36.5685 50 20Z" fill="#202020" />
                </svg>
            );
        case 'pink':
            return (
                <svg width="240" height="240" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad-pink" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FEA0E5" />
                            <stop offset="1" stopColor="#F38DF0" />
                        </linearGradient>
                    </defs>
                    <path fillRule="evenodd" clipRule="evenodd" d="M20 0C8.9543 0 0 8.9543 0 20V50H50V100C33.4315 100 20 86.5685 20 70C20 86.5685 6.56854 100 -10 100V110H110V100C93.4315 100 80 86.5685 80 70C80 86.5685 66.5685 100 50 100V50H100V20C100 8.9543 91.0457 0 80 0H20ZM50 50C33.4315 50 20 36.5685 20 20C20 36.5685 6.56854 50 -10 50V40H110V50C93.4315 50 80 36.5685 80 20C80 36.5685 66.5685 50 50 50Z" fill="url(#grad-pink)" />
                    {/* Simplified geometric approximate since original is complex ribbon fold */}
                    {/* Top left flap */}
                    <path d="M0 20C0 8.9543 8.9543 0 20 0H49C49 27.062 27.062 49 0 49V20Z" fill="#F8AFFF" />
                    {/* Top right flap */}
                    <path d="M100 20C100 8.9543 91.0457 0 80 0H51C51 27.062 72.938 49 100 49V20Z" fill="#F8AFFF" />
                    {/* Bottom left curve */}
                    <path d="M0 100H20C20 83.4315 33.4315 70 50 70V51H0V100Z" fill="#F38DF0" />
                    {/* Bottom right curve */}
                    <path d="M100 100H80C80 83.4315 66.5685 70 50 70V51H100V100Z" fill="#F38DF0" />
                    <line x1="0" y1="50" x2="100" y2="50" stroke="#000" strokeWidth="2" />
                </svg>
            );
        case 'green':
            return (
                <svg width="240" height="240" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad-green" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#1EEDA4" />
                            <stop offset="1" stopColor="#08F87C" />
                        </linearGradient>
                    </defs>
                    <path fillRule="evenodd" clipRule="evenodd" d="M20 0C8.9543 0 0 8.9543 0 20V80C0 91.0457 8.9543 100 20 100H80C91.0457 100 100 91.0457 100 80V20C100 8.9543 91.0457 0 80 0H20ZM25 15C19.4772 15 15 19.4772 15 25C15 30.5228 19.4772 35 25 35C30.5228 35 35 30.5228 35 25C35 19.4772 30.5228 15 25 15ZM75 15C69.4772 15 65 19.4772 65 25C65 30.5228 69.4772 35 75 35C80.5228 35 85 30.5228 85 25C85 19.4772 80.5228 15 75 15ZM15 75C15 69.4772 19.4772 65 25 65C30.5228 65 35 69.4772 35 75C35 80.5228 30.5228 85 25 85C19.4772 85 15 80.5228 15 75ZM75 65C69.4772 65 65 69.4772 65 75C65 80.5228 69.4772 85 75 85C80.5228 85 85 80.5228 85 75C85 69.4772 80.5228 65 75 65ZM50 35C50 43.2843 43.2843 50 35 50C43.2843 50 50 56.7157 50 65C50 56.7157 56.7157 50 65 50C56.7157 50 50 43.2843 50 35Z" fill="url(#grad-green)" />
                </svg>
            );
        case 'blue':
            return (
                <svg width="240" height="240" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad-blue" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#43D2FF" />
                            <stop offset="1" stopColor="#0B98FF" />
                        </linearGradient>
                    </defs>
                    <path fillRule="evenodd" clipRule="evenodd" d="M20 0C8.9543 0 0 8.9543 0 20V80C0 91.0457 8.9543 100 20 100H80C91.0457 100 100 91.0457 100 80V20C100 8.9543 91.0457 0 80 0H20ZM50 20C50 36.5685 36.5685 50 20 50C36.5685 50 50 63.4315 50 80C50 63.4315 63.4315 50 80 50C63.4315 50 50 36.5685 50 20Z" fill="url(#grad-blue)" />
                </svg>
            );
        default:
            return null;
    }
}

export default function HowWeWork() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    const handleNext = () => {
        gsap.to(contentRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            onComplete: () => {
                setCurrentIndex((prev) => (prev + 1) % slides.length);
                gsap.fromTo(contentRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
            }
        });
    };

    const handlePrev = () => {
        gsap.to(contentRef.current, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            onComplete: () => {
                setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
                gsap.fromTo(contentRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
            }
        });
    };

    const currentSlide = slides[currentIndex];

    // Scroll trigger entrance & continuous SVG animation
    useGSAP(() => {
        gsap.fromTo('.hww-header',
            { opacity: 0, y: 30 },
            {
                opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
            }
        );

        gsap.fromTo('.hww-card',
            { opacity: 0, scale: 0.95, y: 40 },
            {
                opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2,
                scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
            }
        );

        // Continuous floating breath animation for SVGs
        gsap.to('.svg-glowing-wrapper', {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="w-full h-auto min-h-screen lg:h-screen lg:min-h-[600px] py-10 md:py-16 lg:py-12 bg-[#0d0d0d] flex flex-col items-center justify-center overflow-hidden relative">

            {/* Expanded width to 1600px (or 98%) to occupy extreme screen real estate */}
            <div className="w-full max-w-[1600px] w-[98%] md:w-[96%] mx-auto flex flex-col justify-center h-full z-10 px-0 md:px-6">

                {/* Header Section */}
                <div className="hww-header w-full flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-8">
                    <div className="flex flex-col items-start text-left">
                        <span className="text-[10px] md:text-xs font-bold tracking-widest text-[#a0a0a0] uppercase border border-[#333] rounded-full px-4 py-1.5 mb-4 bg-[#1a1a1a]">
                            How We Work
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-medium leading-[1.1] tracking-tight text-white mb-4 md:mb-0">
                            <span className="text-[#666666]">How we bring</span><br />
                            ideas to life
                        </h2>
                    </div>
                    <button className="bg-white text-black font-medium text-sm md:text-base px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors">
                        How we work
                    </button>
                </div>

                {/* Slider Card Container - Moved wrapper to relative for absolute cut-out button */}
                <div className="hww-card relative w-full flex flex-col">

                    {/* The Main Dark Grey Card Background with organic broken corner for the arrow */}
                    <div className="w-full bg-[#161616] rounded-[2rem] p-6 lg:p-14 overflow-hidden flex flex-col border border-[#262626] relative z-10"
                        style={{
                            // Center the mask directly where the 64px (w-16) white button sits (32px from top/right) with a tight 46px radius wrapper gap
                            maskImage: typeof window !== 'undefined' && window.innerWidth >= 768
                                ? `radial-gradient(circle 46px at right 32px top 32px, transparent 45px, black 46px)`
                                : 'none',
                            WebkitMaskImage: typeof window !== 'undefined' && window.innerWidth >= 768
                                ? `radial-gradient(circle 46px at right 32px top 32px, transparent 45px, black 46px)`
                                : 'none'
                        }}
                    >
                        {/* Premium Noise Grain Overlay */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

                        {/* Decreased height from min-350px down to approx 300-350px per user request */}
                        <div ref={contentRef} className="flex flex-col md:flex-row w-full h-full min-h-[300px] md:min-h-[350px]">

                            {/* Text Content - Increased Typography Sizes */}
                            <div className="w-full md:w-[55%] flex flex-col justify-between pr-0 md:pr-12 relative z-10 mb-8 md:mb-0">
                                <div>
                                    <span className="font-display text-[#444] text-5xl md:text-[5.5rem] font-light tracking-tighter mb-4 md:mb-10 block">
                                        {currentSlide.id}
                                    </span>
                                    <h3 className="text-white text-4xl md:text-[3.5rem] lg:text-[4rem] font-medium tracking-tight mb-4 md:mb-6 whitespace-pre-line leading-[1.05]">
                                        {currentSlide.title}
                                    </h3>
                                    <p className="text-[#a0a0a0] text-base md:text-lg leading-[1.6] max-w-[480px] line-clamp-3">
                                        {currentSlide.description}
                                    </p>
                                </div>

                                <div className="mt-8 md:mt-12">
                                    <span className="text-[10px] md:text-xs font-bold tracking-widest text-[#161616] uppercase border border-[#fff] rounded-full px-5 py-2 bg-white inline-block">
                                        {currentSlide.duration}
                                    </span>
                                </div>
                            </div>

                            {/* Interactive SVG Graphic with Glow & Floating Motion */}
                            <div className="w-full md:w-[45%] flex items-center justify-center relative z-10 pt-10 md:pt-0">
                                <div className="svg-glowing-wrapper transition-transform duration-500 ease-out hover:scale-105"
                                    style={{
                                        // Generate a dynamic colored drop-shadow depending on the active slide
                                        filter: currentSlide.color === 'yellow' ? 'drop-shadow(0 0 60px rgba(254, 251, 176, 0.4))' :
                                            currentSlide.color === 'pink' ? 'drop-shadow(0 0 60px rgba(243, 141, 240, 0.4))' :
                                                currentSlide.color === 'green' ? 'drop-shadow(0 0 60px rgba(30, 237, 164, 0.4))' :
                                                    currentSlide.color === 'blue' ? 'drop-shadow(0 0 60px rgba(67, 210, 255, 0.4))' : 'none'
                                    }}
                                >
                                    <SlideIcon type={currentSlide.color} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Slider Controls - Glassmorphic Pill */}
                    <div className="w-full flex justify-end mt-6 pr-2 lg:pr-4">
                        <div className="flex gap-2 p-1.5 bg-[#1a1a1a] rounded-full border border-[#333] backdrop-blur-md">
                            <button
                                onClick={handlePrev}
                                className="w-12 h-12 bg-transparent rounded-full flex items-center justify-center text-[#a0a0a0] hover:text-white transition-colors"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                onClick={handleNext}
                                className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:bg-[#e0e0e0] transition-colors"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Static Top-Right White Arrow - Fits perfectly flush with the card box bounds and drops down on hover */}
                    <div className="hidden md:flex absolute top-0 right-0 z-20 w-16 h-16 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 hover:translate-y-2 cursor-default"
                        style={{
                            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.2)', // Polish ring
                        }}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </div>
                </div> {/* Closes .hww-card */}

            </div> {/* Closes .max-w */}
        </section>
    );
}
