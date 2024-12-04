Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelRoleSystem = undefined;
var r_LevelRoleCfg = require("LevelRoleCfg");
var r_LevelUpCfg = require("LevelUpCfg");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_RankSystem = require("RankSystem");
var r_UtilsSystem = require("UtilsSystem");
var l = function () {
  function e() {}
  e.prototype.getLevelTitle = function (e) {
    for (var t = 0; t < r_LevelRoleCfg.LevelRoleCfg.length; t++) {
      var o = r_LevelRoleCfg.LevelRoleCfg[t];
      if (r_UtilsSystem.UtilsSystem.interval(o.interval[0], o.interval[1], e)) {
        return o;
      }
    }
    return null;
  };
  e.prototype.getTitleLevel = function (e) {
    for (var t = 0; t < r_LevelRoleCfg.LevelRoleCfg.length; t++) {
      var o = r_LevelRoleCfg.LevelRoleCfg[t];
      if (e == o.interval[0]) {
        return o.id;
      }
    }
    return null;
  };
  e.prototype.upLevel = function (e) {
    var t = r_LevelUpCfg.LevelUpCfg.length - 1 - r_PlayerData.PlayerData.data.level;
    e > t && (e = t);
    r_PlayerData.PlayerData.data.level += e;
    r_PlayerData.PlayerData.saveData();
    r_PlatformSystem.PlatformSystem.report("Role_level1", {
      result: r_PlayerData.PlayerData.data.level
    });
    r_RankSystem.RankSystem.checkUploadLevel();
  };
  e.prototype.chcekMaxLevel = function () {
    return r_PlayerData.PlayerData.data.level <= r_LevelUpCfg.LevelUpCfg.length;
  };
  return e;
}();
exports.LevelRoleSystem = new l();