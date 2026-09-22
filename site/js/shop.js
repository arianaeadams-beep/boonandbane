// Product grids (EQUIP, CRAFT), the item page, and the bag page.
(function () {
  var P = window.PRODUCTS || [], byId = {};
  P.forEach(function (p) { byId[p.id] = p; });

  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function money(n) { return "$" + Number(n).toFixed(2); }
  function art(p, px) {
    return p.image
      ? '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + '">'
      : '<span data-sprite="' + esc(p.sprite || "gem") + '" data-px="' + px + '"></span>';
  }
  function link(p) { return "item.html?id=" + encodeURIComponent(p.id); }

  // ---- Grid of items on EQUIP / CRAFT ----
  var grid = document.getElementById("product-grid");
  if (grid) {
    var cat = grid.getAttribute("data-category");
    var list = P.filter(function (p) { return p.category === cat; });
    grid.innerHTML = list.length ? list.map(function (p) {
      return '<article class="box card">' +
        '<a class="art pixgrid" href="' + link(p) + '" aria-label="Inspect ' + esc(p.name) + '">' + art(p, 8) + "</a>" +
        "<h3>" + esc(p.name) + "</h3>" +
        '<div class="klass">' + esc(p.itemClass) + "</div>" +
        '<div class="price">' + money(p.price) + "</div>" +
        '<a class="btn" href="' + link(p) + '">[ INSPECT ]</a></article>';
    }).join("") : '<p class="notice">* Nothing here yet. Check back soon.</p>';
    window.hydrateSprites(grid);
  }

  // ---- Item page ----
  var mount = document.getElementById("item-detail");
  if (mount) {
    var id = new URLSearchParams(location.search).get("id");
    var p = byId[id];
    if (!p) {
      mount.innerHTML = '<div class="box"><p>* You search the chest, but that item is not here.</p>' +
        '<a class="btn" href="equip.html">[ BACK TO GEAR ]</a></div>';
    } else {
      document.title = p.name + " | " + window.SITE.name;
      var warn = p.shipRestricted
        ? '<p class="notice warn">Ships within the contiguous US only. Not available to Hawaii, US territories, or abroad.</p>' : "";
      var note = p.notice ? '<p class="notice">' + esc(p.notice) + "</p>" : "";
      var buy = p.payLink ? '<a class="btn red" href="' + esc(p.payLink) + '">[ BUY NOW ]</a>' : "";
      mount.innerHTML =
        '<div class="frame"><div class="frame-inner pixgrid">' + art(p, 14) + "</div></div>" +
        '<div class="box item-text">' +
        "<h1>" + esc(p.title || p.name) + "</h1>" +
        '<dl class="stats">' +
        "<div><dt>ITEM:</dt><dd>" + esc(p.name) + "</dd></div>" +
        "<div><dt>CLASS:</dt><dd>" + esc(p.itemClass) + "</dd></div>" +
        "<div><dt>STATS:</dt><dd>" + esc(p.stats) + "</dd></div></dl>" +
        '<p class="lore">' + esc(p.lore) + "</p>" + note + warn +
        '<div class="price">' + money(p.price) + "</div>" +
        '<button class="btn" id="add" type="button">[ + ADD TO BAG ]</button>' + buy +
        '<p class="msg" id="add-msg" role="status"></p></div>';
      window.hydrateSprites(mount);
      document.getElementById("add").addEventListener("click", function () {
        window.Bag.add(p.id);
        document.getElementById("add-msg").innerHTML =
          '* You put the ' + esc(p.name) + ' in your bag. <a href="bag.html">Open bag</a>';
      });
    }
  }

  // ---- Bag page ----
  var bag = document.getElementById("bag-list");
  if (bag) {
    function render() {
      var items = window.Bag.items().filter(function (i) { return byId[i.id]; });
      if (!items.length) {
        bag.innerHTML = '<p>* Your bag is empty.</p><a class="btn" href="equip.html">[ CHECK YOUR GEAR ]</a>';
        return;
      }
      var total = 0;
      var rows = items.map(function (i) {
        var p = byId[i.id]; total += p.price * i.qty;
        return '<div class="bag-row">' +
          '<span class="nm"><a href="' + link(p) + '">' + esc(p.name) + "</a></span>" +
          '<span><button class="mini" data-act="dec" data-id="' + esc(p.id) + '" aria-label="One fewer">-</button> ' +
          '<span class="qty">' + i.qty + '</span> ' +
          '<button class="mini" data-act="inc" data-id="' + esc(p.id) + '" aria-label="One more">+</button></span>' +
          "<span>" + money(p.price * i.qty) + "</span>" +
          '<button class="mini" data-act="rm" data-id="' + esc(p.id) + '">DROP</button></div>';
      }).join("");
      bag.innerHTML = rows +
        '<div class="bag-total">TOTAL ' + money(total) + "</div>" +
        '<p class="notice">Shipping and tax are added at checkout.</p>' +
        '<span class="btn disabled">CHECKOUT: OPENING SOON</span>';
    }
    bag.addEventListener("click", function (e) {
      var b = e.target.closest("[data-act]");
      if (!b) return;
      var id = b.getAttribute("data-id"), act = b.getAttribute("data-act");
      var cur = window.Bag.items().filter(function (i) { return i.id === id; })[0];
      if (!cur) return;
      if (act === "inc") window.Bag.setQty(id, cur.qty + 1);
      if (act === "dec") window.Bag.setQty(id, cur.qty - 1);
      if (act === "rm") window.Bag.remove(id);
    });
    document.addEventListener("bagchange", render);
    render();
  }
})();
