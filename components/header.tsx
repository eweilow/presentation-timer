import React from "react";

export const Header: React.FC<{ title: string }> = props => (
  <header>
    <div className="title">{props.title}</div>
    <div className="contents">{props.children}</div>
    <style jsx>{`
      header {
        font-size: 140px;
        display: block;
        width: 100%;
        text-align: center;
        padding: 32px;
        box-sizing: border-box;
      }

      @media (max-width: 1600px) {
        header {
          font-size: 125px;
        }
      }
      @media (max-width: 1000px) {
        header {
          padding: 24px;
          font-size: 110px;
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
        line-height: 1.3em;
      }
    `}</style>
  </header>
);
