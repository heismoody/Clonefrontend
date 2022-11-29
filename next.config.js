/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

// const nextConfig = {
  
// }

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
})

// module.exports = withPWA({
//   pwa: {
//     register: true,
//     skipWaiting: true,
//     disable: process.env.NODE_ENV === 'development'
//   }
// })

// module.exports = nextConfig
