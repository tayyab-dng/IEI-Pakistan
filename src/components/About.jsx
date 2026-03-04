import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import InteractiveLinesBackground from './InteractiveLinesBackground';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const containerRef = useRef(null);

    useGSAP(() => {
        const textElements = gsap.utils.toArray('.about-reveal');
        const highlightElements = gsap.utils.toArray('.about-highlight');

        gsap.fromTo(textElements,
            { opacity: 0, y: 40, rotationX: 15 },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                }
            }
        );

        // Sub-animation for highlights
        gsap.fromTo(highlightElements,
            { color: "#3D3300" },
            {
                color: "#1A1600",
                duration: 1,
                stagger: 0.1,
                delay: 0.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                }
            }
        );

    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative w-full py-20 md:py-32 bg-[#ffcc00] overflow-hidden"
            style={{ perspective: '1000px' }}
        >
            <InteractiveLinesBackground />
            <div className="relative z-10 max-w-[1440px] mx-auto w-full px-4 md:px-8 lg:px-12 flex flex-col items-start justify-center text-left">

                {/* IEI Pakistan Logo Left Aligned */}
                <div className="h-[80px] md:h-[100px] mb-12 about-reveal origin-left">
                    <img
                        src="/images/iei-logo.png"
                        alt="IEI Pakistan"
                        className="w-auto h-full object-contain"
                        draggable={false}
                    />
                </div>

                {/* About Text Left Aligned - Dark Text on Yellow */}
                <div className="font-serif text-[7vw] xs:text-[2.2rem] sm:text-[2.5rem] md:text-[clamp(1.8rem,3vw,3rem)] font-normal leading-[1.3] md:leading-[1.4] tracking-tight text-[#3D3300] space-y-8 w-full max-w-[1050px]">
                    <div className="overflow-hidden">
                        <p className="about-reveal">
                            We're a <span className="font-bold italic transition-colors duration-500 about-highlight">non-profit organization</span> founded in 2016 to transform education in remote Pakistan.
                        </p>
                    </div>
                    <div className="overflow-hidden">
                        <p className="about-reveal">
                            We empower remote communities in Gilgit-Baltistan through <span className="font-bold italic transition-colors duration-500 about-highlight">quality education</span>, <span className="font-bold italic transition-colors duration-500 about-highlight">volunteer-driven programs</span>, and <span className="font-bold italic transition-colors duration-500 about-highlight">innovative learning experiences</span> that <span className="font-bold italic transition-colors duration-500 about-highlight">bridge the gap</span> between urban and rural Pakistan.
                        </p>
                    </div>
                </div>

                {/* Left Aligned Black Buttons Component */}
                <div className="mt-14 flex flex-col sm:flex-row gap-4 justify-start items-start w-full about-reveal pt-4">
                    <a
                        href="/join-our-work/donate"
                        className="w-full sm:w-auto px-10 py-4 bg-[#1A1600] text-white font-semibold rounded-lg text-lg hover:bg-[#2A2400] hover:scale-105 active:scale-95 hover:shadow-2xl transition-all duration-300 flex justify-center items-center text-center group"
                    >
                        Donate Now
                    </a>
                    <a
                        href="/about-us"
                        className="w-full sm:w-auto px-9 py-[14px] bg-transparent text-[#1A1600] font-semibold rounded-lg text-lg border-2 border-[#1A1600] hover:bg-[#1A1600] hover:text-white active:scale-95 transition-all duration-300 flex justify-center items-center text-center"
                    >
                        Learn Our Story
                    </a>
                </div>

            </div>
        </section>
    );
}
