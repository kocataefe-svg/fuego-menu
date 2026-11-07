import { put } from '@vercel/blob';
import { checkPassword } from './_auth.js';

const TYPES = { jpeg: 'jpg', png: 'png', webp: 'webp' };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { password, image } = req.body || {};
  if (!checkPassword(password)) return res.status(401).json({ error: 'Şifre hatalı. Çıkış yapıp tekrar giriş yapın.' });
  const m = /^data:image\/(jpeg|png|webp);base64,(.+)$/.exec(image || '');
  if (!m) return res.status(400).json({ error: 'Desteklenmeyen dosya. JPG, PNG veya WEBP seçin.' });
  const buf = Buffer.from(m[2], 'base64');
  if (buf.length > 3 * 1024 * 1024) return res.status(413).json({ error: 'Fotoğraf çok büyük.' });
  try {
    const blob = await put(`photos/item.${TYPES[m[1]]}`, buf, {
      access: 'public', addRandomSuffix: true, contentType: `image/${m[1]}`
    });
    res.status(200).json({ url: blob.url });
  } catch (err) {
    res.status(500).json({ error: 'Fotoğraf kaydedilemedi: ' + err.message });
  }
}
