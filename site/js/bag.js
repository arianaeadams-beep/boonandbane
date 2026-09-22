// "Your bag": the shopping cart. Lives in the visitor's browser (localStorage).
// It holds item ids and quantities only. Checkout is a separate step (see docs).
(function () {
  var KEY = "ebb-bag";
  var mem = []; // fallback if the browser blocks storage

  function clean(list) {
    return (Array.isArray(list) ? list : []).filter(function (i) {
      return i && typeof i.id === "string" && typeof i.qty === "number" && i.qty >= 1;
    });
  }

  function read() {
    try { return clean(JSON.parse(localStorage.getItem(KEY) || "[]")); }
    catch (e) { return clean(mem); }
  }

  function write(items) {
    mem = items;
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) { /* keep in memory */ }
    document.dispatchEvent(new CustomEvent("bagchange"));
  }

  window.Bag = {
    items: read,
    count: function () { return read().reduce(function (n, i) { return n + i.qty; }, 0); },
    add: function (id) {
      var items = read(), hit = items.filter(function (i) { return i.id === id; })[0];
      if (hit) hit.qty += 1; else items.push({ id: id, qty: 1 });
      write(items);
    },
    setQty: function (id, qty) {
      var items = read().map(function (i) { return i.id === id ? { id: id, qty: qty } : i; })
        .filter(function (i) { return i.qty >= 1; });
      write(items);
    },
    remove: function (id) { write(read().filter(function (i) { return i.id !== id; })); },
    clear: function () { write([]); }
  };

  window.addEventListener("storage", function (e) {
    if (e.key === KEY) document.dispatchEvent(new CustomEvent("bagchange"));
  });
})();
