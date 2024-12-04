Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BartenderSystem = exports._BartenderSystem = undefined;
var r_BartenderCfg = require("BartenderCfg");
var r_PlayerData = require("PlayerData");
var exp__BartenderSystem = function () {
  function _ctor() {}
  _ctor.prototype.getBartendResult = function (e) {
    var t = e.sort(function (e, t) {
      return e - t;
    });
    var o = "";
    t.forEach(function (e) {
      o += e;
    });
    return o;
  };
  _ctor.prototype.getBarById = function (e) {
    return r_BartenderCfg.BartenderCfg[e] || r_BartenderCfg.BartenderCfg.bad;
  };
  _ctor.prototype.saveBar = function (e) {
    return !!r_BartenderCfg.BarCaidanList.includes(e) && !r_PlayerData.PlayerData.data.barCaidanList.includes(e) && (r_PlayerData.PlayerData.data.barCaidanList.push(e), r_PlayerData.PlayerData.data.barCaidanList.length >= 2);
  };
  return _ctor;
}();
exports._BartenderSystem = exp__BartenderSystem;
exports.BartenderSystem = new exp__BartenderSystem();