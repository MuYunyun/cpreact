const webpack = require('webpack')
const path = require('path')

const rootPath = path.resolve(__dirname)

module.exports = {
  entry: path.resolve(rootPath, 'test', 'index.js'),
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: './public'
  },
  output: {
    filename: 'cpreact.js',
    path: path.resolve(rootPath, 'public'),
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: "babel-loader",
    }]
  },
}