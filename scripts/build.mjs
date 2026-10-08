// Builds the static site into dist/ and refreshes the generated Squarespace files.
// Usage: node scripts/build.mjs   (SITE_URL=https://example.com overrides content/site.js → url)
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, statSync, copyFileSync, existsSync } from 'node:fs';
import { join, dirname, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

import { site } from '../content/site.js';
import { pages as menuPages } from '../content/menu-data.js';
import { events, sample as eventsSample } from '../content/events.js';
import { faq, policiesApproved } from '../content/faq.js';
import { roles, placeholder as rolesPlaceholder } from '../content/careers.js';
import { photos } from '../content/photos.js';
import { layout, resetIds } from '../src/lib/components.mjs';
import { menuPanel, menuTabs, TABS } from '../src/lib/menus.mjs';
import home from '../src/pages/home.mjs';
import menus from '../src/pages/menus.mjs';
import reservations from '../src/pages/reservations.mjs';
import privateDining from '../src/pages/private-dining.mjs';
import liveMusic from '../src/pages/live-music.mjs';
import ourStory from '../src/pages/our-story.mjs';
import giftCards from '../src/pages/gift-cards.mjs';
import press from '../src/pages/press.mjs';
import careers from '../src/pages/careers.mjs';
import contact from '../src/pages/contact.mjs';
import faqPage, { faqJsonLd } from '../src/pages/faq.mjs';
import { privacy, terms, notFound, draft as legalDraft } from '../src/pages/legal.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = join(ROOT, 'src', 'assets');
const OUT = join(ROOT, 'dist');
const SQS = join(ROOT, 'squarespace', 'generated');
const PAGES = [home, menus, reservations, privateDining, liveMusic, ourStory, giftCards, press, careers, contact, faqPage, privacy, terms, notFound];

const siteUrl = (process.env.SITE_URL || site.url).replace(/\/+$/, '');
const todos = new Set();
const todo = (msg) => todos.add(msg);

// ---------- helpers ----------

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}
const write = (file, data) => { mkdirSync(dirname(file), { recursive: true }); writeFileSync(file, data); };
const hash = (s) => createHash('sha256').update(s).digest('hex').slice(0, 10);
const jsonScript = (obj) => `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2).replace(/</g, '\\u003c')}\n</script>`;

function restaurantJsonLd(baseUrl, menuUrl) {
  const a = site.address;
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: site.name,
    description: 'Supper club with dinner, late cocktails and live music at State & Erie, Chicago.',
    url: baseUrl,
    email: site.email,
    ...(site.phone ? { telephone: site.phone } : {}),
    image: `${baseUrl}/assets/icons/og-image.png`,
    address: { '@type': 'PostalAddress', streetAddress: a.street, addressLocality: a.city, addressRegion: a.region, postalCode: a.postal, addressCountry: 'US' },
    servesCuisine: ['American', 'Supper Club', 'Cocktails'],
    priceRange: '$$$',
    acceptsReservations: site.resy.url || true,
    menu: menuUrl,
    sameAs: [site.instagram.url],
    openingHoursSpecification: site.hours.flatMap((h) => h.schema).map((s) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: s.days.length === 1 ? s.days[0] : s.days,
      opens: s.opens,
      closes: s.closes,
    })),
  };
}

// Sets <html class="js"> and the launch state before first paint, so the hero never flashes the wrong state.
const HEAD_SCRIPT = "(function(d){var c=d.documentElement;c.classList.add('js');try{var q=new URLSearchParams(location.search).get('launch'),m=c.getAttribute('data-launch-mode');if(q==='open'||q==='coming-soon')m=q;c.setAttribute('data-launch',m==='coming-soon'||(m==='auto'&&Date.now()<Date.parse(c.getAttribute('data-open-at')))?'coming-soon':'open')}catch(e){}})(document);";

// ---------- assets ----------

rmSync(OUT, { recursive: true, force: true });
for (const file of walk(ASSETS)) {
  if (extname(file) === '.md') continue;
  const dest = join(OUT, 'assets', relative(ASSETS, file));
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(file, dest);
}

const photoFiles = {};
const photoDir = join(ASSETS, 'photos');
const photoNames = existsSync(photoDir) ? readdirSync(photoDir) : [];
for (const key of Object.keys(photos)) {
  const found = ['.webp', '.avif', '.jpg', '.jpeg', '.png'].map((ext) => key + ext).find((n) => photoNames.includes(n));
  if (found) photoFiles[key] = found;
}

const downloads = {};
for (const [key, name] of Object.entries(site.downloads)) {
  const present = existsSync(join(ASSETS, 'downloads', name));
  downloads[key] = present ? `assets/downloads/${name}` : null;
  if (!present) todo(`Download: src/assets/downloads/${name} (its link stays hidden until the file is there)`);
}

// Press-kit logo ZIP, built from the vector package.
const { zip } = await import('./lib/zip.mjs');
const vectorDir = join(ASSETS, 'vector');
const logoZip = zip(walk(vectorDir).sort().map((f) => ({ name: `The Last Table logos/${relative(vectorDir, f)}`, data: readFileSync(f) })));
write(join(OUT, 'assets', 'downloads', 'tlt-logo-files.zip'), logoZip);
downloads.logoZip = 'assets/downloads/tlt-logo-files.zip';

// ---------- what's still needed ----------

if (!site.phone) todo('Phone number (content/site.js → phone)');
if (!site.resy.url) todo('Resy venue link (content/site.js → resy.url); until then the Reservations page invites guests to join the list');
if (!site.resy.embedHtml) todo('Resy booking-widget code, optional (content/site.js → resy.embedHtml)');
if (!site.toast.giftCardUrl) todo('Toast gift-card link (content/site.js → toast.giftCardUrl); until then the page says gift cards go on sale soon');
if (!site.forms.newsletter) todo('Newsletter form endpoint (content/site.js → forms.newsletter); until then, signups open the guest\'s email app');
if (!site.forms.inquiry) todo('Private dining form endpoint (content/site.js → forms.inquiry); until then, inquiries open the guest\'s email app');
if (eventsSample) todo('Live music schedule: content/events.js holds sample nights, kept off the site until `sample` is set to false');
if (rolesPlaceholder) todo('Open roles: content/careers.js holds placeholders; confirm with HR');
if (!policiesApproved) todo('Approve the draft house policies listed at the top of content/faq.js (also on Reservations and Live Music)');
if (legalDraft) todo('Have counsel review the draft Privacy and Terms pages (src/pages/legal.mjs)');

// ---------- pages ----------

const openAt = Date.parse(site.launch.openAt);
const base = {
  site, siteUrl, menuPages, events: eventsSample ? [] : events, faq, roles, photos, photoFiles, downloads, todo,
  year: new Date().getFullYear(),
  primarySvg: join(ASSETS, 'vector', 'primary', 'tlt-primary-linen-transparent.svg'),
  launchDefault: site.launch.mode === 'auto' ? (Date.now() < openAt ? 'coming-soon' : 'open') : site.launch.mode,
  headScript: HEAD_SCRIPT,
  assetVersion: {
    css: hash(readFileSync(join(ASSETS, 'css', 'site.css'))),
    js: hash(readFileSync(join(ASSETS, 'js', 'site.js'))),
  },
  restaurantJsonLd: jsonScript(restaurantJsonLd(siteUrl, `${siteUrl}/menus.html`)),
};

for (const page of PAGES) {
  resetIds();
  const ctx = { ...base, page: page.id };
  const body = page.render(ctx);
  let out = layout(ctx, { ...page, jsonld: page.jsonld ? jsonScript(page.jsonld(ctx)) : '' }, body);
  if (page.id === '404') {
    // Served at any missing path, so resolve its links from the site root.
    out = out.replace('<meta charset="utf-8">', `<meta charset="utf-8">\n<base href="${new URL(`${siteUrl}/`).pathname}">`);
  }
  write(join(OUT, page.file), out);
}

write(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.filter((p) => !p.noindex).map((p) => `  <url><loc>${siteUrl}/${p.file === 'index.html' ? '' : p.file}</loc></url>`).join('\n')}
</urlset>
`);
write(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
write(join(OUT, '.nojekyll'), '');

// ---------- Squarespace kit (always built for the production domain) ----------

const GEN = (what) => `<!-- The Last Table — ${what}\n     GENERATED from content/ by \`npm run build\`. Edit the content files, not this file. -->\n`;

const css = readFileSync(join(ASSETS, 'css', 'site.css'), 'utf8');
const menuCss = css.slice(css.indexOf('/* @menus-start */') + 18, css.indexOf('/* @menus-end */'))
  .replace(/(^|})\s*([^{}]+?)\s*\{/g, (m, close, sel) => `${close}\n${sel.split(',').map((s) => `.tlt-menus ${s.trim()}`).join(', ')} {`)
  .trim();

write(join(SQS, 'menus-code-block.html'), `${GEN('Menus. Paste into one Code block on the Menus page (display source off).\n     The DINNER · BAR · BRUNCH tabs need the script in header-injection.html. Deep links: ?tab=dinner|bar|brunch.')}<style>
.tlt-menus { color: #E3D6BC; }
${menuCss}
.tlt-menus .tlt-panel-title { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.tlt-menus .tlt-menu-panel { margin-top: 48px; }
.tlt-menus .tlt-group-title { font-family: 'Bodoni Moda', serif !important; font-style: italic; font-weight: 400 !important; letter-spacing: 0 !important; }
.tlt-menus .tlt-section-title { font-family: 'Limelight', serif !important; font-weight: 400 !important; }
.tlt-menus .tlt-menus-foot { margin: 72px 0 0; padding-top: 24px; border-top: 1px solid rgba(168,139,85,.45); font: 400 13px/1.6 'Jost', sans-serif; color: #8E846F; }
</style>
<div class="tlt-menus">
${menuTabs('dinner')}
${TABS.map((t, i) => menuPanel(menuPages, t.id, { selected: i === 0 }).toString().replace(' data-start-hidden', ' hidden')).join('\n')}
<p class="tlt-menus-foot">Please tell your captain about any allergies. Menus change with the season.</p>
</div>
`);

write(join(SQS, 'schema-jsonld.html'), `${GEN('structured data. Paste the Restaurant block into Settings → Advanced → Code Injection → Header.')}${jsonScript(restaurantJsonLd(site.url, `${site.url}/menus`))}

<!-- FAQPage: paste into the FAQ page's own Page Header Code Injection (not site-wide). -->
${jsonScript(faqJsonLd(faq))}
`);

const tonightJs = JSON.stringify(site.tonight);
write(join(SQS, 'header-injection.html'), `${GEN('Settings → Advanced → Code Injection → Header. Fonts, tonight\'s hours and the menu tabs.')}<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Limelight&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..700&family=Jost:wght@400;500;600&display=swap" rel="stylesheet">
<script>
document.addEventListener('DOMContentLoaded', function () {
  // Tonight's hours: fills any element with [data-tlt-tonight] (add data-caps for capitals).
  // Read on Chicago time; until 4 AM it is still last night.
  var TONIGHT = ${tonightJs};
  var dow = new Date(Date.now() - 4 * 36e5).getDay();
  try {
    var wd = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', weekday: 'short' }).format(new Date(Date.now() - 4 * 36e5));
    dow = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(wd);
  } catch (e) {}
  document.querySelectorAll('[data-tlt-tonight]').forEach(function (el) {
    el.textContent = el.hasAttribute('data-caps') ? TONIGHT[dow].toUpperCase() : TONIGHT[dow];
  });

  // Menu tabs: .tlt-tabs [role=tab][data-panel] and .tlt-menu-panel[data-panel]. Reads ?tab= on load.
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tlt-tabs [role="tab"]'));
  if (!tabs.length) return;
  var ids = tabs.map(function (b) { return b.getAttribute('data-panel'); });
  var show = function (id, focus) {
    tabs.forEach(function (b) {
      var on = b.getAttribute('data-panel') === id;
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
      if (on && focus) b.focus();
    });
    document.querySelectorAll('.tlt-menu-panel').forEach(function (p) { p.hidden = p.getAttribute('data-panel') !== id; });
    try { history.replaceState(null, '', '?tab=' + id); } catch (e) {}
  };
  tabs.forEach(function (b, i) {
    b.addEventListener('click', function () { show(ids[i]); });
    b.addEventListener('keydown', function (e) {
      var next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
      if (next === undefined) return;
      e.preventDefault();
      show(ids[(next + tabs.length) % tabs.length], true);
    });
  });
  var q = new URLSearchParams(location.search).get('tab');
  if (ids.indexOf(q) > -1) show(q);
});
</script>
`);

// ---------- report ----------

console.log(`Built ${PAGES.length} pages into dist/ for ${siteUrl}`);
console.log('Refreshed squarespace/generated/ (menus-code-block, schema-jsonld, header-injection)');
if (todos.size) {
  const rank = (t) => (t.startsWith('Photo') ? 2 : t.startsWith('Download') ? 1 : 0);
  console.log(`\nStill needed before launch (${todos.size}):`);
  for (const t of [...todos].sort((a, b) => rank(a) - rank(b))) console.log(`  · ${t}`);
}
