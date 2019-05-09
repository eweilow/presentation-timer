import React from "react";

export const Monospace: React.FC<{
  children: string;
  characterWidth: number;
}> = props => (
  <span>
    {[...props.children].map(el => (
      <span className="character">{el}</span>
    ))}
    <style jsx>{`
      .character {
        width: ${props.characterWidth}em;
        display: inline-block;
      }
    `}</style>
  </span>
);
