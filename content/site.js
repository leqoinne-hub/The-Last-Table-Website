// The Last Table — site facts. One source for the website, the Squarespace kit and the structured data.
// `null` means "still needed from ownership": the build lists every one of them when it runs.

export const site = {
  name: 'The Last Table',
  descriptor: 'Supper Club · Chicago',
  url: 'https://www.thelasttablechicago.com', // overridden by the SITE_URL env var (e.g. a staging preview)
  email: 'info@atthelasttable.com', // a different domain from the site: confirm it is intentional
  phone: null, // e.g. '(312) 555-0100'; shows on Hours & Contact and in the structured data
  instagram: { handle: 'thelasttablechicago', url: 'https://instagram.com/thelasttablechicago' },

  address: {
    street: '663 N. State St',
    streetLong: '663 N. State Street',
    city: 'Chicago',
    region: 'IL',
    postal: '60654',
    cross: 'State & Erie',
    maps: 'https://maps.google.com/?q=663+N+State+St+Chicago+IL+60654',
    mapEmbed: 'https://maps.google.com/maps?q=663%20N%20State%20St%2C%20Chicago%2C%20IL%2060654&z=16&output=embed',
  },

  owner: 'L&A Core Hospitality',
  founder: { name: 'LeQoinne Rice', title: 'Co-Founder' }, // the handoff README says "Owner"; the prototype says "Co-Founder"

  // Coming-soon countdown. mode: 'auto' (count down, then open) · 'coming-soon' · 'open'.
  // Preview either state on any page with ?launch=open or ?launch=coming-soon.
  launch: { mode: 'auto', openAt: '2026-11-17T16:00:00-06:00', label: 'November 17 · 4 PM' },
  flicker: true,

  // Hours, as shown on the site. `schema` feeds the Google structured data.
  hours: [
    { days: 'Monday – Thursday', time: '4 PM – 2 AM', schema: [{ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '16:00', closes: '02:00' }] },
    { days: 'Friday – Saturday', time: '4 PM – 3:30 AM', schema: [{ days: ['Friday', 'Saturday'], opens: '16:00', closes: '03:30' }] },
    { days: 'Sunday', time: 'Brunch 9 AM – 3 PM · Dinner 5 PM – 2 AM', schema: [{ days: ['Sunday'], opens: '09:00', closes: '15:00' }, { days: ['Sunday'], opens: '17:00', closes: '02:00' }] },
  ],
  hoursShort: 'Mon–Thu 4 PM–2 AM · Fri–Sat 4 PM–3:30 AM · Sun brunch 9 AM–3 PM, dinner 5 PM–2 AM',
  // "Tonight" line, indexed by day of week (0 = Sunday). Read on Chicago time; until 4 AM it is still last night.
  tonight: [
    'Brunch 9 AM – 3 PM · 5 PM – 2 AM',
    '4 PM – 2 AM', '4 PM – 2 AM', '4 PM – 2 AM', '4 PM – 2 AM',
    '4 PM – 3:30 AM', '4 PM – 3:30 AM',
  ],

  resy: {
    url: null, // the venue page on Resy; the "Find a table" button links here
    embedHtml: null, // paste the booking-widget code from the Resy dashboard here to replace the button panel
  },
  toast: { giftCardUrl: null }, // the Toast gift-card page; both gift-card buttons use it

  // Form endpoints that accept a POST of form fields (Formspree, Basin, Getform…).
  // Without one, the form opens the guest's email app addressed to `email` above.
  forms: { newsletter: null, inquiry: null },

  // Files that live in src/assets/downloads/. Links to them stay hidden until the file is there.
  downloads: {
    dinnerMenu: 'tlt-dinner-menu.pdf',
    barMenu: 'tlt-bar-menu.pdf',
    brandIdentity: 'tlt-brand-identity.pdf',
    eventsPacket: 'tlt-events-packet.pdf',
  },

  // Private-dining spaces. Capacities are still needed: use the fire-marshal occupancy numbers.
  spaces: [
    { name: 'Full buyout', seated: null, standing: null, desc: 'The whole room, the bar and the stage. Your menu, your music, your night.' },
    { name: 'Semi-private dining', seated: null, desc: 'A section of the dining room set apart for one long table.' },
    { name: 'After-ten reception', standing: null, desc: 'Cocktails, passed bites and the late set, from ten until close.' },
  ],

  googleAnalyticsId: null, // e.g. 'G-XXXXXXX'. Add a cookie banner before turning on analytics or ad pixels.
};
