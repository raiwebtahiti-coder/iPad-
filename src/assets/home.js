/* Accueil : atterrir sur l'ancre demandée depuis une autre page (/#fare).
   Le moteur (app.js) fait défiler un calque fixe : le saut natif du
   navigateur ne fonctionne pas. On attend que le moteur ait mesuré la page
   (classe is-ready + hauteur du body posée), puis on défile. */
(() => {
  const id = decodeURIComponent(location.hash.slice(1));
  const el = id && document.getElementById(id);
  if (!el) return;
  const docTop = (n) => { let t = 0; while (n) { t += n.offsetTop; n = n.offsetParent; } return t; };
  const t0 = performance.now();
  const tick = () => {
    const top = Math.max(0, docTop(el) - 90);
    const ready = document.body.classList.contains('is-ready') && document.documentElement.scrollHeight > top + innerHeight / 2;
    if (ready) { scrollTo({ top, behavior: 'auto' }); return; }
    if (performance.now() - t0 < 6000) setTimeout(tick, 100);
  };
  tick();
})();
