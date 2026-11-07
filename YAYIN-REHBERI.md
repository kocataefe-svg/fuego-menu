# Fuego QR Menü — Yayın Rehberi

Canlı adres: **https://menu.fuegosultanahmet.com/**
QR kod: `qr/fuego-menu-qr.png` (baskı için) ve `qr/fuego-menu-qr.svg` (matbaa / vektör)

QR kod her zaman bu adrese gider. Fiyat değişince QR'ı yeniden basmanız gerekmez.

## 1. Alan adını bağlama (bir kez yapılır)
Alan adınızın DNS panelinde (domaini nereden aldıysanız: Hostinger, GoDaddy vb.) şu kaydı ekleyin:

| Tür   | Ad (Host) | Değer                |
|-------|-----------|----------------------|
| CNAME | menu      | cname.vercel-dns.com |

DNS'in yayılması 5 dakika ile birkaç saat sürer. Sonrasında HTTPS otomatik açılır.

## 2. Fiyat, ürün ekleme/çıkarma: Admin paneli
Adres: **https://menu.fuegosultanahmet.com/admin.html** (telefondan da açılır)

| Ne yapmak istiyorsunuz? | Nereden |
|---|---|
| Fiyat değiştirmek | **Ürünler** → ürünün yanındaki **Düzenle** → *Fiyat* → Kaydet |
| Yeni ürün eklemek | **Ürünler** → **+ Yeni Ürün** |
| Ürünü kaldırmak | **Sil** (kalıcı) veya 👁 (geçici gizle, ör. bitti) |
| Sırayı değiştirmek | ↑ ↓ okları |
| Kategori eklemek/silmek | **Kategoriler** |
| **Müşteriye göndermek** | Sol alttaki **🚀 Menüyü Yayınla** |

Kaydet sadece taslağı kaydeder. Müşteriler değişikliği **Menüyü Yayınla**'ya bastıktan ~1 dakika sonra görür.
Sol altta "Yayınlanmamış değişiklikler var" yazıyorsa henüz yayınlamadınız demektir. Fiyatı 0 olan ürünlerde fiyat görünmez.

Ek bir ayar gerekmez. Şifre sunucuda kontrol edilir (Vercel ortam değişkeni `ADMIN_PASS_HASH`, şifrenin SHA-256 özeti) ve sitenin kodunda yer almaz.
Yayınlanan menü Vercel Blob'da `menu.json` olarak saklanır. Şifreyi değiştirmek için `ADMIN_PASS_HASH` değeri yenisiyle güncellenir.

Menü 4 dilde: TR, EN (admin panelinden), RU, ES (`js/translations.js`). Admin'den eklenen yeni ürünün Rusça/İspanyolca adı yoksa o dillerde İngilizcesi görünür.

## 3. Web sitesine ekleme (fuegosultanahmet.com)
- Ana menüye "Menü / Menu" bağlantısı ekleyin: `https://menu.fuegosultanahmet.com/`
- Varsa eski PDF menü / finedine bağlantılarını bu adresle değiştirin.

## 4. Google'da paylaşma (Google İşletme Profili)
1. https://business.google.com → Fuego Sultanahmet profilini açın.
2. **İşletme bilgilerini düzenle → Menü bağlantısı** alanına `https://menu.fuegosultanahmet.com/` yazın.
3. İsterseniz **Menü düzenleyici**ye de kategori ve fiyatları ekleyebilirsiniz (Google'da doğrudan görünür).
4. **Güncelleme ekle** ile "Yeni menümüz yayında" gönderisi paylaşıp QR görselini ekleyin.

Sayfada Google için yapılandırılmış veri (`schema.org Restaurant` + `hasMenu`) bulunur. Böylece arama sonuçları menü bağlantısını tanır.
