/**
 * Scroll-reveal: fade-in + slide-up on first scroll into view.
 * Targets all [data-reveal] elements and .card elements automatically.
 * Respects prefers-reduced-motion.
 */
(function () {
  if (window._revealInstalled) return;
  window._revealInstalled = true;

  function init() {
    // Respect reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('[data-reveal], .card').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // only animate once
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    // Observe [data-reveal] elements
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      // Don't hide elements already in the viewport on load (hero, header)
      if (!el.classList.contains('is-visible')) {
        observer.observe(el);
      }
    });

    // Observe .card elements with staggered delay
    var cards = document.querySelectorAll('.card');
    cards.forEach(function (card, i) {
      // Only add reveal treatment if not already handled via [data-reveal]
      if (!card.hasAttribute('data-reveal')) {
        card.setAttribute('data-reveal', '');
        // Stagger cards within each row (groups of 3 on desktop, 2 on tablet, 1 on mobile)
        card.style.transitionDelay = (i % 3) * 0.1 + 's';
      }
      observer.observe(card);
    });

    // Observe section panels on sub-pages (.panel.left, .panel.right)
    document.querySelectorAll('.panel').forEach(function (el) {
      if (!el.hasAttribute('data-reveal')) {
        el.setAttribute('data-reveal', '');
        observer.observe(el);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
