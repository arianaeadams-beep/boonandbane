# Launch Checklist

Do the phases in order. Phase 1 decides whether the rest is possible.

## Phase 1: Can we sell this? (before spending money)

- [ ] Owner reads Stripe's [prohibited and restricted businesses](https://stripe.com/legal/restricted-businesses) list.
- [ ] Owner reads Etsy's Prohibited Items and Services policies (in force since Aug 11, 2026).
- [ ] Decide what goes where (see the decision in `PAYMENT-AND-POLICY-NOTES.md`).
- [ ] Confirm it is legal to collect the cemetery dirt where it comes from (permission, state/local rules).
- [ ] Confirm soil shipping rules with USDA APHIS and USPS for the states you will ship to.

## Phase 2: Business basics

- [ ] Choose the real shop name (replace "Hollow Ground" in `site/js/config.js`).
- [ ] Get an EIN from irs.gov. It is free. Do not pay a site for it.
- [ ] Open a business bank account.
- [ ] Look up the state's sales tax and seller's permit rules.
- [ ] Create a business email address.

## Phase 3: Etsy shop (fastest way to start selling)

- [ ] Owner creates the Etsy account and verifies identity.
- [ ] List jewelry.
- [ ] List readings, each with a tangible deliverable (email, recording, photo of spread) and no claims of real-world results.
- [ ] Ask Etsy support whether cemetery dirt is allowed before listing it.
- [ ] Original pixel-art logo and banner.

## Phase 4: Own website

- [ ] Real product photos and descriptions in `site/js/products.js`.
- [ ] Real About text.
- [ ] Owner reviews and edits `site/policies.html`.
- [ ] Buy the domain (Cloudflare or Namecheap, about $12 a year).
- [ ] Create the Stripe account in the Owner's name. Be upfront about what is sold in the application.
- [ ] Create one Stripe Payment Link per product, with shipping address collection on.
- [ ] Pick a booking tool for readings (Calendly, Acuity, or Cal.com) or use Payment Links.
- [ ] Publish `site/` on Cloudflare Pages or Netlify and connect the domain.

## Phase 5: Shipping

- [ ] Scale, mailers, jars, packing material.
- [ ] Pirate Ship account for USPS labels.
- [ ] Written list of places soil items will not ship to.

## Phase 6: Test and launch

- [ ] Place a real $1 test order. Refund it.
- [ ] Check every page on a phone.
- [ ] Check every link and every button.
- [ ] Announce.

## After launch

- [ ] Do not leave a large balance sitting in the payment account.
- [ ] Have a backup plan if a processor closes the account (a high-risk merchant account provider).
- [ ] Keep records of income for taxes.
