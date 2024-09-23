const gorgiasLinkBtn = document.querySelector('.gorgias-link-button');
let isOpen = false;

const openGorgias = () => {
  window.GorgiasChat.init().then(() => {
    window.GorgiasChat.open();
    isOpen = true;
  });
};

const closeGorgias = () => {
  window.GorgiasChat.init().then(() => {
    window.GorgiasChat.close();
    isOpen = false;
  });
};

if (gorgiasLinkBtn) {
  gorgiasLinkBtn.addEventListener(
    'click',
    () => {
      if (isOpen) {
        closeGorgias();
      } else {
        openGorgias();
      }
    },
    false
  );
}
