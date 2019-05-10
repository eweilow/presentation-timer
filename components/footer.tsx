import clsx from "clsx";
import React from "react";

const Separator: React.FC<{ className: string }> = props => (
  <span className={clsx("separator", props.className)}>
    |
    <style jsx>{`
      .separator {
        margin: 0 16px;
      }
    `}</style>
  </span>
);

export const Footer: React.FC = () => (
  <footer>
    made with 💖 by{" "}
    <a
      href="https://github.com/eweilow"
      target="_blank"
      rel="noreferrer noopener"
    >
      E. Weilow
    </a>{" "}
    <Separator className="first" />
    <div className="secondLine">
      <a
        href="https://github.com/eweilow/presentation-timer"
        target="_blank"
        rel="noreferrer noopener"
      >
        view on GitHub
      </a>{" "}
      <Separator className="second" />
      <a
        href="https://twitter.com/eweilow"
        target="_blank"
        rel="noreferrer noopener"
      >
        follow me on Twitter
      </a>{" "}
    </div>
    <style jsx>{`
      footer {
        position: fixed;
        right: 0;
        bottom: 0;

        padding: 16px 24px;
        padding-top: 0;
        height: 64px;
        box-sizing: border-box;
        font-size: 18px;
      }

      footer,
      a {
        color: #ffffffdd;
      }

      .secondLine {
        display: inline;
      }

      @media (max-width: 800px) {
        footer {
          font-size: 16px;
          width: 100%;
          text-align: right;
        }
        :global(.separator.first) {
          display: none;
        }
        .secondLine {
          display: block;
        }
      }

      :global(main.container) {
        padding-bottom: 64px;
        box-sizing: border-box;
      }
    `}</style>
  </footer>
);
