Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StoneSystem = exports._StoneSystem = undefined;
var r_StoneCfg = require("StoneCfg");
var r_StoneUI = require("StoneUI");
var r_DaySystem = require("DaySystem");
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var exp__StoneSystem = function () {
  function _ctor() {
    this.stoneCfgMap = {};
  }
  _ctor.prototype.init = function () {
    for (var e = 0; e < r_StoneCfg.StoneCfg.length; e++) {
      this.stoneCfgMap[r_StoneCfg.StoneCfg[e].Id] = r_StoneCfg.StoneCfg[e];
    }
    this.checkRefresh();
  };
  _ctor.prototype.getStoneCfgById = function (e) {
    return this.stoneCfgMap[e];
  };
  _ctor.prototype.checkRefresh = function () {
    0 == r_PlayerData.PlayerData.data.refreshStoneDay && this.refreshStoneMap();
    r_TimeSystem.TimeSystem.isNextDay(r_PlayerData.PlayerData.data.refreshCutNumTime) && this.refreshCutNum();
  };
  _ctor.prototype.nextDay = function () {
    if (r_DaySystem.DaySystem.getShowDay() - r_PlayerData.PlayerData.data.refreshStoneDay >= 5) {
      this.refreshStoneMap();
      r_StoneUI.StoneUI.Inst && r_StoneUI.StoneUI.Inst.refreshStone();
    }
  };
  _ctor.prototype.refreshStoneMap = function () {
    r_PlayerData.PlayerData.data.refreshStoneTime = r_TimeSystem.TimeSystem.getServerTime();
    r_PlayerData.PlayerData.data.refreshStoneDay = r_DaySystem.DaySystem.getShowDay();
    r_PlayerData.PlayerData.data.stoneMap = {};
    var e = 4;
    for (var t = 1; t <= 3; t++) {
      var o = this.getIdListByType(t);
      var i = [];
      for (var n = 1; n <= e; n++) {
        var l = r_UtilsSystem.UtilsSystem.getRandomFromArrExceptList(o, i);
        r_PlayerData.PlayerData.data.stoneMap[t + "_" + n] = l;
        i.push(l);
      }
      e -= 1;
    }
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.refreshCutNum = function () {
    r_PlayerData.PlayerData.data.cutStoneNum = 0;
    r_PlayerData.PlayerData.data.refreshCutNumTime = r_TimeSystem.TimeSystem.getServerTime();
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.getIdListByType = function (e) {
    var t = [];
    for (var o = 0; o < r_StoneCfg.StoneCfg.length; o++) {
      r_StoneCfg.StoneCfg[o].Type == e && t.push(r_StoneCfg.StoneCfg[o].Id);
    }
    return t;
  };
  return _ctor;
}();
exports._StoneSystem = exp__StoneSystem;
exports.StoneSystem = new exp__StoneSystem();