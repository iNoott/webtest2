// ============ NAV: fondo al hacer scroll + menú móvil ============
(function () {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
})();

// ============ REVEAL ANIMATIONS (Intersection Observer) ============
(function () {
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  items.forEach(item => observer.observe(item));
})();

// ============ PARALLAX (hero + imágenes con data-speed) ============
(function () {
  const heroBg = document.getElementById('heroBg');
  const parallaxImgs = document.querySelectorAll('.parallax-img');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) return;

  let ticking = false;

  function update() {
    const scrollY = window.scrollY;

    if (heroBg) {
      heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
    }

    parallaxImgs.forEach(img => {
      const speed = parseFloat(img.dataset.speed || 0.1);
      const rect = img.parentElement.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      img.style.transform = `translateY(${center * speed * -1}px) scale(1.15)`;
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();
})();

// ============ BOTÓN SUBIR ARRIBA ============
(function () {
  const btn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });
})();

// ============ MODAL DE RESERVAS (CoverManager) ============
(function () {
  const modal = document.getElementById('reservationModal');
  const openBtn = document.getElementById('openReservationModal');
  const closeBtn = document.getElementById('closeReservationModal');
  const overlay = modal.querySelector('[data-close-modal]');

  function openModal() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
})();
