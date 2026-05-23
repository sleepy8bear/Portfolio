# Hélène David — Portfolio

Personal portfolio website for Hélène David, Business & Marketing student at UCLL and co-founder of [CalmCampus](https://calmcampus.be).

**Live site → [helene-david.com](https://helene-david.com)**

---

## Pages

| Page | Description |
|------|-------------|
| `/` | Landing page — hero, stats, featured work |
| `/work.html` | Full experience timeline |
| `/about.html` | Bio, education history, skills & certifications |
| `/contact.html` | Contact links and what I'm open to |

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
├── index.html       # Landing page
├── work.html        # Experience & ventures
├── about.html       # About, education, skills
├── contact.html     # Contact page
├── style.css        # Shared styles (CSS custom properties)
├── script.js        # Shared JS (nav, animations)
├── CNAME            # Custom domain for GitHub Pages
└── README.md
```

## Customisation

All design tokens live in `:root` in `style.css` — change `--accent` to swap the entire colour palette:

```css
:root {
  --accent:  #b48be4;   /* primary purple */
  --accent2: #7c5cbf;   /* darker purple */
  --bg:      #0d0c0e;   /* page background */
}
```

## License

[MIT](LICENSE) — feel free to use as a starting point for your own portfolio.
