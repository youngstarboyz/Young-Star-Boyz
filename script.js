document.documentElement.classList.add('js');

// ---------- Mobile navigation ----------
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

function closeMenu() {
  if (!nav || !menuButton) return;
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation menu');
}

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 820) closeMenu(); });
}

// ---------- Header shadow on scroll ----------
const header = document.querySelector('.site-header');
const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 10);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- Active nav link while scrolling ----------
const navLinks = [...document.querySelectorAll('.nav a:not(.nav-cta)')];
const sections = navLinks
  .map((a) => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window && sections.length) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => spy.observe(s));
}

// ---------- Reveal on scroll ----------
const revealTargets = document.querySelectorAll(
  '.intro .two-col, .values article, .festival-head, .schedule-item, .quote-band blockquote, .donate-card, .contact-grid, .strip-item'
);
revealTargets.forEach((el) => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const reveal = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('in'); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((el) => reveal.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('in'));
}

// ---------- Footer year ----------
const yearElement = document.querySelector('#year');
if (yearElement) yearElement.textContent = new Date().getFullYear();

// ---------- Ganesh Chaturthi 2027 countdown ----------
// Target: 4 September 2027, 00:00 India Standard Time.
// Confirm the local puja muhurat for the committee's city before publishing worship timings.
const ganeshPujaTarget = new Date('2027-09-04T00:00:00+05:30').getTime();
const countdownFields = {
  days: document.querySelector('#countdown-days'),
  hours: document.querySelector('#countdown-hours'),
  minutes: document.querySelector('#countdown-minutes'),
  seconds: document.querySelector('#countdown-seconds')
};
const countdownMessage = document.querySelector('#countdown-message');

function updateGaneshCountdown() {
  if (Object.values(countdownFields).some((f) => !f)) return;

  const remaining = ganeshPujaTarget - Date.now();
  if (remaining <= 0) {
    Object.values(countdownFields).forEach((field) => { field.textContent = '00'; });
    if (countdownMessage) countdownMessage.textContent = 'Ganesh Chaturthi 2027 is here! Ganpati Bappa Morya!';
    return;
  }

  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  countdownFields.days.textContent = String(days).padStart(3, '0');
  countdownFields.hours.textContent = String(hours).padStart(2, '0');
  countdownFields.minutes.textContent = String(minutes).padStart(2, '0');
  countdownFields.seconds.textContent = String(seconds).padStart(2, '0');
}

updateGaneshCountdown();
setInterval(updateGaneshCountdown, 1000);
