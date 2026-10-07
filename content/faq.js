// House notes (FAQ). Feeds the FAQ page and its FAQPage structured data, so they never drift.
// DRAFT POLICIES TO CONFIRM before launch: dress code wording · 21+ after 10 PM · $25 no-show fee and
// 24-hour window · 30-day booking window and 15-minute hold · $50 corkage, two bottles · no cover for dinner guests.

export const policiesApproved = false; // set to true once ownership signs off on the policies above

export const faq = [
  { id: 'dress-code', q: 'Dress code', a: 'Dress for a night out. Collared shirts, dark denim and evening wear all belong here. Please leave athletic wear, ball caps and beachwear at home.' },
  { id: 'age-policy', q: 'Age policy', a: 'Guests of every age are welcome for dinner and Sunday brunch with an adult. After 10 PM the room is 21 and over, with valid ID.' },
  { id: 'reservations', q: 'Reservations & cancellations', a: 'Book on Resy up to 30 days ahead. We hold tables for 15 minutes. Please cancel at least 24 hours ahead; late cancellations and no-shows may be charged $25 per guest.' },
  { id: 'larger-parties', q: 'Larger parties', a: 'Online booking is for up to six guests. For seven or more, send a private dining inquiry and our events team will take it from there.' },
  { id: 'walk-ins', q: 'Walk-ins', a: 'The bar is held for walk-ins every night, first come, first served.' },
  { id: 'allergies', q: 'Allergies & dietary needs', a: 'Tell your captain about any allergies when you sit down. Many dishes can be adjusted, and the spirit-free list is always available.' },
  { id: 'corkage', q: 'Corkage', a: "You are welcome to bring a bottle that isn't on our list. Corkage is $50 per bottle, up to two bottles per table." },
  { id: 'celebrations', q: 'Celebrations', a: "Celebrating something? Add it to your Resy notes and we'll take care of the rest." },
  { id: 'live-music', q: 'Live music', a: 'The band starts when dinner winds down, most nights from 10 PM. No cover for dinner guests.' },
  { id: 'photos', q: 'Photos', a: 'Photograph your table, gladly. Please keep the flash off and give the band and the guests around you their night.' },
  { id: 'parking', q: 'Parking & transit', a: 'Valet details are coming soon. The nearest L stop is Grand on the Red Line, two blocks south.' },
  { id: 'gift-cards', q: 'Gift cards', a: 'Sold online through Toast and at the host stand. They are good for dinner, drinks and the late set.' },
  { id: 'accessibility', q: 'Accessibility', a: "Tell us what would make your visit easier when you book, or write to info@atthelasttable.com. We want this website to work for everyone; if something is hard to use, email us and we'll fix it." },
];
