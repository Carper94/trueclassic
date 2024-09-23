# True Classic - Custom Shopify Theme

## :cop: Developing features

```
git switch dev
git pull
git checkout -b type/new-feature
git push -u origin type/new-feature:type/new-feature
git config pull.rebase false
```

work of feature, created separate commits for updates (to be comprehensive and understandable by others developers), then

```
git switch dev
git pull
git switch type/new-feature
git merge dev
```

QA your work, and if working as expected, [create a PR](https://github.com/trueclassic/true-classic/compare) type/new-feature > dev

## :mage: Workflow Overview

_Theme development utilizing [Shopify CLI for themes](https://shopify.dev/themes/tools/cli) and [Webpack](https://webpack.js.org/)_
The Shopify CLI handles code synchronization between Shopify and local files, while Webpack provides a clean and fast build process for JS & CSS code, and SVG icons & graphics. Out of the box, we also include [PostCSS](https://postcss.org/), [Babel JS](https://babeljs.io/), and [ESLint](https://eslint.org/). The build process is highly extendable, and designed to be a starting point for new projects.

## :classical_building: Requirements

- A Package Manager - We recommend [NPM](https://www.npmjs.com/) using [NVM](https://github.com/nvm-sh/nvm)
- Node 18

## :building_construction: Workflow Setup

1. Install all [requirements](#:classical_building:-Requirements) according to their instructions (you probably already have these).
2. Run `npm i` to install all dependencies.
3. Run `npm run login` to log into the store via the Shopify CLI

## :factory: Workflow

Once you've finished setup for the project, you can begin development.
To start the build process (Webpack) and development server simultaneously, run:

```sh
npm run dev
```

Assets from the `source` folder are built to `assets`, i.e. `assets/layout.theme.js` is compiled from `source/scripts/layout/layout.theme.js`.

Entry points may be found in the `layouts` and `templates` folders.

With this pipeline, JS and CSS files can be imported and compiled into larger bundles.

Example:
`source/scripts/snippets/accordion.js` => `source/scripts/layout/layout.theme.js` => `assets/layout.theme.js`

### :scissors: Admin Snippets

To facilitate consistency across projects and to reduce errors, the project includes an `./admin` [subfolder](admin) where dashboard code snippets and Shopify Scripts can be stored for durability and record-keeping. More information can be found in [./admin/README.md](admin/README.md)
