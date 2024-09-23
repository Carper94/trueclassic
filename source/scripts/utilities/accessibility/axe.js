/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

const useAxe = window?.Shopify?.theme?.role === 'development';

const log = (v) => {
  v.nodes.forEach((node) => {
    node.target.forEach((target) => {
      console.groupCollapsed('element');
      console.log(document.querySelector(target));
      console.groupEnd();
    });
  });
  console.log(v.helpUrl);
};

if (useAxe) {
  (async function () {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.3.5/axe.min.js';
    document.head.appendChild(script);
    script.addEventListener('load', async () => {
      const { axe } = window;
      const results = await axe.run();
      if (results.violations.length) {
        results.violations.forEach((v) => {
          if (v.impact === 'serious' || v.impact === 'critical') {
            console.groupCollapsed(`${v.impact} accessibility issue`);
            console.error(v.help);
            log(v);
            console.groupEnd();
          }
          if (v.impact === 'moderate' || v.impact === 'minor') {
            console.groupCollapsed(`${v.impact} accessibility issue`);
            console.log(v.help);
            log(v);
            console.groupEnd();
          }
        });
      }
    });
  })();
}
