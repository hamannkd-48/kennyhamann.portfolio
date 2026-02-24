// Shared nav behavior: toggle + click-away for mobile
if (!window._navBehaviorInstalled) {
  window._navBehaviorInstalled = true;

  (function () {
    function init() {
      const hamburger = document.querySelector('.hamburger');
      const navMenu = document.querySelector('.nav-menu');
      if (!hamburger || !navMenu) return;

      // Accessibility
      hamburger.setAttribute('aria-expanded', 'false');

      function updateMenuVisibility() {
        if (window.innerWidth > 768) {
          navMenu.classList.remove('active');
          navMenu.style.display = 'flex';
          hamburger.style.display = 'none';
          hamburger.setAttribute('aria-expanded', 'false');
        } else {
          // if previously opened keep it; otherwise hide
          if (!navMenu.classList.contains('active')) navMenu.style.display = 'none';
          hamburger.style.display = 'block';
        }
      }

      function openMenu() {
        navMenu.classList.add('active');
        navMenu.style.display = 'flex';
        hamburger.setAttribute('aria-expanded', 'true');
      }

      function closeMenu() {
        navMenu.classList.remove('active');
        navMenu.style.display = 'none';
        hamburger.setAttribute('aria-expanded', 'false');
      }

      hamburger.addEventListener('click', function (e) {
        e.stopPropagation();
        if (navMenu.classList.contains('active')) closeMenu();
        else openMenu();
      });

      // Prevent clicks inside the nav from closing it
      navMenu.addEventListener('click', function (e) { e.stopPropagation(); });

      // Click-away handler
      document.addEventListener('click', function () {
        if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
          closeMenu();
        }
      });

      // Close on Escape
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
      });

      // Keep things in sync on resize
      window.addEventListener('resize', updateMenuVisibility);

      // initial
      updateMenuVisibility();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
  })();
}
