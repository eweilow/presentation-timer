import React from "react";
import { mdiPlayCircleOutline, mdiPauseCircleOutline, mdiNuke } from "@mdi/js";
import { ControlButton } from "./controlButton";

export const Controls: React.FC<{
  timeUsed: number;
  active: boolean;
  setActive: (active: boolean) => void;
  reset: () => void;
}> = props => (
  <section className="controls">
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
    <style jsx>{`
      .controls {
        opacity: 0.25;
        transition: opacity 200ms;
        display: flex;
        justify-content: center;
      }

      .controls:hover {
        opacity: 1;
      }
    `}</style>
  </section>
);
