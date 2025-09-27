(function(){
  const WA_NUMBER = '919103594759';
  const CURRENCY = 'INR';

  function getCart(){
    try { return JSON.parse(localStorage.getItem('cart')||'[]'); } catch { return []; }
  }
  function setCart(items){ localStorage.setItem('cart', JSON.stringify(items)); updateCartBadges(); }
  function updateCartBadges(){
    const count = getCart().reduce((s,i)=>s+i.qty,0);
    document.querySelectorAll('#cart-count,#cart-count-2').forEach(el=>{ if (el) el.textContent = String(count); });
  }
  function formatPrice(p){ return new Intl.NumberFormat('en-IN',{style:'currency', currency:CURRENCY, maximumFractionDigits:0}).format(p); }

  async function loadProducts(){
    const container = document.getElementById('products');
    if (!container) return;
    try {
      const res = await fetch('./assets/data/products.json?v=' + Date.now());
      const products = await res.json();
      let current = products.slice();
      function render(list){
        container.innerHTML = list.map(p => `
        <article class="product-card">
          <img src="${p.image}" alt="${p.name}">
          <div class="body">
            <div class="name">${p.name}</div>
            <div class="price">${formatPrice(p.price)}</div>
            <div class="actions">
              <button class="btn primary" data-add="${p.id}">Add to Cart</button>
            </div>
          </div>
        </article>
      `).join('');
      }
      render(current);
      const search = document.getElementById('search-box');
      if (search) {
        search.addEventListener('input', () => {
          const q = search.value.trim().toLowerCase();
          current = products.filter(p => p.name.toLowerCase().includes(q));
          render(current);
        });
      }
      container.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-add]');
        if (!btn) return;
        const id = btn.getAttribute('data-add');
        const product = products.find(x=>x.id===id);
        if (!product) return;
        const cart = getCart();
        const idx = cart.findIndex(x=>x.id===id);
        if (idx>=0) cart[idx].qty += 1; else cart.push({id, name: product.name, price: product.price, image: product.image, qty: 1});
        setCart(cart);
      });
    } catch (e) {
      container.innerHTML = '<p>Failed to load products.</p>';
    }
  }

  function renderCart(){
    const list = document.getElementById('cart-list');
    if (!list) return;
    const cart = getCart();
    list.innerHTML = cart.map((item, i)=>`
      <div class="cart-item" data-index="${i}">
        <img src="${item.image}" alt="${item.name}">
        <div class="meta">
          <div><strong>${item.name}</strong></div>
          <div>${formatPrice(item.price)}</div>
          <div class="qty">
            <button data-dec>−</button>
            <input value="${item.qty}" aria-label="Quantity" readonly>
            <button data-inc>+</button>
            <button data-del style="margin-left:8px">Remove</button>
          </div>
        </div>
        <div><strong>${formatPrice(item.price*item.qty)}</strong></div>
      </div>
    `).join('');
    const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
    const totalEl = document.getElementById('cart-total');
    if (totalEl) totalEl.textContent = formatPrice(total);
    const checkout = document.getElementById('checkout-wa');
    if (checkout) {
      const text = encodeURIComponent(cart.map(i=>`${i.name} x${i.qty} = ${formatPrice(i.price*i.qty)}`).join('\n')+`\nTotal: ${formatPrice(total)}`);
      checkout.href = `https://wa.me/${WA_NUMBER}?text=${text}`;
    }
    list.onclick = (e)=>{
      const row = e.target.closest('.cart-item');
      if (!row) return;
      const index = Number(row.getAttribute('data-index'));
      const cart = getCart();
      if (e.target.hasAttribute('data-inc')) cart[index].qty += 1;
      else if (e.target.hasAttribute('data-dec')) cart[index].qty = Math.max(1, cart[index].qty-1);
      else if (e.target.hasAttribute('data-del')) cart.splice(index,1);
      setCart(cart);
      renderCart();
    };
  }

  // init
  updateCartBadges();
  loadProducts();
  renderCart();
})();

