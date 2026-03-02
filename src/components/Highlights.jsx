import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const statsData = [
    { target: 80, suffix: '+', label: 'Projects Completed', color: '#FF4A5A' },
    { target: 12, suffix: '+', label: 'Years Experience', color: '#C1EE1E' },
    { target: 95, suffix: '%', label: 'Client Retention Rate', color: '#1DB954' },
    { target: 32, suffix: '%', label: 'Increased Conversions', color: '#2B70FF' },
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
        <section ref={containerRef} className="relative w-full py-24 md:py-40 bg-[#121212] overflow-hidden">
            {/* Global Constrained Wrapper for Perfect Left/Right Alignment */}
            <div className="w-full max-w-[1440px] px-4 md:px-8 lg:px-12 mx-auto">
                {/* Header Layout */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 md:mb-32 gap-8">
                    <div className="max-w-3xl">
                        <span className="text-white/40 bg-[#1A1A1A] uppercase tracking-widest text-[0.8rem] md:text-[0.9rem] font-bold mb-8 block rounded-full px-5 py-2 w-fit">HIGHLIGHTS</span>
                        <h2 className="text-6xl md:text-[5.5rem] lg:text-[6.5rem] font-medium leading-[1] tracking-[-0.03em] text-[#5A5A5A]">
                            Numbers that <br className="hidden md:block" />
                            <span className="text-white">drive success</span>
                        </h2>
                    </div>
                    <button className="px-8 py-4 md:px-10 md:py-5 bg-white text-black font-semibold rounded-xl text-lg hover:bg-gray-200 transition-colors pointer-events-auto whitespace-nowrap mb-2 md:mb-6">
                        More about us
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-24 md:gap-y-32">
                    {statsData.map((stat, i) => (
                        <div key={i} className={`flex flex-col items-start w-full md:w-[320px] lg:w-[420px] xl:w-[480px] ${i % 2 !== 0 ? 'md:justify-self-end' : 'md:justify-self-start'}`}>
                            <div className="flex items-center gap-6 md:gap-8 mb-4">
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
                                <div className="text-[6rem] md:text-[clamp(8rem,13.5vw,13.5rem)] font-medium text-white tracking-[-0.05em] leading-[0.8]">
                                    <span ref={el => numRefs.current[i] = el} data-target={stat.target}>0</span>
                                    {stat.suffix}
                                </div>
                            </div>
                            {/* Descriptive Label */}
                            <p className="text-2xl md:text-[2rem] text-white/40 font-medium ml-[4.5rem] md:ml-[6rem] leading-tight">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
