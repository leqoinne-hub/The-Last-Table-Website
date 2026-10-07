import { html, raw } from '../lib/html.mjs';
import { pageHeader, photo, mailHref } from '../lib/components.mjs';

const OCCASIONS = ['Dinner party', 'Birthday / celebration', 'Rehearsal dinner', 'Corporate dinner', 'Full buyout', 'Something else'];

const cap = (n) => (n == null ? '[—]' : n);
function capacity(s) {
  const parts = [];
  if ('seated' in s) parts.push(`Seated ${cap(s.seated)}`);
  if ('standing' in s) parts.push(`Standing ${cap(s.standing)}`);
  return parts.join(' · ');
}

function field({ id, label, type = 'text', required, error, attrs = '' }) {
  return html`<div class="field">
    <label class="field__label" for="f-${id}">${label}</label>
    <input id="f-${id}" name="${id}" type="${type}"${required ? raw(' required') : ''}${raw(attrs ? ` ${attrs}` : '')}${error ? raw(` aria-describedby="f-${id}-err"`) : ''}>
    ${error ? html`<p class="form-error" id="f-${id}-err" hidden>${error}</p>` : ''}
  </div>`;
}

export default {
  id: 'private',
  file: 'private-dining.html',
  title: 'Private Dining & Events · The Last Table · Supper Club · Chicago',
  description: 'Private dining and buyouts at The Last Table, Chicago: rehearsal dinners, birthdays, client dinners and receptions. Tell us the night.',
  render(ctx) {
    const { site } = ctx;
    if (site.spaces.some((s) => s.seated === null || s.standing === null)) ctx.todo('Private dining capacities (content/site.js → spaces; fire-marshal numbers)');
    const action = site.forms.inquiry || mailHref(ctx, 'Private dining inquiry');
    return html`
<section class="ground-forest">
  ${pageHeader({ kicker: 'Private dining & events', title: 'Close the doors.', lede: "Rehearsal dinners, birthdays, a client dinner, a quiet buyout on a Tuesday. Tell us the night and we'll build it around you." })}
  <div class="container page-body split split--360 split--start">
    <div class="pd-left">
      ${photo(ctx, 'private-room', 'photo--framed')}
      <p class="body">Every event starts with a conversation. Our events team will follow up within two business days with menus, pricing and availability.</p>
      <ul class="spaces">
        ${site.spaces.map((s) => html`<li class="space">
          <div class="space__top"><h2 class="space__name">${s.name}</h2><span class="space__cap">${capacity(s)}</span></div>
          <p class="space__desc">${s.desc}</p>
        </li>`)}
      </ul>
      ${ctx.downloads.eventsPacket ? html`<a class="btn btn--outline btn--48" href="${ctx.downloads.eventsPacket}">Download the events packet</a>` : ''}
    </div>
    <div>
      <form class="inquiry" data-form="inquiry" action="${action}" method="post"${site.forms.inquiry ? '' : raw(' enctype="text/plain"')} novalidate>
        <input type="hidden" name="_subject" value="Private dining inquiry">
        <input class="hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true">
        ${field({ id: 'name', label: 'Name', required: true, error: 'Please add your name.', attrs: 'autocomplete="name"' })}
        <div class="field-row">
          ${field({ id: 'email', label: 'Email', type: 'email', required: true, error: 'Please add a valid email.', attrs: 'autocomplete="email"' })}
          ${field({ id: 'phone', label: 'Phone (optional)', type: 'tel', attrs: 'autocomplete="tel"' })}
        </div>
        <div class="field-row">
          ${field({ id: 'date', label: 'Preferred date', type: 'date', required: true, error: 'Pick a date — approximate is fine.' })}
          ${field({ id: 'guests', label: 'Guests', type: 'number', required: true, error: 'How many guests?', attrs: 'min="1" inputmode="numeric"' })}
        </div>
        <div class="field">
          <label class="field__label" for="f-occasion">Occasion</label>
          <select id="f-occasion" name="occasion">${OCCASIONS.map((o) => html`<option>${o}</option>`)}</select>
        </div>
        <div class="field">
          <label class="field__label" for="f-notes">Tell us about the night</label>
          <textarea id="f-notes" name="notes" rows="4"></textarea>
        </div>
        <button class="btn btn--fill" type="submit">Send inquiry</button>
        <p class="form-error" id="f-submit-err" role="alert" hidden>That didn't go through. Please try again, or write to ${site.email}.</p>
      </form>
      <div class="inquiry-done" tabindex="-1" role="status" hidden>
        <p class="label">Inquiry received</p>
        <p class="inquiry-done__title">Thank you, <span data-name></span>.</p>
        <p class="inquiry-done__body">We'll be in touch within two business days. Questions in the meantime: ${site.email}.</p>
      </div>
    </div>
  </div>
</section>`;
  },
};
