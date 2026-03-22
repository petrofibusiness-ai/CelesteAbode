#!/usr/bin/env node
/**
 * Verifies PROPERTIES_GREATER_NOIDA_ADMIN_UPLOAD_2026.txt against celesteprompt §8:
 * - Body word count from <p> only (between BEGIN HTML / END HTML)
 * - Longest-match counts for the five target phrases
 * - Each 100-word block: 1–2 keyword hits (non-overlapping longest match)
 */
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'PROPERTIES_GREATER_NOIDA_ADMIN_UPLOAD_2026.txt');

const TARGETS = [
  'property in greater noida west',
  'property for sale in greater noida',
  'property dealers in greater noida',
  'best property dealer in greater noida',
  'property in greater noida',
].sort((a, b) => b.length - a.length);

function extractBodyHtml(raw) {
  const start = raw.indexOf('BEGIN HTML');
  const end = raw.indexOf('END HTML');
  if (start === -1 || end === -1) {
    throw new Error('Missing BEGIN HTML or END HTML markers');
  }
  const slice = raw.slice(start, end);
  const i = slice.indexOf('<!-- BLOCK 1 -->');
  const j = slice.lastIndexOf('</div>');
  if (i === -1 || j === -1) {
    throw new Error('Could not locate HTML blocks');
  }
  return slice.slice(i, j + 6);
}

function paragraphTexts(html) {
  const out = [];
  for (const m of html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)) {
    let inner = m[1]
      .replace(/<a[^>]*>([\s\S]*?)<\/a>/gi, '$1')
      .replace(/<strong>([^<]*)<\/strong>/gi, '$1')
      .replace(/<[^>]+>/g, ' ');
    inner = inner.replace(/\s+/g, ' ').trim();
    if (inner) out.push(inner);
  }
  return out;
}

function countLongestMatch(lower) {
  const counts = Object.fromEntries(TARGETS.map((k) => [k, 0]));
  let pos = 0;
  while (pos < lower.length) {
    let bestLen = 0;
    let best = null;
    for (const kw of TARGETS) {
      if (lower.startsWith(kw, pos) && kw.length > bestLen) {
        bestLen = kw.length;
        best = kw;
      }
    }
    if (best) {
      counts[best]++;
      pos += bestLen;
    } else {
      pos++;
    }
  }
  return counts;
}

function hitsInChunk(chunkLower) {
  let h = 0;
  let p = 0;
  while (p < chunkLower.length) {
    let bestLen = 0;
    for (const kw of TARGETS) {
      if (chunkLower.startsWith(kw, p) && kw.length > bestLen) {
        bestLen = kw.length;
      }
    }
    if (bestLen) {
      h++;
      p += bestLen;
    } else {
      p++;
    }
  }
  return h;
}

function main() {
  const raw = fs.readFileSync(FILE, 'utf8');
  const html = extractBodyHtml(raw);
  const paras = paragraphTexts(html);
  const words = paras.join(' ').split(/\s+/).filter(Boolean);
  const lower = paras.join(' ').toLowerCase();
  const counts = countLongestMatch(lower);

  console.log('File:', path.basename(FILE));
  console.log('Body <p> words:', words.length, '(target 1200–1500)');
  console.log(
    'Word count:',
    words.length >= 1200 && words.length <= 1500 ? 'PASS' : 'FAIL',
  );
  console.log('\nLongest-match phrase counts:');
  for (const kw of [
    'property in greater noida west',
    'property for sale in greater noida',
    'property dealers in greater noida',
    'best property dealer in greater noida',
    'property in greater noida',
  ]) {
    const n = counts[kw] || 0;
    console.log(`  ${n}  ${kw}`);
  }

  const blocks = [];
  for (let i = 0; i < words.length; i += 100) {
    const chunk = words.slice(i, i + 100).join(' ').toLowerCase();
    const hits = hitsInChunk(chunk);
    blocks.push({ num: Math.floor(i / 100) + 1, hits, words: Math.min(100, words.length - i) });
  }

  const zero = blocks.filter((b) => b.hits === 0);
  const many = blocks.filter((b) => b.hits >= 3);

  console.log('\n100-word blocks (1–2 hits each):');
  blocks.forEach((b) => console.log(`  Block ${b.num}: ${b.hits} hit(s), ${b.words} words`));

  console.log('\nZero-hit blocks:', zero.length ? zero.map((b) => b.num).join(', ') : 'none');
  console.log('3+ hit blocks:', many.length ? many.map((b) => b.num).join(', ') : 'none');

  const phrasesOk = TARGETS.every((kw) => (counts[kw] || 0) >= 1);
  const blocksOk = zero.length === 0 && many.length === 0;
  const wordsOk = words.length >= 1200 && words.length <= 1500;

  const ok = phrasesOk && blocksOk && wordsOk;
  console.log('\nOverall:', ok ? 'PASS' : 'FAIL');
  process.exit(ok ? 0 : 1);
}

main();
