(function(){
  const yearEl=document.getElementById('year');
  if(yearEl) yearEl.textContent=new Date().getFullYear();

  // Mobile nav
  const navToggle=document.querySelector('.nav-toggle');
  const navLinks=document.querySelector('.nav-links');
  if(navToggle && navLinks){
    navToggle.addEventListener('click',()=>{
      const isOpen=navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Theme
  const THEME_KEY='pref-theme';
  const applyTheme=(theme)=>{document.documentElement.setAttribute('data-theme',theme)};
  const saved=localStorage.getItem(THEME_KEY);
  if(saved==='light'||saved==='dark') applyTheme(saved);
  const toggle=document.getElementById('theme-toggle');
  if(toggle){
    toggle.addEventListener('click',()=>{
      const current=document.documentElement.getAttribute('data-theme')||'dark';
      const next=current==='dark'?'light':'dark';
      applyTheme(next);localStorage.setItem(THEME_KEY,next);
    });
  }

  // Reveal on scroll
  const revealEls=document.querySelectorAll('.reveal');
  if(revealEls.length){
    const io=new IntersectionObserver((entries)=>{
      entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('reveal-visible');io.unobserve(e.target);}})
    },{threshold:0.15});
    revealEls.forEach(el=>io.observe(el));
  }

  // Smooth scroll for hash links
  document.addEventListener('click',(e)=>{
    const a=e.target.closest('a[href^="#"]');
    if(!a) return; const id=a.getAttribute('href');
    if(!id||id==='#') return; const target=document.querySelector(id);
    if(!target) return; e.preventDefault();
    target.scrollIntoView({behavior:'smooth',block:'start'});
    history.pushState(null,'',id);
  });
})();
