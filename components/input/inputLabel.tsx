import clsx from "clsx";

export const InputLabel: React.FC<{
  errorMessage?: string | null;
  label: string;
  transitionTime: number;
}> = props => (
  <span className={clsx("label", { hasError: props.errorMessage })}>
    {props.errorMessage || props.label}
    <style jsx>{`
      .label {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        padding: 8px 16px 0;
        line-height: 14px;
        font-size: 14px;
        font-weight: 500;

        pointer-events: none;
        user-select: none;

        color: #707070;
        transition: color ${props.transitionTime}ms;
      }

      :global(input:focus) ~ span {
        color: #6200ff !important;
      }

      .label.hasError {
        color: #ff164d;
      }
    `}</style>
  </span>
);
