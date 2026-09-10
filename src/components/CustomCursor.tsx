import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailing, setTrailing] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if device is touch-primary
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, textarea, [role="button"], .interactive-cursor');
        setIsPointer(!!interactive);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    let animationFrameId: number;
    const updateTrailing = () => {
      setTrailing((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.2,
        y: prev.y + (position.y - prev.y) * 0.2,
      }));
      animationFrameId = requestAnimationFrame(updateTrailing);
    };
    animationFrameId = requestAnimationFrame(updateTrailing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [position, isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Center glowing dot */}
      <div
        id="custom-cursor-dot"
        className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            isPointer
              ? 'w-4 h-4 bg-cyan-400 shadow-[0_0_12px_#22d3ee]'
              : 'w-2 h-2 bg-cyan-300 shadow-[0_0_8px_#38bdf8]'
          }`}
        />
      </div>

      {/* Trailing soft ring */}
      <div
        id="custom-cursor-ring"
        className="fixed pointer-events-none z-50 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${trailing.x}px, ${trailing.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <div
          className={`rounded-full border border-cyan-400/40 transition-all duration-300 ${
            isPointer
              ? 'w-12 h-12 bg-cyan-500/10 border-cyan-300 scale-125 shadow-[0_0_20px_rgba(34,211,238,0.25)]'
              : 'w-8 h-8 scale-100'
          }`}
        />
      </div>
    </>
  );
}
