import { useEffect, useRef, useState } from 'react';

export const AnimatedCursor = () => {
  const [hasMouse, setHasMouse] = useState(false);
  const containerRef = useRef(null);

  const fullText = "KRISHKUMAR // F1 RACING • ";
  const textIndex = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const particles = useRef([]);
  const dotRef = useRef(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;
    setHasMouse(true);

    let animationFrameId;
    let mouseX = -100;
    let mouseY = -100;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const dx = mouseX - lastPos.current.x;
      const dy = mouseY - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Snappy telemetry trail
      if (dist > 12) {
        const char = fullText[textIndex.current % fullText.length];
        textIndex.current += 1;

        if (char.trim()) {
          const particle = {
            char,
            x: mouseX,
            y: mouseY,
            vx: (Math.random() - 0.5) * 0.8,
            vy: -0.8 - Math.random() * 0.5,
            opacity: 1,
            scale: 1,
            rotation: (Math.random() - 0.5) * 10,
            life: 0,
            maxLife: 48
          };
          particles.current.push(particle);
          if (particles.current.length > 45) {
            particles.current.shift();
          }
        }

        lastPos.current = { x: mouseX, y: mouseY };
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const loop = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      const container = containerRef.current;
      if (container) {
        container.innerHTML = '';

        for (let i = particles.current.length - 1; i >= 0; i--) {
          const p = particles.current[i];
          p.life += 1;
          p.x += p.vx;
          p.y += p.vy;
          
          const progress = p.life / p.maxLife;
          if (progress < 0.4) {
            p.opacity = 1;
          } else {
            p.opacity = Math.max(0, 1 - (progress - 0.4) / 0.6);
          }

          p.scale = Math.max(0.8, 1 - progress * 0.2);

          if (p.life >= p.maxLife) {
            particles.current.splice(i, 1);
            continue;
          }

          const span = document.createElement('span');
          span.innerText = p.char;
          span.style.position = 'absolute';
          span.style.left = '0px';
          span.style.top = '0px';
          span.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rotation}deg) scale(${p.scale})`;
          span.style.color = '#f4f1ea';
          span.style.fontSize = '13px';
          span.style.fontWeight = '800';
          span.style.fontFamily = "'JetBrains Mono', monospace";
          span.style.textShadow = '0 2px 6px rgba(0, 0, 0, 0.9)';
          span.style.opacity = p.opacity;
          span.style.pointerEvents = 'none';
          span.style.userSelect = 'none';
          span.style.willChange = 'transform, opacity';
          container.appendChild(span);
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [fullText]);

  if (!hasMouse) return null;

  return (
    <>
      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 99998,
          overflow: 'hidden'
        }}
      />

      {/* Racing Red Precision Telemetry Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: -3,
          left: -3,
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: '#e10600',
          boxShadow: '0 0 8px #e10600, 0 2px 6px rgba(0, 0, 0, 0.8)',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform'
        }}
      />
    </>
  );
};
