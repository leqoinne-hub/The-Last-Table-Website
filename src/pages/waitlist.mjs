// The waitlist at /waitlist: first name and email for first word on opening night. Published with
// the holding page before launch (with the logo, since that page has no header) and in the menu after.
import { html, raw } from '../lib/html.mjs';
import { mailHref, opensStrip, opensOn } from '../lib/components.mjs';
import { site } from '../../content/site.js';

export default {
  id: 'waitlist',
  file: 'waitlist.html',
  path: 'waitlist',
  title: 'Join the Waitlist · The Last Table · Supper Club · Chicago',
  description: `Join the waitlist for The Last Table, a supper club ${site.launch.showDate ? `opening ${site.launch.date} at` : 'coming soon to'} State & Erie, Chicago. First word on opening night, reservations and the menus.`,
  render(ctx) {
    const endpoint = site.forms.newsletter;
    return html`
<section class="ground-ink waitlist">
  <div class="container container--760 waitlist__inner">
    ${ctx.holding ? html`<a class="waitlist__mark" href="./"><img src="assets/vector/primary/tlt-primary-linen-transparent.svg" alt="The Last Table — home" width="1526" height="432"></a>` : ''}
    <p class="kicker kicker--center">The waitlist</p>
    <h1 class="h1 waitlist__title">Be the first to know.</h1>
    <p class="lede waitlist__lede">${site.launch.showDate ? `Doors open ${opensOn(site)}. ` : ''}Join the waitlist for first word on opening night, reservations, the menus and the late set.</p>
    <form class="waitlist__form" data-form="newsletter" data-list="waitlist" action="${endpoint || mailHref(ctx, 'Join the waitlist')}" method="post"${endpoint ? '' : raw(' enctype="text/plain"')} novalidate>
      <div class="field-row">
        <div class="field">
          <label class="field__label" for="wl-name">First name</label>
          <input id="wl-name" name="first_name" type="text" autocomplete="given-name">
        </div>
        <div class="field">
          <label class="field__label" for="wl-email">Email</label>
          <input id="wl-email" name="email" type="email" autocomplete="email" required aria-describedby="wl-email-err">
          <p class="form-error" id="wl-email-err" hidden>Please add a valid email.</p>
        </div>
      </div>
      <input class="hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true">
      <button class="btn btn--fill" type="submit">Join the waitlist</button>
      <p class="signup__done" role="status" data-done="You're on the waitlist. First word comes to you."></p>
      <p class="fine">News and invitations only. Unsubscribe anytime.</p>
    </form>
    ${opensStrip(site)}
  </div>
</section>`;
  },
};
