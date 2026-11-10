// The public site until launch: the coming-soon page alone, with no menu and no links into the rest
// of the site. Built in place of every other page while content/site.js → launch.holding is true.
import { html } from '../lib/html.mjs';
import { primaryMark, comingSoon, opensLabel, opensOn } from '../lib/components.mjs';
import { site } from '../../content/site.js';

function render(ctx) {
  const { site } = ctx;
  return html`
<section class="hero hero--holding ground-ink">
  <h1 class="hero__title">${primaryMark(ctx.primarySvg, site.flicker)}</h1>
  <div class="hero__soon">${comingSoon(ctx)}</div>
  <p class="hero__strip"><span class="hero__strip-rule"></span><span>${opensLabel(site)} · ${site.address.cross}</span><span class="hero__strip-rule"></span></p>
</section>`;
}

export const holding = {
  id: 'home',
  file: 'index.html',
  holding: true,
  title: `The Last Table — Opening ${site.launch.date} · Supper Club at State & Erie, Chicago`,
  description: `A supper club at State & Erie, Chicago, opening ${opensOn(site)}. Join the waitlist for first word.`,
  render,
};

// Served at every other address, so old links and guesses land on the countdown too.
export const holdingMissing = {
  ...holding,
  id: '404',
  file: '404.html',
  noindex: true,
  title: 'Coming Soon · The Last Table · Chicago',
  description: `The Last Table opens at State & Erie, Chicago, on ${opensOn(site)}.`,
};
