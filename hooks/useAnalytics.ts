import { useMemo, useEffect } from "react";

import ganalytics, { GAnalytics } from "ganalytics";
import Router from "next/router";

let cached: GAnalytics;

function createClient() {
  if (navigator.doNotTrack === "1") {
    console.info("Respecting DNT");
    return null;
  }
  if (cached == null) {
    cached = ganalytics("UA-82332728-6", {
      aip: 1
    });
  }

  return cached;
}

export function useAnalytics() {
  if ((process as any).browser) {
    const client = useMemo(() => createClient(), []);
    useEffect(() => {
      if (client == null) {
        return;
      }

      function handler(url: string) {
        client.send("pageview");
      }
      Router.events.on("routeChangeComplete", handler);

      return () => Router.events.off("routeChangeComplete", handler);
    }, []);
  }
}
