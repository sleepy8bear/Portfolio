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

- **HTML5** — semantic markup, no framework
- **CSS3** — custom properties, Grid, Flexbox, animations
- **Vanilla JS** — scroll effects, mobile nav, IntersectionObserver
- **Fonts** — [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) + [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts
- **Hosting** — GitHub Pages + Cloudflare DNS

## Run Locally

No build step needed — just open in a browser:

```bash
git clone git@github.com:sleepy8bear/Portfolio.git
cd Portfolio
# open index.html directly, or serve it:
python3 -m http.server 3000
# → http://localhost:3000
```

## Project Structure

```
Portfolio/
├── index.html            # Landing page
├── work.html             # Experience
├── projects.html         # Projects
├── about.html            # About, education, skills
├── contact.html          # Contact page
├── assets/
│   ├── css/style.css     # Shared styles (CSS custom properties)
│   └── js/script.js      # Shared JS (nav, animations)
├── CNAME                 # Custom domain for GitHub Pages
└── README.md
```

## Customisation

All design tokens live in `:root` in `style.css` — change `--accent` to swap the entire colour palette:

```css
:root {
  --accent:  #c9a3ff;   /* primary purple */
  --accent2: #9a6ff0;   /* deeper purple */
  --bg:      #1a1625;   /* page background */
}
```

## License

[MIT](LICENSE) — feel free to use as a starting point for your own portfolio.
