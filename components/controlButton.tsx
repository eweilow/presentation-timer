import React, { ButtonHTMLAttributes } from "react";

export const ControlButton: React.FC<
  {
    icon: string;
  } & ButtonHTMLAttributes<any>
> = props => (
  <button {...props}>
    <svg viewBox="0 0 24 24">
      <path d={props.icon} />
    </svg>
    <style jsx>{`
      svg {
        width: 48px;
        height: 48px;
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -24px;
        margin-top: -24px;

        fill: currentColor;
      }

      button {
        margin: 16px;
        padding: 0;
        position: relative;
        width: 64px;
        height: 64px;
        border-radius: 32px;
        border: 0;
        outline: none;
        cursor: pointer;

        background: #ffffff56;
        color: inherit;

        transition: opacity 200ms, transform 200ms;
        transform: scale3d(0.9, 0.9, 0.9);
      }

      button:hover:not([disabled]) {
        transform: scale3d(1, 1, 1);
      }

      button[disabled] {
        cursor: default;
        opacity: 0.5;
      }
    `}</style>
  </button>
);
