// The bar menu at /bar-menu: cocktails, wine, beer and spirits on their own page. Published with the
// holding page before launch (with the logo on top, since that page has no header). After launch the
// Menus page carries it under the Bar tab, and this address stays as an unlisted alias for old links.
import { html } from '../lib/html.mjs';
import { menuPanel } from '../lib/menus.mjs';

export default {
  id: 'bar-menu',
  file: 'bar-menu.html',
  path: 'bar-menu',
  title: 'Bar Menu · The Last Table · Supper Club · Chicago',
  description: 'Cocktails, wine, beer and spirits at The Last Table, a supper club at State & Erie, Chicago.',
  render(ctx) {
    return html`
<section class="ground-ink">
  <div class="container page-header">
    ${ctx.holding ? html`<a class="page-mark" href="./"><img src="assets/vector/primary/tlt-primary-linen-transparent.svg" alt="The Last Table — home" width="1526" height="432"></a>` : ''}
    <p class="kicker">The bar</p>
    <h1 class="h1">The bar menu.</h1>
    <p class="lede">Cocktails, wine, beer and spirits, from the first round to the last pour.</p>
  </div>
  <div class="container menus-body">
    ${menuPanel(ctx.menuPages, 'bar', { selected: true, standalone: true })}
    <div class="menus-foot"><span>Please tell your captain about any allergies. Menus change with the season.</span></div>
  </div>
</section>`;
  },
};
