import React from "react";

export const Pane: React.FC<{ onShouldClose: () => void }> = props => (
  <section className="pane">
    <div>{props.children}</div>
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
      }

      .pane div {
        background: white;
        border-radius: 16px;
        position: fixed;
        max-height: 100vh;
        max-width: 100vw;

        margin: 32px;

        min-width: 300px;
        min-height: 300px;

        pointer-events: all;
        box-shadow: 0px 5px 20px #00000082;
      }
    `}</style>
  </section>
);
