document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS scroll animations if present
  if (typeof AOS !== 'undefined') {
    AOS.init({ once: true, offset: 80, easing: 'ease-out-cubic' });
  }

  // Dynamic Floating Nav pill shrink on scroll
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        nav.style.top = '12px';
        nav.style.width = 'calc(100% - 64px)';
      } else {
        nav.style.top = '20px';
        nav.style.width = 'calc(100% - 48px)';
      }
    }, { passive: true });
  }

  // Mobile Menu Drawer Toggle
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-menu-close');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    });

    const closeMenu = () => {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    if (mobileClose) {
      mobileClose.addEventListener('click', closeMenu);
    }

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // FAQ Accordion Toggle Logic
  document.querySelectorAll('.faq-item').forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        const btn = i.querySelector('.faq-question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Mouse Spotlight Glow Effect
  document.querySelectorAll('.hero-card, .case-study, .service-card, .other-service-card, .how-step, .problem-right, .fit-col, .founder-credential').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Toggle Other Services Expand/Collapse
  const toggleBtn = document.getElementById('toggle-other-services-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const hiddenCards = document.querySelectorAll('.other-service-card.extra-service');
      const isExpanded = toggleBtn.classList.contains('expanded');
      const btnText = toggleBtn.querySelector('.btn-text');
      const chevron = toggleBtn.querySelector('.chevron-icon');

      hiddenCards.forEach(card => {
        if (isExpanded) {
          card.classList.add('hidden');
        } else {
          card.classList.remove('hidden');
        }
      });

      if (isExpanded) {
        toggleBtn.classList.remove('expanded');
        if (btnText) btnText.textContent = btnText.getAttribute('data-text-more') || 'View All Other Services & AI Systems (6 More)';
        if (chevron) chevron.style.transform = 'rotate(0deg)';
      } else {
        toggleBtn.classList.add('expanded');
        if (btnText) btnText.textContent = btnText.getAttribute('data-text-less') || 'Show Fewer Services';
        if (chevron) chevron.style.transform = 'rotate(180deg)';
      }
    });
  }
});
