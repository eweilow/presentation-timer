import { useState, useEffect, useRef, useCallback } from "react";

export function useClock(initialTime: number) {
  const [active, setActive] = useState(false);
  const [timeUsed, setTimeUsed] = useState(initialTime);
  const [currentTimeUsed, setCurrentTimeUsed] = useState(0);

  const currentStartedRef = useRef(-1);

  useEffect(() => {
    currentStartedRef.current = Date.now();
  }, [active]);

  useEffect(() => {
    if (!active) {
      return;
    }

    const intervalId = setInterval(() => {
      setCurrentTimeUsed(Date.now() - currentStartedRef.current);
    }, 200);

    return () => {
      setTimeUsed(timeUsed + currentTimeUsed);
      setCurrentTimeUsed(0);
      clearInterval(intervalId);
    };
  }, [timeUsed, active]);

  const reset = useCallback(() => {
    currentStartedRef.current = Date.now();
    setTimeUsed(0);
    setCurrentTimeUsed(0);
    setActive(false);
  }, [currentStartedRef, setTimeUsed, setCurrentTimeUsed]);

  return {
    active,
    setActive,
    timeUsed: timeUsed + currentTimeUsed,
    reset
  };
}
