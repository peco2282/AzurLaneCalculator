(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          const c = "function" == typeof require && require
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          const a = new Error("Cannot find module '" + i + "'")
          throw a.code = "MODULE_NOT_FOUND", a
        }
        var p = n[i] = {exports: {}};
        e[i][0].call(p.exports, function (r) {
          var n = e[i][1][r];
          return o(n || r)
        }, p, p.exports, r, e, n, t)
      }
      return n[i].exports
    }

    for (let u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o
  }

  return r
})()({
  1: [function (require, module, exports) {
    const BASEPATH = "../data/";


    function calcCalacterExp(before, after, exp) {
      before = document.getElementById(before)
      after = document.getElementById(after)
      exp = document.getElementById(exp)
      const dicts = require(BASEPATH + "character_exp.json");
      let least = 0
      let most = 0
      dicts.forEach((dict, index, master) => {
        let level = parseInt(dict["Lv"])
        if (before === (level - 1)) least = parseInt(dict["Total"])
        if (level === after) most = parseInt(dict["Total"])
      })
      exp.text = (after - before).toString()
    }

    calcCalacterExp(10, 125)

  }, {}]
}, {}, [1]);
