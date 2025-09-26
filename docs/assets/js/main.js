(function(){
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }
  // Avatar lightbox
  const avatar = document.querySelector('.profile-avatar img');
  const lightbox = document.getElementById('avatar-lightbox');
  if (avatar && lightbox) {
    const closeBtn = lightbox.querySelector('.lightbox-close');
    avatar.addEventListener('click', () => {
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
    });
    const close = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
    };
    closeBtn && closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  const form = document.getElementById('contact-form');
  if (form) {
    const status = document.getElementById('form-status');
    const showError = (id, message) => {
      const el = document.querySelector(`[data-error-for="${id}"]`);
      if (el) el.textContent = message || '';
    };
    const validate = () => {
      let valid = true;
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      if (name && !name.value.trim()) { showError('name', 'Name is required'); valid = false; } else showError('name');
      if (email) {
        const val = email.value.trim();
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        if (!ok) { showError('email', 'Enter a valid email'); valid = false; } else showError('email');
      }
      if (message && !message.value.trim()) { showError('message', 'Message is required'); valid = false; } else showError('message');
      return valid;
    };
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()) return;
      if (status) status.textContent = 'Thanks! Your message has been sent (demo).';
      form.reset();
    });
  }
  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('reveal-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  }
})();
