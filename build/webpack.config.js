/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

// Config files.
const settings = require('./project.config');

// Get Environment
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  // devtool: false,
  entry: settings.entries,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../assets/'),
    chunkFilename: '[id].[chunkhash].js',
  },
  externals: {
    jquery: 'jQuery',
  },
  resolve: settings.resolve,
  module: {
    rules: [
      // Run JS through Babel for better browser support
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            sourceMap: true,
            presets: ['@babel/preset-env'],
          },
        },
      },

      // Compile all .scss files into CSS
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { esModule: true },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
              url: false,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
    ],
  },

  plugins: [
    // Remove empty entry JS files that result from CSS entries
    new RemoveEmptyScriptsPlugin(),

    // ESLint
    new ESLintPlugin(settings.ESLintOptions),

    // Extract CSS to this location
    new MiniCssExtractPlugin({
      filename: '../assets/[name]',
    }),

    // Add contenthash to sourcemaps, for cache busting
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map?v=[contenthash]',
    }),
  ],

  optimization: {
    removeEmptyChunks: true,
    minimize: isProd,
    minimizer: [
      // JS Minification
      new TerserPlugin(settings.terserConfig),

      // CSS Minification
      new CssMinimizerPlugin(),
    ],
  },

  // Cleaner Webpack console messages
  stats: {
    colors: true,
    cachedModules: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    modules: false,
    entrypoints: false,
    moduleTrace: false,
  },
};
