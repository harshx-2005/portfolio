import { useState, useEffect } from 'react';

export default function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hidden on touchscreen/mobile devices
    const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (touchDevice) return;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[99] transition-opacity duration-300 hidden md:block"
      style={{
        opacity: isVisible ? 1 : 0,
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.08), transparent 80%)`,
      }}
    />
  );
}
