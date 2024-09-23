// Config files.
const settings = require('./build/project.config');

// Update these setting variables in build/project.config.js
module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-pxtorem': {
      propList: settings.PostCssConfig.pxtoremOptions.propList,
    },
    'postcss-preset-env': {
      stage: settings.PostCssConfig.stage,
      autoprefixer: {
        grid: settings.PostCssConfig.grid,
      },
    },
  },
};
