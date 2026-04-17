/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com", // Google avatar
      "avatars.githubusercontent.com", // GitHub avatar
    ],
  },
};

module.exports = nextConfig
