// The Last Table — opening menu content (food: working menu, no prices yet; bev: v011 proof)
const I = (name, desc, price, sub) => ({ name, desc: desc || '', price: price || '', sub: sub || '' });
const S = (head, items, note) => ({ head, items, note: note || '' });

export const pages = [
  { id: 'dinner', menu: 'dinner', kicker: 'DINNER', title: 'Autumn 2026 · 663 N. State Street, Chicago', credit: 'Created by Co-Founder Azeez Yusuf', bg: 'linen', cols: 3, columns: [
    [ S('To Start', [
      I('PB&J', 'Pullman milk bread, peanut foie mousse, pickled sour cherry jam, fleur de sel'),
      I('House Bread', 'brown butter, roasted garlic, Parmesan, herbs'),
      I('Beef Tallow Fries', ''),
      I('Lobster Rolls', 'lobster, lemon-chive aioli, brioche · add caviar', '3 / 6 / 12'),
      I('Ham & Cheese', 'Ibérico ham, Comté, Manchego, toasted bread · add black truffle'),
      I('Tartare', 'crispy brioche, smoked beef fat vinaigrette, smoked egg yolk, crispy beef fat crumbs'),
      I('Roasted Marrow', 'shallot jam, parsley salad, pickled mustard seeds, grilled sourdough, Madeira jus'),
      I('Stuffed Chicken Wings', 'two per order') ]),
      S('Greens', [
      I('Little Gems', 'white anchovies, Parmigiano Reggiano, herb crumble, Caesar dressing'),
      I('Endive & Pear', 'Belgian endive, pear, Comté, candied walnuts, champagne vinaigrette'),
      I('Broad Leaf Arugula', 'lemon, olive oil, ricotta salata, black pepper') ]) ],
    [ S('Handmade Pasta', [
      I('Angry Vodka', 'lumache, nduja, stracciatella'),
      I('Casarecce', 'brown butter, herbs, charred scallion, lemon, Pecorino, breadcrumbs · roasted marrow alongside'),
      I('Tomato Butter Mafaldine', 'whipped ricotta, basil'),
      I('Sweet Corn', 'bucatini, sweet corn emulsion, roasted corn, maitake, Parmesan, chives, lemon zest'),
      I('Short Rib Pappardelle', 'braised short rib, butternut squash purée, pepita pesto') ]),
      S('Between Bread', [
      I('The Last Burger', '2 × 4 oz Wagyu, American cheese, truffle aioli, bread-and-butter pickles, red onion, bacon brioche · regular brioche available'),
      I('The Gentleman', 'buttermilk-fried chicken breast, charred jalapeño-serrano buttermilk dressing, greens, brioche') ]),
      S('Large Plates', [
      I('Dry-Aged Strip', 'bone marrow au poivre'),
      I('Skate', 'brown butter, capers, lemon, herbs'),
      I('Heritage Pork Chop', 'Brussels sprout salad, apples'),
      I('Beef Wellington', 'mushroom duxelles, prosciutto, puff pastry, red wine jus') ]) ],
    [ S('Alongside', [
      I('Pommes Purée', 'Yukon Gold, bone marrow, rosemary, chives'),
      I('Smoked Carrots', 'smoked paprika, cumin, cider, whipped ricotta, smoked almonds'),
      I('Hot Honey Beets', 'fermented hot honey, goat cheese, pistachio'),
      I('Charred Seasonal Greens', 'black garlic vinaigrette, Calabrian chile, lemon'),
      I('Roasted Potatoes', 'herb oil, espuma') ]),
      S('To Finish', [
      I('Study of Corn', 'cornbread, corn mousse, corn pudding, goat cheese'),
      I('Milk & Cookies', 'brown butter chocolate chip cookies, vanilla malt milk'),
      I('Soft Serve', 'rotating flavors: ube, miso caramel, strawberry buttermilk'),
      I('Burnt Basque Cheesecake', 'burnt honey, sea salt'),
      I('Brown Butter Banana Bread', 'dark chocolate, pecans, espresso bourbon mascarpone, fleur de sel') ]) ] ],
    foot: 'Working menu — pricing to follow. Please tell your captain about any allergies.' },

  { id: 'cocktails', menu: 'bar', kicker: 'HOUSE COCKTAILS', title: 'Classics, reimagined for the whole evening', bg: 'ink', columns: [
    [ S('', [
      I('The Last Table Martini', 'Fords gin, Chopin potato vodka, dry vermouth, manzanilla, house Castelvetrano brine. Silky, savory, very cold.', '22'),
      I('State & Erie', 'gin, chamomile honey, fresh lemon, Crémant de Bourgogne. Floral and bright.', '21'),
      I('Velvet Sidecar', 'Ferrand cognac, dry curaçao, lemon and house burnt maple. Orange peel and a crisp finish.', '22'),
      I('Black Tie Gimlet', 'gin and our celery-lime cordial, made with toasted celery seed and lime peel. Crisp and dry.', '21'),
      I('Satin & Cinder', 'coconut-washed gin, strawberry-infused Campari, cacao-scented vermouth. Bitter strawberry, restrained cacao, a soft coconut finish.', '22') ]) ],
    [ S('', [
      I('Encore Margarita', 'reposado tequila and reposado mezcal, Alma Finca orange, house roasted pineapple gomme, lime. Bright with a lightly smoked salt edge.', '21'),
      I('State After Dark', 'blanco tequila and mezcal, grapefruit oleo saccharum, celery-lime cordial and house grapefruit soda. Chilled, bright and airy.', '22'),
      I('One More Song', 'brown-butter-washed Zacapa XO, house coffee liqueur, fresh espresso and roasted chicory. Deep coffee, toasted butter, aged-rum warmth.', '34'),
      I('Green Room', 'Smith & Cross Jamaican rum, white cacao, crème de menthe and house peppermint; clarified with French vanilla ice cream, mascarpone and cream. Clear, minty and lush.', '25'),
      I('Last Flight', 'butter-washed bonded bourbon, roasted sweet corn, burnt maple and aromatic bitters. Orange oil at the finish.', '24') ]) ] ],
    foot: 'Green Room: milk and egg. One More Song and Last Flight: milk. State After Dark: egg and celery. Satin & Cinder: coconut. Coffee drinks contain caffeine. Tell your captain about allergies.' },

  { id: 'autumn', menu: 'bar', kicker: 'AUTUMN AT THE LAST TABLE', title: 'The opening seasonal collection', bg: 'forest', columns: [
    [ S('The Season', [
      I('Room 663', 'rye, cognac, cacao-scented sweet vermouth, Bénédictine and two bitters. Dark chocolate aroma with a dry lemon finish.', '24'),
      I('Orchard After Hours', 'Calvados, pear eau-de-vie, chamomile honey, lemon and fino. Orchard fruit with a dry finish.', '23'),
      I('Silk & Smoke', 'mezcal, reposado tequila, roasted sweet potato, amontillado and lemon, clarified with milk. Silky with a gentle smoke.', '24') ], 'Silk & Smoke is clarified with milk and contains milk.') ],
    [ S('A Lighter Beginning', [
      I('Americano', 'Campari, sweet vermouth, soda, orange.', '16'),
      I('Vermouth & Soda', 'Dolin blanc, soda, lemon.', '14') ]),
      S('The Reserve', [
      I('The Last Table Reserve: Two Acts', 'Rémy Martin XO, 20-year tawny, amontillado, cacao bitters. One cocktail in two pours, with a salted dark-chocolate tile.', '68', 'A single measured cocktail, presented in two pours. Your captain guides the second act.') ]) ] ],
    foot: 'Please tell your captain about any allergies. The Reserve chocolate may contain milk and soy.' },

  { id: 'classics', menu: 'bar', kicker: 'CLASSICS · BRUNCH · SPIRIT-FREE', title: 'Familiar favorites, with the same care in every glass', bg: 'linen', columns: [
    [ S('Supper-Club Classics', [
      I('Manhattan', 'rye, sweet vermouth, aromatic bitters.', '21'),
      I('Sazerac', 'rye, demerara, Peychaud\'s, absinthe, lemon.', '21'),
      I('Boulevardier', 'bourbon, Campari, sweet vermouth.', '22'),
      I('Daiquiri', 'white rum, fresh lime, cane sugar.', '19'),
      I('Whiskey Sour', 'bonded bourbon, lemon, sugar, egg white.*', '20'),
      I('Amaretto Sour', 'amaretto, bonded bourbon, lemon, egg white.*', '20') ], 'Your favorite classic is always welcome. Ask your captain for the preparation and price.') ],
    [ S('Spirit-Free', [
      I('White Glove', 'pear, chamomile honey, lemon and soda. Fragrant and refreshing.', '15'),
      I('Afterglow', 'sour cherry, hibiscus, lemon and tonic. Tart fruit with a bitter finish.', '15'),
      I('Velvet Rope', 'espresso, chicory, oat milk and orange oil. Roasted and silky.', '16'),
      I('Ember', 'smoked black tea, roasted sweet corn, burnt maple, orange and lemon. Deep and gently smoky.', '16') ], 'Velvet Rope and Ember contain caffeine. White Glove contains honey. Spirit-free recipes use no alcoholic spirits or bitters.'),
      S('Brunch Cocktails', [
      I('Sunday Standard', 'vodka, house roasted tomato mix, lemon and horseradish. Bright, savory, properly spiced.', '20'),
      I('Baked Apple Bellini', 'roasted apple, lemon and Crémant de Bourgogne. Orchard fruit and fine bubbles.', '20'),
      I('First Seating', 'gin, house burnt-orange marmalade, dry curaçao and lemon. Bitter peel, bright citrus.', '21'),
      I('Coffee Service', 'butter-washed bonded bourbon, house cold brew and chicory, oat-milk and burnt-maple foam. Orange zest.', '21'),
      I('Sunrise on State', 'reposado mezcal, orange, lime and house hibiscus-pomegranate grenadine, light egg-white foam.', '21'),
      I('Second Seating', 'Jamaican rum, blackberry shrub, lime and ginger beer. Dark fruit and a sharp finish.', '20') ], 'Brunch service only. Coffee Service contains milk, oats and caffeine. Sunrise on State contains egg. Sunday Standard contains celery and mustard.') ] ],
    foot: '*Contains egg. Please tell your captain about allergies.' },

  { id: 'wine', menu: 'bar', kicker: 'WINE', title: 'By the glass: still 5 oz · sparkling 4 oz · glass / bottle. The cellar: 750 ml', bg: 'linen', cols: 3, columns: [
    [ S('White', [
      I('Pascal Jolivet Sancerre', 'sauvignon blanc · Loire, France', '22 / 88'),
      I('Louis Jadot Mâcon-Villages', 'chardonnay · Burgundy, France', '16 / 64'),
      I('Honig Sauvignon Blanc', 'Napa Valley, California', '18 / 72'),
      I('Lioco Chardonnay', 'Sonoma County, California', '20 / 80'),
      I('Tablas Creek Patelin de Tablas Blanc', 'Rhône white blend · Paso Robles, California', '18 / 72') ]),
      S('Rosé', [
      I('By.Ott Rosé', 'Côtes de Provence, France', '17 / 68'),
      I('Bedrock Ode to Lulu Rosé', 'California', '17 / 68') ]) ],
    [ S('Red', [
      I('Angeline Pinot Noir', 'house red · California', '14 / 56'),
      I('Château Thivin Côte-de-Brouilly', 'gamay · Beaujolais, France', '21 / 84'),
      I('Château Beaumont', 'Bordeaux blend · Haut-Médoc, France', '20 / 80'),
      I('Au Bon Climat Pinot Noir', 'Santa Barbara County, California', '21 / 84'),
      I('Textbook Cabernet Sauvignon', 'Napa Valley, California', '24 / 96'),
      I('Ridge Three Valleys', 'zinfandel-led blend · Sonoma County, California', '20 / 80') ]),
      S('Sparkling', [
      I('Louis Bouillot Perle de Vigne Brut', 'Crémant de Bourgogne, France', '17 / 68'),
      I('Charles Heidsieck Brut Réserve', 'Champagne, France', '29 / 145'),
      I('Billecart-Salmon Le Rosé', 'Champagne, France', '34 / 195') ]) ],
    [  S('The Cellar · Champagne', [
      I('Charles Heidsieck Brut Réserve', 'brioche, orchard fruit, rich texture', '145'),
      I('Pierre Péters Cuvée de Réserve', 'blanc de blancs · mineral, citrus, fine bubbles', '185'),
      I('Ruinart Blanc de Blancs', 'citrus, white flowers, generous texture', '240'),
      I('Billecart-Salmon Le Rosé', 'red berries, citrus, fine mousse', '195'),
      I('Ruinart Rosé', 'red fruit and a rounder texture', '265'),
      I('Krug Grande Cuvée', 'deep, layered, long', '425'),
      I('Krug Rosé', 'structured red fruit and spice', '650') ]) , S('The Cellar · White', [
      I('William Fèvre Chablis Champs Royaux', 'chardonnay · Chablis, France · citrus and mineral tension', '100'),
      I('Far Niente Chardonnay', 'Napa Valley · orchard fruit and a richer texture', '135') ]),
      S('The Cellar · Red', [
      I('Joseph Drouhin Gevrey-Chambertin', 'pinot noir · Burgundy · red fruit and savory depth', '195'),
      I('Château Batailley', 'Bordeaux blend · Pauillac · cassis and structured tannin', '185'),
      I('Frog\'s Leap Estate Cabernet Sauvignon', 'Rutherford, Napa Valley · cassis, cedar and freshness', '150'),
      I('Far Niente Cabernet Sauvignon', 'Napa Valley · black fruit and polished tannin', '260') ])  ] ],
    foot: 'Please ask your captain for vintages and available Champagne editions. All by-the-glass selections are also available by the bottle.' },

  { id: 'beer', menu: 'bar', kicker: 'BEER, COFFEE & REFRESHMENTS', title: 'An easy first round, a considered final cup', bg: 'linen', columns: [
    [ S('Domestic', [ I('Miller High Life','','7'), I('Bud Light','','7'), I('Coors Light','','7'), I('Coors Banquet','','8'), I('Michelob Ultra','','8') ]),
      S('Imported', [ I('Modelo Especial','','8'), I('Corona Extra','','8'), I('Stella Artois','','9') ]),
      S('IPA & Double IPA', [ I('Voodoo Ranger Juicy Haze IPA','','10'), I('Pipeworks Ninja vs. Unicorn','16 oz can','14') ]),
      S('Non-Alcoholic Beer', [ I('Guinness 0','','8'), I('Athletic Run Wild','','8') ]) ],
    [ S('Coffee & Tea', [ I('Espresso / Decaf Espresso','','5'), I('Double Espresso','','6'), I('Americano','','5'), I('Cappuccino','','6'), I('Latte','','6'), I('Hot Tea','Earl Grey, green, peppermint, chamomile','6') ], 'Whole milk or oat milk.'),
      S('Refreshments', [ I('Coca-Cola / Diet Coke / Coke Zero / Sprite','','5'), I('Fever-Tree Ginger Beer / Tonic','','6'), I('Fresh Lemonade','','6'), I('Unsweetened Iced Black Tea','','5'), I('Acqua Panna Still Water','750 ml','9'), I('San Pellegrino Sparkling Water','750 ml','9') ], 'Complimentary tap water is always available.') ] ],
    foot: 'Guinness 0 and Athletic Run Wild are non-alcoholic beers.' },

  { id: 'spirits', menu: 'bar', kicker: 'SPIRITS', title: '2 oz pours · neat, on the rocks, or with soda', bg: 'linen', cols: 3, columns: [
    [ S('Vodka', [ I('Tito\'s Handmade','','14'), I('Ketel One','','15'), I('Belvedere','','16'), I('Grey Goose','','16'), I('Chopin Potato Vodka','','16') ]),
      S('Gin', [ I('Bombay Sapphire','','—'), I('Fords','','14'), I('The Botanist','','17'), I('Aviation','','—'), I('Hendrick\'s','','—') ]),
      S('Rum', [ I('Diplomático Reserva Exclusiva','','—'), I('Probitas','','16'), I('Appleton Estate Signature','','14'), I('Ron Zacapa 23','','—'), I('El Dorado 12 Year','','—') ]),
      S('Mezcal', [ I('Montelobos Espadín','','—'), I('400 Conejos Espadín','','15'), I('Del Maguey Vida','','—'), I('Del Maguey Chichicapa','','24') ]) ],
    [ S('Tequila', [ I('Gran Centenario Plata','','14'), I('Gran Centenario Reposado','','15'), I('Gran Centenario Añejo','','—'), I('Arette Blanco','','15'), I('Arette Reposado','','—'), I('Tequila Ocho Plata','','19'), I('Tequila Ocho Reposado','','—'), I('Tequila Ocho Extra Añejo','','—'), I('Don Fulano Blanco','','20'), I('Don Fulano Reposado','','—'), I('Siete Leguas Reposado','','—'), I('Don Julio Reposado','','20'), I('Don Julio 1942','','48'), I('Don Fulano Imperial Extra Añejo','','—'), I('Fortaleza Blanco','','—'), I('Clase Azul Reposado','','52') ], 'Ask your captain about a 1 oz tasting pour.') ],
    [  S('Bourbon & Rye', [ I('Angel\'s Envy Bourbon','','—'), I('Old Forester 100','','15'), I('Woodford Reserve','','17'), I('Buffalo Trace','','17'), I('Maker\'s Mark','','—'), I('Jack Daniel\'s Old No. 7','','—'), I('Elijah Craig Small Batch','','—'), I('Wild Turkey Rare Breed','','20'), I('Michter\'s US*1 Sour Mash','','—'), I('Sazerac Rye','','17'), I('High West Double Rye','','—') ]),
      S('Scotch', [ I('Johnnie Walker Black Label','','17'), I('The Macallan 12 Sherry Oak','','28'), I('Glenmorangie The Original 12','','19'), I('Laphroaig 10','','21') ]) , S('Irish & Japanese', [ I('Jameson','','15'), I('Suntory Toki','','17'), I('Nikka From the Barrel','','25') ]),
      S('Cognac & Brandy', [ I('Pierre Ferrand 1840 Original Formula','','17'), I('Hennessy V.S.O.P','','22'), I('Rémy Martin 1738','','24'), I('Rémy Martin XO','','52'), I('Courvoisier XO','','44'), I('Delord 25 Year Bas-Armagnac','','28'), I('Christian Drouin VSOP Calvados','','22') ])  ] ],
    foot: '— Pricing pending bottle-cost approval. Cocktail preparations are priced separately.' },

  { id: 'finish', menu: 'bar', kicker: 'TO FINISH', title: 'A little more time at the table', bg: 'forest', columns: [
    [ S('Amaro & Digestifs', [ I('Amaro Nonino','','16'), I('Amaro Montenegro','','14'), I('Averna','','14'), I('Cynar','','13'), I('Fernet-Branca','','14'), I('Braulio','','15'), I('Amaro Meletti','','13'), I('Disaronno','','14') ], '2 oz pours') ],
    [ S('Sherry & Tawny', [ I('Lustau Jarana Fino','','12'), I('Lustau Papirusa Manzanilla','','12'), I('Lustau Los Arcos Amontillado','','14'), I('Graham\'s 20 Year Old Tawny','','18') ], '2 oz pours'),
      S('The Final Course', [ I('The Last Table Reserve: Two Acts', 'Rémy Martin XO, 20-year tawny, amontillado, cacao bitters. One cocktail in two pours, with a salted dark-chocolate tile.', '68') ]) ] ],
    foot: 'The last drink receives the same care as the first.' }
];
