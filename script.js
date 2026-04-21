/* ──────────────────────────────────────────────────────────
   SCROLL PROGRESS BAR
────────────────────────────────────────────────────────── */
const progressBar = document.getElementById('progress-bar');

function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}

/* ──────────────────────────────────────────────────────────
   ACTIVE NAV LINK ON SCROLL
────────────────────────────────────────────────────────── */
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function setActiveLink() {
  let current = '';
  const scrollY = window.scrollY + 140;

  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop) current = sec.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.target === current);
  });
}

/* ──────────────────────────────────────────────────────────
   SCROLL TO TOP VISIBILITY
────────────────────────────────────────────────────────── */
const scrollTopBtn = document.getElementById('scrollTop');

function onScroll() {
  updateProgress();
  setActiveLink();
  scrollTopBtn.classList.toggle('visible', window.scrollY > 450);
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ──────────────────────────────────────────────────────────
   SMOOTH SCROLL + CLOSE MOBILE MENU ON NAV CLICK
────────────────────────────────────────────────────────── */
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.getElementById(link.dataset.target);
    if (target) {
      const isMobile = window.innerWidth <= 768;
      const offset = isMobile ? 60 : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    closeSidebar();
  });
});

/* ──────────────────────────────────────────────────────────
   MOBILE SIDEBAR
────────────────────────────────────────────────────────── */
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar() {
  sidebar.classList.add('open');
  menuToggle.classList.add('open');
  menuToggle.setAttribute('aria-expanded', 'true');
  sidebarOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebar.classList.remove('open');
  menuToggle.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  sidebarOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

menuToggle.addEventListener('click', () => {
  sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
});

sidebarOverlay.addEventListener('click', closeSidebar);

/* Close with Escape */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSidebar();
});

/* ──────────────────────────────────────────────────────────
   SCROLL REVEAL (IntersectionObserver)
────────────────────────────────────────────────────────── */
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => revealObserver.observe(el));

/* ──────────────────────────────────────────────────────────
   CONTACT FORM FEEDBACK
────────────────────────────────────────────────────────── */
document.querySelector('.contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = this.querySelector('[type="submit"]');
  const orig = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i> Sent!';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = orig;
    btn.disabled = false;
    this.reset();
  }, 3000);
});
