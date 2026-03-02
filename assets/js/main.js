(function () {

  /* ── MOBILE NAV TOGGLE ── */
  const toggle   = document.querySelector('[data-nav-toggle]');
  const nav      = document.querySelector('[data-nav]');
  const brand    = document.querySelector('.brand');          // logo / home link
  const dropdown = nav && nav.querySelector('.dropdown');     // Services dropdown wrapper

  function closeNav() {
    if (!nav) return;
    nav.classList.remove('open');
    if (toggle) toggle.innerHTML = '&#9776;&nbsp;Menu';
    // Also collapse the Services sub-menu
    if (dropdown) dropdown.classList.remove('open');
  }

  function openNav() {
    if (!nav) return;
    nav.classList.add('open');
    if (toggle) toggle.innerHTML = '&#10005;&nbsp;Close';
  }

  if (toggle && nav) {

    /* Hamburger button */
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      nav.classList.contains('open') ? closeNav() : openNav();
    });

    /* Logo / brand — close nav and let the href navigate */
    if (brand) {
      brand.addEventListener('click', function () {
        closeNav();
      });
    }

    /* Services dropdown toggle on mobile */
    if (dropdown) {
      const dropTrigger = dropdown.querySelector(':scope > a');
      if (dropTrigger) {
        dropTrigger.addEventListener('click', function (e) {
          // Only intercept on mobile (nav panel is showing)
          if (window.innerWidth <= 960) {
            e.preventDefault();
            dropdown.classList.toggle('open');
          }
        });
      }

      /* Sub-links: navigate and close everything */
      dropdown.querySelectorAll('.dropdown-panel a').forEach(function (link) {
        link.addEventListener('click', function () {
          closeNav();
        });
      });
    }

    /* All other top-level nav links — close on tap */
    nav.querySelectorAll('a:not(.dropdown-panel a)').forEach(function (link) {
      // Skip the Services trigger (handled above on mobile)
      if (dropdown && dropdown.contains(link) && link === dropdown.querySelector(':scope > a')) return;
      link.addEventListener('click', function () {
        closeNav();
      });
    });

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    /* Close when tapping outside the nav panel */
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') &&
          !nav.contains(e.target) &&
          !toggle.contains(e.target)) {
        closeNav();
      }
    });

    /* Reset when resizing to desktop */
    window.addEventListener('resize', function () {
      if (window.innerWidth > 960) closeNav();
    });
  }

  /* ── SCROLL FADE-UP ── */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
      observer.observe(el);
    });
  }

})();
