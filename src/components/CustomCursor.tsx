'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(true);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'project' | 'input'>('default');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 220, mass: 0.6 };
  const cursorRingX = useSpring(cursorX, springConfig);
  const cursorRingY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 1024 ||
        navigator.maxTouchPoints > 0 ||
        'ontouchstart' in window
      );
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isClickable = target.closest('a') || target.closest('button') || target.classList.contains('cursor-pointer') || target.closest('input[type="submit"]') || target.closest('button[type="submit"]');
      const isInput = target.closest('input') || target.closest('textarea') || target.closest('[contenteditable="true"]');
      const isProjectCard = target.closest('[data-project-card]');

      if (isProjectCard) {
        setCursorType('project');
      } else if (isInput) {
        setCursorType('input');
      } else if (isClickable) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-indigo-400 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-indigo-400/40 pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: cursorRingX,
          y: cursorRingY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorType === 'pointer' ? 44 : cursorType === 'project' ? 70 : cursorType === 'input' ? 12 : 24,
          height: cursorType === 'pointer' ? 44 : cursorType === 'project' ? 70 : cursorType === 'input' ? 32 : 24,
          borderRadius: cursorType === 'input' ? '2px' : '50%',
          backgroundColor: cursorType === 'project' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255, 255, 255, 0)',
          borderColor: cursorType === 'project' ? 'rgba(99, 102, 241, 0.6)' : 'rgba(129, 140, 248, 0.4)',
        }}
      />
      {/* View Badge on projects */}
      {cursorType === 'project' && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[10000] text-[8px] font-mono-tech font-extrabold uppercase text-indigo-300 tracking-widest flex items-center justify-center"
          style={{
            x: cursorRingX,
            y: cursorRingY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          View
        </motion.div>
      )}
    </>
  );
}
