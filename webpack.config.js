const webpack = require('webpack')
const path = require('path')

const rootPath = path.resolve(__dirname)

module.exports = {
  entry: path.resolve(rootPath, 'test', 'index.js'),
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  output: {
    filename: 'cpreact.js',
    path: path.resolve(rootPath, 'dist'),
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: "babel-loader",
    }]
  },
}