/* ============================================================
   YEARS OF EXPERIENCE — calculated from July 2011
   ============================================================ */
(function () {
  const start = new Date(2011, 6, 1);
  const now = new Date();
  const years = now.getFullYear() - start.getFullYear() -
    (now < new Date(now.getFullYear(), 6, 1) ? 1 : 0);
  const label = years + '+';
  document.querySelectorAll('#exp-years, .exp-highlight').forEach(el => {
    el.textContent = label;
  });
})();

/* ============================================================
   HERO ENTRANCE ANIMATION — staggered fade-up on load
   ============================================================ */
(function () {
  const heroEls = document.querySelectorAll('.hero-entrance');
  heroEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('hero-visible'), 120 + i * 130);
  });
})();

/* ============================================================
   NAV — scroll state + mobile burger + active link
   ============================================================ */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

const burger = document.querySelector('.nav-burger');
burger.addEventListener('click', () => nav.classList.toggle('menu-open'));

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('menu-open'));
});

// Active nav link — scroll-based, picks whichever section top is nearest above midpoint
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

function updateActiveNav() {
  const mid = window.scrollY + window.innerHeight * 0.4;
  let current = '';
  sections.forEach(s => {
    if (s.offsetTop <= mid) current = s.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('nav-active', link.getAttribute('href') === '#' + current);
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

/* ============================================================
   TYPEWRITER
   ============================================================ */
const typewriterEl = document.querySelector('.typewriter');
if (typewriterEl) {
  const words = JSON.parse(typewriterEl.dataset.words);
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let pauseTimer = null;

  function tick() {
    const current = words[wordIdx];
    const displayed = isDeleting
      ? current.slice(0, charIdx - 1)
      : current.slice(0, charIdx + 1);

    typewriterEl.textContent = displayed;
    charIdx = isDeleting ? charIdx - 1 : charIdx + 1;

    let delay = isDeleting ? 55 : 95;

    if (!isDeleting && charIdx === current.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      delay = 300;
    }

    clearTimeout(pauseTimer);
    pauseTimer = setTimeout(tick, delay);
  }

  tick();
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

/* stagger siblings inside grids */
document.querySelectorAll('.skills-grid, .highlights-grid, .snapshots-grid, .timeline').forEach(grid => {
  grid.querySelectorAll('.reveal').forEach((el, i) => {
    el.dataset.delay = i * 80;
  });
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================================
   CONTACT FORM — async Formspree submission
   ============================================================ */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    const successMsg = document.getElementById('form-success');
    btn.disabled = true;
    btn.querySelector('.submit-text').textContent = 'Sending…';

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        contactForm.reset();
        successMsg.classList.add('visible');
        btn.querySelector('.submit-text').textContent = 'Sent!';
      } else {
        btn.querySelector('.submit-text').textContent = 'Try again';
        btn.disabled = false;
      }
    } catch {
      btn.querySelector('.submit-text').textContent = 'Try again';
      btn.disabled = false;
    }
  });
}
