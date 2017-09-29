const path = require('path')
const webpack = require('webpack')
const fs = require('fs')
const WebpackNodeServerPlugin = require('webpack-node-server-plugin')
let nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

module.exports = {
  entry: {
    popup: ['babel-polyfill','./server.js'],
  },
  target: 'node',
  externals: nodeModules,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  // Here we define loaders for different file types
  module: {
    rules: [
      // We use Babel to transpile JSX
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, './server')
        ],
        exclude: /(node_modules)/,
        loader:"babel-loader",
        query: {
          presets: ["env"]
        }
      }
    ]
  },
  plugins: [
    new WebpackNodeServerPlugin({retries: 0}),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    })
  ],
  devtool:"source-map"
};
