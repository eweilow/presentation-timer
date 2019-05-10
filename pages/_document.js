import Document, { Html, Head, Main, NextScript } from "next/document";

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:400,500,700"
            rel="stylesheet"
          />
          <style
            dangerouslySetInnerHTML={{
              __html: `
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
          `
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
