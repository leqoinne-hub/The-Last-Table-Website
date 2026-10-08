import { html } from '../lib/html.mjs';
import { href, primaryMark, photo, newsletterForm, eventRows, tonightDefault } from '../lib/components.mjs';

export default {
  id: 'home',
  file: 'index.html',
  title: 'The Last Table — Supper Club & Cocktails at State & Erie, Chicago',
  description: 'A supper club at State & Erie, Chicago: dinner from four, cocktails that run late, and a live set when the plates clear.',
  render(ctx) {
    const { site } = ctx;
    // The "From the room" grid shows only real photos; until then the section is the heading and handle.
    const igTiles = [1, 2, 3, 4, 5, 6].map((i) => `ig-${i}`).filter((k) => ctx.photoFiles[k]);
    if (igTiles.length < 6) ctx.todo('Photos for the "From the room" grid on Home (src/assets/photos/ig-1.webp … ig-6.webp); only added ones show');
    return html`
<section class="hero ground-ink">
  <h1 class="hero__title">${primaryMark(ctx.primarySvg, site.flicker)}</h1>
  <div class="btn-row btn-row--center only-open">
    <a class="btn btn--fill" href="${href('reserve')}">Reserve a table</a>
    <a class="btn btn--ghost" href="${href('menus')}">See the menus</a>
  </div>
  <div class="hero__soon only-coming-soon">
    <p class="hero__soon-kicker">Coming soon</p>
    <div class="countdown" role="timer" aria-label="Countdown to opening" data-countdown>
      ${[['d', 'Days'], ['h', 'Hours'], ['m', 'Minutes'], ['s', 'Seconds']].map(([u, l]) => html`<div class="countdown__cell"><span class="countdown__num" data-unit="${u}">00</span><span class="countdown__label">${l}</span></div>`)}
    </div>
    <p class="hero__soon-line">Doors open to the public November 17 at 4 PM. Join the list for first word.</p>
    ${newsletterForm(ctx, 'hero')}
  </div>
  <p class="hero__strip"><span class="hero__strip-rule"></span><span class="only-coming-soon">${site.launch.label} · ${site.address.cross}</span><span class="only-open">Tonight · <span data-tonight>${tonightDefault(ctx)}</span></span><span class="hero__strip-rule"></span></p>
</section>

<section class="ground-linen">
  <div class="container section--idea split">
    <div>
      <p class="kicker">${site.address.cross} · Chicago</p>
      <h2 class="h2 h2--idea">The last seating gets the same care as the first.</h2>
      <p class="lede lede--section">Every great Chicago night has a last table — the one still laughing when the chairs go up.</p>
      <p class="body body--idea">We built a supper club around it. Dinner from four, cocktails that run late, a live set when the plates clear, and a room lit low enough that the city outside goes quiet.</p>
      <a class="link-cta" href="${href('story')}">Read our story</a>
    </div>
    ${photo(ctx, 'dining-room')}
  </div>
</section>

<section class="ground-ink">
  <div class="container section">
    <h2 class="kicker kicker--center">The evening</h2>
    <div class="cards">
      <article class="card">
        <p class="card__time">From 4 PM</p>
        <h3 class="card__title">Dinner</h3>
        <p class="card__desc">Tartare on brioche, handmade pasta, a dry-aged strip with bone marrow au poivre.</p>
        <a class="link-cta" href="${href('menus')}?tab=dinner">The dinner menu</a>
      </article>
      <article class="card card--forest">
        <p class="card__time">Late into the night</p>
        <h3 class="card__title">The Bar</h3>
        <p class="card__desc">Classics, reimagined for the whole evening — and a final pour that comes in two acts.</p>
        <a class="link-cta" href="${href('menus')}?tab=bar">The bar menu</a>
      </article>
      <article class="card">
        <p class="card__time">Late</p>
        <h3 class="card__title">Live music</h3>
        <p class="card__desc">The band starts when dinner winds down. Stay for the set.</p>
        <a class="link-cta" href="${href('music')}">This week's calendar</a>
      </article>
    </div>
  </div>
</section>

<section class="ground-linen">
  <div class="container container--1000 section">
    <div class="list-head list-head--ruled">
      <h2 class="h2 h2--list">On stage this week</h2>
      <a class="link-cta" href="${href('music')}">Full calendar</a>
    </div>
    <ul class="events events--home" data-limit="3">${eventRows(ctx, 'home')}</ul>
    <p class="events__empty"${ctx.events.length ? html` hidden` : ''}>The next lineup is on its way. Follow <a class="link-cta" href="${site.instagram.url}">@${site.instagram.handle}</a> for first word.</p>
  </div>
</section>

<section class="ground-forest">
  <div class="container section split">
    ${photo(ctx, 'private-table', 'photo--framed')}
    <div>
      <p class="kicker">Private dining &amp; events</p>
      <h2 class="h2">Close the doors.</h2>
      <p class="lede lede--section">Birthdays, rehearsal dinners, a quiet buyout on a Tuesday. Tell us the night and we'll build it around you.</p>
      <a class="btn btn--fill" href="${href('private')}">Plan an event</a>
    </div>
  </div>
</section>

<section class="ground-ink">
  <div class="container section">
    <div class="list-head">
      <h2 class="h2 h2--ig">From the room</h2>
      <a class="link-cta link-cta--brass" href="${site.instagram.url}">@${site.instagram.handle}</a>
    </div>
    ${igTiles.length ? html`<div class="ig-grid">${igTiles.map((k) => photo(ctx, k, 'photo--tile'))}</div>` : ''}
  </div>
</section>`;
  },
};
