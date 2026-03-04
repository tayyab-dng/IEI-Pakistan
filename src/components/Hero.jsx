import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import MagneticFillButton from './MagneticFillButton';

const slides = [
    {
        image: '/images/hero/slide-1.webp',
        overline: 'INNOVATE EDUCATE & INSPIRE PAKISTAN',
        headline: 'Pledging Wings\nFor Our Children',
        subhead: 'Empowering the next generation through quality education',
        panX: 3, panY: 0
    },
    {
        image: '/images/hero/slide-2.webp',
        overline: 'INNOVATE EDUCATE & INSPIRE PAKISTAN',
        headline: 'Reaching Remote\nMountains',
        subhead: 'Bringing education to the most isolated communities in Gilgit-Baltistan',
        panX: -3, panY: 0
    },
    {
        image: '/images/hero/slide-3.webp',
        overline: 'INNOVATE EDUCATE & INSPIRE PAKISTAN',
        headline: 'Building Bridges\nThrough Education',
        subhead: 'Volunteers from across Pakistan creating lasting impact together',
        panX: 0, panY: -3
    },
    {
        image: '/images/hero/slide-4.webp',
        overline: 'INNOVATE EDUCATE & INSPIRE PAKISTAN',
        headline: 'Empowering Local\nCommunities',
        subhead: 'Supporting families and preserving culture through education',
        panX: 0, panY: 0
    },
    {
        image: '/images/hero/slide-5.webp',
        overline: 'INNOVATE EDUCATE & INSPIRE PAKISTAN',
        headline: 'Creating Lasting\nChange',
        subhead: 'Where volunteers, educators, and communities unite for progress',
        panX: 0, panY: 3
    }
];

export default function Hero() {
    const heroRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [textSlide, setTextSlide] = useState(0);
    const timerRef = useRef(null);

    const startTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCurrentSlide(prev => {
                const next = (prev + 1) % slides.length;
                fadeTextOutThenChange(next);
                return next;
            });
        }, 6000);
    };

    const fadeTextOutThenChange = (nextIndex) => {
        gsap.to('.hero-anim-target', {
            y: -30,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                setTextSlide(nextIndex);
            }
        });
    };

    const goToSlide = (index) => {
        if (index === currentSlide) return;
        setCurrentSlide(index);
        fadeTextOutThenChange(index);
        startTimer(); // Reset the timer so it doesn't auto-switch too soon
    };

    // Initialization and auto-play
    useEffect(() => {
        startTimer();

        // Scroll indicator continuous loop
        gsap.to('.scroll-dot', {
            y: 24,
            opacity: 0,
            duration: 1.5,
            repeat: -1,
            ease: 'power2.inOut',
        });

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    // Text incoming animation (runs whenever textSlide changes)
    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.set('.hero-anim-target', { clearProps: 'all' }); // reset fade-out styles

            gsap.set('.hero-overline', { y: 30, opacity: 0 });
            gsap.set('.hero-headline', { y: 30, opacity: 0 });
            gsap.set('.hero-subhead-anim', { y: 30, opacity: 0 });
            gsap.set('.hero-buttons-anim', { y: 30, opacity: 0 });

            const tl = gsap.timeline();
            tl.to('.hero-overline', { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0)
                .to('.hero-headline', { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }, 0.2)
                .to('.hero-subhead-anim', { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }, 0.4)
                .to('.hero-buttons-anim', { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.6);
        }, heroRef);

        return () => ctx.revert();
    }, [textSlide]);

    // Ken Burns background effect
    useEffect(() => {
        const imgs = document.querySelectorAll('.hero-bg-image');
        imgs.forEach((img, i) => {
            if (i === currentSlide) {
                const slide = slides[i];
                gsap.fromTo(img,
                    { scale: 1, xPercent: 0, yPercent: 0 },
                    {
                        scale: 1.1,
                        xPercent: slide.panX,
                        yPercent: slide.panY,
                        duration: 7.5, // 6s view + 1.5s crossfade
                        ease: "none"
                    }
                );
            }
        });
    }, [currentSlide]);

    return (
        <section ref={heroRef} className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden z-0 bg-black">

            {/* Background Image Slideshow */}
            <div className="absolute inset-0 z-0">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                        <img
                            src={slide.image}
                            alt={`Slide ${index + 1}`}
                            className="hero-bg-image w-full h-full object-cover"
                        />
                    </div>
                ))}
                {/* Dark Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 z-20 pointer-events-none"></div>
            </div>

            <div className="relative z-30 max-w-[1440px] mx-auto w-full px-4 md:px-8 lg:px-12 pt-20">
                <div className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">

                    <p className="hero-anim-target hero-overline text-sm md:text-base text-gray-300 uppercase tracking-widest font-medium drop-shadow-md">
                        {slides[textSlide].overline}
                    </p>

                    <h1 className="hero-anim-target hero-headline text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.0] md:leading-[1.0] tracking-tighter uppercase text-white drop-shadow-lg">
                        {slides[textSlide].headline.split('\n').map((line, i) => (
                            <div key={i} className="overflow-hidden pb-1">
                                <div>{line}</div>
                            </div>
                        ))}
                    </h1>

                    <p className="hero-anim-target hero-subhead-anim text-xl md:text-2xl text-gray-300 max-w-2xl mt-4 leading-relaxed mx-auto drop-shadow-md">
                        {slides[textSlide].subhead}
                    </p>

                    <div className="hero-anim-target hero-buttons-anim flex flex-col sm:flex-row gap-4 mt-8">
                        <MagneticFillButton
                            href="/donate"
                            className="bg-gradient-to-r from-[#ffcc00] to-[#ffcc00] border-none text-black font-semibold shadow-lg"
                            fillColor="bg-[#ffcc00]"
                        >
                            Donate Now
                        </MagneticFillButton>
                        <MagneticFillButton
                            href="/join"
                            className="bg-black/30 backdrop-blur-sm border border-gray-300 text-white hover:border-[#ffcc00] font-medium shadow-lg"
                            fillColor="bg-[#ffcc00]"
                        >
                            Join Our Work
                        </MagneticFillButton>
                    </div>
                </div>
            </div>

            {/* Slide Navigation Dots */}
            <div className="absolute bottom-24 lg:bottom-32 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide
                                ? 'w-8 bg-[#ffcc00]'
                                : 'w-2 bg-white/40 hover:bg-white/70'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Scroll Indicator */}
            <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-white/60 gap-3 z-30">
                <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium">Scroll</span>
                <div className="w-[1px] h-8 bg-white/20 relative overflow-hidden">
                    <div className="scroll-dot w-[3px] h-[3px] bg-white rounded-full absolute top-0 -left-[1px]"></div>
                </div>
            </div>
        </section>
    );
}
