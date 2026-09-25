// PAGE CONTACT ET INFOS PRATIQUES + page de remerciement du formulaire.
import { esc, txt, head } from '../lib.mjs';
import { dock, footer, map, requestForm, runtimeStrings } from './partials.mjs';

function pageDock(ctx) {
  const { t, prefix } = ctx;
  return dock(ctx, {
    links: [
      { href: `${prefix}/#fare`, label: t('nav.fares').toUpperCase() },
      { href: `${prefix}/contact/`, label: t('nav.contact').toUpperCase() }
    ],
    cta: { href: `${prefix}/contact/#demande`, label: t('nav.cta') }
  });
}

export function contactPage(ctx) {
  const { site, img, t, ui, prefix, home } = ctx;
  const path = `${prefix}/contact/`;
  const c = site.contact;
  const phoneLink = /\d/.test(c.phone) && !c.phone.includes('[')
    ? `<a class="link" href="tel:${esc(c.phone.replace(/\s/g, ''))}">${esc(c.phoneDisplay)}</a>` : txt(c.phoneDisplay);
  const emailLink = c.email.includes('[') ? txt(c.email) : `<a class="link" href="mailto:${esc(c.email)}">${esc(c.email)}</a>`;
  const wa = c.whatsapp
    ? `<a class="btn btn-primary" href="https://wa.me/${esc(c.whatsapp)}?text=${encodeURIComponent(c.whatsappMessage)}" target="_blank" rel="noopener"><svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/></svg>${esc(t('contact.whatsapp'))}</a>`
    : `<span class="btn btn-disabled" aria-disabled="true"><svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/></svg>${txt(t('contact.whatsappPending'))}</span>`;

  const blocks = [
    { title: t('contact.arrival'), body: `<p>${txt(site.stay.selfCheckIn)}</p>` },
    { title: t('contact.hours'), body: `<dl class="facts"><div><dt class="mono ash">${esc(t('fare.checkin'))}</dt><dd>${esc(site.stay.checkIn)}</dd></div><div><dt class="mono ash">${esc(t('fare.checkout'))}</dt><dd>${esc(site.stay.checkOut)}</dd></div></dl><p class="note">${txt(site.stay.hoursNote)}</p>` },
    { title: t('contact.access'), body: `<ul class="checks"><li>${txt(site.location.ferry)}</li><li>${txt(site.location.access)}</li><li>${txt(site.location.distances)}</li><li>${esc(site.location.points[3])}</li></ul>` },
    { title: t('contact.conditions'), body: `<dl class="facts"><div><dt class="mono ash">${esc(t('contact.minNights'))}</dt><dd>${txt(site.stay.minNights)}</dd></div><div><dt class="mono ash">${esc(t('contact.cancellation'))}</dt><dd>${txt(site.stay.cancellation)}</dd></div></dl><ul class="checks"><li>${txt(site.stay.payment)}</li><li>${txt(site.stay.cleaning)}</li><li>${txt(site.stay.taxes)}</li></ul>` }
  ];

  return `<!DOCTYPE html>
<html lang="${ui.lang}">
<head>
  ${head({ ctx, title: site.seo.contact.title, description: site.seo.contact.description, path, image: img.og(home.hook.image) })}
</head>
<body class="page is-ready">
  <a class="skip mono" href="#main">${esc(t('nav.skip'))}</a>
  ${pageDock(ctx)}
  <main id="main">
    <section class="ct-head wrap">
      <p class="mono ash">${esc(site.brand.name.toUpperCase())} — ${esc(site.location.area.toUpperCase())}, ${esc(site.location.island.toUpperCase())}</p>
      <h1 class="page-title">${esc(t('contact.title'))}</h1>
      <p class="block-lead">${esc(t('contact.lead'))}</p>
    </section>

    <section class="ct-coords wrap" aria-label="${esc(t('contact.title'))}">
      <dl class="coords">
        <div><dt class="mono ash">${esc(t('contact.email'))}</dt><dd>${emailLink}</dd></div>
        <div><dt class="mono ash">${esc(t('contact.phone'))}</dt><dd>${phoneLink}</dd></div>
        <div><dt class="mono ash">${esc(site.host.name)}</dt><dd>${esc(site.host.responseTime)}</dd></div>
      </dl>
      <p class="ct-wa">${wa}</p>
    </section>

    <section class="ct-info wrap">
      ${blocks.map((b, i) => `<article class="info-card reveal" style="--i:${i % 2}"><h2 class="detail-title">${esc(b.title)}</h2>${b.body}</article>`).join('\n      ')}
    </section>

    <section class="ct-map wrap" aria-label="${esc(t('location.mapTitle'))}">
      <p class="block-lead">${esc(site.location.intro)}</p>
      <p class="note">${txt(site.contact.address)}</p>
      ${map(ctx)}
    </section>

    <section class="fp-book wrap" id="demande" aria-labelledby="form-title">
      <div class="book-head">
        <h2 class="block-title" id="form-title">${esc(t('contact.formTitle'))}</h2>
        <p class="block-lead">${esc(site.reservation.intro)}</p>
        <p class="note">${esc(site.reservation.direct)}</p>
      </div>
      <div class="book-form book-form-wide">
        ${requestForm(ctx)}
      </div>
    </section>

    ${footer(ctx, { kicker: home.sections.footerKicker, reassurance: home.sections.footerReassurance })}
  </main>
  ${runtimeStrings(ctx)}
  <script src="/pages.js" defer></script>
</body>
</html>
`;
}

export function merciPage(ctx) {
  const { site, img, t, ui, prefix, home } = ctx;
  return `<!DOCTYPE html>
<html lang="${ui.lang}">
<head>
  ${head({ ctx: { ...ctx, noindex: true }, title: `${t('merci.title')} — ${site.brand.name}`, description: t('form.okText'), path: `${prefix}/merci/`, image: img.og(home.hook.image) })}
</head>
<body class="page is-ready">
  ${pageDock(ctx)}
  <main id="main" class="merci wrap">
    <p class="mono ash">${esc(site.brand.name.toUpperCase())}</p>
    <h1 class="page-title">${esc(t('form.okTitle'))}</h1>
    <p class="block-lead">${esc(t('form.okText'))}</p>
    <p><a class="btn btn-primary" href="${prefix}/">${esc(t('merci.back'))}</a></p>
  </main>
</body>
</html>
`;
}
