/* Books list renderer. Data comes from data/books.js */
(function () {
  const books = Array.isArray(window.BOOKS) ? window.BOOKS : [];
  const list = document.getElementById('books');
  if (!list) return;

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  list.innerHTML = books.map((b) => {
    const cover = b.cover
      ? `<img src="${esc(b.cover)}" alt="Cover of ${esc(b.title)}" loading="lazy">`
      : `<span>${esc(b.title)}</span>`;
    const tags = (b.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join('');
    const actions = b.status === 'coming-soon'
      ? `<span class="badge-soon">Coming soon: being prepared for this library</span>`
      : (b.links || []).map((l, i) => `<a class="btn ${i === 0 ? 'btn--primary' : 'btn--outline'}" href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join('');
    return `
      <article class="book reveal">
        <div class="book__cover">${cover}</div>
        <div class="book__body">
          <h3>${esc(b.title)}</h3>
          <div class="book__author">${b.authorUrl ? `<a href="${esc(b.authorUrl)}" target="_blank" rel="noopener">${esc(b.author)}</a>` : esc(b.author)}${b.year ? ` · ${esc(b.year)}` : ''}</div>
          ${b.note ? `<div class="book__note">${esc(b.note)}</div>` : ''}
          <p>${esc(b.description)}</p>
          <div class="book__tags">${tags}</div>
          <div class="book__actions">${actions}</div>
        </div>
      </article>`;
  }).join('');

  requestAnimationFrame(() => list.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible')));
})();
