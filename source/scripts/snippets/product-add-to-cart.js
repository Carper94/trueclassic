// const addToCartButton = document.querySelector('.product-main-form__add-to-cart');

// const handleStickyAddToCartButton = () => {
//   const stickyAddToCartButton = document.querySelector('.sticky-button-wrapper');
//   const buttonBoundingRect = addToCartButton.getBoundingClientRect();
//   const { top, bottom } = buttonBoundingRect;
//   const gorgiasWidget = document.querySelector('#gorgias-chat-container iframe#chat-button');

//   if (top >= 0 && bottom <= window.innerHeight) {
//     stickyAddToCartButton.classList.remove('visible');
//     stickyAddToCartButton.ariaHidden = true;
//     if (gorgiasWidget) {
//       gorgiasWidget.classList.remove('move-gorgias');
//     }
//   } else {
//     stickyAddToCartButton.classList.add('visible');
//     stickyAddToCartButton.ariaHidden = false;
//     if (gorgiasWidget) {
//       gorgiasWidget.classList.add('move-gorgias');
//     }
//   }
// };

// const setupStickyAddToCartButtonListener = () => {
//   if (!addToCartButton) return;
//   document.addEventListener('scroll', handleStickyAddToCartButton);
// };

// setupStickyAddToCartButtonListener();
