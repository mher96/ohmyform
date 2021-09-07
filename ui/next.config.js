const withImages = require('next-images')
const p = require('./package.json')

const version = p.version;

module.exports = withImages({
  poweredByHeader: false,
  publicRuntimeConfig: {
    endpoint: 'http://ec2-54-160-135-102.compute-1.amazonaws.com:3000/graphql',
    spa: !!process.env.SPA || false,
    mainBackground: process.env.MAIN_BACKGROUND || '#8FA2A6'
  },
  serverRuntimeConfig: {
    endpoint: process.env.SERVER_ENDPOINT || process.env.ENDPOINT || '/graphql',
  },
  env: {
    version,
  }
})
