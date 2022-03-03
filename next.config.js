/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com',
              'chubbifren.s3.us-east-2.amazonaws.com',
              'ipfs.io',
              'app.ai42.art',
              'api.pudgypenguins.io',
              'gateway.pinata.cloud',
              'lh3.googleusercontent.com',
              'anicats.mypinata.cloud',
              'pxg-prod.herokuapp.com'],
  }
}

module.exports = nextConfig
