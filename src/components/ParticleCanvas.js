import React, { useEffect, useRef } from 'react';
import { useWindowSize } from '../hooks/useWindowSize';

// 1. Theme-Aware Particle Canvas (OPTIMIZED)
export const ParticleCanvas = ({ theme }) => {
  const canvasRef = useRef(null);
  const { width, height } = useWindowSize();
  const isVisibleRef = useRef(true); // Track visibility without triggering re-renders
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Performance Optimization: Stop animation when canvas is not in viewport
    const observer = new IntersectionObserver(([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
    });
    observer.observe(canvas);

    const ctx = canvas.getContext('2d');
    
    canvas.width = width;
    canvas.height = height;

    // --- CONFIGURATION BASED ON THEME ---
    let particleCount = width < 768 ? 40 : 80;
    let particleColor, lineColor;
    let type = 'truss'; // 'truss', 'bubbles', 'spores', 'petals', 'stars'

    switch (theme) {
      case 'dark':
        particleColor = 'rgba(45, 212, 191, 0.4)'; // Teal
        lineColor = 'rgba(45, 212, 191, 0.1)';
        type = 'truss';
        break;
      case 'light':
        particleColor = 'rgba(87, 83, 78, 0.3)'; // Stone Grey
        lineColor = 'rgba(87, 83, 78, 0.1)';
        type = 'truss';
        break;
      case 'midnight':
        particleColor = 'rgba(139, 92, 246, 0.4)';
        lineColor = 'rgba(139, 92, 246, 0.1)';
        type = 'stars';
        break;
      case 'rain':
        particleColor = 'rgba(226, 246, 255, 0.55)';
        lineColor = 'rgba(148, 197, 210, 0.18)';
        type = 'glassdrops';
        particleCount = width < 768 ? 90 : 160;
        break;
      case 'spring':
        particleColor = 'rgba(244, 114, 182, 0.6)'; // Pink Petals
        lineColor = 'rgba(255, 255, 255, 0)';
        type = 'petals';
        particleCount = 60;
        break;
      case 'nature':
        particleColor = 'rgba(234, 179, 8, 0.4)'; 
        lineColor = 'rgba(255, 255, 255, 0)'; 
        type = 'spores';
        break;
      case 'musgravite':
        particleColor = 'rgba(216, 180, 254, 0.3)';
        lineColor = 'rgba(216, 180, 254, 0.05)';
        type = 'truss';
        break;
      case 'ruby':
        particleColor = 'rgba(251, 113, 133, 0.4)';
        lineColor = 'rgba(251, 113, 133, 0.1)';
        type = 'truss';
        break;
      case 'emerald':
        particleColor = 'rgba(52, 211, 153, 0.4)';
        lineColor = 'rgba(52, 211, 153, 0.1)';
        type = 'truss';
        break;
      default:
        particleColor = 'rgba(255, 255, 255, 0.2)';
        lineColor = 'rgba(255, 255, 255, 0.05)';
    }

    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: type === 'glassdrops' ? (Math.random() < 0.08 ? Math.random() * 0.45 + 0.12 : 0)
            : (type === 'bubbles' || type === 'spores') ? -(Math.random() * 0.5 + 0.1)
            : (type === 'petals' ? (Math.random() * 0.5 + 0.2) : (Math.random() - 0.5) * 0.15),
        size: type === 'glassdrops' ? (Math.random() ** 2) * 7 + 1.2
            : (type === 'bubbles') ? Math.random() * 4 + 1 : (Math.random() * 2 + 1.5),
        kind: type === 'glassdrops' ? (Math.random() < 0.03 ? 'run' : 'bead') : 'dot',
        sway: Math.random() * 0.02
      });
    }

    let animationFrameId;

    const animate = () => {
      // Optimization Check: Pause if not visible
      if (!isVisibleRef.current) {
          animationFrameId = requestAnimationFrame(animate);
          return;
      }

      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((p, i) => {
        // Movement Logic
        if (type === 'petals') {
            p.x += Math.sin(p.y * 0.01) + p.vx;
            p.y += p.vy;
        } else if (type === 'glassdrops') {
            if (p.kind === 'run') {
              p.y += p.vy;
              p.x += Math.sin(p.y * 0.02) * 0.15;
            }
        } else {
            p.x += p.vx;
            p.y += p.vy;
        }

        // Wrap around
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Drawing Logic
        if (type === 'glassdrops') {
             const r = p.size;
             const grd = ctx.createRadialGradient(p.x - r * 0.3, p.y - r * 0.35, 0.2, p.x, p.y, r);
             grd.addColorStop(0, 'rgba(255,255,255,0.85)');
             grd.addColorStop(0.35, 'rgba(210,236,245,0.35)');
             grd.addColorStop(1, 'rgba(80,130,150,0.18)');
             ctx.beginPath();
             ctx.ellipse(p.x, p.y, r * 0.85, r, 0, 0, Math.PI * 2);
             ctx.fillStyle = grd;
             ctx.fill();
             ctx.beginPath();
             ctx.ellipse(p.x - r * 0.28, p.y - r * 0.32, r * 0.22, r * 0.16, -0.5, 0, Math.PI * 2);
             ctx.fillStyle = 'rgba(255,255,255,0.7)';
             ctx.fill();
             if (p.kind === 'run') {
               ctx.beginPath();
               ctx.strokeStyle = 'rgba(180,220,230,0.35)';
               ctx.lineWidth = Math.max(1, r * 0.25);
               ctx.moveTo(p.x, p.y);
               ctx.lineTo(p.x, p.y + r * 6);
               ctx.stroke();
             }
        } else if (type === 'spores' || type === 'stars') {
             ctx.beginPath();
             ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
             ctx.fillStyle = particleColor;
             ctx.fill();
        } else if (type === 'petals') {
             ctx.beginPath();
             ctx.ellipse(p.x, p.y, p.size, p.size * 0.6, p.sway * 10, 0, Math.PI * 2);
             ctx.fillStyle = particleColor;
             ctx.fill();
        } else {
             // TRUSS SYSTEMS
             ctx.beginPath();
             ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
             ctx.fillStyle = particleColor;
             ctx.fill();

             // Draw Lines only for Trusses
             if (type === 'truss') {
                 for (let j = i + 1; j < particles.length; j++) {
                   const p2 = particles[j];
                   const dx = p.x - p2.x;
                   const dy = p.y - p2.y;
                   const dist = Math.sqrt(dx*dx + dy*dy);

                   if (dist < 180) {
                     ctx.beginPath();
                     ctx.strokeStyle = lineColor;
                     ctx.lineWidth = 1;
                     ctx.moveTo(p.x, p.y);
                     ctx.lineTo(p2.x, p2.y);
                     ctx.stroke();
                   }
                 }
             }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
        cancelAnimationFrame(animationFrameId);
        observer.disconnect();
    };
  }, [width, height, theme]);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-100" />;
};
