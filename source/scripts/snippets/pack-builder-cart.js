function handleCartToggleButtonClick(e) {
  if (e.target.dataset.delegate === 'packbuildercarttoggle') {
    const packBuilderCartListWrapper = document.querySelector('.pack-builder-cart__list-wrapper');
    packBuilderCartListWrapper.classList.toggle('active');
    e.target.classList.toggle('active');
    if (e.target.ariaExpanded === true) {
      e.target.setAttribute('aria-expanded', false);
    } else {
      e.target.setAttribute('aria-expanded', true);
    }
  }
}

document.addEventListener('click', handleCartToggleButtonClick);
