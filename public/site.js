/**
 * Keyturn Studio Site-wide JavaScript
 * - Consistent nav/header injection
 * - GA4 event helper (safeEvent)
 * - Mobile menu functionality
 */

(function() {
  'use strict';

  // ===== GA4 Event Helper =====
  window.safeEvent = function(eventName, eventParams) {
    if (typeof gtag === 'function') {
      try {
        gtag('event', eventName, eventParams || {});
      } catch (e) {
        console.warn('GA4 event failed:', eventName, e);
      }
    }
  };

  // ===== Header Injection =====
  function injectHeader() {
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/index';
    const isActive = (path) => {
      const normalized = path.replace(/\/$/, '');
      return currentPath === normalized || currentPath === normalized + '.html';
    };

    const headerHTML = `
<a class="skip-link" href="#main">Skip to content</a>

<header class="site-header">
  <div class="container header-bar">
    <a class="brand" href="/" aria-label="Keyturn Studio home">
      <img src="/public/logo.svg?v=2" alt="Keyturn Studio" width="180" height="56" decoding="async">
    </a>

    <!-- Desktop nav -->
    <nav class="nav-desktop" aria-label="Primary">
      <ul class="nav-list">
        <li><a href="/#services"${isActive('/') ? ' aria-current="page"' : ''}>How it works</a></li>
        <li><a href="/#results"${isActive('/') ? ' aria-current="page"' : ''}>Proof</a></li>
        <li><a href="/#pricing"${isActive('/') ? ' aria-current="page"' : ''}>Pricing</a></li>
      </ul>
      <div class="nav-ctas">
        <a class="btn btn-ghost" href="/audit.html"${isActive('/audit') ? ' aria-current="page"' : ''}>Audit</a>
        <a class="btn btn-ghost" href="/tools/roi.html" aria-label="Open ROI estimate calculator">ROI estimate</a>
        <a class="btn btn-ghost"
   href="https://calendly.com/vinnie-keyturn/intro"
   target="_blank" rel="noopener noreferrer"
   aria-label="Book 15-minute intro on Calendly">Book 15-min intro</a>
        <a class="btn btn-primary" href="/onboarding.html"${isActive('/onboarding') ? ' aria-current="page"' : ''}>Onboarding</a>
      </div>
    </nav>

    <!-- Mobile hamburger -->
    <button class="menu-toggle" aria-controls="mobileMenu" aria-expanded="false" data-menu-toggle>
      <span class="sr-only">Toggle menu</span>☰
    </button>
  </div>

  <!-- Mobile drawer -->
  <nav id="mobileMenu" class="mobile-drawer" hidden aria-label="Mobile">
    <a href="/#services">How it works</a>
    <a href="/#results">Proof</a>
    <a href="/#pricing">Pricing</a>
    <a class="btn btn-ghost w-full" href="/audit.html"${isActive('/audit') ? ' aria-current="page"' : ''}>Audit</a>
    <a class="btn btn-ghost w-full" href="/tools/roi.html" aria-label="Open ROI estimate calculator">ROI estimate</a>
    <a class="btn btn-ghost w-full"
   href="https://calendly.com/vinnie-keyturn/intro"
   target="_blank" rel="noopener noreferrer">Book 15-min intro</a>
    <a class="btn btn-primary w-full" href="/onboarding.html"${isActive('/onboarding') ? ' aria-current="page"' : ''}>Onboarding</a>
  </nav>
</header>
    `.trim();

    // Insert at the beginning of body
    if (document.body && document.body.firstChild) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = headerHTML;
      while (tempDiv.firstChild) {
        document.body.insertBefore(tempDiv.firstChild, document.body.firstChild);
      }
    }
  }

  // ===== Mobile Menu Toggle =====
  function initMobileMenu() {
    const toggle = document.querySelector('[data-menu-toggle]');
    const drawer = document.getElementById('mobileMenu');
    
    if (toggle && drawer) {
      const closeDrawer = () => {
        drawer.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      };

      toggle.addEventListener('click', () => {
        const open = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!open));
        drawer.hidden = open;
        document.body.classList.toggle('no-scroll', !open);
      });

      drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
    }
  }

  // ===== Year Footer Update =====
  function updateYear() {
    const yearEl = document.getElementById('y');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // ===== Initialize on DOMContentLoaded =====
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      injectHeader();
      initMobileMenu();
      updateYear();
    });
  } else {
    injectHeader();
    initMobileMenu();
    updateYear();
  }
})();
