const Separator = () => (
  <span>
    |
    <style jsx>{`
      span {
        margin: 0 16px;
      }
    `}</style>
  </span>
);

export const Footer = () => (
  <footer>
    made with 💖 by{" "}
    <a
      href="https://github.com/eweilow"
      target="_blank"
      rel="noreferrer noopener"
    >
      E. Weilow
    </a>{" "}
    <Separator />
    <a
      href="https://github.com/eweilow/presentation-timer"
      target="_blank"
      rel="noreferrer noopener"
    >
      view on GitHub
    </a>{" "}
    <Separator />
    <a
      href="https://twitter.com/eweilow"
      target="_blank"
      rel="noreferrer noopener"
    >
      follow me on Twitter
    </a>{" "}
    <style jsx>{`
      footer {
        position: fixed;
        right: 0;
        bottom: 0;

        padding: 16px 24px;
      }

      footer,
      a {
        color: #ffffffdd;
      }
    `}</style>
  </footer>
);
