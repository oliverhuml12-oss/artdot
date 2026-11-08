// Mobile menu: open/close, close on link tap or Escape.
const toggle = document.querySelector('.header__toggle');
const root = document.documentElement;

function setMenu(open) {
  root.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? 'Close' : 'Menu';
}

toggle.addEventListener('click', () => setMenu(!root.classList.contains('is-open')));
document.querySelectorAll('.menu a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
