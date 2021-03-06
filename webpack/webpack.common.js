const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const APP_ROOT = path.resolve(__dirname, '..');
const RESOLVE_EXTENSIONS = ['*', '.js', '.jsx', '.hbs'];

module.exports = (mode) => ([
  {
    context: APP_ROOT,
    entry: './src/client.js',
    mode,
    output: {
      filename: 'client.js',
      path: `${APP_ROOT}/dist`
    },
    resolve: {
      modules: [APP_ROOT, 'node_modules'],
      extensions: RESOLVE_EXTENSIONS
    },
    target: 'web',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.scss$/,
          use: [
            { loader: 'ignore-loader'}
          ],
        },
      ]
    }
  },
  {
    context: APP_ROOT,
    entry: './src/server.js',
    mode,
    output: {
      filename: 'server.js',
      path: `${APP_ROOT}/dist`
    },
    resolve: {
      modules: [APP_ROOT, 'node_modules'],
      extensions: RESOLVE_EXTENSIONS,
    },
    externals: nodeExternals(),
    target: 'node',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {loader: 'css-loader'},
            {loader: 'sass-loader'}
          ],
        },
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "style.css"
      })
    ]
  }
]);
