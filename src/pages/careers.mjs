import { html } from '../lib/html.mjs';
import { pageHeader, mailHref } from '../lib/components.mjs';

export default {
  id: 'careers',
  file: 'careers.html',
  title: 'Careers · The Last Table · Supper Club · Chicago',
  description: 'Join the opening team at The Last Table, a supper club in Chicago. Front-of-house, bar and kitchen roles.',
  render(ctx) {
    return html`
<section class="ground-ink">
  ${pageHeader({ kicker: 'Careers', title: 'Join the opening team.', lede: "We train people to take care of people. If that's how you like to work, we'd like to meet you.", width: 'container--1100' })}
  <div class="container container--1100 page-body page-body--tight">
    <ul class="roles">
      ${ctx.roles.map((r) => html`<li class="role">
        <div><h2 class="role__title">${r.title}</h2><p class="role__meta">${r.meta}</p></div>
        <a class="btn btn--sm btn--outline" href="${r.apply || mailHref(ctx, `Application — ${r.title}`)}" aria-label="Apply for ${r.title}">Apply</a>
      </li>`)}
    </ul>
  </div>
</section>`;
  },
};
