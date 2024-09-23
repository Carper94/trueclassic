const pages = document.querySelectorAll('.pagination .page a');
if (pages.length) {
  pages.forEach((page) => {
    const pageNumber = `Go To Page ${page.innerHTML}`;
    page.setAttribute('aria-label', pageNumber);
  });
  const currentPage = document.querySelector('.pagination .page.current');
  const currentPageNumber = `Current Page, Page ${currentPage.innerHTML}`;
  currentPage.setAttribute('aria-label', currentPageNumber);
  currentPage.setAttribute('aria-current', 'true');
  currentPage.setAttribute('role', 'page');
  currentPage.setAttribute('tabindex', 0);
}
