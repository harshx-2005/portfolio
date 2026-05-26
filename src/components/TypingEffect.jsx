import { useState, useEffect } from 'react';

export default function TypingEffect({ words, typingSpeed = 100, deletingSpeed = 50, delayBetween = 2000 }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const activeWord = words[currentWordIndex];

    if (isDeleting) {
      // Deleting character by character
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.substring(0, prev.length - 1));
      }, deletingSpeed);
    } else {
      // Typing character by character
      timer = setTimeout(() => {
        setCurrentText((prev) => activeWord.substring(0, prev.length + 1));
      }, typingSpeed);
    }

    // Word completed, prepare to erase
    if (!isDeleting && currentText === activeWord) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, delayBetween);
    }

    // Word completely erased, switch to next word
    if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delayBetween]);

  return (
    <span className="relative font-mono-tech select-none inline-block">
      <span className="text-gradient-purple font-extrabold">{currentText}</span>
      {/* Blinking vertical cursor */}
      <span className="ml-1 inline-block w-[3px] h-[1.2em] bg-purple-500 rounded-sm animate-pulse shadow-[0_0_8px_#a855f7] align-middle" />
    </span>
  );
}
