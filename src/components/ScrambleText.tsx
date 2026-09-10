import { useEffect, useState, useRef } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  triggerOnHover?: boolean;
  preserveSpaces?: boolean;
}

const GLYPHS = '!<>-_\\/[]{}—=+*^?#░▒▓█~@$%';

export default function ScrambleText({
  text,
  className = '',
  scrambleSpeed = 35,
  triggerOnHover = true,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const startScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = text.length;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        clearInterval(intervalRef.current!);
        setIsScrambling(false);
        setDisplayText(text);
      }

      iteration += 1 / 2;
    }, scrambleSpeed);
  };

  useEffect(() => {
    startScramble();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  return (
    <span
      onMouseEnter={() => {
        if (triggerOnHover) startScramble();
      }}
      className={`inline-block cursor-default select-none ${className}`}
    >
      {displayText}
    </span>
  );
}
