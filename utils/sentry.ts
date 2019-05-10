// Based on https://github.com/zeit/next.js/blob/canary/examples/with-sentry/utils/sentry.js

import * as Sentry from "@sentry/browser";
import * as SentryIntegrations from "@sentry/integrations";
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
      new SentryIntegrations.Debug({
        // Trigger DevTools debugger instead of using console.log
        debugger: false
      })
    ];
  }

  Sentry.init(sentryOptions);

  return {
    Sentry,
    captureException: (
      err: Error & { statusCode?: number },
      ctx: NextContext & { errorInfo?: any }
    ) => {
      Sentry.configureScope(scope => {
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
          } else {
            scope.setTag("ssr", "true");
            scope.setExtra("url", req.url);
            scope.setExtra("method", req.method);
            scope.setExtra("headers", req.headers);
          }

          if (errorInfo) {
            Object.keys(errorInfo).forEach(key =>
              scope.setExtra(key, errorInfo[key])
            );
          }
        }
      });

      return Sentry.captureException(err);
    }
  };
};
