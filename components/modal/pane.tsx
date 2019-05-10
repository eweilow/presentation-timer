import React from "react";

export const Pane: React.FC<{ onShouldClose: () => void }> = props => (
  <section className="pane">
    {props.children}
    <style jsx>{`
      .pane {
        background: white;
        border-radius: 16px;
        position: fixed;
        max-height: 100vh;
        max-width: 100vw;

        top: 50%;
        left: 50%;
        margin: 32px;

        min-width: 300px;
        min-height: 300px;

        transform: translate(-50%, -50%);

        pointer-events: all;
        box-shadow: 0px 5px 20px #00000082;
      }
    `}</style>
  </section>
);
