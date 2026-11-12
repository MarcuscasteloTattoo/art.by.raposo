/* Comportamento do site (idiomas, carrosséis, formulário, lightbox).
   Normalmente não é preciso mexer aqui. */
/* ============ CÓDIGO ============ */
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
let L = TXT.pt;
const STARS = '<svg aria-hidden="true"><use href="#i-star"/></svg>'.repeat(5);

function photo(src, alt, sizes, lazy = true) {
  const small = src.replace(/\.webp$/, "-480.webp");
  return `<span class="ph"><img src="${src}" srcset="${small} 480w, ${src} 900w" sizes="${sizes}" alt="${esc(alt)}"${lazy ? ' loading="lazy"' : ""} decoding="async" draggable="false"></span>`;
}

/* --- render --- */
function renderMarquee() {
  const w = [...L.marquee, ...L.marquee, ...L.marquee, ...L.marquee];
  $("marquee").innerHTML = w.map((x) => `<span>${esc(x)} <b>•</b></span>`).join("");
}
function renderCarousel() {
  const card = (e, i) => { const [tit, txt, alt] = L.estilos[i]; return `<article class="style-card">${photo(e.img, alt, "(min-width: 640px) 19rem, 15rem")}<h3>${esc(tit)}</h3><p>${esc(txt)}</p></article>`; };
  $("car-track").innerHTML = [0, 1, 2, 3].map((c) => `<div class="car-copy"${c ? ' aria-hidden="true"' : ""}>${site.estilos.map(card).join("")}</div>`).join("");
}
function renderGrid() {
  $("grid").innerHTML = site.portfolio.map((src, i) =>
    `<button type="button" class="pf" data-i="${i}" aria-label="${esc(L.ampliar + L.portfolio[i])}">${photo(src, L.portfolio[i], "(min-width: 768px) 23rem, 50vw")}</button>`).join("");
}

/* --- idiomas --- */
document.querySelectorAll("[data-t]").forEach((el) => { TXT.pt.t[el.dataset.t] = el.innerHTML; });
document.querySelectorAll("[data-a]").forEach((el) => { const [attr, k] = el.dataset.a.split(":"); TXT.pt.a[k] = el.getAttribute(attr); });
const meta = document.querySelector('meta[name="description"]');

function setLang(code, first) {
  L = TXT[code] || TXT.pt;
  document.documentElement.lang = L.lang;
  meta.content = L.desc;
  document.querySelectorAll("[data-t]").forEach((el) => { el.innerHTML = L.t[el.dataset.t] ?? TXT.pt.t[el.dataset.t]; });
  document.querySelectorAll("[data-a]").forEach((el) => { const [attr, k] = el.dataset.a.split(":"); el.setAttribute(attr, L.a[k] ?? TXT.pt.a[k]); });
  document.querySelectorAll(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === code)));
  document.querySelectorAll(".js-wa").forEach((a) => { a.href = `${site.whatsapp}?text=${encodeURIComponent(L.msg)}`; });
  renderMarquee(); renderReviews();
  if (first) { renderCarousel(); renderGrid(); return; }
  /* carrossel e grade: só troca textos, sem recriar (não perde posição) */
  document.querySelectorAll("#car-track .style-card").forEach((c, i) => {
    const [tit, txt, alt] = L.estilos[i % site.estilos.length];
    c.querySelector("h3").textContent = tit; c.querySelector("p").textContent = txt; c.querySelector("img").alt = alt;
  });
  document.querySelectorAll("#grid .pf").forEach((b) => { const alt = L.portfolio[+b.dataset.i]; b.setAttribute("aria-label", L.ampliar + alt); b.querySelector("img").alt = alt; });
}
document.querySelectorAll(".lang button").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));
/* abre em português; ?lang=en ou ?lang=es no endereço já abre no idioma */
setLang((location.search.match(/[?&]lang=(pt|en|es)\b/) || [])[1] || "pt", true);
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
    f.title = { "pt-BR": "Mapa do estúdio Léo Lead Tattoo", en: "Map of Léo Lead Tattoo studio", es: "Mapa del estudio Léo Lead Tattoo" }[document.documentElement.lang] || "Mapa";
    f.allowFullscreen = true; box.appendChild(f);
    /* se a página onde o site está bloquear mapas incorporados, some com o quadro e deixa o link "Ver no Google Maps" */
    document.addEventListener("securitypolicyviolation", (e) => { if (/google\.com/.test(e.blockedURI || "")) f.remove(); });
  };
  if (!("IntersectionObserver" in window)) return load();
  const io = new IntersectionObserver((en) => { if (en[0].isIntersecting) { load(); io.disconnect(); } }, { rootMargin: "300px" });
  io.observe(box);
})();

/* --- formulário: nome + telefone (máscara BR) e envio pelo WhatsApp --- */
(function () {
  const form = $("lead-form"), nome = $("f-nome"), tel = $("f-tel");
  /* (21) 3456-7890 para fixo, (21) 97472-2394 para celular */
  function mask(v) {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 2) return d ? `(${d}` : "";
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  }
  const telOk = (v) => { const d = v.replace(/\D/g, ""); return d[0] !== "0" && (d.length === 10 || (d.length === 11 && d[2] === "9")); };
  const setErr = (input, msg) => { input.setAttribute("aria-invalid", msg ? "true" : "false"); $(input.getAttribute("aria-describedby")).textContent = msg; };
  tel.addEventListener("input", () => { tel.value = mask(tel.value); if (tel.getAttribute("aria-invalid") === "true" && telOk(tel.value)) setErr(tel, ""); });
  nome.addEventListener("input", () => { if (nome.value.trim().length >= 2) setErr(nome, ""); });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const okN = nome.value.trim().length >= 2, okT = telOk(tel.value);
    setErr(nome, okN ? "" : L.form.errNome); setErr(tel, okT ? "" : L.form.errTel);
    if (!okN) return nome.focus();
    if (!okT) return tel.focus();
    const digits = tel.value.replace(/\D/g, "");
    /* envia o cadastro para o Make (formato de formulário, não precisa de CORS) */
    const dados = new URLSearchParams({
      nome: nome.value.trim(), telefone: tel.value, telefone_whatsapp: "55" + digits,
      idioma: document.documentElement.lang, pagina: location.href,
      /* data e hora de Brasília: 23/10/2026 16:29:05 */
      data: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).replace(",", ""),
    });
    try { fetch(site.webhook, { method: "POST", body: dados, mode: "no-cors", keepalive: true }).catch(() => {}); } catch (_) {}
    $("form-ok").textContent = L.form.ok; $("form-ok").hidden = false;
    /* nome e telefone vão só para o webhook; o WhatsApp abre apenas com a mensagem padrão */
    const texto = L.msg;
    window.open(`${site.whatsapp}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
  });
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

