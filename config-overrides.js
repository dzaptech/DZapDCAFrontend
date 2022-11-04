const webpack = require('webpack');
module.exports = function override(config, env) {
  //do stuff with the webpack config...
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    url: require.resolve('url'),
    assert: require.resolve('assert'),
    crypto: require.resolve('crypto-browserify'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify/browser'),
    buffer: require.resolve('buffer'),
    stream: require.resolve('stream-browserify'),
  });
  config.resolve.fallback = {};
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  );
  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.m?js/,
      resolve: {
        fullySpecified: false,
      },
    },
  ];
  config.resolve.fallback = fallback;
  config.ignoreWarnings = [/Failed to parse source map/];
  return config;
};
