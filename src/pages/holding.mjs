// The public site until launch: the coming-soon page alone, with no menu and no links into the rest
// of the site. Built in place of every other page while content/site.js → launch.holding is true.
import { html } from '../lib/html.mjs';
import { primaryMark, comingSoon, opensStrip, opensOn } from '../lib/components.mjs';
import { site } from '../../content/site.js';

function render(ctx) {
  const { site } = ctx;
  return html`
<section class="hero hero--holding ground-ink">
  <h1 class="hero__title">${primaryMark(ctx.primarySvg, site.flicker)}</h1>
  <div class="hero__soon">${comingSoon(ctx)}</div>
  ${opensStrip(site)}
</section>`;
}

export const holding = {
  id: 'home',
  file: 'index.html',
  holding: true,
  title: `The Last Table — ${site.launch.nowOpen ? 'Now Open' : site.launch.showDate ? `Opening ${site.launch.date}` : 'Coming Soon'} · Supper Club at State & Erie, Chicago`,
  description: site.launch.nowOpen
    ? `A supper club at State & Erie, Chicago, now open. Book your reservations at ${site.reservations.provider}.`
    : `A supper club at State & Erie, Chicago, ${site.launch.showDate ? `opening ${opensOn(site)}` : 'coming soon'}. Join the waitlist for first word.`,
  render,
};

// Served at every other address, so old links and guesses land on the countdown too.
export const holdingMissing = {
  ...holding,
  id: '404',
  file: '404.html',
  noindex: true,
  title: `${site.launch.nowOpen ? 'Now Open' : 'Coming Soon'} · The Last Table · Chicago`,
  description: site.launch.nowOpen ? 'The Last Table, a supper club at State & Erie, Chicago, is now open.'
    : site.launch.showDate ? `The Last Table opens at State & Erie, Chicago, on ${opensOn(site)}.` : 'The Last Table, a supper club at State & Erie, Chicago, is coming soon.',
};
