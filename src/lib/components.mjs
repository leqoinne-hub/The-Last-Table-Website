// Shared page parts: document shell, header, drawer, footer, logo marks, photos and repeated blocks.
import { readFileSync } from 'node:fs';
import { html, raw } from './html.mjs';

export const NAV = [
  { id: 'home', file: 'index.html', label: 'Home' },
  { id: 'menus', file: 'menus.html', label: 'Menus' },
  { id: 'reserve', file: 'reservations.html', label: 'Reservations' },
  { id: 'private', file: 'private-dining.html', label: 'Private Dining' },
  { id: 'music', file: 'live-music.html', label: 'Live Music' },
  { id: 'story', file: 'our-story.html', label: 'Our Story' },
  { id: 'gift', file: 'gift-cards.html', label: 'Gift Cards' },
  { id: 'press', file: 'press.html', label: 'Press' },
  { id: 'careers', file: 'careers.html', label: 'Careers' },
  { id: 'contact', file: 'contact.html', label: 'Hours & Contact' },
  { id: 'faq', file: 'faq.html', label: 'FAQ' },
];
export const href = (id) => NAV.find((n) => n.id === id).file;

// ---------- Logo marks ----------

let uid = 0;
export const resetIds = () => { uid = 0; };

// The bulb device, drawn inline so the filament can flicker (footer and gift card).
export function bulb(width, flicker) {
  const id = `tlt-glow-${++uid}`;
  const h = Math.round((width * 44) / 80);
  return raw(`<svg class="bulb${flicker ? ' flicker' : ''}" viewBox="0 0 80 44" width="${width}" height="${h}" aria-hidden="true" focusable="false">` +
    `<defs><radialGradient id="${id}"><stop offset="0" stop-color="#C4732E" stop-opacity="0.55"/><stop offset="1" stop-color="#C4732E" stop-opacity="0"/></radialGradient></defs>` +
    (flicker ? `<circle class="tlt-glow" cx="44" cy="22" r="30" fill="url(#${id})"/>` : '') +
    '<rect x="0" y="14" width="18" height="16" rx="1.5" fill="#A88B55"/>' +
    '<path d="M5,14 V30 M10,14 V30 M15,14 V30" stroke="#5E4C2C" stroke-width="1" opacity="0.9"/>' +
    '<path d="M18,16 C28,15 34,7 46,3.5 A19,19 0 1 1 46,40.5 C34,37 28,29 18,28 Z" fill="none" stroke="#E3D6BC" stroke-width="1.3" stroke-linejoin="round"/>' +
    '<path d="M22,19 L40,18 M22,25 L40,26" stroke="#E3D6BC" stroke-width="0.9" opacity="0.7"/>' +
    '<path class="tlt-filament" d="M40,18 C56,12 58,32 40,26" fill="none" stroke="#7A3E1C" stroke-width="1.6" stroke-linecap="round"/>' +
    '</svg>');
}

// The primary lockup, inlined (an <img> can't animate the filament).
export function primaryMark(svgPath, flicker) {
  let t = readFileSync(svgPath, 'utf8')
    .replace(/<metadata>[\s\S]*?<\/metadata>/, '')
    .replace(/\s*xmlns:c2pa="[^"]*"/, '')
    .replace('width="1526" height="432"', `width="100%" class="hero__mark${flicker ? ' flicker' : ''}" role="img" aria-label="The Last Table — Supper Club, Chicago" focusable="false"`);
  if (flicker) {
    t = t.replace('<g id="bulb"', '<defs><radialGradient id="tlt-hero-glow"><stop offset="0" stop-color="#C4732E" stop-opacity="0.6"/><stop offset="1" stop-color="#C4732E" stop-opacity="0"/></radialGradient></defs><g id="bulb"')
      .replace(/(<g id="bulb"[^>]*>)/, '$1<circle class="tlt-glow" cx="44" cy="22" r="30" fill="url(#tlt-hero-glow)"/>')
      .replace('id="filament"', 'id="filament" class="tlt-filament"');
  }
  return raw(t.trim());
}

// ---------- Photos ----------

// A real photo when src/assets/photos/<key>.* exists, otherwise a placeholder naming the shot.
export function photo(ctx, key, cls = '') {
  const p = ctx.photos[key];
  const file = ctx.photoFiles[key];
  if (file) {
    return html`<img class="photo ${cls}" src="assets/photos/${file}" alt="${p.alt}" loading="lazy" decoding="async" style="aspect-ratio:${p.ratio}">`;
  }
  ctx.todo(`Photo: ${p.label.replace(/^Photo · /, '')} (src/assets/photos/${key}.webp)`);
  return html`<div class="photo photo--placeholder ${cls}" style="aspect-ratio:${p.ratio}" aria-hidden="true"><span>${p.label}</span></div>`;
}

// ---------- Repeated blocks ----------

export function pageHeader({ kicker, title, lede, width = '', rule = 'brass' }) {
  return html`<div class="container ${width} page-header page-header--${rule}">
    <p class="kicker">${kicker}</p>
    <h1 class="h1">${title}</h1>
    ${lede ? html`<p class="lede">${lede}</p>` : ''}
  </div>`;
}

export function hoursRows(ctx, cls) {
  return ctx.site.hours.map((h) => html`<div class="${cls}"><span class="${cls}-days">${h.days}</span><span class="${cls}-time">${h.time}</span></div>`);
}

export function tonightDefault(ctx) {
  return ctx.site.tonight[1];
}

export function mailHref(ctx, subject) {
  return `mailto:${ctx.site.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
}

export function resyHref(ctx) {
  return ctx.site.resy.url || 'https://resy.com';
}

let formN = 0;
export function newsletterForm(ctx, variant) {
  const n = ++formN;
  const action = ctx.site.forms.newsletter || mailHref(ctx, 'Join the list');
  const hero = variant === 'hero';
  return html`<form class="signup signup--${variant}" data-form="newsletter" action="${action}" method="post"${ctx.site.forms.newsletter ? '' : raw(' enctype="text/plain"')} novalidate>
    <div class="signup__row">
      <label class="visually-hidden" for="nl-${n}">${hero ? 'Email' : 'Email for newsletter'}</label>
      <input id="nl-${n}" type="email" name="email" placeholder="Your email" autocomplete="email" required aria-describedby="nl-${n}-err">
      <input class="hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true">
      <button type="submit">${hero ? 'Join the list' : 'Join'}</button>
    </div>
    <p class="form-error" id="nl-${n}-err" hidden>Please add a valid email.</p>
    <p class="signup__done" role="status" data-done="${hero ? "You're on the list. We'll save you a seat." : "You're on the list."}"></p>
    ${hero ? html`<p class="fine">News and invitations only. Unsubscribe anytime.</p>` : ''}
  </form>`;
}

const DOW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function eventRows(ctx, variant) {
  const home = variant === 'home';
  return ctx.events.map((ev, i) => {
    const d = new Date(`${ev.date}T12:00:00Z`);
    const dow = DOW[d.getUTCDay()];
    const label = `${MON[d.getUTCMonth()]} ${d.getUTCDate()}`;
    return html`<li class="event${home && i >= 3 ? ' is-extra' : ''}" data-date="${ev.date}">
      <time class="event__date" datetime="${ev.date}"><span class="event__day">${String(d.getUTCDate()).padStart(2, '0')}</span><span class="event__mon">${MON[d.getUTCMonth()]}</span></time>
      <div class="event__body">
        <p class="event__when">${dow} · ${ev.time}</p>
        <h3 class="event__title">${ev.title}</h3>
        <p class="event__who">${ev.who}</p>
      </div>
      <a class="btn btn--sm ${home ? 'btn--outline-ink' : 'btn--outline'}" href="${href('reserve')}" aria-label="Reserve for ${ev.title}, ${dow} ${label}">Reserve</a>
    </li>`;
  });
}

// ---------- Document shell ----------

function header(ctx) {
  return html`<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="site-header__inner">
    <a class="site-header__logo" href="index.html"><img src="assets/vector/horizontal/tlt-horizontal-linen-transparent.svg" alt="The Last Table — home" width="181" height="28"></a>
    <div class="site-header__actions">
      <a class="btn btn--outline btn--header" href="${href('reserve')}">Reserve</a>
      <button class="burger" type="button" aria-label="Open navigation" aria-haspopup="dialog" aria-controls="site-drawer" aria-expanded="false" data-drawer-open><span></span><span></span><span></span></button>
    </div>
  </div>
</header>
<dialog class="drawer" id="site-drawer" aria-label="Site navigation">
  <div class="drawer__panel">
    <div class="drawer__head">
      <span class="drawer__brand">The Last Table</span>
      <button class="drawer__close" type="button" aria-label="Close navigation" data-drawer-close>×</button>
    </div>
    <nav aria-label="Site">
      <ul class="drawer__links">
        ${NAV.map((n) => html`<li><a href="${n.file}"${n.id === ctx.page ? raw(' aria-current="page"') : ''}>${n.label}</a></li>`)}
      </ul>
    </nav>
    <p class="drawer__foot">${ctx.site.address.street} · ${ctx.site.address.city}<br>Tonight <span data-tonight>${tonightDefault(ctx)}</span><br><a href="${mailHref(ctx)}">${ctx.site.email}</a></p>
  </div>
</dialog>`;
}

function footer(ctx) {
  const a = ctx.site.address;
  return html`<footer class="site-footer">
  <div class="site-footer__cols">
    <div class="site-footer__brand">
      <img src="assets/vector/stacked/tlt-stacked-linen-transparent.svg" alt="The Last Table" width="180" height="149" loading="lazy">
      <p>${a.street}<br>${a.city}, ${a.region} ${a.postal}<br><a href="${mailHref(ctx)}">${ctx.site.email}</a></p>
    </div>
    <div>
      <h2 class="label">Hours</h2>
      ${hoursRows(ctx, 'foot-hours')}
    </div>
    <div>
      <h2 class="label">The List</h2>
      <p class="site-footer__list">The late set, new menus, first word on special nights.</p>
      ${newsletterForm(ctx, 'footer')}
      <p class="fine">News and invitations only. Unsubscribe anytime.</p>
    </div>
    <div>
      <h2 class="label">Visit</h2>
      <nav aria-label="Footer">
        <ul class="site-footer__nav">${NAV.map((n) => html`<li><a href="${n.file}">${n.label}</a></li>`)}</ul>
      </nav>
    </div>
  </div>
  <div class="site-footer__base">
    <div class="site-footer__rule"><span></span>${bulb(40, ctx.site.flicker)}</div>
    <div class="site-footer__legal">
      <span>© ${ctx.year} The Last Table · ${ctx.site.owner}</span>
      <span class="site-footer__legal-links"><a href="faq.html#accessibility">Accessibility</a><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a></span>
      <span><a href="${ctx.site.instagram.url}">Instagram</a> · thelasttablechicago.com</span>
    </div>
  </div>
</footer>`;
}

export function layout(ctx, page, body) {
  const { site } = ctx;
  const url = `${ctx.siteUrl}/${page.file === 'index.html' ? '' : page.file}`;
  const og = `${ctx.siteUrl}/assets/icons/og-image.png`;
  const config = {
    openAt: site.launch.openAt,
    tonight: site.tonight,
    email: site.email,
    forms: site.forms,
  };
  const ga = site.googleAnalyticsId;
  return `<!doctype html>
<html lang="en" data-launch-mode="${site.launch.mode}" data-open-at="${site.launch.openAt}" data-launch="${ctx.launchDefault}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${html`${page.title}`}</title>
<meta name="description" content="${html`${page.description}`}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#14120E">
<meta property="og:type" content="website">
<meta property="og:site_name" content="The Last Table">
<meta property="og:title" content="${html`${page.title}`}">
<meta property="og:description" content="${html`${page.description}`}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="The Last Table — Supper Club, Chicago">
<meta name="twitter:card" content="summary_large_image">
${page.noindex ? '<meta name="robots" content="noindex">\n' : ''}<link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
<link rel="icon" href="assets/icons/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="assets/icons/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Limelight&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..700&family=Jost:wght@400;500;600&display=swap">
<link rel="stylesheet" href="assets/css/site.css?v=${ctx.assetVersion.css}">
<script>${ctx.headScript}</script>
<script type="application/json" id="tlt-config">${JSON.stringify(config).replace(/</g, '\\u003c')}</script>
<script src="assets/js/site.js?v=${ctx.assetVersion.js}" defer></script>
${ctx.restaurantJsonLd}${page.jsonld ? `\n${page.jsonld}` : ''}${ga ? `
<script async src="https://www.googletagmanager.com/gtag/js?id=${ga}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga}');</script>` : ''}
</head>
<body>
${header(ctx)}
<main id="main" tabindex="-1">
${body}
</main>
${footer(ctx)}
</body>
</html>
`;
}
