import React, { useRef, useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: 'MC Interior Design',
        industry: 'INTERIOR DESIGN',
        category: 'BRANDING • DESIGN • DEVELOPMENT',
        description: 'Well-being & Harmony to Interior Spaces',
        kpi: '+89%',
        kpiLabel: 'Traffic Growth',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop'
    },
    {
        id: 2,
        title: 'RecruiterOne',
        industry: 'HUMAN RESOURCES',
        category: 'DEVELOPMENT',
        description: 'Transforming Recruitment for Entrepreneurs',
        kpi: '+60%',
        kpiLabel: 'Conversion Increases',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop'
    },
    {
        id: 3,
        title: 'Aura Studio',
        industry: 'E-COMMERCE',
        category: 'DESIGN / UI',
        description: 'High-end aesthetic shopping experience',
        kpi: '+45%',
        kpiLabel: 'AOV Lift',
        image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1600&auto=format&fit=crop'
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

    // Initialize Embla: duration 45 for buttery smooth tracking per reference request
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        dragFree: false,
        loop: false,
        skipSnaps: false,
        duration: 45
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
    }, [emblaApi, onSelect]);

    return (
        <section ref={containerRef} className="w-full py-20 md:py-32 bg-[#121212]">
            <div className="max-w-[1440px] mx-auto flex flex-col gap-12 lg:gap-14 px-4 md:px-8 lg:px-12">

                {/* 1. Global Header (Exact sizes & alignments) */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-4">
                    <div className="flex flex-col items-start gap-5 md:gap-5">
                        <span className="bg-[#1a1a1a] text-[#a0a0a0] px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-widest uppercase border border-white/5">
                            Featured Projects
                        </span>
                        <h2 className="text-5xl md:text-[4.5rem] lg:text-[5.5rem] font-bold leading-[1.05] tracking-tighter text-white m-0">
                            <span className="text-[#666666]">How</span> we helped<br />other succeed
                        </h2>
                        {/* Mobile Button: properly placed under heading */}
                        <button className="bg-white text-black px-7 py-3 mt-2 rounded-[12px] md:hidden text-sm font-[600] tracking-[-0.2px] hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(255,255,255,0.15)] transition-all duration-300 whitespace-nowrap">
                            See all projects
                        </button>
                    </div>
                    {/* Desktop Button: placed right */}
                    <button className="bg-white text-black px-7 py-3 rounded-[12px] text-sm font-[600] tracking-[-0.2px] hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(255,255,255,0.15)] transition-all duration-300 whitespace-nowrap hidden md:block">
                        See all projects
                    </button>
                </div>

                {/* 2. Embla Carousel Track (Spaced with peeking next card) */}
                <div className="relative">
                    {/* Extract vertical bounds securely to prevent shadow clipping */}
                    <div className="embla w-full overflow-hidden -my-16 py-16" ref={emblaRef}>
                        {/* Reduce gap between uniquely sized cards for highly focused active slide */}
                        <div className="embla__container flex gap-4 md:gap-5 lg:gap-6">

                            {projects.map((project) => (
                                <div key={project.id} className="embla__slide min-w-0 flex-[0_0_92%] sm:flex-[0_0_90%] md:flex-[0_0_92%] lg:flex-[0_0_100%] xl:flex-[0_0_100%]">
                                    {/* Massive flex basis to simulate 1:1 focus, showing only a fraction of the next card */}
                                    {/* 3. The Unified Dark Card */}
                                    {/* Removed internal padding on parent to allow image to hit boundaries */}
                                    <div className="w-full bg-[#191919] rounded-[24px] flex flex-col lg:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden min-h-[500px] lg:min-h-[620px]">

                                        {/* Left Panel: The Visual (~60%) */}
                                        {/* Fixed mobile height collapse: min-h-[350px] forces visibility when flex-col */}
                                        <div className="relative w-full lg:w-[60%] shrink-0 group bg-[#111] rounded-t-[24px] lg:rounded-t-none lg:rounded-l-[24px] overflow-hidden min-h-[300px] sm:min-h-[400px] lg:min-h-0">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                                draggable={false}
                                            />

                                            {/* Exact CSS Gradient from live site (rgba(32, 32, 32, 0.8) to transparent) */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#202020]/80 to-transparent pointer-events-none z-20" />

                                            {/* KPI Overlay */}
                                            <div className="absolute bottom-6 md:bottom-10 lg:bottom-14 left-6 md:left-8 lg:left-12 z-30 flex flex-col">
                                                {/* Scale for mobile, full extraction on desktop */}
                                                <span className="text-white text-[56px] lg:text-[76px] font-[500] tracking-[-1.5px] leading-none mb-1">
                                                    {project.kpi}
                                                </span>
                                                <span className="text-white text-[14px] lg:text-[18px] font-[500] tracking-tight ml-1">
                                                    {project.kpiLabel}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Right Panel: The Details (~40%) */}
                                        <div className="w-full lg:w-[40%] flex flex-col justify-between py-10 px-8 sm:px-10 lg:py-16 lg:px-12 xl:px-14">

                                            {/* Top Data */}
                                            <div className="flex flex-col items-start gap-4">
                                                <span className="bg-[#242424] text-[#b4b4b4] px-3.5 py-1.5 rounded-[6px] text-[12px] font-[500] tracking-wide uppercase">
                                                    {project.industry}
                                                </span>
                                                {/* Live site geometry: 43px, weight 500, spacing -1px - Responsively scaled to 32px on mobile */}
                                                <h3 className="text-[32px] md:text-[43px] font-[500] tracking-[-1px] text-white leading-tight mt-1">
                                                    {project.title}
                                                </h3>
                                            </div>

                                            {/* Bottom Data */}
                                            <div className="flex flex-col gap-1.5 mt-16 lg:mt-0">
                                                {/* Live site geometry: 14px, #B4B4B4 */}
                                                <span className="text-[#b4b4b4] text-[14px] font-[400] tracking-[-0.5px] uppercase mb-1">
                                                    {project.category}
                                                </span>
                                                {/* Live site geometry: 18px, weight 500, pure #FFFFFF to create the rich/bright contrast */}
                                                <p className="text-white text-[18px] font-[500] tracking-[-0.5px] leading-[1.6] max-w-[95%]">
                                                    {project.description}
                                                </p>
                                            </div>
                                        </div>

                                    </div> {/* End Unified Card */}
                                </div>
                            ))}

                        </div>
                    </div >
                </div > {/* End Carousel Container Wrapper */}

                {/* 4. External Slider Controls */}
                <div className="flex justify-end items-center mt-6 md:mt-10 lg:mt-0 w-full">
                    <div className="flex gap-4 sm:gap-6 ml-auto">
                        <button
                            onClick={scrollPrev}
                            className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-[#18181A] hover:bg-white hover:text-black flex justify-center items-center text-white transition-all duration-300 border border-white/10 active:scale-95 disabled:opacity-30 disabled:hover:bg-[#18181A] disabled:hover:text-white disabled:cursor-not-allowed group"
                            disabled={prevBtnDisabled}
                            aria-label="Previous project"
                        >
                            <svg width="12" height="20" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:-translate-x-1 transition-all duration-300 opacity-70 group-hover:opacity-100 group-hover:scale-110">
                                <path d="M8.5 15L1.5 8L8.5 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button
                            onClick={scrollNext}
                            className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-[#18181A] hover:bg-white hover:text-black flex justify-center items-center text-white transition-all duration-300 border border-white/10 active:scale-95 disabled:opacity-30 disabled:hover:bg-[#18181A] disabled:hover:text-white disabled:cursor-not-allowed group"
                            disabled={nextBtnDisabled}
                            aria-label="Next project"
                        >
                            <svg width="12" height="20" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-1 transition-all duration-300 opacity-70 group-hover:opacity-100 group-hover:scale-110">
                                <path d="M1.5 1L8.5 8L1.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>

            </div >
        </section >
    );
}
