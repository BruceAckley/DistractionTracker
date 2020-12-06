const path = require("path"); 
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { version } = require('./package.json');

module.exports = {
  mode: 'development',
  entry: {
    background: './background/background.js',
    popup: './popup/DistractionTracker.js',
    stats: './options/options.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]/[name].js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3,
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'popup - Distraction Tracker',
      template: 'popup/DistractionTracker.html',
      filename: 'popup/DistractionTracker.html',
      chunks: ['panel']
    }),
    new HtmlWebpackPlugin({
      title: 'stats - Distraction Tracker',
      template: 'options/Options.html',
      filename: 'options/options.html',
      chunks: ['stats'],
    }),
  ]
}