const withPlugins = require("next-compose-plugins");
const withTypescript = require("@zeit/next-typescript");
const nextSourceMaps = require("@zeit/next-source-maps");
const webpack = require("webpack");

module.exports = withPlugins([withTypescript, nextSourceMaps], {
  target: "serverless",
  env: {
    SENTRY_DSN: process.env.SENTRY_DSN,
    ANALYTICS_ID: process.env.ANALYTICS_ID
  },
  webpack: (config, { isServer, buildId }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.SENTRY_RELEASE": JSON.stringify(buildId)
      })
    );

    if (isServer) {
      config.resolve.alias["@sentry/browser"] = "@sentry/node";
    }

    return config;
  }
});
