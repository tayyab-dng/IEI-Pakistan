import React, { useRef, useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const programmes = [
    {
        id: 1,
        title: 'Climate Educator Training Programme',
        category: 'Environmental Education',
        description: 'Training teachers to integrate climate education into their curriculum',
        stat: '50+',
        statLabel: 'Teachers Trained',
        image: '/images/hero/slide-2.webp' // Reusing a mountain school image as a placeholder
    },
    {
        id: 2,
        title: 'ECD School Ispinji, Chipursan',
        category: 'Early Childhood Development',
        description: 'Quality early education in one of Pakistan\'s most remote valleys',
        stat: '100+',
        statLabel: 'Children Enrolled',
        image: '/images/hero/slide-1.webp'
    },
    {
        id: 3,
        title: 'Libraries for Public Schools',
        category: 'Infrastructure & Resources',
        description: 'Creating colorful, playful learning spaces with books and digital tools',
        stat: '15+',
        statLabel: 'Libraries Established',
        image: '/images/hero/slide-5.webp'
    },
    {
        id: 4,
        title: 'Saheli Circles',
        category: 'Youth Empowerment',
        description: 'Mentorship circles fostering leadership among young women',
        stat: '200+',
        statLabel: 'Girls Participating',
        image: '/images/hero/slide-4.webp'
    },
    {
        id: 5,
        title: 'Tech Sahelis Programme',
        category: 'Digital Literacy',
        description: 'Empowering women with technology and digital skills training',
        stat: '150+',
        statLabel: 'Women Trained',
        image: '/images/hero/slide-3.webp'
    },
    {
        id: 6,
        title: 'Community Films',
        category: 'Media & Arts',
        description: 'Documenting stories and voices from remote mountain communities',
        stat: '10+',
        statLabel: 'Films Produced',
        image: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1600&auto=format&fit=crop'
    },
    {
        id: 7,
        title: 'Annual Summer Camp',
        category: 'Experiential Learning',
        description: 'Immersive learning combining education, art, and adventure',
        stat: '300+',
        statLabel: 'Campers Annually',
        image: 'https://images.unsplash.com/photo-1533222481259-ce20eda1e20b?q=80&w=1600&auto=format&fit=crop'
    },
    {
        id: 8,
        title: 'Saheli Leader Fellowship',
        category: 'Leadership Development',
        description: 'Intensive fellowship preparing young women as community leaders',
        stat: '25+',
        statLabel: 'Fellows Selected',
        image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1600&auto=format&fit=crop'
    }
];

export default function FeaturedProjects() {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(containerRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            }
        );
    }, { scope: containerRef });

    // Embla Carousel Setup for multiple visible cards
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        containScroll: 'keepSnaps', // keepSnaps instead of trimSnaps required for proper loop
        dragFree: true,
        loop: true,
    });

    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback((emblaApi) => {
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect(emblaApi);
        emblaApi.on('reInit', onSelect).on('select', onSelect);

        // Auto-play interval
        const autoplayId = setInterval(() => {
            if (emblaApi) {
                emblaApi.scrollNext();
            }
        }, 3000); // changes slide every 3 seconds

        return () => clearInterval(autoplayId);
    }, [emblaApi, onSelect]);

    return (
        <section ref={containerRef} className="w-full py-20 md:py-32 bg-white overflow-hidden">
            <div className="max-w-[1440px] mx-auto flex flex-col gap-12 lg:gap-14 px-4 md:px-8 lg:px-12">

                {/* 1. Global Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-4">
                    <div className="flex flex-col items-start gap-4">
                        <span className="bg-[#FFD43B] text-black px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-black/5">
                            Focus Areas
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900 m-0 flex items-center gap-4">
                            Our Programmes
                            <div className="w-3 h-3 md:w-4 md:h-4 bg-[#FFD43B] rounded-full mt-2"></div>
                        </h2>
                        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mt-2">
                            Building futures through innovative educational initiatives across Gilgit-Baltistan
                        </p>
                    </div>

                    {/* Navigation Controls moved to Top Right on Desktop */}
                    <div className="flex gap-4 ml-auto self-end">
                        <button
                            onClick={scrollPrev}
                            className="w-12 h-12 rounded-full bg-gray-100 hover:bg-[#FFD43B] hover:text-black flex justify-center items-center text-gray-800 transition-all duration-300 border border-black/5 active:scale-95 disabled:opacity-30 disabled:hover:bg-gray-100 disabled:hover:text-gray-800 disabled:cursor-not-allowed group"
                            disabled={prevBtnDisabled}
                            aria-label="Previous programme"
                        >
                            <svg width="8" height="14" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:-translate-x-0.5 transition-all duration-300">
                                <path d="M8.5 15L1.5 8L8.5 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button
                            onClick={scrollNext}
                            className="w-12 h-12 rounded-full bg-gray-100 hover:bg-[#FFD43B] hover:text-black flex justify-center items-center text-gray-800 transition-all duration-300 border border-black/5 active:scale-95 disabled:opacity-30 disabled:hover:bg-gray-100 disabled:hover:text-gray-800 disabled:cursor-not-allowed group"
                            disabled={nextBtnDisabled}
                            aria-label="Next programme"
                        >
                            <svg width="8" height="14" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-0.5 transition-all duration-300">
                                <path d="M1.5 1L8.5 8L1.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* 2. Embla Carousel Track */}
                <div className="relative mt-4">
                    <div className="embla w-full overflow-visible" ref={emblaRef}>
                        <div className="embla__container flex gap-6">

                            {programmes.map((programme) => (
                                // Responsive widths: 1 card mobile, 2 tablet, 3 desktop
                                <div key={programme.id} className="embla__slide flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0">

                                    {/* The Clean Card */}
                                    <div className="group w-full h-full bg-[#FFD43B] rounded-2xl flex flex-col border border-transparent hover:border-black/5 transition-colors duration-300 overflow-hidden hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(255,212,59,0.3)]">

                                        {/* Image Section (Top) */}
                                        <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-black shrink-0 border-b border-black/5">
                                            <img
                                                src={programme.image}
                                                alt={programme.title}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                draggable={false}
                                            />
                                            {/* Gradient Overlay for Stat inside image bottom left */}
                                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent pointer-events-none z-10" />

                                            {/* Category Tag Top Left - Black tag to contrast the yellow card */}
                                            <div className="absolute top-4 left-4 z-20">
                                                <span className="bg-black text-[#FFD43B] px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide uppercase shadow-lg">
                                                    {programme.category}
                                                </span>
                                            </div>

                                            {/* KPI Overlay Bottom Left */}
                                            <div className="absolute bottom-4 left-5 z-20 flex flex-col">
                                                <span className="text-[#FFD43B] text-4xl lg:text-5xl font-bold tracking-tighter leading-none mb-1 drop-shadow-md">
                                                    {programme.stat}
                                                </span>
                                                <span className="text-white/90 text-[13px] font-medium tracking-wide">
                                                    {programme.statLabel}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Section (Bottom) */}
                                        <div className="p-6 lg:p-8 flex flex-col flex-grow justify-between">
                                            <div>
                                                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 leading-tight mb-3 group-hover:text-black transition-colors duration-300">
                                                    {programme.title}
                                                </h3>
                                                <p className="text-gray-800 text-[15px] leading-relaxed font-medium">
                                                    {programme.description}
                                                </p>
                                            </div>

                                            {/* Optional Learn More Link */}
                                            <div className="mt-8 flex items-center gap-2 text-black/60 group-hover:text-black transition-colors duration-300 text-sm font-bold uppercase tracking-wider cursor-pointer w-fit">
                                                Learn More
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-transform duration-300">
                                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
