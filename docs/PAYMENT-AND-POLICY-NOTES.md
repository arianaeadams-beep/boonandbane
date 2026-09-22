# Payment and Policy Notes

Research done September 2026. Policies change. **Re-read the primary source before relying on anything here.** Several pages could not be opened directly, so those rows come from search summaries and are marked.

## What each platform says

| Platform | Finding | Confidence |
|---|---|---|
| Square | Terms ban "occult materials," defined broadly as items claimed to perform a supernatural act. Accounts have been terminated. | Search summaries |
| Shopify Payments | Prohibits psychic readings, tarot, fortune telling. Shopify the platform is less strict than its payment service. | Search summaries |
| PayPal | Not verified. Full policy could not be read. | Unknown |
| Stripe | The readable list mentions psychic services as prohibited only in Japan, Mexico and Thailand. Nothing on occult items or soil. Stripe can still decline any account. | Read directly, may be incomplete |
| Etsy | Bans human remains ("skulls, bones... bodily fluids"). Cemetery soil is not named in what was found. Spell supplies (herbs, crystals, candles) are allowed if listed without metaphysical claims. Spellcasting, reiki, distance healing are banned. Tarot and psychic readings are allowed with a tangible deliverable and no claims of real-world results. | Search summaries (Etsy pages returned 403) |

## Decision log

| Date | Decision | Why |
|---|---|---|
| 2026-09-21 | Start on Etsy with jewelry and deliverable-based readings. | Fastest, least admin, Etsy handles payments and most sales tax. |
| 2026-09-21 | Build own site as the brand home. Use Stripe Payment Links for items Etsy declines. | Full control of the 8-bit look. No backend needed. |
| 2026-09-21 | Keep all copy free of promises of results. | Keeps within Etsy and processor rules. |

## Decisions still needed

- **How does the bag check out?** The bag holds items in the visitor's browser, but there is no payment step yet. Stripe Payment Links are one item each. Options: (a) drop the bag and use BUY NOW links per item (simplest, works now); (b) add a small serverless function so Stripe Checkout can take a whole bag (needs a bit of code and a Cloudflare or Netlify account); (c) use a cart service such as Snipcart (monthly fee). Pick before launch.
- **Newsletter service.** The Guild form collects nothing until a service (Buttondown, Mailchimp, etc.) is chosen and its form URL is set in `site/js/config.js`.

## Open questions

- **Animal bones and skulls (alligator, rib bone, etc.).** Not researched yet. Selling animal parts can be regulated by federal wildlife law, CITES (American alligator is listed) and state law, and Etsy and payment processors have their own animal-product rules. Check each item's species, source and paperwork before listing.

- Will Etsy allow cemetery dirt? (Ask support.)
- Will Stripe approve the account with cemetery dirt and readings in the business description? (Apply honestly and see.)
- Sourcing: is collecting the dirt permitted where it comes from?
- Soil shipping: what does USDA APHIS require for the states and regions we ship to? Domestic soil movement is restricted in parts of the US, and Hawaii and territories need authorization.
- Does Etsy allow directing buyers from Etsy to the own site? (Check the Seller Policy.)

## Sources

- [Stripe restricted businesses](https://stripe.com/legal/restricted-businesses)
- [Etsy Prohibited Items Policy](https://www.etsy.com/legal/prohibited/)
- [Etsy Prohibited Items Policy, effective Aug 11, 2026](https://www.etsy.com/legal/policy/prohibited-items-policy-effective/1475031537022)
- [Etsy Services policy](https://www.etsy.com/legal/policy/services/242665313101)
- [Etsy Help: What Can I Sell on Etsy?](https://help.etsy.com/hc/en-us/articles/360024112614-What-Can-I-Sell-on-Etsy)
- [Wild Hunt: occult sales and payment processing](https://wildhunt.org/2017/03/the-high-risk-digital-world-of-occult-sales-and-psychic-services.html)
- [Square Community: prohibited occult items](https://community.squareup.com/t5/Payments-Troubleshooting/Prohibited-Occult-Items-Resolution-possible/m-p/365764)
- [Shopify community: spiritual businesses](https://community.shopify.com/t/is-shopify-discriminating-against-spiritual-businesses/280506)
- [USDA APHIS soil](https://www.aphis.usda.gov/organism-soil-imports/soil)
