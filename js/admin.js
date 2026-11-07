'use strict';

let adminData = null;
let editingItem = null;
let editingCat = null;
let currentSection = 'items';

// ── Auth ──────────────────────────────────────────────────────────────────────
function checkAuth() {
  const session = sessionStorage.getItem('fuego_admin_ok');
  if (session === '1') { showAdmin(); return; }
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('adminApp').style.display = 'none';
}

document.getElementById('loginForm').addEventListener('submit', e => {
  e.preventDefault();
  const pass = document.getElementById('passInput').value;
  if (pass === getAdminPass()) {
    sessionStorage.setItem('fuego_admin_ok', '1');
    document.getElementById('loginScreen').style.display = 'none';
    showAdmin();
  } else {
    document.getElementById('loginError').textContent = 'Şifre hatalı.';
  }
});

function showAdmin() {
  adminData = getData();
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('adminApp').style.display = 'flex';
  showSection('items');
  renderQR();
  updatePublishStatus();
}

// ── Navigation ────────────────────────────────────────────────────────────────
function showSection(sec) {
  currentSection = sec;
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.sec === sec));
  document.querySelectorAll('.admin-section').forEach(s => s.style.display = 'none');
  document.getElementById(`sec_${sec}`).style.display = 'block';

  if (sec === 'items')      renderItemsList();
  if (sec === 'categories') renderCatList();
  if (sec === 'restaurant') renderRestaurantForm();
  if (sec === 'settings')   renderSettingsForm();
  if (sec === 'qr')         renderQR();
}

// ── Items ─────────────────────────────────────────────────────────────────────
function renderItemsList() {
  const cats = adminData.categories.sort((a, b) => a.order - b.order);
  const container = document.getElementById('itemsList');

  const filterCat = document.getElementById('filterCat').value;
  const filterQ   = document.getElementById('filterSearch').value.toLowerCase();

  let items = adminData.items;
  if (filterCat) items = items.filter(i => i.categoryId === filterCat);
  if (filterQ)   items = items.filter(i =>
    (i.name.tr + i.name.en + i.description.tr).toLowerCase().includes(filterQ)
  );
  items = items.sort((a, b) => {
    const catDiff = (adminData.categories.find(c => c.id === a.categoryId)?.order || 0) -
                    (adminData.categories.find(c => c.id === b.categoryId)?.order || 0);
    return catDiff || a.order - b.order;
  });

  // Populate filter dropdown
  const fd = document.getElementById('filterCat');
  const prev = fd.value;
  fd.innerHTML = '<option value="">Tüm Kategoriler</option>' +
    cats.map(c => `<option value="${c.id}" ${c.id === prev ? 'selected' : ''}>${c.name.tr}</option>`).join('');

  container.innerHTML = items.length ? items.map(item => {
    const cat = adminData.categories.find(c => c.id === item.categoryId);
    return `
      <div class="list-row ${item.visible ? '' : 'hidden-row'}">
        <div class="list-img">
          ${item.image ? `<img src="${item.image}" alt="">` : '<div class="no-img">📷</div>'}
        </div>
        <div class="list-info">
          <div class="list-name">${item.name.tr}</div>
          <div class="list-meta">${cat ? cat.name.tr : '—'} · ₺${item.price}</div>
        </div>
        <div class="list-actions">
          <button class="btn-icon" onclick="toggleItemVisible('${item.id}')" title="${item.visible ? 'Gizle' : 'Göster'}">
            ${item.visible ? '👁' : '👁‍🗨'}
          </button>
          <button class="btn-icon" onclick="moveItem('${item.id}', -1)" title="Yukarı">↑</button>
          <button class="btn-icon" onclick="moveItem('${item.id}', 1)" title="Aşağı">↓</button>
          <button class="btn-edit" onclick="openItemModal('${item.id}')">Düzenle</button>
          <button class="btn-delete" onclick="deleteItem('${item.id}')">Sil</button>
        </div>
      </div>`;
  }).join('') : '<p class="empty-msg">Ürün bulunamadı.</p>';
}

function openItemModal(id) {
  editingItem = id ? adminData.items.find(i => i.id === id) : null;
  const modal = document.getElementById('itemModal');
  const title = document.getElementById('itemModalTitle');
  title.textContent = editingItem ? 'Ürün Düzenle' : 'Yeni Ürün';

  // Populate category select
  const catSel = document.getElementById('itemCat');
  catSel.innerHTML = adminData.categories.sort((a, b) => a.order - b.order)
    .map(c => `<option value="${c.id}">${c.name.tr}</option>`).join('');

  if (editingItem) {
    document.getElementById('itemNameTR').value = editingItem.name.tr || '';
    document.getElementById('itemNameEN').value = editingItem.name.en || '';
    document.getElementById('itemDescTR').value = editingItem.description.tr || '';
    document.getElementById('itemDescEN').value = editingItem.description.en || '';
    document.getElementById('itemPrice').value = editingItem.price || '';
    catSel.value = editingItem.categoryId || '';
    document.getElementById('itemVisible').checked = editingItem.visible !== false;
    document.getElementById('tagVegetarian').checked = (editingItem.tags || []).includes('vegetarian');
    document.getElementById('tagVegan').checked = (editingItem.tags || []).includes('vegan');
    document.getElementById('tagSpicy').checked = (editingItem.tags || []).includes('spicy');
    document.getElementById('badgePopular').checked = (editingItem.badges || []).includes('popular');
    document.getElementById('badgeNew').checked = (editingItem.badges || []).includes('new');
    document.getElementById('itemImgPath').value = editingItem.image || '';
    const prev = document.getElementById('imgPreview');
    if (editingItem.image) { prev.src = editingItem.image; prev.style.display = 'block'; }
    else { prev.style.display = 'none'; }
  } else {
    document.getElementById('itemNameTR').value = '';
    document.getElementById('itemNameEN').value = '';
    document.getElementById('itemDescTR').value = '';
    document.getElementById('itemDescEN').value = '';
    document.getElementById('itemPrice').value = '';
    document.getElementById('itemImgPath').value = '';
    document.getElementById('imgPreview').style.display = 'none';
    catSel.value = adminData.categories[0]?.id || '';
    document.getElementById('itemVisible').checked = true;
    ['tagVegetarian','tagVegan','tagSpicy','badgePopular','badgeNew'].forEach(id => {
      document.getElementById(id).checked = false;
    });
  }

  modal.style.display = 'flex';
}

function closeItemModal() {
  document.getElementById('itemModal').style.display = 'none';
  editingItem = null;
}

document.getElementById('itemImgPath').addEventListener('input', function() {
  const path = this.value.trim();
  const prev = document.getElementById('imgPreview');
  if (path) { prev.src = path; prev.style.display = 'block'; prev.onerror = () => prev.style.display = 'none'; }
  else { prev.style.display = 'none'; }
});

document.getElementById('itemForm').addEventListener('submit', e => {
  e.preventDefault();
  const tags = [];
  if (document.getElementById('tagVegetarian').checked) tags.push('vegetarian');
  if (document.getElementById('tagVegan').checked) tags.push('vegan');
  if (document.getElementById('tagSpicy').checked) tags.push('spicy');
  const badges = [];
  if (document.getElementById('badgePopular').checked) badges.push('popular');
  if (document.getElementById('badgeNew').checked) badges.push('new');

  const imgVal = document.getElementById('itemImgPath').value.trim();

  if (editingItem) {
    editingItem.name.tr = document.getElementById('itemNameTR').value.trim();
    editingItem.name.en = document.getElementById('itemNameEN').value.trim();
    editingItem.description.tr = document.getElementById('itemDescTR').value.trim();
    editingItem.description.en = document.getElementById('itemDescEN').value.trim();
    editingItem.price = parseFloat(document.getElementById('itemPrice').value) || 0;
    editingItem.categoryId = document.getElementById('itemCat').value;
    editingItem.visible = document.getElementById('itemVisible').checked;
    editingItem.tags = tags;
    editingItem.badges = badges;
    editingItem.image = imgVal;
  } else {
    const maxOrder = Math.max(0, ...adminData.items.map(i => i.order));
    adminData.items.push({
      id: uid('i'),
      categoryId: document.getElementById('itemCat').value,
      name: { tr: document.getElementById('itemNameTR').value.trim(), en: document.getElementById('itemNameEN').value.trim() },
      description: { tr: document.getElementById('itemDescTR').value.trim(), en: document.getElementById('itemDescEN').value.trim() },
      price: parseFloat(document.getElementById('itemPrice').value) || 0,
      image: imgVal,
      tags, badges,
      visible: document.getElementById('itemVisible').checked,
      order: maxOrder + 1
    });
  }

  saveData(adminData);
  closeItemModal();
  renderItemsList();
  showToast('Kaydedildi ✓');
});

function deleteItem(id) {
  if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;
  adminData.items = adminData.items.filter(i => i.id !== id);
  saveData(adminData);
  renderItemsList();
  showToast('Silindi');
}

function toggleItemVisible(id) {
  const item = adminData.items.find(i => i.id === id);
  if (item) { item.visible = !item.visible; saveData(adminData); renderItemsList(); }
}

function moveItem(id, dir) {
  const item = adminData.items.find(i => i.id === id);
  if (!item) return;
  const siblings = adminData.items
    .filter(i => i.categoryId === item.categoryId)
    .sort((a, b) => a.order - b.order);
  const idx = siblings.findIndex(i => i.id === id);
  const swapIdx = idx + dir;
  if (swapIdx < 0 || swapIdx >= siblings.length) return;
  const tmp = siblings[idx].order;
  siblings[idx].order = siblings[swapIdx].order;
  siblings[swapIdx].order = tmp;
  saveData(adminData);
  renderItemsList();
}

// ── Categories ────────────────────────────────────────────────────────────────
function renderCatList() {
  const cats = adminData.categories.sort((a, b) => a.order - b.order);
  const container = document.getElementById('catList');
  container.innerHTML = cats.map(cat => {
    const count = adminData.items.filter(i => i.categoryId === cat.id).length;
    return `
      <div class="list-row ${cat.visible ? '' : 'hidden-row'}">
        <div class="list-info">
          <div class="list-name">${cat.name.tr} <span class="cat-count">${count} ürün</span></div>
          <div class="list-meta">${cat.name.en || ''}</div>
        </div>
        <div class="list-actions">
          <button class="btn-icon" onclick="toggleCatVisible('${cat.id}')">${cat.visible ? '👁' : '👁‍🗨'}</button>
          <button class="btn-icon" onclick="moveCat('${cat.id}', -1)">↑</button>
          <button class="btn-icon" onclick="moveCat('${cat.id}', 1)">↓</button>
          <button class="btn-edit" onclick="openCatModal('${cat.id}')">Düzenle</button>
          <button class="btn-delete" onclick="deleteCat('${cat.id}')">Sil</button>
        </div>
      </div>`;
  }).join('');
}

function openCatModal(id) {
  editingCat = id ? adminData.categories.find(c => c.id === id) : null;
  document.getElementById('catModalTitle').textContent = editingCat ? 'Kategori Düzenle' : 'Yeni Kategori';
  document.getElementById('catNameTR').value = editingCat?.name.tr || '';
  document.getElementById('catNameEN').value = editingCat?.name.en || '';
  document.getElementById('catVisible').checked = editingCat?.visible !== false;
  document.getElementById('catModal').style.display = 'flex';
}

function closeCatModal() {
  document.getElementById('catModal').style.display = 'none';
  editingCat = null;
}

document.getElementById('catForm').addEventListener('submit', e => {
  e.preventDefault();
  if (editingCat) {
    editingCat.name.tr = document.getElementById('catNameTR').value.trim();
    editingCat.name.en = document.getElementById('catNameEN').value.trim();
    editingCat.visible = document.getElementById('catVisible').checked;
  } else {
    const maxOrder = Math.max(0, ...adminData.categories.map(c => c.order));
    adminData.categories.push({
      id: uid('cat'),
      name: { tr: document.getElementById('catNameTR').value.trim(), en: document.getElementById('catNameEN').value.trim() },
      order: maxOrder + 1,
      visible: document.getElementById('catVisible').checked
    });
  }
  saveData(adminData);
  closeCatModal();
  renderCatList();
  showToast('Kaydedildi ✓');
});

function deleteCat(id) {
  const count = adminData.items.filter(i => i.categoryId === id).length;
  if (!confirm(`Bu kategoriyi silmek istiyor musunuz? ${count > 0 ? `İçindeki ${count} ürün de silinecek.` : ''}`)) return;
  adminData.categories = adminData.categories.filter(c => c.id !== id);
  adminData.items = adminData.items.filter(i => i.categoryId !== id);
  saveData(adminData);
  renderCatList();
  showToast('Silindi');
}

function toggleCatVisible(id) {
  const cat = adminData.categories.find(c => c.id === id);
  if (cat) { cat.visible = !cat.visible; saveData(adminData); renderCatList(); }
}

function moveCat(id, dir) {
  const sorted = adminData.categories.sort((a, b) => a.order - b.order);
  const idx = sorted.findIndex(c => c.id === id);
  const swapIdx = idx + dir;
  if (swapIdx < 0 || swapIdx >= sorted.length) return;
  const tmp = sorted[idx].order;
  sorted[idx].order = sorted[swapIdx].order;
  sorted[swapIdx].order = tmp;
  saveData(adminData);
  renderCatList();
}

// ── Restaurant Info ───────────────────────────────────────────────────────────
function renderRestaurantForm() {
  const r = adminData.restaurant;
  document.getElementById('rName').value    = r.name || '';
  document.getElementById('rSubtitle').value = r.subtitle || '';
  document.getElementById('rTaglineTR').value = r.tagline?.tr || '';
  document.getElementById('rTaglineEN').value = r.tagline?.en || '';
  document.getElementById('rPhone').value   = r.phone || '';
  document.getElementById('rAddress').value = r.address || '';
  document.getElementById('rCurrency').value = r.currency || '₺';
  const lp = document.getElementById('logoPreview');
  lp.src = r.logo || '';
  lp.style.display = r.logo ? 'block' : 'none';
}

document.getElementById('logoInput').addEventListener('change', async function() {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async ev => {
    const compressed = await compressImage(ev.target.result, 400, 0.9);
    const lp = document.getElementById('logoPreview');
    lp.src = compressed;
    lp.style.display = 'block';
    adminData.restaurant.logo = compressed;
  };
  reader.readAsDataURL(file);
});

function removeLogo() {
  adminData.restaurant.logo = '';
  document.getElementById('logoPreview').style.display = 'none';
  document.getElementById('logoInput').value = '';
}

document.getElementById('restaurantForm').addEventListener('submit', e => {
  e.preventDefault();
  const r = adminData.restaurant;
  r.name     = document.getElementById('rName').value.trim();
  r.subtitle = document.getElementById('rSubtitle').value.trim();
  r.tagline  = { tr: document.getElementById('rTaglineTR').value.trim(), en: document.getElementById('rTaglineEN').value.trim() };
  r.phone    = document.getElementById('rPhone').value.trim();
  r.address  = document.getElementById('rAddress').value.trim();
  r.currency = document.getElementById('rCurrency').value.trim() || '₺';
  saveData(adminData);
  showToast('Restoran bilgileri kaydedildi ✓');
});

// ── Settings ──────────────────────────────────────────────────────────────────
function renderSettingsForm() {
  const { repo, token } = ghConfig();
  document.getElementById('ghRepo').value = repo || 'kocataefe-svg/fuego-menu';
  document.getElementById('ghToken').value = token || '';
}

document.getElementById('changePassForm').addEventListener('submit', e => {
  e.preventDefault();
  const curr = document.getElementById('currPass').value;
  const np1  = document.getElementById('newPass1').value;
  const np2  = document.getElementById('newPass2').value;
  if (curr !== getAdminPass()) { alert('Mevcut şifre hatalı.'); return; }
  if (np1 !== np2)             { alert('Yeni şifreler eşleşmiyor.'); return; }
  if (np1.length < 4)          { alert('Şifre en az 4 karakter olmalı.'); return; }
  setAdminPass(np1);
  document.getElementById('changePassForm').reset();
  showToast('Şifre güncellendi ✓');
});

function resetAllData() {
  if (!confirm('TÜM menü verilerini sıfırlamak istediğinize emin misiniz? Bu işlem geri alınamaz.')) return;
  localStorage.removeItem('fuego_menu_v1');
  adminData = getData();
  showSection('items');
  showToast('Veriler sıfırlandı');
}

// ── QR Code ───────────────────────────────────────────────────────────────────
function renderQR() {
  const menuUrl = window.location.href.replace('admin.html', 'index.html');
  document.getElementById('menuUrl').value = menuUrl;
  const qrImg = document.getElementById('qrImg');
  const encoded = encodeURIComponent(menuUrl);
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encoded}&bgcolor=FAF7F2&color=C8521A&margin=10`;
  document.getElementById('qrDownloadBtn').href = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encoded}&bgcolor=FAF7F2&color=C8521A&margin=20`;
}

function copyMenuUrl() {
  const val = document.getElementById('menuUrl').value;
  navigator.clipboard.writeText(val).then(() => showToast('URL kopyalandı ✓'));
}

// ── Publish ───────────────────────────────────────────────────────────────────
// Customers read js/data.js from the live site, so "publishing" = writing a new data.js.
// With a GitHub token it is committed to the repo (Vercel redeploys in ~1 min);
// without one the file is downloaded so it can be uploaded by hand.
const GH_KEY = 'fuego_github';
const DATA_PATH = 'js/data.js';

function ghConfig() {
  try { return JSON.parse(localStorage.getItem(GH_KEY)) || {}; } catch { return {}; }
}

document.getElementById('githubForm').addEventListener('submit', e => {
  e.preventDefault();
  localStorage.setItem(GH_KEY, JSON.stringify({
    repo: document.getElementById('ghRepo').value.trim(),
    token: document.getElementById('ghToken').value.trim()
  }));
  showToast('Bağlantı kaydedildi ✓');
  updatePublishStatus();
});

function b64EncodeUtf8(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  bytes.forEach(b => { bin += String.fromCharCode(b); });
  return btoa(bin);
}
function b64DecodeUtf8(b64) {
  const bin = atob(b64.replace(/\n/g, ''));
  return new TextDecoder().decode(Uint8Array.from(bin, c => c.charCodeAt(0)));
}

// Replace only the DEFAULT_DATA block; keep the helper functions of the file as they are.
function buildDataFile(template, data) {
  const start = template.indexOf('const DEFAULT_DATA = ');
  const end = template.indexOf('\nfunction getData');
  if (start < 0 || end < 0) throw new Error('data.js beklenen biçimde değil');
  return template.slice(0, start) + 'const DEFAULT_DATA = ' + JSON.stringify(data, null, 2) + ';\n' + template.slice(end);
}

let publishedJSON = JSON.stringify(DEFAULT_DATA);
function isUnpublished() {
  return JSON.stringify(adminData) !== publishedJSON;
}

function updatePublishStatus() {
  const el = document.getElementById('publishStatus');
  if (!el || !adminData) return;
  el.textContent = isUnpublished()
    ? 'Yayınlanmamış değişiklikler var'
    : 'Menü yayındaki haliyle aynı';
  el.classList.toggle('pending', isUnpublished());
}

async function publishMenu() {
  if (!confirm('Değişiklikler müşterilerin gördüğü menüye gönderilsin mi?')) return;
  const btn = document.getElementById('publishBtn');
  btn.disabled = true;
  const next = { ...adminData, version: Date.now() };
  try {
    const { repo, token } = ghConfig();
    if (repo && token) {
      const api = `https://api.github.com/repos/${repo}/contents/${DATA_PATH}`;
      const headers = { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' };
      const cur = await fetch(api, { headers, cache: 'no-store' });
      if (!cur.ok) throw new Error(`GitHub dosyayı okuyamadı (${cur.status}). Depo adını ve anahtarı kontrol edin.`);
      const file = await cur.json();
      const content = buildDataFile(b64DecodeUtf8(file.content), next);
      const put = await fetch(api, {
        method: 'PUT', headers,
        body: JSON.stringify({ message: 'Menü güncellendi (admin paneli)', content: b64EncodeUtf8(content), sha: file.sha })
      });
      if (!put.ok) throw new Error(`GitHub kaydı reddetti (${put.status}). Anahtarın "Contents: write" izni olmalı.`);
      showToast('Yayınlandı ✓ Site 1 dakika içinde güncellenir');
    } else {
      const res = await fetch(DATA_PATH, { cache: 'no-store' });
      if (!res.ok) throw new Error('data.js okunamadı. Paneli bir sunucu üzerinden açın.');
      const content = buildDataFile(await res.text(), next);
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([content], { type: 'text/javascript' }));
      a.download = 'data.js';
      a.click();
      showToast('data.js indirildi. Bu dosyayı sitedeki js/data.js ile değiştirin.');
    }
    adminData = next;
    publishedJSON = JSON.stringify(next);
    saveData(adminData);
    updatePublishStatus();
  } catch (err) {
    alert(`Yayınlanamadı: ${err.message}`);
  } finally {
    btn.disabled = false;
  }
}

// Every save marks the menu as having unpublished changes
const _saveData = saveData;
saveData = function (data) { const ok = _saveData(data); updatePublishStatus(); return ok; };

// ── Toast ─────────────────────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', checkAuth);
