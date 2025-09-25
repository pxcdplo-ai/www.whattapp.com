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
})();
