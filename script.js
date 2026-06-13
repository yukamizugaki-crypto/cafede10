/* =============================================
   cafe de 10番 – script.js
   ============================================= */

(function () {
  'use strict';

  /* ---- Scroll Reveal ---- */
  const revealEls = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---- Header scroll behaviour ---- */
  const header = document.getElementById('site-header');

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ---- Mobile hamburger / drawer ---- */
  const hamburger    = document.getElementById('hamburger');
  const navDrawer    = document.getElementById('nav-drawer');
  const navOverlay   = document.getElementById('nav-overlay');
  const drawerClose  = document.getElementById('nav-drawer-close');
  const drawerLinks  = document.querySelectorAll('[data-drawer-link]');

  function openDrawer() {
    navDrawer.classList.add('is-open');
    navOverlay.classList.add('is-open');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    navDrawer.classList.remove('is-open');
    navOverlay.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = navDrawer.classList.contains('is-open');
    isOpen ? closeDrawer() : openDrawer();
  });

  drawerClose.addEventListener('click', closeDrawer);
  navOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  document.getElementById('drawer-top').addEventListener('click', closeDrawer);

  /* ---- Smooth scroll with header offset ---- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const targetY = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;

      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });

  /* ---- Active nav link highlighting on scroll ---- */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove('is-active');
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.classList.add('is-active');
            }
          });
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: `-${header.offsetHeight}px 0px -40% 0px`,
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  /* ---- Hero photo subtle parallax on scroll ---- */
  const heroPhotos = document.querySelectorAll('.hero-photo .photo-placeholder');

  if (heroPhotos.length) {
    window.addEventListener(
      'scroll',
      () => {
        const scrollY = window.scrollY;
        const parallaxFactor = scrollY * 0.25;
        heroPhotos.forEach((ph) => {
          ph.style.transform = `translateY(${parallaxFactor}px)`;
        });
      },
      { passive: true }
    );
  }

  /* ---- Announce bar close (optional) ---- */
  // (No close button added, but reserved for future use)



  /* ---- Nav active state CSS class toggle ---- */
  navLinks.forEach((link) => {
    link.addEventListener('click', function () {
      navLinks.forEach((l) => l.classList.remove('is-active'));
      this.classList.add('is-active');
    });
  });

  /* ---- Fade in body on load ---- */
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });

})();
