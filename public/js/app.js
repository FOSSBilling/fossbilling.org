(function () {
  'use strict';

  // Banner dismiss
  document.querySelectorAll('[data-banner]').forEach(function (banner) {
    var key = banner.dataset.bannerKey;
    if (key) {
      try {
        if (localStorage.getItem(key) === '1') {
          banner.remove();
          return;
        }
      } catch (e) {}
    }

    var dismiss = banner.querySelector('[data-banner-dismiss]');
    if (dismiss) {
      dismiss.addEventListener('click', function () {
        banner.remove();
        if (key) {
          try {
            localStorage.setItem(key, '1');
          } catch (e) {}
        }
      });
    }
  });

  // Theme toggle
  function updateThemeIcons() {
    var isDark = document.documentElement.classList.contains('dark');
    document.querySelectorAll('[data-theme-icon-moon]').forEach(function (el) {
      el.classList.toggle('hidden', isDark);
    });
    document.querySelectorAll('[data-theme-icon-sun]').forEach(function (el) {
      el.classList.toggle('hidden', !isDark);
    });
    document.querySelectorAll('[data-theme-toggle]').forEach(function (el) {
      el.setAttribute(
        'aria-label',
        isDark ? 'Switch to light mode' : 'Switch to dark mode',
      );
    });
  }

  updateThemeIcons();

  document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = !document.documentElement.classList.contains('dark');
      document.documentElement.classList.toggle('dark', next);
      try {
        localStorage.setItem('theme', next ? 'dark' : 'light');
      } catch (e) {}
      updateThemeIcons();
    });
  });

  // Dropdown menus
  document.querySelectorAll('[data-dropdown]').forEach(function (wrapper) {
    var toggle = wrapper.querySelector('[data-dropdown-toggle]');
    var menu = wrapper.querySelector('[data-dropdown-menu]');
    var chevron = wrapper.querySelector('[data-dropdown-chevron]');
    if (!toggle || !menu) return;

    function setOpen(open) {
      menu.classList.toggle('hidden', !open);
      toggle.setAttribute('aria-expanded', String(open));
      if (chevron) chevron.style.transform = open ? 'rotate(180deg)' : '';
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = !menu.classList.contains('hidden');
      setOpen(!isOpen);
    });

    document.addEventListener('click', function (e) {
      if (!wrapper.contains(e.target)) setOpen(false);
    });

    wrapper.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
        setOpen(false);
        toggle.focus();
      }
    });
  });

  // Mobile menu
  var mobileToggle = document.querySelector('[data-mobile-toggle]');
  var mobileMenu = document.querySelector('[data-mobile-menu]');
  var mobileIconOpen = document.querySelector('[data-mobile-icon-open]');
  var mobileIconClose = document.querySelector('[data-mobile-icon-close]');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function () {
      var isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden', isOpen);
      mobileToggle.setAttribute('aria-expanded', String(!isOpen));
      if (mobileIconOpen) mobileIconOpen.classList.toggle('hidden', !isOpen);
      if (mobileIconClose) mobileIconClose.classList.toggle('hidden', isOpen);
    });
  }

  // Scroll reveal animations
  var revealEls = document.querySelectorAll('.reveal');
  if (
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    'IntersectionObserver' in window
  ) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // Demo credential copy buttons
  document.querySelectorAll('.demo-copy-button').forEach(function (btn) {
    var originalIcon = btn.querySelector('svg');
    if (!originalIcon) return;

    var checkIcon = document.createElementNS(
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
    var path = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'polyline',
    );
    path.setAttribute('points', '20 6 9 17 4 12');
    checkIcon.appendChild(path);

    var resetTimeout;

    btn.addEventListener('click', async function () {
      var text = btn.dataset.copy;
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        if (resetTimeout) clearTimeout(resetTimeout);
        var current = btn.querySelector('svg');
        if (current && current !== checkIcon) {
          current.replaceWith(checkIcon);
        }
        resetTimeout = setTimeout(function () {
          checkIcon.replaceWith(originalIcon);
          resetTimeout = undefined;
        }, 2000);
      } catch (e) {
        console.error('Failed to copy:', e);
      }
    });
  });
})();
