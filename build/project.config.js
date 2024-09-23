const path = require('path');
/* eslint-disable import/no-extraneous-dependencies */
// const glob = require('glob');
const { extendDefaultPlugins } = require('svgo');
const entries = require('./entries.json');

module.exports = {
  /* General Webpack Settings */
  entries: {
    // JS entry points - a js file will be output for each entry point
    ...entries.js,

    // CSS entry points - a css file will be output for each entry point
    // NOTE: Make sure to include .css extension for CSS entry names
    ...entries.css,
  },

  resolve: {
    alias: {
      // IMPORTANT make sure to place parent routes after child routes to avoid resolution errors
      LAYOUT: path.resolve(__dirname, '../source/scripts/layout/'),
      SECTIONS: path.resolve(__dirname, '../source/scripts/sections/'),
      SNIPPETS: path.resolve(__dirname, '../source/scripts/snippets/'),
      TEMPLATES: path.resolve(__dirname, '../source/scripts/templates/'),
      UTILS: path.resolve(__dirname, '../source/scripts/utilities/'),
      UTILITIES: path.resolve(__dirname, '../source/scripts/utilities/'),
      COMPONENTS: path.resolve(__dirname, '../source/scripts/components/'),
      ACCESSIBILITY: path.resolve(__dirname, '../source/scripts/utilities/accessibility/'),
      CUSTOMERS: path.resolve(__dirname, '../source/scripts/utilities/customers/'),
      DOM: path.resolve(__dirname, '../source/scripts/utilities/DOM/'),
      WINDOW: path.resolve(__dirname, '../source/scripts/utilities/window/'),
      FETCH: path.resolve(__dirname, '../source/scripts/utilities/fetch/'),
    },
    extensions: ['.js'],
  },

  'import/resolver': {
    node: {
      extensions: ['.js', '.node'],
    },
  },

  /* BrowserSync Settings */
  BrowserSyncConfig: {
    // URL of local environment
    proxy: 'https://wlcr.test',
    host: 'localhost',
    port: 3000,
  },

  ESLintOptions: {
    extensions: [`js`],
    exclude: [`./node_modules/**`, '**/theme-addresses/**'],
    emitWarning: true,
    overrideConfigFile: './.eslintrc.js',
  },

  terserConfig: {
    test: /\.js(\?.*)?$/i,
    parallel: true,
    // cache: true,
    // sourceMap: true,
    terserOptions: {
      compress: {
        ecma: 5,
        warnings: false,
        // Disabled because of an issue with Uglify breaking seemingly valid code:
        // https://github.com/facebook/create-react-app/issues/2376
        // Pending further investigation:
        // https://github.com/mishoo/UglifyJS2/issues/2011
        comparisons: false,
        // Disabled because of an issue with Terser breaking valid code:
        // https://github.com/facebook/create-react-app/issues/5250
        // Pending futher investigation:
        // https://github.com/terser-js/terser/issues/120
        inline: 2,
      },
      output: {
        ecma: 5,
        comments: false,
      },
    },
  },

  svgoConfig: {
    // optional but recommended field
    // path: 'path-to.svg',
    // all config fields are also available here
    // multipass: true,
    plugins: extendDefaultPlugins([
      // viewBox is required to resize SVGs with CSS.
      // @see https://github.com/svg/svgo/issues/1128
      {
        name: 'removeViewBox',
        active: false,
      },
    ]),
  },

  /* PostCSS Settings */
  PostCssConfig: {
    // Determines which CSS features to polyfill
    // https://github.com/csstools/postcss-preset-env#stage
    // https://preset-env.cssdb.org/features
    stage: 0,

    // Enable CSS grid pollyfills
    grid: true,

    // PX to Rem Options
    pxtoremOptions: {
      // propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
      propList: ['*'],
    },

    // Adjust browser support in package.json
  },

  /* Accessbility Test Settings */
  a11yTestConfig: {
    // Local URLs to run accessibility tests on
    urls: ['https://wlcr.test/', 'https://wlcr.test/sticky/sticky/'],

    // The accessibility standard to use when testing pages.
    // This should be one of Section508, WCAG2A, WCAG2AA, or WCAG2AAA.
    standard: 'WCAG2AA',

    // Issues with a type of warning are not directly actionable.
    includeWarnings: true,
  },
};
