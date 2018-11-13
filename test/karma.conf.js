/*eslint no-var:0, object-shorthand:0 */

var coverage = String(process.env.COVERAGE) === 'true',
  allowSauce = !String(process.env.ALLOW_SAUCELABS).match(/^(0|false|undefined)$/gi),
  pullRequest = !String(process.env.TRAVIS_PULL_REQUEST).match(/^(0|false|undefined)$/gi),
  masterBranch = String(process.env.TRAVIS_BRANCH).match(/^master$/gi),
  sauceLabs = allowSauce && !pullRequest && masterBranch,
  performance = !coverage && String(process.env.PERFORMANCE) !== 'false',
  webpack = require('webpack');

if (!process.env.CHROME_BIN) {
  process.env.CHROME_BIN = require('puppeteer').executablePath();
}

var sauceLabsLaunchers = {
  sl_chrome: {
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'Windows 10'
  },
  sl_firefox: {
    base: 'SauceLabs',
    browserName: 'firefox',
    platform: 'Windows 10'
  },
  sl_safari: {
    base: 'SauceLabs',
    browserName: 'safari',
    platform: 'OS X 10.11'
  },
  sl_edge: {
    base: 'SauceLabs',
    browserName: 'MicrosoftEdge',
    platform: 'Windows 10'
  },
  sl_ie_11: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    version: '11.0',
    platform: 'Windows 7'
  }
};

var localLaunchers = {
  ChromeNoSandboxHeadless: {
    base: 'Chrome',
    flags: [
      '--no-sandbox',
      // See https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
      '--headless',
      '--disable-gpu',
      // Without a remote debugging port, Google Chrome exits immediately.
      '--remote-debugging-port=9333'
    ]
  }
};

module.exports = function (config) {
  console.log('1234',process.env.CHROME_BIN);
  config.set({
    browsers: sauceLabs
      ? Object.keys(sauceLabsLaunchers)
      : Object.keys(localLaunchers),

    frameworks: ['source-map-support', 'mocha', 'chai-sinon'],

    reporters: ['mocha'].concat(
      coverage ? 'coverage' : [],
      sauceLabs ? 'saucelabs' : []
    ),

    coverageReporter: {
      dir: __dirname + '/../coverage',
      reporters: [
        { type: 'text-summary' },
        { type: 'html' },
        { type: 'lcovonly', subdir: '.', file: 'lcov.info' }
      ]
    },

    mochaReporter: {
      showDiff: true
    },

    browserLogOptions: { terminal: true },
    browserConsoleLogOptions: { terminal: true },

    browserNoActivityTimeout: 5 * 60 * 1000,

    // Use only two browsers concurrently, works better with open source Sauce Labs remote testing
    concurrency: 2,

    captureTimeout: 0,

    sauceLabs: {
      build: 'CI #' + process.env.TRAVIS_BUILD_NUMBER + ' (' + process.env.TRAVIS_BUILD_ID + ')',
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER || ('local' + require('../package.json').version),
      connectLocationForSERelay: 'localhost',
      connectPortForSERelay: 4445,
      startConnect: false
    },

    customLaunchers: sauceLabs ? sauceLabsLaunchers : localLaunchers,

    files: [
      { pattern: '{browser,shared}/**.js', watched: false }
    ],

    preprocessors: {
      '**/*': ['webpack', 'sourcemap']
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        /* Transpile source and test files */
        rules: [
          {
            enforce: 'pre',
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              comments: false,
              compact: true
            }
          },
          /* Only Instrument our source files for coverage */
          coverage ? {
            test: /\.js$/,
            loader: 'istanbul-instrumenter-loader',
            include: /src/
          } : {}
        ]
      },
      resolve: {
        // The React DevTools integration requires preact as a module
        // rather than referencing source files inside the module
        // directly
        alias: { preact: '../src/index' },
        modules: [__dirname, 'node_modules']
      },
      plugins: [
        new webpack.DefinePlugin({
          coverage: coverage,
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || ''),
          ENABLE_PERFORMANCE: performance,
          DISABLE_FLAKEY: !!String(process.env.FLAKEY).match(/^(0|false)$/gi)
        })
      ],
      performance: {
        hints: false
      }
    },

    webpackMiddleware: {
      noInfo: true
    }
  })
}
