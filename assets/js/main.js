(function(){
  // Mobile nav
  const navToggle=document.querySelector('.nav-toggle');
  const navLinks=document.querySelector('.nav-links');
  if(navToggle&&navLinks){
    navToggle.addEventListener('click',()=>{
      const isOpen=navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded',String(isOpen));
    });
  }

  // Reveal on scroll
  const revealEls=document.querySelectorAll('.reveal');
  if(revealEls.length){
    const io=new IntersectionObserver((entries)=>{
      entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('reveal-visible');io.unobserve(e.target);}});
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

  // Typing effect for "a Developer"
  const typingEl=document.getElementById('typing');
  const text='a Developer';
  if(typingEl){
    let i=0;
    const tick=()=>{
      typingEl.textContent=text.slice(0,i);
      i=i<text.length?i+1:0;
      setTimeout(tick,i===0?800:120);
    };
    tick();
  }
})();
