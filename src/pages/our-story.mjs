import { html } from '../lib/html.mjs';
import { photo } from '../lib/components.mjs';

export default {
  id: 'story',
  file: 'our-story.html',
  title: 'Our Story · The Last Table · Supper Club · Chicago',
  description: 'One light still on. The story behind The Last Table, a supper club at State & Erie from L&A Core Hospitality.',
  render(ctx) {
    const { founder } = ctx.site;
    return html`
<section class="ground-linen">
  <div class="container container--760 story">
    <p class="kicker kicker--center">Our story</p>
    <h1 class="h1 story__title">One light still on.</h1>
    <p class="story__lede">Every great Chicago night has a last table. It's the one the captain holds for the regulars, the one still laughing when the chairs go up.</p>
    ${photo(ctx, 'room-from-bar')}
    <p class="story__body">We built a room for that table at State &amp; Erie: forest-green leather and cognac, blackened millwork, black marble and brass, lit low enough that the city outside goes quiet. Dinner runs into cocktails, cocktails run into a live set, and nobody's checking the time.</p>
    <p class="story__body">The idea is simple. The last seating of the night gets the same care as the first — the same pour, the same plate, the same welcome at one in the morning as at four in the afternoon.</p>
    <p class="story__body">The Last Table is part of L&amp;A Core Hospitality, a Chicago group that believes hospitality is a craft, not a performance. Pull up a chair. Stay for one more.</p>
    <div class="story__sign">
      <span class="story__name">${founder.name}</span>
      <span class="story__role">${founder.title}</span>
    </div>
  </div>
</section>`;
  },
};
