// site.js - Keyturn Studio universal header/nav and helpers

// Safe GA4 event
window.safeEvent = (name, params={}) => window.gtag ? gtag('event', name, params) : void 0;

// Header nav items (links/buttons)
const NAV_ITEMS = [
  {label:'How it works','href':'/#how',match:['/','/index.html'],partial:'#how'},
  {label:'Proof','href':'/anchor-case.html',match:['/anchor-case.html']},
  {label:'Pricing','href':'/#pricing',match:['/','/index.html'],partial:'#pricing'},
  {label:'Get a 10-min audit','href':'/audit.html',match:['/audit.html']},
  {label:'ROI estimate','href':'/tools/roi.html',match:['/tools/roi.html']},
  {label:'Book 15-min intro','href':'https://calendly.com/YOUR_HANDLE/intro?hide_gdpr_banner=1',external:true},
  // The Onboarding CTA button; must be rightmost
  {label:'Onboarding','href':'/onboarding.html',match:['/onboarding.html','/onboarding'],button:true}
];

// Helper: true if link matches current page
function navIsActive(item) {
  const path = window.location.pathname.replace(/\/$/, '');
  if(item.match && item.match.includes(path)) return true;
  // /onboarding.html should match cleanUrls /onboarding
  if(item.match && item.match.some(m => path.endsWith(m))) return true;
  // For #anchors, match homepage with anchor
  if(item.partial && window.location.hash === item.partial) return true;
  return false;
}

// Render header/nav into #site-header
function renderHeader() {
  const header = document.getElementById('site-header');
  if(!header) return;

  header.innerHTML = `
    <nav class="site-nav card-section" aria-label="Site navigation">
      <a class="brand-logo" href="/" aria-label="Keyturn Studio">
        <img src="/public/logo.svg" alt="" class="logo-img" width="32" height="32">
        <span class="brand-text">Keyturn<span class="hide-on-mobile"> Studio</span></span>
      </a>
      <button class="nav-toggle" aria-label="Toggle menu" tabindex="0"><span class="nav-toggle-icon"></span></button>
      <ul class="nav-list">
        ${NAV_ITEMS.map((item, i) => {
          let classes = "nav-link";
          if(item.button) classes += " btn btn-pill btn-primary nav-btn";
          let active = navIsActive(item) ? ' aria-current="page" class="active '+classes+'"' : ' class="'+classes+'"';
          let rel = item.external ? ' rel="noopener"' : '';
          let target = item.external ? ' target="_blank"' : '';
          return `<li>${item.button ?
            `<a href="${item.href}"${rel}${target}${active}>${item.label}</a>`
            : `<a href="${item.href}"${rel}${target}${active}>${item.label}</a>`
          }</li>`;
        }).join('')}
      </ul>
    </nav>
  `;

  // Mobile nav: toggle
  const navToggle = header.querySelector('.nav-toggle');
  navToggle.addEventListener('click', function() {
    header.classList.toggle('nav-open');
  });

  // Close nav on click away (small screens)
  document.body.addEventListener('click', function(e){
    if(window.innerWidth<801 && header.classList.contains('nav-open')) {
      if(!header.contains(e.target)) header.classList.remove('nav-open');
    }
  }, true);
}

// Inject header on DOM ready
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', renderHeader);
} else {
  renderHeader();
}