/**
 * This function hits a server endpoint that will trigger a Klaviyo Back in Stock email
 * @param {int} variantId
 * @param {string} email
 * @param {bool} checked
 */
export const subscribeToBIS = async (variantId, email, checked) => {
  const klaviyoUrl = `https://desolate-retreat-20480.herokuapp.com/back-in-stock`;
  await fetch(klaviyoUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, variantId, checked }),
  });
};

/**
 * Initializes the Klaviyo Back In Stock button
 * and sets listeners for the modal
 */
export const triggerKlaviyoBIS = () => {
  const button = document.querySelector('.sr-bis-btn');
  const modal = document.querySelector('.klaviyo-bis-modal.sr-bis');
  const overlay = document.querySelector('.sr-bis-overlay');
  const submit = document.querySelector('.sr-bis .btn-success');
  const close = document.querySelector('.sr-bis .close.klaviyo-bis-close');
  button.style.display = 'inline-block';

  button?.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'block';
    overlay.style.display = 'block';
  });

  submit?.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('bis-email').value;
    const { checked } = document.getElementById('subscribe_for_newsletter');
    const { variantId } = modal.dataset;
    await subscribeToBIS(variantId, email, checked);
    modal.style.display = 'none';
    overlay.style.display = 'none';
  });

  close?.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'none';
    overlay.style.display = 'none';
  });
};
