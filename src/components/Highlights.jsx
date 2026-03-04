import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const statsData = [
    { target: 1000, suffix: '+', label: 'Lives Changed', color: '#ffcc00' },
    { target: 9, suffix: '', label: 'Years of Impact', color: '#ffcc00' },
    { target: 500, suffix: '+', label: 'Volunteers participated', color: '#ffcc00' },
    { target: 7, suffix: '', label: 'Programmes Running', color: '#ffcc00' },
];

export default function Highlights() {
    const containerRef = useRef(null);
    const numRefs = useRef([]);
    const dotRefs = useRef([]);
    const rippleRefs = useRef([]);

    useGSAP(() => {
        const stats = numRefs.current;
        const dots = dotRefs.current;

        stats.forEach((el, index) => {
            if (!el) return;
            const target = parseFloat(el.getAttribute('data-target'));

            // Proxy object for number counting
            const proxy = { val: 0 };

            gsap.to(proxy, {
                val: target,
                duration: 2.5,
                delay: index * 0.15, // Subtle stagger
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none"
                },
                onUpdate: () => {
                    el.innerText = Math.ceil(proxy.val);
                }
            });

            // Continuous Ripple motion effect
            const dotEl = dots[index];
            if (dotEl) {
                const color = statsData[index].color;

                // Entrance pop
                gsap.fromTo(dotEl,
                    { scale: 0 },
                    {
                        scale: 1,
                        duration: 0.3,
                        delay: index * 0.15,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 75%",
                        }
                    }
                );

                // Continuous Ripple
                const rippleEl = rippleRefs.current[index];
                if (rippleEl) {
                    gsap.fromTo(rippleEl,
                        {
                            scale: 1,
                            opacity: 0.6
                        },
                        {
                            scale: 4,
                            opacity: 0,
                            duration: 2,
                            delay: index * 0.15 + 0.5, // Start after entrance pop
                            ease: "power2.out",
                            repeat: -1,
                            repeatDelay: 0.5,
                            scrollTrigger: {
                                trigger: containerRef.current,
                                start: "top 80%",
                                toggleActions: "play pause resume pause"
                            }
                        }
                    );
                }
            }
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full pt-4 pb-16 md:pt-8 md:pb-24 bg-white overflow-hidden">
            {/* Global Constrained Wrapper for Perfect Left/Right Alignment */}
            <div className="w-full max-w-[1440px] px-4 md:px-8 lg:px-12 mx-auto">
                {/* Header Layout */}
                <div className="flex flex-col mb-16 md:mb-20">
                    <div className="max-w-3xl">
                        <span className="text-gray-500 uppercase tracking-widest text-sm md:text-base font-bold mb-4 block">OUR IMPACT</span>
                        <h2 className="text-5xl md:text-7xl lg:text-[6.5rem] font-bold md:font-black font-serif leading-[1] tracking-[-0.03em] text-[#ffcc00]">
                            Numbers that <br className="hidden md:block" />
                            <span className="text-[#ffcc00]">tell our story</span>
                        </h2>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-y-20 gap-x-8">
                    {statsData.map((stat, i) => (
                        <div key={i} className={`flex flex-col items-start w-full md:w-[320px] lg:w-[420px] xl:w-[480px] ${i % 2 !== 0 ? 'md:justify-self-end' : 'md:justify-self-start'}`}>
                            <div className="flex items-center gap-4 md:gap-6 mb-2">
                                {/* Colored Accent Dot with Halo */}
                                <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center shrink-0">
                                    <div className="relative w-5 h-5 md:w-5.5 md:h-5.5 flex items-center justify-center">
                                        <div
                                            ref={el => rippleRefs.current[i] = el}
                                            className="absolute inset-0 rounded-full"
                                            style={{ backgroundColor: stat.color }}
                                        ></div>
                                        <div
                                            ref={el => dotRefs.current[i] = el}
                                            className="relative w-full h-full rounded-full z-10"
                                            style={{ backgroundColor: stat.color }}
                                        ></div>
                                    </div>
                                </div>
                                {/* Massive Number */}
                                <div className="text-[5.5rem] md:text-[clamp(7rem,12vw,12rem)] font-bold md:font-black tracking-[-0.05em] leading-[0.8] text-black">
                                    <span ref={el => numRefs.current[i] = el} data-target={stat.target}>0</span>
                                    {stat.suffix}
                                </div>
                            </div>
                            {/* Descriptive Label */}
                            <p className="text-lg md:text-3xl text-gray-600 font-semibold ml-[3.5rem] md:ml-[5rem] leading-tight">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
