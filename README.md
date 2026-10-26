# Hélène David — Portfolio

Personal portfolio website for Hélène David, International Business Management student (Marketing option), and CEO & co-founder of CalmCampus.

**Live site → [helene-david.com](https://helene-david.com)**

---

## Pages

| Page | Description |
|------|-------------|
| `/` | Landing page — hero collage, marquee, selected work |
| `/work.html` | Full experience timeline |
| `/projects.html` | All projects as an expandable index with category filters |
| `/about.html` | Bio, education, skills, languages & certifications |
| `/contact.html` | Email and LinkedIn |

## Tech Stack

- **[Astro](https://astro.build)** — static site generator with components (`Header`, `Footer`, `PageHero`, `CtaStrip`, `Marquee`, `HeroArt`) and one shared layout
- **CSS3** — custom properties, Grid, Flexbox; hand-drawn look (wobbly borders, hard shadows, SVG squiggles, paper grain) with no CSS framework
- **Vanilla JS** — no animation libraries: headline word reveals, parallax shapes, scroll-reactive ticker, trailing cursor, draggable stickers, animated accordion, project filter. Motion is switched off for `prefers-reduced-motion`; pointer effects run with a mouse only.
- **Fonts** — [Fraunces](https://fonts.google.com/specimen/Fraunces) (display), [Instrument Sans](https://fonts.google.com/specimen/Instrument+Sans) (body), [Reenie Beanie](https://fonts.google.com/specimen/Reenie+Beanie) (handwriting) via Google Fonts
- **Hosting** — GitHub Pages (deployed by GitHub Actions) + Cloudflare DNS

## Run Locally

Requires [Node.js](https://nodejs.org) (LTS).

```bash
git clone git@github.com:sleepy8bear/Portfolio.git
cd Portfolio
npm install
npm run dev      # → http://localhost:4321
npm run build    # outputs the static site to dist/
```

## Project Structure

```
Portfolio/
├── src/
│   ├── components/
│   │   ├── Header.astro      # Nav (highlights the current page)
│   │   ├── Footer.astro
│   │   ├── PageHero.astro    # Title block at the top of inner pages
│   │   ├── CtaStrip.astro    # Big closing call-to-action
│   │   ├── Marquee.astro     # Scrolling ticker band (speeds up with scroll)
│   │   ├── Float.astro       # Decorative parallax shapes
│   │   └── HeroArt.astro     # Home hero collage + spinning badge
│   ├── data/projects.ts      # All projects (edit here to add or change one)
│   ├── layouts/BaseLayout.astro   # <head>, Header, Footer, script
│   ├── pages/                # One file per page (index, work, projects, about, contact)
│   ├── styles/style.css      # Shared styles (CSS custom properties)
│   └── scripts/main.js       # Nav scroll, mobile menu, fade-ins
├── public/CNAME              # Custom domain for GitHub Pages
├── .github/workflows/deploy.yml   # Builds and deploys on every push to main
├── astro.config.mjs
└── package.json
```

To change the header or footer, edit the component once — every page picks it up.

## Customisation

**Add a project:** add an entry to `src/data/projects.ts`. It shows up on the Projects page automatically (and can be featured on the home page).

**Colours:** pastel palette based on Pantone Vanilla Custard, Flamingo Plume and Brandy Brown. All tokens live in `:root` in `src/styles/style.css`:

```css
:root {
  --paper:    #fcf4e6;   /* page background */
  --ink:      #5f2621;   /* Brandy Brown: text + outlines */
  --custard:  #f3ddb2;   /* Vanilla Custard */
  --flamingo: #e58d98;   /* Flamingo Plume */
  --blush:    #f3bcc4;   /* light tint of flamingo */
}
```

## License

[MIT](LICENSE) — feel free to use as a starting point for your own portfolio.
