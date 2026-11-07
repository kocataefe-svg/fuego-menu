import { checkPassword } from './_auth.js';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  if (!checkPassword(req.body?.password)) return res.status(401).json({ error: 'Şifre hatalı.' });
  res.status(200).json({ ok: true });
}
