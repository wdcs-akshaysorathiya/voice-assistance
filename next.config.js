const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    modularizeImports: {
    },
  },
  devIndicators: {
    buildActivity: true,
  },
  reactStrictMode: true,
  trailingSlash: false,
  optimizeFonts: true,
  
}

module.exports = () => {
  const plugins = [withBundleAnalyzer]
  return plugins.reduce((acc, plugin) => plugin(acc), { ...nextConfig })
}