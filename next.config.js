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

  headers: async () => {
    return [
      {
        // matching all API routes
        source: '/(.*)',
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "Origin, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
})

// module.exports = withPWA({
//   pwa: {
//     register: true,
//     skipWaiting: true,
//     disable: process.env.NODE_ENV === 'development'
//   }
// })

// module.exports = nextConfig
