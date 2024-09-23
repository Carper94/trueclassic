/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const chalk = require('chalk');

const { log } = console;

// Create a new config.yml file from config.template.yml
fs.copyFile('config.template.yml', 'config.yml', fs.constants.COPYFILE_EXCL, (err) => {
  if (err) {
    log(chalk.red('You aleady have a config.yml file. No changes made.'));
    // throw err;
  } else {
    log(chalk.green('Created a new config.yml file, please add relevant values.'));
  }
});

log(`
${chalk.green.bold('Granite has been installed.')}
Run ${chalk.gray('npm start')} to begin devloping.
`);
