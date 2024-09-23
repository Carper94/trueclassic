/* eslint-disable no-restricted-globals */
/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable no-loop-func */
// eslint-disable-next-line import/prefer-default-export
export const setSizeGuideListeners = () => {
  const openingModals = document.querySelectorAll('[data-open]');
  const closingModals = document.querySelectorAll('[data-close]');
  const modalLoading = document.querySelector('.modal-loading');
  const modalDialog = document.querySelectorAll('.modal-dialog');
  const tabs = document.querySelectorAll('[role="tab"]');
  const tabPanels = document.querySelectorAll('[role="tabpanel"]');
  const figure = document.querySelector('#size-guide-image');
  const openSecondModal = document.querySelector('#button-virtual-fitting-room');

  const visibility = {
    isVisible: 'is-visible',
    isFading: 'is-fading',
    isShowing: 'is-showing',
  };

  const images = {
    featured: featuredImage,
    fitFinder: 'https://cdn.shopify.com/s/files/1/0220/4008/4552/files/fit-finder-feature-image.png?v=1681763166',
    height: 'https://cdn.shopify.com/s/files/1/0220/4008/4552/files/Mannequin-Height-transparent.png?v=1677271770',
    chest: 'https://cdn.shopify.com/s/files/1/0220/4008/4552/files/Mannequin-Chest-transparent.png?v=1677271772',
    waist: 'https://cdn.shopify.com/s/files/1/0220/4008/4552/files/Mannequin-Waist-transparent.png?v=1677271772',
    hip: 'https://cdn.shopify.com/s/files/1/0220/4008/4552/files/Mannequin-Hip-transparent.png?v=1677271772',
  };

  document.querySelectorAll('.size-mheight').forEach((e) => {
    e.addEventListener('mouseover', () => {
      figure.src = images.height;
    });
  });

  document.querySelectorAll('.size-chest').forEach((e) => {
    e.addEventListener('mouseover', () => {
      figure.src = images.chest;
    });
  });

  document.querySelectorAll('.size-waist').forEach((e) => {
    e.addEventListener('mouseover', () => {
      figure.src = images.waist;
    });
  });

  document.querySelectorAll('.size-hips').forEach((e) => {
    e.addEventListener('mouseover', () => {
      figure.src = images.hip;
    });
  });

  document.querySelectorAll('.size-length').forEach((e) => {
    e.addEventListener('mouseleave', () => {
      figure.src = images.featured;
    });
  });

  tabs.forEach((tab) => {
    tab.addEventListener('click', function tabbing(e) {
      e.preventDefault();
      const target = document.querySelector(this.dataset.href);
      tabPanels.forEach((tabPanels) => tabPanels.classList.remove('active'));
      tabs.forEach((tab) => tab.classList.remove('active'));
      tab.classList.add('active');
      target.classList.add('active');
    });
  });

  openingModals.forEach((opening) => {
    opening.addEventListener('click', function opening(e) {
      e.preventDefault();
      const target = this.dataset.open;
      document.getElementById(target).classList.add(visibility.isVisible);
      modalLoading.classList.add(visibility.isShowing);
      modalDialog.forEach((dialog) => dialog.classList.remove(visibility.isFading));
      setTimeout(() => {
        modalLoading.classList.remove(visibility.isShowing);
        modalDialog.forEach((dialog) => dialog.classList.add(visibility.isFading));
      }, 1500);
    });
  });

  closingModals.forEach((closing) => {
    closing.addEventListener('click', function closing(e) {
      e.preventDefault();
      this.parentElement.parentElement.classList.remove(visibility.isVisible);
      if (e.target === openSecondModal) {
        const closeCurrentModal =
          this.parentElement.parentElement.parentElement.parentElement.parentElement;
        closeCurrentModal.classList.remove(visibility.isVisible);
        setTimeout(() => {
          closeCurrentModal.nextElementSibling.classList.add(visibility.isVisible);
        }, 250);
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (e.target === document.querySelector('.modal-popup.is-visible')) {
      document.querySelector('.modal-popup.is-visible').classList.remove(visibility.isVisible);
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape' && document.querySelector('.modal-popup.is-visible')) {
      document.querySelector('.modal-popup.is-visible').classList.remove(visibility.isVisible);
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const chartCm = document.querySelectorAll('#size-chart-cm .size-length');
    const chartIn = document.querySelectorAll('#size-chart-in .size-length');

    chartIn.forEach((unit, index) => {
      const inches = unit.textContent.trim();
      const inchesAsNumber = parseFloat(inches);

      if (!isNaN(inchesAsNumber)) {
        const centimeters = inchesAsNumber * 2.54;
        chartCm[index].textContent = centimeters.toFixed(2);
      }
    });
    if (window.location.href.includes("/fit-finder") || window.location.href.includes("/calculator")) {
      document.querySelector('.size-guide-image').src = images.fitFinder;
    } else {
      document.querySelectorAll('.size-guide-image').forEach((image) => {
        image.src = images.featured;
      });
    }
  });
}

setSizeGuideListeners();