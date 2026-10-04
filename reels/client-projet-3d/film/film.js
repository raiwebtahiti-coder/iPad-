// RAI WEB DESIGN · « Votre projet. Je le construis. » v2 — bleu nuit, vraie 3D, 9:16, 18 s (36 beats à 120 bpm).
// Le client demande (fenêtre de discussion en 3D) → je construis (liste 3D qui se coche, 0 → 100 %) → deux semaines
// plus tard le site est en ligne (navigateur + téléphone en 3D) → éclat de lumière → logo RWD + WhatsApp.
// Fonction pure du temps : aucune minuterie, aucun Math.random, rien de muté dans run() hors put().
(() => {
  const { W, H, put, reg, el, scene, canvas, sp, spHit, trk, seg, clamp, lerp, ease, bt, beatOf, mulberry32 } = C;
  const { line, rise, type } = TYPE;
  C.fonts = ['900 italic 100px Display', '600 40px UI', '800 40px UI'];

  const ACC = '#5b8cff', ACC2 = '#9db8ff', INK = '#f2f5ff', INK2 = '#93a0c7';
  const css3d = (o) => `perspective(${o.p || 1800}px) translate(${(o.x || 0).toFixed(2)}px, ${(o.y || 0).toFixed(2)}px) ` +
    `translateZ(${(o.z || 0).toFixed(2)}px) rotateX(${(o.rx || 0).toFixed(3)}deg) rotateY(${(o.ry || 0).toFixed(3)}deg) ` +
    `rotateZ(${(o.rz || 0).toFixed(3)}deg) scale(${(o.s ?? 1).toFixed(5)})`;
  const blur = (px) => (px > 0.3 ? `blur(${px.toFixed(1)}px)` : 'none');
  const shown = (p) => (p > 0.002 ? 1 : 0);

  // petite étiquette : petites capitales espacées dans une pastille de couleur
  function tag(parent, text, x, y, o = {}) {
    const e = el('div', { class: 'abs', style:
      `left:${x}px;top:${y}px;padding:14px 26px 13px;border-radius:999px;font:800 26px/1 UI;letter-spacing:.3em;` +
      `text-transform:uppercase;white-space:nowrap;color:${o.color || '#050a1c'};background:${o.bg || ACC2};` +
      `box-shadow:0 0 0 1px rgba(255,255,255,.15) inset, 0 10px 30px -8px ${o.glow || 'rgba(91,140,255,.6)'};transform-origin:0 50%` }, parent, text);
    return reg(e, { o: 0 });
  }
  function popTag(t, e, at, outAt) {
    const p = spHit(t, at, 'snappy'), q = outAt != null ? sp(t, outAt, 'snappy') : 0;
    put(e, { o: shown(p) * (1 - q), sx: 0.6 + 0.4 * p, sy: 0.6 + 0.4 * p, x: -30 * (1 - p) - 40 * q, filter: blur(8 * (1 - p)) });
  }
  // ligne de texte centrée, écrite mot par mot (montée ressort + flou)
  function center(parent, text, y, size, o = {}) {
    const box = el('div', { class: 'abs', style: `left:0;top:${y}px;width:${W}px;text-align:center;white-space:nowrap;` +
      `font:${o.weight || 800} ${size}px/1.15 ${o.font || 'UI'};color:${o.color || INK};letter-spacing:${o.ls || '0'}` }, parent);
    const words = text.split(' ').map((w, i, a) => {
      const s = el('span', { style: 'display:inline-block' }, box, w);
      if (o.accent && o.accent.includes(i)) s.style.color = ACC2;
      if (i < a.length - 1) box.appendChild(document.createTextNode(' '));
      return reg(s, { o: 0 });
    });
    reg(box);
    return { box, words };
  }
  function riseWords(t, L, at, step = 0.18, preset = 'snappy') {
    L.words.forEach((w, i) => {
      const p = spHit(t, beatOf(at) + i * step, preset);
      put(w, { o: shown(p) * clamp(p * 1.4), y: 40 * (1 - p), filter: blur(10 * (1 - p)) });
    });
  }

  // ===================================================================== fond : nuit bleue, halo, sol 3D, poussières
  scene({
    name: 'bg', from: 0, to: 'done',
    build(root, S) {
      S.g = canvas(root);
      const r = mulberry32(689);
      S.dust = Array.from({ length: 70 }, () => ({ x: r() * W, y: r() * H, z: 0.3 + r() * 0.7, k: r() }));
    },
    run(t, b, S) {
      const g = S.g;
      const sky = g.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, '#060c22'); sky.addColorStop(0.55, '#040919'); sky.addColorStop(1, '#02040c');
      g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1; g.fillStyle = sky; g.fillRect(0, 0, W, H);
      // halo : naît d'un point de lumière à l'image 0, puis suit le sujet de chaque scène
      const hx = trk(t, [[0, 540], [8.5, 560, 'default'], [17, 520, 'default'], [26, 540, 'default']]);
      const hy = trk(t, [[0, 1180], [2.5, 1160, 'default'], [8.5, 1050, 'default'], [17, 1080, 'default'], [26, 700, 'heavy']]);
      const hr = trk(t, [[0, 60], [0, 1050, 'heavy'], [26, 1150, 'heavy']]);
      const breathe = 1 + 0.05 * Math.sin(t * 2.1);
      const h = g.createRadialGradient(hx, hy, 0, hx, hy, hr * breathe);
      h.addColorStop(0, 'rgba(110,150,255,.55)'); h.addColorStop(0.35, 'rgba(60,95,235,.26)'); h.addColorStop(1, 'rgba(30,50,160,0)');
      g.globalCompositeOperation = 'lighter'; g.fillStyle = h; g.fillRect(0, 0, W, H);
      // le point de lumière de l'ouverture (blanc au cœur), qui s'efface quand la fenêtre arrive
      const pt = 1 - sp(t, 'chat', 'default');
      if (pt > 0.01) {
        const c = g.createRadialGradient(540, 1180, 0, 540, 1180, 220);
        c.addColorStop(0, `rgba(255,255,255,${0.95 * pt})`); c.addColorStop(0.12, `rgba(190,210,255,${0.7 * pt})`); c.addColorStop(1, 'rgba(91,140,255,0)');
        g.fillStyle = c; g.fillRect(0, 0, W, H);
      }
      // sol en perspective : lignes qui défilent vers la caméra (profondeur permanente)
      const hor = 1290, vp = 540;
      g.strokeStyle = 'rgba(120,150,255,.10)'; g.lineWidth = 1.5;
      for (let i = -12; i <= 12; i++) { g.beginPath(); g.moveTo(vp + i * 18, hor); g.lineTo(vp + i * 260, H); g.stroke(); }
      const off = (t * 0.6) % 1;
      for (let j = 0; j < 12; j++) {
        const z = (j + 1 - off) / 12, y = hor + (H - hor) * Math.pow(z, 2.2);
        g.globalAlpha = 0.15 * z; g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke();
      }
      g.globalAlpha = 1;
      // poussières lumineuses (parallaxe)
      for (const d of S.dust) {
        const y = ((d.y - t * 40 * d.z) % H + H) % H, x = d.x + Math.sin(t * 0.7 + d.k * 6) * 12 * d.z;
        g.globalAlpha = 0.18 + 0.4 * d.z * (0.6 + 0.4 * Math.sin(t * 3 + d.k * 9));
        g.fillStyle = '#a9c0ff'; g.beginPath(); g.arc(x, y, 1.2 + 1.8 * d.z, 0, 6.2832); g.fill();
      }
      g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
    },
  });

  // ===================================================================== 1. LE CLIENT DEMANDE (0 → 8.6)
  scene({
    name: 'ask', from: 0, to: 8.7,
    build(root, S) {
      S.cam = el('div', { class: 'abs', style: `width:${W}px;height:${H}px;transform-origin:540px 1000px` }, root); reg(S.cam);
      S.l1 = line(S.cam, 'VOUS AVEZ', { x: 84, y: 230, size: 210 });
      S.l2 = line(S.cam, 'UN PROJET ?', { x: 84, y: 430, size: 210, accent: [1] });
      S.l2.words[1].style.color = ACC2;
      S.tag = tag(S.cam, 'Le client demande', 90, 700);
      // fenêtre de discussion (verre sombre) en 3D
      S.win = el('div', { class: 'abs', style: `left:80px;top:790px;width:920px;height:720px;border-radius:40px;` +
        `background:linear-gradient(160deg,#16244d 0%,#0c1533 55%,#0a1029 100%);border:1px solid rgba(150,180,255,.22);` +
        `box-shadow:0 60px 120px -30px rgba(0,0,0,.8), 0 0 80px -20px rgba(91,140,255,.45), inset 0 1px 0 rgba(255,255,255,.12);` +
        `transform-origin:50% 50%` }, S.cam);
      reg(S.win, { o: 0 });
      el('div', { class: 'abs', style: 'left:44px;top:40px;width:88px;height:88px;border-radius:50%;background:linear-gradient(135deg,#9db8ff,#4b6fff);' +
        'font:800 44px/88px UI;text-align:center;color:#071030' }, S.win, 'T');
      el('div', { class: 'abs', style: 'left:156px;top:44px;font:800 40px/1.1 UI;color:#f2f5ff' }, S.win, 'Teva');
      el('div', { class: 'abs', style: 'left:156px;top:94px;font:600 26px/1.1 UI;color:#93a0c7' }, S.win, 'Sorties en mer');
      el('div', { class: 'abs', style: 'left:44px;top:160px;width:832px;height:1px;background:rgba(150,180,255,.18)' }, S.win);
      S.b1 = el('div', { class: 'abs', style: 'left:44px;top:204px;width:700px;height:252px;padding:30px 34px;box-sizing:border-box;' +
        'border-radius:34px 34px 34px 10px;background:#1b2b5a;font:600 38px/1.32 UI;color:#f2f5ff;transform-origin:0 100%' }, S.win);
      S.t1 = el('span', {}, S.b1, '');
      S.c1 = el('span', { style: 'display:inline-block;width:4px;height:40px;margin-left:4px;vertical-align:-6px;background:#9db8ff' }, S.b1);
      reg(S.b1, { o: 0 }); reg(S.t1); reg(S.c1, { o: 0 });
      S.dots = el('div', { class: 'abs', style: 'right:44px;top:500px;width:130px;height:64px;border-radius:32px;background:rgba(91,140,255,.25);transform-origin:100% 100%' }, S.win);
      S.dd = [0, 1, 2].map((i) => reg(el('div', { class: 'abs', style: `left:${28 + i * 28}px;top:25px;width:14px;height:14px;border-radius:50%;background:#cfdcff` }, S.dots)));
      reg(S.dots, { o: 0 });
      S.b2 = el('div', { class: 'abs', style: 'right:44px;top:500px;padding:28px 36px;border-radius:34px 34px 10px 34px;white-space:nowrap;' +
        'background:linear-gradient(135deg,#7da0ff,#4a6dff);font:800 40px/1.2 UI;color:#fff;transform-origin:100% 100%;' +
        'box-shadow:0 18px 40px -12px rgba(91,140,255,.8)' }, S.win, 'C’est noté. Je m’en occupe.');
      reg(S.b2, { o: 0 });
    },
    run(t, b, S) {
      // caméra : légère poussée continue, puis vol vers le haut (flou de vitesse) qui passe le relais
      const fly = ease.expoIn(seg(t, 'whip1', 8.7));
      put(S.cam, { s: 1 + 0.05 * seg(t, 0, 8), y: -1700 * fly, filter: blur(26 * fly) });
      // l'accroche frappe dès l'image 0
      rise(t, S.l1, [-0.45, 0.25], null, { preset: 'heavy' });
      rise(t, S.l2, [0.8, 1.25], null, { preset: 'heavy' });
      popTag(t, S.tag, 'tag1');
      // la fenêtre arrive des profondeurs, penchée, et se pose (3D réelle)
      const p = spHit(t, 'chat', 'heavy'), dr = seg(t, 'chat', 8);
      put(S.win, { o: shown(p) * clamp(p * 1.6), filter: blur(14 * (1 - p)),
        css: { transform: css3d({ z: lerp(-1400, 0, p), y: 120 * (1 - p), rx: lerp(34, 9, p) - 3 * dr, ry: lerp(-42, -12, p) + 8 * dr, rz: lerp(-8, -1, p) }) } });
      // la demande de Teva s'écrit
      const pm = spHit(t, 'msg', 'snappy');
      put(S.b1, { o: shown(pm), s: 0.85 + 0.15 * pm });
      const n = type(t, S.t1, 'Bonjour Rai ! Je veux un site pour mes sorties en mer, avec réservation en ligne.', 'msg', 'msg_end');
      put(S.c1, { o: b >= beatOf('msg') && b < beatOf('reply') && (n < 80 || Math.floor(b * 2) % 2 === 0) ? 1 : 0 });
      // « Rai écrit… » puis la réponse
      const pd = spHit(t, 6.85, 'snappy') * (1 - sp(t, 7.15, 'snappy'));
      put(S.dots, { o: shown(pd) * pd, s: 0.7 + 0.3 * pd });
      S.dd.forEach((d, i) => put(d, { y: -8 * Math.max(0, Math.sin(t * 14 - i * 0.9)) }));
      const pr = spHit(t, 'reply', 'snappy');
      put(S.b2, { o: shown(pr), s: 0.7 + 0.3 * pr, filter: blur(6 * (1 - pr)) });
    },
  });

  // ===================================================================== 2. JE CONSTRUIS (8.0 → 17)
  const ITEMS = ['Design', 'Textes', 'Version mobile', 'Google', 'Réservation en ligne'];
  const CHK = ['chk1', 'chk2', 'chk3', 'chk4', 'chk5'];
  scene({
    name: 'build', from: 'build', to: 17.1, pre: 0.5,
    build(root, S) {
      S.cam = el('div', { class: 'abs', style: `width:${W}px;height:${H}px;transform-origin:540px 1000px` }, root); reg(S.cam);
      S.tag = tag(S.cam, 'Je construis', 90, 230);
      S.l1 = line(S.cam, 'SON SITE.', { x: 84, y: 300, size: 210 });
      S.l1.words[1].style.color = ACC2;
      S.list = el('div', { class: 'abs', style: 'left:90px;top:590px;width:900px;height:760px;transform-origin:50% 0' }, S.cam); reg(S.list);
      S.items = ITEMS.map((txt, i) => {
        const c = el('div', { class: 'abs', style: `left:0;top:${i * 136}px;width:900px;height:116px;border-radius:30px;` +
          'background:linear-gradient(100deg,#15224a,#0c1534);border:1px solid rgba(150,180,255,.18);' +
          'box-shadow:0 30px 60px -25px rgba(0,0,0,.9);transform-origin:0 50%' }, S.list);
        const ring = el('div', { class: 'abs', style: 'left:34px;top:30px;width:64px;height:64px;border-radius:50%;border:3px solid rgba(157,184,255,.45);box-sizing:border-box' }, c);
        const fill = el('div', { class: 'abs', style: 'left:34px;top:30px;width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#9db8ff,#4a6dff);' +
          'box-shadow:0 0 24px rgba(120,160,255,.9);transform-origin:50% 50%' }, c);
        const ck = el('div', { class: 'abs', style: 'left:34px;top:30px;width:64px;height:64px' }, c,
          '<svg viewBox="0 0 64 64" width="64" height="64"><path d="M19 33 L28 42 L46 23" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="44" stroke-dashoffset="44"/></svg>');
        el('div', { class: 'abs', style: 'left:128px;top:34px;font:800 46px/1.2 UI;color:#f2f5ff;white-space:nowrap' }, c, txt);
        const glow = el('div', { class: 'abs', style: 'left:0;top:0;width:900px;height:124px;border-radius:30px;border:2px solid rgba(157,184,255,.9);' +
          'box-shadow:0 0 40px rgba(91,140,255,.55), inset 0 0 30px rgba(91,140,255,.25)' }, c);
        reg(c, { o: 0 }); reg(fill, { o: 0 }); reg(glow, { o: 0 }); reg(ring);
        return { c, fill, path: ck.querySelector('path'), glow };
      });
      S.pct = el('div', { class: 'abs', style: 'left:0;top:1395px;width:1080px;text-align:center;font:900 italic 170px/1 Display;color:#f2f5ff;letter-spacing:-.01em' }, S.cam, '0 %');
      reg(S.pct, { o: 0 });
      S.bar = el('div', { class: 'abs', style: 'left:140px;top:1585px;width:800px;height:14px;border-radius:7px;background:rgba(150,180,255,.15)' }, S.cam); reg(S.bar, { o: 0 });
      S.fillbar = el('div', { class: 'abs', style: 'left:140px;top:1585px;width:800px;height:14px;border-radius:7px;background:linear-gradient(90deg,#4a6dff,#9db8ff);' +
        'box-shadow:0 0 20px rgba(120,160,255,.9);transform-origin:0 50%' }, S.cam); reg(S.fillbar, { o: 0 });
    },
    run(t, b, S) {
      // arrivée par le bas dans le flou du vol, puis plongée finale dans la liste (zoom flou)
      const inn = ease.expoOut(seg(t, 8, 8.9)), dive = ease.expoIn(seg(t, 'dive', 17.1));
      put(S.cam, { y: 1600 * (1 - inn), s: 1 + 4 * dive, filter: blur(22 * (1 - inn) + 30 * dive), o: 1 - clamp((dive - 0.75) * 4) });
      popTag(t, S.tag, 8.6);
      rise(t, S.l1, [8.8, 9.1], null, { preset: 'heavy' });
      // la liste flotte en 3D ; la caméra la longe en descendant
      const along = ease.inOut(seg(t, 9, 16));
      put(S.list, { css: { transform: css3d({ y: -120 * along, rx: 26 - 10 * along, rz: -7 + 4 * along, ry: 10 - 14 * along, p: 1500 }) } });
      S.items.forEach((it, i) => {
        const pin = spHit(t, 8.9 + i * 0.3, 'default');
        put(it.c, { o: shown(pin) * clamp(pin * 1.5), x: 160 * (1 - pin), filter: blur(10 * (1 - pin)) });
        const pc = spHit(t, CHK[i], 'snappy');
        put(it.fill, { o: shown(pc), s: 0.3 + 0.7 * pc });
        put(it.path, { css: { strokeDashoffset: (44 * (1 - clamp(sp(t, beatOf(CHK[i]) + 0.1, 'snappy')))).toFixed(2) } });
        const fl = pc * (1 - sp(t, beatOf(CHK[i]) + 0.8, 'default'));
        put(it.glow, { o: fl > 0.01 ? fl : 0 });
      });
      // compteur 0 → 100 %
      const pp = spHit(t, 9.2, 'snappy');
      put(S.pct, { o: shown(pp), y: 40 * (1 - pp), filter: blur(10 * (1 - pp)) });
      put(S.bar, { o: shown(pp) });
      const v = trk(t, [[0, 0], ['chk1', 20, 'default'], ['chk2', 40, 'default'], ['chk3', 60, 'default'], ['chk4', 80, 'default'], ['chk5', 92, 'default'], ['pct_done', 100, 'snappy']]);
      const val = Math.round(clamp(v, 0, 100));
      put(S.pct, { text: `${val} %`, css: { color: val >= 100 ? ACC2 : INK } });
      put(S.fillbar, { o: shown(pp) * (v > 0.5 ? 1 : 0), sx: clamp(v / 100, 0.001, 1) });
    },
  });

  // ===================================================================== 3. DEUX SEMAINES PLUS TARD · EN LIGNE (16.6 → 25.9)
  scene({
    name: 'online', from: 'later', to: 25.9, pre: 0.45,
    build(root, S) {
      S.cam = el('div', { class: 'abs', style: `width:${W}px;height:${H}px;transform-origin:700px 1180px` }, root); reg(S.cam);
      S.tag = tag(S.cam, '2 semaines plus tard', 90, 220);
      S.l1 = line(S.cam, 'VOTRE SITE', { x: 84, y: 300, size: 180 });
      S.l2 = line(S.cam, 'EST EN LIGNE.', { x: 84, y: 470, size: 180 });
      S.l2.words[2].style.color = ACC2;
      S.l3 = line(S.cam, 'ET IL EST', { x: 84, y: 300, size: 180 });
      S.l4 = line(S.cam, 'À VOUS.', { x: 84, y: 470, size: 180 });
      S.l4.words[1].style.color = ACC2;
      S.tag2 = tag(S.cam, 'Sans abonnement', 90, 680, { bg: '#f2f5ff' });
      // le site « Sorties Lagon » dans un navigateur (3D)
      S.site = el('div', { class: 'abs', style: 'left:60px;top:780px;width:900px;height:600px;border-radius:30px;overflow:hidden;background:#0b1430;' +
        'border:1px solid rgba(150,180,255,.25);box-shadow:0 60px 120px -30px rgba(0,0,0,.85), 0 0 90px -30px rgba(91,140,255,.5);transform-origin:50% 50%' }, S.cam);
      reg(S.site, { o: 0 });
      const bar = el('div', { class: 'abs', style: 'left:0;top:0;width:900px;height:58px;background:#111d40' }, S.site);
      ['#ff6b6b', '#ffd36b', '#6bdc8f'].forEach((c, i) => el('div', { class: 'abs', style: `left:${26 + i * 28}px;top:21px;width:16px;height:16px;border-radius:50%;background:${c};opacity:.8` }, bar));
      el('div', { class: 'abs', style: 'left:150px;top:12px;width:600px;height:34px;border-radius:17px;background:#0a142f;font:600 20px/34px UI;color:#93a0c7;text-align:center' }, bar, 'sorties-lagon.com');
      S.parts = [];
      const hero = el('div', { class: 'abs', style: 'left:0;top:58px;width:900px;height:390px;overflow:hidden;' +
        'background:linear-gradient(180deg,#1e3a8a 0%,#2f5bd8 45%,#7aa2ff 70%,#ffd9a0 100%)' }, S.site,
        '<svg viewBox="0 0 900 390" width="900" height="390"><circle cx="690" cy="210" r="70" fill="#ffe8b8" opacity=".9"/>' +
        '<path d="M0 260 Q 150 230 300 262 T 600 258 T 900 262 V390 H0Z" fill="#163a9c"/><path d="M0 300 Q 160 276 320 302 T 640 298 T 900 304 V390 H0Z" fill="#0f2a78"/>' +
        '<path d="M420 255 L520 255 L505 275 L435 275 Z M470 255 L470 205 L500 245 Z" fill="#f2f5ff" opacity=".9"/></svg>');
      S.parts.push(reg(hero, { o: 0 }));
      const nav = el('div', { class: 'abs', style: 'left:40px;top:84px;width:820px;height:40px;font:800 26px/40px UI;color:#fff' }, S.site,
        'Sorties Lagon<span style="float:right;font:600 22px/40px UI;opacity:.85">Excursions &nbsp; Galerie &nbsp; Contact</span>');
      S.parts.push(reg(nav, { o: 0 }));
      const h1 = el('div', { class: 'abs', style: 'left:40px;top:170px;font:900 italic 92px/0.95 Display;color:#fff;text-shadow:0 6px 30px rgba(0,20,80,.5)' }, S.site, 'SORTIES<br>EN MER');
      S.parts.push(reg(h1, { o: 0 }));
      const cta = el('div', { class: 'abs', style: 'left:40px;top:478px;padding:20px 40px;border-radius:999px;background:#f2f5ff;font:800 28px/1 UI;color:#0b1430' }, S.site, 'Réserver');
      S.parts.push(reg(cta, { o: 0 }));
      const cards = el('div', { class: 'abs', style: 'left:330px;top:470px;width:530px;height:100px' }, S.site,
        [0, 1, 2].map((i) => `<div style="position:absolute;left:${i * 180}px;top:0;width:160px;height:100px;border-radius:18px;background:linear-gradient(135deg,#1d2f66,#132147)"></div>`).join(''));
      S.parts.push(reg(cards, { o: 0 }));
      // téléphone devant
      S.phone = el('div', { class: 'abs', style: 'left:660px;top:1010px;width:340px;height:680px;border-radius:56px;background:#050914;' +
        'border:3px solid rgba(170,195,255,.35);box-shadow:0 50px 100px -20px rgba(0,0,0,.9), 0 0 60px -10px rgba(91,140,255,.55);overflow:hidden;transform-origin:50% 50%' }, S.cam,
        '<div style="position:absolute;left:14px;top:14px;width:306px;height:646px;border-radius:44px;overflow:hidden;background:#0b1430">' +
        '<div style="position:absolute;left:0;top:0;width:306px;height:360px;background:linear-gradient(180deg,#1e3a8a,#2f5bd8 55%,#7aa2ff 80%,#ffd9a0)"></div>' +
        '<div style="position:absolute;left:22px;top:60px;font:800 18px/1 UI;color:#fff">Sorties Lagon</div>' +
        '<div style="position:absolute;left:22px;top:150px;font:900 italic 56px/0.95 Display;color:#fff">SORTIES<br>EN MER</div>' +
        '<div style="position:absolute;left:22px;top:390px;width:262px;height:64px;border-radius:32px;background:#f2f5ff;font:800 22px/64px UI;color:#0b1430;text-align:center">Réserver</div>' +
        '<div style="position:absolute;left:22px;top:476px;width:262px;height:130px;border-radius:22px;background:linear-gradient(135deg,#1d2f66,#132147)"></div>' +
        '<div style="position:absolute;left:113px;top:12px;width:80px;height:22px;border-radius:11px;background:#050914"></div></div>');
      reg(S.phone, { o: 0 });
      // badge « En ligne »
      S.badge = el('div', { class: 'abs', style: 'left:90px;top:1420px;padding:20px 32px 20px 66px;border-radius:999px;background:#0f1a3a;' +
        'border:2px solid rgba(110,230,160,.7);font:800 34px/1 UI;color:#f2f5ff;box-shadow:0 0 40px -6px rgba(110,230,160,.55);transform-origin:0 50%' }, S.cam,
        '<span style="position:absolute;left:28px;top:21px;width:20px;height:20px;border-radius:50%;background:#6ee6a0;box-shadow:0 0 16px #6ee6a0"></span>En ligne');
      reg(S.badge, { o: 0 });
    },
    run(t, b, S) {
      // sort du zoom de la scène précédente (arrive grand et flou), puis poussée finale dans le téléphone
      const inn = ease.expoOut(seg(t, 16.55, 17.5)), push = ease.expoIn(seg(t, 'push', 25.9));
      put(S.cam, { s: lerp(2.4, 1, inn) + 2.6 * push, filter: blur(26 * (1 - inn) + 18 * push) });
      popTag(t, S.tag, 'later', 22.0);
      rise(t, S.l1, [19.3, 19.55], 22.1, { preset: 'heavy' });
      rise(t, S.l2, [19.8, 20.0, 20.2], 22.1, { preset: 'heavy' });
      rise(t, S.l3, ['avous', 22.75, 22.95], null, { preset: 'heavy' });
      rise(t, S.l4, [23.0, 23.2], null, { preset: 'heavy' });
      popTag(t, S.tag2, 'abo');
      // le site s'assemble en 3D, morceau par morceau
      const ps = spHit(t, 17.3, 'heavy'), dr = seg(t, 17.3, 25.9);
      put(S.site, { o: shown(ps) * clamp(ps * 1.5), filter: blur(12 * (1 - ps)),
        css: { transform: css3d({ z: lerp(-1200, 0, ps), rx: lerp(30, 8, ps) + 2 * dr, ry: lerp(40, 16, ps) - 6 * dr, rz: lerp(6, 1, ps) }) } });
      S.parts.forEach((e, i) => {
        const p = spHit(t, beatOf('site') + i * 0.3, 'default');
        put(e, { o: shown(p) * clamp(p * 1.4), y: 50 * (1 - p), filter: blur(10 * (1 - p)) });
      });
      // le téléphone glisse devant, penché
      const ph = spHit(t, 'phone', 'heavy');
      put(S.phone, { o: shown(ph), filter: blur(10 * (1 - ph)),
        css: { transform: css3d({ x: 420 * (1 - ph), z: lerp(-300, 120, ph), ry: lerp(-50, -16, ph) + 5 * dr, rx: 6, rz: lerp(-10, 3, ph) }) } });
      // badge « En ligne »
      const pb = spHit(t, 'online', 'snappy');
      put(S.badge, { o: shown(pb), s: 0.5 + 0.5 * pb, filter: blur(8 * (1 - pb)) });
    },
  });

  // ===================================================================== 4. FIN : logo RWD + WhatsApp (26 → 36)
  scene({
    name: 'end', from: 'end', to: 'done',
    build(root, S) {
      S.cam = el('div', { class: 'abs', style: `width:${W}px;height:${H}px;transform-origin:540px 900px` }, root); reg(S.cam);
      // monogramme RWD tracé à la main (traits arrondis)
      S.logo = el('div', { class: 'abs', style: 'left:240px;top:330px;width:600px;height:300px' }, S.cam,
        '<svg viewBox="0 0 300 150" width="600" height="300" style="overflow:visible;filter:drop-shadow(0 0 18px rgba(120,160,255,.75))">' +
        '<defs><linearGradient id="rwdg" x1="0" x2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#9db8ff"/></linearGradient></defs>' +
        '<g fill="none" stroke="url(#rwdg)" stroke-width="11" stroke-linecap="round" stroke-linejoin="round">' +
        '<path class="rw" d="M18 128 C 20 90, 16 50, 22 18 C 60 10, 92 26, 84 52 C 78 72, 50 76, 30 72 C 55 90, 72 110, 88 130"/>' +
        '<path class="rw" d="M106 22 C 112 60, 120 100, 128 128 C 136 96, 144 70, 152 52 C 160 74, 168 100, 176 128 C 184 92, 192 54, 200 20"/>' +
        '<path class="rw" d="M222 20 C 220 60, 224 100, 222 130 M222 20 C 300 14, 300 136, 222 130"/></g></svg>');
      S.paths = Array.from(S.logo.querySelectorAll('path.rw'));
      S.paths.forEach((p) => { p.setAttribute('pathLength', '100'); p.setAttribute('stroke-dasharray', '100'); p.setAttribute('stroke-dashoffset', '100'); reg(p); });
      reg(S.logo);
      S.name = center(S.cam, 'Rai Web Design', 670, 62, { ls: '.02em' });
      S.t1 = center(S.cam, 'VOTRE PROJET.', 820, 150, { font: 'Display', weight: '900 italic' });
      S.t2 = center(S.cam, 'JE LE CONSTRUIS.', 975, 150, { font: 'Display', weight: '900 italic', accent: [2] });
      S.btn = el('div', { class: 'abs', style: 'left:110px;top:1190px;width:860px;height:126px;border-radius:63px;overflow:hidden;' +
        'background:linear-gradient(135deg,#7da0ff,#4a6dff);box-shadow:0 24px 60px -16px rgba(91,140,255,.9), inset 0 1px 0 rgba(255,255,255,.35);' +
        'font:800 46px/126px UI;color:#fff;text-align:center;transform-origin:50% 50%' }, S.cam, 'Écrivez-moi sur WhatsApp');
      S.shine = el('div', { class: 'abs', style: 'left:0;top:0;width:160px;height:126px;background:linear-gradient(100deg,rgba(255,255,255,0),rgba(255,255,255,.45),rgba(255,255,255,0))' }, S.btn);
      reg(S.btn, { o: 0 }); reg(S.shine, { o: 0 });
      S.num = center(S.cam, '+689 89 37 48 86', 1360, 64);
      S.url = center(S.cam, 'raiweb.design', 1460, 44, { color: INK2, weight: 600, ls: '.04em' });
    },
    run(t, b, S) {
      put(S.cam, { s: 1 + 0.04 * ease.inOut(seg(t, 'end', 'done')) });
      // tracé du monogramme, trait après trait
      S.paths.forEach((p, i) => put(p, { css: { strokeDashoffset: (100 * (1 - ease.out(seg(t, 26.05 + i * 0.35, 26.75 + i * 0.35)))).toFixed(2) } }));
      const pl = spHit(t, 'end', 'heavy');
      put(S.logo, { s: 1.25 - 0.25 * pl, x: -75 * (1 - pl), y: -38 * (1 - pl) });
      riseWords(t, S.name, 'name', 0.12);
      riseWords(t, S.t1, 'tagline', 0.2, 'default');
      riseWords(t, S.t2, 28.1, 0.2, 'default');
      const pb = spHit(t, 'cta', 'snappy');
      put(S.btn, { o: shown(pb), s: 0.7 + 0.3 * pb, filter: blur(8 * (1 - pb)) });
      // un reflet traverse le bouton toutes les 2 secondes (tenue vivante)
      const k = b >= 29.6 ? ((b - 29.6) % 4) / 1.2 : -1;
      put(S.shine, { o: k >= 0 && k <= 1 ? 1 : 0, x: lerp(-180, 900, clamp(k)) });
      riseWords(t, S.num, 'num', 0.1);
      riseWords(t, S.url, 'url', 0.1);
    },
  });

  // ===================================================================== lumière : traits de vitesse et éclat final
  scene({
    name: 'fx', from: 0, to: 'done',
    build(root, S) {
      S.g = canvas(root);
      const r = mulberry32(42);
      S.streaks = Array.from({ length: 34 }, () => ({ x: r() * W, len: 300 + r() * 900, w: 1 + r() * 3, k: r(), a: r() * 6.2832 }));
    },
    run(t, b, S) {
      const g = S.g; g.clearRect(0, 0, W, H); g.globalCompositeOperation = 'lighter';
      // vol vers le haut (8 → 8.9) : traits verticaux
      const w1 = Math.sin(Math.PI * seg(t, 7.85, 8.95));
      if (w1 > 0.01) for (const s of S.streaks) {
        const y = H - ((seg(t, 7.85, 8.95) * 2600 + s.k * 1800) % 2600);
        const gr = g.createLinearGradient(0, y, 0, y + s.len);
        gr.addColorStop(0, 'rgba(160,190,255,0)'); gr.addColorStop(0.5, `rgba(190,210,255,${0.55 * w1})`); gr.addColorStop(1, 'rgba(160,190,255,0)');
        g.fillStyle = gr; g.fillRect(s.x, y, s.w, s.len);
      }
      // plongées (16 → 17.2 et 24.4 → 26) : traits qui partent du centre
      const dives = [[15.9, 17.25, 540, 1000], [24.4, 26.05, 830, 1340]];
      for (const [b0, b1, cx, cy] of dives) {
        const q = seg(t, b0, b1), w = Math.sin(Math.PI * q);
        if (w < 0.01) continue;
        for (const s of S.streaks) {
          const d0 = 80 + ((q * 1.6 + s.k) % 1) * 1300, d1 = d0 + s.len * (0.3 + q);
          const x0 = cx + Math.cos(s.a) * d0, y0 = cy + Math.sin(s.a) * d0, x1 = cx + Math.cos(s.a) * d1, y1 = cy + Math.sin(s.a) * d1;
          const gr = g.createLinearGradient(x0, y0, x1, y1);
          gr.addColorStop(0, 'rgba(170,200,255,0)'); gr.addColorStop(1, `rgba(200,220,255,${0.6 * w})`);
          g.strokeStyle = gr; g.lineWidth = s.w * 1.6; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke();
        }
      }
      // éclat de lumière qui couvre la coupe vers la fin (pic à 26.0)
      const f = seg(t, 25.4, 26.0), fo = 1 - seg(t, 26.0, 27.0);
      const fl = b < 26 ? ease.expoIn(f) : ease.out(fo);
      if (fl > 0.004) {
        const rr = 200 + 1800 * (b < 26 ? f : 1);
        const gr = g.createRadialGradient(540, 1100, 0, 540, 1100, rr);
        gr.addColorStop(0, `rgba(255,255,255,${fl})`); gr.addColorStop(0.35, `rgba(200,220,255,${0.95 * fl})`); gr.addColorStop(1, `rgba(91,140,255,${0.5 * fl})`);
        g.globalCompositeOperation = 'source-over'; g.fillStyle = gr; g.fillRect(0, 0, W, H);
      }
      g.globalCompositeOperation = 'source-over';
    },
  });

  C.start();
})();
