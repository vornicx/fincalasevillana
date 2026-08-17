const craftStylesheet = document.createElement('link');
craftStylesheet.rel = 'stylesheet';
craftStylesheet.href = '/craft.css?v=202608171253';
document.head.appendChild(craftStylesheet);

const factsStylesheet = document.createElement('link');
factsStylesheet.rel = 'stylesheet';
factsStylesheet.href = '/facts.css?v=202608171332';
document.head.appendChild(factsStylesheet);

const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav a');
const form = document.querySelector('#availability-form');

const setHeader = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 35);
};

setHeader();
window.addEventListener('scroll', setHeader, { passive: true });

navToggle?.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    document.body.classList.remove('menu-open');
    navToggle?.setAttribute('aria-expanded', 'false');
    navToggle?.setAttribute('aria-label', 'Abrir menú');
  });
});

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px' });

  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add('visible'));
}

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const phone = String(data.get('phone') || '').trim();
  const type = String(data.get('event') || 'Celebración');
  const date = String(data.get('date') || '').trim();
  const guests = String(data.get('guests') || '').trim();
  const extra = String(data.get('message') || '').trim();

  const message = [
    'Hola, me gustaría consultar disponibilidad en Finca La Sevillana.',
    '',
    `Nombre: ${name}`,
    `Teléfono: ${phone}`,
    `Celebración: ${type}`,
    date ? `Fecha orientativa: ${date}` : null,
    guests ? `Invitados aproximados: ${guests}` : null,
    extra ? `Idea / detalles: ${extra}` : null,
    '',
    '¿Podríais indicarme disponibilidad y cómo podemos ampliar información?'
  ].filter(Boolean).join('\n');

  window.open(`https://wa.me/34607860292?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});

document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});