(function () {

  /* ── MOBILE NAV TOGGLE ── */
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav    = document.querySelector('[data-nav]');

  function closeNav() {
    if (!nav) return;
    nav.classList.remove('open');
    if (toggle) toggle.innerHTML = '&#9776; Menu';
    document.body.style.overflow = '';
  }

  function openNav() {
    if (!nav) return;
    nav.classList.add('open');
    if (toggle) toggle.innerHTML = '&#10005;&nbsp;Close';
    document.body.style.overflow = 'hidden';
  }

  if (toggle && nav) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.contains('open') ? closeNav() : openNav();
    });

    // Close when any link is tapped (page will navigate)
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => closeNav());
    });

    // Close on outside tap/click
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('open') &&
          !nav.contains(e.target) &&
          !toggle.contains(e.target)) {
        closeNav();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });

    // Close when resizing back to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 960) closeNav();
    });
  }

  /* ── SCROLL FADE-UP ── */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('[data-reveal]').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
      observer.observe(el);
    });
  }

})();
