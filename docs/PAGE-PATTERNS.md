# Red Hot Media House — Page & Content Patterns

Use this guide when updating copy or adding new pages so every page stays visually and structurally consistent.

## Tech stack

- **HTML** — one `index.html` per route folder (e.g. `/about/index.html`)
- **CSS** — single source: `/css/styles.css` (design tokens in `:root`)
- **JS** — `/js/main.js` (nav, accordions, counters, fade-in, testimonials)

## Fonts (required in every page `<head>`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&family=Syne:wght@700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/styles.css">
```

## Global shell (copy from any live page)

1. `<body class="mono-theme">`
2. `<header class="site-header">` — same nav on all pages
3. `<main>` — page sections only
4. `<footer class="site-footer">` — same footer grid
5. Floating WhatsApp + `mobile-sticky-cta`
6. Scripts: `gsap`, `ScrollTrigger`, `/js/main.js` (defer where possible)

## Section rhythm

Alternate surfaces for visual rhythm:

| Class | Use |
|--------|-----|
| `section hero hero-inner hero-inner--{slug}` | Page hero (inner pages) |
| `section hero hero-split` | Homepage hero with video |
| `section light-section` | Default content band (`--bg-primary`) |
| `section dark-section` | Raised band (`--bg-surface`) |
| `section cta-band` | Full-width lime CTA |

Every content section:

```html
<section class="section light-section">
  <div class="container fade-in">
    <div class="mini-title">Label</div>
    <h2>Section heading</h2>
    <p class="muted">Supporting line…</p>
    <!-- cards / stats / timeline / etc. -->
  </div>
</section>
```

## Hero (inner pages)

```html
<section class="section hero hero-inner hero-inner--about">
  <div class="hero-inner__deco" aria-hidden="true"><!-- optional SVG --></div>
  <div class="container fade-in">
    <div class="hero-center intro">
      <span class="hero-label">Optional pill</span>
      <h1>Main headline or <span class="text-gradient">accent words</span></h1>
      <ul class="hero-meta" aria-label="Trust line">
        <li>Tag one</li>
        <li>Tag two</li>
      </ul>
      <p class="muted">Subheadline…</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="/contact">Primary CTA</a>
        <a class="btn btn-secondary" href="/case-studies">Secondary CTA</a>
      </div>
    </div>
  </div>
</section>
```

## Reusable blocks

| Pattern | Classes |
|---------|---------|
| Stats row | `stats-grid stats-grid-four` or `stats-grid-five` + `stat-box` / `stat-value` |
| Service / feature cards | `cards-grid cards-grid--content` + `card` (uneven copy — natural height) |
| Video service tiles (equal boxes) | `cards-grid service-cards-grid` + `card service-card` + `service-card__points` |
| Video portfolio highlights | `portfolio-highlights` + `portfolio-highlights__grid` (do not use `hero-trust` here) |
| Video portfolio grid | `cards-grid video-portfolio-grid` + `card card--portfolio` + `card__media` + `card__body` |
| Numbered differentiators | `steps-grid problem-grid` + `step` + `step-number` |
| Process / journey steps | `timeline` + `timeline-item` |
| Vision / mission pair | `about-direction-grid` + `about-pillar` |
| Founders | `founder-grid` + `founder-card` |
| FAQ | `faq-wrap` + `accordion-item` |
| Lead / contact forms | `lead-form-grid` or `contact-inquiry-form` |
| Bullets | `feature-list` |
| Tags in cards | `tag-row` + `badge` |

## Hero variant slugs

Set `hero-inner--{slug}` for subtle glow differentiation:  
`about`, `services`, `seo`, `smm`, `web`, `ppc`, `performance`, `video`, `contact`, `case`, `industries`, `realestate`, `healthcare`, `fmcg`, `textile`, `education`, `manufacturing`, `legal`

## Colors & type

- **Never** hardcode hex in HTML — use existing classes; new colors only in `:root` in `styles.css`
- **Headings** — Syne (via `h1`–`h6`)
- **Body** — DM Sans (`p`, `.muted`)
- **Labels** — `.mini-title`, `.hero-label` (JetBrains Mono)

## Adding a new page checklist

1. Create folder + `index.html`
2. Copy shell from `/services-seo/index.html` or `/about/index.html`
3. One hero + alternating `light-section` / `dark-section`
4. End with `cta-band` before footer (if sales page)
5. Update nav only if new top-level route (header/footer on all pages)
6. Match meta `title` and `description` to H1 + first paragraph

## Content updates (like About)

- Keep **all** sections; only replace text inside existing tags
- Preserve `fade-in` on `.container` for scroll animation
- Use real phone `+91-9582732323` unless client supplies a new number
- CTAs: primary → `/contact`, secondary → `/case-studies` or relevant hub
