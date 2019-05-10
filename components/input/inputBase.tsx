import clsx from "clsx";
import { InputLabel } from "./inputLabel";

const transitionTime = 100;

export const InputBase: React.FC<{
  label: string;
  errorMessage?: string | null;
  minWidth: number;
  disabled: boolean;
  required: boolean;

  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
}> = props => (
  <div
    className={clsx("input", "flexChild", {
      required: props.required,
      disabled: props.disabled,
      error: props.errorMessage,
      leftIcon: props.leftIcon,
      rightIcon: props.rightIcon
    })}
  >
    <label className="box">
      {props.children}
      <InputLabel
        transitionTime={transitionTime}
        label={props.required ? `${props.label} *` : props.label}
        errorMessage={props.errorMessage}
      />
      <div className="line" />
      {props.leftIcon && <div className="icon left">{props.leftIcon}</div>}
      {props.rightIcon && <div className="icon right">{props.rightIcon}</div>}
    </label>
    <style jsx>{`
      .input {
        min-width: ${props.minWidth}px;

        display: flex;
        flex-direction: column;
        position: relative;
      }

      .box {
        display: block;
        width: 100%;
        height: 64px;
        background: #f9f7fd;
        border-radius: 4px;
        overflow: hidden;

        position: relative;
      }

      .line {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 2px;
      }

      .line {
        background: #e7d8ff;
        transition: background ${transitionTime}ms;
      }

      .icon {
        color: #e7d8ff;
        transition: color ${transitionTime}ms;
      }

      .box:hover .line {
        background: silver;
      }

      .box:hover .icon {
        color: silver;
      }

      :global(*:focus) ~ .line {
        background: #6200ff !important;
      }

      :global(*:focus) ~ .icon {
        color: #6200ff !important;
      }

      .input.error ~ .line {
        background: #ff164d;
      }

      .input.error ~ .icon {
        color: #ff164d;
      }
    `}</style>
    <style jsx>{`
      .icon {
        position: absolute;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      }
      .icon.right {
        right: 8px;
      }
      .icon.left {
        left: 8px;
      }
    `}</style>
    <style jsx>{`
      .input.disabled .box {
        background: #ececec;
      }
      .input.disabled .line {
        background: #d6d6d6;
      }
    `}</style>
    <style jsx>{`
      .box :global(input) {
        appearance: none;
      }

      .box :global(input) {
        width: 100%;
        height: 100%;

        margin: 0;
        border: 0;
        box-sizing: border-box;
        background: none;
        border: none;
        border-radius: 0;

        font-family: inherit;
        font-weight: bold;
        font-size: 18px;
        line-height: 12px;
        padding: 24px 16px 8px;

        outline: none;
      }

      .leftIcon .box :global(input) {
        padding-left: 40px;
      }

      .rightIcon .box :global(input) {
        padding-right: 40px;
      }

      @media (max-width: 800px) {
        .box {
          height: 56px;
        }
      }
      @media (max-width: 800px) {
        .box :global(input) {
          font-size: 16px;
        }
      }
    `}</style>
  </div>
);
