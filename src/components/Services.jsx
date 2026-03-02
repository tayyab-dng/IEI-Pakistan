import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollTrigger from 'gsap/ScrollTrigger';

const services = [
    {
        id: '01',
        title: 'Brand Identity',
        description: 'We craft comprehensive brand systems that communicate your core values. From logo design to complete visual guidelines, we ensure your brand resonates with authority and elegance.'
    },
    {
        id: '02',
        title: 'Digital Experience',
        description: 'Immersive websites and applications built on robust technologies. We blend high-end motion design with intuitive UX to create platforms that captivate and convert.'
    },
    {
        id: '03',
        title: 'Art Direction',
        description: 'Guiding the visual narrative of your project. Our art direction encompasses photography, 3D motion, and illustration to establish a unique and cohesive aesthetic.'
    },
    {
        id: '04',
        title: 'Creative Strategy',
        description: 'Aligning business goals with creative execution. We map out user journeys, content strategies, and market positioning to ensure our designs drive measurable success.'
    }
];

export default function Services() {
    const [activeId, setActiveId] = useState('01'); // First one open by default

    const toggleAccordion = (id) => {
        setActiveId(prev => prev === id ? null : id);
    };

    useEffect(() => {
        // Whenever the activeId changes and the DOM paints the new height, we must refresh ScrollTrigger 
        // so any sections below this (like FeaturedProjects or Footer) adjust their trigger points.
        ScrollTrigger.refresh();
    }, [activeId]);

    return (
        <section className="w-full py-section px-4 md:px-8 lg:px-12 bg-primary-bg">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left column content if needed, or simply title */}
                <div className="lg:col-span-4 flex flex-col justify-start">
                    <h2 className="text-h2 font-bold uppercase tracking-tighter sticky top-32">Capabilities</h2>
                    <p className="text-body-lg text-muted mt-6 max-w-sm">
                        Our multi-disciplinary team delivers end-to-end solutions tailored to elite standards.
                    </p>
                </div>

                {/* Right column Accordion */}
                <div className="lg:col-span-8 flex flex-col w-full border-t border-border">
                    {services.map((service) => {
                        const isActive = activeId === service.id;

                        return (
                            <div
                                key={service.id}
                                className="w-full flex border-b border-border group"
                            >
                                <div
                                    className="w-full py-6 md:py-8 cursor-pointer flex flex-col transition-colors duration-300"
                                    onClick={() => toggleAccordion(service.id)}
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className={`text-h2 md:text-5xl font-medium tracking-tight uppercase transition-colors duration-500 ${isActive ? 'text-primary-fg' : 'text-primary-fg/40 group-hover:text-primary-fg/70'}`}>
                                            <span className="text-body text-muted mr-4 inline-block -translate-y-4">{service.id}</span>
                                            {service.title}
                                        </h3>
                                        <div className="ml-4 transform transition-transform duration-500">
                                            {isActive ? (
                                                <span className="text-accent text-3xl">-</span>
                                            ) : (
                                                <span className="text-muted text-3xl group-hover:text-primary-fg">+</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Framer Motion Height Animation */}
                                    <AnimatePresence initial={false}>
                                        {isActive && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-6 pb-2 pl-0 md:pl-[3.5rem] pr-4 max-w-2xl">
                                                    <p className="text-body-lg text-primary-fg/80 leading-relaxed">
                                                        {service.description}
                                                    </p>
                                                    <button className="mt-8 text-meta uppercase tracking-widest text-accent border-b border-accent pb-1 hover:text-white hover:border-white transition-colors">
                                                        Explore Service
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
