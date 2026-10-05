import { useEffect, useRef, useState } from "react";

interface UseTypingEffectOptions {
  speed?: number;
  startDelay?: number;
  loop?: boolean;
  pauseDuration?: number;
}

/**
 * Types out a string character-by-character. Accepts a single string
 * or an array of strings to cycle through when `loop` is true.
 */
export const useTypingEffect = (
  text: string | string[],
  options: UseTypingEffectOptions = {}
): string => {
  const { speed = 35, startDelay = 0, loop = false, pauseDuration = 1500 } = options;
  const [display, setDisplay] = useState("");
  const indexRef = useRef(0);
  const textArrayRef = useRef(Array.isArray(text) ? text : [text]);
  const textIndexRef = useRef(0);

  useEffect(() => {
    textArrayRef.current = Array.isArray(text) ? text : [text];
  }, [text]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const typeNext = () => {
      const current = textArrayRef.current[textIndexRef.current];
      if (indexRef.current <= current.length) {
        setDisplay(current.slice(0, indexRef.current));
        indexRef.current += 1;
        timeoutId = setTimeout(typeNext, speed);
      } else if (loop && textArrayRef.current.length > 0) {
        timeoutId = setTimeout(() => {
          if (cancelled) return;
          indexRef.current = 0;
          textIndexRef.current =
            (textIndexRef.current + 1) % textArrayRef.current.length;
          typeNext();
        }, pauseDuration);
      }
    };

    const startId = setTimeout(() => {
      if (!cancelled) typeNext();
    }, startDelay);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      clearTimeout(startId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed, startDelay, loop, pauseDuration]);

  return display;
};
