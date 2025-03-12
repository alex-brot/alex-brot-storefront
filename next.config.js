const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withStoreConfig({
  features: store.features,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "alex-brot.s3.eu-central-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "dev.strapi.alex-brot.stenz.dev"
      },
      {
        protocol: "https",
        hostname: "strapi.alex-brot.stenz.dev"
      }
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  }
})

console.log("next.config.js", JSON.stringify(module.exports, null, 2))

module.exports = nextConfig
