// Navigation, reveals, and the motion layer. Everything decorative is skipped for
// people who prefer reduced motion, and pointer effects only run with a mouse.
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(pointer: fine)').matches && matchMedia('(hover: hover)').matches;
const raf = requestAnimationFrame;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/* ── Header: solid on scroll + hand-drawn progress line ── */
const nav = document.getElementById('nav');
let floats = [];
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  raf(() => {
    ticking = false;
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 40);
    const max = document.documentElement.scrollHeight - innerHeight;
    nav.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : '0');
    updateFloats();
  });
}
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll);

/* ── Mobile menu ── */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-menu');

function setMenu(open) {
  navLinks.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  hamburger.setAttribute('aria-expanded', String(open));
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = open ? 'translateY(8px) rotate(45deg)' : '';
  spans[1].style.opacity = open ? '0' : '';
  spans[2].style.transform = open ? 'translateY(-8px) rotate(-45deg)' : '';
}
hamburger?.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
navLinks?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
// rotating a phone / resizing to desktop must not leave the menu (and scroll lock) stuck open
matchMedia('(min-width: 641px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

/* ── Headlines: split into words so each can slide up from behind a mask ── */
function splitWords(root) {
  const walk = (node) => {
    [...node.childNodes].forEach((ch) => {
      if (ch.nodeType === 3) {
        const frag = document.createDocumentFragment();
        ch.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.append(' '); return; }
          const w = document.createElement('span');
          const i = document.createElement('span');
          w.className = 'w';
          i.className = 'wi';
          i.textContent = part;
          w.append(i);
          frag.append(w);
        });
        ch.replaceWith(frag);
      } else if (ch.nodeType === 1 && ch.tagName !== 'BR') {
        walk(ch);
      }
    });
  };
  walk(root);
  root.querySelectorAll('.wi').forEach((el, i) => el.style.setProperty('--i', i));
}
document.querySelectorAll('[data-split]').forEach((el) => {
  if (!reduce) splitWords(el);
  el.classList.add('split');
});

/* ── Handwritten labels are "written on" ── */
// (the clipped part is an inner wrapper: browsers don't report fully clipped elements as visible,
// so the outer element is what gets observed)
document.querySelectorAll('.eyebrow, .hand').forEach((el) => {
  if (el.closest('.hero-art, .project, .cursor')) return;
  const inner = document.createElement('span');
  inner.className = 'write-i';
  inner.append(...el.childNodes);
  el.append(inner);
  el.classList.add('write');
});

/* ── Reveal on scroll ── */
function countUp(el) {
  const end = Number(el.dataset.count);
  if (reduce || !Number.isFinite(end)) return;
  const t0 = performance.now();
  const dur = 1100;
  el.textContent = '0';
  (function step(now) {
    const k = clamp((now - t0) / dur, 0, 1);
    el.textContent = String(Math.round(end * (1 - Math.pow(1 - k, 3))));
    if (k < 1) raf(step);
  })(t0);
}
const targets = document.querySelectorAll('.reveal, [data-split]:not([data-hero]), .write, [data-count]');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('in');
      if (el.hasAttribute('data-count')) countUp(el);
      io.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  targets.forEach((el) => io.observe(el));
} else {
  targets.forEach((el) => el.classList.add('in'));
}
// hero titles play as soon as the web fonts are in (so words don't jump)
const fontsReady = document.fonts?.ready
  ? Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 900))])
  : Promise.resolve();
fontsReady.then(() => raf(() => {
  document.querySelectorAll('[data-hero]').forEach((el) => {
    el.style.setProperty('--base', '250ms');
    el.classList.add('in');
  });
}));

/* ── Floating shapes: parallax + slow rotation on scroll ── */
floats = [...document.querySelectorAll('.float')].map((el) => ({
  el,
  host: el.offsetParent || el.parentElement,
  k: parseFloat(el.dataset.speed) || 0.1,
}));
function updateFloats() {
  if (reduce || !floats.length) return;
  const vh = innerHeight;
  floats.forEach((f) => {
    const r = f.host.getBoundingClientRect();
    if (r.bottom < -300 || r.top > vh + 300) return;
    const d = r.top + r.height / 2 - vh / 2;
    f.el.style.translate = `0 ${(-d * f.k).toFixed(1)}px`;
    f.el.style.rotate = `${(d * f.k * 0.12).toFixed(1)}deg`;
  });
}
updateFloats();

/* ── Ticker bands: speed up (and reverse) with scroll velocity ── */
const bands = [...document.querySelectorAll('.marquee')].map((m) => {
  const track = m.querySelector('.marquee-track');
  return { m, track, x: 0, half: 0, dir: m.dataset.dir === 'rev' ? 1 : -1, visible: true };
});
if (bands.length && !reduce) {
  const measure = () => bands.forEach((b) => { b.half = b.track.firstElementChild.getBoundingClientRect().width; });
  fontsReady.then(measure);
  addEventListener('resize', measure);
  if ('IntersectionObserver' in window) {
    const vis = new IntersectionObserver((es) => es.forEach((e) => {
      bands.find((b) => b.m === e.target).visible = e.isIntersecting;
    }));
    bands.forEach((b) => vis.observe(b.m));
  }
  let last = performance.now();
  let lastY = scrollY;
  let vel = 0;
  const loop = (now) => {
    const dt = Math.min(now - last, 50) / 1000;
    last = now;
    const dy = scrollY - lastY;
    lastY = scrollY;
    vel += (clamp(dy / Math.max(dt, 0.001), -2500, 2500) - vel) * 0.08;
    bands.forEach((b) => {
      if (!b.visible || !b.half) return;
      const speed = 70 + vel * 0.35;
      b.x += b.dir * speed * dt;
      if (b.x <= -b.half) b.x += b.half;
      if (b.x > 0) b.x -= b.half;
      b.track.style.transform = `translate3d(${b.x.toFixed(1)}px,0,0)`;
    });
    raf(loop);
  };
  raf(loop);
}

/* ── Pointer effects (mouse only) ── */
if (fine && !reduce) {
  // trailing cursor ring
  const ring = document.querySelector('.cursor');
  const label = ring?.querySelector('span');
  let x = -100, y = -100, cx = -100, cy = -100;
  addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    x = e.clientX; y = e.clientY;
    ring.classList.add('on');
    const hot = e.target.closest?.('a, button, .sticker, .stamp, .chip');
    let text = '';
    if (hot) {
      if (hot.matches('.envelope')) text = 'open';
      else if (hot.matches('[data-viewer]')) text = 'view';
      else if (hot.matches('a.paper')) text = 'view';
      else if (hot.matches('.sticker, .stamp')) text = 'drag';
    }
    ring.classList.toggle('is-link', !!hot && !text);
    ring.classList.toggle('has-label', !!text);
    if (label) label.textContent = text;
  }, { passive: true });
  document.addEventListener('pointerleave', () => ring.classList.remove('on'));
  addEventListener('pointerdown', () => ring.classList.add('down'));
  addEventListener('pointerup', () => ring.classList.remove('down'));
  (function follow() {
    cx += (x - cx) * 0.2;
    cy += (y - cy) * 0.2;
    ring.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0) translate(-50%,-50%)`;
    raf(follow);
  })();

  // hero collage drifts with the mouse
  const art = document.querySelector('.hero-art');
  if (art) {
    let pending = false, mx = 0, my = 0;
    addEventListener('pointermove', (e) => {
      mx = (e.clientX / innerWidth - 0.5) * 2;
      my = (e.clientY / innerHeight - 0.5) * 2;
      if (pending) return;
      pending = true;
      raf(() => {
        pending = false;
        art.style.setProperty('--mx', mx.toFixed(3));
        art.style.setProperty('--my', my.toFixed(3));
      });
    }, { passive: true });
  }

  // paper cards tilt towards the pointer
  document.querySelectorAll('a.paper, .envelope').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty('--rx', `${(-py * 7).toFixed(2)}deg`);
      card.style.setProperty('--ry', `${(px * 9).toFixed(2)}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('--rx');
      card.style.removeProperty('--ry');
    });
  });

  // skills & certifications can be dragged around like stickers
  let stackZ = 10;
  document.querySelectorAll('.sticker, .stamp').forEach((el) => {
    el.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      el.style.zIndex = String(++stackZ); // the one you just moved stays on top
      const sx = e.clientX - (parseFloat(el.style.getPropertyValue('--dx')) || 0);
      const sy = e.clientY - (parseFloat(el.style.getPropertyValue('--dy')) || 0);
      el.setPointerCapture(e.pointerId);
      el.classList.add('dragging');
      const move = (ev) => {
        el.style.setProperty('--dx', `${ev.clientX - sx}px`);
        el.style.setProperty('--dy', `${ev.clientY - sy}px`);
      };
      const up = () => {
        el.classList.remove('dragging');
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerup', up);
        el.removeEventListener('pointercancel', up);
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up);
    });
  });
}

/* ── File viewer: flip through the pages of an enclosed deck ── */
const viewer = document.getElementById('viewer');
const fileViewer = (() => {
  if (!viewer) return null;
  const img = viewer.querySelector('.viewer-img');
  const title = viewer.querySelector('#viewer-title');
  const range = viewer.querySelector('.viewer-range');
  const count = viewer.querySelector('.viewer-count');
  const prev = viewer.querySelector('[data-vprev]');
  const next = viewer.querySelector('[data-vnext]');
  let path = '';
  let total = 1;
  let page = 1;
  const src = (n) => `${path}${String(n).padStart(2, '0')}.jpg`;

  function show(n) {
    page = clamp(n, 1, total);
    img.classList.add('loading');
    const probe = new Image();
    probe.onload = () => { if (src(page) === probe.getAttribute('src')) { img.src = probe.src; img.classList.remove('loading'); } };
    probe.setAttribute('src', src(page));
    img.alt = `${title.textContent}, page ${page} of ${total}`;
    range.value = String(page);
    count.textContent = `${page} / ${total}`;
    prev.disabled = page === 1;
    next.disabled = page === total;
    [page + 1, page - 1].forEach((k) => { if (k >= 1 && k <= total) new Image().src = src(k); }); // warm the neighbours
  }

  function open(btn) {
    path = btn.dataset.path;
    total = Number(btn.dataset.pages) || 1;
    title.textContent = btn.dataset.title;
    range.max = String(total);
    viewer.classList.toggle('single', total === 1);
    img.removeAttribute('src');
    show(1);
    viewer.showModal();
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest?.('[data-viewer]');
    if (btn) open(btn);
  });
  viewer.addEventListener('click', (e) => { if (e.target === viewer) viewer.close(); });
  viewer.querySelector('[data-vclose]').addEventListener('click', () => viewer.close());
  prev.addEventListener('click', () => show(page - 1));
  next.addEventListener('click', () => show(page + 1));
  range.addEventListener('input', () => show(Number(range.value)));

  // swipe on touch screens
  const stage = viewer.querySelector('.viewer-stage');
  let startX = null;
  stage.addEventListener('pointerdown', (e) => { if (e.pointerType === 'touch') startX = e.clientX; });
  stage.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 50) show(page + (dx < 0 ? 1 : -1));
  });

  return { isOpen: () => viewer.open, step: (d) => show(page + d) };
})();

/* ── Projects: sealed envelopes that open into a letter ── */
const envelopes = [...document.querySelectorAll('.envelope')];
const letter = document.getElementById('letter');
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

if (envelopes.length && letter) {
  const body = letter.querySelector('.sheet-body');
  const counter = letter.querySelector('.sheet-count');
  let current = null;
  let busy = false;
  const visible = () => envelopes.filter((e) => !e.hidden);

  function fill(env) {
    const tpl = document.getElementById(`tpl-${env.dataset.id}`);
    body.replaceChildren(tpl.content.cloneNode(true));
    body.scrollTop = 0;
    letter.dataset.cat = env.dataset.cat;
    const list = visible();
    counter.textContent = `${list.indexOf(env) + 1} / ${list.length}`;
  }

  async function openLetter(env, { animate = true } = {}) {
    if (busy || letter.open) return;
    busy = true;
    current = env;
    env.classList.add('opening');             // seal breaks, flap flips, letter slides out
    if (animate && !reduce) await wait(560);
    fill(env);
    letter.showModal();
    document.body.classList.add('letter-open');
    history.replaceState(null, '', `#${env.dataset.id}`);
    busy = false;
  }

  async function closeLetter() {
    if (!letter.open || letter.classList.contains('closing')) return;
    if (!reduce) {
      letter.classList.add('closing');
      await wait(300);
    }
    letter.close();
  }

  letter.addEventListener('close', () => {
    letter.classList.remove('closing', 'swap');
    document.body.classList.remove('letter-open');
    envelopes.forEach((e) => e.classList.remove('opening'));
    history.replaceState(null, '', location.pathname + location.search);
    current?.focus({ preventScroll: true });
  });
  letter.addEventListener('cancel', (e) => { e.preventDefault(); closeLetter(); }); // Esc: animate out first
  letter.addEventListener('click', (e) => { if (e.target === letter) closeLetter(); }); // click outside the sheet

  function step(dir) {
    const list = visible();
    if (list.length < 2) return;
    const next = list[(list.indexOf(current) + dir + list.length) % list.length];
    current.classList.remove('opening');
    next.classList.add('opening');
    current = next;
    fill(next);
    history.replaceState(null, '', `#${next.dataset.id}`);
    letter.classList.remove('swap');
    void letter.offsetWidth;
    letter.classList.add('swap');
  }
  letter.querySelector('[data-close]').addEventListener('click', closeLetter);
  letter.querySelector('[data-prev]').addEventListener('click', () => step(-1));
  letter.querySelector('[data-next]').addEventListener('click', () => step(1));
  document.addEventListener('keydown', (e) => {
    if (fileViewer?.isOpen()) {                      // a file is open on top of the letter
      if (e.key === 'ArrowLeft') fileViewer.step(-1);
      if (e.key === 'ArrowRight') fileViewer.step(1);
      return;
    }
    if (!letter.open) return;
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });

  envelopes.forEach((env) => env.addEventListener('click', () => openLetter(env)));

  // Deep links like /projects.html#calmcampus open that letter
  if (location.hash) {
    const target = envelopes.find((e) => e.dataset.id === decodeURIComponent(location.hash.slice(1)));
    if (target) setTimeout(() => openLetter(target, { animate: false }), 250);
  }
}

/* ── Project filter ── */
const chips = document.querySelectorAll('[data-filter]');
const count = document.getElementById('project-count');
chips.forEach((chip) => chip.addEventListener('click', () => {
  const f = chip.dataset.filter;
  chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
  let n = 0;
  envelopes.forEach((env) => {
    const show = f === 'all' || env.dataset.cat === f;
    env.hidden = !show;
    env.classList.remove('pop');
    if (show) {
      env.style.setProperty('--d', `${n * 55}ms`);
      void env.offsetWidth; // restart the animation
      env.classList.add('pop');
      n++;
    }
  });
  if (count) count.textContent = String(n);
}));

onScroll();
