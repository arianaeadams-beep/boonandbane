// Pixel-art sprites drawn from text maps. All art is original.
// Each sprite = a palette (letter -> color) + a map ('.' is transparent).
// Used as inline SVG in the pages (data-sprite="...") and drawn onto the hero canvas.
(function () {
  var SPRITES = {
    heart: {
      palette: { R: "#ff0033", W: "#ffb3c1" },
      map: [
        ".RR.RR.",
        "RWRRRRR",
        "RRRRRRR",
        ".RRRRR.",
        "..RRR..",
        "...R..."
      ]
    },
    gem: {
      palette: { G: "#00f060", W: "#c8ffe0", D: "#00a040" },
      map: [
        "...G...",
        "..GWG..",
        ".GWGGD.",
        "GWGGGGD",
        ".GGGGD.",
        "..GGD..",
        "...D..."
      ]
    },
    tombstone: {
      palette: { S: "#5b5f78", L: "#8b8fa8" },
      map: [
        "..SSSSS..",
        ".SLLLLLS.",
        "SLLLSLLLS",
        "SLLSSSLLS",
        "SLLLSLLLS",
        "SLLLSLLLS",
        "SLLLLLLLS",
        "SLLLLLLLS",
        "SSSSSSSSS"
      ]
    },
    skull: {
      palette: { X: "#e8dfc4", S: "#b8ad8a", K: "#14100c" },
      map: [
        "...XXXXXX...",
        "..XXXXXXXX..",
        ".XXXXXXXXXS.",
        ".XKKXXXXKKS.",
        ".XKKXXXXKKS.",
        ".XXXXKKXXXS.",
        "..XXXXXXXS..",
        "...XXXXXX...",
        "...XKXXKX...",
        "....XXXX...."
      ]
    },
    card: {
      palette: { X: "#f4f1ea", P: "#3a2a5a", Y: "#ffd23f" },
      map: [
        "XXXXXXX",
        "XPPPPPX",
        "XPPYPPX",
        "XPYYYPX",
        "XPPYPPX",
        "XPYPYPX",
        "XPPPPPX",
        "XXXXXXX"
      ]
    },
    key: {
      palette: { X: "#e8dfc4", S: "#b8ad8a" },
      map: [
        ".XXX.",
        "X...X",
        "X...X",
        ".XXX.",
        "..X..",
        "..XS.",
        "..XXS",
        "..X..",
        "..XXS",
        "..X.."
      ]
    },
    potion: {
      palette: { C: "#8a5a2b", O: "#f4f1ea", G: "#00c050", W: "#b8ffd8" },
      map: [
        "..CCC..",
        "...O...",
        "...O...",
        "..OGO..",
        ".OGGGO.",
        "OGGWGGO",
        "OGGGGGO",
        ".OGGGO.",
        "..OOO.."
      ]
    },
    moon: {
      palette: { X: "#f4f1ea", C: "#cfc9a8" },
      map: [
        "...XXXXXX...",
        "..XXXXXXXX..",
        ".XXXCXXXXXX.",
        "XXXXXXXXCXXX",
        "XXXXXXXXXXXX",
        "XXCXXXXXXXXX",
        "XXXXXXXCXXXX",
        "XXXXXXXXXXXX",
        ".XXXXXXXXXX.",
        "..XXCXXXXX..",
        "...XXXXXX..."
      ]
    },
    moondim: {
      palette: { X: "#8f8b7a", C: "#736f60" },
      map: [
        "...XXXXXX...",
        "..XXXXXXXX..",
        ".XXXCXXXXXX.",
        "XXXXXXXXCXXX",
        "XXXXXXXXXXXX",
        "XXCXXXXXXXXX",
        "XXXXXXXCXXXX",
        "XXXXXXXXXXXX",
        ".XXXXXXXXXX.",
        "..XXCXXXXX..",
        "...XXXXXX..."
      ]
    }
  };

  function svg(name, px) {
    var s = SPRITES[name];
    if (!s) return "";
    var h = s.map.length, w = s.map[0].length, rects = "";
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        var c = s.palette[s.map[y][x]];
        if (c) rects += '<rect x="' + x + '" y="' + y + '" width="1" height="1" fill="' + c + '"/>';
      }
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + " " + h +
      '" width="' + w * px + '" height="' + h * px + '" aria-hidden="true">' + rects + "</svg>";
  }

  window.SPRITES = SPRITES;

  window.drawSprite = function (ctx, name, x, y) {
    var s = SPRITES[name];
    if (!s) return;
    for (var j = 0; j < s.map.length; j++) {
      for (var i = 0; i < s.map[j].length; i++) {
        var c = s.palette[s.map[j][i]];
        if (c) { ctx.fillStyle = c; ctx.fillRect(x + i, y + j, 1, 1); }
      }
    }
  };

  window.hydrateSprites = function (root) {
    (root || document).querySelectorAll("[data-sprite]").forEach(function (el) {
      el.classList.add("sprite");
      el.innerHTML = svg(el.getAttribute("data-sprite"), parseInt(el.getAttribute("data-px") || "4", 10));
    });
  };
})();
