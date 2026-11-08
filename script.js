// Mobile menu: open/close, close on link tap or Escape.
const root = document.documentElement;
const header = document.querySelector('.header');
const toggle = document.querySelector('.header__toggle');

function setMenu(open) {
  root.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? 'Close' : 'Menu';
}

toggle.addEventListener('click', () => setMenu(!root.classList.contains('is-open')));
document.querySelectorAll('.menu a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

// Glass header (version A): clear over the hero, frosted white once the page scrolls past it.
const hero = document.querySelector('.hero');
if (document.body.classList.contains('v-a') && hero && 'IntersectionObserver' in window) {
  new IntersectionObserver(
    ([entry]) => header.classList.toggle('is-solid', !entry.isIntersecting),
    { rootMargin: `-${header.offsetHeight}px 0px 0px 0px` }
  ).observe(hero);
}

// Scroll progress line in the glass header (version A).
if (document.body.classList.contains('v-a')) {
  let ticking = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header.style.setProperty('--progress', max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : 0);
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener('resize', update);
  update();
}
