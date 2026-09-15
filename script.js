/* ============================================================
   RAI WEB DESIGN — script.js
   Vanilla JS · GSAP + ScrollTrigger + Lenis (CDN, optionnels)
   ============================================================ */
(() => {
'use strict';

/* ---------- CONFIG — À REMPLACER ---------- */
const CONFIG = {
  // Numéro WhatsApp au format international, sans "+" ni espaces. Ex : '68987123456'
  whatsapp: '68989374886',
  message : "Bonjour Rai, je souhaite créer un site web.",
  email   : 'rai.web.tahiti@gmail.com',
  // Rien à configurer : si les deux fichiers sont présents dans assets/video/
  // la vidéo est utilisée, sinon la scène CSS équivalente prend le relais.
  video   : { auto:true, hd:'assets/video/sequence-hd.mp4', sd:'assets/video/sequence-sd.mp4' },

  // Intro : durée totale en millisecondes. once:true = une seule fois par onglet.
  // Ouverture : durée totale en millisecondes (4800 = 4,8 s).
  intro   : { duration:4800, once:false },

  // Disponibilités affichées dans la section « offre ». À changer à la main :
  // month = le prochain créneau libre, taken = places déjà prises sur total.
  slots   : { monthFr:'Novembre 2026', monthEn:'November 2026', taken:2, total:3 },

  // force:true  -> les animations tournent même si le visiteur a activé
  //                « réduire les animations » sur son téléphone.
  // force:false -> le réglage système est respecté (recommandé pour l'accessibilité).
  motion  : { force:true }
};

/* ---------- UTILS ---------- */
const $  = (s,c=document) => c.querySelector(s);
const $$ = (s,c=document) => [...c.querySelectorAll(s)];
const clamp = (v,a,b) => Math.min(b,Math.max(a,v));
const lerp  = (a,b,t) => a+(b-a)*t;
const FORCE_MOTION = CONFIG.motion.force;
const reduced = FORCE_MOTION ? false : matchMedia('(prefers-reduced-motion: reduce)').matches;
if (FORCE_MOTION) document.documentElement.classList.add('force-motion');
const fine    = matchMedia('(hover:hover) and (pointer:fine)').matches;
const phone   = matchMedia('(max-width:699px)').matches;   // téléphone
const narrow  = matchMedia('(max-width:1024px)').matches;  // téléphone + tablette portrait
const coarse  = matchMedia('(pointer:coarse)').matches;    // écran tactile
const mobile  = phone;                                     // conservé pour la vidéo légère
const hasGSAP = () => typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
const debounce = (fn,ms=200) => { let t; return (...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),ms);}; };

/* ---------- 1. LIENS (WhatsApp / mail) ---------- */
function links(){
  const wa = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.message)}`;
  $$('[data-wa]').forEach(a => { a.href = wa; });
  $$('[data-mail]').forEach(a => { a.href = 'mailto:'+CONFIG.email; a.target=''; });
}

/* ---------- 2. SMOOTH SCROLL ---------- */
let lenis = null;
function smooth(){
  if (reduced || typeof window.Lenis === 'undefined') return;
  lenis = new Lenis({
    duration: 1.15,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10*t)),
    smoothWheel: true,
    syncTouch: false,
    touchMultiplier: 1.6,
    lerp: 0.1
  });
  if (hasGSAP()){
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t*1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
  // ancres
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = $(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      lenis.scrollTo(t, { offset:0, duration:1.3 });
    });
  });
}

/* ---------- 3. INTRO (logo animé) ---------- */
function intro(done){
  const box = $('#intro');
  if (!box) return done();
  const skip = $('#introSkip'), sheet = $('#introSheet');
  const seen = (() => { try { return sessionStorage.getItem('rwd-intro'); } catch(e){ return null; } })();

  const leave = () => {
    box.remove();
    document.documentElement.classList.remove('is-loading');
    try { sessionStorage.setItem('rwd-intro','1'); } catch(e){}
    done();
  };

  if ((CONFIG.intro.once && seen) || !hasGSAP()){
    box.remove(); document.documentElement.classList.remove('is-loading'); return done();
  }
  document.documentElement.classList.add('is-loading');

  const D = CONFIG.intro.duration / 1000;   // 4,8 s par défaut
  const edge = $('#introEdge');

  // Un seul geste : une ligne lumineuse traverse l'ecran et decouvre la feuille
  // claire derriere elle. Le nom est dans la feuille, donc il se decouvre avec.
  const wipe = { p:0 };
  const paint = () => {
    const p = wipe.p;
    sheet.style.clipPath = `inset(0 ${((1 - p) * 100).toFixed(3)}% 0 0)`;
    if (edge) gsap.set(edge, { x: p * innerWidth });
  };
  paint();

  const tl = gsap.timeline({ defaults:{ ease:'power2.out' }, onComplete: leave });
  tl.to('.intro__skip', { opacity:1, duration:.7 }, .5)
    // la ligne entre, puis emmene le balayage avec elle
    .to(edge, { opacity:1, duration:.35, ease:'sine.out' }, .08)
    .to(wipe, { p:1, duration:1.9, ease:'power3.inOut', onUpdate: paint }, .15)
    .to(edge, { opacity:0, duration:.5, ease:'sine.inOut' }, 2)
    // les deux lignes du nom montent juste derriere le bord
    .to('.intro__name .ln>span', { y:0, duration:1.4, stagger:.14, ease:'expo.out' }, .55)
    // respiration tres lente du nom pendant la tenue
    .fromTo('.intro__name', { scale:1.028 }, { scale:1, duration:3, ease:'sine.out' }, 1)
    .to('.intro__corner', { opacity:1, duration:.9, stagger:.13, ease:'power2.out' }, 2.15)
    .to('#introBar', { scaleX:1, duration: D - 1.6, ease:'power1.inOut' }, .4)
    // sortie : les libelles s'effacent, le nom part un peu plus vite que la feuille
    .to(['.intro__corner','.intro__bar'], { opacity:0, duration:.5, ease:'power2.in' }, D - 1.2)
    .to('.intro__name', { yPercent:-11, duration:1.1, ease:'expo.inOut' }, D - 1.1)
    .to(sheet, { yPercent:-100, duration:1.1, ease:'expo.inOut' }, D - 1.05)
    .to(box, { opacity:0, duration:.32, ease:'power2.out' }, D - .34);

  addEventListener('resize', paint, { passive:true });
  skip.addEventListener('click', () => { tl.pause(); gsap.to(box,{opacity:0,duration:.35,onComplete:leave}); });
  addEventListener('keydown', e => { if (e.key === 'Escape') skip.click(); }, { once:true });
}

/* ---------- 4. CURSEUR ---------- */
function cursor(){
  if (!fine || reduced) return;
  const dot = $('#cur'), ring = $('#curRing');
  if (!dot || !ring) return;
  document.body.classList.add('has-cur');
  dot.style.opacity = ring.style.opacity = '1';

  let mx=innerWidth/2, my=innerHeight/2, rx=mx, ry=my, on=false;
  addEventListener('pointermove', e => {
    mx=e.clientX; my=e.clientY;
    if(!on){on=true;rx=mx;ry=my;}
    dot.style.transform = `translate3d(${mx}px,${my}px,0)`;
  }, {passive:true});

  const raf = () => { rx=lerp(rx,mx,.16); ry=lerp(ry,my,.16);
    ring.style.transform = `translate3d(${rx}px,${ry}px,0)`; requestAnimationFrame(raf); };
  requestAnimationFrame(raf);

  $$('a,button,.card,.wrow').forEach(el=>{
    const view = el.classList.contains('wrow');
    el.addEventListener('pointerenter',()=>document.body.classList.add(view?'cur-view':'cur-hov'));
    el.addEventListener('pointerleave',()=>document.body.classList.remove('cur-view','cur-hov'));
  });
}

/* ---------- 5. HERO ---------- */
function hero(){
  const lines = $$('.hero__title .ln > span');
  const rest  = $$('.hero .reveal-up');
  const kin   = $('.kin i');
  if (!hasGSAP() || reduced){
    lines.forEach(l=>l.style.transform='none');
    rest.forEach(r=>{r.style.opacity='1';r.style.transform='none';});
    if(kin) kin.style.transform='scaleX(1)';
    return;
  }
  gsap.timeline({ defaults:{ ease:'expo.out' }})
    .to(lines,{ y:0, duration:1.15, stagger:.09 })
    .to(kin,{ scaleX:1, duration:.9, ease:'expo.inOut' },'-=.5')
    .to(rest,{ opacity:1, y:0, duration:.9, stagger:.07 },'-=.85');
}

/* ---------- 6. CINEMA (scrub) ---------- */
function cinema(){
  const stage = $('#cineStage'), vid = $('#cineVideo'), fb = $('#cineFb');
  const beats = $$('.beat');
  if (!stage) return;

  // embers du fallback
  const wrapE = $('#fbEmbers');
  if (wrapE && !reduced){
    const n = phone ? 22 : narrow ? 34 : 46;
    for (let i=0;i<n;i++){
      const b = document.createElement('b');
      b.style.left = (Math.random()*100).toFixed(2)+'%';
      b.style.top  = (Math.random()*100).toFixed(2)+'%';
      b.dataset.sp = (0.4+Math.random()*1.3).toFixed(2);
      b.dataset.dx = (Math.random()*2-1).toFixed(2);
      wrapE.appendChild(b);
    }
  }
  const embers = $$('b', wrapE || document.createElement('i'));

  // vidéo optionnelle
  let useVideo = false;

  // On vérifie d'abord que le fichier est là : sans ça, un 404 apparaît dans la
  // console de chaque visiteur tant que la vidéo n'est pas déposée.
  const attachVideo = async () => {
    const src = mobile ? CONFIG.video.sd : CONFIG.video.hd;
    try {
      const head = await fetch(src, { method:'HEAD' });
      if (!head.ok) return;
    } catch(e){ return; }

    const el = document.createElement('source');
    el.src = src; el.type = 'video/mp4';
    vid.appendChild(el);
    vid.preload = 'auto';
    vid.load();

    vid.addEventListener('loadedmetadata', ()=>{
      useVideo = true; stage.classList.add('has-video');
      // Un fichier sans index de navigation ne peut pas être parcouru : le scrub
      // afficherait une image figée. On repasse alors sur la scène CSS.
      setTimeout(()=>{
        const ok = vid.seekable.length && vid.seekable.end(vid.seekable.length-1) > 0.5;
        if (!ok){
          useVideo = false;
          stage.classList.remove('has-video');
          render(ScrollTrigger.getAll().find(t => t.pin && t.trigger === stage.parentElement)?.progress || 0);
        }
      }, 1200);
    }, { once:true });

    vid.addEventListener('error', ()=>{
      useVideo = false; stage.classList.remove('has-video');
    }, { once:true });

    // Safari refuse de décoder avant une première lecture : on la déclenche au
    // premier geste du visiteur, puis on remet en pause aussitôt.
    const unlock = () => { vid.play().then(()=>vid.pause()).catch(()=>{}); };
    addEventListener('touchstart', unlock, { once:true, passive:true });
    addEventListener('click', unlock, { once:true });
  };
  if (CONFIG.video.auto && vid) attachVideo();

  // rendu d'un état de progression p ∈ [0,1]
  const seed = $('.fb__seed'), grid = $('.fb__grid'),
        panels = $('.fb__panels'), horizon = $('.fb__horizon');
  const panelEls = $$('.fb__panels i');

  const render = p => {
    // --- beats ---
    beats.forEach((b,i)=>{
      const a = i*0.345, mid = a+0.10, end = a+0.30;
      let o = 0;
      if (p>a && p<end) o = p<mid ? (p-a)/(mid-a) : 1-(p-mid)/(end-mid);
      b.style.opacity = clamp(o,0,1).toFixed(3);
      b.style.transform = `translateY(${((1-clamp(o,0,1))*26).toFixed(1)}px)`;
    });

    if (useVideo) return;

    // --- scène 1 : le néant (0 → .34) ---
    const p1 = clamp(p/0.34, 0, 1);
    if (seed){
      seed.style.transform = `translate(-50%,-50%) scaleX(${(1-p1*0.72).toFixed(3)}) scaleY(${(1+p1*10).toFixed(2)})`;
      seed.style.opacity = (1 - clamp((p-0.26)/0.12,0,1)).toFixed(3);
    }
    if (grid) grid.style.opacity = (clamp((p-0.14)/0.22,0,1)*0.9).toFixed(3);
    embers.forEach((b,i)=>{
      const sp = +b.dataset.sp, dx = +b.dataset.dx;
      b.style.opacity = (clamp(p1*1.4,0,1) * (1-clamp((p-0.42)/0.18,0,1))).toFixed(3);
      b.style.transform = `translate3d(${(dx*p*70).toFixed(1)}px,${(-p*260*sp).toFixed(1)}px,0)`;
    });

    // --- scène 2 : la construction (.30 → .66) ---
    const p2 = clamp((p-0.28)/0.38, 0, 1);
    if (grid){
      const z = 1 + p2*1.9;
      grid.style.transform = `scale(${z.toFixed(3)}) rotateX(0deg)`;
      if (p>0.62) grid.style.opacity = (0.9*(1-clamp((p-0.62)/0.12,0,1))).toFixed(3);
    }

    // --- scène 3 : la mise en lumière (.60 → 1) ---
    const p3 = clamp((p-0.58)/0.42, 0, 1);
    if (panels){
      panels.style.opacity = (p3*0.82).toFixed(3);
      panels.style.transform = `translate(-50%,-50%) scale(${(0.78+p3*0.24).toFixed(3)})`;
    }
    panelEls.forEach((el,i)=>{
      const d = (i%3-1), r = Math.floor(i/3)-1;
      const k = clamp(p3*1.25 - i*0.035, 0, 1);
      el.style.opacity = k.toFixed(3);
      el.style.transform = `translate3d(${(d*120*(1-k)).toFixed(1)}px,${(r*80*(1-k)).toFixed(1)}px,0) scale(${(0.86+k*0.14).toFixed(3)})`;
    });
    if (horizon) horizon.style.opacity = clamp((p-0.78)/0.22,0,1).toFixed(3);
  };

  if (!hasGSAP() || reduced){ render(0.5); beats.forEach(b=>b.style.opacity='1'); return; }

  const state = { t:0 };
  ScrollTrigger.create({
    trigger: stage.parentElement,
    start: 'top top',
    end: () => '+=' + (innerHeight * (phone ? 1.9 : narrow ? 2.3 : 3.2)),
    pin: stage,
    pinSpacing: true,
    scrub: 0.6,
    invalidateOnRefresh: true,
    onUpdate(self){
      const p = self.progress;
      render(p);
      if (useVideo && vid.duration) state.t = p * vid.duration;
    }
  });

  gsap.ticker.add(()=>{
    if (!useVideo || !vid.duration) return;
    if (Math.abs(vid.currentTime - state.t) > 0.016) vid.currentTime = state.t;
  });

  render(0);
}

/* déclenche fn une seule fois : à l'entrée, ou tout de suite si la section
   est déjà passée (rechargement en milieu de page, arrivée par une ancre) */
function onceInView(trigger, start, fn){
  let fired = false;
  const run = () => { if (!fired){ fired = true; fn(); } };
  ScrollTrigger.create({
    trigger, start,
    onEnter: run,
    onRefresh(self){ if (self.progress > 0) run(); }
  });
}

/* ---------- 7. STATS ---------- */
function stats(){
  const cells = $$('.stat');
  const show = () => cells.forEach(c=>{c.style.opacity='1';c.style.transform='none';
    const n=$('.stat__n',c); n.innerHTML = fmt(n.dataset.to, n.dataset);});
  const fmt = (v,d) => (d.pad ? String(v).padStart(+d.pad,'0') : v) + (d.suf ? `<sup>${d.suf}</sup>` : '');

  if (!hasGSAP() || reduced){ show(); return; }

  onceInView('#stats', 'top 82%', () => {
    gsap.to(cells,{ opacity:1, y:0, duration:.9, stagger:.08, ease:'expo.out' });
    cells.forEach(c=>{
      const n = $('.stat__n',c), to = +n.dataset.to, o = { v:0 };
      gsap.to(o,{ v:to, duration:1.7, ease:'power3.out',
        onUpdate(){ n.innerHTML = fmt(Math.round(o.v), n.dataset); }});
    });
  });
  // parallaxe latérale
  gsap.fromTo('.stats__row',{ xPercent:1.4 },{ xPercent:-1.4, ease:'none',
    scrollTrigger:{ trigger:'#stats', start:'top bottom', end:'bottom top', scrub:true }});
}

/* ---------- 8. MISSION — split mot par mot ---------- */
function mission(){
  const el = $('[data-split]');
  if (!el) return;
  const raw = (el.dataset.raw || el.textContent).trim();
  el.dataset.raw = raw;
  el.setAttribute('aria-label', raw);
  const hot = (el.dataset.hot||'').split('|').filter(Boolean).map(s=>s.toLowerCase());
  const norm = w => w.toLowerCase().replace(/[^a-zà-ÿ]/g,'');

  el.innerHTML = raw.split(/\s+/).filter(Boolean).map(w =>
    `<w${hot.includes(norm(w))?' class="hot"':''}>${w}</w> `
  ).join('');

  const words = $$('w', el);
  if (!hasGSAP() || reduced){ words.forEach(w=>w.classList.add('on')); return; }

  ScrollTrigger.getAll().forEach(t => { if (t.trigger === el) t.kill(); });
  ScrollTrigger.create({
    trigger: el, start:'top 78%', end:'bottom 45%', scrub:.4,
    onLeave(){ words.forEach(w => w.classList.add('on')); },
    onUpdate(self){
      if (self.progress > .97){ words.forEach(w => w.classList.add('on')); return; }
      const k = self.progress * words.length * 1.12;
      words.forEach((w,i)=> w.classList.toggle('on', i < k));
    }
  });
  gsap.to('.mission__sig',{ opacity:1, y:0, duration:.9, ease:'expo.out',
    scrollTrigger:{ trigger:'.mission__sig', start:'top 90%', once:true }});
}

/* ---------- 9. PILLARS ---------- */
function pillars(){
  const grid = $('#pillars'); if (!grid) return;
  const cards = $$('.card', grid);

  if (!hasGSAP() || reduced){ cards.forEach(c=>{c.style.opacity='1';c.style.transform='none';}); }
  else gsap.to(cards,{ opacity:1, y:0, duration:1, stagger:.12, ease:'expo.out',
        scrollTrigger:{ trigger:grid, start:'top 80%', once:true }});

  if (!fine) return;
  cards.forEach(c=>{
    c.addEventListener('pointerenter',()=>{ grid.classList.add('dim'); cards.forEach(x=>x.classList.toggle('act',x===c)); });
  });
  grid.addEventListener('pointerleave',()=>{ grid.classList.remove('dim'); cards.forEach(x=>x.classList.remove('act')); });
}

/* ---------- 10. STORY ---------- */
function story(){
  const pin = $('#storyPin'), track = $('#storyTrack'), rail = $('#storyRail');
  const chs = $$('.ch');
  if (!pin || !track) return;

  const flat = () => {
    chs.forEach(c => c.classList.add('act'));
    if (rail) rail.style.transform = 'scaleX(1)';
  };

  if (!hasGSAP() || reduced){ flat(); return; }

  const dist = () => Math.max(0, track.scrollWidth - innerWidth
                                 + parseFloat(getComputedStyle(track).paddingLeft));

  // gsap.matchMedia crée le pin au-dessus de 1025px et le démonte en dessous.
  // C'est ce qui fait que la rotation d'un iPad bascule proprement entre la
  // timeline horizontale et la version verticale, sans rechargement.
  const mm = gsap.matchMedia();

  mm.add('(min-width:1025px)', () => {
    track.style.transform = '';
    const tl = gsap.timeline({
      scrollTrigger:{
        trigger:'#story', start:'top top',
        end: () => '+=' + (dist() + innerHeight * 0.5),
        pin: pin, scrub:1, invalidateOnRefresh:true,
        onUpdate(self){
          if (rail) rail.style.transform = `scaleX(${self.progress})`;
          const c = innerWidth / 2;
          chs.forEach(ch => { const r = ch.getBoundingClientRect();
            ch.classList.toggle('act', r.left < c && r.right > c * 0.35); });
        }
      }
    });
    tl.to(track, { x: () => -dist(), ease:'none' });
    return () => { track.style.transform = ''; chs.forEach(c=>c.classList.remove('act')); };
  });

  mm.add('(max-width:1024px)', () => {
    track.style.transform = '';
    flat();
    return () => { chs.forEach(c=>c.classList.remove('act')); };
  });
}

/* ---------- 11. OFFER ---------- */
function offer(){
  const items = $$('#chk li');
  if (!items.length) return;
  if (!hasGSAP() || reduced){
    items.forEach(i=>{i.style.opacity='1';i.style.transform='none';$('svg path',i)&&($('svg',i).style.strokeDashoffset='0');});
    return;
  }
  onceInView('#chk', 'top 82%', () => {
    gsap.to(items,{ opacity:1, y:0, duration:.7, stagger:.055, ease:'expo.out' });
    gsap.to('#chk svg',{ strokeDashoffset:0, duration:.6, stagger:.055, ease:'power2.out', delay:.12 });
  });
  gsap.utils.toArray('.offer .h1, .offer .btn').forEach(el=>{
    gsap.fromTo(el,{opacity:0,y:28},{opacity:1,y:0,duration:.9,ease:'expo.out',
      scrollTrigger:{trigger:el,start:'top 88%',once:true}});
  });
}

/* ---------- 12. WORK ---------- */
function work(){
  const list = $('#wlist');
  const rows = $$('.wrow', list || document.createElement('i'));
  if (!rows.length) return;

  if (!hasGSAP() || reduced) rows.forEach(r=>r.style.opacity='1');
  else gsap.to(rows,{ opacity:1, duration:.8, stagger:.09, ease:'expo.out',
        scrollTrigger:{ trigger:list, start:'top 82%', once:true }});

  if (!fine) return;
  // la ligne survolee passe devant, les autres s'effacent
  rows.forEach(r=>{
    r.addEventListener('pointerenter',()=>{
      list.classList.add('dim'); rows.forEach(x=>x.classList.toggle('act',x===r));
    });
  });
  list.addEventListener('pointerleave',()=>{
    list.classList.remove('dim'); rows.forEach(x=>x.classList.remove('act'));
  });
}

function finalCta(){
  const lines = $$('.fin__t .ln > span'), rest = $$('.fin .reveal-up'), mag = $('#mag');
  if (!hasGSAP() || reduced){
    lines.forEach(l=>l.style.transform='none');
    rest.forEach(r=>{r.style.opacity='1';r.style.transform='none';});
  } else {
    gsap.timeline({ scrollTrigger:{ trigger:'.fin', start:'top 62%', once:true }, defaults:{ease:'expo.out'} })
      .to(lines,{ y:0, duration:1.1, stagger:.1 })
      .to(rest,{ opacity:1, y:0, duration:.85, stagger:.08 },'-=.7');
  }

  magnetize(mag, { x:.35, y:.5, maxX:46, maxY:26 });
}

/* aimante un élément vers le curseur, puis le laisse revenir */
function magnetize(el, o){
  if (!el || !fine) return;
  let mx=0, my=0, cx=0, cy=0, near=false;
  el.addEventListener('pointerenter', ()=> near = true);
  el.addEventListener('pointerleave', ()=>{ near = false; mx = my = 0; });
  el.addEventListener('pointermove', e => {
    const r = el.getBoundingClientRect();
    mx = clamp((e.clientX - (r.left + r.width/2)) * o.x, -o.maxX, o.maxX);
    my = clamp((e.clientY - (r.top  + r.height/2)) * o.y, -o.maxY, o.maxY);
  });
  const raf = () => {
    cx = lerp(cx, near ? mx : 0, .18);
    cy = lerp(cy, near ? my : 0, .18);
    el.style.transform = `translate3d(${cx.toFixed(2)}px,${cy.toFixed(2)}px,0)`;
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}

/* ---------- 14. PROGRESS + FAB + REVEALS GLOBAUX ---------- */
function chrome(){
  const bar = $('#progBar'), fab = $('#fab');
  const onScroll = () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    const p = h > 0 ? clamp(scrollY / h, 0, 1) : 0;
    if (bar) bar.style.transform = `scaleY(${p})`;
    const nearEnd = scrollY + innerHeight > document.documentElement.scrollHeight - 240;
    if (fab) fab.classList.toggle('is-on', scrollY > innerHeight*0.85 && !nearEnd);
  };
  addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // reveals génériques restants
  const rest = $$('.reveal-up').filter(e=>!e.closest('.hero,.fin'));
  if (!hasGSAP() || reduced){ rest.forEach(r=>{r.style.opacity='1';r.style.transform='none';}); }
  else rest.forEach(el=>gsap.to(el,{opacity:1,y:0,duration:.9,ease:'expo.out',
        scrollTrigger:{trigger:el,start:'top 88%',once:true}}));

  // titres de section
  if (hasGSAP() && !reduced){
    gsap.utils.toArray('.pillars .h1, .work .h1').forEach(el=>{
      gsap.fromTo(el,{opacity:0,y:34},{opacity:1,y:0,duration:1,ease:'expo.out',
        scrollTrigger:{trigger:el,start:'top 86%',once:true}});
    });
  }

  // logotype footer révélé au curseur
  const mark = $('#ftMark');
  if (mark && fine && !reduced){
    mark.addEventListener('pointermove', e=>{
      const r = mark.getBoundingClientRect();
      mark.style.setProperty('--mx', (e.clientX-r.left)+'px');
      mark.style.setProperty('--my', (e.clientY-r.top)+'px');
    });
  }
}

/* ---------- 15. BANDEAU DEFILANT ---------- */
function ticker(){
  const track = $('#ticker');
  if (!track) return;
  const build = () => {
    const words = (I18N_TICKER[document.documentElement.lang] || I18N_TICKER.fr);
    const seq = words.map(w => `<b>${w}</b><i></i>`).join('');
    // deux exemplaires : l'animation translate de -50%, la boucle est invisible
    track.innerHTML = `<span class="ticker__seq">${seq}</span><span class="ticker__seq">${seq}</span>`;
  };
  build();
  track.dataset.build = '1';
  window.__rebuildTicker = build;
}
const I18N_TICKER = {
  fr: ['Création de site web','Modernisation','Hébergement géré','Livré en 2 semaines',
       'Une seule personne','Tahiti · clients partout'],
  en: ['Website creation','Modernisation','Managed hosting','Delivered in 2 weeks',
       'One person, start to finish','Tahiti · clients everywhere']
};

/* ---------- 16. HEURE LOCALE DE TAHITI ---------- */
function clock(){
  const els = $$('#clock, #menuClock');
  if (!els.length) return;
  const tick = () => {
    // Tahiti est à UTC-10 toute l'année, sans heure d'été.
    const d = new Date(Date.now() - 10 * 3600 * 1000);
    const t = String(d.getUTCHours()).padStart(2,'0') + ':' +
              String(d.getUTCMinutes()).padStart(2,'0');
    els.forEach(el => el.textContent = t);
  };
  tick();
  setInterval(tick, 20000);
}

/* ---------- 15 bis. AUDIT GRATUIT ---------- */
function audit(){
  const form = $('#auditForm'), field = $('#auditUrl'), box = $('#audit');
  if (!form || !field) return;

  // On accepte tout ce qu'un client peut taper : monsite.pf, www.monsite.pf,
  // https://monsite.pf/contact. On ne garde que le domaine et le chemin.
  const clean = raw => raw.trim().toLowerCase()
    .replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\s+/g, '').replace(/\/+$/, '');
  const looksLikeSite = v => /^[a-z0-9][a-z0-9.-]*\.[a-z]{2,}(\/.*)?$/.test(v);

  const bad = () => {
    box.classList.remove('is-bad');
    void box.offsetWidth;            // relance l'animation
    box.classList.add('is-bad');
    field.focus();
  };

  form.addEventListener('submit', e => {
    e.preventDefault();
    const site = clean(field.value);
    if (!looksLikeSite(site)) return bad();
    box.classList.remove('is-bad');
    const en = document.documentElement.lang === 'en';
    const msg = en
      ? `Hi Rai, could you take a look at my site ${site} and tell me what you would change?`
      : `Bonjour Rai, pouvez-vous regarder mon site ${site} et me dire ce que vous changeriez ?`;
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });
  field.addEventListener('input', () => box.classList.remove('is-bad'));
}

/* ---------- 15 ter. DISPONIBILITES ---------- */
function slots(){
  const box = $('#slots'), month = $('#slotsMonth'), count = $('#slotsCount'), fill = $('#slotsFill');
  if (!box || !month) return;
  const c = CONFIG.slots, en = document.documentElement.lang === 'en';
  const taken = clamp(c.taken, 0, c.total), left = c.total - taken;

  month.textContent = en ? c.monthEn : c.monthFr;
  count.textContent = en
    ? `${taken} of ${c.total} slots already taken`
    : `${taken} place${taken > 1 ? 's' : ''} sur ${c.total} déjà prise${taken > 1 ? 's' : ''}`;
  box.setAttribute('aria-label', en
    ? `Next slot ${c.monthEn}, ${left} of ${c.total} still free`
    : `Prochain créneau ${c.monthFr}, ${left} place${left > 1 ? 's' : ''} encore libre${left > 1 ? 's' : ''}`);

  const ratio = taken / c.total;
  if (!hasGSAP() || reduced){ fill.style.transform = `scaleX(${ratio})`; return; }
  onceInView('#slots', 'top 90%', () => {
    gsap.to(fill, { scaleX:ratio, duration:1.2, ease:'expo.out' });
  });
}

/* ---------- 15 quater. DEROULE EN 5 ETAPES ---------- */
function steps(){
  const items = $$('.step');
  if (!items.length) return;
  if (!hasGSAP() || reduced){ items.forEach(i => { i.style.opacity='1'; i.style.transform='none'; }); return; }
  onceInView('#stepsList', 'top 85%', () => {
    gsap.to(items, { opacity:1, y:0, duration:.85, stagger:.1, ease:'expo.out' });
  });
}

/* ---------- 16 bis. MENU PLEIN ECRAN ---------- */
function menu(){
  const btn = $('#menuBtn'), panel = $('#menu');
  if (!btn || !panel) return;
  const root = document.documentElement;
  let timer = null;

  const open = () => {
    clearTimeout(timer);
    panel.hidden = false;
    requestAnimationFrame(() => root.classList.add('menu-open'));
    btn.setAttribute('aria-expanded','true');
    if (lenis) lenis.stop(); else document.body.style.overflow = 'hidden';
  };
  const close = () => {
    root.classList.remove('menu-open');
    btn.setAttribute('aria-expanded','false');
    if (lenis) lenis.start(); else document.body.style.overflow = '';
    timer = setTimeout(() => { panel.hidden = true; }, 800);
  };
  const isOpen = () => root.classList.contains('menu-open');

  btn.addEventListener('click', () => isOpen() ? close() : open());

  // un lien ferme le rideau puis emmene a la section
  $$('.menu__nav a', panel).forEach(a => {
    a.addEventListener('click', e => {
      const t = $(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      close();
      setTimeout(() => {
        if (lenis) lenis.scrollTo(t, { offset:0, duration:1.2, force:true });
        else t.scrollIntoView({ behavior:'smooth', block:'start' });
      }, 140);
    });
  });
  $$('.menu__foot a', panel).forEach(a => a.addEventListener('click', close));
  addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen()) close(); });
}

/* ---------- 16 ter. LOGOTYPE DU PIED DE PAGE ---------- */
function footMark(){
  const box = $('#ftMark'), type = $('#ftType'), deep = $('.ftl--deep');
  if (!box || !type || !deep) return;

  // On mesure le mot a une taille de reference, puis on calcule la taille exacte
  // qui remplit la largeur disponible. Aucun debordement possible, quel que soit
  // l'ecran ou la police de repli utilisee le temps qu'Anton arrive.
  const fit = () => {
    const cs = getComputedStyle(box);
    const avail = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    if (avail <= 0) return;
    type.style.fontSize = '100px';
    const w = deep.getBoundingClientRect().width;
    if (!w) return;
    type.style.fontSize = (100 * avail / w).toFixed(2) + 'px';
  };

  fit();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  addEventListener('resize', debounce(fit, 160), { passive:true });
}

/* ---------- 17. FIORITURES ---------- */
function flourish(){
  // la bannière descend une fois le chargement terminé, puis se densifie au défilement
  const topbar = $('#topbar');
  if (topbar){
    requestAnimationFrame(() => setTimeout(() => topbar.classList.add('is-on'), 120));
    const on = () => topbar.classList.toggle('is-scrolled', scrollY > 40);
    addEventListener('scroll', on, { passive:true }); on();
  }

  if (!hasGSAP() || reduced) return;

  // le hero se retire en douceur quand on quitte le haut de page
  gsap.to('.hero__wrap', {
    yPercent:-12, opacity:.25, ease:'none',
    scrollTrigger:{ trigger:'.hero', start:'top top', end:'bottom top', scrub:.6 }
  });

  // aimantation des deux appels à l'action du hero
  $$('.hero__cta .btn').forEach(b => magnetize(b, { x:.22, y:.34, maxX:16, maxY:10 }));

  // La page s'incline légèrement avec la vitesse de défilement.
  // Volontairement appliqué section par section : un transform sur un ancêtre
  // d'un élément épinglé casse le position:fixed de ScrollTrigger, ce qui
  // gèle la séquence cinéma et la timeline. #cine et #story sont donc exclus.
  // Sur tactile, réécrire le transform de sept grandes sections à chaque image
  // pendant un défilement natif provoque des repaints coûteux et un ressenti
  // saccadé, en particulier sur iPad. L'effet reste réservé à la souris.
  const tilt = coarse ? [] : $$('#stats, #mission, #services, #offer, #work, #contact, .ft');
  if (tilt.length){
    let prev = scrollY, sk = 0, tgt = 0;
    addEventListener('scroll', () => {
      tgt = clamp((scrollY - prev) * 0.10, -3, 3); prev = scrollY;
    }, { passive:true });
    const raf = () => {
      sk = lerp(sk, tgt, .1); tgt = lerp(tgt, 0, .08);
      const v = Math.abs(sk) < .02 ? '' : `skewY(${sk.toFixed(3)}deg)`;
      tilt.forEach(el => { el.style.transform = v; });
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }
}

/* ---------- 18. RESIZE ---------- */
function resizing(){
  if (!hasGSAP()) return;
  // limitCallbacks est volontairement absent : il supprime les callbacks quand le
  // scroll saute par-dessus un déclencheur, ce qui laissait les compteurs à zéro et
  // la checklist invisible après un rechargement en milieu de page ou une ancre.
  ScrollTrigger.config({ ignoreMobileResize:true });
  addEventListener('resize', debounce(()=>ScrollTrigger.refresh(), 220));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(()=>ScrollTrigger.refresh());
}

/* ============================================================
   I18N — FR (par défaut, dans le HTML) / EN
   ============================================================ */
const I18N = {
  en: {
    'skip':'Skip to content',
    'fab':'Let’s talk',
    'cur.view':'View',
    'intro.manifesto':'One person, from the first sketch to launch.',
      'intro.c1':'Independent web studio','intro.c2':'French Polynesia','intro.c3':'Opening','intro.c4':'One person, start to finish',
    'ft.avail':'available',
    'hero.eyebrow':'Independent web studio · Tahiti · since 2026',
    'menu.open':'Menu','menu.close':'Close','menu.label':'Navigation',
    'menu.n1':'My mission','menu.n2':'What I do','menu.n3':'The offer','menu.n4':'How it works','menu.n5':'Work','menu.n6':'Contact',
    'top.call':'Request a call',
    'hero.l1':'My name is Rai.',
    'hero.l2':'I design, I code',
    'hero.l3':'and I ship',
    'hero.l4':'websites that <em class="kin">hold up<i></i></em>',
    'hero.sub':'A one person studio in Tahiti. You talk to the person who writes the code, from the first sketch to launch.',
    'hero.cta1':'Start my project',
    'hero.cta2':'See my work',
    'hero.scroll':'Scroll',

    'beat.1a':'An invisible site','beat.1b':'is no use.',
    'beat.2a':'I design. I build.','beat.2b':'I put it online.',
    'beat.3a':'And it brings you','beat.3b':'customers.',

    'stat.1t':'Sites delivered','stat.1s':'more in production',
    'stat.2t':'Client satisfaction','stat.2s':'no exceptions',
    'stat.3t':'Weeks','stat.3s':'average delivery time',
    'stat.4t':'Speed score','stat.4s':'measured on every site',

    'mission.label':'01 / My mission',
    'mission.txt':"Plenty of good businesses stay invisible online. I build the site that makes them visible, brings them customers, and that they are proud to show.",
    'mission.hot':'invisible|visible|customers|proud',
    'mission.role':'founder',

    'pillars.label':'02 / What I do <i>(3)</i>',
    'pillars.h':'Three ways<br>to make you<br>visible.',
    'p1.t':'Website<br>creation',
    'p1.d':'A complete site, designed and coded for you. Design, development, launch. Built to bring you customers, not just to look good.',
    'p2.t':'Modernising<br>an existing site',
    'p2.d':'Your site exists but it has aged. I bring it back up to standard: the design, the speed, how it looks on a phone. Without starting over.',
    'p3.t':'Hosting<br>&amp; upkeep',
    'p3.d':'I put your site online and host it. Changes are billed by the work they take. Nothing locked in, nothing hidden.',

    'story.label':'03 / The story',
    'ch1.k':'High school',
    'ch1.t':'I’ve been coding since high school. Not a career switch, not a crash course. Years of taking things apart to understand how they work.',
    'ch2.k':'Tahiti',
    'ch2.t':'Based in Tahiti, I work with clients all over the world. Distance changes nothing: it all happens online.',
    'ch3.k':'June 2026',
    'ch3.t':'Rai Web Design opens. One rule from day one: few projects at a time. That’s what makes two-week delivery possible without cutting corners.',
    'ch4.k':'Today',
    'ch4.t':'You talk to the person who designs, codes and ships your site. No middleman. No salesperson. No outsourcing.',

    'offer.label':'04 / The offer',
    'offer.h':'One offer.<br>Everything included.',
    'offer.inc':'What’s included',
    'offer.i1':'Custom design, no templates',
    'offer.i2':'Full development, clean code',
    'offer.i3':'Perfect on phone, tablet and desktop',
    'offer.i4':'Fast site, ready for Google',
    'offer.i5':'Launch + domain name',
    'offer.i6':'Hosting I manage for you',
    'offer.i7':'Delivered in 2 weeks',
    'offer.aft':'What happens next?',
    'offer.p1':'Your site grows with you. Changes are billed by the work they take: a small tweak stays a small tweak. A big change is quoted before anything starts.',
    'offer.p2':'You always know what you’re paying for.',
    'offer.cta':'Check my availability',

    'work.label':'06 / Work <i>(3)</i>',
    'audit.label':'Free audit',
    'audit.h':'Your current site deserves better?',
    'audit.p':'Give me its address. I look at it and tell you what is holding it back and what I would change. Free, no strings.',
    'audit.cta':'Check my site',
    'audit.note':'This opens WhatsApp with the address already written. Same day reply.',
    'slots.next':'Next slot',
    'slots.why':'Few projects at a time, that is what keeps the two week delivery.',
    'steps.label':'05 / How it works',
    'steps.h':'From your message<br>to going live.',
    'steps.t1':'We talk',
    'steps.p1':'You write to me on WhatsApp. We go over your business, your customers and what you actually need. Ten minutes is enough.',
    'steps.w1':'Day 1',
    'steps.t2':'I show you a mockup',
    'steps.p2':'I design your home page with your real words and your colours. You see the site before I write a single line of code.',
    'steps.w2':'Days 2 to 4',
    'steps.t3':'I build the site',
    'steps.p3':'Everything is written by hand, no template. Fast on a phone, clean for Google, and you can follow the progress whenever you want.',
    'steps.w3':'Days 5 to 10',
    'steps.t4':'You review, I adjust',
    'steps.p4':'You test the site on your phone and on your friends phones. You tell me what is off, I fix it until you are happy.',
    'steps.w4':'Days 11 to 13',
    'steps.t5':'Going live',
    'steps.p5':'I put the site online with your domain name, hosting included. You are visible the same day, and I stay reachable afterwards.',
    'steps.w5':'Day 14',
    'work.h':'Three sites delivered.<br>Three happy clients.',
    'work.hint':'Click a project to open it live, the whole site loads in a new tab.',
    'w1.t':'Heihere Lodge','w1.m':'Holiday rental · Moorea',
    'w2.t':'Raiko Glow','w2.m':'Online store · LED',
    'w3.t':'Moanahiti Lodge','w3.m':'Accommodation · French Polynesia',
    'work.more':'+ more projects currently in production',

    'fin.l1':'Let’s','fin.l2':'talk.',
    'fin.sub':'Tell me what you want to build. I answer personally, on WhatsApp, usually within the hour.',
    'fin.cta':'Message me on WhatsApp',
    'fin.micro':'No endless form. No salesperson. Just a conversation.',

    'ft.contact':'Contact','ft.nav':'Navigation','ft.studio':'Studio','ft.mail':'Email',
    'ft.n1':'Mission','ft.n2':'Services','ft.n3':'Work','ft.n4':'Contact',
    'ft.s1':'Tahiti, French Polynesia','ft.s2':'Clients all over the world','ft.s3':'Founded June 2026',
    'ft.made':'Designed and coded in Tahiti',

    'meta.title':'Rai Web Design · Website creation &amp; redesign · Tahiti',
    'meta.desc':'Rai, a one person web studio in Tahiti. I design, I code and I ship websites that hold up. Hosting included, delivered in two weeks.',
    'wa.msg':'Hi Rai, I’d like to build a website.'
  }
};

/* Les valeurs FR sont celles déjà écrites dans le HTML : on les mémorise au boot. */
function i18nInit(){
  const box = $('#lang');
  const store = { fr:{}, en:I18N.en };
  $$('[data-i18n]').forEach(el => { store.fr[el.dataset.i18n] = el.innerHTML; });
  const mis = $('[data-i18n-mission]');
  store.fr['mission.txt'] = mis ? mis.dataset.raw || mis.textContent.trim() : '';
  store.fr['mission.hot'] = mis ? mis.dataset.hot : '';
  store.fr['meta.title'] = document.title;
  store.fr['meta.desc'] = ($('meta[name="description"]')||{}).content || '';
  store.fr['wa.msg'] = CONFIG.message;
  if (mis) mis.dataset.raw = store.fr['mission.txt'];

  const apply = (lang, first) => {
    const d = store[lang]; if (!d) return;
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(el => {
      const v = d[el.dataset.i18n];
      // Remplacer l'innerHTML détache les nœuds que GSAP anime (le soulignement
      // du hero vit dans hero.l4). On ne touche donc que ce qui change vraiment.
      if (v != null && el.innerHTML !== v) el.innerHTML = v;
    });
    if (mis){
      mis.dataset.raw = d['mission.txt'];
      mis.dataset.hot = d['mission.hot'];
    }
    document.title = decodeEnt(d['meta.title']);
    const md = $('meta[name="description"]'); if (md) md.content = decodeEnt(d['meta.desc']);
    const og = $('meta[property="og:description"]'); if (og) og.content = decodeEnt(d['meta.desc']);
    CONFIG.message = decodeEnt(d['wa.msg']);
    links();
    $$('button[data-lang]', box).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    try { localStorage.setItem('rwd-lang', lang); } catch(e){}
    if (!first) afterLangChange();
  };

  const stored = (() => { try { return localStorage.getItem('rwd-lang'); } catch(e){ return null; } })();
  const auto = (navigator.language || 'fr').toLowerCase().startsWith('fr') ? 'fr' : 'en';
  const lang = stored || auto;

  if (box) $$('button[data-lang]', box).forEach(b =>
    b.addEventListener('click', () => { if (document.documentElement.lang !== b.dataset.lang) apply(b.dataset.lang); }));

  apply(lang, true);
}
const decodeEnt = s => { const t = document.createElement('textarea'); t.innerHTML = s; return t.value; };

/* Après un changement de langue : on remet les éléments animés dans leur état final
   et on recalcule ce qui dépend du texte. */
function afterLangChange(){
  $$('.hero__title .ln>span, .fin__t .ln>span').forEach(s => { s.style.transform = 'translate(0px,0px)'; });
  const kin = $('.kin i'); if (kin) kin.style.transform = 'scaleX(1)';
  mission();
  slots();   // mois et nombre de places sont calculés, pas de data-i18n
  if (window.__rebuildTicker) window.__rebuildTicker();
  if (hasGSAP()){
    ScrollTrigger.getAll().forEach(t => { if (t.trigger && t.trigger.closest && t.trigger.closest('#story')) t.refresh(); });
    ScrollTrigger.refresh();
  }
}

/* ---------- BOOT ---------- */
function boot(){
  links();
  i18nInit();     // avant l'ouverture : ses libellés suivent la langue du visiteur,
                  // et les innerHTML changent avant que les timelines ne prennent
                  // leurs cibles dans le DOM
  intro(() => {
    smooth();
    cursor();
    hero();
    cinema();
    stats();
    mission();
    pillars();
    story();
    offer();
    audit();
    slots();
    steps();
    work();
    finalCta();
    chrome();
    menu();
    ticker();
    clock();
    footMark();
    flourish();
    resizing();
    if (hasGSAP()) ScrollTrigger.refresh();
  });
}

if (document.readyState === 'loading') addEventListener('DOMContentLoaded', boot);
else boot();

})();
