import React, { useState } from "react";
import { Clock } from "../components/clock";
import clsx from "clsx";
import { useClock } from "../hooks/useClock";
import { Controls } from "../components/controls";
import { Footer } from "../components/footer";
import { useAnalytics } from "../hooks/useAnalytics";
import { Modal } from "../components/modal";
import { Settings } from "../components/settings";

const Header: React.FC<{ title: string }> = props => (
  <header>
    <div className="title">{props.title}</div>
    <div className="contents">{props.children}</div>
    <style jsx>{`
      header {
        font-size: 140px;
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
  useAnalytics();

  const durationTime = 1000 * 60 * 18;
  const alertTime = 0;
  const warnTime = 60000;

  const [settingsOpen, setSettingsOpen] = useState(false);

  const { timeUsed, active, setActive, reset } = useClock(0);
  const timeLeft = durationTime - timeUsed;

  const transitionTime = 5000;

  const alertOvertime = timeLeft < alertTime + transitionTime;
  const warnOvertime = timeLeft < warnTime + transitionTime;

  return (
    <div className={clsx("container", { alertOvertime, warnOvertime })}>
      <div>
        <Controls
          timeUsed={timeUsed}
          active={active}
          setActive={setActive}
          reset={reset}
          onOpenSettings={() => setSettingsOpen(true)}
        />
        <Header title={timeLeft > 0 ? "left" : "overtime"}>
          <Clock timeLeft={timeLeft + 999} />
        </Header>
        <Header title="used">
          <Clock timeLeft={timeUsed} />
        </Header>
        <Modal
          onShouldClose={() => setSettingsOpen(false)}
          active={settingsOpen}
        >
          <Settings />
        </Modal>
      </div>
      <Footer />
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
    </div>
  );
};
