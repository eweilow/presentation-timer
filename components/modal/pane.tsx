import React from "react";
import { useScrollState } from "../../hooks/useScrollState";
import clsx from "clsx";

export const Pane: React.FC<{ onShouldClose: () => void }> = props => {
  const { ref, top, bottom, atBottom, atTop } = useScrollState();

  return (
    <section className="pane">
      <div className="scroller" ref={ref}>
        <div className="interior">
          {props.children}
          {top}
          {bottom}
        </div>
        <div className={clsx("shadow top", { visible: !atTop })} />
        <div className={clsx("shadow bottom", { visible: !atBottom })} />
      </div>
      <style jsx>{`
        .pane {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 32px;
        }

        .shadow {
          position: fixed;
          height: 32px;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .shadow.top {
          top: 0;
          background: linear-gradient(
            to bottom,
            #000000,
            #71717152 75%,
            #ff000000
          );
        }

        .shadow.bottom {
          bottom: 0;
          background: linear-gradient(
            to top,
            #000000,
            #71717152 75%,
            #ff000000
          );
        }

        .shadow {
          opacity: 0;
          transition: opacity 175ms;
        }

        .shadow.visible {
          opacity: 0.2;
        }

        .interior {
          position: relative;
        }

        .pane .scroller {
          background: white;
          border-radius: 16px;
          max-height: 100%;
          max-width: 100%;

          box-sizing: border-box;

          min-width: 300px;
          min-height: 300px;

          pointer-events: all;
          box-shadow: 0px 5px 20px #00000082;

          overflow-y: auto;
          max-height: 100%;
          -webkit-overflow-scrolling: touch;
        }

        :global(body) {
          -webkit-overflow-scrolling: touch;
        }

        @media (max-width: 800px) {
          .pane {
            padding: 16px;
          }
        }

        @media (max-width: 400px) {
          .pane {
            padding: 0;
          }
          .pane .scroller {
            border-radius: 0;
          }
        }
      `}</style>
    </section>
  );
};
