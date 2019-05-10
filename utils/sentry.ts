// Based on https://github.com/zeit/next.js/blob/canary/examples/with-sentry/utils/sentry.js

import {
  init,
  showReportDialog,
  configureScope,
  captureException
} from "@sentry/browser";
import { Debug } from "@sentry/integrations";
import { NextContext } from "next";

export default (release: string = process.env.SENTRY_RELEASE) => {
  const sentryOptions: any = {
    dsn: process.env.SENTRY_DSN,
    release,
    maxBreadcrumbs: 50,
    attachStacktrace: true
  };

  // When we're developing locally
  if (process.env.NODE_ENV !== "production") {
    /* eslint-disable-next-line global-require */
    const sentryTestkit = require("sentry-testkit");
    const { sentryTransport } = sentryTestkit();

    // Don't actually send the errors to Sentry
    sentryOptions.transport = sentryTransport;

    // Instead, dump the errors to the console
    sentryOptions.integrations = [
      new Debug({
        // Trigger DevTools debugger instead of using console.log
        debugger: false
      })
    ];
  }

  init(sentryOptions);

  return {
    Sentry: {
      showReportDialog: showReportDialog
    },
    captureException: (
      err: Error & { statusCode?: number },
      ctx: NextContext & { errorInfo?: any }
    ) => {
      configureScope(scope => {
        if (err.message) {
          // De-duplication currently doesn't work correctly for SSR / browser errors
          // so we force deduplication by error message if it is present
          scope.setFingerprint([err.message]);
        }

        if (err.statusCode) {
          scope.setExtra("statusCode", err.statusCode);
        }

        if (ctx) {
          const { req, res, errorInfo, query, pathname } = ctx;

          if (res && res.statusCode) {
            scope.setExtra("statusCode", res.statusCode);
          }

          scope.setExtra("query", query);
          scope.setExtra("pathname", pathname);

          if ((process as any).browser) {
            scope.setTag("ssr", "false");
            scope.setExtra("url", location.href.replace(/\?.*$/, ""));
          } else {
            scope.setTag("ssr", "true");
            scope.setExtra("url", req.url);
            scope.setExtra("method", req.method);
          }

          if (errorInfo) {
            Object.keys(errorInfo).forEach(key =>
              scope.setExtra(key, errorInfo[key])
            );
          }
        }
      });

      return captureException(err);
    }
  };
};
