import React, { useRef, useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const programmes = [
    {
        id: 1,
        title: '1. Access to quality learning experiences in remote schools',
        category: 'Focus Area',
        description: "In mountain communities where resources are scarce and learning facilities and opportunities limited, schools need support in many ways – from improving facilities to training teachers and creating learning opportunities that address the need for 21st century skills. IEI fills this gap through it's various short-term intervention programmes and long duration school development programmes that work with teachers, students and parents in the community.",
        image: '/images/focus-areas/1.webp'
    },
    {
        id: 2,
        title: '2. Social & Emotional Well-being',
        category: 'Focus Area',
        description: "Social Emotional Wellbeing of children is at the heart of all our programmes. Children in isolated and remote mountain communities are at a higher risk of developing mental health issues due to isolation and digital disconnect, and to tackle it, we keep social emotional learning at the core of all our program designs and curriculum to ensure holistic development.\n\nWe do this by imbedding 'play', 'mindfulness' and creative arts in all our engagement with children in and outside the classrooms.",
        image: '/images/focus-areas/2.webp'
    },
    {
        id: 3,
        title: '3. Art in Education',
        category: 'Focus Area',
        description: "Art is embedded across our programme offering to encourage self-expression and foster creativity, imagination and innovation.\n\nUsing mixed mediums including painting, music and performance art, children are engage in learning through playful experiences that span multiple learning areas including science, literacy & climate education.",
        image: '/images/focus-areas/3.webp'
    },
    {
        id: 4,
        title: '4. Education for Sustainable Development',
        category: 'Focus Area',
        description: "We work with communities that are at an imminent risk of life-changing disruptions due to climate change. Therefore, one of our key focuses in education is climate action, awareness and sustainability. We integrate climate and awareness programs in the curriculum for both students and teachers, offer digital Climate Educator Training programmes and enable young climate changemakers through our Design Thinking for Environmental Solutions programme.",
        image: '/images/focus-areas/4.webp'
    },
    {
        id: 5,
        title: '5. Libraries for public schools',
        category: 'Focus Area',
        description: "Libraries are an essential element of a school's programming and many public schools don't have them. With an architect and artist duo we are creating colorful, playful spaces for children equipped with books and digital tools to improve children's learning outcomes, promote reading, digital literacy and critical thinking skills.\n\nUsing mixed mediums including painting, music and performance art, children are engage in learning through playful experiences that span multiple learning areas including science, literacy & climate education.",
        image: '/images/focus-areas/5.webp'
    },
    {
        id: 6,
        title: '6. Volunteer Programmes',
        category: 'Focus Area',
        description: "We believe Volunteerism helps in creating bridges across the diverse cultures and regions of the country, and is imperative for long term peace. It is only by building bridges, integrating & interacting that we can understand each other, grow to respect one another and appreciate what makes us beautiful: our diversity.\n\nOur volunteer programmes offer opportunities to teach and learn from children in a remote mountain village, act as a trainer or mentor and participate in school improvement to uplift the overall quality and experience of education.",
        image: '/images/focus-areas/6.webp'
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

    // Embla Carousel Setup for a single full-width card
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'center',
        containScroll: 'keepSnaps',
        dragFree: false, // Turn off dragFree to snap fully to the single card
        loop: true,
        duration: 40 // Smooth sliding over 40 frames
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
        }, 4000); // changes slide every 4 seconds for readability

        return () => clearInterval(autoplayId);
    }, [emblaApi, onSelect]);

    return (
        <section ref={containerRef} className="w-full pt-16 md:pt-24 pb-8 md:pb-12 bg-white overflow-hidden">
            <div className="max-w-[1440px] mx-auto flex flex-col gap-6 lg:gap-8 px-4 md:px-8 lg:px-12">

                {/* 1. Global Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-4">
                    <div className="flex flex-col items-start gap-4">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900 m-0 flex items-center gap-4">
                            Focus Areas
                            <div className="w-3 h-3 md:w-4 md:h-4 bg-[#ffcc00] rounded-full mt-2"></div>
                        </h2>
                        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mt-3">
                            Building futures through innovative educational initiatives in Gilgit-Baltistan.
                            <br /> Here are some of our key focus areas on which we work on:
                        </p>
                    </div>

                    {/* Navigation Controls moved to Top Right on Desktop */}
                    <div className="flex gap-4 ml-auto self-end">
                        <button
                            onClick={scrollPrev}
                            className="w-12 h-12 rounded-full bg-gray-100 hover:bg-[#ffcc00] hover:text-black flex justify-center items-center text-gray-800 transition-all duration-300 border border-black/10 active:scale-95 disabled:opacity-30 disabled:hover:bg-gray-100 disabled:hover:text-gray-800 disabled:cursor-not-allowed group z-10"
                            disabled={prevBtnDisabled}
                            aria-label="Previous programme"
                        >
                            <svg width="8" height="14" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:-translate-x-0.5 transition-all duration-300">
                                <path d="M8.5 15L1.5 8L8.5 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button
                            onClick={scrollNext}
                            className="w-12 h-12 rounded-full bg-gray-100 hover:bg-[#ffcc00] hover:text-black flex justify-center items-center text-gray-800 transition-all duration-300 border border-black/10 active:scale-95 disabled:opacity-30 disabled:hover:bg-gray-100 disabled:hover:text-gray-800 disabled:cursor-not-allowed group z-10"
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
                <div className="relative mt-2 md:mt-4">
                    <div className="embla w-full overflow-hidden" ref={emblaRef}>
                        <div className="embla__container flex -ml-4 md:-ml-8 lg:-ml-12">

                            {programmes.map((programme) => (
                                // A single card takes exactly 100% of the container
                                <div key={programme.id} className="embla__slide flex-[0_0_100%] min-w-0 pl-4 md:pl-8 lg:pl-12 py-8">

                                    {/* The Split Card Layout, now individual floating rounded cards */}
                                    <div className="group w-full min-h-[650px] md:min-h-[500px] lg:min-h-[600px] flex flex-col md:flex-row bg-[#ffcc00] rounded-[2rem] self-stretch p-4 md:p-6 lg:p-10 gap-6 md:gap-10 lg:gap-16 items-stretch">

                                        {/* Image Section (Left) - Framed Photo */}
                                        <div className="relative w-full md:w-1/2 flex-shrink-0 aspect-square overflow-hidden rounded-[1.5rem] md:rounded-[2rem]">
                                            <img
                                                src={programme.image}
                                                alt={programme.title}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                                                draggable={false}
                                            />
                                            {/* Gradient Overlay for Stat inside image bottom left */}
                                            {programme.stat && (
                                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent pointer-events-none z-10" />
                                            )}

                                            {/* KPI Overlay Bottom Left */}
                                            {programme.stat && (
                                                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-20 flex flex-col">
                                                    <span className="text-white md:text-[#ffcc00] text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-none mb-1 md:mb-2 drop-shadow-md">
                                                        {programme.stat}
                                                    </span>
                                                    <span className="text-white/90 text-sm md:text-base font-medium tracking-wide drop-shadow-sm">
                                                        {programme.statLabel}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content Section (Right) */}
                                        <div className="w-full md:w-1/2 py-4 md:py-8 lg:py-12 flex flex-col justify-start text-left bg-[#ffcc00] md:pr-4 lg:pr-8">
                                            {/* Category Tag Top Left - Black tag to contrast the yellow card */}
                                            <div className="mb-4 md:mb-8 w-fit">
                                                <span className="bg-black text-[#ffcc00] px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase shadow-md">
                                                    {programme.category}
                                                </span>
                                            </div>

                                            <div>
                                                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-4 md:mb-6 group-hover:text-black transition-colors duration-300">
                                                    {programme.title}
                                                </h3>
                                                <div className="text-gray-800 text-base md:text-lg lg:text-xl leading-relaxed font-medium max-w-[650px] space-y-4">
                                                    {programme.description.split('\n\n').map((paragraph, index) => (
                                                        <p key={index}>{paragraph}</p>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Optional Learn More Link */}
                                            <div className="mt-8 md:mt-10 flex items-center gap-2 text-black/60 group-hover:text-black transition-colors duration-300 text-base font-bold uppercase tracking-wider cursor-pointer w-fit">
                                                Learn More
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-2 transition-transform duration-300">
                                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
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
