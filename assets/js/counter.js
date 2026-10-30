(function () {
  "use strict";

  var base = window.GOATCOUNTER_BASE || "";
  var wrappers = document.querySelectorAll(".js-counter");

  function hideAll() {
    Array.prototype.forEach.call(wrappers, function (el) {
      el.style.display = "none";
    });
  }

  function showAll() {
    Array.prototype.forEach.call(wrappers, function (el) {
      el.style.display = "";
    });
  }

  function setText(selector, value) {
    Array.prototype.forEach.call(document.querySelectorAll(selector), function (el) {
      el.textContent = value;
    });
  }

  if (!base) {
    hideAll();
    return;
  }

  function fetchCount(path) {
    var url = base + "/counter/" + encodeURIComponent(path) + ".json";
    return fetch(url, { credentials: "omit" })
      .then(function (res) {
        if (res.status === 404) return 0;
        if (!res.ok) throw new Error("counter " + res.status);
        return res.json();
      })
      .then(function (data) {
        return data && data.count != null ? data.count : null;
      });
  }

  Promise.all([
    fetchCount("TOTAL").catch(function () { return null; }),
    fetchCount(location.pathname).catch(function () { return null; })
  ]).then(function (res) {
    var site = res[0];
    var page = res[1];
    if (site == null && page == null) {
      hideAll();
      return;
    }
    if (site != null) setText(".js-site-pv", site);
    if (page != null) setText(".js-page-pv", page);
    showAll();
  }).catch(hideAll);
})();
