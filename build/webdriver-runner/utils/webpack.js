//@flow
'use strict';

/*
This file contains the logic to build the example using webpack.
Before starting the dev server:
- getPackagesWithWebdriverTests identify the packages that have webdriver tests
- packageIsInPattern identify if a pattern is passed or not - a pattern can be only the package name or a full path
*/

// Start of the hack for the issue with the webpack watcher that leads to it dying in attempt of watching files
// in node_modules folder which contains circular symbolic links
const DirectoryWatcher = require('watchpack/lib/DirectoryWatcher');
const _oldcreateNestedWatcher = DirectoryWatcher.prototype.createNestedWatcher;
DirectoryWatcher.prototype.createNestedWatcher = function(
  dirPath /*: string */,
) {
  if (dirPath.includes('node_modules')) return;
  _oldcreateNestedWatcher.call(this, dirPath);
};

const flattenDeep = require('lodash.flattendeep');
const bolt = require('bolt');
const boltQuery = require('bolt-query');
const glob = require('glob');
const path = require('path');
const minimatch = require('minimatch');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const historyApiFallback = require('connect-history-api-fallback');

const createConfig = require('@atlaskit/webpack-config');
const {
  print,
  devServerBanner,
  errorMsg,
} = require('@atlaskit/webpack-config/banner');
const utils = require('@atlaskit/webpack-config/config/utils');

const HOST = 'localhost';
const PORT = 9000;
const WEBPACK_BUILD_TIMEOUT = 10000;

let server;
let config;

const pattern = process.argv[2] || '';

function packageIsInPattern(workspace) {
  if (workspace.files.webdriver.length < 1) return false;
  else if (pattern === '') return true;
  else {
    let matchesPattern =
      pattern.length < workspace.dir.length
        ? workspace.dir.includes(pattern)
        : pattern.includes(workspace.dir);
    return matchesPattern;
  }
}

async function getPackagesWithWebdriverTests() /*: Promise<Array<string>> */ {
  const project /*: any */ = await boltQuery({
    cwd: path.join(__dirname, '..'),
    workspaceFiles: { webdriver: '__tests__/integration/*.+(js|ts|tsx)' },
  });
  return project.workspaces
    .filter(packageIsInPattern)
    .map(workspace => workspace.pkg.name.split('/')[1]);
}
//
// Creating webpack instance
//
async function startDevServer() {
  const workspacesGlob = await getPackagesWithWebdriverTests();
  const env = 'production';
  const includePatterns = workspacesGlob ? false : true; // if glob exists we just want to show what matches it
  const projectRoot = (await bolt.getProject({ cwd: process.cwd() })).dir;
  const workspaces = await bolt.getWorkspaces();
  const filteredWorkspaces = workspacesGlob
    ? workspacesGlob.map(pkg =>
        workspaces.filter(ws => minimatch(ws.dir, pkg, { matchBase: true })),
      )
    : workspaces;

  const globs = workspacesGlob
    ? utils.createWorkspacesGlob(flattenDeep(filteredWorkspaces), projectRoot)
    : utils.createDefaultGlob();

  if (!globs.length) {
    console.info('Nothing to run or pattern does not match!');
    process.exit(0);
  }

  config = createConfig({
    entry: './src/index.js',
    host: HOST,
    port: PORT,
    globs,
    includePatterns,
    env,
    cwd: path.join(__dirname, '../../..', 'website'),
  });

  const compiler = webpack(config);

  //
  // Starting Webpack Dev Server
  //

  server = new WebpackDevServer(compiler, {
    // Enable gzip compression of generated files.
    compress: true,
    historyApiFallback: true,

    //silence webpack logs
    quiet: false,
    noInfo: false,
    overlay: false,
    hot: false,

    //change stats to verbose to get detailed information
    stats: 'minimal',
    clientLogLevel: 'none',
  });

  return new Promise((resolve, reject) => {
    let hasValidDepGraph = true;

    compiler.plugin('invalid', () => {
      hasValidDepGraph = false;
      console.log(
        'Something has changed and Webpack needs to invalidate dependencies graph',
      );
    });

    compiler.plugin('done', () => {
      hasValidDepGraph = true;
      setTimeout(() => {
        if (hasValidDepGraph) {
          resolve();
          console.log('Compiled Packages!!');
        }
      }, WEBPACK_BUILD_TIMEOUT);
    });

    server.listen(PORT, HOST, err => {
      if (err) {
        console.log(err.stack || err);
        return reject(1);
      }
      server.use(
        historyApiFallback({
          disableDotRule: true,
          htmlAcceptHeaders: ['text/html'],
        }),
      );
    });
  });
}

function stopDevServer() {
  server.close();
}

module.exports = { startDevServer, stopDevServer };
