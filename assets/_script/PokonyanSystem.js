Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PokonyanSystem = exports._PokonyanSystem = undefined;
var r_PokonyanCfg = require("PokonyanCfg");
var r_HouseSystem = require("HouseSystem");
var r_UtilsSystem = require("UtilsSystem");
var exp__PokonyanSystem = function () {
  function _ctor() {}
  _ctor.prototype.getRandAward = function (e) {
    switch (e) {
      case 0:
        var t = this.getHouseCfgByCount(e, r_HouseSystem.HouseSystem.getHouseData().hasHouseId + 2);
        return r_UtilsSystem.UtilsSystem.randomPercentFromArray(t).id;
      case 1:
      case 2:
      case 3:
        t = this.getHouseCfgByCount(e);
        return r_UtilsSystem.UtilsSystem.randomPercentFromArray(t).id;
    }
  };
  _ctor.prototype.getHouseCfgByCount = function (e, t) {
    var o = r_PokonyanCfg.PokonyanAwardCf[e];
    var n = Object.values(o);
    var a = n.length;
    t > 0 && (a = t > n.length ? n.length : t);
    return n.filter(function (e, t) {
      return t < a;
    });
  };
  _ctor.prototype.getAwardData = function (e, t) {
    return r_PokonyanCfg.PokonyanAwardCf[e][t];
  };
  return _ctor;
}();
exports._PokonyanSystem = exp__PokonyanSystem;
exports.PokonyanSystem = new exp__PokonyanSystem();