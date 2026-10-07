import { html, raw } from '../lib/html.mjs';
import { href, pageHeader, hoursRows, resyHref } from '../lib/components.mjs';

export default {
  id: 'reserve',
  file: 'reservations.html',
  title: 'Reservations · The Last Table · Supper Club · Chicago',
  description: 'Book a table at The Last Table on Resy. The bar is held for walk-ins every night.',
  render(ctx) {
    const { resy } = ctx.site;
    const widget = resy.embedHtml
      ? html`<div class="resy resy--live">${raw(resy.embedHtml)}</div>`
      : html`<div class="resy">
          <p class="label">Reservations on Resy</p>
          <p class="resy__line">Pick a party size, date and time — every table is booked through Resy.</p>
          <a class="btn btn--fill" href="${resyHref(ctx)}">Find a table on Resy</a>
        </div>`;
    return html`
<section class="ground-ink">
  ${pageHeader({ kicker: 'Reservations', title: 'Hold a table.', lede: 'Book through Resy. The bar is always first come, first served.' })}
  <div class="container page-body split split--start">
    ${widget}
    <div class="notes">
      <div class="note"><h2 class="label">Walk-ins</h2><p class="body">The bar is held for walk-ins every night.</p></div>
      <div class="note"><h2 class="label">Larger parties</h2><p class="body">Online booking is for parties of up to six. For seven or more, or a full buyout, tell us about the night on our <a class="inline-link" href="${href('private')}">private dining</a> page.</p></div>
      <div class="note"><h2 class="label">Booking policy</h2><p class="body">Tables open on Resy 30 days ahead. We hold your table for 15 minutes. Please cancel at least 24 hours ahead; late cancellations and no-shows may be charged $25 per guest. Fully booked? Join Resy Notify and we'll let you know when a table opens.</p></div>
      <div class="note"><h2 class="label">Hours</h2>${hoursRows(ctx, 'hours-row')}</div>
    </div>
  </div>
</section>`;
  },
};
