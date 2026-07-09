/* ============================================================
   NIHAL DHOKE PORTFOLIO — script.js (v2 Professional)
   ============================================================ */

/* ── Loader ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    initAnimations();
  }, 1500);
});

/* ── Navbar ── */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;
  sections.forEach(sec => {
    const link = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
    if (!link) return;
    if (sec.offsetTop <= scrollPos && sec.offsetTop + sec.offsetHeight > scrollPos) {
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

/* ── Typing effect ── */
function initTyping() {
  const roles = [
    'Digital Marketing Leader',
    'SEO Specialist',
    'Social Media Strategist',
    'Paid Media Expert',
    'Content Systems Builder'
  ];
  const el = document.getElementById('typingText');
  if (!el) return;
  let roleIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = roles[roleIdx];
    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        setTimeout(() => { deleting = true; type(); }, 2200);
        return;
      }
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
    setTimeout(type, deleting ? 55 : 90);
  }
  type();
}

/* ── Particles ── */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = window.innerWidth < 768 ? 20 : 45;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 4 + 1;
    const delay = Math.random() * 12;
    const duration = Math.random() * 14 + 8;
    const left = Math.random() * 100;
    const hue = Math.random() > 0.5 ? '217, 91%, 60%' : '271, 91%, 65%';
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${left}%;
      animation-duration:${duration}s;
      animation-delay:-${delay}s;
      background: hsl(${hue});
      opacity: ${Math.random() * 0.6 + 0.2};
    `;
    container.appendChild(p);
  }
}

/* ── Animated counters ── */
function animateCounter(el) {
  const target   = parseInt(el.dataset.target);
  const suffix   = el.dataset.suffix || '';
  const duration = 2000;
  const start    = performance.now();
  const update   = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (p < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

/* ── Skill bars ── */
function animateSkillBars() {
  document.querySelectorAll('.skill-fill').forEach(bar => {
    bar.style.width = bar.dataset.width + '%';
  });
}

/* ── AOS (Animate on Scroll) ── */
function initAOS() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || 0);
        setTimeout(() => el.classList.add('aos-animate'), delay);
        observer.unobserve(el);

        // Trigger counters when stats bar visible
        if (el.classList.contains('hero-stats-bar')) {
          el.querySelectorAll('.stat-num[data-target]').forEach(animateCounter);
        }
        // Trigger skill bars when skills section visible
        if (el.closest('#skills')) {
          setTimeout(animateSkillBars, 300);
        }
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

  // Also observe stats bar and skills section separately
  const statsBar = document.querySelector('.hero-stats-bar');
  if (statsBar) observer.observe(statsBar);
}

/* ── Smooth hover tilt on project card ── */
function initTilt() {
  document.querySelectorAll('.skill-card, .insight-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
      const y = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
      card.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ── Cursor glow on insight cards ── */
function initGlow() {
  document.querySelectorAll('.insight-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width ) * 100;
      const y = ((e.clientY - r.top)  / r.height) * 100;
      card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(59,130,246,0.08), var(--surface) 60%)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });
}

/* ── Parallax orb on mouse move ── */
function initParallax() {
  const heroBg = document.querySelector('.hero-bg-img');
  if (!heroBg) return;
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    heroBg.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
  });
}

/* ── Smooth scroll for all anchor links ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ── Contact item slide animation ── */
function initContactAnimations() {
  const items = document.querySelectorAll('.contact-detail-item');
  items.forEach((item, i) => {
    item.style.transitionDelay = `${i * 80}ms`;
  });
}

/* ── Init all ── */
function initAnimations() {
  initTyping();
  initParticles();
  initAOS();
  initTilt();
  initGlow();
  initParallax();
  initSmoothScroll();
  initContactAnimations();
}
