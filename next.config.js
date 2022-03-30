const path = require("path");
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    ADMIN_PRIVATEKEY: process.env.ADMIN_PRIVATEKEY,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
  },
};
