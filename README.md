# The Last Table — website

Supper club at 663 N. State St (State & Erie), Chicago · L&A Core Hospitality.

This repository holds three things, all fed by the same content:

1. **The website**: a fast static site with all 11 pages, plus Privacy, Terms and a 404 page, built from the final design. You can preview it, share it, or host it as is.
2. **The Squarespace kit** in `squarespace/`: paste-in code for a Squarespace 7.1 build, including pre-rendered menus generated from the same data.
3. **The design handoff** in `design/handoff/`: the original prototype, spec and logo package, kept unchanged for reference.

## Preview it

You need [Node.js](https://nodejs.org) 20 or newer. There is nothing else to install.

```sh
npm run dev        # builds, then serves at http://localhost:8080
```

- Add `?launch=open` to any page to see the site as it will look after opening. Until November 17 at 4 PM CT the home page shows the countdown, and then it switches on its own.
- `npm run check` builds the site and checks every page for broken links, missing alt text, duplicate IDs, a single H1 and structured-data errors.

## Change content

Edit the files in `content/`, then run `npm run build`. Every page and the Squarespace kit update together.

| To change… | Edit |
|---|---|
| Hours, address, phone, email, Resy/Toast links, form endpoints, launch time, private-dining spaces | `content/site.js` |
| Dinner, bar and brunch menus (also the source for the print menus) | `content/menu-data.js` |
| Live music calendar | `content/events.js` (past nights hide themselves) |
| FAQ / house notes | `content/faq.js` |
| Open roles | `content/careers.js` |
| Photos | Save to `src/assets/photos/`; see the README there |
| Menu PDFs, events packet, brand PDF | Save to `src/assets/downloads/`; their links appear once the file exists |
| Page copy | `src/pages/*.mjs` |

Each build ends with a **"Still needed before launch"** list. It reads the content and tells you exactly what is still missing.

## Put it online

- **Netlify** (easiest): connect this repository and it builds itself (`netlify.toml`). Point `thelasttablechicago.com` at it when you're ready.
- **GitHub Pages** (free preview link): Settings → Pages → Source: *GitHub Actions*, then add the repository variable `DEPLOY_TO_PAGES` = `true` (Settings → Secrets and variables → Actions → Variables). Every push to `main` then publishes. Private repositories need a paid GitHub plan for Pages.
- **Squarespace**: follow `squarespace/README.md`.

### Forms
Squarespace handles forms natively. On the static site, set `forms.newsletter` and `forms.inquiry` in `content/site.js` to a form service endpoint such as Formspree, Basin or Getform. Until then, the signup and private-dining forms still validate, then open the guest's email app with everything filled in: signups go to info@thelasttablechicago.com and private dining inquiries to events@thelasttablechicago.com.

## Still needed from ownership
The build lists these live. The full list is:

- Phone number · Resy venue link (and widget code, optional) · Toast gift-card link
- Room capacities (fire-marshal numbers) · events packet PDF · dinner, bar and brand PDFs
- Photography (10 slots, each labeled with the shot it needs) · brunch food menu · food prices
- Live music schedule (the calendar holds sample nights) · open roles (placeholders, confirm with HR)
- Valet and parking details · kitchen closing time · holiday-hours process
- **Approval of the draft policies**: dress code wording · 21+ after 10 PM · $25 no-show fee and 24-hour window · 30-day booking window and 15-minute hold · $50 corkage (two bottles) · no cover for dinner guests · walk-in bar · two-business-day reply on inquiries
- **Counsel review** of the draft Privacy and Terms pages

## Decisions made during the build

These are places where the build departs from, or fills a gap in, the handoff. Each one is easy to reverse.

- **Footer fine print.** The copyright row uses `#8E846F` instead of `#6B5A3E`. The original measures 2.9:1 on the footer background, which fails WCAG AA; the new color measures 5.3:1.
- **Chicago time.** "Tonight" hours and past-event hiding use Chicago time, and the night rolls over at 4 AM. At 1 AM Saturday the site still shows Friday's hours. The handoff used the visitor's own clock.
- **Sample events.** The six sample nights from the prototype were moved to the opening weeks (Nov 20 – Dec 3) so the calendar isn't empty in the preview.
- **Bar allergen notes.** The bar menus' footer lines, such as "Green Room: milk and egg…", aren't shown, because the prototype doesn't show them. Consider moving allergen lines into section notes so guests see them online.
- **Links and placeholders.** Download links stay hidden until the file exists, so the site never shows a broken link. The Resy and Toast buttons fall back to resy.com and toasttab.com, as in the prototype. The Resy panel uses guest-facing copy instead of the designer note.
- **Email consent.** The consent line ("News and invitations only. Unsubscribe anytime.") also appears under the coming-soon signup, per the launch checklist.
- **New copy.** The Privacy and Terms drafts, the 404 page and the "next lineup is on its way" empty state are new. Please review them.
