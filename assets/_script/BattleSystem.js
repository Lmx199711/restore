Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleSystem = undefined;
var r_CoinSystem = require("CoinSystem");
var r_GroupSystem = require("GroupSystem");
var r_PlayerData = require("PlayerData");
var s = function () {
  function e() {}
  e.prototype.needShowRedTip = function () {
    var e = r_CoinSystem.CoinSystem.getClickCoin();
    var t = this.getCurRoleLevelInfo();
    return !!t && e >= t.rivalSpeed / 2;
  };
  e.prototype.getCurRoleLevelInfo = function () {
    return r_GroupSystem.GroupSystem.getRoleCfg()[r_PlayerData.PlayerData.data.battleLevel];
  };
  return e;
}();
exports.BattleSystem = new s();