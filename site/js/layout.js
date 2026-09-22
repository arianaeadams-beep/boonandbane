// Injects the shared header (pixel menu) and footer (end of level) into every page.
(function () {
  var S = window.SITE;
  var pages = [
    ["talk.html", "TALK"],
    ["equip.html", "EQUIP"],
    ["craft.html", "CRAFT"],
    ["info.html", "INFO"]
  ];
  var here = location.pathname.split("/").pop() || "index.html";
  // The item page lives under EQUIP; the bag has its own link.
  var section = here === "item.html" ? "equip.html" : here;

  var links = pages.map(function (p) {
    var cur = p[0] === section ? ' aria-current="page"' : "";
    return '<li><a href="' + p[0] + '"' + cur + ">" + p[1] + "</a></li>";
  }).join("");
  var bagCur = here === "bag.html" ? ' aria-current="page"' : "";
  links += '<li class="bag"><a id="bag-link" href="bag.html"' + bagCur + ">BAG (0)</a></li>";

  var header = document.getElementById("site-header");
  if (header) {
    header.className = "site-header wrap";
    header.innerHTML =
      '<a class="brand" href="index.html">THE ECLECTIC BOON <span class="amp">&amp;</span> BANE</a>' +
      '<nav aria-label="Main"><ul class="nav">' + links + "</ul></nav>";
  }

  function updateBag() {
    var a = document.getElementById("bag-link");
    if (a && window.Bag) a.textContent = "BAG (" + window.Bag.count() + ")";
  }
  document.addEventListener("bagchange", updateBag);
  updateBag();

  var footer = document.getElementById("site-footer");
  if (footer) {
    var etsy = S.etsyUrl ? ' &middot; <a href="' + S.etsyUrl + '">Etsy shop</a>' : "";
    footer.className = "site-footer wrap";
    footer.innerHTML =
      '<section class="box newsletter" aria-labelledby="guild-h">' +
      '<h2 id="guild-h">SAVE YOUR PROGRESS?</h2>' +
      "<p>Enter your email to join the Guild for weekly astrology lore, restock alerts on bones, and secret spell recipes.</p>" +
      '<form id="guild-form" method="post">' +
      '<label class="vh" for="guild-email">Email address</label>' +
      '<input id="guild-email" type="email" required autocomplete="email" placeholder="you@email.com">' +
      '<button class="btn" type="submit">[ JOIN THE GUILD ]</button></form>' +
      '<p id="guild-msg" class="msg" role="status"></p></section>' +
      '<p class="bottom-line">You feel entirely filled with INTUITION.</p>' +
      '<p class="fine">Readings are offered for spiritual and entertainment purposes.<br>' +
      'Contact: <a href="mailto:' + S.contactEmail + '">' + S.contactEmail + "</a>" + etsy + "</p>" +
      '<p class="fine">&copy; ' + new Date().getFullYear() + " " + S.name + "</p>";

    var form = document.getElementById("guild-form");
    var input = document.getElementById("guild-email");
    if (S.newsletterAction) {
      form.action = S.newsletterAction;
      input.name = S.newsletterEmailField || "email";
    } else {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        document.getElementById("guild-msg").textContent =
          "* The Guild hall is not open yet. Nothing was saved. Check back soon.";
      });
    }
  }

  document.title = document.title.replace("{name}", S.name);
  window.hydrateSprites();
})();
