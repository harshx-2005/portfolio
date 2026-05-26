import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-[98] flex items-center justify-center w-12 h-12 rounded-full border border-purple-500/30 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] bg-slate-950/70 backdrop-blur-md cursor-pointer hover:bg-purple-600 hover:border-purple-600 hover:text-white transition-all duration-300"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ y: -3, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll back to top"
        >
          <FaArrowUp className="text-sm animate-bounce" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
