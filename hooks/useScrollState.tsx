import {
  useRef,
  useLayoutEffect,
  useMemo,
  useState,
  MutableRefObject
} from "react";

export function useScrollState(): {
  ref: MutableRefObject<HTMLDivElement>;
  top: JSX.Element;
  bottom: JSX.Element;
  atTop: boolean;
  atBottom: boolean;
} {
  const rootRef = useRef<HTMLDivElement>();
  const topRef = useRef<HTMLDivElement>();
  const bottomRef = useRef<HTMLDivElement>();

  if (!(process as any).browser) {
    return {
      ref: undefined,
      top: null,
      bottom: null,
      atTop: false,
      atBottom: false
    } as any;
  }
  if (
    typeof IntersectionObserver === "undefined" ||
    IntersectionObserver == null
  ) {
    return {
      ref: undefined,
      top: null,
      bottom: null,
      atTop: true,
      atBottom: true
    } as any;
  }

  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        entries => {
          for (const entry of entries) {
            if (entry.target === topRef.current) {
              setAtTop(entry.isIntersecting);
            }
            if (entry.target === bottomRef.current) {
              setAtBottom(entry.isIntersecting);
            }
          }
        },
        {
          root: rootRef.current
        }
      ),
    [rootRef.current]
  );

  const top = useMemo(
    () => (
      <div
        ref={topRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 16
        }}
      />
    ),
    [topRef]
  );
  const bottom = useMemo(
    () => (
      <div
        ref={bottomRef}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 16
        }}
      />
    ),
    [topRef]
  );

  useLayoutEffect(() => {
    const topItem = topRef.current;
    const bottomItem = bottomRef.current;
    observer.observe(topItem);
    observer.observe(bottomItem);

    return () => {
      observer.unobserve(topItem);
      observer.unobserve(bottomItem);
    };
  }, [observer, topRef.current, bottomRef.current]);

  return {
    ref: rootRef,
    top,
    bottom,
    atTop,
    atBottom
  };
}
