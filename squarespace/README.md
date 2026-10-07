# Squarespace kit

This is everything to paste into Squarespace 7.1. Code Injection and Custom CSS need the **Core or Plus** plan.
Build the rest with native blocks (Form, Newsletter, Events, Map, Accordion, Instagram), following `design/handoff/README.md`.

| File | Where it goes |
|---|---|
| `custom.css` | Design → Custom CSS |
| `generated/header-injection.html` | Settings → Advanced → Code Injection → **Header**. It loads the fonts and runs tonight's hours and the menu tabs. |
| `generated/schema-jsonld.html` | **First block** (Restaurant) → Code Injection → Header. **Second block** (FAQPage) → the FAQ page's settings → Advanced → Page Header Code Injection. |
| `hero-code-block.html` | Home → a Code block in the hero. This is the logo with the flickering bulb. |
| `countdown-code-block.html` | Home → a Code block under the hero until opening. It hides itself at 4 PM on November 17. |
| `generated/menus-code-block.html` | Menus → one Code block. It holds the DINNER · BAR · BRUNCH tabs with every menu pre-rendered. |

## Email routing
- **Private Dining form block** → Storage: Email → **events@thelasttablechicago.com**. The handoff said info@; ownership has since moved inquiries to the events inbox.
- Everything else (newsletter notices, general contact) → **info@thelasttablechicago.com**.

## Keep it in sync
Files in `generated/` are rebuilt from `content/` every time someone runs `npm run build`, so menus, hours and FAQ answers are edited in one place only.
After a menu change, re-copy `generated/menus-code-block.html` into the Menus code block.

The other files are the starter snippets from the design handoff. The only change is that the tab padding in `custom.css` is now 22px, so three tabs fit at 375px wide.
