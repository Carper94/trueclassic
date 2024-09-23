/* eslint-disable import/no-extraneous-dependencies */
const rimraf = require('rimraf');
const chalk = require('chalk');

const { log } = console;

const assetGlobs = [
  './dist/assets/layout.**.js*',
  './dist/assets/layout.**.css*',
  './dist/assets/template.**.js*',
  './dist/assets/template.**.css*',
];

assetGlobs.forEach((glob) => {
  rimraf(glob, {}, (error) => {
    if (error) {
      log(chalk.red(error));
    } else {
      log(chalk.cyan(`💩 Built assets matching ${glob} have been removed 💩`));
    }
  });
});
