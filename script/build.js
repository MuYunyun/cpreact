const webpack = require('webpack')
const path = require('path')

const rootPath = path.resolve(__dirname, '../')

webpack({
  entry: path.resolve(rootPath, 'test', 'index.js'),
  mode: 'production',
  output: {
    filename: 'cpreact.js',
    path: path.resolve(rootPath, 'lib'),
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: "babel-loader",
    }]
  },
}, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('build success')
  }
})