import { useEffect, useRef } from 'react';

/**
 * A three-layer luxury cursor: a solid gold dot, a trailing ring, and a
 * large soft glow that follows the pointer. Grows on interactive elements.
 * Disabled on touch devices via CSS (.ac-cursor display:none on coarse).
 */
export function LuxuryCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on fine pointers
    if (window.matchMedia('(pointer: coarse)').matches) return;
    document.documentElement.classList.add('luxury-cursor-active');

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    const glowPos = { ...pos };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dot.current) {
        dot.current.style.left = `${pos.x}px`;
        dot.current.style.top = `${pos.y}px`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor="hover"], input, textarea, select');
      if (ring.current) {
        ring.current.style.width = interactive ? '64px' : '44px';
        ring.current.style.height = interactive ? '64px' : '44px';
        ring.current.style.borderColor = interactive
          ? 'rgba(212,175,55,0.9)'
          : 'rgba(212,175,55,0.6)';
      }
    };

    const loop = () => {
      // Eased trailing for ring + glow
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      glowPos.x += (pos.x - glowPos.x) * 0.08;
      glowPos.y += (pos.y - glowPos.y) * 0.08;
      if (ring.current) {
        ring.current.style.left = `${ringPos.x}px`;
        ring.current.style.top = `${ringPos.y}px`;
      }
      if (glow.current) {
        glow.current.style.left = `${glowPos.x}px`;
        glow.current.style.top = `${glowPos.y}px`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('luxury-cursor-active');
    };
  }, []);

  return (
    <>
      <div ref={glow} className="ac-cursor-glow" />
      <div ref={ring} className="ac-cursor-ring" />
      <div ref={dot} className="ac-cursor" />
    </>
  );
}
