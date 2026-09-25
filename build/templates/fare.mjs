// PAGE D'UN FARE — galerie, description, couchages, équipements,
// disponibilités (module optionnel), formulaire de demande, lien Airbnb.
import { esc, txt, head, clean, plain } from '../lib.mjs';
import { dock, footer, fareTags, rating, fareCards, reviewCards, requestForm, runtimeStrings } from './partials.mjs';

export function farePage(ctx, f) {
  const { site, img, fares, reviews, t, ui, common, prefix, home } = ctx;
  const path = `${prefix}/${f.slug}/`;
  const cover = f.photos[0];
  const own = reviews.reviews.filter((r) => r.fare === f.id);
  const others = fares.filter((o) => o.id !== f.id);

  const jsonld = clean({
    '@context': 'https://schema.org',
    '@type': 'VacationRental',
    '@id': ctx.base + path + '#rental',
    additionalType: 'House',
    identifier: f.id,
    name: f.name,
    description: plain(f.description.join(' ')),
    url: ctx.base + path,
    image: f.photos.slice(0, 10).map((id) => ctx.base + img.src(id)),
    latitude: site.location.lat,
    longitude: site.location.lng,
    address: { '@type': 'PostalAddress', addressLocality: site.location.area, addressRegion: site.location.island, addressCountry: site.location.countryCode },
    checkinTime: '15:00',
    checkoutTime: '11:00',
    containedInPlace: { '@id': ctx.base + prefix + '/#lodging' },
    containsPlace: {
      '@type': 'Accommodation',
      additionalType: 'EntirePlace',
      numberOfBedrooms: f.bedrooms,
      numberOfBathroomsTotal: f.bathrooms,
      occupancy: { '@type': 'QuantitativeValue', maxValue: f.capacity },
      bed: [
        { '@type': 'BedDetails', numberOfBeds: 1, typeOfBed: 'Lit double' },
        { '@type': 'BedDetails', numberOfBeds: 1, typeOfBed: 'Canapé-lit' }
      ],
      amenityFeature: [
        ...(f.pool ? ['Piscine privée'] : []),
        'Climatisation', 'Wifi', 'Télévision', 'Cuisine équipée', 'Stationnement gratuit', 'Jardin', 'Arrivée autonome'
      ].map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true }))
    }
  });

  const gallery = f.photos.map((id, i) => {
    const p = img.get(id);
    return `<li class="g-item${i === 0 ? ' g-first' : ''}"><button type="button" class="g-open" data-index="${i}" data-full="${img.src(id)}" data-w="${p.w}" data-h="${p.h}" aria-label="${esc(t('gallery.open', { n: i + 1 }))} — ${esc(p.alt)}">${img.img(id, { sizes: '(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 25vw' })}</button></li>`;
  }).join('\n        ');

  return `<!DOCTYPE html>
<html lang="${ui.lang}">
<head>
  ${head({ ctx, title: f.seo.title, description: f.seo.description, path, image: img.og(cover), jsonld: [jsonld] })}
</head>
<body class="page is-ready">
  <a class="skip mono" href="#main">${esc(t('nav.skip'))}</a>
  ${dock(ctx, {
    links: [
      { href: `${prefix}/#fare`, label: t('nav.fares').toUpperCase() },
      { href: `${prefix}/contact/`, label: t('nav.contact').toUpperCase() }
    ],
    cta: { href: '#demande', label: t('nav.cta') }
  })}

  <main id="main">
    <section class="fp-hero">
      ${img.img(cover, { eager: true, sizes: '100vw', cls: 'fp-hero-img' })}
      <div class="fp-hero-copy">
        <p class="mono">${esc(f.name.toUpperCase())} — ${esc(site.location.area.toUpperCase())}, ${esc(site.location.island.toUpperCase())}</p>
        <h1 class="fp-title">${esc(f.name)}</h1>
        <p class="fp-tagline">${esc(f.tagline)}</p>
      </div>
    </section>

    <section class="fp-intro wrap" aria-labelledby="about-title">
      <div class="fp-main">
        <p class="mono ash reveal">${esc(t('fare.about'))}</p>
        <h2 class="block-title reveal" id="about-title">${esc(f.short)}</h2>
        ${fareTags(ctx, f)}
        ${f.description.map((p) => `<p class="fp-text reveal">${txt(p)}</p>`).join('\n        ')}
        <p class="fp-text ash reveal">${esc(common.idealFor)}</p>
      </div>
      <aside class="fp-aside" aria-label="${esc(t('fare.request'))}">
        <div class="aside-card">
          <p class="aside-price"><span class="mono ash">${esc(t('fare.price'))}</span><span>${txt(f.price)} <span class="ash">${esc(t('fare.priceUnit'))}</span></span></p>
          <p>${rating(ctx, f)}</p>
          <dl class="aside-facts">
            <div><dt class="mono ash">${esc(t('fare.checkin'))}</dt><dd>${esc(site.stay.checkIn)}</dd></div>
            <div><dt class="mono ash">${esc(t('fare.checkout'))}</dt><dd>${esc(site.stay.checkOut)}</dd></div>
          </dl>
          <p class="aside-note ash">${txt(site.stay.hoursNote)}</p>
          <a class="btn btn-primary btn-block" href="#demande">${esc(t('form.title'))}</a>
          <p class="aside-note ash">${esc(site.host.responseTime)}.</p>
          <p class="aside-airbnb"><span class="ash">${esc(t('fare.airbnbNote'))}</span> <a class="btn btn-line btn-block" href="${esc(f.airbnb)}" target="_blank" rel="noopener">${esc(t('fare.airbnb'))} ↗</a></p>
        </div>
      </aside>
    </section>

    <section class="fp-gallery wrap" aria-labelledby="gallery-title">
      <h2 class="sr-only" id="gallery-title">${esc(t('fare.gallery'))}</h2>
      <ul class="gallery" data-gallery>
        ${gallery}
      </ul>
      <p class="g-more"><button type="button" class="btn btn-line" data-gallery-all>${esc(t('fare.galleryAll', { n: f.photos.length }))}</button></p>
    </section>

    <section class="fp-details wrap" aria-label="${esc(t('fare.amenities'))}">
      <div class="detail-col">
        <h2 class="detail-title reveal">${esc(t('fare.sleeping'))}</h2>
        <ul class="sleep reveal">
          ${common.sleeping.map((s) => `<li><span class="sleep-room">${esc(s.room)}</span><span class="ash">${esc(s.detail)}</span></li>`).join('\n          ')}
        </ul>
        <h2 class="detail-title reveal">${esc(f.outdoor.title)}</h2>
        <ul class="checks reveal">
          ${f.outdoor.items.map((i) => `<li>${esc(i)}</li>`).join('\n          ')}
        </ul>
        ${f.rules.length ? `<h2 class="detail-title reveal">${esc(t('fare.rules'))}</h2>
        <ul class="checks reveal">${f.rules.map((r) => `<li>${txt(r)}</li>`).join('')}</ul>` : ''}
      </div>
      <div class="detail-col">
        <h2 class="detail-title reveal">${esc(t('fare.amenities'))}</h2>
        ${common.amenities.map((g) => `<div class="amen-group reveal"><h3 class="mono ash">${esc(g.group)}</h3><ul class="checks">${g.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul></div>`).join('\n        ')}
        <p class="note">${txt(common.amenitiesMore)}</p>
      </div>
    </section>

    <section class="fp-reviews wrap" aria-labelledby="reviews-title">
      <div class="reviews-head">
        <h2 class="detail-title reveal" id="reviews-title">${esc(t('fare.reviews'))}</h2>
        <p class="reveal">${rating(ctx, f)}</p>
      </div>
      ${own.length ? reviewCards(ctx, own, { showFare: false }) : `<p class="ash">${esc(t('fare.noReviewsYet'))}</p>`}
    </section>

    <section class="fp-book wrap" id="demande" aria-labelledby="form-title">
      <div class="book-head">
        <p class="mono ash">${esc(f.name.toUpperCase())}</p>
        <h2 class="block-title" id="form-title">${esc(t('form.title'))}</h2>
        <p class="block-lead">${esc(t('form.intro'))}</p>
        <p class="note">${esc(site.reservation.direct)}</p>
      </div>
      <div class="book-grid">
        <div class="availability" data-availability data-fare="${f.id}" hidden aria-labelledby="avail-title">
          <h3 class="detail-title" id="avail-title">${esc(t('fare.availability'))}</h3>
          <div class="cal" data-cal></div>
          <p class="note">${esc(t('fare.availabilityNote'))}</p>
        </div>
        <div class="book-form">
          ${requestForm(ctx, { fareId: f.id })}
        </div>
      </div>
      <p class="book-airbnb"><span class="ash">${esc(t('fare.airbnbNote'))}</span> <a class="link" href="${esc(f.airbnb)}" target="_blank" rel="noopener">${esc(t('fare.airbnb'))} ↗</a></p>
    </section>

    <section class="fp-others wrap" aria-labelledby="others-title">
      <h2 class="block-title reveal" id="others-title">${esc(t('fare.others'))}</h2>
      ${fareCards(ctx, others)}
    </section>

    ${footer(ctx, { kicker: home.sections.footerKicker, reassurance: home.sections.footerReassurance })}
  </main>

  <dialog class="lightbox" data-lightbox aria-label="${esc(t('fare.gallery'))}">
    <img alt="" data-lb-img>
    <p class="lb-count mono" data-lb-count></p>
    <button type="button" class="lb-btn lb-close" data-lb-close aria-label="${esc(t('gallery.close'))}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    <button type="button" class="lb-btn lb-prev" data-lb-prev aria-label="${esc(t('gallery.prev'))}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>
    <button type="button" class="lb-btn lb-next" data-lb-next aria-label="${esc(t('gallery.next'))}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>
  </dialog>

  ${runtimeStrings(ctx)}
  <script src="/pages.js" defer></script>
</body>
</html>
`;
}
