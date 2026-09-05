/**
 * MAHI PATEL - MAIN INTERACTION CONTROLLER
 * Handles navigation, scrollspy, reveal animations, and interactive modals.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. MOBILE NAVIGATION DRAWER
  // ------------------------------------------------------------------------
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const navbarNav = document.getElementById('navbarNav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileNavToggle && navbarNav) {
    mobileNavToggle.addEventListener('click', () => {
      const isOpen = navbarNav.classList.toggle('open');
      mobileNavToggle.setAttribute('aria-expanded', isOpen);
      mobileNavToggle.innerHTML = isOpen
        ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close menu when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navbarNav.classList.remove('open');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
        mobileNavToggle.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }

  // ------------------------------------------------------------------------
  // 2. SCROLLSPY (ACTIVE NAV HIGHLIGHTING)
  // ------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (navLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach((l) => l.classList.remove('active'));
          navLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // ------------------------------------------------------------------------
  // 3. INTERSECTION OBSERVER FOR SCROLL REVEAL ANIMATIONS
  // ------------------------------------------------------------------------
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    reveals.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    reveals.forEach((el) => el.classList.add('active'));
  }

  // ------------------------------------------------------------------------
  // 4. CERTIFICATE FILTERING & PDF VIEWER
  // ------------------------------------------------------------------------
  const certFilterBtns = document.querySelectorAll('.cert-filter-btn');
  const certCards = document.querySelectorAll('.certificate-card');

  certFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      certFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      certCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // Handle direct PDF view buttons
  const certViewLinks = document.querySelectorAll('.btn-view-cert');
  certViewLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      // Allow default behavior to open PDF in new tab
      const href = link.getAttribute('href');
      if (href && href !== '#') {
        // Log or show brief confirmation
        console.log('Opening certificate:', href);
      }
    });
  });

  // ------------------------------------------------------------------------
  // 5. PLACEHOLDER URL NOTIFICATION / MODAL HANDLER
  // ------------------------------------------------------------------------
  const placeholderLinks = document.querySelectorAll('[data-placeholder-type]');
  placeholderLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      // If href is still a placeholder hash or empty
      if (!href || href === '#' || href.startsWith('javascript:')) {
        e.preventDefault();
        const type = link.getAttribute('data-placeholder-type');
        const name = link.getAttribute('data-placeholder-name') || 'this project';

        if (window.showToast) {
          if (type === 'github') {
            window.showToast(`🔗 GitHub link placeholder for ${name}. Update with your repo URL!`);
          } else if (type === 'demo') {
            window.showToast(`🚀 Live demo placeholder for ${name}. Update with your live demo URL!`);
          } else if (type === 'social') {
            window.showToast(`✨ Link placeholder ready for your actual profile URL.`);
          }
        }
      }
    });
  });

  // Global ESC key listener to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.querySelector('.modal.open');
      if (modal) modal.classList.remove('open');
    }
  });
});
