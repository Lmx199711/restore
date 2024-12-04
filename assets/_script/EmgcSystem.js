Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmgcSystem = exports._EmgcSystem = undefined;
var r_EmgcCfg = require("EmgcCfg");
var r_MainUI = require("MainUI");
var r_EmgcUI2 = require("EmgcUI2");
var r_DaySystem = require("DaySystem");
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
var exp__EmgcSystem = function () {
  function _ctor() {
    this.emgcCfgMap = {};
  }
  _ctor.prototype.init = function () {
    this.checkInit();
    for (var e = 0; e < r_EmgcCfg.EmgcCfg.length; e++) {
      this.emgcCfgMap[r_EmgcCfg.EmgcCfg[e].id] = r_EmgcCfg.EmgcCfg[e];
    }
    this.checkTriggerEmgc();
  };
  _ctor.prototype.checkInit = function () {
    if (!r_PlayerData.PlayerData.data.emgcMap.curList) {
      r_PlayerData.PlayerData.data.emgcMap.curList = [];
      r_PlayerData.PlayerData.data.emgcMap.finishList = [];
      r_PlayerData.PlayerData.data.emgcMap.normalTriggerTime = -9999999;
    }
  };
  _ctor.prototype.getEmgcCfgById = function (e) {
    return this.emgcCfgMap[e];
  };
  _ctor.prototype.isCurEmgc = function (e) {
    return r_PlayerData.PlayerData.data.emgcMap.curList.indexOf(e) > -1;
  };
  _ctor.prototype.isFinish = function (e) {
    return r_PlayerData.PlayerData.data.emgcMap.finishList.indexOf(e) > -1;
  };
  _ctor.prototype.checkTriggerEmgc = function () {
    var e = false;
    var t = r_DaySystem.DaySystem.getShowDay();
    var o = r_EmgcCfg.EmgcCfg.filter(function (e) {
      return "normal" == e.type;
    }).length;
    for (var n = 0; n < r_EmgcCfg.EmgcCfg.length; n++) {
      var a = r_EmgcCfg.EmgcCfg[n];
      this.isCurEmgc(a.id) || "normal" == a.type && t % o != a.triggerDay || a.triggerDay && (a.triggerDay > t || (r_PlayerData.PlayerData.data.emgcMap.curList.push(a.id), e = true));
    }
    e && r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.finishEmgc = function (e) {
    this.isFinish(e) || r_PlayerData.PlayerData.data.emgcMap.finishList.push(e);
  };
  _ctor.prototype.triggerEmgc = function (e) {
    this.isCurEmgc(e) || r_PlayerData.PlayerData.data.emgcMap.curList.push(e);
  };
  _ctor.prototype.checkShowEmgcUI = function () {
    if (r_MainUI.MainUI.Inst && r_MainUI.MainUI.Inst.isOnce) {
      return false;
    }
    var e = r_PlayerData.PlayerData.data.emgcMap.curList;
    var t = r_TimeSystem.TimeSystem.isNextDay2(r_PlayerData.PlayerData.data.emgcMap.normalTriggerTime, r_PlayerData.PlayerData.data.time);
    var o = r_EmgcCfg.EmgcCfg.filter(function (e) {
      return "normal" == e.type;
    }).length;
    var l = r_DaySystem.DaySystem.getShowDay();
    var u = r_DaySystem.DaySystem.getHour();
    for (var h = 0; h < e.length; h++) {
      var p = e[h];
      var d = this.getEmgcCfgById(p);
      if ("normal" == d.type && t && r_PlayerData.PlayerData.data.time && u >= 8 && l % o == d.triggerDay) {
        r_PlayerData.PlayerData.data.emgcMap.normalTriggerTime = r_PlayerData.PlayerData.data.time;
        r_PlayerData.PlayerData.data.emgcMap.curList.splice(h, 1);
        this.finishEmgc(p);
        r_EmgcUI2.EmgcUI2.showUI({
          id: p
        });
        return true;
      }
      if ("emgc" == d.type) {
        r_PlayerData.PlayerData.data.emgcMap.curList.splice(h, 1);
        this.finishEmgc(p);
        r_EmgcUI2.EmgcUI2.showUI({
          id: p
        });
        return true;
      }
    }
    return false;
  };
  _ctor.prototype.takeEmgcCfg = function (e, t) {
    var o = this.emgcCfgMap[e];
    for (var i in t) o[i] = t[i];
  };
  return _ctor;
}();
exports._EmgcSystem = exp__EmgcSystem;
exports.EmgcSystem = new exp__EmgcSystem();