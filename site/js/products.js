// Product catalog for EQUIP (talismans, tools) and CRAFT (spell ingredients, curios).
// PRICES AND ALL "(placeholder)" ITEMS ARE PLACEHOLDERS. Replace with real items.
//
// Fields
//   id          short unique slug, used in the item page link (item.html?id=...)
//   category    "equip" or "craft"
//   title       big heading on the item page
//   name        the "ITEM:" line
//   itemClass   the "CLASS:" line
//   stats       the "STATS:" line (game flavor)
//   lore        the paragraph on the item page
//   price       number, dollars
//   image       optional photo path, e.g. "assets/rib-bone-echo.jpg" (pixel grid is overlaid automatically)
//   sprite      pixel icon shown until a photo exists (key | skull | gem | potion | tombstone | card | heart)
//   payLink     optional Stripe Payment Link. When set, the item page also shows a BUY NOW button.
//   shipRestricted  true adds the soil-shipping warning
//   notice      small print under the description
//
// WRITING TIP: the game-stat flavor (+20 Intuition) is clearly playful. Sentences that promise
// a real supernatural result are riskier with payment processors and are NOT allowed in Etsy
// listings. See docs/PAYMENT-AND-POLICY-NOTES.md before copying this text to Etsy.
window.PRODUCTS = [
  {
    id: "rib-bone-echo",
    category: "equip",
    title: "The Dry-Bone Warding Key",
    name: "The Rib-Bone Echo",
    itemClass: "Key / Animist Artifact",
    stats: "+20 Intuition, +15 Ghostly Ancestor Favor",
    lore: "A handmade token sourced with absolute respect for the animal spirit. In this level of life, some paths are locked behind spiritual doors. This bone talisman acts as an old-world clearance key, allowing you to walk safely through the astral fog.",
    price: 45,
    sprite: "key",
    image: "",
    payLink: ""
  },
  {
    id: "vertebra-charm",
    category: "equip",
    title: "Vertebra Charm (placeholder)",
    name: "Vertebra Charm (placeholder)",
    itemClass: "Amulet / Placeholder",
    stats: "+00 Placeholder",
    lore: "Replace with real details.",
    price: 38,
    sprite: "skull",
    payLink: ""
  },
  {
    id: "cemetery-dirt-jar",
    category: "craft",
    title: "Cemetery Dirt Jar (placeholder)",
    name: "Cemetery Dirt Jar (placeholder)",
    itemClass: "Reagent / Folk Curio",
    stats: "+00 Placeholder",
    lore: "Small sealed jar. Sold as a curio in the hoodoo folk tradition. Sourcing details go here.",
    price: 15,
    sprite: "tombstone",
    shipRestricted: true,
    notice: "Sold as a traditional curio.",
    payLink: ""
  },
  {
    id: "herb-bundle",
    category: "craft",
    title: "Dried Herb Bundle (placeholder)",
    name: "Dried Herb Bundle (placeholder)",
    itemClass: "Reagent / Herb",
    stats: "+00 Placeholder",
    lore: "Replace with real details: which herb, how it was grown or gathered, how much you get.",
    price: 12,
    sprite: "potion",
    payLink: ""
  }
];
