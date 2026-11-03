/* QR code encoder: byte mode (UTF-8), error correction L/M/Q/H, versions 1 to 40.
   Follows ISO/IEC 18004: Reed-Solomon over GF(256), interleaved blocks, all eight masks scored
   by the standard penalty rules. Exposes globalThis.QRR.encode(text, { ecl, mask }). */
(() => {
  const LEVELS = { L: [0, 1], M: [1, 0], Q: [2, 3], H: [3, 2] }; // [table row, format bits]
  const ECC_PER_BLOCK = [
    [-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
    [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
  ];
  const BLOCKS = [
    [-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25],
    [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49],
    [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68],
    [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81],
  ];
  const bit = (x, i) => ((x >>> i) & 1) !== 0;

  const rawModules = (v) => {
    let r = (16 * v + 128) * v + 64;
    if (v >= 2) {
      const n = Math.floor(v / 7) + 2;
      r -= (25 * n - 10) * n - 55;
      if (v >= 7) r -= 36;
    }
    return r;
  };
  const dataCodewords = (v, e) => Math.floor(rawModules(v) / 8) - ECC_PER_BLOCK[e][v] * BLOCKS[e][v];

  const gfMul = (x, y) => {
    let z = 0;
    for (let i = 7; i >= 0; i--) {
      z = (z << 1) ^ ((z >>> 7) * 0x11d);
      z ^= ((y >>> i) & 1) * x;
    }
    return z;
  };
  const rsDivisor = (deg) => {
    const r = new Array(deg).fill(0);
    r[deg - 1] = 1;
    let root = 1;
    for (let i = 0; i < deg; i++) {
      for (let j = 0; j < deg; j++) {
        r[j] = gfMul(r[j], root);
        if (j + 1 < deg) r[j] ^= r[j + 1];
      }
      root = gfMul(root, 0x02);
    }
    return r;
  };
  const rsRemainder = (data, div) => {
    const r = div.map(() => 0);
    for (const b of data) {
      const f = b ^ r.shift();
      r.push(0);
      div.forEach((c, i) => (r[i] ^= gfMul(c, f)));
    }
    return r;
  };

  function encode(text, opts = {}) {
    const lvl = LEVELS[opts.ecl || "M"];
    if (!lvl) throw new Error("Unknown error-correction level");
    const [e, formatBits] = lvl;
    const bytes = [...new TextEncoder().encode(String(text))];

    // smallest version that holds the payload
    let ver = 1;
    for (; ; ver++) {
      if (ver > 40) throw new Error("Too much data for a QR code");
      const ccBits = ver <= 9 ? 8 : 16;
      if (4 + ccBits + bytes.length * 8 <= dataCodewords(ver, e) * 8) break;
    }

    // bit stream: mode, count, data, terminator, padding
    const bits = [];
    const push = (val, len) => { for (let i = len - 1; i >= 0; i--) bits.push((val >>> i) & 1); };
    push(0b0100, 4);
    push(bytes.length, ver <= 9 ? 8 : 16);
    bytes.forEach((b) => push(b, 8));
    const cap = dataCodewords(ver, e) * 8;
    push(0, Math.min(4, cap - bits.length));
    push(0, (8 - (bits.length % 8)) % 8);
    for (let pad = 0xec; bits.length < cap; pad ^= 0xec ^ 0x11) push(pad, 8);
    const data = [];
    for (let i = 0; i < bits.length; i += 8) data.push(bits.slice(i, i + 8).reduce((a, b) => (a << 1) | b, 0));

    // split into blocks, add error correction, interleave
    const nBlocks = BLOCKS[e][ver], eccLen = ECC_PER_BLOCK[e][ver];
    const raw = Math.floor(rawModules(ver) / 8);
    const nShort = nBlocks - (raw % nBlocks), shortLen = Math.floor(raw / nBlocks);
    const div = rsDivisor(eccLen), blocks = [];
    for (let i = 0, k = 0; i < nBlocks; i++) {
      const d = data.slice(k, k + shortLen - eccLen + (i < nShort ? 0 : 1));
      k += d.length;
      const ecc = rsRemainder(d, div);
      if (i < nShort) d.push(0);
      blocks.push(d.concat(ecc));
    }
    const words = [];
    for (let i = 0; i < blocks[0].length; i++)
      blocks.forEach((b, j) => { if (i !== shortLen - eccLen || j >= nShort) words.push(b[i]); });

    // the grid
    const size = ver * 4 + 17;
    const mod = Array.from({ length: size }, () => new Array(size).fill(false));
    const fn = Array.from({ length: size }, () => new Array(size).fill(false));
    const set = (x, y, dark) => { mod[y][x] = dark; fn[y][x] = true; };

    for (let i = 0; i < size; i++) { set(6, i, i % 2 === 0); set(i, 6, i % 2 === 0); }
    const finder = (cx, cy) => {
      for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
        const x = cx + dx, y = cy + dy, d = Math.max(Math.abs(dx), Math.abs(dy));
        if (x >= 0 && x < size && y >= 0 && y < size) set(x, y, d !== 2 && d !== 4);
      }
    };
    finder(3, 3); finder(size - 4, 3); finder(3, size - 4);
    const align = [];
    if (ver > 1) {
      const n = Math.floor(ver / 7) + 2;
      const step = Math.floor((ver * 8 + n * 3 + 5) / (n * 4 - 4)) * 2;
      for (let p = size - 7; align.length < n - 1; p -= step) align.unshift(p);
      align.unshift(6);
    }
    align.forEach((ay, i) => align.forEach((ax, j) => {
      const last = align.length - 1;
      if ((i === 0 && j === 0) || (i === 0 && j === last) || (i === last && j === 0)) return;
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) set(ax + dx, ay + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
    }));

    const drawFormat = (mask) => {
      const d = (formatBits << 3) | mask;
      let r = d;
      for (let i = 0; i < 10; i++) r = (r << 1) ^ ((r >>> 9) * 0x537);
      const b = ((d << 10) | r) ^ 0x5412;
      for (let i = 0; i <= 5; i++) set(8, i, bit(b, i));
      set(8, 7, bit(b, 6)); set(8, 8, bit(b, 7)); set(7, 8, bit(b, 8));
      for (let i = 9; i < 15; i++) set(14 - i, 8, bit(b, i));
      for (let i = 0; i < 8; i++) set(size - 1 - i, 8, bit(b, i));
      for (let i = 8; i < 15; i++) set(8, size - 15 + i, bit(b, i));
      set(8, size - 8, true);
    };
    drawFormat(0);
    if (ver >= 7) {
      let r = ver;
      for (let i = 0; i < 12; i++) r = (r << 1) ^ ((r >>> 11) * 0x1f25);
      const b = (ver << 12) | r;
      for (let i = 0; i < 18; i++) {
        const a = size - 11 + (i % 3), c = Math.floor(i / 3);
        set(a, c, bit(b, i)); set(c, a, bit(b, i));
      }
    }

    // codewords in the zigzag, two columns at a time, skipping the vertical timing line
    let i = 0;
    for (let right = size - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;
      for (let v = 0; v < size; v++) for (let j = 0; j < 2; j++) {
        const x = right - j, up = ((right + 1) & 2) === 0, y = up ? size - 1 - v : v;
        if (!fn[y][x] && i < words.length * 8) { mod[y][x] = bit(words[i >>> 3], 7 - (i & 7)); i++; }
      }
    }

    const MASKS = [
      (x, y) => (x + y) % 2 === 0, (x, y) => y % 2 === 0, (x) => x % 3 === 0, (x, y) => (x + y) % 3 === 0,
      (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0, (x, y) => ((x * y) % 2) + ((x * y) % 3) === 0,
      (x, y) => (((x * y) % 2) + ((x * y) % 3)) % 2 === 0, (x, y) => (((x + y) % 2) + ((x * y) % 3)) % 2 === 0,
    ];
    const applyMask = (m) => {
      for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (!fn[y][x] && MASKS[m](x, y)) mod[y][x] = !mod[y][x];
    };
    const addHist = (len, h) => { if (h[0] === 0) len += size; h.pop(); h.unshift(len); };
    const countFinders = (h) => {
      const n = h[1], core = n > 0 && h[2] === n && h[3] === n * 3 && h[4] === n && h[5] === n;
      return (core && h[0] >= n * 4 && h[6] >= n ? 1 : 0) + (core && h[6] >= n * 4 && h[0] >= n ? 1 : 0);
    };
    const penalty = () => {
      let score = 0;
      for (const vertical of [false, true]) {
        for (let a = 0; a < size; a++) {
          let color = false, run = 0;
          const h = [0, 0, 0, 0, 0, 0, 0];
          for (let b = 0; b < size; b++) {
            const c = vertical ? mod[b][a] : mod[a][b];
            if (c === color) { run++; if (run === 5) score += 3; else if (run > 5) score++; }
            else { addHist(run, h); if (!color) score += countFinders(h) * 40; color = c; run = 1; }
          }
          if (color) { addHist(run, h); run = 0; }
          addHist(run + size, h);
          score += countFinders(h) * 40;
        }
      }
      for (let y = 0; y < size - 1; y++) for (let x = 0; x < size - 1; x++) {
        const c = mod[y][x];
        if (c === mod[y][x + 1] && c === mod[y + 1][x] && c === mod[y + 1][x + 1]) score += 3;
      }
      let dark = 0;
      mod.forEach((row) => row.forEach((c) => { if (c) dark++; }));
      const total = size * size;
      score += (Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1) * 10;
      return score;
    };

    let mask = opts.mask;
    if (mask === undefined) {
      let best = Infinity;
      for (let m = 0; m < 8; m++) {
        applyMask(m); drawFormat(m);
        const p = penalty();
        if (p < best) { best = p; mask = m; }
        applyMask(m);
      }
    }
    applyMask(mask);
    drawFormat(mask);
    return { version: ver, size, mask, ecl: opts.ecl || "M", bytes: bytes.length, modules: mod, isFunction: fn };
  }

  /* ---------- styled SVG, in the spirit of the QR Raj design studio ----------
     Gradient body, corner eyes in their own colour, a centre mark over cleared modules.
     Always error correction H, so the mark (about 4% of the area) costs nothing to decode.
     Every colourway keeps its lightest stop at 3:1 or better against white. */
  const WAYS = {
    indigo: { label: "Indigo", stops: ["#2D367C", "#3E4BAC", "#1E7FA8", "#00A36E"], eye: "#1B204A" },
    cocoa: { label: "Cocoa", stops: ["#2a1a12", "#4a3428", "#8f5e42", "#a8593a"], eye: "#1c1411" },
    forest: { label: "Forest", stops: ["#16261c", "#2f5a3c", "#3d6f4c"], eye: "#16261c" },
    ink: { label: "Ink", stops: ["#141110", "#141110"], eye: "#141110" },
  };
  const PATTERNS = ["fluid", "rounded", "dots", "square"];
  const EYE_R = { fluid: [2.6, 1.7, 1.1], rounded: [2.1, 1.3, .9], dots: [3.5, 2.5, 1.5], square: [0, 0, 0] };
  const f = (n) => +n.toFixed(3);
  const rr = (x, y, w, h, r) => {
    r = Math.min(r, w / 2, h / 2);
    if (!r) return `M${f(x)} ${f(y)}h${f(w)}v${f(h)}h${f(-w)}z`;
    return `M${f(x + r)} ${f(y)}h${f(w - 2 * r)}a${f(r)} ${f(r)} 0 0 1 ${f(r)} ${f(r)}v${f(h - 2 * r)}a${f(r)} ${f(r)} 0 0 1 ${f(-r)} ${f(r)}h${f(-(w - 2 * r))}a${f(r)} ${f(r)} 0 0 1 ${f(-r)} ${f(-r)}v${f(-(h - 2 * r))}a${f(r)} ${f(r)} 0 0 1 ${f(r)} ${f(-r)}z`;
  };

  function toSVG(text, o = {}) {
    const q = encode(text, { ecl: "H" });
    const n = q.size, Z = o.quiet ?? 3, W = n + Z * 2, id = o.id || "qr";
    const way = WAYS[o.way] || WAYS.indigo, pat = PATTERNS.includes(o.pattern) ? o.pattern : "fluid";
    const logo = o.logo !== false;
    let k = Math.max(5, Math.round(n * 0.2));
    if (k % 2 === 0) k++;
    const c0 = (n - k) / 2;
    const inLogo = (x, y) => logo && x >= c0 && x < c0 + k && y >= c0 && y < c0 + k;
    const inEye = (x, y) => (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
    const dark = (x, y) => x >= 0 && y >= 0 && x < n && y < n && q.modules[y][x] && !inEye(x, y) && !inLogo(x, y);

    const body = [];
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      if (!dark(x, y)) continue;
      const X = x + Z, Y = y + Z;
      const dist = Math.hypot(x - (n - 1) / 2, y - (n - 1) / 2) / (n / 2);
      const d = Math.round(dist * 560 + ((x * 73 + y * 151) % 17) * 9);
      let shape;
      if (pat === "square") shape = `<rect x="${X}" y="${Y}" width="1.02" height="1.02"`;
      else if (pat === "rounded") shape = `<rect x="${X + .06}" y="${Y + .06}" width=".88" height=".88" rx=".3"`;
      else if (pat === "dots") shape = `<circle cx="${X + .5}" cy="${Y + .5}" r=".43"`;
      else {
        let p = `M${X} ${Y + .5}a.5 .5 0 1 1 1 0a.5 .5 0 1 1 -1 0`;
        if (dark(x + 1, y)) p += `M${X + .5} ${Y}h1v1h-1z`;
        if (dark(x, y + 1)) p += `M${X} ${Y + .5}h1v1h-1z`;
        shape = `<path d="${p}"`;
      }
      body.push(`${shape} class="qm" style="--d:${d}ms"/>`);
    }

    const [ro, ri, rc] = EYE_R[pat];
    const eyes = [[0, 0], [n - 7, 0], [0, n - 7]].map(([ex, ey], i) => {
      const X = ex + Z, Y = ey + Z;
      return `<g class="qe" style="--d:${i * 90}ms"><path fill-rule="evenodd" d="${rr(X, Y, 7, 7, ro)}${rr(X + 1, Y + 1, 5, 5, ri)}"/><path d="${rr(X + 2, Y + 2, 3, 3, rc)}"/></g>`;
    }).join("");

    let mark = "";
    if (logo) {
      const L = c0 + Z + .55, s = k - 1.1;
      mark = `<g class="ql"><rect x="${f(c0 + Z + .15)}" y="${f(c0 + Z + .15)}" width="${f(k - .3)}" height="${f(k - .3)}" rx="${f(k * .26)}" fill="#fff"/>`
        + `<path fill="url(#${id}-g)" d="${rr(L, L, s, s, s * .28)}"/>`
        + `<path fill="#fff" fill-rule="evenodd" d="${rr(L + s * .2, L + s * .2, s * .6, s * .6, s * .17)}${rr(L + s * .32, L + s * .32, s * .36, s * .36, s * .08)}"/>`
        + `<path fill="url(#${id}-g)" d="${rr(L + s * .4, L + s * .4, s * .2, s * .2, s * .05)}"/>`
        + `<circle cx="${f(L + s * .84)}" cy="${f(L + s * .84)}" r="${f(s * .1)}" fill="#d4906f"/></g>`;
    }

    const stops = way.stops.map((c, i) => `<stop offset="${f(i / (way.stops.length - 1))}" stop-color="${c}"/>`).join("");
    const label = o.label || `QR code for ${text}`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${W}" class="qr-svg" role="img" aria-label="${String(label).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")}">`
      + `<defs><linearGradient id="${id}-g" gradientUnits="userSpaceOnUse" x1="${Z}" y1="${Z}" x2="${Z + n}" y2="${Z + n}">${stops}</linearGradient></defs>`
      + `<rect width="${W}" height="${W}" fill="#fff"/>`
      + `<g fill="url(#${id}-g)">${body.join("")}</g><g fill="${way.eye}">${eyes}</g>${mark}</svg>`;
    return { svg, info: q };
  }

  globalThis.QRR = { encode, toSVG, WAYS, PATTERNS, capacity: (v, ecl) => dataCodewords(v, LEVELS[ecl][0]) };
})();
