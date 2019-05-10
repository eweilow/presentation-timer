import React, { useState, useEffect } from "react";
import {
  mdiPlayCircleOutline,
  mdiPauseCircleOutline,
  mdiNuke,
  mdiCogs
} from "@mdi/js";
import { ControlButton } from "./controlButton";
import clsx from "clsx";

export const Controls: React.FC<{
  timeUsed: number;
  active: boolean;
  setActive: (active: boolean) => void;
  onOpenSettings: () => void;
  reset: () => void;
}> = props => {
  const [faded, setFaded] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFaded(true);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className={clsx("controls", { faded })}>
      <ControlButton
        disabled={props.active}
        onClick={() => props.setActive(true)}
        icon={mdiPlayCircleOutline}
        title="Play"
      />
      <ControlButton
        disabled={!props.active}
        onClick={() => props.setActive(false)}
        icon={mdiPauseCircleOutline}
        title="Pause"
      />
      <ControlButton
        disabled={props.timeUsed < 1000}
        onClick={() => {
          if (confirm("Really reset?")) {
            props.reset();
          }
        }}
        icon={mdiNuke}
        title="Reset"
      />
      <ControlButton
        onClick={props.onOpenSettings}
        icon={mdiCogs}
        title="Settings"
      />
      <style jsx>{`
        .controls {
          transition: opacity 2s;
          transition-delay: 1s;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
        }

        @media (max-width: 600px) {
          :global(main.container) {
            padding-top: 72px;
            box-sizing: border-box;
          }

          .controls {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            padding: 8px;
            box-sizing: border-box;
          }
        }

        .controls.faded {
          opacity: 0.3;
        }

        .controls.faded:hover {
          opacity: 1;
          transition-duration: 200ms;
          transition-delay: 0s;
        }
      `}</style>
    </section>
  );
};
