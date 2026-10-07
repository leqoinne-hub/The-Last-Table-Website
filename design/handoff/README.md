# Handoff: The Last Table — Website (Squarespace 7.1)

## Overview
Marketing site for **The Last Table**, a supper club at 663 N. State St (State & Erie), Chicago, owned by L&A Core Hospitality. There are 11 pages: Home, Menus (Dinner / Bar), Reservations (Resy), Private Dining & Events (inquiry form), Live Music (CMS calendar), Our Story, Gift Cards (Toast), Press, Careers, Hours & Contact and FAQ. The signature detail is the flickering incandescent bulb in the primary logo lockup.

- Domain: **thelasttablechicago.com**
- Email: **info@atthelasttable.com** (this is a different domain from the site, so confirm it is intentional)
- Instagram: **@thelasttablechicago**
- Platform: **Squarespace 7.1, Core or Plus plan** (needed for Code Injection and Custom CSS)

## About the design files
`TLT Website.dc.html` is a **design reference built in HTML**. It is a working prototype that shows the intended look and behavior. It is not production code. Your job is to **rebuild it in Squarespace 7.1** with native blocks wherever they exist: Text, Button, Form, Newsletter, Events collection, Map, Instagram and Code blocks. Add Custom CSS and Code Injection only for what Squarespace can't do natively: fonts, colors, the bulb flicker, the menu tab toggle and the drawer styling.

To view the prototype, open `TLT Website.dc.html` in a browser from this folder (it needs `support.js`, `tlt-menu-data.js` and `vector/` next to it). Every page is reachable from the drawer (☰), including the new FAQ page. The Tweaks props `startPage`, `launchState` (auto / coming-soon / open — auto counts down to Nov 17, 4 PM CT, then opens) and `flicker` switch states.

Starter snippets are in `squarespace/`. Treat them as a starting point and adjust selectors to the template you choose.

## Fidelity
**High-fidelity.** Colors, type, spacing, copy and interactions are final, except for the placeholders listed under Assets. Match it closely.

## Global layout
- Body background: Ink `#14120E`. Default text: Linen `#E3D6BC`.
- Content container: `max-width: 1200px` (header and footer: 1320px), centered, side padding `clamp(20px, 5vw, 56px)`.
- Section vertical padding: `clamp(72px, 10vw, 120px)`. Page-header blocks: top `clamp(64px, 9vw, 112px)`, bottom 40px, with a 1px rule below in `rgba(168,139,85,0.45)`.
- Every multi-column layout is `grid-template-columns: repeat(auto-fit, minmax(min(320–360px, 100%), 1fr))`, so columns stack to one on mobile. There is no fixed width anywhere.
- Section grounds alternate between Ink, Linen `#E3D6BC` (dark text) and Forest `#0F2A1E`.

### Header (sticky)
- 68px tall, Ink, 1px bottom border `rgba(168,139,85,0.45)`, `position: sticky; top: 0`.
- Left: horizontal lockup `vector/horizontal/tlt-horizontal-linen-transparent.svg`, 28px tall, `max-width: 52vw`. Links to Home.
- Right: **RESERVE** button and a ☰ icon (44×44).
  - The RESERVE button: 44px tall, padding 0 20px, 1px solid Brass `#A88B55` border, radius 2px, Jost 500 12px, letter-spacing .3em, Linen text. On hover: Brass background with Ink text, 180ms ease.
  - The ☰ icon: two 24px Linen lines and one 16px Brass line, 1.5px thick, 6px gap.
- Squarespace: set the header to the logo on the left and the burger plus a Button on the right. Force the mobile/burger menu at all widths with CSS (snippet in `custom.css`).

### Navigation drawer
- Fixed overlay `rgba(10,9,7,0.65)`. The panel slides from the right: `width: min(420px, 100%)`, Ink, 1px Brass left border.
- Panel header: "THE LAST TABLE" (Jost 11px, .34em, Brass) and a × close button (44×44).
- Links: Limelight 26px, letter-spacing .04em, Linen, minimum height 44px. On hover the link turns Brass. The active page shows a 28px Brass hairline after its label.
- Link order: Home · Menus · Reservations · Private Dining · Live Music · Our Story · Gift Cards · Press · Careers · Hours & Contact · FAQ.
- Panel footer (top rule): 663 N. State St · Chicago / Tonight {hours} / email.

### Footer
- Background `#0E0C09`, 1px top rule. It has four auto-fit columns (min 230px):
  1. Stacked lockup (`vector/stacked/tlt-stacked-linen-transparent.svg`, 180px) and the address/email.
  2. HOURS, as three rows.
  3. THE LIST: a Newsletter block with the line "The late set, new menus, first word on special nights."
  4. VISIT: all 10 nav links, 14px.
- Below the columns: a 1px Brass rule running into the bulb (40px wide), then "© 2026 THE LAST TABLE · L&A CORE HOSPITALITY" on the left and "INSTAGRAM · THELASTTABLECHICAGO.COM" on the right (11px, .24em, `#6B5A3E`).

## Pages

### 1. Home
1. **Hero** (Ink, `min-height: calc(100vh - 68px)`, centered column, gap `clamp(36px,6vh,64px)`)
   - Primary lockup, inlined as SVG so the bulb can flicker, at `width: min(900px, 100%)`. Use `squarespace/hero-code-block.html` in a Code block. It must be inline SVG; an `<img>` tag can't animate the filament.
   - When the restaurant is open, show two buttons, 52px tall with padding 0 32px:
     - **RESERVE A TABLE**: Brass fill, Ink text, Jost 600 12px, .3em. On hover the fill turns Linen.
     - **SEE THE MENUS**: ghost style, 1px `rgba(227,214,188,.5)` border. On hover the border turns full Linen.
   - **Coming-soon state** (`launchState = coming-soon`, for pre-launch): replace the buttons with the Bodoni italic line "Opening soon at State & Erie. Be the first to know when the doors open." and an inline email field plus "JOIN THE LIST". Use a Newsletter block, styled as a bottom-border-only input.
   - Strip below: a 36px Brass rule, "TONIGHT · 4 PM – 2 AM" (Jost 11px .34em Brass), then another 36px rule. The hours come from today's day of the week (see Hours). In Squarespace this needs a small JS snippet, which is in `header-injection.html`.
2. **The idea** (Linen ground). This is a two-column block of text plus a 4:5 photo.
   - Kicker: "STATE & ERIE · CHICAGO"
   - H2 (Limelight): "The last seating gets the same care as the first."
   - Bodoni lede: "Every great Chicago night has a last table — the one still laughing when the chairs go up."
   - Body: "We built a supper club around it. Dinner from four, cocktails that run late, a live set when the plates clear, and a room lit low enough that the city outside goes quiet."
   - Link: READ OUR STORY
3. **The evening** (Ink). Three cards with 18px gaps:
   - Card style: 1px `rgba(168,139,85,.35)` border, padding `clamp(28px,4vw,44px)`. Card 1 and 3 use `#1B1813`; the middle card uses Forest.
   - Dinner (FROM 4 PM) links to Menus with the Dinner tab open.
   - The Bar (LATE INTO THE NIGHT) links to Menus with the Bar tab open.
   - Live music (LATE) links to Live Music.
   - Each card has its title in Limelight 32px, a Bodoni italic 19px description in `#C9BFAA`, and an underlined Jost 600 12px .3em link.
4. **On stage this week** (Linen). Show the next 3 events from the Events collection.
   - Each row is a grid: 72px date block (Limelight 34px day plus a 10px month), then the title block, then a RESERVE button.
   - Rows are separated by 1px `rgba(20,18,14,.2)`.
5. **Private dining teaser** (Forest). A 3:2 photo beside the kicker, H2 "Close the doors.", the lede, and a PLAN AN EVENT button.
6. **From the room** (Ink). A heading with an @THELASTTABLECHICAGO link, then a 6-tile square grid (`repeat(auto-fill, minmax(min(170px,46%),1fr))`, 10px gap). Use the Squarespace Instagram block in grid layout with 6 posts.

### 2. Menus
- Page header: "MENUS" / "Dinner, then the bar." / "Dinner from four. When the plates clear, the room belongs to the bar and the band."
- **Tab toggle** with DINNER and BAR:
  - 1px Brass outer border. Each tab is 46px tall with padding 0 28px.
  - Active tab: Brass background, Ink text. Inactive tab: transparent background, Linen text.
  - Deep link with `?tab=bar` so the Home cards can open the right tab.
- Content data is in `tlt-menu-data.js`:
  - Dinner = the entry where `menu: 'dinner'`.
  - Bar = all entries where `menu: 'bar'`. Each one renders with its kicker (11px Brass, .34em) and Bodoni italic title as a group header.
- Sections sit on an auto-fit grid (min 320px), with gaps of 48px between rows and `clamp(32px,5vw,72px)` between columns.
- Section head: Limelight 24px, followed by a hairline that fills the rest of the line.
- Item layout:
  - Name: Jost 600 14px, .14em, uppercase.
  - Price: right-aligned, 14px, Brass.
  - Description: full width, Bodoni italic 17px/1.5, `#C9BFAA`.
  - Section notes: 13px, `#8E846F`.
- Footer row: "Please tell your captain about any allergies. Menus change with the season." with DINNER PDF and BAR PDF links (exports of `TLT Dinner Menu` and `TLT Bar Menu`).
- **Squarespace build:** the Menu block can't do this layout. Use two Code blocks that hold pre-rendered HTML for each tab, plus the toggle script in `header-injection.html`. Generate that HTML from `tlt-menu-data.js` so the PDFs and the site stay in sync.
- Food prices are still TBD, and some spirits show "—" pending pricing.

### 3. Reservations
- Page header: "RESERVATIONS" / "Hold a table." / "Book through Resy. The bar is always first come, first served."
- Left: the **Resy widget**. Paste the Resy embed code into a Code block; the venue ID is still needed. The prototype shows a dashed Brass placeholder with a FIND A TABLE ON RESY button.
- Right, stacked notes:
  - WALK-INS: "The bar is held for walk-ins every night."
  - LARGER PARTIES: links to Private Dining.
  - HOURS: the three rows.
- **Confirm the walk-in copy with operations before launch.**

### 4. Private Dining & Events (Forest ground)
- Page header: "Close the doors." / "Rehearsal dinners, birthdays, a client dinner, a quiet buyout on a Tuesday. Tell us the night and we'll build it around you."
- Left column: a 4:3 photo and the line "Every event starts with a conversation. Our events team will follow up within two business days with menus, pricing and availability." (Confirm the two-day SLA.)
- Right column: a **Form block**. Fields:

  | Field | Required | Validation |
  |---|---|---|
  | Name | yes | — |
  | Email | yes | valid email |
  | Phone | no | — |
  | Preferred date | yes | date picker |
  | Guests | yes | number ≥ 1 |
  | Occasion | no | select: Dinner party · Birthday / celebration · Rehearsal dinner · Corporate dinner · Full buyout · Something else |
  | Tell us about the night | no | textarea |

  - Submit button: SEND INQUIRY.
  - Error text: 13px `#D9A27A`, in the copy shown in the prototype.
  - Inputs: transparent, with only a bottom border `rgba(227,214,188,.5)` that turns Brass on focus. Text 17px Linen. Labels Jost 11px .3em Brass.
  - Success state: a Brass-bordered panel reading "Thank you, {name}." and "We'll be in touch within two business days…". Set it as the form's Post-Submit HTML.
  - Route submissions to info@atthelasttable.com (Storage: Email).

### 5. Live Music
- Page header: "Stay for the set." / "The band starts when dinner winds down. No cover for dinner guests." (Confirm the no-cover policy.)
- Use a **Squarespace Events collection** in list view. Each event needs a title, start and end time, and an excerpt for the "who" line.
- Row layout: an 80px date block (Limelight 40px day), then the eyebrow "FRIDAY · 10 PM – 1 AM" (11px Brass .3em), the title (Jost 500 20px), the excerpt (Bodoni italic 17px), and a RESERVE button on the right.
- **The six events in the prototype are sample data.**

### 6. Our Story (Linen ground, centered 760px column)
- H1: "One light still on." Then the Bodoni lede, a 16:9 photo, three body paragraphs (18px/1.85), and a signature: "LeQoinne Rice / OWNER". Use the copy from the prototype verbatim.

### 7. Gift Cards
- Two columns.
- Left: a card visual. It is 1.586:1, Ink, 1px Brass border, radius 14px, shadow `0 30px 60px rgba(0,0,0,.6)`. It shows the one-color linen wordmark, "A NIGHT AT THE LAST TABLE", and the bulb.
- Right: H1 "Give someone the last table.", the line "Digital or physical, any amount. Good for dinner, drinks and the late set.", and two buttons, **BUY ON TOAST** and **CHECK A BALANCE**. Both link to the Toast gift card URL, which is still needed.

### 8. Press (Linen ground)
- Press kit list: Logo files (ZIP), Dinner menu (PDF), Bar menu (PDF), Brand identity (PDF). Upload the files to Squarespace and link them.
- Fact sheet: concept, address, hours, owner, reservations and press contact.
- No coverage section until there is coverage.

### 9. Careers
- H1: "Join the opening team." / "We train people to take care of people. If that's how you like to work, we'd like to meet you."
- Role rows: title (Jost 500 20px), a meta line (11px Brass .3em), and an APPLY button.
  - APPLY is a `mailto:info@atthelasttable.com?subject=Application — {Role}` link. It can be swapped later for an ATS link (7shifts / Harri / Culinary Agents).
- **The roles are placeholders.** Confirm them with HR.

### 10. Hours & Contact
- H1: "663 N. State Street."
- Left column: HOURS rows, GETTING HERE ("Valet and parking details coming soon." This is a placeholder until valet is confirmed), and WRITE TO US (email and IG).
- Right column: a **Map block** for 663 N. State St, Chicago, IL 60654, with dark styling and a minimum height of 420px.

### Coming-soon state & countdown (live until Nov 17, 2026 · 4 PM CT)
- Home hero shows the primary lockup, then **COMING SOON** (Jost 600 12px, .4em, Brass), a 4-cell countdown (DAYS · HOURS · MINUTES · SECONDS — Limelight `clamp(34px,5vw,56px)` numerals, 10px Brass labels, 1px `rgba(168,139,85,.45)` cell borders, 4 equal columns), the Bodoni italic line "Doors open to the public November 17 at 4 PM. Join the list for first word.", and the email signup.
- The strip below reads "NOVEMBER 17 · 4 PM · STATE & ERIE"; after opening it switches to "TONIGHT · {hours}".
- Target: `2026-11-17T16:00:00-06:00` (Chicago is on CST by then). In auto mode the site flips to the open state (Reserve + Menus buttons) the moment the countdown hits zero.
- Squarespace: `squarespace/countdown-code-block.html` — paste into a Code block in the hero; it hides itself at opening. Swap the hero buttons back in on launch day.

## Additions after the peer review (October 6, 2026)
These additions came from comparing the site against top U.S. supper clubs and steakhouses. Policy copy is **drafted for approval**, so confirm every number before launch.

### Menus: third tab, BRUNCH
- The tabs are now DINNER · BAR · BRUNCH, with padding reduced to 0 22px so all three fit at 375px wide.
- Deep links: `?tab=dinner`, `?tab=bar` and `?tab=brunch`.
- The Brunch tab has the kicker "SUNDAY BRUNCH · 9 AM – 3 PM" and the title "The first seating". It shows the Brunch Cocktails section from `tlt-menu-data.js`, followed by a "From the Kitchen" note: "The brunch food menu arrives before opening day." Swap that note for the brunch food menu when it exists.

### Reservations: booking policy block (draft)
- New block: "Tables open on Resy 30 days ahead. We hold your table for 15 minutes. Please cancel at least 24 hours ahead; late cancellations and no-shows may be charged $25 per guest. Fully booked? Join Resy Notify and we'll let you know when a table opens."
- Larger parties now reads "Online booking is for parties of up to six. For seven or more…". Set the matching party-size limit in Resy.

### Private Dining: spaces and events packet
- There are three rows, each with a Limelight 22px name, an 11px Brass capacity line and a Bodoni italic description:
  - Full buyout (SEATED [—] · STANDING [—])
  - Semi-private dining (SEATED [—])
  - After-ten reception (STANDING [—])
- Capacities are still needed. Use the fire-marshal occupancy numbers.
- Button: **DOWNLOAD THE EVENTS PACKET**, an outline button 48px tall. It links to an events PDF that hasn't been made yet.

### Hours & Contact
- CALL row with a `tel:` link. **The phone number is still needed.**
- GETTING HERE adds: "The nearest L stop is Grand on the Red Line, two blocks south."
- The map block gets a **GET DIRECTIONS** button linking to Google Maps for 663 N State St.

### New page: FAQ ("House notes.")
- Header: kicker "KNOW BEFORE YOU GO", H1 "House notes.", and the lede "A few things worth knowing before your first night with us."
- Thirteen native `<details>` accordions. Each summary is Limelight `clamp(22px,2.4vw,28px)` with a Brass + on the right. Answers are 17px/1.8 `#C9BFAA` at max-width 720px. Rows are separated by 1px `rgba(168,139,85,.3)`.
- Topics: Dress code · Age policy · Reservations & cancellations · Larger parties · Walk-ins · Allergies & dietary needs · Corkage · Celebrations · Live music · Photos · Parking & transit · Gift cards · Accessibility.
- **Draft policies to confirm:**
  - Dress code wording
  - 21+ after 10 PM
  - $25 per-guest no-show fee and the 24-hour window
  - 30-day booking window and 15-minute hold
  - $50 corkage, 2 bottles per table
  - No cover for dinner guests
- In Squarespace, use the Accordion block.
- Add FAQPage JSON-LD (see `squarespace/schema-jsonld.html`).

### Footer
- Under the newsletter: "News and invitations only. Unsubscribe anytime." (12px, `#8E846F`).
- Legal row: ACCESSIBILITY (links to FAQ › Accessibility), PRIVACY and TERMS. Create the Privacy and Terms pages in Squarespace before launch.

## Launch checklist (peer-standard)
- **SEO:**
  - Unique title and meta description on every page.
  - Page titles follow "The Last Table · Supper Club · Chicago". Home: "The Last Table — Supper Club & Cocktails at State & Erie, Chicago".
  - Set an OG/social image: the primary lockup on Ink, 1200×630.
  - Use the favicon from `vector/monogram/`.
- **Structured data:** paste `squarespace/schema-jsonld.html` into Code Injection → Header. It holds the Restaurant schema (address, hours, reservations, menu, Instagram). Fill in the phone number.
- **Google Business Profile:** claim it now. Set the Resy "Reserve" action and the menu link, and keep the hours in sync with the site, including the Sunday brunch split.
- **Accessibility:**
  - Target WCAG 2.1 AA.
  - Alt text on every photo.
  - Visible focus states.
  - The drawer traps focus and closes on Esc.
  - Don't hide text inside images.
- **Privacy:** Privacy and Terms pages; email consent copy on every signup; a cookie banner if analytics or ads pixels are used.
- **Analytics:** GA4 plus Resy conversion tracking, and UTM tags on Instagram links.
- **Performance:** keep the hero inline SVG (no video). Compress photos to WebP under 300 KB and lazy-load everything below the fold.
- **Still needed from ownership:**
  - Phone number
  - Room capacities
  - Events packet PDF
  - Valet details
  - Brunch food menu
  - Kitchen closing time (for a "Kitchen until…" line)
  - Approval of the draft policies above
  - Holiday hours process

## Interactions & behavior
- **Bulb flicker:** the filament (`#filament`) and a radial glow circle share one 7s infinite keyframe:
  - The light stays steady, dips to 25% at 42%, recovers, dips to 55% at 44.5%, and dips again to 40% at 78.6%. See the `tltFlicker` and `tltGlow` keyframes in `custom.css`.
  - Respect `prefers-reduced-motion` by turning the animation off.
  - It appears in the hero, the footer bulb and the gift card. Nowhere else.
- **Drawer:** opens from ☰. It closes on ×, on an overlay click, on any link click, and on Esc (add this in the build). Trap focus while it is open.
- **Menus tab:** a client-side toggle. It reads `?tab=bar` on load.
- **Tonight's hours:** JS uses `getDay()`. Sunday shows "Brunch 9 AM – 3 PM · 5 PM – 2 AM". Friday and Saturday show "4 PM – 3:30 AM". All other days show "4 PM – 2 AM". The day comes from the visitor's clock, so note that it isn't forced to Chicago time.
- **Hover states:** filled buttons go from Brass to Linen. Outline buttons fill with their border color, and the text inverts. Text links go from Brass to Linen. Transitions run 150–200ms ease. There are no transforms or bounces.
- **Forms:** validate on submit. Show errors inline under each field.

## Design tokens
**Color**

| Name | Hex |
|---|---|
| Ink (page) | `#14120E` |
| Ink deep (footer) | `#0E0C09` |
| Card dark | `#1B1813` |
| Photo placeholder | `#2A2119` |
| Linen (text / light ground) | `#E3D6BC` |
| Linen muted (text on dark) | `#C9BFAA` |
| Fine print on dark | `#8E846F` |
| Text on linen | `#14120E` / `#2A2119` / `#4A443A` |
| Label on linen | `#6B5A3E` |
| Forest | `#0F2A1E` |
| Brass | `#A88B55` |
| Deep cognac (kicker on linen, bulb filament) | `#7A3E1C` |
| Glow | `#C4732E` |
| Error | `#D9A27A` |

- Hairlines: Brass at 25–60% opacity.
- **There is no white anywhere.**

**Type** (all from Google Fonts)

| Role | Font | Size / spacing |
|---|---|---|
| Display (H1–H3, nav, section heads, dates) | Limelight 400 | H1 `clamp(40px,6vw,72px)` / 1.02 / .02em · H2 `clamp(30–34px, 4.4vw, 54px)` · H3 24–32px |
| Lede / descriptions / pull lines | Bodoni Moda Italic 400 | 17–28px, line-height 1.5 |
| UI, body, labels | Jost 400/500/600 | Body 17–18px/1.8 · Kicker 11–12px, 600, .34em, uppercase · Buttons 12px, 600, .3em |

- Never set the logo in live type. Always use the SVG files.

**Radius, shadow and size**
- Buttons have a 2px radius. The gift card has 14px. Everything else is square.
- Shadows appear on the gift card only.
- Minimum hit target is 44px. Primary buttons are 52px tall.

## Assets
- **Logos:** `vector/` (all SVG, outlined type). The ones used on the site:
  - `primary/tlt-primary-linen-transparent.svg` (hero, inlined)
  - `horizontal/tlt-horizontal-linen-transparent.svg` (header)
  - `stacked/tlt-stacked-linen-transparent.svg` (footer)
  - `one-color/tlt-onecolor-linen.svg` (gift card)
- **Favicon:** use `vector/monogram/tlt-monogram-LT-small-linen.svg` exported to PNG at 512px.
- **Photography:** none exists yet. Every photo in the prototype is a labeled placeholder showing the shot needed: dining room, private table, the room from the bar, and the Instagram tiles.
- **Content still needed before launch:**
  - Resy venue ID
  - Toast gift-card URL
  - Valet and parking details
  - Food prices
  - Live music schedule
  - Open roles
  - Confirmation of the policy lines: walk-ins, no cover, two-day reply

## Files
- `TLT Website.dc.html`: the full interactive prototype, all 10 pages.
- `tlt-menu-data.js`: the menu content. It is the single source for the site and the print menus.
- `support.js`: the prototype runtime (needed only to open the prototype).
- `vector/`: logo SVGs.
- `squarespace/custom.css`: paste into Design → Custom CSS.
- `squarespace/header-injection.html`: paste into Settings → Advanced → Code Injection → Header. Fonts, the tonight-hours script and the menu toggle.
- `squarespace/hero-code-block.html`: paste into a Code block on Home. Inline primary lockup with the flicker.
- `squarespace/schema-jsonld.html` — Restaurant + FAQPage structured data for Code Injection → Header.
