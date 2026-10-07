import { html, esc, raw } from '../lib/html.mjs';
import { pageHeader } from '../lib/components.mjs';

export function faqJsonLd(faq) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export default {
  id: 'faq',
  file: 'faq.html',
  title: 'FAQ · The Last Table · Supper Club · Chicago',
  description: 'House notes for The Last Table, Chicago: dress code, reservations, corkage, live music, parking and more.',
  jsonld: (ctx) => faqJsonLd(ctx.faq),
  render(ctx) {
    const { email } = ctx.site;
    // The email address in an answer becomes a link.
    const answer = (a) => raw(esc(a).replace(esc(email), `<a href="mailto:${esc(email)}">${esc(email)}</a>`));
    return html`
<section class="ground-ink">
  ${pageHeader({ kicker: 'Know before you go', title: 'House notes.', lede: 'A few things worth knowing before your first night with us.', width: 'container--1000' })}
  <div class="container container--1000 page-body page-body--faq">
    ${ctx.faq.map((f) => html`<details class="faq__item" id="${f.id}">
      <summary><span>${f.q}</span><span class="faq__icon" aria-hidden="true"></span></summary>
      <p class="faq__a">${answer(f.a)}</p>
    </details>`)}
  </div>
</section>`;
  },
};
