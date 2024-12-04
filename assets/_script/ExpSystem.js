Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpSystem = undefined;
var r_RelaxLevelCfg = require("RelaxLevelCfg");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var s = function () {
  function e() {}
  e.prototype.getLevelName = function () {
    return r_RelaxLevelCfg.RelaxExpCfg[r_PlayerData.PlayerData.data.relaxExp.level].name;
  };
  e.prototype.getNextLevelName = function () {
    if (null == r_RelaxLevelCfg.RelaxExpCfg[r_PlayerData.PlayerData.data.relaxExp.level + 1]) {
      return "";
    } else {
      return "（下一级：" + r_RelaxLevelCfg.RelaxExpCfg[r_PlayerData.PlayerData.data.relaxExp.level + 1].name + "）";
    }
  };
  e.prototype.getExp = function () {
    if (r_PlayerData.PlayerData.data.relaxExp.exp > 2e3) {
      return 2e3;
    } else {
      return r_PlayerData.PlayerData.data.relaxExp.exp;
    }
  };
  e.prototype.getMaxExp = function () {
    var e = r_PlayerData.PlayerData.data.relaxExp.level;
    return r_RelaxLevelCfg.RelaxExpCfg[e].exp;
  };
  e.prototype.addExp = function (e) {
    var t = r_PlayerData.PlayerData.data.relaxExp.level;
    var o = r_RelaxLevelCfg.RelaxExpCfg[t].exp;
    if (r_PlayerData.PlayerData.data.relaxExp.exp + e >= o) {
      if (t < Object.values(r_RelaxLevelCfg.RelaxExpCfg).length - 1) {
        r_PlayerData.PlayerData.data.relaxExp.exp = r_PlayerData.PlayerData.data.relaxExp.exp + e - o;
        r_PlayerData.PlayerData.data.relaxExp.level++;
      } else {
        r_PlayerData.PlayerData.data.relaxExp.exp = o;
      }
      return void r_PlayerData.PlayerData.saveData();
    }
    r_PlayerData.PlayerData.data.relaxExp.exp += e;
    r_PlayerData.PlayerData.saveData();
  };
  e.prototype.checkUp = function (e) {
    var t = r_PlayerData.PlayerData.data.relaxExp.level;
    var o = r_RelaxLevelCfg.RelaxExpCfg[t].exp;
    return r_PlayerData.PlayerData.data.relaxExp.exp + e >= o && t < Object.values(r_RelaxLevelCfg.RelaxExpCfg).length - 1;
  };
  e.prototype.addGood = function () {
    r_PlayerData.PlayerData.data.relaxExp.good += r_UtilsSystem.UtilsSystem.getRandomNum(3, 10);
  };
  e.prototype.addBad = function () {
    r_PlayerData.PlayerData.data.relaxExp.bad += r_UtilsSystem.UtilsSystem.getRandomNum(3, 5);
  };
  e.prototype.getGood = function () {
    return r_PlayerData.PlayerData.data.relaxExp.good;
  };
  e.prototype.getBad = function () {
    return r_PlayerData.PlayerData.data.relaxExp.bad;
  };
  return e;
}();
exports.ExpSystem = new s();