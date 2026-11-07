'use strict';

const LANGS = ['tr', 'en', 'ru', 'es'];
let currentLang = LANGS.includes(localStorage.getItem('fuego_lang')) ? localStorage.getItem('fuego_lang') : 'tr';
let menuData = null;
let searchActive = false;

const UI = {
  title:       { tr: 'Menü', en: 'Menu', ru: 'Меню', es: 'Carta' },
  search:      { tr: 'Menüde ara...', en: 'Search menu...', ru: 'Поиск по меню...', es: 'Buscar en la carta...' },
  noResults:   { tr: '"{q}" için sonuç yok. Başka bir yemek adı deneyin.', en: 'No results for "{q}". Try another dish name.',
                 ru: 'По запросу «{q}» ничего не найдено. Попробуйте другое название блюда.', es: 'No hay resultados para «{q}». Prueba con otro plato.' },
  footer:      { tr: 'Fiyatlarımıza tüm vergiler dahildir. Servis ücreti alınmaz.',
                 en: 'All taxes included. No service charge.',
                 ru: 'Все налоги включены. Плата за обслуживание не взимается.',
                 es: 'Impuestos incluidos. No cobramos servicio.' }
};

// Inline SVG flags (emoji flags don't render on Windows)
const FLAGS = {
  tr: '<svg class="flag" viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#E30A17"/><circle cx="11.25" cy="10" r="5" fill="#fff"/><circle cx="12.5" cy="10" r="4" fill="#E30A17"/><polygon transform="translate(-1.6 0)" fill="#fff" points="16.60,10.00 18.40,9.42 18.40,7.53 19.51,9.06 21.30,8.47 20.19,10.00 21.30,11.53 19.51,10.94 18.40,12.47 18.40,10.58"/></svg>',
  en: '<svg class="flag" viewBox="0 0 60 30" aria-hidden="true" preserveAspectRatio="none"><rect width="60" height="30" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="2"/><path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/></svg>',
  ru: '<svg class="flag" viewBox="0 0 9 6" aria-hidden="true"><rect width="9" height="2" fill="#fff"/><rect y="2" width="9" height="2" fill="#0039A6"/><rect y="4" width="9" height="2" fill="#D52B1E"/></svg>',
  es: '<svg class="flag" viewBox="0 0 12 8" aria-hidden="true"><rect width="12" height="8" fill="#AA151B"/><rect y="2" width="12" height="4" fill="#F1BF00"/></svg>'
};
const LANG_NAMES = { tr: 'Türkçe', en: 'English', ru: 'Русский', es: 'Español' };

const TAG_LABELS = {
  vegetarian: { tr: 'Vejetaryen', en: 'Vegetarian', ru: 'Вегетарианское', es: 'Vegetariano', icon: '🌱' },
  vegan:      { tr: 'Vegan',      en: 'Vegan',      ru: 'Веганское',      es: 'Vegano',      icon: '🌿' },
  spicy:      { tr: 'Acı',        en: 'Spicy',      ru: 'Острое',         es: 'Picante',     icon: '🌶️' }
};

const BADGE_LABELS = {
  popular: { tr: 'Popüler', en: 'Popular', ru: 'Популярное', es: 'Popular' },
  new:     { tr: 'Yeni',    en: 'New',     ru: 'Новинка',    es: 'Nuevo' }
};

// ru/es fall back to English (tourists read it more easily than Turkish)
function t(obj) {
  if (!obj) return '';
  return obj[currentLang] || obj.en || obj.tr || '';
}

// Merge js/translations.js into the menu data (only fills languages that are missing)
function applyTranslations(d) {
  if (typeof TRANSLATIONS === 'undefined') return;
  const put = (obj, lang, val) => { if (obj && val && !obj[lang]) obj[lang] = val; };
  put(d.restaurant.tagline, 'ru', TRANSLATIONS.tagline.ru);
  put(d.restaurant.tagline, 'es', TRANSLATIONS.tagline.es);
  d.categories.forEach(c => {
    const tr = TRANSLATIONS.categories[c.id];
    if (tr) { put(c.name, 'ru', tr[0]); put(c.name, 'es', tr[1]); }
  });
  d.items.forEach(it => {
    const tr = TRANSLATIONS.items[it.id];
    if (!tr) return;
    put(it.name, 'ru', tr[0]); put(it.name, 'es', tr[1]);
    if (it.description) { put(it.description, 'ru', tr[2]); put(it.description, 'es', tr[3]); }
  });
}

function formatPrice(price, currency) {
  return `${currency || '₺'}${Number(price).toLocaleString('tr-TR')}`;
}

async function initMenu() {
  menuData = getData(await loadPublished());
  applyTranslations(menuData);
  const d = menuData;
  const r = d.restaurant;

  document.title = `${r.name} ${r.subtitle} — Menü`;
  renderHeader(r);
  renderHero(r);
  renderCategoryNav(d);
  renderMenuSections(d);
  setupSearch(d);
  setupLangToggle();
  setupScrollSpy();
  renderFooter();
  document.getElementById('lightbox').addEventListener('click', closePhoto);
}

function renderHeader(r) {
  const logoEl = document.getElementById('headerLogo');
  const nameEl = document.getElementById('headerName');
  const subEl  = document.getElementById('headerSub');

  if (r.logo) logoEl.src = r.logo; // admin upload overrides the built-in flame
  nameEl.textContent = r.name;
  subEl.textContent  = r.subtitle;
}

function renderHero(r) {
  document.getElementById('heroTagline').textContent = t(r.tagline);
}

function renderCategoryNav(d) {
  const cats = d.categories
    .filter(c => c.visible)
    .sort((a, b) => a.order - b.order);

  const nav = document.getElementById('catNavInner');
  nav.innerHTML = cats.map((c, i) =>
    `<button class="cat-tab${i === 0 ? ' active' : ''}" data-cat="${c.id}" onclick="scrollToCategory('${c.id}')">
      ${t(c.name)}
    </button>`
  ).join('');
}

function renderMenuSections(d) {
  const cats = d.categories.filter(c => c.visible).sort((a, b) => a.order - b.order);
  const content = document.getElementById('menuContent');
  content.innerHTML = '';

  cats.forEach(cat => {
    const items = d.items
      .filter(it => it.categoryId === cat.id && it.visible)
      .sort((a, b) => a.order - b.order);

    if (!items.length) return;

    const section = document.createElement('section');
    section.className = 'menu-section';
    section.id = `section_${cat.id}`;
    section.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">${t(cat.name)}</h2>
        <div class="section-divider"></div>
      </div>
      <div class="items-list">
        ${items.map(item => renderItemCard(item, d.restaurant)).join('')}
      </div>`;
    content.appendChild(section);
  });
}

function renderItemCard(item, restaurant) {
  const hasImg = !!item.image;
  const badges = (item.badges || []).map(b =>
    `<span class="badge badge-${b}">${BADGE_LABELS[b] ? t(BADGE_LABELS[b]) : b}</span>`
  ).join('');
  const tags = (item.tags || []).map(tg =>
    TAG_LABELS[tg] ? `<span class="tag">${TAG_LABELS[tg].icon} ${t(TAG_LABELS[tg])}</span>` : ''
  ).join('');

  // price 0 = not set yet → show no price and no leader line
  const price = item.price ? `<span class="item-leader"></span><span class="item-price">${formatPrice(item.price, restaurant.currency)}</span>` : '';

  return `
    <div class="item-card" data-id="${item.id}">
      <div class="item-info">
        <div class="item-top">
          <h3 class="item-name">${t(item.name)}</h3>
          ${price}
        </div>
        ${t(item.description) ? `<p class="item-desc">${t(item.description)}</p>` : ''}
        <div class="item-meta">${badges}${tags}</div>
      </div>
      ${hasImg ? `<button type="button" class="item-img-wrap" onclick="openPhoto(this)" aria-label="${t(item.name)}"><img class="item-img" src="${encodeURI(item.image)}" alt="${t(item.name)}" loading="lazy" onerror="this.parentElement.remove()"></button>` : ''}
    </div>`;
}

function openPhoto(btn) {
  const img = btn.querySelector('img');
  document.getElementById('lightboxImg').src = img.src;
  document.getElementById('lightboxImg').alt = img.alt;
  document.getElementById('lightboxCap').textContent = img.alt;
  document.getElementById('lightbox').classList.add('open');
}

function closePhoto() { document.getElementById('lightbox').classList.remove('open'); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closePhoto(); });

function renderFooter() {
  document.getElementById('footerNote').textContent = t(UI.footer);
  document.documentElement.lang = currentLang;
  document.getElementById('heroTitle').textContent = t(UI.title);
  document.getElementById('searchInput').placeholder = t(UI.search);
}

function scrollToCategory(catId) {
  const target = document.getElementById(`section_${catId}`);
  if (!target) return;
  const navH = document.getElementById('categoryNav').offsetHeight;
  const headerH = document.getElementById('siteHeader').offsetHeight;
  const top = target.getBoundingClientRect().top + window.scrollY - navH - headerH - 8;
  window.scrollTo({ top, behavior: 'smooth' });
}

function setupScrollSpy() {
  const sections = document.querySelectorAll('.menu-section');
  const tabs = () => document.querySelectorAll('.cat-tab');
  const navH = () => document.getElementById('categoryNav').offsetHeight + document.getElementById('siteHeader').offsetHeight + 20;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id.replace('section_', '');
        tabs().forEach(t => t.classList.toggle('active', t.dataset.cat === id));
        const activeTab = document.querySelector(`.cat-tab[data-cat="${id}"]`);
        if (activeTab) activeTab.scrollIntoView({ inline: 'nearest', block: 'nearest' });
      }
    });
  }, { rootMargin: `-${navH()}px 0px -60% 0px`, threshold: 0 });

  sections.forEach(s => obs.observe(s));
}

function setupSearch(d) {
  const btn  = document.getElementById('searchBtn');
  const bar  = document.getElementById('searchBar');
  const inp  = document.getElementById('searchInput');

  btn.addEventListener('click', () => {
    searchActive = !searchActive;
    bar.classList.toggle('visible', searchActive);
    if (searchActive) { inp.focus(); }
    else { inp.value = ''; renderMenuSections(d); renderCategoryNav(d); }
  });

  inp.addEventListener('input', () => {
    const q = inp.value.trim().toLowerCase();
    if (!q) { renderMenuSections(d); renderCategoryNav(d); return; }

    const filtered = {
      ...d,
      items: d.items.filter(it =>
        it.visible && (
          t(it.name).toLowerCase().includes(q) ||
          t(it.description).toLowerCase().includes(q)
        )
      )
    };
    renderMenuSections(filtered);
    if (!filtered.items.length) {
      const p = document.createElement('p');
      p.className = 'empty-state';
      p.textContent = t(UI.noResults).replace('{q}', inp.value);
      document.getElementById('menuContent').replaceChildren(p);
    }

    const visibleCats = new Set(filtered.items.map(i => i.categoryId));
    document.querySelectorAll('.menu-section').forEach(s => {
      const catId = s.id.replace('section_', '');
      s.style.display = visibleCats.has(catId) ? '' : 'none';
    });
  });
}

function setupLangToggle() {
  const btn  = document.getElementById('langBtn');
  const menu = document.getElementById('langMenu');
  const paint = () => {
    btn.innerHTML = `${FLAGS[currentLang]}<span>${currentLang.toUpperCase()}</span>`;
    menu.innerHTML = LANGS.map(l =>
      `<button type="button" class="lang-option" data-lang="${l}" aria-current="${l === currentLang}">${FLAGS[l]}${LANG_NAMES[l]}</button>`
    ).join('');
  };
  const toggle = open => { menu.hidden = !open; btn.setAttribute('aria-expanded', open); };
  paint();

  btn.addEventListener('click', e => { e.stopPropagation(); toggle(menu.hidden); });
  document.addEventListener('click', () => toggle(false));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') toggle(false); });

  menu.addEventListener('click', e => {
    const opt = e.target.closest('.lang-option');
    if (!opt) return;
    currentLang = opt.dataset.lang;
    localStorage.setItem('fuego_lang', currentLang);
    paint();
    toggle(false);
    renderHero(menuData.restaurant);
    renderCategoryNav(menuData);
    renderMenuSections(menuData);
    setupScrollSpy();
    renderFooter();
  });
}

document.addEventListener('DOMContentLoaded', initMenu);
