/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const prompts = require('prompts');
const chalk = require('chalk');
const _ = require('lodash');

const entriesFile = path.resolve('./build/entries.json');
// eslint-disable-next-line import/no-dynamic-require
const entries = require(entriesFile);

const { log, error } = console;

const paths = {
  scripts: './source/scripts',
  styles: './source/styles',
  liquid: './',
  templates: './templates',
};

const questions = [
  {
    type: 'text',
    name: 'name',
    message: `What is the name? ${chalk.cyan('(Use title case & spaces)')}`,
  },
  {
    type: 'select',
    name: 'type',
    message: 'What type of scaffold would you like to add?',
    choices: [
      { title: 'Component (no markup)', value: 'component' },
      { title: 'Snippet', value: 'snippet' },
      { title: 'Section', value: 'section' },
      { title: 'Template', value: 'template' },
      { title: 'Layout', value: 'layout' },
    ],
    initial: 0,
  },
  {
    type: (prev) => (prev === 'template' ? 'select' : false),
    name: 'templateType',
    message: 'What type of template?',
    choices: [
      { title: 'Page', value: 'page' },
      { title: 'Product', value: 'product' },
      { title: 'Collection', value: 'collection' },
      { title: 'Article', value: 'article' },
      { title: 'Blog', value: 'Blog' },
      { title: 'Manual', value: null },
    ],
  },
  {
    type: 'toggle',
    name: 'includeJs',
    message: 'Include a JS file?',
    initial: (prev, choices) => {
      const defaults = ['component', 'template', 'layout'];
      return defaults.includes(choices.type);
    },
    active: 'yes',
    inactive: 'no',
  },
  {
    type: 'toggle',
    name: 'includeCss',
    message: 'Include a CSS file?',
    initial: (prev, choices) => {
      const defaults = ['snippet', 'section', 'template', 'layout'];
      return defaults.includes(choices.type);
    },
    active: 'yes',
    inactive: 'no',
  },
  {
    type: (prev, choices) => {
      return ['template', 'layout'].includes(choices.type) &&
        (choices.includeJs || choices.includeCss)
        ? 'toggle'
        : false;
    },
    name: 'addEntries',
    message: 'Add Webpack entries?',
    initial: true,
    active: 'yes',
    inactive: 'no',
  },
];

const buildFile = (filename, content = '/* Template created with Granite Scaffold */') => {
  try {
    if (!fs.existsSync(filename)) {
      fs.writeFileSync(filename, `${content}\n`);
      log(chalk.green(`Added ${filename}`));
    } else {
      error(chalk.red(`${filename} already exists.`));
    }
  } catch (err) {
    error(err);
  }
};

const getFile = (filename) => {
  let contents;

  try {
    contents = fs.readFileSync(filename);
  } catch (err) {
    error(err);
  }

  return contents;
};

const addEntry = (filename, entryPath, type = 'js') => {
  if (!entries[type][filename]) {
    entries[type][filename] = entryPath;
    fs.writeFileSync(entriesFile, JSON.stringify(entries, null, 2));
  }
};

const createSchema = (args) => {
  // TODO: Add questions for including this section as a dynamic section
  return `\n
{% schema %}
  {
    "name": "${args.name}",
    "class": "section--${_.kebabCase(args.name.toLowerCase())}",
    "settings": []
  }
{% endschema %}`;
};

const onSubmit = (prompt, answer, answers) => {
  if (!answers.name) {
    log(chalk.red('Name is required'));
    return true;
  }

  return false;
};

const buildScaffold = (args) => {
  const result = {
    fileNames: {},
    errors: [],
  };
  const folderName = args.type === 'layout' ? args.type : `${args.type}s`;
  const folderNameSource = args.type === 'snippet' ? 'components' : folderName;
  const jsName = args.type === 'template' ? _.kebabCase(args.name) : _.camelCase(args.name);
  const cssName = args.type === 'template' ? _.kebabCase(args.name) : _.kebabCase(args.name);
  let filePrefix = args.templateType ? 'template.' : '';

  log(chalk.yellow(`Adding files for a ${args.type} named ${args.name}...`));

  // Add JS file
  if (args.includeJs) {
    result.fileNames.js = `${paths.scripts}/${folderNameSource}/${filePrefix}${jsName}.js`;
    buildFile(result.fileNames.js);
  }

  // Add CSS file
  if (args.includeCss) {
    result.fileNames.css = `${paths.styles}/${folderNameSource}/${filePrefix}${cssName}.css`;
    buildFile(result.fileNames.css);
  }

  // Add entries (where applicable)
  if (args.addEntries) {
    if (args.includeJs) {
      addEntry(`${args.type}.${jsName}`, result.fileNames.js, 'js');
    }
    if (args.includeCss) {
      addEntry(`${args.type}.${cssName}.css`, result.fileNames.css, 'css');
    }
  }

  // Add Liquid file
  if (['snippet', 'section', 'template', 'layout'].includes(args.type)) {
    filePrefix = args.templateType ? `${args.templateType}.` : '';
    let content = '{% comment %} Template created with Granite Scaffold {% endcomment %}\n';

    if (args.type === 'section') {
      content = content.concat(createSchema(args));
    }

    if (args.type === 'template' && args.templateType) {
      const template = getFile(`${paths.templates}/${args.templateType}.liquid`);
      content = content.concat(template);
    }

    result.fileNames.liquid = `${paths.liquid}/${folderName}/${filePrefix}${_.kebabCase(
      args.name
    )}.liquid`;
    buildFile(result.fileNames.liquid, content);
  }

  // Notifications for entries and asset router imports
  if (args.addEntries === false) {
    log(chalk.magenta('ATTENTION: Make sure to manually add any new Webpack entry points'));
  }

  if (args.addEntries) {
    log(
      chalk.magenta(
        'ATTENTION: You must manually add asset-router imports for any JS/CSS files added'
      )
    );
  }

  return result;
};

const scaffoldWizard = async () => {
  const response = await prompts(questions, { onSubmit });

  if (!response.name) return false;

  const result = buildScaffold(response);

  return result;
};

scaffoldWizard();
