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

        padding: 32px;
      }

      .pane div {
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
      }

      @media (max-width: 800px) {
        .pane {
          padding: 16px;
        }
      }

      @media (max-width: 400px) {
        .pane {
          padding: 16px 0;
        }
        .pane div {
          border-radius: 0;
        }
      }
    `}</style>
  </section>
);
