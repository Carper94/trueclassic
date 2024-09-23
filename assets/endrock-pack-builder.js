/* eslint-disable */
function erPackBuilderOpen() {
  document.querySelector('.section-endrock-pack-builder').classList.add('active');
  document.body.classList.add('overflow-hidden');
}

// Handle overlay click
const packBuilderOverlay = document.getElementById('shopify-section-endrock-pack-builder');
packBuilderOverlay.addEventListener('click', (event) => {
  if (event.target.classList.contains('active') && !event.target.closest('.endrock-pack-builder')) {
    erPackBuilderClose();
  }
});

function erPackBuilderClose() {
  document.querySelector('.section-endrock-pack-builder').classList.remove('active');
  document.body.classList.remove('overflow-hidden');
}

function changeToggle() {
  document.querySelector('input[name="js-size-toggle"]').click();
}
class EndrockPackBuilder extends HTMLElement {
  constructor() {
    super();
    const closeButton = this.querySelector('#endrock-pack-builder__button-close');
    closeButton.addEventListener('click', () => erPackBuilderClose());

    // Pack size selectors
    this.packSelectors = this.querySelectorAll('input[name="er_pack_builder_size"]');
    // Pack size
    this.packSizeUpper = this.querySelector('.js-current-pack-size');
    this.packSizeImages = this.querySelector('.js-size');
    // Pack upgrade
    this.packUpgradeWrapper = this.querySelector('.pack-upgrade');
    this.packUpgradeButton = this.querySelector('.js-pack-upgrade-button');
    this.packUpgradeSize = this.querySelector('.js-pack-upgrade');
    // Subtotal
    this.subtotal = this.querySelector('.js-pack-builder-subtotal');
    // Info box
    this.infoButton = this.querySelector('.js-info-button');
    this.infoButtonClose = this.querySelector('.js-info-button-close');
    this.infoBox = this.querySelector('.pack-upgrade__info-box');
    // Size selectors
    this.sizeSelectors = this.querySelectorAll('.js-er-variant-select');
    this.sizeToggle = this.querySelector('input[name="js-size-toggle"]');
    this.sizeGlobalSelector = this.querySelector('.js-er-global-variant-select');
    this.sizeTitle = this.querySelector('.size-title');
    this.sizeToggleTitle = this.querySelector('.size-toggle-switch-title');
    // Custom selects
    this.colorSelectors = this.querySelectorAll('.js-er-pack-builder-color');
    this.colorSelects = this.querySelectorAll('.js-pack-builder-custom-select');
    this.colors = this.querySelectorAll('.custom-select-color');
    // Scrolls
    this.sizeSelectorScroll = this.querySelector('.size-selector');
    this.customSelectItemsScroll = this.querySelectorAll('.custom-select-items');
    // Add to cart
    this.addToCartButton = this.querySelector('.js-pack-builder-atc');

    // Event listeners
    this.packSelectors.forEach((selector) => {
      selector.addEventListener('change', () => this.changePackSize(selector));
    });
    this.packUpgradeButton.addEventListener('click', () => this.upgradePack());
    this.infoButton.addEventListener('click', () => this.openInfo());
    this.infoButtonClose.addEventListener('click', () => this.openInfo());
    this.sizeToggle.addEventListener('change', () => this.sizeToggleChange());
    this.sizeGlobalSelector.addEventListener('change', () => this.changeAllSizes());
    this.colorSelects.forEach((selector) => {
      selector.addEventListener('click', () => this.customSelector(selector));
    });
    this.colors.forEach((colorSelector) => {
      colorSelector.addEventListener('click', () => this.selectColor(colorSelector));
    });
    this.sizeSelectorScroll.addEventListener('scroll', () => this.checkScroll(this.sizeSelectorScroll));
    this.customSelectItemsScroll.forEach(element => {
      element.addEventListener('scroll', () => this.checkScroll(element));
    });
    this.sizeSelectors.forEach((select) => {
      select.addEventListener('change', () => this.changeTeeSize());
    });
    this.addToCartButton.addEventListener('click', () => this.addToCart(this.addToCartButton));

    this.setDefaults();
  }

  changePackSize(selector) {
    const size = selector.getAttribute('data-count');
    const oldPrice = selector.getAttribute('data-old-price');
    const newPrice = selector.getAttribute('data-new-price');
    const pricePerItem = selector.getAttribute('data-price-per-item');
    const testPId = selector.getAttribute('data-product-id');
    const testVId = selector.getAttribute('data-variant-id');
    // Change frontend values
    this.packSizeUpper.innerHTML = `${size}-pack`;
    this.subtotal.innerHTML = `
      <div>
        <div>Subtotal</div>
        <div class='subtotal-price-per-item igInstallmentPrice' data-payment-count='${size}' data-product-id='${testPId}' data-variant-id='${testVId}'>${pricePerItem}/item</div>
      </div>
      <div><s class='igComparePrice' data-product-id='${testPId}' data-variant-id='${testVId}'>${oldPrice}</s><span class='igPrice' data-product-id='${testPId}' data-variant-id='${testVId}'>${newPrice}</span></div>
    `;
    this.packSizeImages.innerHTML = size;
    this.packUpgradeSize.innerHTML = `${Number(size) + 3}`;
    if (size == 12) {
      this.packUpgradeWrapper.classList.add('hidden');
    } else {
      this.packUpgradeWrapper.classList.remove('hidden');
    }
    // Activate color selectors
    this.colorSelectors.forEach(el => el.classList.remove('active'));
    for (let index = 0; index < size; index++) {
      this.colorSelectors[index].classList.add('active');
    }
    this.updateImages();

    if (!this.sizeToggle.checked) {
      this.checkIfSizesAvailable();
    }
  }

  upgradePack() {
    const currentActive = this.querySelector('input[name="er_pack_builder_size"]:checked');
    if (!currentActive) return;
    currentActive.nextElementSibling.nextElementSibling.click();

    if (!this.sizeToggle.checked) {
      this.checkIfSizesAvailable();
    }
  }

  openInfo() {
    if (this.infoBox.getAttribute('open') === 'true') {
      this.infoBox.classList.remove('open');
      this.infoBox.removeAttribute('open');
      return;
    }
    this.infoBox.classList.add('open');
    this.infoBox.setAttribute('open', true);
  }

  sizeToggleChange() {
    this.sizeSelectors.forEach((select) => {
      if (this.sizeToggle.checked) {
        select.classList.remove('hidden');
        this.sizeTitle.classList.remove('hidden');
        this.sizeGlobalSelector.disabled = true;
        this.addToCartButton.disabled = false;
        document.getElementById('er-packbuilder-notice').style.display = 'none';
      } else {
        select.classList.add('hidden');
        this.sizeTitle.classList.add('hidden');
        this.sizeGlobalSelector.disabled = false;
        this.checkIfSizesAvailable();
      }
    });

    this.updateImages();
  }

  checkIfSizesAvailable() {
    const selectedItems = this.querySelectorAll('.js-er-pack-builder-color.active');
    const globalSize = this.querySelector('.js-er-global-variant-select').value
    let disableAddpack = false
    let counter = 0

    const all = window.erPackBuilderProducts

    selectedItems.forEach((item) => {

      const colorId = item.querySelector('[name]').value

      all.forEach((option) => {

        if(option.id == colorId) {
          // if they are equal we are on the correct variant

          const optionVariants = option.variants

          for(let i = 0; i < optionVariants.length; i++) {
            if(optionVariants[i].title === globalSize) {
              counter++
            }
          }

        }
      })
    })
    if(counter !== selectedItems.length) {
      disableAddpack = true;
      document.getElementById('er-packbuilder-notice').style.display = 'block';
      document.getElementById('er-packbuilder-notice').querySelector('.js-notice-size').innerHTML = globalSize;
    } else {
      document.getElementById('er-packbuilder-notice').style.display = 'none';
    }
    document.querySelector('.endrock-pack-builder__footer button').disabled = disableAddpack;
  }

  changeAllSizes() {

    const sizeText = this.sizeGlobalSelector.options[this.sizeGlobalSelector.selectedIndex].text;
    this.sizeSelectors.forEach((select) => {
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].text === sizeText) {
          select.selectedIndex = this.sizeGlobalSelector.selectedIndex;
        }
      }
    });
    this.updateImages();

    if (!this.sizeToggle.checked) {
      this.checkIfSizesAvailable();
    }
  }

  changeTeeSize() {
    this.updateImages();
  }

  customSelector(element) {
    // Set open
    const index = element.getAttribute('data-index');
    const colorsContainer = this.querySelector(`.custom-select-items[data-index="${index}"]`);
    if (colorsContainer.getAttribute('open') === 'true') {
      colorsContainer.removeAttribute('open');
      colorsContainer.classList.remove('active');
      return;
    }
    // Remove open from all other elements
    this.customSelectItemsScroll.forEach(el => {
      el.classList.remove('active');
      el.removeAttribute('open');
    });
    colorsContainer.setAttribute('open', true);
    colorsContainer.classList.add('active');
  }

  selectColor(colorSelector) {
    if (colorSelector.hasAttribute('active')) return; // if already active, do nothing

    // Set active element
    const parent = colorSelector.parentNode;
    const allColorsContainer = parent.querySelectorAll('.custom-select-color');
    allColorsContainer.forEach(el => {
      el.classList.remove('active');
      el.removeAttribute('active');
    });
    colorSelector.classList.add('active');
    colorSelector.setAttribute('active', true);
    // Get id of selected color/product
    const productId = colorSelector.getAttribute('value');
    // Get hidden color selector
    const closestCustomSelect = colorSelector.closest('.custom-select-items');
    if(!closestCustomSelect) return;
    const dataIndex = closestCustomSelect.getAttribute('data-index');
    const colorSelect = this.querySelector(`select[data-index="${dataIndex}"]`);
    // Change hidden color selector value
    for (let i = 0; i < colorSelect.options.length; i++) {
      if (colorSelect.options[i].value == productId) {
        colorSelect.selectedIndex = i;
        break;
      }
    }
    this.changeColor(colorSelect);
    if (!this.sizeToggle.checked) {
      this.checkIfSizesAvailable();
    }
  }

  changeColor(colorSelect) {
    // Get id of selected color/product
    const productId = colorSelect.value;
    // Get variants to change options ids
    const productFound = window.erPackBuilderProducts.find(product => product.id == productId);
    let variants = productFound?.variants;
    // Ensure variant is available
    variants = variants.filter(variant => variant.available === true);
    // Get size selector
    const sizeSelector = colorSelect.nextElementSibling.nextElementSibling;
    if (!sizeSelector) return;
    const currentSelectedValue = sizeSelector.value;
    sizeSelector.innerHTML = '';
    // Define new options
    const newOptions = [];
    variants.forEach(variant => {
      newOptions.push({ variantId: variant.id, text: variant.title });
    });
    // Create and append new options
    newOptions.forEach(option => {
      const newOption = document.createElement('option');
      newOption.value = option.text;
      newOption.text = option.text;
      newOption.setAttribute('data-variant-id', option.variantId);
      sizeSelector.appendChild(newOption);
    });
    // Keep selected value on options change
    for (let i = 0; i < sizeSelector.options.length; i++) {
      if (sizeSelector.options[i].value === currentSelectedValue) {
        // Set the selected attribute for the matching option
        sizeSelector.selectedIndex = i;
        break; // Exit the loop once the option is selected
      }
    }
    // Change box color
    const colorBox = colorSelect.previousElementSibling;
    if (!colorBox) return;
    const selectedColorText = colorSelect.options[colorSelect.selectedIndex].text;
    const colorFound = window.erPackBuilderColors.find(colorObj => colorObj.tColor === selectedColorText);
    let hexColor = '#000'; // Default to black if not found
    if (colorFound) {
      hexColor = colorFound.color;
    }
    colorBox.style.background = hexColor;
    // Change custom selector text
    const customSelector = colorSelect.nextElementSibling;
    if (!customSelector) return;
    customSelector.innerHTML = selectedColorText;
    // Close selectors
    this.customSelectItemsScroll.forEach(el => {
      el.classList.remove('active');
      el.removeAttribute('open');
    });
    this.updateImages();
    if (!this.sizeToggle.checked) {
      this.checkIfSizesAvailable();
    }
  }

  updateImages() {
    let colorsSelected = [];
    const colors = this.querySelectorAll('.js-er-pack-builder-color.active');
    colors.forEach(color => {
      const select = color.querySelector('[name^="color_"]');
      const selectedOption = select.options[select.selectedIndex];
      const productId = selectedOption.value;
      const sizeSelect = color.querySelector('[name^="size_"]');
      const sizeSelectedOption = sizeSelect.options[sizeSelect.selectedIndex];
      // Check if size Exists
      if (sizeSelectedOption) {
        const size = sizeSelectedOption.text;
        const image = window.erPackBuilderProducts.find(product => product.id == productId).images[0];
        colorsSelected.push({
          productId: productId,
          size: size,
          image: image
        });
      }
    });

    // Set images and qty
    const imagesWrapper = this.querySelector('.pack-content-images');
    if (!imagesWrapper) return;
    const images = imagesWrapper.querySelectorAll('.image');
    images.forEach(el => el.classList.remove('active'));
    for (let index = 0; index < colorsSelected.length; index++) {
      images[index].querySelector('img').src = `${colorsSelected[index].image}&width=100`;
      images[index].querySelector('.count-badge').innerHTML = colorsSelected[index].size;
      images[index].classList.add('active');
    }
  }

  checkScroll(element) {
    const scrollableWidth = element.scrollWidth - element.clientWidth;

    // Check if the right border is reached
    if (element.scrollLeft >= scrollableWidth) {
      element.parentElement.classList.remove('scroll-gradient');
    } else {
      // Add the scroll gradient if it was previously removed
      element.parentElement.classList.add('scroll-gradient');
    }
  }

  removePreviousPack(button) {
    return new Promise(async (resolve, reject) => {
      try {
        const buttonText = button.querySelector('span');
        buttonText.innerHTML = 'Adding...';
        button.disabled = true;
        const response = await fetch('/cart.js');
        const jsonResponse = await response.json();

        const filteredItems = jsonResponse.items.filter(item => {
          return item.properties && item.properties._bundle === 'custom_pack_builder';
        });

        if (filteredItems.length === 0) {
          resolve(true);
          return;
        }

        let updates = {};
        filteredItems.forEach(lineItem => {
          updates[lineItem.id] = 0;
        });

        const updateResponse = await fetch('/cart/update.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ updates })
        });

        if (!updateResponse.ok) {
          throw new Error(`HTTP error! status: ${updateResponse.status}`);
        }

        const updateJsonResponse = await updateResponse.json();
        console.log('Items deleted from cart:', updateJsonResponse);
        resolve(true);
      } catch (error) {
        console.error('Error deleting items from cart:', error);
        buttonText.innerHTML = 'Add to cart';
        button.disabled = false;
        reject(false);
      }
    });
  }

  async addToCart(button) {
    const result = await this.removePreviousPack(button);

    if (!result) return;

    const buttonText = button.querySelector('span');
    buttonText.innerHTML = 'Adding...';
    button.disabled = true;

    const packId = (Date.now()+'').substring(6)
    const packType = document.querySelector(`[name="er_pack_builder_size"]:checked`).getAttribute('data-count')

    let selectedItems = [];
    const colors = this.querySelectorAll('.js-er-pack-builder-color.active');
    colors.forEach(color => {
      const select = color.querySelector('.js-er-variant-select');
      const selectedOption = select.options[select.selectedIndex];
      const variantId = selectedOption.getAttribute('data-variant-id');
      selectedItems.push({
        id: variantId,
        quantity: 1,
        properties: {
          _bundle: 'custom_pack_builder',
          _pack_category: 'crews',
          _pack_type: packType,
          _pack_id: packId
        }
      });
    });
    const updatedArray = this.updateDuplicates(selectedItems);
    const requestBody = {
      items: updatedArray
    };
    fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      response.json()
    })
    .then(() => {
      document.dispatchEvent(new Event('cartaddsuccess'));
      erPackBuilderClose();
      buttonText.innerHTML = 'Add to cart';
      button.disabled = false;
    })
    .catch(error => {
      buttonText.innerHTML = 'Add to cart';
      button.disabled = false;
      console.error('Error adding item to cart:', error);
    });
  }

  updateDuplicates(arr) {
    const map = {}; // Map to keep track of IDs and their counts

    // Iterate through the array to count duplicates
    arr.forEach(item => {
      const { id } = item;
      if (map[id]) {
        map[id].quantity += 1; // Increment quantity for duplicates
      } else {
        map[id] = { ...item }; // Store the first occurrence of an ID
        map[id].quantity = 1; // Initialize quantity for the ID
      }
    });

    // Convert the map values back to an array
    const result = Object.values(map);
    return result;
  }

  setDefaults() {
    const allColorsContainer = this.customSelectItemsScroll;
    if (!allColorsContainer) return;
    for (let index = 0; index < 6; index++) {
      if (index === 0) {
        const militaryGreen = allColorsContainer[index].querySelector('.custom-select-color[value="3891596951624"]');
        militaryGreen.click()
      }
      if (index === 1) {
        const blackColor = allColorsContainer[index].querySelector('.custom-select-color[value="3891534561352"]');
        blackColor.click();
      }
      if (index === 2) {
        const whiteColor = allColorsContainer[index].querySelector('.custom-select-color[value="3891505496136"]');
        whiteColor.click();
      }
      if (index === 3) {
        const navyColor = allColorsContainer[index].querySelector('.custom-select-color[value="3891553173576"]');
        navyColor.click();
      }
      if (index === 4) {
        const heatherGray = allColorsContainer[index].querySelector('.custom-select-color[value="4262293569608"]');
        heatherGray.click();
      }
      if (index === 5) {
        const carbonColor = allColorsContainer[index].querySelector('.custom-select-color[value="6587014250568"]');
        carbonColor.click();
      }
    }
  }
}

customElements.define('endrock-pack-builder', EndrockPackBuilder);

class EndrockPackBuilderRemove extends HTMLElement {
  constructor() {
    super();
    this.deleteButton = this.querySelector('button');
    this.deleteButton.addEventListener('click', () => {
      this.removePack();
    });
  }

  removePack() {
    const dataIds = this.deleteButton.getAttribute('data-ids');
    this.closest('.cart-line-item.endrock-pack-builder-item').classList.add('cart-item__loading');
    let numbersArray = dataIds.split(',').filter(item => item.trim() !== '');
    let updates = {};
    numbersArray.forEach((id) => {
      updates[id] = 0
    });
    this.deleteLineItems(updates);
  }

  deleteLineItems(updates) {
    fetch('/cart/update.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ updates })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      response.json()
    })
    .then(() => {
      document.dispatchEvent(new Event('cartaddsuccess'));
    })
    .catch(error => {
      console.error('Error deleting items from cart:', error);
    });
  }
}

customElements.define('endrock-pack-builder-remove', EndrockPackBuilderRemove);
