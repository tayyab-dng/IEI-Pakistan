import React, { useEffect, useRef } from 'react';

export default function HeroCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let animationFrameId;
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            // Responsive density: ~100-150 on desktop
            const density = Math.floor((window.innerWidth * window.innerHeight) / 10000);
            const numParticles = Math.min(Math.max(density, 80), 200);

            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2 + 1, // 1px to 3px
                    opacity: Math.random() * 0.4 + 0.2, // 0.2 to 0.6
                    vy: (Math.random() * -1.5) - 0.5, // -0.5 to -2.0 (faster upward movement)
                    vx: (Math.random() * 0.6) - 0.3 // -0.3 to 0.3 (more horizontal sway)
                });
            }
        };

        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                ctx.fill();

                // Update position
                p.x += p.vx;
                p.y += p.vy;

                // Recycle if it goes off top
                if (p.y + p.radius < 0) {
                    p.y = canvas.height + p.radius;
                    p.x = Math.random() * canvas.width;
                }
                // Wrap horizontally
                if (p.x > canvas.width + p.radius) p.x = -p.radius;
                if (p.x < -p.radius) p.x = canvas.width + p.radius;
            });

            animationFrameId = requestAnimationFrame(drawParticles);
        };

        // Initialize
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        drawParticles();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-[-1] pointer-events-none"
        />
    );
}
