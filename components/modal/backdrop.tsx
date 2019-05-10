import React from "react";

export const Backdrop: React.FC<{ onShouldClose: () => void }> = props => (
  <section className="backdrop" onClick={props.onShouldClose}>
    {props.children}
    <style jsx>{`
      .backdrop {
        background: black;
        opacity: 0.5;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    `}</style>
  </section>
);
