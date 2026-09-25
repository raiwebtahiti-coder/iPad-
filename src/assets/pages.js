/* ═══════════════════════════════════════════════════════════
   LES FARE DE MAATEA — pages fare et contact
   · révélations douces au défilement (désactivées si reduced-motion)
   · visionneuse de la galerie
   · formulaire de demande (Netlify Forms, envoi sans rechargement)
   · calendrier de disponibilités (optionnel : masqué sans données)
   ═══════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const T = window.I18N || {};
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fmt = (key, vars = {}) => Object.entries(vars).reduce((s, [k, v]) => s.replaceAll(`{${k}}`, v), T[key] || key);

  /* ─── révélations ─── */
  const reveals = $$('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('in-view'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((el) => io.observe(el));
  }

  /* ─── visionneuse ─── */
  const lb = $('[data-lightbox]');
  const items = $$('.g-open');
  if (lb && items.length && typeof lb.showModal === 'function') {
    const lbImg = $('[data-lb-img]', lb), lbCount = $('[data-lb-count]', lb);
    let idx = 0, opener = null;
    const show = (i) => {
      idx = (i + items.length) % items.length;
      const b = items[idx];
      lbImg.src = b.dataset.full;
      lbImg.width = +b.dataset.w; lbImg.height = +b.dataset.h;
      lbImg.alt = $('img', b).alt;
      lbCount.textContent = `${idx + 1} / ${items.length}`;
    };
    items.forEach((b, i) => b.addEventListener('click', () => { opener = b; show(i); lb.showModal(); }));
    const all = $('[data-gallery-all]');
    if (all) all.addEventListener('click', () => { opener = all; show(8); lb.showModal(); });
    $('[data-lb-close]', lb).addEventListener('click', () => lb.close());
    $('[data-lb-prev]', lb).addEventListener('click', () => show(idx - 1));
    $('[data-lb-next]', lb).addEventListener('click', () => show(idx + 1));
    lb.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
    lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
    lb.addEventListener('close', () => opener && opener.focus());
    // balayage au doigt
    let x0 = null;
    lb.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }

  /* ─── dates ─── */
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const parse = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const todayIso = iso(new Date());
  let busyRanges = [];   // [{start, end}] ISO, fin exclusive (jour de départ)
  const isBusy = (dIso) => busyRanges.some((r) => dIso >= r.start && dIso < r.end);
  const overlaps = (a, b) => busyRanges.some((r) => a < r.end && b > r.start);

  /* ─── formulaire ─── */
  $$('[data-form]').forEach((form) => {
    const ok = form.nextElementSibling;
    const arr = $('[data-arrival]', form), dep = $('[data-departure]', form);
    const nights = $('[data-nights]', form), warn = $('[data-busy-warn]', form);
    const errBox = $('[data-form-error]', form), submit = $('[data-submit]', form);
    arr.min = todayIso; dep.min = todayIso;

    const setErr = (field, msg) => {
      const wrap = field.closest('.field');
      let e = $('.err', wrap);
      if (!msg) { field.removeAttribute('aria-invalid'); if (e) e.remove(); return; }
      field.setAttribute('aria-invalid', 'true');
      if (!e) { e = document.createElement('small'); e.className = 'err'; e.id = field.id + '-err'; wrap.appendChild(e); }
      e.textContent = msg;
      field.setAttribute('aria-describedby', [field.getAttribute('aria-describedby'), e.id].filter(Boolean).join(' '));
    };

    const checkDates = () => {
      nights.textContent = '';
      if (warn) warn.hidden = true;
      if (arr.value) dep.min = arr.value;
      if (!arr.value || !dep.value) return true;
      const n = Math.round((parse(dep.value) - parse(arr.value)) / 864e5);
      if (n <= 0) { setErr(dep, T['form.errDates']); return false; }
      setErr(dep, '');
      nights.textContent = fmt('form.nights', { n });
      if (warn && overlaps(arr.value, dep.value)) warn.hidden = false;
      return true;
    };
    arr.addEventListener('change', () => { if (arr.value && arr.value < todayIso) setErr(arr, T['form.errPast']); else setErr(arr, ''); checkDates(); document.dispatchEvent(new CustomEvent('dates-changed')); });
    dep.addEventListener('change', () => { checkDates(); document.dispatchEvent(new CustomEvent('dates-changed')); });
    form.__dates = () => [arr.value, dep.value];

    const validate = () => {
      let first = null;
      $$('[required]', form).forEach((f) => {
        let msg = '';
        if (!f.value.trim()) msg = T['form.errRequired'];
        else if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value)) msg = T['form.errEmail'];
        else if (f === arr && f.value < todayIso) msg = T['form.errPast'];
        setErr(f, msg);
        if (msg && !first) first = f;
      });
      if (!checkDates() && !first) first = dep;
      if (first) first.focus();
      return !first;
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errBox.hidden = true;
      if (!validate()) return;
      submit.disabled = true;
      const label = submit.textContent;
      submit.textContent = T['form.sending'];
      try {
        const body = new URLSearchParams(new FormData(form)).toString();
        const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
        if (!res.ok) throw new Error(res.status);
        form.hidden = true;
        ok.hidden = false;
        ok.focus();
      } catch {
        errBox.hidden = false;
      } finally {
        submit.disabled = false;
        submit.textContent = label;
      }
    });
    const again = $('[data-form-again]', ok);
    if (again) again.addEventListener('click', () => { form.reset(); nights.textContent = ''; ok.hidden = true; form.hidden = false; $('select, input:not([type=hidden])', form).focus(); });
  });

  /* ─── calendrier de disponibilités ───
     Lu par la fonction Netlify /api/availability. Pas de variable iCal,
     pas de fonction (déploiement glisser-déposer) ou erreur : le bloc
     reste masqué — jamais de calendrier faussement libre. */
  const av = $('[data-availability]');
  if (av) {
    fetch(`/api/availability?fare=${encodeURIComponent(av.dataset.fare)}`, { headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data || !data.enabled || !Array.isArray(data.busy)) return;
        busyRanges = data.busy;
        renderCal($('[data-cal]', av));
        av.hidden = false;
      })
      .catch(() => {});
  }

  function renderCal(root) {
    const locale = T.locale || 'fr-FR';
    const monthFmt = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
    const dowFmt = new Intl.DateTimeFormat(locale, { weekday: 'narrow' });
    const now = new Date();
    const first = new Date(now.getFullYear(), now.getMonth(), 1);
    const MAX = 12, SHOW = 2;
    let offset = 0;
    const form = $('[data-form]');
    const selected = () => (form && form.__dates ? form.__dates() : ['', '']);

    const monthHtml = (m) => {
      const d0 = new Date(first.getFullYear(), first.getMonth() + m, 1);
      const days = new Date(d0.getFullYear(), d0.getMonth() + 1, 0).getDate();
      const lead = (d0.getDay() + 6) % 7; // lundi en premier
      const [sa, sd] = selected();
      let cells = '';
      for (let i = 0; i < 7; i++) cells += `<span class="dow" aria-hidden="true">${dowFmt.format(new Date(2024, 0, 1 + i))}</span>`;
      for (let i = 0; i < lead; i++) cells += '<span></span>';
      for (let d = 1; d <= days; d++) {
        const di = iso(new Date(d0.getFullYear(), d0.getMonth(), d));
        const cls = di < todayIso ? 'past' : isBusy(di) ? 'busy' : 'free';
        const sel = sa && sd && di >= sa && di < sd ? ' sel' : '';
        const label = cls === 'busy' ? T['cal.legendBusy'] : cls === 'free' ? T['cal.legendFree'] : '';
        cells += `<span class="d ${cls}${sel}"${label ? ` aria-label="${d} — ${label}"` : ''}>${d}</span>`;
      }
      return `<div class="cal-month"><h4>${monthFmt.format(d0)}</h4><div class="cal-grid">${cells}</div></div>`;
    };
    const arrow = (dir) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${dir < 0 ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}"/></svg>`;
    const draw = () => {
      root.innerHTML = `<div class="cal-nav">
          <button type="button" data-cal-prev aria-label="${T['cal.prev']}"${offset === 0 ? ' disabled' : ''}>${arrow(-1)}</button>
          <button type="button" data-cal-next aria-label="${T['cal.next']}"${offset >= MAX - SHOW ? ' disabled' : ''}>${arrow(1)}</button>
        </div>
        <div class="cal-months">${Array.from({ length: SHOW }, (_, i) => monthHtml(offset + i)).join('')}</div>
        <p class="cal-legend"><span class="free"><i></i>${T['cal.legendFree']}</span><span class="busy"><i></i>${T['cal.legendBusy']}</span></p>`;
      $('[data-cal-prev]', root).onclick = () => { offset = Math.max(0, offset - 1); draw(); };
      $('[data-cal-next]', root).onclick = () => { offset = Math.min(MAX - SHOW, offset + 1); draw(); };
    };
    draw();
    document.addEventListener('dates-changed', draw);
  }
})();
