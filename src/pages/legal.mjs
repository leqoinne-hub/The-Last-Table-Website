// Privacy, Terms and the 404 page. Privacy and Terms are plain-language DRAFTS: have counsel review them before launch.
import { html } from '../lib/html.mjs';
import { href, pageHeader, mailHref } from '../lib/components.mjs';

export const draft = true; // set to false once counsel has reviewed Privacy and Terms

export const privacy = {
  id: 'privacy',
  file: 'privacy.html',
  title: 'Privacy · The Last Table · Supper Club · Chicago',
  description: 'How The Last Table handles the information you share with us.',
  render(ctx) {
    const { site } = ctx;
    return html`
<section class="ground-ink">
  ${pageHeader({ kicker: 'Privacy', title: 'Privacy notice.', lede: 'What we collect, why, and how to reach us about it.', width: 'container--1000' })}
  <div class="container container--1000 page-body prose">
    <h2>What we collect</h2>
    <p>Only what you choose to share: your email address when you join our list, and the details you send with a private dining inquiry (name, email, phone, date, party size and notes). If you write to us, we keep the email.</p>
    <h2>How we use it</h2>
    <p>To answer you, plan your event, and send the news and invitations you asked for. We don't sell or rent your information.</p>
    <h2>Services we use</h2>
    <p>Reservations run through Resy and gift cards through Toast; their own privacy policies apply when you use them. Our contact page shows a Google map, and our type comes from Google Fonts. These services may log your visit or set their own cookies.</p>
    <h2>Our list</h2>
    <p>Every email includes a way to unsubscribe, or write to us and we'll take you off.</p>
    <h2>Your choices</h2>
    <p>To see, correct or delete what we hold about you, write to <a href="${mailHref(ctx, 'Privacy request')}">${site.email}</a>.</p>
    <h2>Contact</h2>
    <p>${site.name}, ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postal} · <a href="${mailHref(ctx)}">${site.email}</a></p>
  </div>
</section>`;
  },
};

export const terms = {
  id: 'terms',
  file: 'terms.html',
  title: 'Terms · The Last Table · Supper Club · Chicago',
  description: 'Terms of use for The Last Table website.',
  render(ctx) {
    const { site } = ctx;
    return html`
<section class="ground-ink">
  ${pageHeader({ kicker: 'Terms', title: 'Terms of use.', lede: 'The house rules for this website.', width: 'container--1000' })}
  <div class="container container--1000 page-body prose">
    <h2>This website</h2>
    <p>This site is run by ${site.owner} for ${site.name}. Its words, logos and images belong to us; please don't reuse them without permission. Press may use the files in our <a href="${href('press')}">press kit</a>.</p>
    <h2>Menus, hours and events</h2>
    <p>Menus, prices, hours and the live music calendar change with the season and can change without notice. We do our best to keep this site current.</p>
    <h2>Reservations and gift cards</h2>
    <p>Reservations are made through Resy and are subject to Resy's terms and our <a href="${href('reserve')}">booking policy</a>. Gift cards are sold through Toast and are subject to Toast's terms.</p>
    <h2>Other sites</h2>
    <p>Links to other sites are for your convenience; we aren't responsible for their content.</p>
    <h2>Contact</h2>
    <p>Questions about these terms: <a href="${mailHref(ctx)}">${site.email}</a>.</p>
  </div>
</section>`;
  },
};

export const notFound = {
  id: '404',
  file: '404.html',
  title: 'Not found · The Last Table · Supper Club · Chicago',
  description: "This page isn't here.",
  noindex: true,
  render() {
    return html`
<section class="ground-ink">
  <div class="container section-page">
    <p class="kicker">Not found</p>
    <h1 class="h1">This table's been cleared.</h1>
    <p class="lede">The page you were looking for isn't here. Let's get you seated.</p>
    <div class="btn-row" style="margin-top:32px">
      <a class="btn btn--fill" href="index.html">Back to home</a>
      <a class="btn btn--ghost" href="${href('menus')}">See the menus</a>
    </div>
  </div>
</section>`;
  },
};
