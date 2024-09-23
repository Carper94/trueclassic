/**
 * This module looks for script tags on the page containing JSON data created
 * by Liquid logic. Set up your tags as such:
 *
 * <script type="application/json" data-liquid-json="jsonLabel">{ Your JSON here }</script>
 *
 * This allows you to easily pass data from Liquid (schema or objects) to
 * your JS logic. Make sure to use unique labels for each tag.
 */
const jsonElements = document.querySelectorAll('[data-liquid-json]');
const liquidJSON = {};

if (jsonElements) {
  jsonElements.forEach((element) => {
    if (!element.dataset.liquidJson) return;
    liquidJSON[element.dataset.liquidJson] = JSON.parse(element.innerHTML);
  });
}

export default liquidJSON;
