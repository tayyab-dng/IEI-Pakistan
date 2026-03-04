import React, { useEffect, useRef } from 'react';

const InteractiveLinesBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let animationFrameId;
        let width = window.innerWidth;
        let height = window.innerHeight;

        // Configuration
        const lineSpacing = 14; // Fixed spacing prevents crowding on mobile, denser relative spacing elsewhere
        const edgePadding = 300; // Extra width on left/right to prevent empty spaces during motion
        const segments = 80;   // Higher resolution for smoother curves
        const lineColor = 'rgba(255, 255, 255, 0.4)'; // Increased opacity for better visibility
        const interactionRadius = 250; // Larger area of effect

        // Physics constants
        const spring = 0.04; // Slightly looser spring for flowy feel
        const friction = 0.85; // Damping

        // Mouse tracking
        let mouseX = -1000;
        let mouseY = -1000;
        let prevMouseX = -1000;
        let mouseVelocityX = 0;

        let points = [];

        const initPoints = () => {
            points = [];
            // Calculate dynamic line count based on viewport. Starts outside the screen to fix empty space bug.
            const startX = -edgePadding;
            const endX = width + edgePadding;
            const totalWidth = endX - startX;
            const dynamicLineCount = Math.ceil(totalWidth / lineSpacing);
            const yStep = height / segments;

            for (let i = 0; i <= dynamicLineCount; i++) {
                const line = [];
                const basePathX = startX + (i * lineSpacing);
                for (let j = 0; j <= segments; j++) {
                    line.push({
                        x: basePathX, // current animated position
                        y: j * yStep, // y is fixed
                        baseX: basePathX, // original anchor
                        vx: 0 // horizontal velocity
                    });
                }
                points.push(line);
            }
        };

        const resize = () => {
            if (canvas.parentElement) {
                width = canvas.parentElement.offsetWidth;
                height = canvas.parentElement.offsetHeight;
            } else {
                width = window.innerWidth;
                height = window.innerHeight;
            }

            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);

            initPoints();
        };

        resize();
        window.addEventListener('resize', resize);
        const resizeObserver = new ResizeObserver(() => resize());
        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement);
        }

        const updateMousePosition = (e) => {
            const rect = canvas.getBoundingClientRect();
            if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
                prevMouseX = mouseX;
                mouseX = e.clientX - rect.left;
                mouseY = e.clientY - rect.top;

                if (prevMouseX !== -1000) {
                    // Capture velocity for directional bending (clamp to prevent explosion)
                    let velX = mouseX - prevMouseX;
                    if (velX > 100) velX = 100;
                    if (velX < -100) velX = -100;
                    mouseVelocityX = velX;
                }
            } else {
                mouseX = -1000;
                mouseY = -1000;
                mouseVelocityX = 0;
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseout', () => {
            mouseX = -1000;
            mouseY = -1000;
            mouseVelocityX = 0;
        });

        let time = 0;

        const render = () => {
            time += 0.003; // Base autonomous animation speed

            ctx.clearRect(0, 0, width, height);
            ctx.lineWidth = 1; // Thinner lines fit better when dense
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.strokeStyle = lineColor;

            ctx.beginPath();

            for (let i = 0; i < points.length; i++) {
                const line = points[i];

                // Draw each path as a continuous line
                for (let j = 0; j < line.length; j++) {
                    const p = line[j];

                    // 1. Topographical Wave Math
                    // Create fluid, organic curves that look like woodgrain or contour lines
                    const wave1 = Math.sin(p.y * 0.004 + time * 0.8 + i * 0.06) * 45;
                    const wave2 = Math.sin(p.y * 0.007 - time * 0.5 + i * 0.04) * 25;
                    const wave3 = Math.cos(p.y * 0.002 + time * 1.2 + Math.sin(i * 0.05)) * 30;

                    const targetX = p.baseX + wave1 + wave2 + wave3;

                    // 2. Mouse Interaction: Velocity-based impulse
                    if (mouseX !== -1000) {
                        const dx = p.x - mouseX;
                        const dy = p.y - mouseY;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist < interactionRadius) {
                            // Points close to mouse get pushed in the direction of mouse movement
                            const influence = Math.pow(1 - (dist / interactionRadius), 2);
                            p.vx += mouseVelocityX * influence * 0.35; // Push strength multiplier
                        }
                    }

                    // 3. Spring Physics Integration
                    const force = (targetX - p.x) * spring;
                    p.vx = (p.vx + force) * friction;
                    p.x += p.vx;

                    // 4. Trace the line
                    if (j === 0) {
                        ctx.moveTo(p.x, p.y);
                    } else {
                        ctx.lineTo(p.x, p.y);
                    }
                }
            }

            ctx.stroke();

            // Decay velocity so we don't keep pushing forever when mouse STOPS moving
            mouseVelocityX *= 0.6;

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            if (canvas.parentElement) {
                resizeObserver.disconnect();
            }
            window.removeEventListener('mousemove', updateMousePosition);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-[0] opacity-100"
            style={{ display: 'block' }}
        />
    );
};

export default InteractiveLinesBackground;
