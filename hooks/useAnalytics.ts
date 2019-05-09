import { useEffect, useMemo } from "react";

import ganalytics, { GAnalytics } from "ganalytics";
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
  if (typeof window !== "undefined") {
    const client = useMemo(() => createClient(), []);

    useEffect(() => {
      client.send("pageview");
    }, [document.location.href]);
  }
}
