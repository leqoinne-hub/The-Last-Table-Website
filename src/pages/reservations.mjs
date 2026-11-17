import { html, raw } from '../lib/html.mjs';
import { href, pageHeader, hoursRows, newsletterForm, bookButton } from '../lib/components.mjs';

export default {
  id: 'reserve',
  file: 'reservations.html',
  title: 'Reservations · The Last Table · Supper Club · Chicago',
  description: 'Book a table at The Last Table on OpenTable. The bar is held for walk-ins every night.',
  render(ctx) {
    const { reservations: r } = ctx.site;
    let widget;
    if (r.widgetHtml) {
      widget = html`<div class="booking booking--live">${raw(r.widgetHtml)}</div>`;
    } else if (r.url) {
      widget = html`<div class="booking">
          <p class="label">Reservations on ${r.provider}</p>
          <p class="booking__line">Pick a party size, date and time — every table is booked through ${r.provider}.</p>
          ${bookButton(ctx)}
        </div>`;
    } else {
      // No booking link yet: invite guests to the list instead of a dead button.
      widget = html`<div class="booking">
          <p class="label">Reservations on ${r.provider}</p>
          <p class="booking__line">Reservations open soon. Join the list and we'll let you know the moment they do.</p>
          ${newsletterForm(ctx, 'hero')}
        </div>`;
    }
    return html`
<section class="ground-ink">
  ${pageHeader({ kicker: 'Reservations', title: 'Hold a table.', lede: `Book through ${r.provider}. The bar is always first come, first served.` })}
  <div class="container page-body split split--start">
    ${widget}
    <div class="notes">
      <div class="note"><h2 class="label">Walk-ins</h2><p class="body">The bar is held for walk-ins every night.</p></div>
      <div class="note"><h2 class="label">Larger parties</h2><p class="body">Online booking is for parties of up to six. For seven or more, or a full buyout, tell us about the night on our <a class="inline-link" href="${href('private')}">private dining</a> page.</p></div>
      <div class="note"><h2 class="label">Booking policy</h2><p class="body">Tables open on ${r.provider} 30 days ahead. We hold your table for 15 minutes. Please cancel at least 24 hours ahead; late cancellations and no-shows may be charged $25 per guest. Fully booked? Ask ${r.provider} to notify you when a table opens.</p></div>
      <div class="note"><h2 class="label">Hours</h2>${hoursRows(ctx, 'hours-row')}</div>
    </div>
  </div>
</section>`;
  },
};
