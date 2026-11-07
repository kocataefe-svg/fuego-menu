import { put } from '@vercel/blob';
import { checkPassword } from './_auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { password, data } = req.body || {};
  if (!checkPassword(password)) return res.status(401).json({ error: 'Şifre hatalı. Çıkış yapıp tekrar giriş yapın.' });
  if (!data || !data.restaurant || !Array.isArray(data.categories) || !Array.isArray(data.items)) {
    return res.status(400).json({ error: 'Menü verisi geçersiz.' });
  }
  try {
    const blob = await put('menu.json', JSON.stringify(data), {
      access: 'public', addRandomSuffix: false, allowOverwrite: true,
      contentType: 'application/json', cacheControlMaxAge: 60
    });
    res.status(200).json({ ok: true, url: blob.url });
  } catch (err) {
    res.status(500).json({ error: 'Menü kaydedilemedi: ' + err.message });
  }
}
