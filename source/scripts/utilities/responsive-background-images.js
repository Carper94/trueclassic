/**
 * Responsive Background Images Utility
 */
class ResponsiveBackgroundImage {
  constructor(element) {
    this.element = element;
    this.img = element.querySelector('[data-responsive-background-image]');
    this.src = '';
    this.useCssCustomProperty = this.element.hasAttribute('data-use-css-custom-property');

    if (this.img) {
      this.img.addEventListener('load', () => {
        this.update();
      });

      if (this.img.complete) {
        this.update();
      }
    }
  }

  update() {
    const src = typeof this.img.currentSrc !== 'undefined' ? this.img.currentSrc : this.img.src;
    if (this.src !== src) {
      this.src = src;
      const srcString = `url('${this.src}')`;

      if (this.useCssCustomProperty) {
        this.element.style.setProperty('--background-image', srcString);
      } else {
        // this.element.style.backgroundImage = 'url("' + this.src + '")';
        this.element.style.backgroundImage = srcString;
      }
    }
  }
}

function responsiveBackgroundImages() {
  const responsiveBackgroundElements = document.querySelectorAll('[data-responsive-background]');

  for (let i = 0; i < responsiveBackgroundElements.length; i += 1) {
    const backgroundImage = new ResponsiveBackgroundImage(responsiveBackgroundElements[i]);
    backgroundImage();
  }
}

responsiveBackgroundImages();

export default responsiveBackgroundImages;
