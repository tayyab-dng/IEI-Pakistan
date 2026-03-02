import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const words = ['STUDIOS', 'PRODUCTS', 'EXPERIENCE', 'BRANDS']; // Cloned first word for seamless loop

export default function TextFlipper() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const targets = gsap.utils.toArray('.flipper-word');

            // Initialize state: push all elements out of view (bottom)
            // Use 150% to ensure no part of the waiting letters bleed in
            gsap.set(targets, { yPercent: 150 });

            // Build a seamless looping timeline
            const tl = gsap.timeline({ repeat: -1 });

            targets.forEach((word, index) => {
                // We only animate the entry/exit for words up to the last one
                // The last word (cloned) will essentially "be" the first word on reset
                if (index === targets.length - 1) return;

                tl.to(word, {
                    yPercent: 0,
                    duration: 1.2, // Elegant, slow transition
                    ease: 'expo.inOut',
                }, index === 0 ? 0 : '-=1.2') // First word starts at 0, others overlap
                    .to({}, { duration: 2.0 }) // Hold duration
                    .to(word, {
                        yPercent: -150,
                        duration: 1.2,
                        ease: 'expo.inOut',
                    })
                    .to(targets[index + 1], {
                        yPercent: 0,
                        duration: 1.2,
                        ease: 'expo.inOut',
                    }, '<'); // Synchronous unison movement
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <span className="inline-flex items-baseline overflow-visible whitespace-nowrap">
            {/* 
        Enforce a strict h-[1.1em] and leading-none to create a perfect letterbox mask.
        Padding/Margin adjust to prevent descender clipping or layout shifts.
      */}
            <span
                ref={containerRef}
                className="inline-grid [grid-template-areas:'stack'] overflow-hidden text-accent h-[1.1em] leading-none align-baseline pb-2 mb-[-8px] whitespace-nowrap"
            >
                {words.map((word, i) => (
                    <span
                        key={i}
                        className="flipper-word [grid-area:stack] inline-block font-bold whitespace-nowrap"
                    >
                        {word}
                    </span>
                ))}
            </span>
        </span>
    );
}
