const { hostname } = require('node:os');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "avatars.githubusercontent.com", // GitHub avatar
      "firebasestorage.googleapis.com", // Firebase Storage
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.adidas.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      }
    ],
  },
};

module.exports = nextConfig;