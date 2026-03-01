(function () {
  // Mobile nav toggle
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.textContent = open ? '✕ Close' : '☰ Menu';
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('open');
        toggle.textContent = '☰ Menu';
      }
    });
  }

  // Fade-up on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-reveal]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    observer.observe(el);
  });

  document.addEventListener('scroll', () => {}, { passive: true });

  // Make data-reveal elements visible
  document.querySelectorAll('[data-reveal].visible').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });

  // Simpler approach: watch for class change
  const mo = new MutationObserver((mutations) => {
    mutations.forEach(m => {
      if (m.target.classList.contains('visible')) {
        m.target.style.opacity = '1';
        m.target.style.transform = 'none';
      }
    });
  });
  document.querySelectorAll('[data-reveal]').forEach(el => {
    mo.observe(el, { attributes: true, attributeFilter: ['class'] });
  });
})();
