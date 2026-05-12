"use client";
import { useEffect, useState } from "react";

type TypewriterProps = {
  text: string;
  speed?: number;
  delay?: number;
};

export function Typewriter({
  text,
  speed = 70,
  delay = 0,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    let interval: ReturnType<typeof setInterval>;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;

        if (i === text.length) clearInterval(interval);
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, delay]);

  return (
    <span className="border-r-2 border-[#1a1a1a] pr-1 animate-pulse">
      {displayedText}
    </span>
  );
}