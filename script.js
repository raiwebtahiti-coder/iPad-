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
  intro   : { duration:8000, once:false },

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
const mobile  = matchMedia('(max-width:600px)').matches;
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
  const box  = $('#intro');
  if (!box) return done();
  const num  = $('#introNum'), bar = $('#introBar'), skip = $('#introSkip');
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

  const D = CONFIG.intro.duration / 1000;   // 8 s par défaut
  const counter = { v:0 };

  const tl = gsap.timeline({ defaults:{ ease:'expo.out' }, onComplete: leave });

  // 1. la ligne rouge naît du néant
  tl.fromTo('.intro__seed', { scaleX:0, opacity:1 },
                            { scaleX:1, duration:.9, ease:'expo.inOut' }, 0)
    .to('.intro__glow', { opacity:1, scale:1, duration:2.2, ease:'power2.out' }, .2)
    .to('.intro__skip', { opacity:1, duration:.6 }, .6)

  // 2. la ligne se disperse, l'orbite se referme autour du vide
    .to('.intro__seed', { scaleX:1.25, opacity:0, duration:.7, ease:'power2.in' }, .95)
    .set('.intro__logo', { opacity:1 }, .95)
    .fromTo('.intro__logo .lg-orbit__a',
            { opacity:0, rotate:-52, scale:.82 },
            { opacity:1, rotate:0, scale:1, duration:1.5 }, 1.0)
    .fromTo('.intro__logo .lg-orbit__b',
            { opacity:0, rotate:-52, scale:.82 },
            { opacity:1, rotate:0, scale:1, duration:1.5 }, 1.12)

  // 3. le mot se lève derrière l'orbite
    .fromTo('.intro__logo .lg-word',
            { opacity:0, yPercent:34 },
            { opacity:1, yPercent:0, duration:1.25 }, 1.85)
    .fromTo('.intro__logo .lg-agency',
            { opacity:0, x:26 },
            { opacity:1, x:0, duration:.9 }, 2.5)
    .to('.intro__tag', { opacity:1, duration:.8 }, 2.3)

  // 4. le compteur court sur toute la durée restante
    .to(counter, {
        v:100, duration: D - 2.1, ease:'power1.inOut',
        onUpdate(){ num.textContent = String(Math.round(counter.v)).padStart(2,'0'); }
      }, .9)
    .to(bar, { scaleX:1, duration: D - 2.1, ease:'power1.inOut' }, .9)

  // 5. un éclat balaie le logo pendant l'attente
    .fromTo('.intro__sweep', { xPercent:-130 }, { xPercent:130, duration:1.6, ease:'power2.inOut' }, 3.4)
    .to('.intro__logo', { scale:1.035, duration: D - 5.2, ease:'sine.inOut' }, 3.2)

  // 6. sortie : le logo se retire, le rideau s'ouvre sur le site
    .to('.intro__sweep', { xPercent:130, duration:.01 }, D - 1.8)
    .to('.intro__logo',  { scale:1.14, opacity:0, filter:'blur(9px)', duration:.9, ease:'power2.in' }, D - 1.7)
    .to('.intro__glow',  { opacity:0, duration:.8 }, D - 1.7)
    .to(['.intro__foot','.intro__bar','.intro__skip'], { opacity:0, y:26, duration:.6 }, D - 1.6)
    .to('.intro__curtain', { scaleY:1, duration:.65, ease:'expo.inOut' }, D - 1.0)
    .to(box, { opacity:0, duration:.45, ease:'power2.out' }, D - .45);

  skip.addEventListener('click', () => { tl.pause(); gsap.to(box,{opacity:0,duration:.4,onComplete:leave}); });
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
    const n = mobile ? 22 : 46;
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
    end: () => '+=' + (innerHeight * (mobile ? 1.9 : 3.2)),
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

  el.innerHTML = raw.split(/\s+/).map(w =>
    `<w${hot.includes(norm(w))?' class="hot"':''}>${w}</w> `
  ).join('');

  const words = $$('w', el);
  if (!hasGSAP() || reduced){ words.forEach(w=>w.classList.add('on')); return; }

  ScrollTrigger.getAll().forEach(t => { if (t.trigger === el) t.kill(); });
  ScrollTrigger.create({
    trigger: el, start:'top 78%', end:'bottom 45%', scrub:.4,
    onUpdate(self){
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

  if (!hasGSAP() || reduced || mobile){
    chs.forEach(c=>c.classList.add('act'));
    if (rail) rail.style.transform='scaleX(1)';
    return;
  }

  const dist = () => Math.max(0, track.scrollWidth - innerWidth + parseFloat(getComputedStyle(track).paddingLeft));

  const tl = gsap.timeline({
    scrollTrigger:{
      trigger:'#story', start:'top top',
      end: () => '+=' + (dist() + innerHeight*0.5),
      pin: pin, scrub:1, invalidateOnRefresh:true,
      onUpdate(self){
        if (rail) rail.style.transform = `scaleX(${self.progress})`;
        const c = innerWidth/2;
        chs.forEach(ch=>{ const r=ch.getBoundingClientRect();
          ch.classList.toggle('act', r.left < c && r.right > c*0.35); });
      }
    }
  });
  tl.to(track,{ x: () => -dist(), ease:'none' });
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
  const list = $('#wlist'), peek = $('#peek');
  const rows = $$('.wrow', list || document.createElement('i'));
  if (!rows.length) return;

  if (!hasGSAP() || reduced) rows.forEach(r=>r.style.opacity='1');
  else gsap.to(rows,{ opacity:1, duration:.8, stagger:.09, ease:'expo.out',
        scrollTrigger:{ trigger:list, start:'top 82%', once:true }});

  if (!fine || !peek || reduced) return;
  const img = $('img', peek);
  let px=0,py=0,tx=0,ty=0,lx=0,vis=false;

  rows.forEach(r=>{
    r.addEventListener('pointerenter',()=>{
      list.classList.add('dim'); rows.forEach(x=>x.classList.toggle('act',x===r));
      img.src = r.dataset.img; vis=true; peek.style.opacity='1';
    });
  });
  list.addEventListener('pointerleave',()=>{
    list.classList.remove('dim'); rows.forEach(x=>x.classList.remove('act'));
    vis=false; peek.style.opacity='0';
  });
  addEventListener('pointermove', e=>{ tx=e.clientX+28; ty=e.clientY-90; }, {passive:true});

  const raf = ()=>{ 
    const nx = lerp(px,tx,.12), ny = lerp(py,ty,.12);
    const rot = clamp((nx-px)*0.55,-7,7);
    px=nx; py=ny; lx=rot;
    if (vis) peek.style.transform = `translate3d(${px}px,${py}px,0) rotate(${lx.toFixed(2)}deg)`;
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}

/* ---------- 13. CTA FINAL ---------- */
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

/* ---------- 15. FIORITURES ---------- */
function flourish(){
  // marque fixe : elle apparaît une fois le hero passé
  const brand = $('#brand');
  if (brand){
    const on = () => brand.classList.toggle('is-on', scrollY > innerHeight * 0.7);
    addEventListener('scroll', on, { passive:true }); on();
  }

  if (!hasGSAP() || reduced) return;

  // le hero se retire en douceur quand on quitte le haut de page
  gsap.to('.hero__wrap', {
    yPercent:-12, opacity:.25, ease:'none',
    scrollTrigger:{ trigger:'.hero', start:'top top', end:'bottom top', scrub:.6 }
  });

  // les captures de projets respirent au défilement
  $$('.wrow__inline').forEach(img => {
    gsap.fromTo(img, { yPercent:-5 }, { yPercent:5, ease:'none',
      scrollTrigger:{ trigger:img, start:'top bottom', end:'bottom top', scrub:true }});
  });

  // aimantation des deux appels à l'action du hero
  $$('.hero__cta .btn').forEach(b => magnetize(b, { x:.22, y:.34, maxX:16, maxY:10 }));

  // La page s'incline légèrement avec la vitesse de défilement.
  // Volontairement appliqué section par section : un transform sur un ancêtre
  // d'un élément épinglé casse le position:fixed de ScrollTrigger, ce qui
  // gèle la séquence cinéma et la timeline. #cine et #story sont donc exclus.
  const tilt = $$('#stats, #mission, #services, #offer, #work, #contact, .ft');
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

/* ---------- 16. RESIZE ---------- */
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
    'hero.eyebrow':'Independent web studio · Tahiti · since 2026',
    'hero.l1':'Your website',
    'hero.l2':'shouldn’t just',
    'hero.l3':'exist.',
    'hero.l4':'It should <em class="kin">convince<i></i></em>',
    'hero.sub':'I design, code and ship websites people actually want to stay on. One person to talk to. Delivered in two weeks.',
    'hero.cta1':'Start my project',
    'hero.cta2':'See my work',
    'hero.scroll':'Scroll',

    'beat.1a':'Your current site','beat.1b':'says nothing.',
    'beat.2a':'I build it.','beat.2b':'Line by line.',
    'beat.3a':'And it works','beat.3b':'for you.',

    'stat.1t':'Sites delivered','stat.1s':'more in production',
    'stat.2t':'Client satisfaction','stat.2s':'no exceptions',
    'stat.3t':'Weeks','stat.3s':'average delivery time',
    'stat.4t':'PageSpeed score','stat.4s':'on every delivery',

    'mission.label':'01 / My mission',
    'mission.txt':"Too many great businesses are invisible online. I build the site that makes them impossible to ignore, one that brings in clients, and makes their brand feel obvious.",
    'mission.hot':'invisible|impossible|ignore|clients|obvious',
    'mission.sig':'Rai, founder',

    'pillars.label':'02 / What I do',
    'pillars.h':'Three ways<br>to make you<br>visible.',
    'p1.t':'Website<br>creation',
    'p1.d':'A complete site, designed and coded from scratch. Design, development, launch. Built to convert, not just to decorate.',
    'p2.t':'Modernising<br>an existing site',
    'p2.d':'Your site exists but it has aged. I bring it back up to standard: design, speed, mobile, credibility. Without starting over.',
    'p3.t':'Hosting<br>&amp; evolution',
    'p3.d':'I put your site online and host it. Future changes are priced by their scope. Nothing locked in, nothing hidden.',

    'story.label':'03 / The story',
    'ch1.k':'High school',
    'ch1.t':'I’ve been coding since high school. Not a career switch, not a crash course. Years of breaking things to understand how they hold together.',
    'ch2.k':'Tahiti',
    'ch2.t':'Based in Tahiti. I work with clients everywhere. The ocean around me changes nothing about how fast the code ships.',
    'ch3.k':'June 2026',
    'ch3.t':'Rai Web Design opens. One founding rule: few projects at a time. That’s what makes two-week delivery possible without cutting corners.',
    'ch4.k':'Today',
    'ch4.t':'You talk to the person who designs, codes and ships your site. No middleman. No salesperson. No outsourcing.',

    'offer.label':'04 / The offer',
    'offer.h':'One package.<br>Everything in it.',
    'offer.inc':'What’s included',
    'offer.i1':'Custom design, no templates',
    'offer.i2':'Full development, clean code',
    'offer.i3':'100 % responsive, mobile first',
    'offer.i4':'Performance &amp; technical SEO optimisation',
    'offer.i5':'Launch + domain name',
    'offer.i6':'Managed hosting',
    'offer.i7':'Delivered in 2 weeks',
    'offer.aft':'What happens next?',
    'offer.p1':'Your site grows with you. Future changes are priced by their scope: a small tweak stays a small tweak. A big change is quoted before anything starts.',
    'offer.p2':'You always know what you’re paying for.',
    'offer.scarce':'Few projects accepted at a time.<br><b>That’s what protects the deadline.</b>',
    'offer.cta':'Check my availability',

    'work.label':'05 / Work',
    'work.h':'Three sites delivered.<br>Three happy clients.',
    'w1.t':'Heihere Lodge','w1.m':'Holiday rental · Moorea',
    'w2.t':'Raiko Glow','w2.m':'Online store · LED',
    'w3.t':'Third project','w3.m':'Details to come',
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
    'meta.desc':'Independent web studio in Tahiti. Custom website creation and redesign, hosting included, delivered in 2 weeks. One person to talk to: the one who writes the code.',
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
      if (v != null) el.innerHTML = v;
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
  if (hasGSAP()){
    ScrollTrigger.getAll().forEach(t => { if (t.trigger && t.trigger.closest && t.trigger.closest('#story')) t.refresh(); });
    ScrollTrigger.refresh();
  }
}

/* ---------- BOOT ---------- */
function boot(){
  links();
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
    work();
    finalCta();
    chrome();
    flourish();
    resizing();
    i18nInit();
    if (hasGSAP()) ScrollTrigger.refresh();
  });
}

if (document.readyState === 'loading') addEventListener('DOMContentLoaded', boot);
else boot();

})();
