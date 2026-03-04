import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Generate 200 random dots for the floating particle effect
const DOTS = Array.from({ length: 200 }, (_, i) => ({
    id: i + 1,
    size: Math.random() * 5 + 5, // size between 5px and 10px
    left: Math.random() * 100, // 0% to 100% horizontal
    top: Math.random() * 100, // 0% to 100% vertical starting position
    opacity: Math.random() * 0.4 + 0.1, // more subtle opacity 0.1 to 0.5
}));

const testimonials = [
    {
        id: 1,
        quote: "IEI Pakistan brought hope to our remote valley. The library they established has become the heart of our school. Children who never had access to books now spend hours reading and dreaming. The volunteers didn't just teach—they became part of our community.",
        author: "Fatima Karim",
        title: "Teacher, Government Girls School, Chipursan Valley",
        avatar: "https://i.pravatar.cc/150?img=47"
    },
    {
        id: 2,
        quote: "Teaching in Gilgit-Baltistan was transformative. Living with local families, I learned as much as I taught. The warmth of the community, the resilience of students learning in difficult conditions, and the impact of even small interventions changed my understanding of education forever.",
        author: "Ahmed Hassan",
        title: "Volunteer Teacher, Summer 2023 Program",
        avatar: "https://i.pravatar.cc/150?img=11"
    },
    {
        id: 3,
        quote: "Working with IEI Pakistan showed us what genuine grassroots impact looks like. Their community-centered approach, transparency, and commitment to sustainability made our partnership meaningful. They don't just implement programs—they build lasting change.",
        author: "Dr. Nadia Qureshi",
        title: "Education Consultant & IEI Partner",
        avatar: "https://i.pravatar.cc/150?img=5"
    }
];

export default function Testimonials() {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);
    const dotsRef = useRef([]);

    useGSAP(() => {
        // Simple scale/fade upwards entrance for each testimonial card as it enters the viewport
        cardsRef.current.forEach((card, index) => {
            if (!card) return;

            gsap.fromTo(card,
                { opacity: 0, y: 80, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%", // Reveal when the top of the card is 85% down the viewport
                        toggleActions: "play none none reverse",
                    }
                }
            );
        });

        // Smooth continuous upward float for particles
        const sectionHeight = sectionRef.current?.offsetHeight || 1000;

        dotsRef.current.forEach((dot) => {
            if (!dot) return;

            // Random duration for each dot to float all the way up
            const duration = gsap.utils.random(10, 20);

            // We animate pure Y transform.
            // Using pixels instead of % to prevent layout calculation stutter.
            gsap.fromTo(dot,
                { y: sectionHeight },
                {
                    y: -100, // Move past the top
                    duration: duration,
                    ease: "none",
                    repeat: -1,
                    delay: () => gsap.utils.random(0, duration), // Stagger start times
                }
            );
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="w-full bg-[#ffcc00] py-20 md:py-32 relative">

            {/* Animated Dots Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {DOTS.map((dot, index) => (
                    <div
                        key={dot.id}
                        ref={el => dotsRef.current[index] = el}
                        className="absolute rounded-full bg-[#5c4033] will-change-transform" // Hardware acceleration
                        style={{
                            width: `${dot.size}px`,
                            height: `${dot.size}px`,
                            left: `${dot.left}%`,
                            top: 0, // Reset logical top margin, we control starting point via GSAP raw 'y' transform
                            opacity: dot.opacity,
                        }}
                    ></div>
                ))}
            </div>

            <div className="max-w-[1536px] w-[92%] md:w-[94%] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative z-10">

                {/* Left Column - Pinned / Sticky */}
                <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-32 h-fit mb-12 lg:mb-0">

                    {/* Badge */}
                    <span className="text-[10px] md:text-xs font-bold tracking-widest text-[#3D3300] uppercase border border-[#3D3300]/20 rounded-full px-4 py-1.5 mb-8 bg-white/50">
                        STORIES OF IMPACT
                    </span>

                    {/* Two-Tone Title */}
                    <h2 className="text-[3.5rem] md:text-[5rem] lg:text-[5.5rem] leading-[1.05] tracking-tight font-medium mb-10">
                        <span className="text-[#3D3300]/70 block">Hear it</span>
                        <span className="text-[#3D3300] block">from our community</span>
                    </h2>

                    {/* Scroll mouse hint removed per user request */}

                    {/* CTA Button */}
                    <button className="px-8 py-4 rounded-full border border-[#3D3300] text-[#3D3300] font-medium text-lg transition-all duration-300 hover:bg-[#3D3300] hover:text-[#ffcc00]">
                        Read more stories
                    </button>

                </div>

                {/* Right Column - Scrolling Testimonial Cards */}
                <div className="lg:col-span-7 flex flex-col gap-8 md:gap-12">
                    {testimonials.map((testimonial, i) => (
                        <div
                            key={testimonial.id}
                            ref={el => cardsRef.current[i] = el}
                            className="bg-white rounded-[2rem] p-8 md:p-14 border border-white/20 shadow-xl flex flex-col justify-between min-h-[400px]"
                        >
                            {/* Large Quote */}
                            <p className="font-display text-[#3D3300] text-2xl md:text-3xl lg:text-[2rem] leading-[1.3] font-light tracking-tight mb-12">
                                "{testimonial.quote}"
                            </p>

                            {/* Reviewer Meta */}
                            <div className="flex items-center gap-6 mt-auto">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.author}
                                    className="w-16 h-16 rounded-full object-cover border border-[#3D3300]/20 grayscale"
                                />
                                <div className="flex flex-col">
                                    <span className="text-[#3D3300] font-medium text-lg md:text-xl">
                                        {testimonial.author}
                                    </span>
                                    <span className="text-[#3D3300]/70 text-sm md:text-base">
                                        {testimonial.title}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
