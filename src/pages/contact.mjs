import { html } from '../lib/html.mjs';
import { pageHeader, hoursRows, mailHref } from '../lib/components.mjs';

export function telHref(phone) {
  const d = phone.replace(/\D/g, '');
  return `tel:+${d.length === 10 ? `1${d}` : d}`;
}

export default {
  id: 'contact',
  file: 'contact.html',
  title: 'Hours & Contact · The Last Table · Supper Club · Chicago',
  description: 'Hours, directions and contact for The Last Table, 663 N. State St at State & Erie, Chicago.',
  render(ctx) {
    const { site } = ctx;
    const a = site.address;
    return html`
<section class="ground-ink">
  ${pageHeader({ kicker: 'Hours & Contact', title: `${a.streetLong}.` })}
  <div class="container page-body split split--320 split--start">
    <div class="contact-info">
      <div><h2 class="label">Hours</h2>${hoursRows(ctx, 'hours-row', 'hours-row--ruled')}</div>
      <div><h2 class="label">Getting here</h2><p class="body">${a.street}, ${a.city}, at the corner of ${a.cross}. Valet and parking details coming soon. The nearest L stop is Grand on the Red Line, two blocks south.</p></div>
      <div><h2 class="label">Call</h2><p>${site.phone ? html`<a href="${telHref(site.phone)}">${site.phone}</a>` : html`<span class="body">Phone line to come</span>`}</p></div>
      <div><h2 class="label">Write to us</h2><p><a href="${mailHref(ctx)}">${site.email}</a><br><a href="${site.instagram.url}">@${site.instagram.handle}</a></p></div>
      <div><h2 class="label">Private events</h2><p><a href="${mailHref(ctx, 'Private event', site.eventsEmail)}">${site.eventsEmail}</a></p></div>
    </div>
    <div class="map">
      <iframe src="${a.mapEmbed}" title="Map: ${a.street}, ${a.city}, ${a.region} ${a.postal}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      <div class="map__bar">
        <span class="map__label">${a.street}, ${a.city} ${a.region} ${a.postal}</span>
        <a class="btn btn--sm btn--outline" href="${a.maps}">Get directions</a>
      </div>
    </div>
  </div>
</section>`;
  },
};
