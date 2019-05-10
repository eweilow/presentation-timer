// Based on https://github.com/zeit/next.js/tree/canary/examples/with-sentry/pages

import App from "next/app";
import sentry from "../utils/sentry";
import { Layout } from "../components/layout";

const { Sentry, captureException } = sentry();

type PropsAndState = {
  hasError: boolean;
  errorEventId?: string;
};
export default class ExtendedApp extends App<PropsAndState, PropsAndState> {
  state = {
    hasError: false,
    errorEventId: undefined
  };

  constructor(props: any, ...args: any) {
    super(props, ...args);
  }

  static async getInitialProps({ Component, ctx }) {
    try {
      let pageProps = {};

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }

      return { pageProps };
    } catch (error) {
      const errorEventId = captureException(error, ctx);
      return {
        hasError: true,
        errorEventId,
        pageProps: {}
      };
    }
  }

  static getDerivedStateFromProps(props: PropsAndState, state: PropsAndState) {
    return {
      hasError: props.hasError || state.hasError || false,
      errorEventId: props.errorEventId || state.errorEventId || undefined
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    const errorEventId = captureException(error, {
      query: this.props.router.query,
      pathname: this.props.router.pathname,
      errorInfo
    } as any);

    this.setState({ errorEventId });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Layout>
          <div>
            <h1>There was an error!</h1>
            <p>
              <a
                href="#"
                onClick={() =>
                  Sentry.showReportDialog({ eventId: this.state.errorEventId })
                }
              >
                📣 Report this error
              </a>
            </p>
            <p>
              <a
                href="#"
                onClick={() => {
                  window.location.reload(true);
                }}
              >
                Or, try reloading the page
              </a>
            </p>
          </div>
        </Layout>
      );
    }
    return super.render();
  }
}
