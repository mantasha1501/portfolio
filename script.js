document.addEventListener('DOMContentLoaded', () => {
  const navButtons = document.querySelectorAll('.nav-btn');
  const pageViews = document.querySelectorAll('.page-view');
  const srAnnouncer = document.getElementById('sr-announcer');

  // SPA View Routing System
  function navigateTo(pageId) {
    pageViews.forEach(page => {
      page.hidden = true;
      page.classList.remove('active');
    });

    navButtons.forEach(btn => {
      btn.classList.remove('active');
      btn.removeAttribute('aria-current');
    });

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.hidden = false;
      targetPage.classList.add('active');

      const activeNavBtns = document.querySelectorAll(`.nav-btn[data-page="${pageId}"]`);
      activeNavBtns.forEach(btn => {
        if (btn.classList.contains('nav-btn')) {
          btn.classList.add('active');
          btn.setAttribute('aria-current', 'page');
        }
      });

      // Announce route updates for accessibility/screen readers
      const pageHeading = targetPage.querySelector('h2')?.textContent || pageId;
      srAnnouncer.textContent = `Navigated to ${pageHeading}`;
    }
  }

  // Attach Navigation Click Events
  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pageId = e.currentTarget.getAttribute('data-page');
      if (pageId) navigateTo(pageId);
    });
  });
});