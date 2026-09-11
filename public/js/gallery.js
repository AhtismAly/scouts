/* Activities gallery: filters + lightbox. Data comes from data/activities.js */
(function () {
  const items = Array.isArray(window.ACTIVITIES) ? window.ACTIVITIES : [];
  const grid = document.getElementById('gallery');
  const filterBar = document.getElementById('filters');
  if (!grid) return;

  const labels = {
    all: 'All', camping: 'Camping & Treks', service: 'Service', ceremony: 'Ceremonies & Heritage',
    training: 'Training', sports: 'Sports', culture: 'Culture'
  };
  const cats = ['all', ...new Set(items.map((i) => i.category).filter(Boolean))];
  let current = 'all';
  let visible = [];

  function renderFilters() {
    if (!filterBar) return;
    filterBar.innerHTML = cats.map((c) =>
      `<button class="chip${c === current ? ' is-active' : ''}" data-cat="${c}" type="button">${labels[c] || c}</button>`
    ).join('');
  }

  function render() {
    visible = items.filter((i) => current === 'all' || i.category === current);
    if (!visible.length) {
      grid.innerHTML = `<div class="empty">No photos in this category yet.</div>`;
      return;
    }
    grid.innerHTML = visible.map((it, idx) => `
      <button class="tile reveal" type="button" data-idx="${idx}" aria-label="Open photo: ${escapeHtml(it.caption)}">
        <img src="${it.src}" alt="${escapeHtml(it.caption)}" loading="lazy">
        <span class="tile__cap">${escapeHtml(it.caption)}<small>${escapeHtml(it.date || '')}</small></span>
      </button>`).join('');
    requestAnimationFrame(() => grid.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible')));
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  /* Lightbox */
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.innerHTML = `
    <button class="lightbox__close" aria-label="Close">&times;</button>
    <button class="lightbox__nav lightbox__nav--prev" aria-label="Previous">&#8249;</button>
    <div><img alt=""><div class="lightbox__cap"></div></div>
    <button class="lightbox__nav lightbox__nav--next" aria-label="Next">&#8250;</button>`;
  document.body.appendChild(lb);
  const lbImg = lb.querySelector('img');
  const lbCap = lb.querySelector('.lightbox__cap');
  let pos = 0;

  function open(i) {
    pos = i; const it = visible[pos]; if (!it) return;
    lbImg.src = it.src; lbImg.alt = it.caption;
    lbCap.innerHTML = `${escapeHtml(it.caption)}<small>${escapeHtml([it.date, it.credit].filter(Boolean).join(' · '))}</small>`;
    lb.classList.add('is-open'); document.body.style.overflow = 'hidden';
  }
  function close() { lb.classList.remove('is-open'); document.body.style.overflow = ''; }
  function step(d) { open((pos + d + visible.length) % visible.length); }

  grid.addEventListener('click', (e) => {
    const t = e.target.closest('.tile[data-idx]'); if (t) open(Number(t.dataset.idx));
  });
  lb.querySelector('.lightbox__close').addEventListener('click', close);
  lb.querySelector('.lightbox__nav--prev').addEventListener('click', () => step(-1));
  lb.querySelector('.lightbox__nav--next').addEventListener('click', () => step(1));
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });

  if (filterBar) filterBar.addEventListener('click', (e) => {
    const b = e.target.closest('.chip'); if (!b) return;
    current = b.dataset.cat; renderFilters(); render();
  });

  renderFilters(); render();
})();
