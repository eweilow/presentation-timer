import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

const styles = {
  background: "#6200ff",
  hoverBackground: "#6200ffe6",
  focusBackground: "#6200ffe6",
  activeBackground: "#6200ffcf",
  disabledBackground: "#6200ff12",
  color: "#fff",
  hoverColor: "#fff",
  focusColor: "#fff",
  activeColor: "#fff",
  disabledColor: "#6200ffb0"
};

const lightStyles = {
  background: "#6200ff0f",
  hoverBackground: "#6200ff24",
  focusBackground: "#6200ff28",
  activeBackground: "#6200ff32",
  disabledBackground: "#6200ff12",
  color: "#6200ff",
  hoverColor: "#6200ff",
  focusColor: "#6200ff",
  activeColor: "#6200ff",
  disabledColor: "#6200ffb0"
};

export const ButtonIcon: React.FC<{
  marginLeft?: boolean;
  marginRight?: boolean;
  svg: string;
}> = props => (
  <div className="icon">
    <svg viewBox="0 0 24 24">
      <path d={props.svg} />
    </svg>
    <style jsx>{`
      .icon {
        margin-left: ${props.marginLeft ? "8px" : "0"};
        margin-right: ${props.marginRight ? "8px" : "0"};
      }
      .icon,
      .icon svg {
        width: 24px;
        height: 24px;
      }
      .icon svg {
        fill: currentColor;
      }
    `}</style>
  </div>
);

export const Button: React.FC<
  {
    light?: boolean;
    leftIcon?: string;
    rightIcon?: string;
  } & ButtonHTMLAttributes<any>
> = props => (
  <button
    {...props}
    className={clsx({ dark: !props.light, light: props.light })}
  >
    {props.leftIcon && <ButtonIcon marginRight svg={props.leftIcon} />}
    {props.children}
    {props.rightIcon && <ButtonIcon marginLeft svg={props.rightIcon} />}
    <style jsx>{`
      button {
        pointer-events: all;

        border: none;
        background: none;
        outline: none;

        padding: 0;
        margin: 0;

        font-weight: bold;
        text-transform: uppercase;
        font-family: "Roboto", sans-serif;
        font-size: 14px;
        text-decoration: none;

        cursor: pointer;

        position: relative;

        display: flex;
        padding: 0 12px;
        height: 36px;
        touch-action: manipulation;

        text-transform: uppercase;

        align-items: center;
        justify-content: flex-start;
        background: none;
        border: none;
        outline: none;
        border-radius: 8px;
        user-select: none;
        cursor: pointer;
      }

      button::after {
        display: block;
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
        border-radius: 8px;

        opacity: 0;

        transition: opacity 175ms;
      }

      button:hover::after {
        opacity: 0.1;
      }

      button:active::after {
        opacity: 0.2;
      }

      button.light::after {
        opacity: 0.1;
      }
      button.light:hover::after {
        opacity: 0.15;
      }
      button.light:active::after {
        opacity: 0.2;
      }

      button[disabled] {
        pointer-events: none;
      }
      button[disabled]::after {
        opacity: 0 !important;
      }

      button.dark {
        background: ${styles.background};
        color: ${styles.color};
      }
      button.dark:hover {
        background: ${styles.hoverBackground};
        color: ${styles.hoverColor};
      }
      button.dark:focus {
        background: ${styles.focusBackground};
        color: ${styles.focusColor};
      }
      button.dark:active {
        background: ${styles.activeBackground};
        color: ${styles.activeColor};
      }
      button.dark:disabled {
        background: ${styles.disabledBackground};
        color: ${styles.disabledColor};
      }

      button.light {
        background: ${lightStyles.background};
        color: ${lightStyles.color};
      }
      button.light:hover {
        background: ${lightStyles.hoverBackground};
        color: ${lightStyles.hoverColor};
      }
      button.light:focus {
        background: ${lightStyles.focusBackground};
        color: ${lightStyles.focusColor};
      }
      button.light:active {
        background: ${lightStyles.activeBackground};
        color: ${lightStyles.activeColor};
      }
      button.light:disabled {
        background: ${lightStyles.disabledBackground};
        color: ${lightStyles.disabledColor};
      }
    `}</style>
  </button>
);
