# The Eclectic Boon & Bane

An 8-bit RPG-styled storefront for tarot readings (TALK), handmade bone talismans (EQUIP), and folk-magic ingredients and curios including cemetery dirt (CRAFT).

## Status

The design is built and runs. Every product, price, story and policy is still a placeholder, checkout is not connected, and the newsletter is not connected. See [docs/LAUNCH-CHECKLIST.md](docs/LAUNCH-CHECKLIST.md).

## See it in your browser

No install needed. Double-click `site/index.html`.

## Pages

| Page | Menu | What it is |
|---|---|---|
| `index.html` | (logo) | Animated room, typewriter dialogue box (YES scrolls to the inventory), three inventory slots |
| `talk.html` | TALK | "Consult the Oracle": readings |
| `equip.html` | EQUIP | "Check Your Gear": bone talismans grid |
| `craft.html` | CRAFT | "Mix the Potion": ingredients and curios grid |
| `info.html` | INFO | The lore and ancestral philosophy, plus shipping/returns/privacy drafts |
| `item.html?id=...` | | Item page: framed image, ITEM / CLASS / STATS, + ADD TO BAG |
| `bag.html` | BAG | The shopping bag |

## Where things live

| Path | What it is |
|---|---|
| `site/js/config.js` | Shop name, email, Etsy link, newsletter form URL |
| `site/js/products.js` | Every product (fields explained at the top of the file) |
| `site/js/hero.js` | The animated room and the dialogue box text behavior |
| `site/js/sprites.js` | All pixel art, drawn from text maps |
| `site/css/style.css` | Palette (charcoal, cream, green, red), fonts, pixel borders |
| `site/assets/` | Put real product photos here (create the folder). A pixel grid is overlaid automatically |
| `docs/` | Launch checklist, payment and policy research |

## Adding a product

1. Open `site/js/products.js` and copy an existing entry.
2. Change the fields. Put a photo in `site/assets/` and set `image: "assets/your-photo.jpg"`.
3. Optional: paste a Stripe Payment Link into `payLink` to show a BUY NOW button.

## Publishing (when ready)

The `site/` folder is the whole website. Upload it to Cloudflare Pages or Netlify (free tier) and point the domain at it.

## Ground rules

- **Original art only.** The look is inspired by 8-bit RPGs, but do not use Nintendo or Undertale names, characters, logos, the Triforce, rupees, or famous quotes.
- **Site copy vs. Etsy copy.** The game-stat flavor ("+20 Intuition") is playful and lives on this site by the Owner's choice. Sentences that promise a real supernatural result (for example "allows you to walk safely through the astral fog") carry more risk with payment processors, and Etsy does not allow metaphysical claims in listings. Use the safer wording on Etsy. See [docs/PAYMENT-AND-POLICY-NOTES.md](docs/PAYMENT-AND-POLICY-NOTES.md).
- **Policies are drafts** until the Owner reviews them.

## Roles

- **Owner**: decides what is sold, owns all accounts (Stripe, Etsy, bank, domain) in their own name, writes the story.
- **Helper**: builds and maintains the site. Should not hold the Owner's account passwords. Use each service's "add a team member" feature instead.

## Claude Code permissions

`.claude/settings.json` auto-accepts file edits and common safe commands in this folder, and still asks before pushing, deleting, installing software, or making network requests. It applies when Claude Code is opened **in this folder**.
