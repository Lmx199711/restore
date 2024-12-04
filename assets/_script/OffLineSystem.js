Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OffLineSystem = undefined;
var r_jsbi = require("jsbi");
var r_OfflineUI = require("OfflineUI");
var r_BigNumSystem = require("BigNumSystem");
var r_CoinSystem = require("CoinSystem");
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
var l = function () {
  function e() {
    this.passTime = 0;
    this.timetamp = 0;
    this.maxTime = 86400;
  }
  e.prototype.update = function (e) {
    if (r_PlayerData.PlayerData && r_PlayerData.PlayerData.data) {
      this.passTime = this.passTime + e;
      if (this.passTime >= 60) {
        this.passTime = 0;
        r_PlayerData.PlayerData.data.offLineEarnTime = r_TimeSystem.TimeSystem.getServerTime();
        r_PlayerData.PlayerData.saveData();
      }
    }
  };
  e.prototype.openOfflineUI = function () {
    if (this.isoffLineEarnTime()) {
      this.timetamp = r_PlayerData.PlayerData.data.offLineEarnTime;
      r_OfflineUI.default.showUI();
    }
  };
  e.prototype.getoffLineEarnTime = function () {
    var e = r_TimeSystem.TimeSystem.getServerTime() - this.timetamp;
    var t = this.getEarn();
    e = e < this.maxTime ? e : this.maxTime;
    t = r_jsbi.default.multiply(t, r_BigNumSystem.BigNumSystem.getNum(e));
    return r_jsbi.default.divide(t, r_BigNumSystem.BigNumSystem.getNum(50));
  };
  e.prototype.getOfflineTime = function () {
    var e = r_TimeSystem.TimeSystem.getServerTime() - this.timetamp;
    var t = e > this.maxTime ? this.maxTime : e;
    if (t <= 0) {
      return "00:00:00";
    }
    var o = Math.floor(t / 3600);
    var i = Math.floor(t % 3600 / 60);
    var n = t % 60;
    return (o >= 10 ? "" + o : "0" + o) + ":" + (i >= 10 ? "" + i : "0" + i) + ":" + (n >= 10 ? "" + n : "0" + n);
  };
  e.prototype.isoffLineEarnTime = function () {
    if (0 == r_PlayerData.PlayerData.data.offLineEarnTime) {
      return false;
    }
    if (r_TimeSystem.TimeSystem.getServerTime() - r_PlayerData.PlayerData.data.offLineEarnTime >= 300) {
      var e = this.getEarn();
      return r_jsbi.default.GT(e, r_BigNumSystem.BigNumSystem.getNum(0));
    }
    return false;
  };
  e.prototype.getEarn = function () {
    return r_CoinSystem.CoinSystem.getAllAddCoinNoDouble().allCoin;
  };
  return e;
}();
exports.OffLineSystem = new l();