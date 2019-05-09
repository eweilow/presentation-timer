import { Monospace } from "../components/monospace";
import React, { useMemo } from "react";

function padString(str: string, length: number, padChar: string) {
  while (str.length < length) {
    str = padChar + str;
  }
  return str;
}

export const Clock: React.FC<{
  timeLeft: number;
}> = props => {
  let time = Math.abs(props.timeLeft) / 1000;

  const hours = Math.floor(time / 3600);
  time -= 3600 * hours;
  const minutes = Math.floor(time / 60);
  time -= 60 * minutes;
  const seconds = Math.floor(time);

  const hh = useMemo(() => padString(hours.toString(), 2, "0"), [hours]);
  const mm = useMemo(() => padString(minutes.toString(), 2, "0"), [minutes]);
  const ss = useMemo(() => padString(seconds.toString(), 2, "0"), [seconds]);

  const characterWidth = 0.6;
  return (
    <span>
      <Monospace characterWidth={characterWidth}>{hh}</Monospace>:
      <Monospace characterWidth={characterWidth}>{mm}</Monospace>:
      <Monospace characterWidth={characterWidth}>{ss}</Monospace>
    </span>
  );
};
