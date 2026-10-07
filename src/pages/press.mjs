import { html } from '../lib/html.mjs';
import { pageHeader, mailHref } from '../lib/components.mjs';

export default {
  id: 'press',
  file: 'press.html',
  title: 'Press · The Last Table · Supper Club · Chicago',
  description: 'Press kit and fact sheet for The Last Table, a supper club at 663 N. State St, Chicago.',
  render(ctx) {
    const { site } = ctx;
    const a = site.address;
    const kit = [
      { label: 'Logo files (SVG)', kind: 'ZIP', href: ctx.downloads.logoZip },
      { label: 'Dinner menu', kind: 'PDF', href: ctx.downloads.dinnerMenu },
      { label: 'Bar menu', kind: 'PDF', href: ctx.downloads.barMenu },
      { label: 'Brand identity', kind: 'PDF', href: ctx.downloads.brandIdentity },
    ].filter((k) => k.href);
    const facts = [
      ['Concept', 'Supper club · cocktails · live music'],
      ['Address', `${a.street}, ${a.city}, ${a.region} ${a.postal}`],
      ['Hours', site.hoursShort],
      ['Owner', site.owner],
      [site.founder.title, site.founder.name],
      ['Reservations', 'Resy'],
      ['Press contact', html`<a href="${mailHref(ctx, 'Press')}">${site.email}</a>`],
    ];
    return html`
<section class="ground-linen">
  ${pageHeader({ kicker: 'Press', title: 'For the press.', lede: 'Logos, menus and the facts. For interviews and visits, write to us.', rule: 'ink' })}
  <div class="container page-body split split--start">
    <div>
      <h2 class="h2 h2--sm">Press kit</h2>
      <ul class="kit">${kit.map((k) => html`<li><a href="${k.href}" download><span>${k.label}</span><span class="kit__kind">${k.kind}</span></a></li>`)}</ul>
    </div>
    <div>
      <h2 class="h2 h2--sm">Fact sheet</h2>
      <dl class="facts">${facts.map(([k, v]) => html`<div class="facts__row"><dt>${k}</dt><dd>${v}</dd></div>`)}</dl>
    </div>
  </div>
</section>`;
  },
};
