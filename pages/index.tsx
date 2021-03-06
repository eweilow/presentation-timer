import React, { useState } from "react";
import { Clock } from "../components/clock";
import { useClock } from "../hooks/useClock";
import { Controls } from "../components/controls";
import { useAnalytics } from "../hooks/useAnalytics";
import { Modal } from "../components/modal";
import { Settings, SettingsData } from "../components/settings";
import Router, { DefaultQuery } from "next/router";
import { NextFC } from "next";
import { Layout } from "../components/layout";
import { Header } from "../components/header";

const encodeBase64 = (process as any).browser
  ? btoa
  : function btoa(str: string) {
      return Buffer.from(str).toString("base64");
    };

const decodeBase64 = (process as any).browser
  ? atob
  : function atob(str: string) {
      return Buffer.from(str, "base64").toString("ascii");
    };

function compressSettings(data: SettingsData): any {
  return {
    v: 0,
    d: data.duration,
    a: data.alert,
    w: data.warn
  };
}
function uncompressSettings(data: any): SettingsData {
  if (data.v === 0) {
    return {
      alert: data.a,
      warn: data.w,
      duration: data.d
    };
  }
  throw new Error(
    "Unsupported settings version: " + encodeURIComponent(data.v)
  );
}

const defaultSettings = {
  alert: "00:00",
  duration: "00:18:00",
  warn: "02:00"
};
function readSettings(query: DefaultQuery): SettingsData {
  if (!("s" in query)) {
    return defaultSettings;
  }
  const s = query.s;
  if (typeof s !== "string") {
    return defaultSettings;
  }

  try {
    const jsonString = decodeBase64(s);
    return uncompressSettings(JSON.parse(jsonString));
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error(err);
    }
    return defaultSettings;
  }
}

type InitialProps = {
  settings: SettingsData;
  durationTime: number;
  alertTime: number;
  warnTime: number;
};

const IndexPage: NextFC<InitialProps, InitialProps> = props => {
  useAnalytics(props.settings);

  const [settingsOpen, setSettingsOpen] = useState(false);

  const { timeUsed, active, setActive, reset } = useClock(0);
  const timeLeft = props.durationTime - timeUsed;

  const transitionTime = 5000;

  const alertOvertime = timeLeft < props.alertTime + transitionTime;
  const warnOvertime = timeLeft < props.warnTime + transitionTime;

  let backgroundOverride = undefined;
  let colorOverride = undefined;

  if (alertOvertime) {
    backgroundOverride = "#d00114";
  } else if (warnOvertime) {
    backgroundOverride = "#d07d01";
  }

  return (
    <Layout
      transitionTime={5000}
      backgroundOverride={backgroundOverride}
      colorOverride={colorOverride}
    >
      <div className="outer">
        <Controls
          timeUsed={timeUsed}
          active={active}
          setActive={setActive}
          reset={reset}
          onOpenSettings={() => setSettingsOpen(true)}
        />
        <section>
          <Header title={timeLeft > 0 ? "left" : "overtime"}>
            <Clock timeLeft={timeLeft + 999} />
          </Header>
          <Header title="used">
            <Clock timeLeft={timeUsed} />
          </Header>
        </section>
        <Modal
          onShouldClose={() => setSettingsOpen(false)}
          active={settingsOpen}
        >
          <Settings
            settings={props.settings}
            onSave={data => {
              Router.replace({
                pathname: "/",
                query: {
                  s: encodeBase64(JSON.stringify(compressSettings(data)))
                }
              });
              setSettingsOpen(false);
            }}
          />
        </Modal>
        <style jsx>{`
          .outer {
            width: 100%;
          }
          section {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
          }
        `}</style>
      </div>
    </Layout>
  );
};

function parseFormat(formatted: string) {
  const split = formatted.split(":").map(el => parseInt(el));
  if (split.length === 3) {
    return 1000 * (3600 * split[0] + 60 * split[1] + split[2]);
  } else if (split.length !== 2) {
    throw new Error("Formatted must be either hh:mm:ss or mm:ss");
  }
  return 1000 * (60 * split[0] + split[1]);
}

IndexPage.getInitialProps = ctx => {
  const settings = readSettings(ctx.query);
  return {
    settings,
    alertTime: parseFormat(settings.alert),
    warnTime: parseFormat(settings.warn),
    durationTime: parseFormat(settings.duration)
  };
};

export default IndexPage;
