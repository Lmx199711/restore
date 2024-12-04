Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FarmSystem = undefined;
var r_FarmCfg = require("FarmCfg");
var n = function () {
  function e() {}
  e.prototype.getFarmInfo = function (e) {
    for (var t = 0; t < r_FarmCfg.FarmCfg.length; t++) {
      if (e == r_FarmCfg.FarmCfg[t].id) {
        return r_FarmCfg.FarmCfg[t];
      }
    }
  };
  e.prototype.randOneSeed = function () {
    var e = Math.random();
    var t = 0;
    for (var o = 0; o < r_FarmCfg.FarmCfg.length; o++) {
      var n = r_FarmCfg.FarmCfg[o];
      if (e < (t += n.rate / 100)) {
        return n;
      }
    }
  };
  return e;
}();
exports.FarmSystem = new n();