# Hélène David — Portfolio

Personal portfolio website for Hélène David, International Business Management student (Marketing option), and CEO & co-founder of CalmCampus.

**Live site → [helene-david.com](https://helene-david.com)**

---

## Pages

| Page | Description |
|------|-------------|
| `/` | Landing page — hero, stats, featured work |
| `/work.html` | Full experience timeline |
| `/projects.html` | Projects — CalmCampus, hackathon, brand identity and marketing campaigns |
| `/about.html` | Bio, education, skills, languages & certifications |
| `/contact.html` | Email and LinkedIn |

## Tech Stack

- **[Astro](https://astro.build)** — static site generator with components (`Header`, `Footer`, `PageHero`, `CtaStrip`) and one shared layout
- **CSS3** — custom properties, Grid, Flexbox, animations
- **Vanilla JS** — scroll effects, mobile nav, IntersectionObserver
- **Fonts** — [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) + [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts
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
│   │   └── CtaStrip.astro    # "Get in touch" call-to-action strip
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

All design tokens live in `:root` in `src/styles/style.css` — change `--accent` to swap the entire colour palette:

```css
:root {
  --accent:  #c9a3ff;   /* primary purple */
  --accent2: #9a6ff0;   /* deeper purple */
  --bg:      #1a1625;   /* page background */
}
```

## License

[MIT](LICENSE) — feel free to use as a starting point for your own portfolio.
