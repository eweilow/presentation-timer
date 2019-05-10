import { useMemo, useEffect } from "react";

import ganalytics, { GAnalytics } from "ganalytics";
import Router from "next/router";
import { SettingsData } from "../components/settings";

let cached: GAnalytics;

function createClient() {
  if (navigator.doNotTrack === "1") {
    console.info("Respecting DNT");
    return null;
  }
  if (cached == null) {
    cached = ganalytics(
      "UA-82332728-6",
      {
        aip: 1
      },
      true
    );
  }

  return cached;
}

export function useAnalytics(settings: SettingsData) {
  if ((process as any).browser) {
    const client = useMemo(() => createClient(), []);

    let query = "";
    if (Router.pathname === "/") {
      query +=
        "?dur=" +
        encodeURIComponent(settings.duration) +
        "&alert=" +
        encodeURIComponent(settings.alert) +
        "&warn=" +
        encodeURIComponent(settings.warn);
    }
    useEffect(() => {
      if (client == null) {
        return;
      }

      client.send("pageview", {
        dl: location.href.replace(/\?.*$/, "") + query,
        dr:
          typeof document.referrer === "string"
            ? document.referrer.replace(/\?.*$/, "")
            : undefined
      });
    }, [Router.pathname, query]);
  }
}
