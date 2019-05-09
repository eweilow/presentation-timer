import React, { useState } from "react";
import Head from "next/head";
import { Clock } from "../components/clock";
import clsx from "clsx";
import { useClock } from "../hooks/useClock";

const Header: React.FC<{ title: string }> = props => (
  <header>
    <div className="title">{props.title}</div>
    <div className="contents">{props.children}</div>
    <style jsx>{`
      header {
        font-size: 96px;
        display: block;
        width: 100%;
        text-align: center;
        padding: 0.5em;
        box-sizing: border-box;
      }
      .title {
        opacity: 0.6;
        font-size: 0.8em;
      }
      .contents {
        font-weight: bold;
        font-size: 1em;
      }
    `}</style>
  </header>
);

export default () => {
  const durationTime = 70000;
  const alertTime = 0;
  const warnTime = 60000;

  const [active, setActive] = useState(false);
  const { timeUsed, reset } = useClock(0, active);
  const timeLeft = durationTime - timeUsed;

  const transitionTime = 5000;

  const alertOvertime = timeLeft < alertTime + transitionTime;
  const warnOvertime = timeLeft < warnTime + transitionTime;

  return (
    <div className={clsx("container", { alertOvertime, warnOvertime })}>
      <div>
        <div>
          <button disabled={active} onClick={() => setActive(true)}>
            start
          </button>
          <button disabled={!active} onClick={() => setActive(false)}>
            stop
          </button>
          <button onClick={() => reset()}>reset</button>
        </div>
        <Header title={timeLeft > 0 ? "left" : "overtime"}>
          <Clock timeLeft={timeLeft + 999} />
        </Header>
        <Header title="used">
          <Clock timeLeft={timeUsed} />
        </Header>
      </div>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,500,700"
          rel="stylesheet"
          key="google-font-roboto"
        />
      </Head>
      <style jsx>{`
        .container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          background: black;
          color: white;

          transition: background ${transitionTime}ms;
        }
        .container.warnOvertime {
          background: #d07d01;
          color: white;
        }
        .container.alertOvertime {
          background: #d00114;
          color: white;
        }
      `}</style>
      <style jsx global>{`
        html,
        body,
        #__next {
          width: 100%;
          min-height: 100%;
          display: flex;
          margin: 0;
          padding: 0;
          font-family: "Roboto", sans-serif;
        }
      `}</style>
    </div>
  );
};