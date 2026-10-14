/* =============================================================================
   MANA TŌ'A · langage de motion permanent (JavaScript vanilla, aucune dépendance)
   Charge-le avec defer. Il s'initialise tout seul, et se ré-initialise quand une section est
   rechargée dans l'éditeur de thème Shopify (shopify:section:load).
   API : window.MT.loader.start() / .set(0..1) / .done()   ·   window.MT.refresh(racine)
   ============================================================================= */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
  var clamp = function (x, a, b) { return Math.min(b, Math.max(a, x)); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var seg = function (p, a, b) { return clamp((p - a) / (b - a), 0, 1); };
  var easeIn = function (t) { return t * t * t; };                          // gravité
  var easeOut = function (t) { return 1 - Math.pow(1 - t, 3); };
  var easeOutBack = function (t) { var c = 1.4; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };

  /* ---------------------------------------------------------------------------
     1 · LES COINS DU RING : sur tactile, la carte au centre de l'écran est « dans le ring »
     (le survol n'existe pas au doigt ; le :hover collant d'iOS est volontairement ignoré).
     --------------------------------------------------------------------------- */
  var ringIO = null;
  function initRings(root) {
    var cards = root.querySelectorAll(".mt-ring");
    if (!cards.length) return;
    if (canHover.matches) return;              // souris : le CSS :hover suffit
    if (!ringIO) {
      ringIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { e.target.classList.toggle("is-mt-active", e.isIntersecting); });
      }, { rootMargin: "-38% 0px -38% 0px", threshold: 0 });   // bande centrale de 24 % de l'écran
    }
    cards.forEach(function (c) { if (!c.__mtRing) { c.__mtRing = 1; ringIO.observe(c); } });
  }

  /* ---------------------------------------------------------------------------
     2 · LE TRAIT DU Ō
     --------------------------------------------------------------------------- */
  // 2a · logo
  function initLogo(root) {
    root.querySelectorAll(".mt-o").forEach(function (o) {
      if (o.__mt) return; o.__mt = 1;
      requestAnimationFrame(function () { requestAnimationFrame(function () { o.classList.add("is-mt-drawn"); }); });
    });
  }

  // 2b · titres : apparaissent quand 30 % du titre est visible, une seule fois
  var headIO = null;
  function initHeadings(root) {
    var hs = root.querySelectorAll(".mt-h");
    if (!hs.length) return;
    if (!headIO) {
      headIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("is-mt-in"); headIO.unobserve(e.target); }
        });
      }, { threshold: 0.3, rootMargin: "0px 0px -8% 0px" });
    }
    hs.forEach(function (h) { if (!h.__mt) { h.__mt = 1; headIO.observe(h); } });
  }

  // 2c · menu : le trait glisse au-dessus du lien survolé et revient sur le lien actif
  function initNavs(root) {
    root.querySelectorAll("[data-mt-nav]").forEach(function (nav) {
      if (nav.__mt) return; nav.__mt = 1;
      var bar = nav.querySelector(".mt-nav__bar");
      if (!bar) { bar = document.createElement("span"); bar.className = "mt-nav__bar"; bar.setAttribute("aria-hidden", "true"); nav.appendChild(bar); }
      var links = Array.prototype.slice.call(nav.querySelectorAll(".mt-nav__link"));
      var current = function () { return nav.querySelector(".mt-nav__link[aria-current]"); };
      var geo = new Map();
      function measure() {
        // une seule mesure par changement de taille, jamais pendant l'animation
        var nb = nav.getBoundingClientRect();
        var tops = new Set();
        links.forEach(function (a) {
          var r = a.getBoundingClientRect();
          // le trait couvre la largeur du texte, et se pose 6 px au-dessus du lien
          geo.set(a, { x: r.left - nb.left, y: r.top - nb.top - 6, w: r.width });
          tops.add(Math.round(r.top));
        });
        nav.classList.toggle("mt-nav--stack", tops.size > 1);   // menu passé en colonne (mobile) : traits statiques
      }
      function place(a, instant) {
        if (!a || !geo.has(a)) { bar.style.setProperty("--mt-o", "0"); return; }
        var g = geo.get(a);
        if (instant) nav.classList.add("is-mt-instant");
        bar.style.top = g.y + "px";
        bar.style.setProperty("--mt-x", g.x + "px");
        bar.style.setProperty("--mt-w", String(g.w));
        bar.style.setProperty("--mt-o", "1");
        if (instant) { void bar.offsetWidth; nav.classList.remove("is-mt-instant"); }
      }
      measure(); place(current(), true);
      if (window.ResizeObserver) new ResizeObserver(function () { measure(); place(current(), true); }).observe(nav);
      links.forEach(function (a) {
        a.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") place(a); });
        a.addEventListener("focus", function () { place(a); });
      });
      nav.addEventListener("pointerleave", function () { place(current()); });
      nav.addEventListener("focusout", function (e) { if (!nav.contains(e.relatedTarget)) place(current()); });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { measure(); place(current(), true); });
    });
  }

  // 2d · barre de chargement (API globale + branchements automatiques)
  var loader = (function () {
    var el = null, bar = null, p = 0, timer = null, active = false;
    function ensure() {
      if (el) return;
      el = document.createElement("div"); el.className = "mt-loader"; el.setAttribute("aria-hidden", "true");
      bar = document.createElement("div"); bar.className = "mt-loader__bar"; el.appendChild(bar);
      document.body.appendChild(el);
    }
    function set(v) { ensure(); p = clamp(v, 0, 1); bar.style.setProperty("--mt-p", p.toFixed(4)); }
    function trickle() {   // avance de moins en moins vite : ne touche jamais 100 % tout seul
      if (!active) return;
      set(p + (0.92 - p) * 0.12);
      timer = setTimeout(trickle, 260);
    }
    return {
      start: function () {
        ensure(); clearTimeout(timer); active = true;
        el.classList.remove("is-mt-done");
        bar.style.transition = "none"; set(0); void bar.offsetWidth; bar.style.transition = "";
        set(0.08); timer = setTimeout(trickle, 180);
      },
      set: function (v) { active = true; set(v); },
      done: function () {
        if (!el || !active) return;
        active = false; clearTimeout(timer); set(1);
        setTimeout(function () { el.classList.add("is-mt-done"); }, 220);
      },
    };
  })();
  function hookLoader() {
    // ajouts au panier (fetch vers /cart/...) : le trait accompagne la requête
    if (window.fetch && !window.fetch.__mt) {
      var f = window.fetch;
      var wrapped = function (input) {
        var url = typeof input === "string" ? input : (input && input.url) || "";
        var watch = /\/cart\/(add|change|update|clear)/.test(url);
        if (!watch) return f.apply(this, arguments);
        loader.start();
        return f.apply(this, arguments).then(function (r) { loader.done(); return r; }, function (err) { loader.done(); throw err; });
      };
      wrapped.__mt = true; window.fetch = wrapped;
    }
    // navigation vers une autre page du site
    window.addEventListener("pagehide", function () { loader.start(); });
    window.addEventListener("pageshow", function (e) { if (e.persisted) loader.done(); });
  }

  /* ---------------------------------------------------------------------------
     3 · FACE / DOS
     --------------------------------------------------------------------------- */
  function initFlips(root) {
    root.querySelectorAll(".mt-flip").forEach(function (fl) {
      if (fl.__mt) return; fl.__mt = 1;
      var back = fl.querySelector(".mt-flip__face--back");
      if (!back) return;                       // produit sans photo de dos : pas de retournement
      // l'état vit sur l'hôte (.mt-flip-host, la carte) : le bouton est hors du bloc 3D
      var host = fl.closest(".mt-flip-host") || fl;
      host.classList.add("has-mt-back");
      // la photo du dos se charge dès que l'intention se précise (souris sur la carte)
      var warm = function () { if (back.loading === "lazy") back.loading = "eager"; };
      host.addEventListener("pointerenter", warm, { once: true });
      var btn = host.querySelector(".mt-flip__toggle");
      if (btn) {
        btn.addEventListener("click", function (e) {
          e.preventDefault(); e.stopPropagation(); warm();
          var on = !host.classList.contains("is-mt-flipped");
          host.classList.toggle("is-mt-flipped", on);
          btn.setAttribute("aria-pressed", on ? "true" : "false");
          btn.setAttribute("aria-label", on ? (btn.dataset.labelFront || "Voir la face") : (btn.dataset.labelBack || "Voir le dos"));
        });
      }
    });
  }

  /* ---------------------------------------------------------------------------
     4 · NEVER STAY DOWN (piloté par le scroll, fonction pure de la progression)
     --------------------------------------------------------------------------- */
  function rand(seed) {   // pseudo-aléatoire stable : la chute est la même à chaque visite
    return function () { seed = (seed + 0x6D2B79F5) | 0; var t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  function initNSD(root) {
    root.querySelectorAll("[data-mt-nsd]").forEach(function (sec) {
      if (sec.__mt) return; sec.__mt = 1;
      var line = sec.querySelector(".mt-nsd__line");
      var text = (line.getAttribute("data-text") || line.textContent).trim();
      sec.setAttribute("aria-label", text);
      line.setAttribute("aria-hidden", "true");
      line.textContent = "";
      var R = rand(7), letters = [], n = 0;
      text.split(/\s+/).forEach(function (w, wi, arr) {
        var word = document.createElement("span"); word.className = "mt-nsd__word";
        w.split("").forEach(function (ch) {
          var s = document.createElement("span"); s.className = "mt-nsd__l"; s.textContent = ch;
          var dir = R() < 0.5 ? -1 : 1;
          letters.push({
            el: s, i: n++,
            fall0: 0.12 + R() * 0.1,                 // départ de la chute (désordonné : un K.O. n'est pas une chorégraphie)
            ang: dir * (62 + R() * 26),              // couchée entre 62 et 88°
            drop: 0.06 + R() * 0.1,                  // s'affaisse un peu (en em)
          });
          word.appendChild(s);
        });
        line.appendChild(word);
        if (wi < arr.length - 1) line.appendChild(document.createTextNode(" "));
      });
      // relevé : de gauche à droite, une lettre après l'autre (ordre de lecture = ordre de relevé)
      letters.forEach(function (L) { L.rise0 = 0.56 + (L.i / Math.max(1, n - 1)) * 0.2; });
      var floor = sec.querySelector(".mt-nsd__floor"), bar = sec.querySelector(".mt-nsd__bar"), cap = sec.querySelector(".mt-nsd__caption");
      var lock = sec.getAttribute("data-mt-nsd-lock") !== "false";
      var maxP = 0, ticking = false, live = false;

      if (reduce.matches) {   // version calme : un fondu, une seule fois
        var io0 = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { sec.classList.add("is-mt-in"); io0.disconnect(); } }, { threshold: 0.4 });
        io0.observe(sec);
        return;
      }

      function render(p) {
        letters.forEach(function (L) {
          var f = easeIn(seg(p, L.fall0, L.fall0 + 0.12));          // chute : accélère comme un corps qui tombe
          var land = seg(p, L.fall0 + 0.12, L.fall0 + 0.17);        // à l'impact : petit tassement de 4°
          var r = easeOutBack(seg(p, L.rise0, L.rise0 + 0.1));      // relevé : léger dépassement, puis droit
          var down = f * (1 - r);
          var ang = L.ang * down + (land > 0 && land < 1 ? -Math.sign(L.ang) * 4 * Math.sin(land * Math.PI) * (1 - r) : 0);
          var y = L.drop * down;
          L.el.style.transform = "translateY(" + y.toFixed(3) + "em) rotate(" + ang.toFixed(2) + "deg)";
          L.el.style.opacity = (1 - 0.45 * down).toFixed(3);       // au sol, la lettre perd un peu d'encre
        });
        var fl = seg(p, 0.14, 0.3) * (1 - seg(p, 0.66, 0.8));
        if (floor) { floor.style.opacity = (0.35 * fl).toFixed(3); floor.style.transform = "scaleX(" + lerp(0.2, 1, easeOut(fl)).toFixed(3) + ")"; }
        if (bar) bar.style.transform = "scaleX(" + easeOut(seg(p, 0.8, 0.94)).toFixed(4) + ")";   // le seul moment doré
        if (cap) cap.style.opacity = seg(p, 0.86, 0.96).toFixed(3);
      }
      function progress() {
        var r = sec.getBoundingClientRect(), vh = window.innerHeight;
        return clamp(-r.top / Math.max(1, r.height - vh), 0, 1);
      }
      function frame() {
        ticking = false;
        var p = progress();
        if (lock) { if (maxP >= 1) p = 1; else if (p > maxP) maxP = p; if (maxP >= 0.95) { maxP = 1; p = 1; sec.classList.remove("is-mt-running"); } }
        render(p);
      }
      function onScroll() { if (live && !ticking) { ticking = true; requestAnimationFrame(frame); } }
      new IntersectionObserver(function (es) {
        live = es[0].isIntersecting;
        sec.classList.toggle("is-mt-running", live && maxP < 1);
        if (live) onScroll();
      }, { rootMargin: "20% 0px 20% 0px" }).observe(sec);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      render(0);
    });
  }

  /* --------------------------------------------------------------------------- */
  function refresh(root) {
    root = root || document;
    initRings(root); initLogo(root); initHeadings(root); initNavs(root); initFlips(root); initNSD(root);
  }
  window.MT = { refresh: refresh, loader: loader };
  function boot() { refresh(document); hookLoader(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
  document.addEventListener("shopify:section:load", function (e) { refresh(e.target); });
})();
