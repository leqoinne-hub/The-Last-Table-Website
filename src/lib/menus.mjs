// Menu rendering from content/menu-data.js. The same markup feeds the Menus page and the
// Squarespace menus code block, so the site, the print menus and Squarespace stay in sync.
import { html, raw } from './html.mjs';

export const TABS = [
  { id: 'dinner', label: 'Dinner' },
  { id: 'bar', label: 'Bar' },
  { id: 'brunch', label: 'Brunch' },
];

// Groups for one tab: Dinner is the single dinner page under its credit line; Bar is every bar page
// under its own kicker and title; Brunch is the Brunch Cocktails section plus a note until the food menu exists.
export function menuGroups(pages, tab) {
  if (tab === 'dinner') {
    return pages.filter((p) => p.menu === 'dinner').map((p) => ({ kicker: p.credit, sections: p.columns.flat() }));
  }
  if (tab === 'bar') {
    return pages.filter((p) => p.menu === 'bar').map((p) => ({ kicker: p.kicker, title: p.title, sections: p.columns.flat() }));
  }
  const brunch = pages.filter((p) => p.menu === 'bar').flatMap((p) => p.columns.flat()).filter((s) => /brunch/i.test(s.head || ''));
  return [{
    kicker: 'Sunday Jazz Brunch · 9 AM – 3 PM',
    title: 'The first seating',
    sections: [...brunch, { head: 'From the Kitchen', items: [], note: 'The brunch food menu arrives before opening day.' }],
  }];
}

function section(s, level) {
  const H = raw(`h${level}`);
  return html`<section class="tlt-section">
    ${s.head ? html`<div class="tlt-section-head"><${H} class="tlt-section-title">${s.head}</${H}><span class="tlt-section-rule" aria-hidden="true"></span></div>` : ''}
    ${s.items.length ? html`<ul class="tlt-items">${s.items.map((it) => html`<li class="tlt-item">
      <span class="tlt-item-name">${it.name}</span>${it.price ? html`<span class="tlt-item-price">${it.price}</span>` : ''}
      ${it.desc ? html`<span class="tlt-item-desc">${it.desc}</span>` : ''}
    </li>`)}</ul>` : ''}
    ${s.note ? html`<p class="tlt-section-note">${s.note}</p>` : ''}
  </section>`;
}

export function menuPanel(pages, tab, { selected }) {
  const t = TABS.find((x) => x.id === tab);
  return html`<div class="tlt-menu-panel" id="panel-${tab}" role="tabpanel" aria-labelledby="tab-${tab}" data-panel="${tab}"${selected ? '' : raw(' data-start-hidden')}>
  <h2 class="tlt-panel-title">${t.label}</h2>
  ${menuGroups(pages, tab).map((g) => html`<div class="tlt-group">
    ${g.kicker || g.title ? html`<div class="tlt-group-head">${g.kicker ? html`<p class="tlt-group-kicker">${g.kicker}</p>` : ''}${g.title ? html`<h3 class="tlt-group-title">${g.title}</h3>` : ''}</div>` : ''}
    <div class="tlt-sections">${g.sections.map((s) => section(s, g.title ? 4 : 3))}</div>
  </div>`)}
</div>`;
}

export function menuTabs(selected = 'dinner') {
  return html`<div class="tlt-tabs" role="tablist" aria-label="Menus">${TABS.map((t) => html`<button type="button" role="tab" id="tab-${t.id}" aria-controls="panel-${t.id}" aria-selected="${t.id === selected ? 'true' : 'false'}" tabindex="${t.id === selected ? '0' : '-1'}" data-panel="${t.id}">${t.label}</button>`)}</div>`;
}
