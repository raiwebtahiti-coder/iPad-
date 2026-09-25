// ACCUEIL — balisage du template « Site Immersif » (vendor/site-immersif/index.html).
// Les scènes animées sont reprises À L'IDENTIQUE (ids, classes, data-pin,
// positions --x/--y/--w/data-d des visuels) : seuls les textes et les images
// changent. Écarts assumés au template, signalés dans le README :
//   · <head> SEO (title, description, Open Graph, JSON-LD, noindex d'aperçu) ;
//   · images locales à la place des placeholders picsum ;
//   · liens de la barre vers les autres pages ;
//   · sections de contenu ajoutées ENTRE les scènes (cartes des fare,
//     comparatif, inclus, localisation, avis, bon à savoir) — non épinglées ;
//   · pied de page : bouton de demande, liens des pages, n° d'enregistrement.
import { esc, txt, head, clean } from '../lib.mjs';
import { dock, footer, fareCards, compareTable, reviewCards, map } from './partials.mjs';

const FLOATERS = [
  ['-4%', '13%', '196px', '0.55'], ['21%', '3%', '142px', '0.90'], ['40%', '-8%', '232px', '0.40'],
  ['63%', '7%', '126px', '0.75'], ['85%', '1%', '208px', '1.00'], ['-2%', '45%', '116px', '0.50'],
  ['94%', '37%', '172px', '0.70'], ['13%', '71%', '248px', '0.35'], ['44%', '81%', '134px', '0.85'],
  ['73%', '64%', '188px', '0.60']
];
const TRAIL_W = [150, 190, 120, 200, 96, 170, 34, 140, 200, 110, 28, 160, 130, 180, 40, 150, 120, 200, 100, 170];
const BOX = 'M50,6 C88,4 98,22 97,50 C96,82 76,96 49,95 C16,94 3,76 4,48 C5,18 20,7 50,6 Z';
const ROOM = { salon: 'SALON', cuisine: 'CUISINE', chambre: 'CHAMBRE', 'salle-de-bain': 'SALLE DE BAIN', jardin: 'JARDIN', exterieur: 'EXTÉRIEUR' };

/* window.SITE_CONTENT pour l'injection canonique du template */
export function siteContent(ctx) {
  const { site, home, img, fares, reviews } = ctx;
  const fare = (id) => fares.find((f) => f.id === id);
  return {
    brand: {
      name: site.brand.name,
      title: site.seo.home.title,
      description: site.seo.home.description,
      kicker: site.brand.kicker,
      copyright: site.brand.copyright,
      signature: `${site.brand.registrationLabel.toUpperCase()} ${site.brand.registration}`,
      socials: [
        ...(site.contact.whatsapp ? [{ label: 'WHATSAPP ↗', url: `https://wa.me/${site.contact.whatsapp}` }] : []),
        { label: 'AIRBNB ↗', url: site.host.airbnbProfile }
      ]
    },
    nav: { proof: home.nav.fares, universes: home.nav.stay, cta: home.nav.cta },
    hook: {
      line1: home.hook.line1, line2a: home.hook.line2a, line2b: home.hook.line2b,
      image: img.src(home.hook.image), imageAlt: img.get(home.hook.image).alt,
      floaters: home.hook.floaters.map((id) => img.src(id, 800))
    },
    positioning: home.positioning,
    manifesto: { text: home.manifesto.text },
    proof: {
      layout: 'masonry',
      kicker: home.fares.kicker, title: home.fares.title, sub: home.fares.sub, meta: home.fares.meta,
      projects: home.fares.gallery.map((g) => ({ img: img.src(g.photo, 800), title: fare(g.fare).name, meta: ROOM[img.get(g.photo).room] }))
    },
    motto: home.motto,
    universes: {
      introA: home.process.introA, introB: home.process.introB, introC: home.process.introC,
      cta: home.process.cta, image: img.src(home.process.image), items: home.process.items
    },
    testimonial: {
      kicker: home.testimonial.kicker, figure: home.testimonial.figure, unit: home.testimonial.unit,
      quote: reviews.featured.text, author: home.testimonial.author
    },
    objections: home.objections,
    contact: {
      kicker: home.sections.footerKicker,
      email: site.contact.email,
      reassurance: home.sections.footerReassurance
    },
    trail: home.trail.map((id) => img.src(id, 800))
  };
}

export function homePage(ctx, { injection }) {
  const { site, home, img, fares, reviews, t, ui, compare, prefix } = ctx;
  const C = siteContent(ctx);
  const fillHtml = txt(home.manifesto.text).replace(/\[\[(.+?)\]\]/,
    `<span class="boxed" id="boxedPhrase">$1<svg class="box-svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path id="boxPath" d="${BOX}"/></svg></span>`);

  const jsonld = clean({
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': ctx.base + '/#lodging',
    name: site.brand.name,
    description: site.seo.home.description,
    url: ctx.base + prefix + '/',
    image: [ctx.base + img.og(home.hook.image)],
    email: site.contact.email,
    telephone: site.contact.phone,
    address: { '@type': 'PostalAddress', addressLocality: site.location.area, addressRegion: site.location.island, addressCountry: site.location.countryCode },
    geo: { '@type': 'GeoCoordinates', latitude: site.location.lat, longitude: site.location.lng },
    checkinTime: '15:00', checkoutTime: '11:00',
    amenityFeature: ['Piscine privée (Fare Hani, Fare Tahi)', 'Climatisation', 'Wifi', 'Stationnement gratuit', 'Arrivée autonome']
      .map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
    containsPlace: fares.map((f) => ({ '@type': 'VacationRental', '@id': `${ctx.base}${prefix}/${f.slug}/#rental`, name: f.name, url: `${ctx.base}${prefix}/${f.slug}/` }))
  });

  return `<!DOCTYPE html>
<html lang="${ui.lang}">
<head>
  ${head({ ctx, title: site.seo.home.title, description: site.seo.home.description, path: prefix + '/', image: img.og(home.hook.image), jsonld: [jsonld] })}
</head>
<body class="home">

  <!-- ══════════ PRELOADER ══════════ -->
  <div class="loader" id="loader" aria-hidden="true">
    <div class="loader-inner">
      <p class="loader-wordmark">${esc(site.brand.name)}</p>
      <span class="loader-rule"><i id="loaderBar"></i></span>
    </div>
  </div>

  <!-- ══════════ CONTENU ══════════ -->
  <main class="smooth" id="smooth">

    <!-- ─── SCÈNE 1 · PASTEBOARD → ZOOM TEXTE → PLEIN ÉCRAN ─── -->
    <section class="scene s-hero" id="hero" data-pin="5">
      <div class="pin">

        <div class="floaters" aria-hidden="true">
          ${FLOATERS.map(([x, y, w, d], i) => `<figure class="fl" style="--x:${x}; --y:${y}; --w:${w}" data-d="${d}"><img src="${C.hook.floaters[i]}" alt=""></figure>`).join('\n          ')}
        </div>

        <div class="hero-copy">
          <p class="hero-kicker mono" id="heroKicker">${esc(site.brand.kicker)}</p>
          <h1 class="hero-title">
            <span class="hero-line1" id="heroLine1">${esc(home.hook.line1)}</span>
            <span class="hero-line2" id="heroLine2">
              <span class="hl">${esc(home.hook.line2a)}</span>
              <span class="grow" id="grow1"><img src="${C.hook.image}" alt="${esc(C.hook.imageAlt)}" fetchpriority="high"></span>
              <span class="hl">${esc(home.hook.line2b)}</span>
            </span>
          </h1>
        </div>

        <div class="spot" id="spot" aria-hidden="true">
          <h2 class="spot-intro" id="spotIntro">${home.positioning.split(' ').map((w) => `<span>${esc(w)}</span>`).join(' ')}</h2>
        </div>

      </div>
    </section>

    <!-- ─── SCÈNE 2 · MANIFESTE ─── -->
    <section class="scene s-fill" id="manifeste" data-pin="3.5">
      <div class="pin">
        <p class="fill-text" id="fillText">${fillHtml}</p>
      </div>
    </section>

    <!-- ─── SCÈNE 3 · LES FARE (panneau blanc, masonry parallaxe) ─── -->
    <section class="collection" id="travaux">
      <header class="coll-head">
        <p class="mono ash">${esc(home.fares.kicker)}</p>
        <h2 class="coll-title" id="collTitle">${esc(home.fares.title)}</h2>
        <p class="coll-sub">${esc(home.fares.sub)}</p>
        <p class="mono ash">${esc(home.fares.meta)}</p>
      </header>

      <div id="collGrid"></div>

      <!-- ajout · cartes + comparatif -->
      <div class="home-block" id="fare">
        <h2 class="block-title reveal">${esc(home.fares.cardsTitle)}</h2>
        ${fareCards(ctx, fares)}
        <div class="compare-wrap">
          <p class="mono ash reveal">${esc(home.sections.compareKicker)}</p>
          <h2 class="block-title reveal">${esc(compare.title)}</h2>
          <p class="block-lead reveal">${esc(compare.intro)}</p>
          ${compareTable(ctx)}
        </div>
      </div>
    </section>

    <!-- ─── 5 · DEVISE — les trois noms sur la bande accent ─── -->
    <div class="band" id="temps">
      <div class="diag to-lime" aria-hidden="true"></div>
      <section class="scene s-motto" data-pin="4">
        <div class="pin motto-pin">
          <p class="motto-kicker mono" id="mottoKicker">${esc(home.motto.kicker)}</p>
          <div class="motto-track" id="mottoTrack"></div>
          <p class="motto-hint mono" id="mottoHint"></p>
        </div>
      </section>
      <div class="diag from-lime" aria-hidden="true"></div>
    </div>

    <!-- ─── SCÈNE 5 · « UN SÉJOUR, 3 ÉTAPES » ─── -->
    <section class="scene s-night" id="explorer" data-pin="9">
      <div class="pin">

        <div class="night-line" id="nightLine">
          <span class="hl nw" id="nw1">${esc(home.process.introA)}</span>
          <span class="hl nw" id="nw2">${esc(home.process.introB)}</span>
          <span class="grow" id="grow2"><img src="${C.universes.image}" alt="${esc(img.get(home.process.image).alt)}"></span>
          <span class="hl nw" id="nw3">${esc(home.process.introC)}</span>
        </div>

        <div class="bignum" id="bigNum" aria-hidden="true"><span class="bignum-fixed">0</span><span class="bignum-roll"><span id="bigRoll"></span></span></div>

        <div class="psteps" id="psteps"></div>

        <p class="steps-cta" id="stepsCta">
          <a href="${prefix}/contact/#demande" id="stepsCtaLink">${esc(home.process.cta)}<svg class="cta-oval" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path id="ctaOval" d="${BOX}"/></svg></a>
        </p>

        <div class="wipe" id="nightWipe" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>

      </div>
    </section>

    <!-- ajout · inclus + localisation -->
    <section class="home-block home-info" id="inclus" aria-labelledby="inclus-title">
      <div class="info-grid">
        <div>
          <p class="mono ash reveal">${esc(home.sections.includedKicker)}</p>
          <h2 class="block-title reveal" id="inclus-title">${esc(site.included.title)}</h2>
          <p class="block-lead reveal">${esc(site.included.intro)}</p>
        </div>
        <ul class="included">
          ${site.included.items.map((it, i) => `<li class="reveal" style="--i:${i % 4}"><span class="included-label">${esc(it.label)}</span><span class="ash">${txt(it.detail)}</span></li>`).join('\n          ')}
        </ul>
      </div>

      <div class="info-grid" id="localisation">
        <div>
          <p class="mono ash reveal">${esc(home.sections.locationKicker)}</p>
          <h2 class="block-title reveal">${esc(home.sections.locationTitle)}</h2>
          <p class="block-lead reveal">${esc(site.location.intro)}</p>
          <ul class="points reveal">
            ${site.location.points.map((p) => `<li>${esc(p)}</li>`).join('\n            ')}
          </ul>
          <p class="note reveal">${txt(site.location.ferry)}</p>
        </div>
        ${map(ctx)}
      </div>
    </section>

    <!-- ─── 8 · PREUVE SOCIALE ─── -->
    <section class="scene s-quote" id="temoignage" data-pin="3">
      <div class="pin">
        <div class="q-stack">
          <span class="q-glyph" aria-hidden="true">“</span>
          <blockquote class="q-block">
            <p class="q-text" id="quoteText"></p>
          </blockquote>
          <div class="q-sign">
            <span class="q-rule" aria-hidden="true"></span>
            <div class="q-sign-row" id="quoteAuthorWrap">
              <p class="q-name" id="quoteAuthor"></p>
              <p class="q-ctx mono ash" id="figKicker"></p>
              <p class="q-fig" id="bigFigure"><span class="fig-pre" id="figPre"></span><span class="fig-val" id="figVal">0</span><span class="fig-unit" id="figUnit"></span></p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ajout · avis + bon à savoir -->
    <section class="home-block home-reviews" id="avis" aria-labelledby="avis-title">
      <div class="reviews-head">
        <div>
          <p class="mono ash reveal">${esc(home.sections.reviewsKicker)}</p>
          <h2 class="block-title reveal" id="avis-title">${esc(home.sections.reviewsTitle)}</h2>
        </div>
        <dl class="scores reveal">
          ${fares.map((f) => `<div><dt>${esc(f.name)}</dt><dd>${f.rating ? `${esc(f.rating)}<span class="ash"> / 5 · ${esc(t('fare.reviewsCount', { n: f.reviewsCount }))}</span>` : `<span class="ash">${esc(f.ratingNote)} · ${esc(t('fare.reviewsCount', { n: f.reviewsCount }))}</span>`}</dd></div>`).join('\n          ')}
          <div><dt>${esc(site.host.name)}</dt><dd>${esc(reviews.summary.hostRating)}<span class="ash"> / 5 · ${esc(t('fare.reviewsCount', { n: reviews.summary.hostReviews }))} ${esc(t('fare.ratingOn'))}</span></dd></div>
        </dl>
      </div>
      ${reviewCards(ctx, reviews.reviews)}
    </section>

    <section class="home-block good-to-know" id="bon-a-savoir" aria-labelledby="bas-title">
      <div class="gtk">
        <p class="mono ash reveal">${esc(site.goodToKnow.kicker)}</p>
        <h2 class="block-title reveal" id="bas-title">${esc(site.goodToKnow.title)}</h2>
        <p class="gtk-lead reveal">${esc(site.goodToKnow.lead)}</p>
        ${site.goodToKnow.paragraphs.map((p) => `<p class="gtk-text reveal">${esc(p)}</p>`).join('\n        ')}
        <p class="gtk-closing reveal">${esc(site.goodToKnow.closing)} <span class="ash">— ${esc(site.host.name)}</span></p>
      </div>
      <dl class="practical reveal">
        ${site.goodToKnow.practical.map((p) => `<div><dt class="mono ash">${esc(p.label)}</dt><dd>${txt(p.value)}</dd></div>`).join('\n        ')}
      </dl>
    </section>

    <!-- ─── SCÈNE 9 · OBJECTIONS + TRAÎNÉE D'IMAGES ─── -->
    <section class="scene s-final" id="final" data-pin="2.6">
      <div class="pin">
        <p class="final-text">
          <span class="fs" id="fs1">${esc(home.objections.items[0])}</span>
          <span class="fs" id="fs2">${esc(home.objections.items[1])}</span>
          <span class="fs" id="fs3">${esc(home.objections.items[2])}</span><br>
          <span class="fs" id="fs4">${esc(home.objections.finale)} <span class="pill" id="pillPhrase">${esc(home.objections.pill)}<svg class="pill-svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path id="pillPath" d="${BOX}"/></svg></span></span>
        </p>

        <div class="trail" id="trail" aria-hidden="true">
          ${C.trail.map((src, i) => `<img src="${src}" style="--tw:${TRAIL_W[i]}px" alt="" loading="lazy">`).join('\n          ')}
        </div>
      </div>
    </section>

    <!-- ─── FOOTER ─── -->
    ${footer(ctx, { kicker: home.sections.footerKicker, reassurance: home.sections.footerReassurance })}

  </main>

  <!-- ══════════ CHROME FIXE ══════════ -->
  ${dock(ctx, {
    links: [
      { href: '#travaux', label: home.nav.fares, attrs: 'data-nav' },
      { href: '#explorer', label: home.nav.stay, attrs: 'data-nav data-landing="0.8"' }
    ],
    cta: { href: `${prefix}/contact/#demande`, label: home.nav.cta }
  })}

  <script src="${prefix}/content.js"></script>
  <script src="/app.js"></script>
  <script src="/home.js"></script>
</body>
</html>
`;
}

export function contentJs(ctx, injection) {
  const C = siteContent(ctx);
  return `/* Généré par build/build.mjs depuis content/ — ne pas modifier ici.
   Les textes se changent dans content/${ctx.locale}/*.json. */
window.SITE_CONTENT = ${JSON.stringify(C, null, 2)};

${injection}`;
}
