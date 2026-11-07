import { createHash, timingSafeEqual } from 'node:crypto';

// ADMIN_PASS_HASH = sha256(password) hex, set in Vercel env; the password itself is never in the code.
export function checkPassword(password) {
  const expected = process.env.ADMIN_PASS_HASH;
  if (!expected || typeof password !== 'string') return false;
  const got = createHash('sha256').update(password).digest();
  const want = Buffer.from(expected, 'hex');
  return want.length === got.length && timingSafeEqual(got, want);
}
