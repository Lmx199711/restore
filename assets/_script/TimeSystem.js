Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeSystem = exports._TimeSystem = undefined;
var r_CoinSystem = require("CoinSystem");
var r_DaySystem = require("DaySystem");
var r_DrawCardSystem = require("DrawCardSystem");
var r_HamSystem = require("HamSystem");
var r_InterstitialSystem = require("InterstitialSystem");
var r_OffLineSystem = require("OffLineSystem");
var r_OnlineSystem = require("OnlineSystem");
var r_PlayerData = require("PlayerData");
var r_RoleSystem = require("RoleSystem");
var exp__TimeSystem = function () {
  function _ctor() {
    this.NEXTFIVETIMEKEY = "TimeSystem_NEXTFIVETIMEKEY";
    this.nextFiveTime = 0;
    this.oneDaySecond = 86400;
    this.serverTimestamp = 0;
    this.localTimestamp = 0;
    this.scheduleMap = {};
    this.timeUpdateList = [];
    this.timeUpdateMap = {};
    this.secondUpdateMap = {};
    this.updateMap = {};
    this.loginTime = 0;
  }
  _ctor.prototype.init = function () {
    this.loginTime = this.getServerTime();
  };
  _ctor.prototype.getServerTime = function () {
    return this.serverTimestamp + Math.round(new Date().getTime() / 1e3) - this.localTimestamp;
  };
  _ctor.prototype.getTimeByHour = function (e) {
    var t = this.getServerTime();
    var o = new Date(1e3 * t);
    o.setHours(e);
    o.setMinutes(0);
    o.setSeconds(0);
    o.setMilliseconds(0);
    return Math.floor(o.getTime() / 1e3);
  };
  _ctor.prototype.getNextFiveTime = function () {
    var e = this.getServerTime();
    var t = this.getTimeByHour(5);
    if (t < e) {
      return t + this.oneDaySecond;
    } else {
      return t;
    }
  };
  _ctor.prototype.getLeftTimeToFive = function () {
    var e = this.getServerTime();
    var t = this.getTimeByHour(5);
    if (t > e) {
      return t - e;
    } else {
      return t - e + this.oneDaySecond;
    }
  };
  _ctor.prototype.getLeftTimeToNextDay = function () {
    var e = this.getServerTime();
    return this.getTimeByHour(0) + this.oneDaySecond - e;
  };
  _ctor.prototype.updateTimestamp = function (e) {
    this.serverTimestamp = e;
    this.localTimestamp = Math.round(new Date().getTime() / 1e3);
  };
  _ctor.prototype.update = function (e) {
    e > .5 && (e = .016);
    for (var t in this.updateMap) {
      var o = this.updateMap[t];
      o && o(e);
    }
    for (var p in this.scheduleMap) if (y = this.scheduleMap[p]) {
      if (y.isStop) {
        continue;
      }
      y.time = y.time - e;
      if (y.time <= 0) {
        if (y.num <= 1) {
          this.scheduleMap[p] = null;
          y.callBack();
        } else {
          y.num--;
          y.time = y.maxTime;
          y.callBack();
        }
      }
    }
    for (var p in this.secondUpdateMap) if (y = this.secondUpdateMap[p]) {
      y.time = y.time + e;
      if (y.time >= 1) {
        y.time = 0;
        if (y.callBack) {
          y.callBack();
        } else {
          this.secondUpdateMap[p] = undefined;
        }
      }
    }
    for (var d = this.timeUpdateList.length - 1; d >= 0; d--) {
      (y = this.timeUpdateList[d]).passTime = y.passTime + e;
      if (y.passTime >= y.time) {
        y.callBack(1);
        this.timeUpdateList.splice(d, 1);
      } else {
        y.callBack(y.passTime / y.time);
      }
    }
    for (var p in this.timeUpdateMap) {
      var y;
      if (y = this.timeUpdateMap[p]) {
        y.passTime = y.passTime + e;
        if (y.passTime >= y.time) {
          this.timeUpdateMap[p] = null;
          y.callBack(1);
        } else {
          y.callBack(y.passTime / y.time);
        }
      }
    }
    r_DaySystem.DaySystem.update(e);
    r_PlayerData.PlayerData.update(e);
    r_RoleSystem.RoleSystem.update(e);
    r_CoinSystem.CoinSystem.update(e);
    r_DrawCardSystem.DrawCardSystem.update(e);
    r_OffLineSystem.OffLineSystem.update(e);
    r_OnlineSystem.OnlineSystem.update(e);
    r_HamSystem.HamSystem.update(e);
    r_InterstitialSystem.InterstitialSystem.update(e);
  };
  _ctor.prototype.scheduleOnceSetStop = function (e, t) {
    var o = this.scheduleMap[e];
    o && (o.isStop = t);
  };
  _ctor.prototype.scheduleOnce = function (e, t, o) {
    var i = {};
    i.time = t;
    i.maxTime = t;
    i.callBack = o;
    i.num = 1;
    this.scheduleMap[e] = i;
  };
  _ctor.prototype.schedule = function (e, t, o, i) {
    undefined === i && (i = 999999999);
    var n = {};
    n.time = t;
    n.maxTime = t;
    n.callBack = o;
    n.num = i;
    this.scheduleMap[e] = n;
  };
  _ctor.prototype.scheduleClear = function (e) {
    this.scheduleMap[e] = null;
  };
  _ctor.prototype.hasSchedule = function (e) {
    return !!this.scheduleMap[e];
  };
  _ctor.prototype.registSecondUpdate = function (e, t, o) {
    undefined === o && (o = 1);
    var i = {
      time: 0
    };
    i.callBack = t;
    i.second = o;
    i.pause = false;
    this.secondUpdateMap[e] = i;
  };
  _ctor.prototype.unregistSecondUpdate = function (e) {
    this.secondUpdateMap[e] = undefined;
  };
  _ctor.prototype.registUpdate = function (e, t) {
    this.updateMap[e] = t;
  };
  _ctor.prototype.unregistUpdate = function (e) {
    this.updateMap[e] = undefined;
  };
  _ctor.prototype.timeUpdate = function (e, t) {
    var o = {};
    o.time = e;
    o.passTime = 0;
    o.callBack = t;
    this.timeUpdateList.push(o);
  };
  _ctor.prototype.timeMapUpdate = function (e, t, o) {
    var i = {};
    i.time = t;
    i.passTime = 0;
    i.callBack = o;
    this.timeUpdateMap[e] = i;
  };
  _ctor.prototype.clearTimeMapUpdate = function (e) {
    this.timeUpdateMap[e] = null;
  };
  _ctor.prototype.getTimeStr = function (e) {
    var t = Math.floor(e / this.oneDaySecond);
    e %= this.oneDaySecond;
    var o = Math.floor(e / 3600);
    var i = Math.floor(e % 3600 / 60);
    var n = e % 60;
    var a = "";
    if (t > 0) {
      return a = a + t + "天";
    } else {
      o > 0 && (a = a + o + "时");
      i > 0 && (a = a + i + "分");
      0 == o && n > 0 && (a = a + n + "秒");
      return a;
    }
  };
  _ctor.prototype.getTimeStr2 = function (e) {
    var t = Math.floor(e / this.oneDaySecond);
    e %= this.oneDaySecond;
    var o = Math.floor(e / 3600);
    var i = Math.floor(e % 3600 / 60);
    var n = e % 60;
    var a = "";
    if (t > 0) {
      return a = a + t + ":";
    } else {
      if (o > 0) {
        o < 10 && (o = "0" + o);
        a = a + o + ":";
      }
      if (i > 0) {
        i < 10 && (i = "0" + i);
        a = a + i + ":";
      }
      if (n > 0) {
        n < 10 && (n = "0" + n);
        a += n;
      }
      return a;
    }
  };
  _ctor.prototype.getHourMinTime = function (e) {
    var t = e;
    Math.floor(t / exports.TimeSystem.oneDaySecond);
    t %= exports.TimeSystem.oneDaySecond;
    var i = Math.floor(t / 3600);
    var n = Math.floor(t % 3600 / 60);
    var a = "";
    i < 10 && (i = "0" + i);
    n < 10 && (n = "0" + n);
    return (a = a + i + ":") + n;
  };
  _ctor.prototype.isNextDay = function (e) {
    if (!e) {
      return true;
    }
    var t = new Date(1e3 * e);
    var o = this.getServerTime();
    var i = new Date(1e3 * o);
    return t.getDate() != i.getDate() || t.getMonth() != i.getMonth() || t.getFullYear() != i.getFullYear();
  };
  _ctor.prototype.isNextDay2 = function (e, t) {
    return new Date(1e3 * (e - 28800)).toLocaleDateString() != new Date(1e3 * (t - 28800)).toLocaleDateString();
  };
  _ctor.prototype.isNextDayOff = function (e, t) {
    if (!e) {
      return true;
    }
    if ((e -= t) <= 0) {
      return true;
    }
    var o = new Date(1e3 * e);
    var i = this.getServerTime() - t;
    var n = new Date(1e3 * i);
    return o.getDate() != n.getDate() || o.getMonth() != n.getMonth() || o.getFullYear() != n.getFullYear();
  };
  _ctor.prototype.getYearMonthDay = function (e) {
    var t = new Date(1e3 * e);
    return t.getFullYear() + "." + (t.getMonth() + 1) + "." + t.getDate();
  };
  _ctor.prototype.scheduleClearAll = function () {
    this.scheduleMap = {};
  };
  _ctor.prototype.getOnlineDuration = function () {
    return this.getServerTime() - this.loginTime;
  };
  return _ctor;
}();
exports._TimeSystem = exp__TimeSystem;
exports.TimeSystem = new exp__TimeSystem();