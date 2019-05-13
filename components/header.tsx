import React from "react";

export const Header: React.FC<{ title: string }> = props => (
  <header>
    <div className="title">{props.title}</div>
    <div className="contents">{props.children}</div>
    <style jsx>{`
      header {
        flex: 1;
        font-size: 140px;
        display: block;
        width: 100%;
        text-align: center;
        padding: 32px;
        box-sizing: border-box;
        min-width: 4.7em;
      }

      @media (max-width: 1600px) {
        header {
          font-size: 125px;
        }
      }
      @media (max-width: 1400px) {
        header {
          padding: 24px;
          font-size: 110px;
        }
      }
      @media (max-width: 1100px) {
        header {
          padding: 12px;
          font-size: 100px;
        }
      }
      @media (max-width: 800px) {
        header {
          padding: 16px;
          font-size: 85px;
        }
      }
      @media (max-width: 600px) {
        header {
          padding: 8px;
          font-size: 65px;
        }
      }
      @media (max-width: 340px) {
        header {
          font-size: 45px;
        }
      }

      .title {
        opacity: 0.6;
        font-size: 0.8em;
        line-height: 1em;
      }
      .contents {
        font-weight: bold;
        font-size: 1em;
        line-height: 1em;
        margin-top: 0.1em;
      }
    `}</style>
  </header>
);
