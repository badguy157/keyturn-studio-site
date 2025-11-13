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
        <li class="nav-dropdown">
          <button class="nav-dropdown-toggle" aria-expanded="false" aria-haspopup="true">
            Services <span aria-hidden="true">▾</span>
          </button>
          <ul class="nav-dropdown-menu" hidden>
            <li><a href="/services/inn-website-design.html">Inn Website Design</a></li>
            <li><a href="/services/small-hotel-website-design.html">Small Hotel Design</a></li>
            <li><a href="/services/bb-website-design.html">B&B Website Design</a></li>
            <li><a href="/services/hotel-website-redesign.html">Hotel Redesign</a></li>
          </ul>
        </li>
        <li><a href="/#proof"${isActive('/') ? ' aria-current="page"' : ''}>Proof</a></li>
        <li><a href="/#pricing"${isActive('/') ? ' aria-current="page"' : ''}>Pricing</a></li>
        <li><a href="/#how-it-works"${isActive('/') ? ' aria-current="page"' : ''}>How it works</a></li>
      </ul>
      <div class="nav-ctas">
        <a class="btn btn-primary" href="/quote.html"${isActive('/quote') ? ' aria-current="page"' : ''} onclick="window.safeEvent && window.safeEvent('quote_request_click', {location: 'nav'})">Request a Quote</a>
        <a class="btn btn-ghost"
   href="https://calendly.com/vinnie-keyturn/intro?utm_source=site"
   target="_blank" rel="noopener"
   aria-label="Book 15-minute Q&A on Calendly">Book 15-min Q&A</a>
      </div>
    </nav>

    <!-- Mobile hamburger -->
    <button class="menu-toggle" aria-controls="mobileMenu" aria-expanded="false" data-menu-toggle>
      <span class="sr-only">Toggle menu</span>☰
    </button>
  </div>

  <!-- Mobile drawer -->
  <nav id="mobileMenu" class="mobile-drawer" hidden aria-label="Mobile">
    <div class="mobile-submenu">
      <strong class="mobile-submenu-label">Services</strong>
      <a href="/services/inn-website-design.html">Inn Website Design</a>
      <a href="/services/small-hotel-website-design.html">Small Hotel Design</a>
      <a href="/services/bb-website-design.html">B&B Website Design</a>
      <a href="/services/hotel-website-redesign.html">Hotel Redesign</a>
    </div>
    <a href="/#proof">Proof</a>
    <a href="/#pricing">Pricing</a>
    <a href="/#how-it-works">How it works</a>
    <a class="btn btn-primary w-full" href="/quote.html"${isActive('/quote') ? ' aria-current="page"' : ''} onclick="window.safeEvent && window.safeEvent('quote_request_click', {location: 'mobile-nav'})">Request a Quote</a>
    <a class="btn btn-ghost w-full"
   href="https://calendly.com/vinnie-keyturn/intro?utm_source=site"
   target="_blank" rel="noopener">Book 15-min Q&A</a>
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

  // ===== Services Dropdown =====
  function initServicesDropdown() {
    const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
    const dropdownMenu = document.querySelector('.nav-dropdown-menu');
    const dropdown = document.querySelector('.nav-dropdown');
    
    if (dropdownToggle && dropdownMenu && dropdown) {
      let closeTimeout = null;

      // Click toggle
      dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
        dropdownToggle.setAttribute('aria-expanded', String(!isExpanded));
        dropdownMenu.hidden = isExpanded;
      });

      // Hover - with delay on close
      const openDropdown = () => {
        if (closeTimeout) {
          clearTimeout(closeTimeout);
          closeTimeout = null;
        }
        dropdownToggle.setAttribute('aria-expanded', 'true');
        dropdownMenu.hidden = false;
      };

      const closeDropdown = () => {
        closeTimeout = setTimeout(() => {
          dropdownToggle.setAttribute('aria-expanded', 'false');
          dropdownMenu.hidden = true;
        }, 150);
      };

      dropdown.addEventListener('mouseenter', openDropdown);
      dropdown.addEventListener('mouseleave', closeDropdown);
      dropdownMenu.addEventListener('mouseenter', openDropdown);
      dropdownMenu.addEventListener('mouseleave', closeDropdown);

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && !dropdownMenu.contains(e.target)) {
          dropdownToggle.setAttribute('aria-expanded', 'false');
          dropdownMenu.hidden = true;
        }
      });

      // Keyboard navigation
      dropdownToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
          dropdownToggle.setAttribute('aria-expanded', String(!isExpanded));
          dropdownMenu.hidden = isExpanded;
          if (!isExpanded) {
            dropdownMenu.querySelector('a')?.focus();
          }
        }
      });
    }
  }

  // ===== Year Footer Update =====
  function updateYear() {
    const yearEl = document.getElementById('y');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // ===== Calendly Link Normalization =====
  function normalizeCalendlyLinks() {
    document.querySelectorAll('a.book-intro').forEach(a => {
      a.href = 'https://calendly.com/vinnie-keyturn/intro';
      a.target = '_blank';
      a.rel = 'noopener';
    });
  }

  // ===== Initialize on DOMContentLoaded =====
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      injectHeader();
      initMobileMenu();
      initServicesDropdown();
      updateYear();
      normalizeCalendlyLinks();
    });
  } else {
    injectHeader();
    initMobileMenu();
    initServicesDropdown();
    updateYear();
    normalizeCalendlyLinks();
  }
})();
