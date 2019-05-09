import { useMemo, useEffect } from "react";

import ganalytics, { GAnalytics } from "ganalytics";
import Router from "next/router";

let cached: GAnalytics;

function createClient() {
  if (cached == null) {
    cached = ganalytics("UA-82332728-6", {
      aip: 1
    });
  }

  return cached;
}

export function useAnalytics() {
  if ((process as any).browser) {
    if (navigator.doNotTrack === "1") {
      console.info("Respecting DNT");
      return;
    }
    const client = useMemo(() => createClient(), []);
    useEffect(() => {
      function handler(url: string) {
        client.send("pageview");
      }
      Router.events.on("routeChangeComplete", handler);

      return () => Router.events.off("routeChangeComplete", handler);
    }, []);
  }
}
