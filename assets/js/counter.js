(function () {
  "use strict";

  var base = window.GOATCOUNTER_BASE || "";
  var SITE_BLOCK = ".js-counter-site";
  var PAGE_BLOCK = ".js-counter-page";

  function each(selector, fn) {
    Array.prototype.forEach.call(document.querySelectorAll(selector), fn);
  }

  // Blocks start hidden via an inline style; reveal one only when its number
  // actually arrived, so a partial failure never leaves "Total  views.".
  function reveal(selector) {
    each(selector, function (el) {
      el.style.display = "";
    });
  }

  function setText(selector, value) {
    each(selector, function (el) {
      el.textContent = value;
    });
  }

  if (!base) return;

  // Must resolve the path exactly the way count.js does, otherwise we query a
  // different path than the one GoatCounter recorded. count.js prefers the
  // canonical URL, e.g. /about/index.html is recorded as /about/.
  function getPath() {
    var loc = window.location;
    var canonical = document.querySelector('link[rel="canonical"][href]');
    if (canonical) {
      var a = document.createElement("a");
      a.href = canonical.href;
      var stripWww = function (host) { return host.replace(/^www\./, ""); };
      if (stripWww(a.hostname) === stripWww(loc.hostname)) {
        loc = a;
      }
    }
    return (loc.pathname + loc.search) || "/";
  }

  function fetchCount(path) {
    var url = base + "/counter/" + encodeURIComponent(path) + ".json";
    return fetch(url, { credentials: "omit" })
      .then(function (res) {
        // GoatCounter returns 404 for paths without views, but still sends a
        // JSON body with count "0"; only treat other failures as errors.
        if (!res.ok && res.status !== 404) {
          throw new Error("counter " + res.status);
        }
        return res.json();
      })
      .then(function (data) {
        if (!data || data.count == null) return null;
        return data.count;
      });
  }

  Promise.all([
    fetchCount("TOTAL").catch(function () { return null; }),
    fetchCount(getPath()).catch(function () { return null; })
  ]).then(function (res) {
    var site = res[0];
    var page = res[1];
    if (site != null) {
      setText(".js-site-pv", site);
      reveal(SITE_BLOCK);
    }
    if (page != null) {
      setText(".js-page-pv", page);
      reveal(PAGE_BLOCK);
    }
  });
})();
