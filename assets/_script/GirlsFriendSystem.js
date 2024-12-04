Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GirlsFriendSystem = undefined;
var r_GirlsFriendCfg = require("GirlsFriendCfg");
var r_UtilsSystem = require("UtilsSystem");
var a = function () {
  function e() {
    this.m_girlsType = [1, 2, 3, 4, 5];
  }
  e.prototype.getRandomGirl = function () {
    var e = r_UtilsSystem.UtilsSystem.getRandomNum(1, 5);
    var t = r_GirlsFriendCfg.GirlsFriendType[e];
    var o = t[r_UtilsSystem.UtilsSystem.getRandomNum(0, t.length - 1)];
    var a = this.m_girlsType.filter(function (t) {
      return t != e;
    });
    var s = a[r_UtilsSystem.UtilsSystem.getRandomNum(0, a.length - 1)];
    var r = r_GirlsFriendCfg.GirlsFriendType[s];
    return [o, r[r_UtilsSystem.UtilsSystem.getRandomNum(0, r.length - 1)]];
  };
  e.prototype.getGirlById = function (e) {
    return r_GirlsFriendCfg.GirlsFriendCfg[e];
  };
  e.prototype.getResult = function () {
    return Math.random() < r_GirlsFriendCfg.GirllRate;
  };
  e.prototype.getSortGirls = function (e, t) {
    var o = [this.getGirlById(e[0]), this.getGirlById(e[1])];
    o.sort(function (e, o) {
      if (t) {
        return e.weight - o.weight;
      } else {
        return o.weight - e.weight;
      }
    });
    return [o[0].id, o[1].id];
  };
  e.prototype.getNumAward = function (e) {
    var t = e ? r_GirlsFriendCfg.GilsWinAwardCfg : r_GirlsFriendCfg.GilsLoseAwardCfg;
    return r_UtilsSystem.UtilsSystem.randomPercentFromArray(t).award;
  };
  return e;
}();
exports.GirlsFriendSystem = new a();