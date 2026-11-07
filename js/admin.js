'use strict';

let adminData = null;
let editingItem = null;
let editingCat = null;
let currentSection = 'items';

// ── Auth ──────────────────────────────────────────────────────────────────────
// The password is checked by the server (/api/login); it is kept for this tab only so publish can send it.
const PW_KEY = 'fuego_admin_pw';
let publishedData = null;

function checkAuth() {
  if (sessionStorage.getItem(PW_KEY)) { showAdmin(); return; }
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('adminApp').style.display = 'none';
}

document.getElementById('loginForm').addEventListener('submit', async e => {
  e.preventDefault();
  const pass = document.getElementById('passInput').value;
  const err = document.getElementById('loginError');
  err.textContent = '';
  try {
    const res = await fetch('/api/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pass })
    });
    if (!res.ok) { err.textContent = res.status === 401 ? 'Şifre hatalı.' : 'Giriş yapılamadı, tekrar deneyin.'; return; }
    sessionStorage.setItem(PW_KEY, pass);
    showAdmin();
  } catch {
    err.textContent = 'Sunucuya ulaşılamadı. İnternet bağlantınızı kontrol edin.';
  }
});

async function showAdmin() {
  publishedData = await loadPublished();
  publishedJSON = JSON.stringify(publishedData && publishedData.version > DEFAULT_DATA.version ? publishedData : DEFAULT_DATA);
  adminData = getData(publishedData);
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
    setItemImage(editingItem.image || '');
  } else {
    document.getElementById('itemNameTR').value = '';
    document.getElementById('itemNameEN').value = '';
    document.getElementById('itemDescTR').value = '';
    document.getElementById('itemDescEN').value = '';
    document.getElementById('itemPrice').value = '';
    setItemImage('');
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

// ── Item photo: drag-and-drop or file picker → compressed → /api/upload (Vercel Blob)
function setItemImage(url) {
  document.getElementById('itemImgPath').value = url;
  const prev = document.getElementById('imgPreview');
  prev.style.display = url ? 'block' : 'none';
  if (url) prev.src = url;
  document.getElementById('imgRemoveBtn').style.display = url ? 'inline-block' : 'none';
  document.getElementById('imgDropText').innerHTML = url
    ? 'Değiştirmek için yeni fotoğraf sürükleyin veya <u>dosyadan seçin</u>'
    : 'Fotoğrafı buraya sürükleyin veya <u>dosyadan seçin</u>';
}

async function uploadItemImage(file) {
  if (!file || !file.type.startsWith('image/')) { alert('Lütfen bir fotoğraf dosyası seçin.'); return; }
  const text = document.getElementById('imgDropText');
  const saveBtn = document.querySelector('#itemForm button[type="submit"]');
  text.textContent = 'Yükleniyor…';
  saveBtn.disabled = true;
  try {
    const image = await compressImage(await readAsDataURL(file), 1200, 0.82);
    const res = await fetch('/api/upload', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: sessionStorage.getItem(PW_KEY), image })
    });
    const out = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(out.error || `Sunucu hatası (${res.status})`);
    setItemImage(out.url);
  } catch (err) {
    alert(`Fotoğraf yüklenemedi: ${err.message}`);
    setItemImage(document.getElementById('itemImgPath').value);
  } finally {
    saveBtn.disabled = false;
  }
}

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = () => reject(new Error('Dosya okunamadı.'));
    r.readAsDataURL(file);
  });
}

// Scales the longest side down to maxSize and re-encodes (JPEG for photos, PNG keeps logo transparency).
function compressImage(dataUrl, maxSize, quality, type = 'image/jpeg') {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      resolve(c.toDataURL(type, quality));
    };
    img.onerror = () => reject(new Error('Fotoğraf açılamadı.'));
    img.src = dataUrl;
  });
}

const imgDrop = document.getElementById('imgDrop');
document.getElementById('itemImgFile').addEventListener('change', function () {
  uploadItemImage(this.files[0]);
  this.value = '';
});
imgDrop.addEventListener('dragover', e => { e.preventDefault(); imgDrop.classList.add('over'); });
imgDrop.addEventListener('dragleave', () => imgDrop.classList.remove('over'));
imgDrop.addEventListener('drop', e => {
  e.preventDefault();
  imgDrop.classList.remove('over');
  uploadItemImage(e.dataTransfer.files[0]);
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
    const compressed = await compressImage(ev.target.result, 400, 0.9, 'image/png');
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
function resetAllData() {
  if (!confirm('Yayınlanmamış tüm değişiklikler silinsin ve menü yayındaki haline dönsün mü?')) return;
  localStorage.removeItem(STORAGE_KEY);
  adminData = getData(publishedData);
  updatePublishStatus();
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
// /api/publish checks the password and stores the menu as menu.json (Vercel Blob);
// customers load it on every visit, so changes show up within about a minute.
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
    const res = await fetch('/api/publish', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: sessionStorage.getItem(PW_KEY), data: next })
    });
    const out = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(out.error || `Sunucu hatası (${res.status})`);
    adminData = next;
    publishedData = next;
    publishedJSON = JSON.stringify(next);
    saveData(adminData);
    updatePublishStatus();
    showToast('Yayınlandı ✓ Müşteriler 1 dakika içinde görür');
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
