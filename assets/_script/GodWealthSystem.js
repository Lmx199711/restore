Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GodWealthSystem = undefined;
var r_GodWealthCfg = require("GodWealthCfg");
var r_GodWealthUI = require("GodWealthUI");
var r_PlayerData = require("PlayerData");
var s = function () {
  function e() {}
  e.prototype.getCfg = function (e) {
    return r_GodWealthCfg.GodWealthCfg[e];
  };
  e.prototype.resetData = function () {
    if (r_PlayerData.PlayerData.data.godwealthDate != new Date().toLocaleDateString()) {
      r_PlayerData.PlayerData.data.godWealthDayNum = [0, 0, 0];
      r_PlayerData.PlayerData.data.godwealthDate = new Date().toLocaleDateString();
    }
    r_GodWealthUI.default.instace && !r_GodWealthUI.default.instace.startFalg && r_GodWealthUI.default.instace.restart();
  };
  e.prototype.getDayNum = function (e) {
    return r_PlayerData.PlayerData.data.godWealthDayNum[e];
  };
  e.prototype.getIsCount = function (e) {
    return this.getDayNum(e) < this.getCfg(e).playNum;
  };
  e.prototype.playComplete = function (e) {
    r_PlayerData.PlayerData.data.godWealthDayNum[e]++;
    r_PlayerData.PlayerData.saveData();
  };
  return e;
}();
exports.GodWealthSystem = new s();