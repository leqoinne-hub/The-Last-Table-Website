// Photography slots. No photography exists yet, so each slot renders as a labeled placeholder
// naming the shot it needs. To fill one, save the photo as src/assets/photos/<key>.webp
// (or .jpg/.png), ideally WebP under 300 KB, then update its alt text here.

export const photos = {
  'dining-room': { ratio: '4 / 5', label: 'Photo · Dining room, low light, forest leather', alt: 'The dining room in low light, with forest-green leather banquettes' },
  'private-table': { ratio: '3 / 2', label: 'Photo · Private table set for twelve', alt: 'A long private table set for twelve' },
  'private-room': { ratio: '4 / 3', label: 'Photo · Private room or buyout setup', alt: 'The room set for a private event' },
  'room-from-bar': { ratio: '16 / 9', label: 'Photo · The room from the bar, brass and marble', alt: 'The room seen from the bar, with brass and black marble' },
  'ig-1': { ratio: '1', label: 'Cocktail · State & Erie', alt: 'A cocktail at The Last Table' },
  'ig-2': { ratio: '1', label: 'The bar at 11', alt: 'The bar late in the evening' },
  'ig-3': { ratio: '1', label: 'Tartare', alt: 'Tartare on crispy brioche' },
  'ig-4': { ratio: '1', label: 'The late set', alt: 'The band during the late set' },
  'ig-5': { ratio: '1', label: 'Brass & marble', alt: 'Brass and marble details in the room' },
  'ig-6': { ratio: '1', label: 'Last flight', alt: 'The Last Flight cocktail' },
};
