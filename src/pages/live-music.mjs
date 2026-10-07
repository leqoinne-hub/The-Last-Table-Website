import { html } from '../lib/html.mjs';
import { pageHeader, eventRows } from '../lib/components.mjs';

export default {
  id: 'music',
  file: 'live-music.html',
  title: 'Live Music · The Last Table · Supper Club · Chicago',
  description: 'Live music at The Last Table, Chicago. The band starts when dinner winds down. No cover for dinner guests.',
  render(ctx) {
    const { site } = ctx;
    return html`
<section class="ground-ink">
  ${pageHeader({ kicker: 'Live music', title: 'Stay for the set.', lede: 'The band starts when dinner winds down. No cover for dinner guests.', width: 'container--1100' })}
  <div class="container container--1100 page-body page-body--tight">
    <ul class="events events--full">${eventRows(ctx, 'full')}</ul>
    <p class="events__empty"${ctx.events.length ? html` hidden` : ''}>The next lineup is on its way. Follow <a class="inline-link" href="${site.instagram.url}">@${site.instagram.handle}</a> for first word.</p>
  </div>
</section>`;
  },
};
