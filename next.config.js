const withPlugins = require("next-compose-plugins");
const withTypescript = require("@zeit/next-typescript");
const nextSourceMaps = require("@zeit/next-source-maps");
const webpack = require("webpack");

module.exports = withPlugins([withTypescript, nextSourceMaps], {
  target: "serverless",
  webpack: (config, { isServer, buildId }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.SENTRY_RELEASE": JSON.stringify(buildId),
        "process.env.SENTRY_DSN": JSON.stringify(
          "https://21e698239c7443c9a882995ffe28f187@sentry.io/1456861"
        ),
        "process.env.ANALYTICS_ID": JSON.stringify("UA-82332728-6")
      })
    );

    if (isServer) {
      config.resolve.alias["@sentry/browser"] = "@sentry/node";
    }

    return config;
  }
});
