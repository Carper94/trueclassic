import domElementsFound from 'DOM/domElementsFound';

const selectors = {
  card: '[data-card-component]',
  cardLink: '[data-card-link]',
};

/**
 * Initializes click listener and pointer style on inclusive card component
 * @param {NodeList} cards
 */
const supressLinksOnLongMouseDown = (cards) => {
  if (!domElementsFound(cards)) return;

  Array.from(cards).forEach((card) => {
    const cardElement = card;
    cardElement.style.cursor = 'pointer';

    let down;
    let up;
    const link = cardElement.querySelector(selectors.cardLink);

    cardElement.onmousedown = () => {
      down = +new Date();
    };

    cardElement.onmouseup = (event) => {
      up = +new Date();
      const targetType = event.target.nodeName.toLowerCase();
      if (up - down < 200 && targetType !== 'button') {
        link.click();
      }
    };
  });
};

const mediaCard = {
  init: () => {
    const cardElements = document.querySelectorAll(selectors.card);
    if (!domElementsFound(cardElements)) return;
    supressLinksOnLongMouseDown(cardElements);
  },
};

mediaCard.init();

export default mediaCard;
