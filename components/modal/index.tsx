import React from "react";
import { useTransition, animated, config } from "react-spring";
import { createPortal } from "react-dom";
import { Pane } from "./pane";
import { Backdrop } from "./backdrop";

export const Modal: React.FC<{
  active: boolean;
  onShouldClose: () => void;
}> = props => {
  if (!(process as any).browser) {
    return null;
  }

  const backdropTransitions = useTransition(props.active, null, {
    from: { opacity: 0, pointerEvents: "none" },
    enter: { opacity: 1, pointerEvents: "all" },
    leave: { opacity: 0, pointerEvents: "none" },
    config: {
      ...config.stiff
    }
  });

  const paneTransitions = useTransition(props.active, null, {
    from: { opacity: 0, transform: "translate3d(0,-40px,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0,0)" },
    leave: { opacity: 0, transform: "translate3d(0,-8px,0)" },
    config: {
      ...config.stiff
    }
  });

  return createPortal(
    <div className="modals">
      {backdropTransitions.map(
        ({ item, props: springProps, key }) =>
          item && (
            <animated.div key={key} style={springProps}>
              <Backdrop onShouldClose={props.onShouldClose}>
                {props.children}
              </Backdrop>
            </animated.div>
          )
      )}
      {paneTransitions.map(
        ({ item, props: springProps, key }) =>
          item && (
            <animated.div key={key} style={springProps}>
              <Pane onShouldClose={props.onShouldClose}>{props.children}</Pane>
            </animated.div>
          )
      )}
      <style jsx>{`
        .modals,
        .modals > :global(div) {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }
      `}</style>
    </div>,
    document.body
  );
};
