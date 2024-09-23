const statusInterval = setInterval(() => {
  const statusApp = document.querySelector('#status-app');
  if (statusApp) {
    console.log('Status App loaded')
    document.querySelector('.header-account-icon-mobile').classList.add('active');
    clearInterval(statusInterval);
  }
}, 250);