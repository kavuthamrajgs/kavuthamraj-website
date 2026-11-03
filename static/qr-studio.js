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
