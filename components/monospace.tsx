import React from "react";

export const Monospace: React.FC<{
  children: string;
  characterWidth: number;
}> = props => (
  <span>
    {[...props.children].map((el, i) => (
      <span className="character" key={i}>
        {el}
      </span>
    ))}
    <style jsx>{`
      .character {
        width: ${props.characterWidth}em;
        display: inline-block;
      }
    `}</style>
  </span>
);
