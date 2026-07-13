function initBanner() {
  document.querySelectorAll('[data-banner]').forEach((banner) => {
    const key = (banner as HTMLElement).dataset.bannerKey;
    if (key) {
      try {
        if (localStorage.getItem(key) === '1') {
          banner.remove();
          return;
        }
      } catch (e) {}
    }

    const dismiss = banner.querySelector('[data-banner-dismiss]');
    if (dismiss) {
      dismiss.addEventListener('click', () => {
        banner.remove();
        if (key) {
          try {
            localStorage.setItem(key, '1');
          } catch (e) {}
        }
      });
    }
  });
}

function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  document.querySelectorAll('[data-theme-icon-moon]').forEach((el) => {
    el.classList.toggle('hidden', isDark);
  });
  document.querySelectorAll('[data-theme-icon-sun]').forEach((el) => {
    el.classList.toggle('hidden', !isDark);
  });
  document.querySelectorAll('[data-theme-toggle]').forEach((el) => {
    el.setAttribute(
      'aria-label',
      isDark ? 'Switch to light mode' : 'Switch to dark mode',
    );
  });
}

function initThemeToggle() {
  updateThemeIcons();

  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = !document.documentElement.classList.contains('dark');
      document.documentElement.classList.toggle('dark', next);
      try {
        localStorage.setItem('theme', next ? 'dark' : 'light');
      } catch (e) {}
      updateThemeIcons();
    });
  });
}

function initDropdowns() {
  document
    .querySelectorAll<HTMLElement>('[data-dropdown]')
    .forEach((wrapper) => {
      const toggle = wrapper.querySelector('[data-dropdown-toggle]');
      const menu = wrapper.querySelector('[data-dropdown-menu]');
      const chevron = wrapper.querySelector('[data-dropdown-chevron]');
      if (!toggle || !menu) return;

      const setOpen = (open: boolean) => {
        menu.classList.toggle('hidden', !open);
        toggle.setAttribute('aria-expanded', String(open));
        if (chevron) {
          (chevron as HTMLElement).style.transform = open
            ? 'rotate(180deg)'
            : '';
        }
      };

      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = !menu.classList.contains('hidden');
        setOpen(!isOpen);
      });

      document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target as Node)) setOpen(false);
      });

      wrapper.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
          setOpen(false);
          (toggle as HTMLElement).focus();
        }
      });
    });
}

function initMobileMenu() {
  const mobileToggle = document.querySelector('[data-mobile-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const mobileIconOpen = document.querySelector('[data-mobile-icon-open]');
  const mobileIconClose = document.querySelector('[data-mobile-icon-close]');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden', isOpen);
      mobileToggle.setAttribute('aria-expanded', String(!isOpen));
      if (mobileIconOpen) mobileIconOpen.classList.toggle('hidden', !isOpen);
      if (mobileIconClose) mobileIconClose.classList.toggle('hidden', isOpen);
    });
  }
}

function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    'IntersectionObserver' in window
  ) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
}

function initDemoCopy() {
  document.querySelectorAll('.demo-copy-button').forEach((btn) => {
    const originalIcon = btn.querySelector('svg');
    if (!originalIcon) return;

    const checkIcon = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg',
    );
    checkIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    checkIcon.setAttribute('width', '24');
    checkIcon.setAttribute('height', '24');
    checkIcon.setAttribute('viewBox', '0 0 24 24');
    checkIcon.setAttribute('fill', 'none');
    checkIcon.setAttribute('stroke', 'currentColor');
    checkIcon.setAttribute('stroke-width', '2');
    checkIcon.setAttribute('stroke-linecap', 'round');
    checkIcon.setAttribute('stroke-linejoin', 'round');
    const path = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'polyline',
    );
    path.setAttribute('points', '20 6 9 17 4 12');
    checkIcon.appendChild(path);

    let resetTimeout: ReturnType<typeof setTimeout> | undefined;

    btn.addEventListener('click', async () => {
      const text = (btn as HTMLElement).dataset.copy;
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        if (resetTimeout) clearTimeout(resetTimeout);
        const current = btn.querySelector('svg');
        if (current && current !== checkIcon) {
          current.replaceWith(checkIcon);
        }
        resetTimeout = setTimeout(() => {
          checkIcon.replaceWith(originalIcon);
          resetTimeout = undefined;
        }, 2000);
      } catch (e) {
        console.error('Failed to copy:', e);
      }
    });
  });
}

document.addEventListener('astro:page-load', () => {
  initBanner();
  initThemeToggle();
  initDropdowns();
  initMobileMenu();
  initScrollReveal();
  initDemoCopy();
});
