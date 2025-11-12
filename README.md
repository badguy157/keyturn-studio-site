# Keyturn Studio — Website

Marketing website for Keyturn Studio, a hospitality website makeover service for inns, small hotels, and B&Bs.

## Tech Stack

- **HTML/CSS/Vanilla JS** — No build process required
- **Vercel** — Hosting and serverless functions
- **Formspree** — Form submissions

## How to Edit

### Content Updates

**Homepage** (`/index.html`)
- Hero section: Update title, lede, and CTAs around line 20–36
- Trust strip logos: Add/remove logos in `/public/logos/`
- Services cards: Edit around line 45–85
- Results/metrics: Update metric cards around line 165–181
- Testimonial quotes: Edit around lines 184–187, 298–302
- Pricing cards: Update tiers and pricing around line 190–300

**Service Pages** (`/services/*.html`)
- Each service page has its own file (inn-website-design, small-hotel-website-design, etc.)
- Update headings, bullets, FAQs, and CTAs as needed
- Schema markup is in the `<head>` section

**Onboarding** (`/onboarding.html`)
- Edit the 3-step process around lines 50–200
- Update access requirements in Step 2

**Audit Form** (`/audit.html`)
- Form fields and validation around lines 44–79
- Formspree endpoint: Line 46

### Styling

**Global Styles** (`/styles.css`)
- Design tokens (colors, spacing): Lines 6–42
- Typography: Around line 60–90
- Components (buttons, cards, nav): Throughout
- Hero styles: Around line 152–162
- Forms: Around line 289–300

### Navigation & Header

**Site-wide Header** (`/public/site.js`)
- Header HTML injected on all pages: Lines 30–89
- Update nav links around lines 41–52
- Services dropdown menu: Lines 43–52
- Mobile menu: Lines 73–82

### Analytics & Events

**GA4 Helper** (`/public/site.js`)
- `safeEvent()` function for tracking: Lines 11–20
- Add `data-evt` attributes to buttons/links for automatic tracking

### Serverless Functions

**API Routes** (`/api/*`)
- Do not modify these files
- Vercel serverless functions for backend logic

## Build & Deploy

**Local Development:**
```bash
# No build step needed — just open HTML files
# Use a local server:
npx serve .
# Or:
python3 -m http.server 8000
```

**Deployment:**
- Push to `main` branch → auto-deploys to Vercel
- Vercel config: `vercel.json`

## File Structure

```
/
├── index.html           # Homepage
├── audit.html           # Audit request form
├── onboarding.html      # Onboarding process
├── pricing.html         # (embedded in index.html)
├── services/            # SEO service pages
│   ├── inn-website-design.html
│   ├── small-hotel-website-design.html
│   ├── bb-website-design.html
│   └── hotel-website-redesign.html
├── styles.css           # Global styles
├── public/
│   ├── site.js          # Site-wide JS (header, nav, GA4)
│   ├── logos/           # Trust strip logos
│   ├── portfolio/       # Portfolio images
│   └── tools/           # ROI calculator
└── api/                 # Vercel serverless functions (do not edit)
```

## Adding New Pages

1. Copy an existing HTML file (e.g., `audit.html`)
2. Update `<title>`, `<meta description>`, and main content
3. Ensure Organization schema is in `<head>`
4. Link from nav or footer as needed

## Updating Schema Markup

**Organization Schema** — Present on all pages in `<head>`:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Keyturn Studio",
  "url": "https://www.keyturn.studio",
  "logo": "https://www.keyturn.studio/public/logo.svg"
}
```

**Product/Service Schema** — On `index.html` for pricing
**FAQPage Schema** — On service pages for FAQ sections

## Form Submission

Forms use **Formspree** (endpoint in form `action` attribute).
- Audit form: `https://formspree.io/f/mvgdpyay`
- Submissions go to `hello@keyturn.studio`

## Support

Questions? `hello@keyturn.studio`
