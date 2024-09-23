function updateBannerHeadings() {
  const screenWidth = window.innerWidth;
  const bannerHeadings = document.getElementsByClassName('responsive-heading');

  // eslint-disable-next-line no-restricted-syntax
  for (const bannerHeading of bannerHeadings) {
    const originalText = bannerHeading.getAttribute('data-original-text');

    if (!originalText) {
      bannerHeading.setAttribute('data-original-text', bannerHeading.innerHTML);
    } else {
      bannerHeading.innerHTML = originalText;
    }

    if (screenWidth <= 769) {
      const newText = bannerHeading.innerHTML.replace('.', '.<br>');
      bannerHeading.innerHTML = newText;
    }
  }
}

updateBannerHeadings();
window.addEventListener('resize', updateBannerHeadings);
