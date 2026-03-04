import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const slides = [
    {
        id: '01',
        title: "Climate Educator\nTraining Programme",
        description: "Equipping teachers with knowledge and tools to integrate climate education into their curriculum. We train educators on environmental sustainability, climate action, and ecological awareness to prepare students for a changing world.",
        image: "/images/programmes/slide1.webp"
    },
    {
        id: '02',
        title: "ECD School\nIspinji, Chipursan",
        description: "Operating an early childhood development center in one of Pakistan's most remote valleys. We provide quality early education, play-based learning, and developmental support for children aged 3-6 years.",
        image: "/images/programmes/slide2.webp"
    },
    {
        id: '03',
        title: "Libraries for\nPublic Schools",
        description: "Transforming empty classrooms into vibrant learning hubs. We establish colorful, well-stocked libraries with books, digital resources, and reading spaces that inspire curiosity and imagination.",
        image: "/images/programmes/slide3.webp"
    },
    {
        id: '04',
        title: "Saheli\nCircles",
        description: "Creating mentorship circles for young women in remote communities. Through regular meetings, workshops, and peer support, we foster leadership skills, confidence, and community bonds among girls.",
        image: "/images/programmes/slide4.webp"
    },
    {
        id: '05',
        title: "Tech Sahelis\nProgramme",
        description: "Bridging the digital divide by teaching computer literacy, coding basics, and technology skills to young women. We empower participants with tools to access online opportunities and digital careers.",
        image: "/images/programmes/slide5.webp"
    },
    {
        id: '06',
        title: "Community Films\n& Storytelling",
        description: "Documenting the voices, stories, and experiences of mountain communities through film. We produce documentaries that showcase local culture, preserve oral histories, and amplify unheard narratives.",
        image: "/images/programmes/slide6.webp"
    },
    {
        id: '07',
        title: "Annual Summer\nCamp",
        description: "An immersive multi-week experience combining education, arts, outdoor adventure, and creativity. Students engage in hands-on learning, make new friends, and build confidence through experiential activities.",
        image: "/images/programmes/slide7.webp"
    }
];

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

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="w-full h-auto min-h-screen lg:h-screen lg:min-h-[600px] py-10 md:py-16 lg:py-12 bg-white flex flex-col items-center justify-center overflow-hidden relative">

            {/* Expanded width to 1600px to occupy extreme screen real estate */}
            <div className="w-full max-w-[1600px] mx-auto flex flex-col justify-center h-full z-10 px-4 md:px-8 lg:px-12">

                {/* Header Section */}
                <div className="hww-header w-full flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-8">
                    <div className="flex flex-col items-start text-left">
                        <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-medium leading-[1.1] tracking-tight mb-4 md:mb-0">
                            <span className="text-black block">OUR</span>
                            <span className="text-[#ffcc00] block mt-1">PROGRAMMES</span>
                        </h2>
                    </div>
                    <button className="bg-[#ffcc00] text-[#3D3300] font-bold text-sm md:text-base px-6 py-3 rounded-xl hover:bg-[#e6b800] transition-colors">
                        Our Programmes
                    </button>
                </div>

                {/* Slider Card Container - Moved wrapper to relative for absolute cut-out button */}
                <div className="hww-card relative w-full flex flex-col">

                    {/* The Main Dark Grey Card Background with organic broken corner for the arrow */}
                    <div className="w-full bg-[#ffcc00] rounded-[2rem] p-0 overflow-hidden flex flex-col border border-transparent relative z-10"
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

                        {/* Container wrapping Text padding and Image split correctly */}
                        <div ref={contentRef} className="flex flex-col md:flex-row w-full h-full min-h-[450px] md:min-h-[500px] relative">

                            {/* Text Content - Shift padding inside */}
                            <div className="w-full md:w-[50%] flex flex-col justify-between p-6 px-10 md:px-6 lg:p-14 pb-12 relative z-10 pointer-events-none">
                                <div className="pointer-events-auto">
                                    <span className="font-display text-[#3D3300]/40 text-5xl md:text-[5.5rem] font-light tracking-tighter mb-4 md:mb-10 block">
                                        {currentSlide.id}
                                    </span>
                                    <h3 className="text-[#3D3300] text-4xl md:text-[3.5rem] lg:text-[4rem] font-medium tracking-tight mb-4 md:mb-6 whitespace-pre-line leading-[1.05]">
                                        {currentSlide.title}
                                    </h3>
                                    <p className="text-[#3D3300] text-base md:text-lg leading-[1.6] max-w-[480px] line-clamp-3 mb-8 md:mb-10">
                                        {currentSlide.description}
                                    </p>
                                    <button className="bg-black text-white px-8 py-4 rounded-xl font-bold text-sm md:text-base hover:bg-gray-800 transition-colors pointer-events-auto inline-flex items-center gap-2 w-fit">
                                        Learn More
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                    </button>
                                </div>
                            </div>

                            {/* Slanted Image Frame on the Right - Absolutely positioned to span to borders over nested padding */}
                            <div className="w-full md:w-[50%] flex-grow relative overflow-hidden pointer-events-none min-h-[250px] md:min-h-0 md:absolute md:top-0 md:right-0 md:h-full md:w-[60%] z-0"
                                style={{
                                    clipPath: typeof window !== 'undefined' && window.innerWidth >= 768 ? 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)' : 'none'
                                }}
                            >
                                <div className="absolute inset-0 bg-[#e6b800]/40 flex flex-col items-center justify-center">
                                    <img
                                        src={currentSlide.image}
                                        alt={currentSlide.title}
                                        className="absolute inset-0 w-full h-full object-cover object-center z-10 transition-opacity duration-300"
                                        onError={(e) => { e.currentTarget.style.opacity = '0'; }}
                                    />
                                    {/* Placeholder if image fails to load */}
                                    <div className="absolute inset-0 z-0 flex flex-col items-center justify-center text-[#3D3300]/60">
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-3 opacity-60">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                            <polyline points="21 15 16 10 5 21"></polyline>
                                        </svg>
                                        <span className="font-bold text-sm tracking-widest uppercase mb-1">Upload Here</span>
                                        <span className="text-xs opacity-70 font-mono text-center px-4 leading-[1.4] block max-w-xs">{`public${currentSlide.image}`}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Slider Controls - Glassmorphic Pill */}
                    <div className="w-full flex justify-end mt-6 pr-2 lg:pr-4">
                        <div className="flex gap-2 p-1.5 bg-white rounded-full border border-gray-200">
                            <button
                                onClick={handlePrev}
                                className="w-12 h-12 bg-transparent rounded-full flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                onClick={handleNext}
                                className="w-12 h-12 bg-[#ffcc00] rounded-full flex items-center justify-center text-[#3D3300] hover:bg-[#e6b800] transition-colors"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Static Top-Right White Arrow - Fits perfectly flush with the card box bounds and drops down on hover */}
                    <div className="hidden md:flex absolute top-0 right-0 z-20 w-16 h-16 items-center justify-center rounded-full bg-[#ffcc00] text-[#3D3300] transition-transform duration-300 hover:translate-y-2 cursor-default"
                        style={{
                            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)', // Polish ring
                        }}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </div>
                </div> {/* Closes .hww-card */}

            </div> {/* Closes .max-w */}
        </section>
    );
}
