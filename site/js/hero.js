// Hero: an animated pixel-art room (canvas) and the typewriter dialogue box.
(function () {
  var canvas = document.getElementById("scene");
  if (!canvas) return;

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  // Canvas size in "game pixels" and the desk-top y. The extra height under the desk
  // is where the dialogue box sits, so it never covers the skulls and candles.
  var W = 320, H = 210, DT = 104;

  function r(x, y, w, h, c) { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); }

  // Small deterministic random so the stars are the same on every visit
  var seed = 11;
  function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }

  var stars = [];
  for (var i = 0; i < 20; i++) {
    stars.push({
      x: 123 + Math.floor(rnd() * 72), y: 19 + Math.floor(rnd() * 60),
      big: rnd() > 0.75, period: 3 + Math.floor(rnd() * 5), phase: Math.floor(rnd() * 8)
    });
  }

  // Flame frames, 5 wide. O orange, Y yellow, W hot white.
  var FLAME = {
    O: "#ff8a1f", Y: "#ffd23f", W: "#fff6c8",
    frames: [
      ["..O..", ".OYO.", ".OYO.", "OYWYO", ".OYO."],
      [".O...", ".OYO.", "OYYO.", "OYWYO", ".OYO."],
      ["...O.", ".OYO.", ".OYYO", "OYWYO", ".OYO."]
    ]
  };

  function flame(x, y, k) {
    var f = FLAME.frames[k];
    for (var j = 0; j < f.length; j++) {
      for (var i = 0; i < f[j].length; i++) {
        var c = FLAME[f[j][i]];
        if (c) r(x + i, y + j, 1, 1, c);
      }
    }
  }

  function flameIndex(n) { return ((n * 2654435761) >>> 0) % 4 % 3; } // 0..2, uneven flicker

  function glow(cx, cy, rad, alpha) {
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "#ff9a2e";
    for (var dy = -rad; dy <= rad; dy++) {
      var half = Math.floor(Math.sqrt(rad * rad - dy * dy));
      ctx.fillRect(cx - half, cy + dy, half * 2, 1);
    }
    ctx.globalAlpha = 1;
  }

  // Candles: x = left edge, h = body height, id = flicker seed
  var CANDLES = [
    { x: 36, h: 20, id: 1 }, { x: 78, h: 12, id: 2 },
    { x: 280, h: 18, id: 3 }, { x: 293, h: 10, id: 4 }
  ];

  function candleBody(c) {
    var top = DT - c.h;
    r(c.x - 2, DT - 1, 10, 2, "#77777a");            // dish
    r(c.x, top, 6, c.h, "#f4f1ea");                  // wax
    r(c.x + 4, top, 2, c.h, "#cdc5ab");              // shade
    r(c.x + 1, top + 3, 1, 5, "#e6dfc9");            // drip
    r(c.x + 2, top - 3, 1, 3, "#2a2a2a");            // wick
  }

  function drawScene(t) {
    // Wall and wallpaper stripes
    r(0, 0, W, H, "#1b1511");
    for (var x = 0; x < W; x += 16) r(x, 0, 2, DT, "#241b15");

    // Hanging herbs on a rope
    r(18, 16, 84, 1, "#4a3520");
    [26, 50, 76].forEach(function (hx) {
      r(hx + 2, 17, 1, 6, "#4a3520");
      r(hx, 23, 6, 12, "#3f5a2a");
      r(hx + 1, 25, 4, 8, "#5a7a35");
      r(hx + 2, 35, 2, 3, "#2f4520");
    });

    // Window sky, stars, moon
    r(122, 18, 76, 64, "#0a1030");
    r(122, 60, 76, 22, "#101a44");                   // lower sky, slightly lighter
    stars.forEach(function (s) {
      var on = ((Math.floor(t / 300) + s.phase) % s.period) !== 0;
      if (!on) return;
      r(s.x, s.y, s.big ? 2 : 1, s.big ? 2 : 1, s.big ? "#fff6c8" : "#cfd6ff");
    });
    var moonOn = Math.floor(t / 1000) % 2 === 0;    // blinks bright / dim each second
    if (moonOn) {
      ctx.globalAlpha = 0.10; ctx.fillStyle = "#f4f1ea";
      for (var dy = -13; dy <= 13; dy++) {
        var half = Math.floor(Math.sqrt(169 - dy * dy));
        ctx.fillRect(177 - half, 34 + dy, half * 2, 1);
      }
      ctx.globalAlpha = 1;
    }
    window.drawSprite(ctx, moonOn ? "moon" : "moondim", 171, 28);

    // Window frame, mullions, sill
    r(116, 12, 88, 6, "#6b4423"); r(116, 82, 88, 6, "#6b4423");
    r(116, 12, 6, 76, "#6b4423"); r(198, 12, 6, 76, "#6b4423");
    r(158, 18, 4, 64, "#6b4423"); r(122, 48, 76, 4, "#6b4423");
    r(116, 12, 88, 2, "#8a5a2b");
    r(110, 88, 100, 6, "#8a5a2b"); r(110, 93, 100, 1, "#43290f");

    // Shelf with jars and a small skull
    r(224, 60, 78, 4, "#6b4423");
    r(226, 64, 3, 6, "#43290f"); r(297, 64, 3, 6, "#43290f");
    r(230, 46, 10, 14, "#2c4a38"); r(231, 44, 8, 2, "#8a5a2b"); r(232, 48, 2, 8, "#3f6a50");
    r(246, 46, 10, 14, "#4a2c4a"); r(247, 44, 8, 2, "#8a5a2b"); r(248, 48, 2, 8, "#6a4a6a");
    r(262, 48, 10, 12, "#5b4a1f"); r(263, 46, 8, 2, "#8a5a2b"); r(264, 50, 2, 6, "#7b6a2f");
    window.drawSprite(ctx, "skull", 282, 50);

    // Desk
    r(0, DT, W, 8, "#8a5a2b"); r(0, DT, W, 2, "#b07a3a");
    r(0, DT + 8, W, H - DT - 8, "#5a3a1c"); r(0, DT + 8, W, 3, "#3a230d");
    [64, 128, 192, 256].forEach(function (sx) { r(sx, DT + 11, 1, H - DT - 11, "#43290f"); });
    [32, 64, 96].forEach(function (oy) { r(0, DT + oy, W, 1, "#43290f"); });
    r(20, DT + 20, 3, 1, "#43290f"); r(150, DT + 46, 4, 1, "#43290f"); r(230, DT + 24, 3, 1, "#43290f");
    r(90, DT + 52, 3, 1, "#43290f"); r(290, DT + 50, 4, 1, "#43290f");

    // Desk objects: skull, open book, book stack with skull
    window.drawSprite(ctx, "skull", 54, DT - 10);
    r(136, DT - 5, 23, 5, "#e8dfc4"); r(161, DT - 5, 23, 5, "#e8dfc4");
    r(159, DT - 6, 2, 6, "#7a1f2b"); r(136, DT - 1, 48, 1, "#7a1f2b");
    r(140, DT - 4, 14, 1, "#a89f84"); r(165, DT - 4, 14, 1, "#a89f84");
    r(236, DT - 8, 28, 8, "#3a5a7a"); r(238, DT - 15, 24, 7, "#7a1f2b");
    window.drawSprite(ctx, "skull", 244, DT - 25);

    // Candles: wax first, then the warm light, then the flames on top
    CANDLES.forEach(candleBody);
    CANDLES.forEach(function (c) {
      var n = Math.floor(t / 110) + c.id * 7;
      var k = flameIndex(n), cx = c.x + 3, cy = DT - c.h - 8;
      glow(cx, cy, 40, 0.035 + (k === 0 ? 0.01 : 0));
      glow(cx, cy, 26, 0.05);
      glow(cx, cy, 13, 0.08 + (k === 1 ? 0.02 : 0));
    });
    CANDLES.forEach(function (c) {
      var k = flameIndex(Math.floor(t / 110) + c.id * 7);
      flame(c.x + 1, DT - c.h - 8, k);
    });
  }

  drawScene(0);
  if (!reduce) {
    var last = 0;
    (function loop(now) {
      if (!document.hidden && now - last > 110) { last = now; drawScene(now); }
      requestAnimationFrame(loop);
    })(0);
  }

  // ---------- Dialogue: types out line by line ----------
  var dialog = document.getElementById("dialog");
  if (!dialog) return;
  var lines = [].slice.call(dialog.querySelectorAll("[data-line]"));
  var choices = dialog.querySelector(".choices");
  var reply = document.getElementById("dialog-reply");
  var full = lines.map(function (l) { return l.textContent; });
  dialog.setAttribute("aria-label", full.join(" "));
  var typing = false, timers = [];

  function finish() {
    timers.forEach(clearTimeout); timers = [];
    lines.forEach(function (l, i) { l.textContent = full[i]; });
    choices.hidden = false;
    typing = false;
  }

  if (reduce) {
    finish();
  } else {
    choices.hidden = true;
    typing = true;
    lines.forEach(function (l) { l.textContent = ""; });
    var delay = 400;
    full.forEach(function (text, li) {
      for (var c = 1; c <= text.length; c++) {
        (function (c) {
          timers.push(setTimeout(function () { lines[li].textContent = text.slice(0, c); }, delay));
        })(c);
        delay += 26;
      }
      delay += 380;
    });
    timers.push(setTimeout(finish, delay));
    dialog.addEventListener("click", function (e) {
      if (typing && !e.target.closest("button")) finish();
    });
  }

  var yes = document.getElementById("choice-yes");
  var no = document.getElementById("choice-no");

  yes.addEventListener("click", function () {
    var shop = document.getElementById("shop");
    shop.setAttribute("tabindex", "-1");
    shop.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    shop.focus({ preventScroll: true });
  });

  no.addEventListener("click", function () {
    reply.hidden = false;
    reply.textContent = "* The candles keep burning. Take your time.";
  });

  choices.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      (document.activeElement === yes ? no : yes).focus();
      e.preventDefault();
    }
  });
})();
