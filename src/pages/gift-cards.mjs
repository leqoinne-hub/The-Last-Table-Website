import { html } from '../lib/html.mjs';
import { bulb } from '../lib/components.mjs';

export default {
  id: 'gift',
  file: 'gift-cards.html',
  title: 'Gift Cards · The Last Table · Supper Club · Chicago',
  description: 'Give someone the last table. Digital or physical gift cards in any amount, good for dinner, drinks and the late set.',
  render(ctx) {
    const url = ctx.site.toast.giftCardUrl || 'https://www.toasttab.com';
    return html`
<section class="ground-ink">
  <div class="container section-page split">
    <div class="giftcard-wrap">
      <div class="giftcard" role="img" aria-label="The Last Table gift card">
        <img src="assets/vector/one-color/tlt-onecolor-linen.svg" alt="" width="1526" height="432">
        <div class="giftcard__foot"><span>A night at the last table</span>${bulb(44, ctx.site.flicker)}</div>
      </div>
    </div>
    <div class="giftcard-copy">
      <p class="kicker">Gift cards</p>
      <h1 class="h1">Give someone the last table.</h1>
      <p class="lede">Digital or physical, any amount. Good for dinner, drinks and the late set.</p>
      <div class="btn-row">
        <a class="btn btn--fill" href="${url}">Buy on Toast</a>
        <a class="btn btn--ghost" href="${url}">Check a balance</a>
      </div>
    </div>
  </div>
</section>`;
  },
};
