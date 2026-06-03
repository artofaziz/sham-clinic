/* =============================================================
   SHAM DENTAL — Interactions & cinematic animations
   ============================================================= */
(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Sticky nav + scroll progress ---------- */
  const nav = $("#nav");
  const progress = $("#scrollProgress");
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 40);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const menu = $("#mobileMenu");
  $("#navBurger") && $("#navBurger").addEventListener("click", () => menu.classList.add("open"));
  $("#menuClose") && $("#menuClose").addEventListener("click", () => menu.classList.remove("open"));
  $$(".mobile-menu a").forEach((a) => a.addEventListener("click", () => menu.classList.remove("open")));

  /* ---------- Scroll reveal ---------- */
  const revealEls = $$("[data-reveal]");
  if ("IntersectionObserver" in window && !prefersReduced) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ---------- Animated counters ---------- */
  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || "";
    if (prefersReduced) { el.textContent = format(target) + suffix; return; }
    const dur = 2000;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = format(Math.floor(target * eased)) + (p === 1 ? suffix : "");
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = format(target) + suffix;
    }
    requestAnimationFrame(tick);
  }
  function format(n) {
    return n >= 1000 ? n.toLocaleString("en-US") : String(n);
  }
  const counters = $$("[data-count]");
  if ("IntersectionObserver" in window) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((c) => cio.observe(c));
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- Hero parallax ---------- */
  const parallaxEls = $$("[data-parallax]");
  if (!prefersReduced) {
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      parallaxEls.forEach((el) => {
        const s = parseFloat(el.dataset.parallax) || 0.2;
        el.style.transform = `translate3d(0, ${y * s}px, 0)`;
      });
    }, { passive: true });
  }

  /* ---------- Transformation journey ---------- */
  const steps = $$(".jstep");
  const panels = $$("#journeyVisual .panel");
  let journeyIdx = 0;
  let journeyTimer = null;
  function setJourney(i) {
    journeyIdx = i;
    steps.forEach((s, k) => s.classList.toggle("active", k === i));
    panels.forEach((p, k) => p.classList.toggle("active", k === i));
  }
  steps.forEach((s) =>
    s.addEventListener("click", () => {
      setJourney(parseInt(s.dataset.step, 10));
      restartJourney();
    })
  );
  function autoJourney() { setJourney((journeyIdx + 1) % steps.length); }
  function restartJourney() {
    clearInterval(journeyTimer);
    if (!prefersReduced) journeyTimer = setInterval(autoJourney, 4200);
  }
  // start auto only when in view
  const story = $("#story");
  if (story && "IntersectionObserver" in window) {
    const sio = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? restartJourney() : clearInterval(journeyTimer)));
    }, { threshold: 0.25 });
    sio.observe(story);
  }

  /* ---------- Before / After slider ---------- */
  const baSlider = $("#baSlider");
  if (baSlider) {
    const after = $("#baAfter");
    const handle = $("#baHandle");
    let dragging = false;
    function setPos(clientX) {
      const rect = baSlider.getBoundingClientRect();
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(2, Math.min(98, pct));
      const rtl = document.documentElement.dir === "rtl";
      // after image clipped from the side opposite the handle
      after.style.clipPath = rtl ? `inset(0 ${100 - pct}% 0 0)` : `inset(0 0 0 ${pct}%)`;
      handle.style.insetInlineStart = pct + "%";
      handle.style.left = pct + "%";
    }
    const start = () => (dragging = true);
    const end = () => (dragging = false);
    const move = (x) => dragging && setPos(x);
    baSlider.addEventListener("mousedown", (e) => { start(); setPos(e.clientX); });
    window.addEventListener("mousemove", (e) => move(e.clientX));
    window.addEventListener("mouseup", end);
    baSlider.addEventListener("touchstart", (e) => { start(); setPos(e.touches[0].clientX); }, { passive: true });
    baSlider.addEventListener("touchmove", (e) => move(e.touches[0].clientX), { passive: true });
    baSlider.addEventListener("touchend", end);
    // subtle auto-hint when revealed
    if (!prefersReduced && "IntersectionObserver" in window) {
      const bio = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            let t = 0;
            const id = setInterval(() => {
              const rect = baSlider.getBoundingClientRect();
              const wobble = 50 + Math.sin(t / 6) * 18;
              setPos(rect.left + (rect.width * wobble) / 100);
              if (++t > 22) clearInterval(id);
            }, 30);
            bio.unobserve(e.target);
          }
        });
      }, { threshold: 0.4 });
      bio.observe(baSlider);
    }
  }

  /* ---------- Locations ---------- */
  const locItems = $$("#locList .loc-item");
  const locPin = $("#locPin");
  const locName = $("#locName");
  const locAddr = $("#locAddr");
  locItems.forEach((item) => {
    item.addEventListener("click", () => {
      locItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
      if (locPin) { locPin.style.left = item.dataset.x + "%"; locPin.style.top = item.dataset.y + "%"; }
      const h3 = item.querySelector("h3");
      if (locName) locName.textContent = h3 ? h3.textContent.trim() : "";
      const addr = item.querySelector(".addr");
      if (locAddr && addr) {
        locAddr.textContent = addr.textContent;
        if (addr.dataset.i18n) locAddr.dataset.i18n = addr.dataset.i18n;
      }
    });
  });

  /* ---------- Testimonials render ---------- */
  function renderTestimonials(lang) {
    const track = $("#testiTrack");
    if (!track || !window.SHAM_TESTIMONIALS) return;
    const data = window.SHAM_TESTIMONIALS[lang] || window.SHAM_TESTIMONIALS.en;
    const card = (t) => `
      <article class="testi-card">
        <div class="video">
          <img src="https://images.unsplash.com/photo-${t.img}?auto=format&fit=crop&w=600&q=80" alt="" onerror="this.style.opacity=.2"/>
          <button class="play" aria-label="Play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button>
        </div>
        <div class="stars">★★★★★</div>
        <blockquote>${t.q}</blockquote>
        <div class="testi-author">
          <img class="av" src="https://images.unsplash.com/photo-${t.img}?auto=format&fit=crop&w=120&q=80" alt="" onerror="this.style.opacity=.2"/>
          <div><div class="nm">${t.n}</div><div class="meta">${t.m}</div></div>
        </div>
      </article>`;
    // duplicate for seamless marquee
    track.innerHTML = (data.map(card).join("") + data.map(card).join(""));
  }

  /* ---------- i18n / language switch ---------- */
  const dict = window.SHAM_I18N || { en: {}, ar: {} };
  function applyLang(lang) {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
    const table = dict[lang] || dict.en;
    $$("[data-i18n]").forEach((el) => {
      const k = el.dataset.i18n;
      if (table[k] != null) el.textContent = table[k];
    });
    $$("[data-i18n-html]").forEach((el) => {
      const k = el.dataset.i18nHtml;
      if (table[k] != null) el.innerHTML = table[k];
    });
    const label = $("#langLabel");
    if (label) label.textContent = lang === "ar" ? "English" : "العربية";
    renderTestimonials(lang);
    try { localStorage.setItem("sham_lang", lang); } catch (e) {}
  }
  const langToggle = $("#langToggle");
  langToggle && langToggle.addEventListener("click", () => {
    const next = document.documentElement.lang === "ar" ? "en" : "ar";
    applyLang(next);
  });
  let initial = "en";
  try { initial = localStorage.getItem("sham_lang") || "en"; } catch (e) {}
  applyLang(initial);

  /* ---------- Smooth anchor scroll ---------- */
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: prefersReduced ? "auto" : "smooth" });
      }
    });
  });
})();
