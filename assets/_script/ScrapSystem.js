Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrapSystem = undefined;
var r_ScrapCarCfg = require("ScrapCarCfg");
var n = function () {
  function e() {
    this.selectId = -1;
  }
  e.prototype.getCarInfo = function () {
    var e = null;
    if (-1 != this.selectId) {
      return r_ScrapCarCfg.ScrapCarCfg[this.selectId];
    }
    var t = Math.random() * r_ScrapCarCfg.ScrapRandomNum;
    console.log("..........num", t);
    var o = 0;
    var n = 0;
    for (var a = 0; a < r_ScrapCarCfg.ScrapCarCfg.length; a++) {
      var s = r_ScrapCarCfg.ScrapCarCfg[a];
      n += s.pro;
      if (t - o >= 0 && n - t > 0) {
        e = s;
        break;
      }
      o += s.pro;
    }
    return e;
  };
  return e;
}();
exports.ScrapSystem = new n();