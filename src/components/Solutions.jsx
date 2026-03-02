import React from 'react';
import { motion } from 'framer-motion';

const BrandingIcon = () => (
    <motion.svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" style={{ overflow: "visible" }}>
        {/* Floating Base to match other icons */}
        <motion.g animate={{ y: [-4, 4, -4] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>

            {/* Background Layer: Wireframe Geometry (representing logo construction / grids) */}
            <motion.circle cx="45" cy="45" r="22" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none"
                animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
            <motion.circle cx="60" cy="55" r="14" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none"
                animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
            <motion.line x1="23" y1="45" x2="67" y2="45" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <motion.line x1="45" y1="23" x2="45" y2="67" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

            {/* Middle Layer: Frosted Brand Card */}
            <motion.rect x="25" y="32" width="50" height="42" rx="4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="rgba(255,255,255,0.08)" style={{ backdropFilter: "blur(4px)" }}
                animate={{ x: [0, 2, 0], y: [0, -2, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />

            {/* Inner Brand Elements on the Card */}
            <motion.g animate={{ x: [0, 2, 0], y: [0, -2, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                {/* Logo Mark Representation */}
                <motion.rect x="33" y="42" width="12" height="12" rx="3" fill="rgba(255,255,255,0.6)" />
                <motion.circle cx="55" cy="48" r="6" fill="rgba(255,255,255,0.3)" />

                {/* Color Palette Swatches */}
                <motion.rect x="33" y="60" width="8" height="4" rx="2" fill="rgba(180,240,104,0.6)" />
                <motion.rect x="43" y="60" width="8" height="4" rx="2" fill="rgba(255,255,255,0.4)" />
                <motion.rect x="53" y="60" width="8" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
            </motion.g>

            {/* Foreground Hovering Accent (Brand Graphic Element) */}
            <motion.path d="M 68 32 L 78 42 L 68 52 Z" fill="rgba(180,240,104,0.2)" stroke="rgba(180,240,104,0.5)" strokeWidth="1"
                style={{ backdropFilter: "blur(2px)", originX: "73px", originY: "42px" }}
                animate={{ x: [0, -4, 0], y: [0, 4, 0], rotate: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
        </motion.g>
    </motion.svg>
);

const DesignIcon = () => (
    <motion.svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
        {/* Floating UI Layout Planes (Isometric Style via Skew/Rotation) */}
        <motion.g animate={{ y: [-4, 4, -4] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>

            {/* Background Layer: Wireframe */}
            <motion.rect x="30" y="25" width="55" height="45" rx="4" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="rgba(255,255,255,0.02)"
                animate={{ x: [-8, 0, -8], y: [-8, 0, -8] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
            <motion.line x1="30" y1="35" x2="85" y2="35" stroke="rgba(255,255,255,0.1)" strokeWidth="1" animate={{ x: [-8, 0, -8], y: [-8, 0, -8] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />

            {/* Middle Layer: Frosted UI Card */}
            <motion.rect x="20" y="35" width="55" height="45" rx="4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="rgba(255,255,255,0.08)" backdropFilter="blur(4px)"
                animate={{ x: [0, 0, 0], y: [0, 0, 0] }} />

            {/* UI Application Elements inside the Middle Layer */}
            <motion.rect x="25" y="42" width="20" height="4" rx="2" fill="rgba(255,255,255,0.4)" />
            <motion.rect x="25" y="52" width="45" height="20" rx="3" fill="rgba(255,255,255,0.2)" />
            <motion.circle cx="32" cy="74" r="3" fill="rgba(255,255,255,0.5)" />
            <motion.rect x="38" y="72" width="25" height="4" rx="2" fill="rgba(255,255,255,0.3)" />

            {/* Foreground Hovering Cursor / Top Layer */}
            <motion.path d="M 55 60 L 62 78 L 65 68 L 75 70 Z" fill="rgba(255,255,255,0.95)" stroke="rgba(0,0,0,0.5)" strokeWidth="0.5"
                animate={{ x: [0, -10, 0], y: [0, -15, 0], scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path d="M 65 68 L 72 75" stroke="rgba(255,255,255,0.95)" strokeWidth="2.5" strokeLinecap="round"
                animate={{ x: [0, -10, 0], y: [0, -15, 0], scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
        </motion.g>
    </motion.svg>
);

const DevelopmentIcon = () => (
    <motion.svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
        {/* Code Syntax Brackets: < /> */}
        <motion.path d="M 40 30 L 25 50 L 40 70" stroke="rgba(255,255,255,0.25)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
            animate={{ x: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path d="M 60 30 L 75 50 L 60 70" stroke="rgba(255,255,255,0.25)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
            animate={{ x: [0, 6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path d="M 55 25 L 45 75" stroke="rgba(255,255,255,0.15)" strokeWidth="4" strokeLinecap="round"
            animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Central Data / Network Graph */}
        <motion.g>
            <motion.line x1="50" y1="35" x2="65" y2="50" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <motion.line x1="65" y1="50" x2="50" y2="65" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <motion.line x1="50" y1="65" x2="35" y2="50" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <motion.line x1="35" y1="50" x2="50" y2="35" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />

            <motion.circle cx="50" cy="35" r="4" fill="rgba(255,255,255,0.9)" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <motion.circle cx="65" cy="50" r="4" fill="rgba(255,255,255,0.6)" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
            <motion.circle cx="50" cy="65" r="4" fill="rgba(255,255,255,0.9)" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1.0 }} />
            <motion.circle cx="35" cy="50" r="4" fill="rgba(255,255,255,0.6)" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1.5 }} />
            <motion.circle cx="50" cy="50" r="5" fill="rgba(255,255,255,1)" animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
        </motion.g>
    </motion.svg>
);

const solutionsData = [
    {
        id: '1',
        title: 'Branding',
        bgColor: 'bg-[#0f241a]', // Dark Green
        tags: ['Brand identity', 'Positioning', 'Strategy'],
        description: 'We craft comprehensive brand systems that communicate your core values. From logo design to complete visual guidelines.',
        buttonText: 'Branding services',
        icon: <BrandingIcon />,
        topOffset: 'top-32'
    },
    {
        id: '2',
        title: 'Design',
        bgColor: 'bg-[#1b142c]', // Dark Purple
        tags: ['Web Design', 'UI/UX', 'Art Direction'],
        description: 'Immersive websites and applications built on robust technologies. We blend high-end motion design with intuitive UX.',
        buttonText: 'Design services',
        icon: <DesignIcon />,
        topOffset: 'top-40'
    },
    {
        id: '3',
        title: 'Development',
        bgColor: 'bg-[#0f192b]', // Dark Blue
        tags: ['Frontend', 'Backend', 'Web3', 'Creative Coding'],
        description: 'Robust engineering and creative coding. We map out user journeys, content strategies, and market positioning to ensure our designs drive measurable success.',
        buttonText: 'Development services',
        icon: <DevelopmentIcon />,
        topOffset: 'top-48'
    }
];

export default function Solutions() {
    return (
        <section className="w-full bg-[#121212] py-20 lg:py-32 overflow-visible relative">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col gap-12 lg:gap-20">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 w-full">
                    <div className="flex flex-col items-start gap-5">
                        <span className="bg-[#1a1a1a] text-[#a0a0a0] px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-widest uppercase border border-white/5">
                            OUR SOLUTIONS
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold leading-[1.05] tracking-tighter text-white m-0 max-w-[800px]">
                            Transforming ideas into reality
                        </h2>
                    </div>

                    <button className="bg-white text-black px-7 py-3 rounded-[12px] text-sm font-[600] tracking-[-0.2px] hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(255,255,255,0.15)] transition-all duration-300 whitespace-nowrap">
                        Our services
                    </button>
                </div>

                {/* Stacking Cards Container */}
                {/* CRITICAL: NO overflow-hidden here, otherwise sticky fails */}
                <div className="relative w-full flex flex-col gap-6 md:gap-8 pb-32">
                    {solutionsData.map((card, index) => (
                        <div
                            key={card.id}
                            className={`sticky ${card.topOffset} w-full ${card.bgColor} rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row shadow-2xl border border-white/5 transition-transform duration-500`}
                        // We can use native tailwind top- classes for mobile and calc for desktop if needed, 
                        // but for simplicity the topOffset class provides the stacking offsets.
                        >
                            {/* Content Side (Top on mobile, Left on desktop) */}
                            <div className="w-full lg:w-[60%] flex flex-col justify-between z-10 min-h-[auto] lg:min-h-[400px]">
                                <div className="flex flex-col gap-6 md:gap-8">
                                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white">
                                        {card.title}
                                    </h3>

                                    <div className="flex flex-wrap gap-2 md:gap-3">
                                        {card.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="rounded-full border border-white/20 px-4 py-1.5 text-xs md:text-sm font-medium text-white/90 bg-white/5 backdrop-blur-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <p className="text-[#a0a0a0] lg:text-white/80 text-sm md:text-xl font-medium leading-[1.6] lg:leading-relaxed max-w-[100%] lg:max-w-[90%]">
                                        {card.description}
                                    </p>
                                </div>

                                <div className="mt-8 lg:mt-0 lg:absolute lg:bottom-16">
                                    <button className="bg-[#b4f068] text-[#0a0a0a] px-6 py-2.5 rounded-[12px] font-semibold tracking-wide text-sm hover:bg-[#a0dc54] transition-colors w-max shadow-[0_4px_14px_rgba(180,240,104,0.15)]">
                                        {card.buttonText}
                                    </button>
                                </div>
                            </div>

                            {/* Massive Decorative Icon Side (Bottom on mobile, Right on desktop) */}
                            <div className="w-full lg:w-[40%] flex justify-center lg:justify-end items-center mt-16 md:mt-24 lg:mt-0 relative overflow-visible lg:overflow-hidden min-h-[250px] lg:min-h-[auto] z-0">
                                {/* Mobile pushes SVG into the visible flow; Desktop floats it absolute on right edge */}
                                <div className="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] relative lg:absolute lg:right-[-15%] xl:right-[-10%] opacity-90 lg:opacity-50 transform group-hover:scale-105 transition-transform duration-700">
                                    {card.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
