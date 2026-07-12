'use client';

import { useState, useEffect } from 'react';

interface TypingEffectProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetween?: number;
}

export default function TypingEffect({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetween = 2000,
}: TypingEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const activeWord = words[currentWordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.substring(0, prev.length - 1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) => activeWord.substring(0, prev.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && currentText === activeWord) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, delayBetween);
    }

    if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delayBetween]);

  return (
    <span className="relative font-mono-tech select-none inline-block">
      <span className="text-gradient-purple font-extrabold">{currentText}</span>
      <span className="ml-1 inline-block w-[3px] h-[1.2em] bg-purple-500 rounded-sm animate-pulse shadow-[0_0_8px_#a855f7] align-middle" />
    </span>
  );
}
