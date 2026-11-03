/* QR Raj studio: a real, scannable code that redraws as you type, restyles live and downloads at 2048px.
   It is a static code and says so: a dynamic one needs a short link that exists on the server. */
(() => {
  const Q = globalThis.QRR;
  if (!Q) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-qr-studio]").forEach((root, idx) => {
    const code = root.querySelector(".qrs-code");
    const input = root.querySelector(".qrs-in");
    const count = root.querySelector(".qrs-count");
    const info = root.querySelector(".qrs-info");
    const decoded = root.querySelector(".qrs-decoded b");
    const max = Number(input.maxLength) || 120;
    const initial = input.value;
    const st = { text: initial, pattern: root.dataset.pattern || "fluid", way: root.dataset.way || "indigo" };
    const id = "qrs" + idx;

    const draw = (fast) => {
      const text = st.text.trim();
      root.classList.toggle("empty", !text);
      count.textContent = `${[...st.text].length}/${max}`;
      if (!text) { info.textContent = "Type a link or any text to encode it."; return; }
      const { svg, info: q } = Q.toSVG(text, { id, pattern: st.pattern, way: st.way, label: `QR code for ${text}` });
      code.innerHTML = svg;
      if (fast) code.firstElementChild.style.setProperty("--k", ".32");
      info.textContent = `Static code · version ${q.version} · ${q.size} × ${q.size} modules · error correction H`;
      decoded.textContent = text;
      root.classList.remove("pulse");
      void root.offsetWidth;
      root.classList.add("pulse");
    };

    let t;
    input.addEventListener("input", () => {
      st.text = input.value;
      clearTimeout(t);
      t = setTimeout(() => draw(true), 140);
    });

    const pick = (sel, key) => root.querySelectorAll(sel).forEach((b) =>
      b.addEventListener("click", () => {
        root.querySelectorAll(sel).forEach((o) => o.setAttribute("aria-pressed", String(o === b)));
        st[key] = b.dataset[key];
        draw(true);
      })
    );
    pick("[data-pattern]", "pattern");
    pick("[data-way]", "way");

    root.querySelector(".qrs-reset")?.addEventListener("click", () => {
      input.value = st.text = initial;
      draw(true);
      input.focus();
    });

    root.querySelector(".qrs-dl")?.addEventListener("click", () => {
      const el = code.querySelector("svg");
      if (!el) return;
      const copy = el.cloneNode(true);
      copy.setAttribute("width", "2048");
      copy.setAttribute("height", "2048");
      const img = new Image();
      img.onload = () => {
        const c = document.createElement("canvas");
        c.width = c.height = 2048;
        c.getContext("2d").drawImage(img, 0, 0, 2048, 2048);
        c.toBlob((b) => {
          if (!b) return;
          const a = document.createElement("a");
          a.href = URL.createObjectURL(b);
          a.download = "qr-raj.png";
          document.body.appendChild(a);
          a.click();
          a.remove();
          setTimeout(() => URL.revokeObjectURL(a.href), 4000);
        }, "image/png");
      };
      img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(copy));
    });

    // assemble when it scrolls into view
    if (reduce || !("IntersectionObserver" in window)) { root.classList.add("on"); return; }
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { root.classList.add("on"); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(root);
  });

  /* "same code, new destination": cycle the destinations while the printed code stays put */
  document.querySelectorAll("[data-repoint]").forEach((el) => {
    const items = [...el.querySelectorAll(".rp-dest li")];
    if (items.length < 2) return;
    let i = 0;
    items[0].classList.add("on");
    if (reduce) return;
    setInterval(() => {
      if (document.hidden) return;
      items[i].classList.replace("on", "off");
      const prev = items[i];
      setTimeout(() => prev.classList.remove("off"), 700);
      i = (i + 1) % items.length;
      items[i].classList.add("on");
      el.classList.remove("ping");
      void el.offsetWidth;
      el.classList.add("ping");
    }, 2600);
  });

  /* spotlight follows the pointer across the QR Raj section */
  if (!reduce && matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".qrx").forEach((s) => {
      s.addEventListener("pointermove", (e) => {
        const r = s.getBoundingClientRect();
        s.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100).toFixed(1) + "%");
        s.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100).toFixed(1) + "%");
      }, { passive: true });
    });
  }
})();

/* QR Raj page: the hero poster tilts toward the pointer, numbers count up when they arrive */
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll("[data-tilt3d]").forEach((stage) => {
      const poster = stage.querySelector(".qp-poster");
      const hero = stage.closest("section") || stage;
      hero.addEventListener("pointermove", (e) => {
        const r = stage.getBoundingClientRect();
        const px = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 1.2)));
        const py = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 1.2)));
        poster.style.setProperty("--ry", (px * 18).toFixed(2) + "deg");
        poster.style.setProperty("--rx", (-py * 14).toFixed(2) + "deg");
        poster.style.setProperty("--gx", (50 - px * 40).toFixed(1) + "%");
      }, { passive: true });
      hero.addEventListener("pointerleave", () => { poster.style.removeProperty("--ry"); poster.style.removeProperty("--rx"); });
    });
  }
  const nums = [...document.querySelectorAll("[data-count]")];
  if (!nums.length || reduce || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    const el = e.target, to = Number(el.dataset.count), t0 = performance.now(), dur = 1600;
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur), v = Math.round(to * (1 - Math.pow(1 - k, 4)));
      el.textContent = String(v);
      if (k < 1) requestAnimationFrame(step);
    };
    el.textContent = "0";
    requestAnimationFrame(step);
  }), { threshold: 0.6 });
  nums.forEach((n) => io.observe(n));
})();
