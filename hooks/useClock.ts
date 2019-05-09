import { useState, useEffect, useRef } from "react";

export function useClock(initialTime: number, active: boolean) {
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
      setTimeUsed(timeUsed + Date.now() - currentStartedRef.current);
      setCurrentTimeUsed(0);
      clearInterval(intervalId);
    };
  }, [timeUsed, active]);

  return {
    timeUsed: timeUsed + currentTimeUsed,
    reset() {
      currentStartedRef.current = Date.now();
      setTimeUsed(0);
      setCurrentTimeUsed(0);
    }
  };
}
