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
          transition: opacity 200ms;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
        }

        .controls.faded {
          opacity: 0.3;
        }

        .controls.faded:hover {
          opacity: 1;
        }
      `}</style>
    </section>
  );
};
