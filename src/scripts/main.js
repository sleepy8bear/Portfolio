// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-menu');

function setMenu(open) {
  navLinks.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  hamburger.setAttribute('aria-expanded', String(open));
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = open ? 'translateY(8px) rotate(45deg)' : '';
  spans[1].style.opacity   = open ? '0' : '';
  spans[2].style.transform = open ? 'translateY(-8px) rotate(-45deg)' : '';
}

hamburger?.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
// Rotating a phone or resizing to desktop width must not leave the menu (and scroll lock) stuck open
window.matchMedia('(min-width: 641px)').addEventListener('change', e => { if (e.matches) setMenu(false); });

// Reveal on scroll (elements start hidden only when the `js` class is on <html>)
const revealables = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealables.forEach((el) => io.observe(el));
} else {
  revealables.forEach((el) => el.classList.add('in'));
}

// Projects page: filter by category
const chips = document.querySelectorAll('[data-filter]');
const rows = document.querySelectorAll('.project');
const count = document.getElementById('project-count');
chips.forEach((chip) => chip.addEventListener('click', () => {
  const f = chip.dataset.filter;
  chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
  let n = 0;
  rows.forEach((row) => {
    const show = f === 'all' || row.dataset.cat === f;
    row.hidden = !show;
    if (show) n++;
  });
  if (count) count.textContent = String(n);
}));

// Deep links like /projects.html#calmcampus open that project
if (location.hash) {
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (target && target.tagName === 'DETAILS') {
    target.open = true;
    target.classList.add('in');
    setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
  }
}
