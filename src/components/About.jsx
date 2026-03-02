import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import MagneticFillButton from './MagneticFillButton';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const containerRef = useRef(null);

    useGSAP(() => {
        const textElements = gsap.utils.toArray('.about-text-element');

        gsap.fromTo(textElements,
            { opacity: 0.2 },
            {
                opacity: 1,
                stagger: 0.1,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    end: 'bottom 50%',
                    scrub: true,
                }
            }
        );

        // Flashlight Grid Mouse Tracking
        // quickSetter is highly performant for constant stream of values
        const xSetter = gsap.quickSetter(containerRef.current, '--x', 'px');
        const ySetter = gsap.quickSetter(containerRef.current, '--y', 'px');

        const handleMouseMove = (e) => {
            const rect = containerRef.current.getBoundingClientRect();
            // Calculate mouse position relative to the container
            xSetter(e.clientX - rect.left);
            ySetter(e.clientY - rect.top);
        };

        const maskLayer = containerRef.current.querySelector('.flashlight-mask');
        const handleMouseEnter = () => {
            gsap.to(maskLayer, { opacity: 0.8, duration: 0.5, ease: "power2.out", overwrite: "auto" });
        };
        const handleMouseLeave = () => {
            gsap.to(maskLayer, { opacity: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" });
        };

        const currentRef = containerRef.current;
        currentRef.addEventListener('mousemove', handleMouseMove);
        currentRef.addEventListener('mouseenter', handleMouseEnter);
        currentRef.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            currentRef.removeEventListener('mousemove', handleMouseMove);
            currentRef.removeEventListener('mouseenter', handleMouseEnter);
            currentRef.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full min-h-screen py-24 bg-[#0a0a0a] flex flex-col justify-center items-center overflow-hidden" style={{ '--x': '50%', '--y': '50%' }}>

            {/* Flashlight CSS Mask Pattern Layer */}
            <div
                className="flashlight-mask absolute inset-0 z-[0] pointer-events-none opacity-0 mix-blend-screen"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.8) 1px, transparent 0)',
                    backgroundSize: '32px 32px',
                    maskImage: 'radial-gradient(circle at var(--x) var(--y), rgba(0,0,0,1), transparent 25vw)',
                    WebkitMaskImage: 'radial-gradient(circle at var(--x) var(--y), rgba(0,0,0,1), transparent 25vw)',
                }}
            ></div>

            <div className="relative w-full max-w-[90vw] xl:max-w-[1100px] mx-auto flex flex-col items-start justify-center z-10 px-4 md:px-0">
                {/* Reference style 4-Shape Logo */}
                <div className="w-[84px] h-[84px] md:w-14 md:h-14 mb-8 md:mb-10 grid grid-cols-2 gap-[4px] md:gap-[4px] about-text-element">
                    <div className="bg-white w-full h-full rounded-tl-xl md:rounded-tl-xl rounded-tr-md md:rounded-tr-sm rounded-bl-md md:rounded-bl-sm rounded-br-md md:rounded-br-sm"></div>
                    <div className="bg-white w-full h-full rounded-full"></div>
                    <div className="bg-white w-full h-full rounded-full"></div>
                    <div className="bg-white w-full h-full rounded-br-xl md:rounded-br-xl rounded-tl-md md:rounded-tl-sm rounded-tr-md md:rounded-tr-sm rounded-bl-md md:rounded-bl-sm"></div>
                </div>

                <div className="font-display text-[8vw] xs:text-[3rem] sm:text-[3.5rem] md:text-[clamp(1.8rem,3.8vw,4.5rem)] font-medium leading-[1.0] md:leading-[1.05] tracking-[-0.04em] md:tracking-tight text-white/40 space-y-8 md:space-y-8 w-full">
                    <p className="about-text-element">
                        {/* Desktop View */}
                        <span className="hidden md:inline">
                            We're a <span className="text-white font-semibold opacity-100 tracking-[-0.05em]">digital design studio</span><br />
                            founded by tech passionate<br />
                            enthusiasts.
                        </span>
                        {/* Mobile View */}
                        <span className="md:hidden">
                            We're a <span className="text-white font-semibold opacity-100 tracking-[-0.06em]">digital</span><br />
                            <span className="text-white font-semibold opacity-100 tracking-[-0.06em]">design studio</span><br />
                            founded by tech<br />
                            passionate<br />
                            enthusiasts.
                        </span>
                    </p>
                    <p className="about-text-element">
                        {/* Desktop View */}
                        <span className="hidden md:inline">
                            We create <span className="text-white font-semibold opacity-100 tracking-[-0.05em]">memorable websites,</span><br />
                            <span className="text-white font-semibold opacity-100 tracking-[-0.05em]">user interfaces</span> and <span className="text-white font-semibold opacity-100 tracking-[-0.05em]">mobile apps</span><br />
                            that <span className="text-white font-semibold opacity-100 tracking-[-0.05em]">redefine</span> how people <span className="text-white font-semibold opacity-100 tracking-[-0.05em]">connect</span><br />
                            with the <span className="text-white font-semibold opacity-100 tracking-[-0.05em]">digital world.</span>
                        </span>
                        {/* Mobile View */}
                        <span className="md:hidden">
                            We create<br />
                            <span className="text-white font-semibold opacity-100 tracking-[-0.06em]">memorable</span><br />
                            <span className="text-white font-semibold opacity-100 tracking-[-0.06em]">websites, user</span><br />
                            <span className="text-white font-semibold opacity-100 tracking-[-0.06em]">interfaces</span> and<br />
                            <span className="text-white font-semibold opacity-100 tracking-[-0.06em]">mobile apps</span> that<br />
                            <span className="text-white font-semibold opacity-100 tracking-[-0.06em]">redefine</span> how<br />
                            people <span className="text-white font-semibold opacity-100 tracking-[-0.06em]">connect</span><br />
                            with the <span className="text-white font-semibold opacity-100 tracking-[-0.06em]">digital</span><br />
                            <span className="text-white font-semibold opacity-100 tracking-[-0.06em]">world.</span>
                        </span>
                    </p>
                </div>

                <div className="mt-10 md:mt-14 flex flex-wrap gap-4 justify-start about-text-element">
                    <button className="px-6 py-3 md:px-8 md:py-4 bg-white text-black font-semibold rounded-xl text-[clamp(1rem,1.2vw,1.125rem)] hover:bg-gray-200 transition-colors pointer-events-auto">
                        Get in touch
                    </button>
                    <button className="px-6 py-3 md:px-8 md:py-4 bg-[#2A2A2A] text-white font-semibold rounded-xl text-[clamp(1rem,1.2vw,1.125rem)] hover:bg-[#3A3A3A] transition-colors pointer-events-auto border border-white/10">
                        More about us
                    </button>
                </div>
            </div>
        </section>
    );
}
