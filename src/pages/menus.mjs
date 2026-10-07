import { html } from '../lib/html.mjs';
import { menuPanel, menuTabs, TABS } from '../lib/menus.mjs';

export default {
  id: 'menus',
  file: 'menus.html',
  title: 'Menus · The Last Table · Supper Club · Chicago',
  description: 'The dinner, bar and Sunday brunch menus at The Last Table, a supper club at State & Erie in Chicago.',
  render(ctx) {
    const pdfs = [['dinnerMenu', 'Dinner PDF'], ['barMenu', 'Bar PDF']].filter(([k]) => ctx.downloads[k]);
    return html`
<section class="ground-ink">
  <div class="container page-header">
    <p class="kicker">Menus</p>
    <h1 class="h1">Dinner, then the bar.</h1>
    <p class="lede">Dinner from four. When the plates clear, the room belongs to the bar and the band.</p>
    ${menuTabs('dinner')}
  </div>
  <div class="container menus-body">
    ${TABS.map((t, i) => menuPanel(ctx.menuPages, t.id, { selected: i === 0 }))}
    <div class="menus-foot">
      <span>Please tell your captain about any allergies. Menus change with the season.</span>
      ${pdfs.length ? html`<span class="menus-foot__links">${pdfs.map(([k, label]) => html`<a href="${ctx.downloads[k]}">${label}</a>`)}</span>` : ''}
    </div>
  </div>
</section>`;
  },
};
