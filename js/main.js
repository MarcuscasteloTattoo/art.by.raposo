/* Comportamento do site (idiomas, carrosséis, mapa, lightbox).
   Normalmente não é preciso mexer aqui. */
/* ============ CÓDIGO ============ */
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
let L = TXT.en;
const STARS = '<svg aria-hidden="true"><use href="#i-star"/></svg>'.repeat(5);

function photo(src, alt, sizes, lazy = true) {
  const v = (w) => src.replace(/\.webp$/, `-${w}.webp`);
  return `<span class="ph"><img src="${src}" srcset="${v(320)} 320w, ${v(400)} 400w, ${v(480)} 480w, ${src} 900w" sizes="${sizes}" alt="${esc(alt)}"${lazy ? ' loading="lazy"' : ""} decoding="async" draggable="false"></span>`;
}

/* --- render --- */
function renderMarquee() {
  /* uma volta das palavras por tira; repete só se for curta demais para a tela */
  const w = innerWidth > 1000 ? [...L.marquee, ...L.marquee] : L.marquee;
  const html = w.map((x) => `<span>${esc(x)} <b>•</b></span>`).join("");
  $("marquee").innerHTML = html; $("marquee2").innerHTML = html;
}
function renderCarousel() {
  const card = (e, i) => { const [tit, txt, alt] = L.estilos[i]; return `<article class="style-card">${photo(e.img, alt, "(min-width: 640px) 19rem, 14rem")}<h3>${esc(tit)}</h3><p>${esc(txt)}</p></article>`; };
  $("car-track").innerHTML = [0, 1, 2, 3].map((c) => `<div class="car-copy"${c ? ' aria-hidden="true"' : ""}>${site.estilos.map(card).join("")}</div>`).join("");
}
function renderGrid() {
  $("grid").innerHTML = site.portfolio.map((src, i) =>
    `<button type="button" class="pf" data-i="${i}" aria-label="${esc(L.ampliar + L.portfolio[i])}">${photo(src, L.portfolio[i], "(min-width: 768px) 23rem, calc(50vw - 2rem)")}</button>`).join("");
}

/* --- idiomas --- */
document.querySelectorAll("[data-t]").forEach((el) => { TXT.en.t[el.dataset.t] = el.innerHTML; });
document.querySelectorAll("[data-a]").forEach((el) => { const [attr, k] = el.dataset.a.split(":"); TXT.en.a[k] = el.getAttribute(attr); });
const meta = document.querySelector('meta[name="description"]');

function setLang(code, first) {
  L = TXT[code] || TXT.en;
  document.documentElement.lang = L.lang;
  meta.content = L.desc;
  document.querySelectorAll("[data-t]").forEach((el) => { el.innerHTML = L.t[el.dataset.t] ?? TXT.en.t[el.dataset.t]; });
  document.querySelectorAll("[data-a]").forEach((el) => { const [attr, k] = el.dataset.a.split(":"); el.setAttribute(attr, L.a[k] ?? TXT.en.a[k]); });
  document.querySelectorAll(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === code)));
  renderMarquee(); renderReviews(); if (window.renderQF) window.renderQF();
  if (first) { renderCarousel(); renderGrid(); return; }
  /* carrossel e grade: só troca textos, sem recriar (não perde posição) */
  document.querySelectorAll("#car-track .style-card").forEach((c, i) => {
    const [tit, txt, alt] = L.estilos[i % site.estilos.length];
    c.querySelector("h3").textContent = tit; c.querySelector("p").textContent = txt; c.querySelector("img").alt = alt;
  });
  document.querySelectorAll("#grid .pf").forEach((b) => { const alt = L.portfolio[+b.dataset.i]; b.setAttribute("aria-label", L.ampliar + alt); b.querySelector("img").alt = alt; });
}
document.querySelectorAll(".lang button").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));
/* abre em inglês; ?lang=pt ou ?lang=es no endereço já abre no idioma */
setLang((location.search.match(/[?&]lang=(pt|en|es)\b/) || [])[1] || "en", true);
$("year").textContent = new Date().getFullYear();

/* --- carrossel de projetos: contínuo, pausa no hover, arrasto e setas --- */
(function () {
  const track = $("car-track"), view = $("car-view"), box = $("car");
  const copy = () => track.firstElementChild;
  const st = { paused: false, pos: 0, target: null, drag: null, moved: 0 };
  /* largura lida pelo ResizeObserver (sem forçar layout na carga da página) */
  let w = 0, visible = true, last = performance.now();
  new ResizeObserver((en) => { const b = en[0].borderBoxSize; w = b && b[0] ? b[0].inlineSize : en[0].contentRect.width; }).observe(copy());
  new IntersectionObserver((e) => { visible = e[0].isIntersecting; }, { rootMargin: "100px" }).observe(view);
  function tick(ts) {
    const dt = Math.min((ts - last) / 1000, 0.1); last = ts;
    if (w > 0 && visible) {
      if (st.drag) {}
      else if (st.target !== null) { const d = st.target - st.pos; if (Math.abs(d) < .5) { st.pos = st.target; st.target = null; } else st.pos += d * Math.min(1, dt * 9); }
      else if (!st.paused && !reduced && $("lb").hidden) st.pos += (w / 14) * dt;
      const wrapBy = st.pos >= w ? -w : st.pos < 0 ? w : 0;
      if (wrapBy) { st.pos += wrapBy; if (st.target !== null) st.target += wrapBy; if (st.drag) st.drag.pos += wrapBy; }
      track.style.transform = `translate3d(${-st.pos}px,0,0)`;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
  const step = (dir) => { const c = track.querySelector(".style-card"); st.target = (st.target ?? st.pos) + dir * (c ? c.offsetWidth : 280); };
  $("car-prev").onclick = () => step(-1);
  $("car-next").onclick = () => step(1);
  /* a rolagem continua com o mouse em cima; só para enquanto a foto está ampliada */
  box.addEventListener("mouseleave", () => { st.drag = null; view.classList.remove("dragging"); });
  box.addEventListener("focusin", () => st.paused = true);
  box.addEventListener("focusout", () => st.paused = false);
  view.addEventListener("pointerdown", (e) => { st.drag = { x: e.clientX, pos: st.pos }; st.target = null; st.moved = 0; view.classList.add("dragging"); });
  view.addEventListener("pointermove", (e) => { if (st.drag) { st.moved = Math.max(st.moved, Math.abs(e.clientX - st.drag.x)); st.pos = st.drag.pos - (e.clientX - st.drag.x); } });
  /* clique na foto amplia (arrastar não conta como clique) */
  view.addEventListener("click", (e) => {
    const ph = e.target.closest(".style-card .ph"); if (!ph || st.moved > 6) return;
    const i = [...track.querySelectorAll(".style-card")].indexOf(ph.closest(".style-card")) % site.estilos.length;
    window.abrirFoto(site.estilos[i].img, L.estilos[i][2], ph);
  });
  const end = () => { st.drag = null; view.classList.remove("dragging"); };
  view.addEventListener("pointerup", end);
  view.addEventListener("pointercancel", end);
})();

/* --- avaliações --- */
function renderReviews() {
  const box = $("reviews");
  /* com foto primeiro; o resto mantém a ordem (mais recentes primeiro) */
  const order = site.avaliacoes.map((a, i) => i).sort((x, y) => !!(site.avaliacoes[y].fotos || []).length - !!(site.avaliacoes[x].fotos || []).length);
  box.innerHTML = order.map((i) => {
    const a = site.avaliacoes[i];
    /* "Ler mais" decidido pelo tamanho do texto (sem medir o layout) */
    const tam = a.texto.length + (a.texto.split("\n").length - 1) * 35;
    const longo = tam > ((a.fotos || []).length ? 150 : 480);
    const ini = a.nome.replace(/[^\p{L} ]/gu, "").split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]).join("");
    const fotos = (a.fotos || []).length ? `<div class="review-photos">${a.fotos.map((src) => `<button type="button" class="review-photo" data-src="${src}" aria-label="${esc(L.rev.foto)}"><img src="${src}" alt="${esc(L.rev.foto)}" loading="lazy" decoding="async" draggable="false"></button>`).join("")}</div>` : "";
    return `<article class="review${(a.fotos || []).length ? " has-photos" : ""}"><div class="review-head"><div class="avatar" aria-hidden="true">${esc(ini)}</div><div style="min-width:0"><h3>${esc(a.nome)}</h3><time>${esc(L.rev.tempo(a.meses))}</time></div><span class="g-badge" role="img" aria-label="${esc(L.rev.googleAria)}"><svg><use href="#i-g"/></svg></span></div><div class="stars" role="img" aria-label="${esc(L.rev.starsAria)}">${STARS}</div><p class="review-text clamp" lang="pt-BR">${esc(a.texto).replace(/\n/g, "<br>")}</p><button type="button" class="more"${longo ? "" : " hidden"}>${esc(L.rev.mais)}</button>${fotos}</article>`;
  }).join("");
  /* "Ler mais" só aparece quando o texto foi cortado */
}
$("badge-stars").innerHTML = STARS;
$("reviews").addEventListener("click", (e) => {
  const b = e.target.closest(".more"); if (!b) return;
  const p = b.previousElementSibling, open = p.classList.toggle("clamp");
  b.textContent = open ? L.rev.mais : L.rev.menos;
});
(function () {
  const box = $("reviews"), wrap = $("reviews-box");
  let paused = false;
  function scroll(dir) {
    const c = box.querySelector(".review"), w = (c ? c.offsetWidth : box.clientWidth) + 16;
    const behavior = reduced ? "auto" : "smooth";
    if (dir === 1 && box.scrollLeft + box.clientWidth >= box.scrollWidth - 8) return box.scrollTo({ left: 0, behavior });
    if (dir === -1 && box.scrollLeft <= 8) return box.scrollTo({ left: box.scrollWidth, behavior });
    box.scrollBy({ left: dir * w, behavior });
  }
  $("rev-prev").onclick = () => scroll(-1);
  $("rev-next").onclick = () => scroll(1);
  ["mouseenter", "focusin", "pointerdown"].forEach((ev) => wrap.addEventListener(ev, () => paused = true));
  ["mouseleave", "focusout", "pointerup"].forEach((ev) => wrap.addEventListener(ev, () => paused = false));
  if (!reduced) setInterval(() => { if (!paused && !document.hidden && $("lb").hidden) scroll(1); }, 5000);
})();

/* --- mapa: só carrega quando a pessoa chega perto da seção (não pesa na abertura) --- */
(function () {
  const box = $("map");
  const load = () => {
    if (box.querySelector("iframe")) return;
    const f = document.createElement("iframe");
    f.src = box.dataset.src; f.loading = "lazy"; f.referrerPolicy = "no-referrer-when-downgrade";
    f.title = { "pt-BR": "Mapa do estúdio", en: "Studio map", es: "Mapa del estudio" }[document.documentElement.lang] || "Mapa";
    f.allowFullscreen = true; box.appendChild(f);
    /* se a página onde o site está bloquear mapas incorporados, some com o quadro e deixa o link "Ver no Google Maps" */
    document.addEventListener("securitypolicyviolation", (e) => { if (/google\.com/.test(e.blockedURI || "")) f.remove(); });
  };
  if (!("IntersectionObserver" in window)) return load();
  const io = new IntersectionObserver((en) => { if (en[0].isIntersecting) { load(); io.disconnect(); } }, { rootMargin: "300px" });
  io.observe(box);
})();

/* --- formulário passo a passo → Direct do Instagram ---
   1) estilo  2) ideia e local  3) contato  4) resumo + botão do Direct.
   O link do Direct não aceita texto pronto: ao clicar, a mensagem é copiada e a pessoa só cola na conversa. */
(function () {
  const box = $("qf"), TOTAL = 3;
  const st = { step: 0, style: null, idea: "", first: "", last: "", phone: "", email: "", sent: false, dir: "next", started: false };
  const F = () => L.qf;
  const fmt = (s, o) => s.replace(/\{(\w+)\}/g, (_, k) => o[k]);
  const phoneOk = (v) => { const d = v.replace(/\D/g, ""); return d.length >= 7 && d.length <= 15 && /^[\d\s()+.-]+$/.test(v.trim()); };
  const emailOk = (v) => !v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
  function message() {
    const f = F();
    return [f.msgHi, "", `${f.lStyle}: ${f.styles[st.style]}`, `${f.lIdea}: ${st.idea.trim()}`, `${f.lName}: ${st.first.trim()} ${st.last.trim()}`, `${f.lPhone}: ${st.phone.trim()}`]
      .concat(st.email.trim() ? [`${f.lEmail}: ${st.email.trim()}`] : []).join("\n");
  }
  const field = (id, label, type, val, opt, extra = "") =>
    `<div class="field"><label for="qf-${id}">${esc(label)}${opt ? ` <span class="opt">(${esc(F().optional)})</span>` : ""}</label>` +
    `<input id="qf-${id}" name="${id}" type="${type}" value="${esc(val)}" ${extra} aria-describedby="qf-e-${id}"><p class="field-err" id="qf-e-${id}"></p></div>`;
  function render(focus) {
    const f = F();
    let h = "";
    if (st.step < TOTAL) {
      h += `<div class="qf-top"><span class="qf-count">${esc(fmt(f.step, { n: st.step + 1, t: TOTAL }))}</span><div class="qf-bar"><i style="width:${((st.step + 1) / TOTAL) * 100}%"></i></div></div>`;
    }
    if (st.step === 0) {
      h += `<h3 class="qf-q" tabindex="-1">${esc(f.q1)}</h3><div class="qf-opts" role="radiogroup" aria-label="${esc(f.q1)}">` +
        f.styles.map((o, i) => `<button type="button" class="qf-opt" role="radio" aria-checked="${st.style === i}" data-i="${i}"><span class="qf-dot" aria-hidden="true"></span>${esc(o)}</button>`).join("") +
        `</div><p class="field-err" id="qf-e-style"></p><div class="qf-nav"><span></span><button type="button" class="qf-btn" data-go="next">${esc(f.next)}</button></div>`;
    } else if (st.step === 1) {
      h += `<h3 class="qf-q" tabindex="-1"><label for="qf-idea">${esc(f.q2)}</label></h3><div class="field"><textarea id="qf-idea" rows="4" maxlength="600" placeholder="${esc(f.q2ph)}" aria-describedby="qf-e-idea">${esc(st.idea)}</textarea><p class="field-err" id="qf-e-idea"></p></div>` +
        `<div class="qf-nav"><button type="button" class="qf-back" data-go="back">${esc(f.back)}</button><button type="button" class="qf-btn" data-go="next">${esc(f.next)}</button></div>`;
    } else if (st.step === 2) {
      h += `<h3 class="qf-q" tabindex="-1">${esc(f.q3)}</h3><div class="qf-grid">` +
        field("first", f.first, "text", st.first, false, 'autocomplete="given-name" maxlength="40" required') +
        field("last", f.last, "text", st.last, false, 'autocomplete="family-name" maxlength="40" required') +
        field("phone", f.phone, "tel", st.phone, false, 'autocomplete="tel" inputmode="tel" maxlength="20" placeholder="+1 (305) 555-0123" required') +
        field("email", f.email, "email", st.email, true, 'autocomplete="email" maxlength="80"') +
        `</div><div class="qf-nav"><button type="button" class="qf-back" data-go="back">${esc(f.back)}</button><button type="button" class="qf-btn" data-go="next">${esc(f.finish)}</button></div>`;
    } else {
      h += `<h3 class="qf-q" tabindex="-1">${esc(fmt(f.doneTitle, { name: st.first.trim() }))}</h3><p class="qf-text">${esc(f.doneText)}</p>` +
        `<pre class="qf-msg" id="qf-msg">${esc(message())}</pre>` +
        `<a class="btn-cta" id="cta" href="${esc(site.direct)}" target="_blank" rel="noopener noreferrer"><svg aria-hidden="true"><use href="#i-ig"/></svg><span>${esc(f.cta)}</span></a>` +
        `<div class="qf-nav qf-after"><button type="button" class="qf-back" data-go="edit">${esc(f.edit)}</button><button type="button" class="qf-link" data-go="copy">${esc(f.copy)}</button></div><p class="qf-ok" id="qf-ok" role="status"></p>`;
    }
    box.innerHTML = `<div class="qf-step${focus && !reduced ? " qf-in-" + st.dir : ""}">${h}</div>`;
    if (focus) box.querySelector(".qf-q")?.focus({ preventScroll: true });
  }
  window.renderQF = () => render(false);
  function err(id, msg) { const e = $("qf-e-" + id); if (e) e.textContent = msg || ""; const i = $("qf-" + id); if (i) i.setAttribute("aria-invalid", msg ? "true" : "false"); return !msg; }
  function valid() {
    const f = F();
    if (st.step === 0) return err("style", st.style === null ? f.errStyle : "");
    if (st.step === 1) { const ok = err("idea", st.idea.trim().length < 5 ? f.errIdea : ""); if (!ok) $("qf-idea").focus(); return ok; }
    if (st.step === 2) {
      const r = [err("first", st.first.trim() ? "" : f.errReq), err("last", st.last.trim() ? "" : f.errReq),
        err("phone", !st.phone.trim() ? f.errReq : phoneOk(st.phone) ? "" : f.errPhone), err("email", emailOk(st.email) ? "" : f.errEmail)];
      const bad = ["first", "last", "phone", "email"][r.indexOf(false)]; if (bad) $("qf-" + bad).focus();
      return !bad;
    }
    return true;
  }
  /* rastreamento (Meta Pixel / Google Analytics / Tag Manager, se instalados):
     - form_start / form_step / form_complete: eventos personalizados do funil
     - lead: CONVERSÃO — formulário completo + clique para ir ao Direct (1 vez por visita) → Pixel "Lead" */
  function track(ev, extra = {}) {
    try { if (window.fbq) { fbq(ev === "lead" ? "track" : "trackCustom", ev === "lead" ? "Lead" : ev, extra); if (window.fbqLoad) fbqLoad(); } } catch (_) {}
    try { if (window.gtag) gtag("event", ev === "lead" ? "generate_lead" : ev, extra); } catch (_) {}
    try { (window.dataLayer = window.dataLayer || []).push({ event: "qf_" + ev, ...extra }); } catch (_) {}
  }
  window.qfTrack = track;
  function send() {
    track("form_complete", { estilo: F().styles[st.style] });
    if (!site.webhook) return;
    /* data/hora do cadastro no fuso de Miami, ex.: 13/11/2026 14:05 */
    let data = "";
    try { data = new Intl.DateTimeFormat("pt-BR", { timeZone: "America/New_York", day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date()).replace(",", ""); } catch (_) { data = new Date().toISOString(); }
    const dados = new URLSearchParams({ data, estilo: TXT.en.qf.styles[st.style] /* sempre em inglês */, ideia: st.idea.trim(), nome: st.first.trim(), sobrenome: st.last.trim(), telefone: st.phone.trim(), email: st.email.trim(), idioma: document.documentElement.lang, pagina: location.href });
    /* não reenvia o mesmo lead; reenvia só se a pessoa editou as respostas */
    const chave = [...dados].filter(([k]) => k !== "idioma" && k !== "data").map(([, v]) => v).join("|");
    if (st.sent === chave) return; st.sent = chave;
    try { fetch(site.webhook, { method: "POST", body: dados, mode: "no-cors", keepalive: true }).catch(() => {}); } catch (_) {}
  }
  async function copy() {
    const t = message(); let ok = false;
    try { await navigator.clipboard.writeText(t); ok = true; } catch (_) {
      try { const r = document.createRange(); r.selectNodeContents($("qf-msg")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); ok = document.execCommand("copy"); } catch (_) {}
    }
    if (ok && $("qf-ok")) $("qf-ok").textContent = F().copied;
  }
  function go(dir) {
    st.dir = dir === "next" ? "next" : "back";
    if (dir === "next") { if (!valid()) return; if (!st.started) { st.started = true; track("form_start"); } st.step++; track("form_step", { step: st.step }); if (st.step === TOTAL) send(); }
    else if (dir === "back") st.step = Math.max(0, st.step - 1);
    else if (dir === "edit") st.step = 0;
    render(true);
    box.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest" });
  }
  box.addEventListener("click", (e) => {
    const o = e.target.closest(".qf-opt");
    if (o) { st.style = +o.dataset.i; box.querySelectorAll(".qf-opt").forEach((b) => b.setAttribute("aria-checked", String(b === o))); err("style", ""); setTimeout(() => { if (st.step === 0) go("next"); }, 220); return; }
    const g = e.target.closest("[data-go]");
    if (g) { if (g.dataset.go === "copy") copy(); else go(g.dataset.go); return; }
    if (e.target.closest("#cta")) { /* copia ao abrir o Direct (o link abre normalmente) e registra a conversão */
      copy();
      if (!st.lead) { st.lead = true; track("lead", { content_name: "Instagram Direct", content_category: F().styles[st.style] }); }
    }
  });
  box.addEventListener("input", (e) => { const k = e.target.id.replace("qf-", ""); if (k in st) { st[k] = e.target.value; if (e.target.getAttribute("aria-invalid") === "true") err(k, ""); } });
  box.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.tagName === "INPUT") { e.preventDefault(); go("next"); }
    const opts = [...box.querySelectorAll(".qf-opt")], i = opts.indexOf(e.target);
    if (i >= 0 && /Arrow(Down|Right|Up|Left)/.test(e.key)) { e.preventDefault(); opts[(i + (/Down|Right/.test(e.key) ? 1 : -1) + opts.length) % opts.length].focus(); }
  });
  render(false);
})();

/* --- lightbox: portfólio (com setas) e fotos das avaliações (avulsas) --- */
(function () {
  const lb = $("lb"), n = site.portfolio.length;
  let cur = null, opener = null, single = false;
  const show = (src, alt) => { $("lb-media").innerHTML = `<img src="${src}" alt="${esc(alt)}">`; $("lb-caption").textContent = alt; };
  const go = (i) => { cur = (i + n) % n; show(site.portfolio[cur], L.portfolio[cur]); };
  function open(btn) { opener = btn; lb.classList.toggle("single", single); lb.hidden = false; document.body.style.overflow = "hidden"; $("lb-close").focus(); }
  function close() { lb.hidden = true; cur = null; single = false; document.body.style.overflow = ""; opener?.focus(); }
  $("grid").addEventListener("click", (e) => { const b = e.target.closest(".pf"); if (b) { single = false; go(+b.dataset.i); open(b); } });
  window.abrirFoto = (src, alt, from) => { single = true; cur = 0; show(src, alt); open(from); };
  $("reviews").addEventListener("click", (e) => { const b = e.target.closest(".review-photo"); if (b) window.abrirFoto(b.dataset.src, L.rev.foto, b); });
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target.id === "lb-caption") close(); });
  $("lb-close").onclick = close;
  $("lb-prev").onclick = (e) => { e.stopPropagation(); go(cur - 1); };
  $("lb-next").onclick = (e) => { e.stopPropagation(); go(cur + 1); };
  addEventListener("keydown", (e) => {
    if (cur === null) return;
    if (e.key === "Escape") close();
    else if (!single && e.key === "ArrowRight") go(cur + 1);
    else if (!single && e.key === "ArrowLeft") go(cur - 1);
  });
})();

