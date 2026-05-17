/**
 * idCrypto.js
 * -----------
 * Lightweight, reversible ID obfuscation for URLs.
 *
 * Algorithm:
 *   1. XOR every byte of the string against a repeating key.
 *   2. Base64-encode the result.
 *   3. Make it URL-safe: replace +→-, /→_, strip trailing =
 *
 * No external dependencies — works in any modern browser / Node env.
 *
 * Usage:
 *   import { encryptId, decryptId } from "@/utils/idCrypto";
 *
 *   const enc = encryptId(42);        // e.g. "dGVz"
 *   const dec = decryptId("dGVz");    // 42  (number)
 *
 *   // Build a route link:
 *   navigate(`/Services/${service.slug}/${encryptId(service.id)}`);
 *
 *   // Read it back inside the page component:
 *   const { encId } = useParams();
 *   const id = decryptId(encId);      // original numeric id
 */

const SECRET_KEY = "ictc@2025#secure";   // change freely — keep it consistent

/* ── helpers ──────────────────────────────────────────────────────────────── */

/**
 * XOR a string against a repeating key, returning a Uint8Array of bytes.
 * Works on any ASCII / numeric string (ids are always ASCII).
 */
function xorBytes(str, key) {
  const bytes = [];
  for (let i = 0; i < str.length; i++) {
    bytes.push(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return bytes;
}

/** Convert a byte array to a base64url-safe string (no padding). */
function toBase64Url(bytes) {
  const binary = String.fromCharCode(...bytes);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/** Convert a base64url string back to a byte array. */
function fromBase64Url(b64url) {
  const b64 = b64url
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const binary = atob(b64);
  return Array.from(binary, (c) => c.charCodeAt(0));
}

/* ── public API ───────────────────────────────────────────────────────────── */

/**
 * Encrypt a numeric (or string) id into a URL-safe token.
 * @param   {number|string} id
 * @returns {string}  URL-safe encrypted token
 */
export function encryptId(id) {
  if (id === null || id === undefined) return "";
  const str    = String(id);
  const bytes  = xorBytes(str, SECRET_KEY);
  return toBase64Url(bytes);
}

/**
 * Decrypt a URL-safe token back to the original numeric id.
 * @param   {string} token  The encrypted URL segment
 * @returns {number|null}   Original id as a number, or null if invalid
 */
export function decryptId(token) {
  if (!token) return null;
  try {
    const bytes  = fromBase64Url(token);
    const keyArr = Array.from(SECRET_KEY, (c) => c.charCodeAt(0));
    const chars  = bytes.map((b, i) => String.fromCharCode(b ^ keyArr[i % keyArr.length]));
    const str    = chars.join("");
    const num    = Number(str);
    return Number.isFinite(num) ? num : null;
  } catch {
    return null;
  }
}