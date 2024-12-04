Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AetherSystem = undefined;
var r_AetherCfg = require("AetherCfg");
var r_PlayerData = require("PlayerData");
var a = function () {
  function e() {}
  e.prototype.getAttack = function () {
    return r_AetherCfg.AetherLeveAttck[r_PlayerData.PlayerData.data.aetherLeveAttck].value;
  };
  return e;
}();
exports.AetherSystem = new a();