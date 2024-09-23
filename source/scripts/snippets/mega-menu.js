/* eslint-disable consistent-return */
window.addEventListener('DOMContentLoaded', () => {
  const megaMenu = document.getElementById('mega-menu');
  const navLinks = document.querySelectorAll('.header-left a');
  const areaSelectors = ['.header-left', '#mega-menu', '.header-wrapper'];

  const shopAllTrigger = document.querySelector('.header-left a');

  const navLinksArr = Array.from(navLinks);
  navLinksArr.shift();

  const navAreaElements = areaSelectors.map((selector) => {
    return document.querySelector(selector);
  });

  const handleMouseEnter = () => {
    megaMenu.classList.add('mm-show');
  };

  const handleMouseMove = (e) => {
    const isOverNavArea = navAreaElements.some((navArea) => {
      return navArea.contains(e.target);
    });

    if (!isOverNavArea) {
      megaMenu.classList.remove('mm-show');
    } else if (navLinksArr.some((link) => link.contains(e.target))) {
      megaMenu.classList.remove('mm-show');
    } else {
      return;
    }
    megaMenu.classList.remove('mm-show');
  };

  const handleMouseLeave = () => {
    document.addEventListener('mousemove', (e) => handleMouseMove(e));
  };

  shopAllTrigger?.addEventListener('mouseenter', handleMouseEnter);
  shopAllTrigger?.addEventListener('mouseleave', handleMouseLeave);

  window.onbeforeunload = () => {
    shopAllTrigger?.removeEventListener('mouseenter', handleMouseEnter);
    shopAllTrigger?.removeEventListener('mouseleave', handleMouseLeave);
    document.removeEventListener('mousemove', (e) => handleMouseMove(e));
  };
  if (!document.getElementById('mega-menu')) {
    return false;
  }
});
