import { useState, useEffect, useRef, useCallback } from "react";

export function useClock(initialTime: number) {
  const [active, setActive] = useState(false);
  const [timeUsed, setTimeUsed] = useState(initialTime);
  const [currentTimeUsed, setCurrentTimeUsed] = useState(0);

  const currentStartedRef = useRef(-1);

  useEffect(() => {
    if (!active) {
      return;
    }

    const intervalId = setInterval(() => {
      const current = Date.now() - currentStartedRef.current;
      setCurrentTimeUsed(current);
    }, 200);

    return () => {
      clearInterval(intervalId);
    };
  }, [timeUsed, active]);

  const setActiveCallback = useCallback(
    activeState => {
      if (!activeState && active) {
        setTimeUsed(timeUsed + (Date.now() - currentStartedRef.current));
        setCurrentTimeUsed(0);
        setActive(activeState);
      } else if (activeState && !active) {
        currentStartedRef.current = Date.now();
        setCurrentTimeUsed(0);
        setActive(activeState);
      }
    },
    [active, setTimeUsed, setCurrentTimeUsed, setActive, currentStartedRef]
  );

  const reset = useCallback(() => {
    currentStartedRef.current = Date.now();
    setTimeUsed(0);
    setCurrentTimeUsed(0);
    setActive(false);
  }, [currentStartedRef, setTimeUsed, setCurrentTimeUsed]);

  return {
    active,
    setActive: setActiveCallback,
    timeUsed: timeUsed + currentTimeUsed,
    reset
  };
}
