// Blocs partagés entre les pages : barre de navigation, pied de page,
// formulaire de demande, cartes des fare, tableau comparatif, avis, carte.
import { esc, txt, isTbc } from '../lib.mjs';

/* ─── barre flottante (même balisage que le template, liens de pages) ─── */
export function dock(ctx, { links, cta }) {
  const { site, t, prefix } = ctx;
  return `<header class="dock" id="dock">
    <a class="dock-wordmark" href="${prefix}/" data-nav>${esc(site.brand.name)}</a>
    <nav class="dock-nav" aria-label="${esc(t('nav.main'))}">
      ${links.map((l) => `<a class="dock-link mono" href="${l.href}"${l.attrs ? ' ' + l.attrs : ''}>${esc(l.label)}</a>`).join('\n      ')}
    </nav>
    <a class="dock-cta mono" href="${cta.href}">${esc(cta.label)}</a>
  </header>`;
}

/* ─── pied de page (classes du template : app.js anime le nom géant) ─── */
export function footer(ctx, { kicker, reassurance }) {
  const { site, t, fares, prefix } = ctx;
  const email = site.contact.email;
  const mail = isTbc(email)
    ? `<a class="footer-mail reveal" href="${prefix}/contact/"><span class="footer-mail-text">email ${txt(email)}</span></a>`
    : `<a class="footer-mail reveal" href="mailto:${esc(email)}"><span class="footer-mail-text">${esc(email)}</span></a>`;
  const socials = [{ label: 'AIRBNB ↗', url: site.host.airbnbProfile }];
  if (site.contact.whatsapp) socials.unshift({ label: 'WHATSAPP ↗', url: `https://wa.me/${site.contact.whatsapp}` });
  return `<footer class="footer" id="contact">
      <p class="footer-kicker mono ash reveal">${esc(kicker)}</p>
      ${mail}
      <p class="footer-reassurance mono ash reveal">${esc(reassurance)}</p>
      <p class="footer-cta reveal"><a class="btn btn-primary" href="${prefix}/contact/#demande">${esc(t('footer.request'))}</a></p>
      <nav class="footer-links reveal" aria-label="${esc(t('footer.fares'))}">
        ${fares.map((f) => `<a href="${prefix}/${f.slug}/">${esc(f.name)}</a>`).join('\n        ')}
        <a href="${prefix}/contact/">${esc(t('nav.contact'))}</a>
      </nav>
      <h2 class="footer-name" id="footerName" aria-label="${esc(site.brand.name)}">${esc(site.brand.name)}</h2>
      <div class="footer-bottom">
        <p class="mono ash">${esc(site.brand.copyright)}</p>
        <p class="mono">${socials.map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join('&nbsp;&nbsp;&nbsp;')}</p>
        <p class="mono ash">${esc(site.brand.registrationLabel)} ${esc(site.brand.registration)}</p>
      </div>
    </footer>`;
}

/* ─── étiquettes d'un fare ─── */
export function fareTags(ctx, f) {
  const { t } = ctx;
  return `<ul class="tags">
        <li class="tag ${f.pool ? 'tag-pool' : 'tag-plain'}">${esc(f.pool ? t('fare.pool') : t('fare.noPool'))}</li>
        <li class="tag">${esc(t('fare.guests', { n: f.capacity }))}</li>
        <li class="tag">${esc(t('fare.bedroom'))}</li>
      </ul>`;
}

export function rating(ctx, f) {
  const { t } = ctx;
  if (!f.rating) return `<span class="rating mono">${esc(f.ratingNote || t('compare.newListing'))}</span>`;
  return `<span class="rating mono"><svg class="star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"/></svg>${esc(f.rating)} · ${esc(t('fare.reviewsCount', { n: f.reviewsCount }))}</span>`;
}

/* ─── cartes des trois fare ─── */
export function fareCards(ctx, list, { headingTag = 'h3' } = {}) {
  const { t, img, prefix } = ctx;
  return `<div class="fare-cards">
    ${list.map((f, i) => `<article class="fare-card reveal" style="--i:${i}">
      <a class="fare-card-media" href="${prefix}/${f.slug}/" tabindex="-1" aria-hidden="true">${img.img(f.cardPhoto, { sizes: '(max-width: 900px) 100vw, 33vw', alt: '' })}</a>
      <div class="fare-card-body">
        <${headingTag} class="fare-card-title"><a href="${prefix}/${f.slug}/">${esc(f.name)}</a></${headingTag}>
        <p class="fare-card-tagline">${esc(f.tagline)}</p>
        <p class="fare-card-short">${esc(f.short)}</p>
        ${fareTags(ctx, f)}
        <a class="btn btn-line" href="${prefix}/${f.slug}/">${esc(t('fare.discover'))} <span aria-hidden="true">→</span><span class="sr-only"> ${esc(f.name)}</span></a>
      </div>
    </article>`).join('\n    ')}
  </div>`;
}

/* ─── tableau comparatif ─── */
export function compareTable(ctx) {
  const { t, fares, compare, prefix } = ctx;
  const cell = (f, key) => {
    switch (key) {
      case 'pool': return f.pool ? `<span class="yes">${esc(t('compare.yes'))}</span>` : `<span class="no">${esc(t('compare.no'))}</span>`;
      case 'capacity': return esc(String(f.capacity));
      case 'beds': return esc(compare.beds);
      case 'outdoorShort': return esc(compare.outdoorShort[f.id]);
      case 'rating': return f.rating ? `${esc(f.rating)}<span class="ash"> / 5</span>` : `<span class="ash">${esc(t('compare.newListing'))}</span>`;
      case 'price': return txt(f.price);
      default: return '';
    }
  };
  return `<div class="compare reveal">
    <table>
      <caption class="sr-only">${esc(compare.title)}</caption>
      <thead><tr><th scope="col"><span class="sr-only">${esc(t('compare.fare'))}</span></th>${fares.map((f) => `<th scope="col"><a href="${prefix}/${f.slug}/">${esc(f.name)}</a></th>`).join('')}</tr></thead>
      <tbody>
        ${compare.rows.map((r) => `<tr><th scope="row">${esc(r.label)}</th>${fares.map((f) => `<td>${cell(f, r.key)}</td>`).join('')}</tr>`).join('\n        ')}
      </tbody>
    </table>
  </div>`;
}

/* ─── avis ─── */
export function reviewCards(ctx, list, { showFare = true } = {}) {
  const { t, reviews, fares } = ctx;
  const name = (id) => fares.find((f) => f.id === id)?.name || '';
  return `<div class="reviews">
    ${list.map((r, i) => `<figure class="review reveal" style="--i:${i % 3}">
      <blockquote><p>${esc(r.text)}</p></blockquote>
      <figcaption><span class="review-author">${esc(r.author)}</span><span class="mono ash">${showFare ? esc(name(r.fare)) + ' — ' : ''}${esc(t('reviews.via', { source: reviews.source }))}, ${esc(reviews.collected)}</span></figcaption>
    </figure>`).join('\n    ')}
  </div>`;
}

/* ─── carte OpenStreetMap (zone approximative) ─── */
export function map(ctx) {
  const { site, t } = ctx;
  const { lat, lng } = site.location;
  const d = 0.018;
  const bbox = [lng - d * 1.6, lat - d, lng + d * 1.6, lat + d].map((n) => n.toFixed(4)).join('%2C');
  return `<figure class="map reveal">
    <iframe title="${esc(t('location.mapTitle'))}" src="https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&amp;layer=mapnik" loading="lazy" referrerpolicy="no-referrer"></iframe>
    <figcaption class="mono ash">${esc(t('location.mapNote'))} <a href="https://www.openstreetmap.org/?mlat=${lat}&amp;mlon=${lng}#map=14/${lat}/${lng}" target="_blank" rel="noopener">${esc(t('location.mapLink'))} ↗</a></figcaption>
  </figure>`;
}

/* ─── formulaire de demande (Netlify Forms) ─── */
export function requestForm(ctx, { fareId = null, id = 'demande', title } = {}) {
  const { t, fares, config, prefix } = ctx;
  const opt = (value, label, sel) => `<option value="${esc(value)}"${sel ? ' selected' : ''}>${esc(label)}</option>`;
  return `<form class="request-form" name="${esc(config.formName)}" method="POST" action="${prefix}/merci/" data-netlify="true" netlify-honeypot="bot-field" novalidate data-form>
      <input type="hidden" name="form-name" value="${esc(config.formName)}">
      <p class="hp" aria-hidden="true"><label>${esc(t('form.honeypot'))} <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
      <div class="field field-full">
        <label for="${id}-fare">${esc(t('form.fare'))}</label>
        <select id="${id}-fare" name="fare" required>
          ${fares.map((f) => opt(f.name, `${f.name} — ${f.pool ? t('fare.pool') : t('fare.noPool')}`, f.id === fareId)).join('\n          ')}
          ${opt(t('form.fareAny'), t('form.fareAny'), !fareId)}
        </select>
      </div>
      <div class="field">
        <label for="${id}-arrival">${esc(t('form.arrival'))}</label>
        <input id="${id}-arrival" name="arrivee" type="date" required data-arrival>
      </div>
      <div class="field">
        <label for="${id}-departure">${esc(t('form.departure'))}</label>
        <input id="${id}-departure" name="depart" type="date" required data-departure>
      </div>
      <p class="form-nights mono ash field-full" data-nights aria-live="polite"></p>
      <p class="form-warn field-full" data-busy-warn hidden>${esc(t('form.warnBusy'))}</p>
      <div class="field">
        <label for="${id}-guests">${esc(t('form.guests'))}</label>
        <select id="${id}-guests" name="voyageurs" required>
          ${[1, 2, 3, 4].map((n) => opt(String(n), String(n), n === 2)).join('')}
        </select>
      </div>
      <div class="field">
        <label for="${id}-name">${esc(t('form.name'))}</label>
        <input id="${id}-name" name="nom" type="text" autocomplete="name" required>
      </div>
      <div class="field">
        <label for="${id}-email">${esc(t('form.email'))}</label>
        <input id="${id}-email" name="email" type="email" autocomplete="email" required>
      </div>
      <div class="field">
        <label for="${id}-phone">${esc(t('form.phone'))} <span class="ash">(${esc(t('form.optional'))})</span></label>
        <input id="${id}-phone" name="telephone" type="tel" autocomplete="tel" aria-describedby="${id}-phone-help">
        <small id="${id}-phone-help" class="help">${esc(t('form.phoneHelp'))}</small>
      </div>
      <div class="field field-full">
        <label for="${id}-message">${esc(t('form.message'))} <span class="ash">(${esc(t('form.optional'))})</span></label>
        <textarea id="${id}-message" name="message" rows="5" aria-describedby="${id}-message-help"></textarea>
        <small id="${id}-message-help" class="help">${esc(t('form.messageHelp'))}</small>
      </div>
      <p class="form-error field-full" data-form-error role="alert" hidden>${esc(t('form.errSend'))}</p>
      <div class="field-full form-actions">
        <button class="btn btn-primary" type="submit" data-submit>${esc(t('form.submit'))}</button>
      </div>
    </form>
    <div class="form-ok" data-form-ok hidden tabindex="-1">
      <p class="form-ok-title">${esc(t('form.okTitle'))}</p>
      <p>${esc(t('form.okText'))}</p>
      <button class="btn btn-line" type="button" data-form-again>${esc(t('form.okAgain'))}</button>
    </div>`;
}

/* libellés utilisés par pages.js (validation, calendrier) */
export function runtimeStrings(ctx) {
  const { t, ui } = ctx;
  const keys = Object.keys(ui).filter((k) => k.startsWith('form.') || k.startsWith('cal.') || k.startsWith('gallery.'));
  return `<script>window.I18N=${JSON.stringify({ locale: ui.locale, ...Object.fromEntries(keys.map((k) => [k, t(k)])) }).replace(/</g, '\\u003c')};</script>`;
}
