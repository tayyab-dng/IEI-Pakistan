import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        id: 1,
        quote: "Vantax Studio completely transformed our digital presence. The attention to detail, motion design, and clean architecture far exceeded our expectations. Our new platform feels like a flagship product.",
        author: "Sarah Jenkins",
        title: "Marketing Director, TechNova",
        avatar: "https://i.pravatar.cc/150?img=47"
    },
    {
        id: 2,
        quote: "They don't just build websites; they craft experiences. The team's ability to seamlessly integrate complex backend logic with an absolutely stunning front-end UI is unparalleled in the agency space.",
        author: "David Chen",
        title: "Founder, Zenith Logistics",
        avatar: "https://i.pravatar.cc/150?img=11"
    },
    {
        id: 3,
        quote: "Working with this team was a masterclass in collaboration. They listened to our abstract requirements and turned them into a hyper-polished, functional reality in record time. Truly a world-class studio.",
        author: "Elena Rodriguez",
        title: "VP of Product, Apex FinTech",
        avatar: "https://i.pravatar.cc/150?img=5"
    }
];

export default function Testimonials() {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
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

        // Cleanup
        return () => {
            ScrollTrigger.getAll().forEach(t => {
                // We shouldn't kill all triggers globally if other components use them, 
                // but for strict component unmounts, we should kill ones attached to our refs.
                if (t.trigger === sectionRef.current || cardsRef.current.includes(t.trigger)) {
                    t.kill();
                }
            });
        };
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-[#0a0a0a] py-20 md:py-32 relative">
            <div className="max-w-[1536px] w-[92%] md:w-[94%] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                {/* Left Column - Pinned / Sticky */}
                <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-32 h-fit mb-12 lg:mb-0">

                    {/* Badge */}
                    <span className="text-[10px] md:text-xs font-bold tracking-widest text-white uppercase border border-[#333] rounded-full px-4 py-1.5 mb-8 bg-[#1a1a1a]">
                        Stories of success
                    </span>

                    {/* Two-Tone Title */}
                    <h2 className="text-[3.5rem] md:text-[5rem] lg:text-[5.5rem] leading-[1.05] tracking-tight font-medium mb-10">
                        <span className="text-[#606060] block">Hear it</span>
                        <span className="text-white block">from our clients</span>
                    </h2>

                    {/* Scroll mouse hint removed per user request */}

                    {/* CTA Button */}
                    <button className="px-8 py-4 rounded-full border border-white text-white font-medium text-lg transition-all duration-300 hover:bg-white hover:text-black">
                        Read more stories
                    </button>

                </div>

                {/* Right Column - Scrolling Testimonial Cards */}
                <div className="lg:col-span-7 flex flex-col gap-8 md:gap-12">
                    {testimonials.map((testimonial, i) => (
                        <div
                            key={testimonial.id}
                            ref={el => cardsRef.current[i] = el}
                            className="bg-[#181818] rounded-[2rem] p-8 md:p-14 border border-[#262626] flex flex-col justify-between min-h-[400px]"
                        >
                            {/* Large Quote */}
                            <p className="font-display text-white text-2xl md:text-3xl lg:text-[2.5rem] leading-[1.3] font-light tracking-tight mb-12">
                                "{testimonial.quote}"
                            </p>

                            {/* Reviewer Meta */}
                            <div className="flex items-center gap-6 mt-auto">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.author}
                                    className="w-16 h-16 rounded-full object-cover border border-[#333] grayscale"
                                />
                                <div className="flex flex-col">
                                    <span className="text-white font-medium text-lg md:text-xl">
                                        {testimonial.author}
                                    </span>
                                    <span className="text-[#888] text-sm md:text-base">
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
