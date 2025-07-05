/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow access from any IP for mobile testing
  async rewrites() {
    return []
  },
}

module.exports = nextConfig
