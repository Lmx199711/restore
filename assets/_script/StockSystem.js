Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StockSystem = exports._StockSystem = undefined;
var r_StockBrokeUI = require("StockBrokeUI");
var r_StockTipUI = require("StockTipUI");
var r_StockUI = require("StockUI");
var r_DaySystem = require("DaySystem");
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var exp__StockSystem = function () {
  function _ctor() {}
  _ctor.prototype.init = function () {
    if (r_PlayerData.PlayerData.data) {
      if (r_PlayerData.PlayerData.data.stockMap.stockList) {
        exports.StockSystem.checkRefreshUpStock();
      } else {
        r_PlayerData.PlayerData.data.stockMap.stockList = [];
        var e = [];
        for (var t = 1; t <= r_StockUI.StockUI.nameList.length; t++) {
          e.push(t);
        }
        r_UtilsSystem.UtilsSystem.shuffle(e);
        for (t = 0; t < e.length; t++) {
          var i = {};
          i.id = e[t];
          i.price = r_UtilsSystem.UtilsSystem.getRandomNum(2e4, 3e5);
          i.rate = r_UtilsSystem.UtilsSystem.getRandomNum(-15, 15);
          i.leftNum = r_UtilsSystem.UtilsSystem.getRandomNum(6e4, 12e4);
          r_PlayerData.PlayerData.data.stockMap.stockList.push(i);
        }
        r_PlayerData.PlayerData.data.stockMap.refreshTime = r_PlayerData.PlayerData.data.time;
        r_PlayerData.PlayerData.saveData();
        exports.StockSystem.checkRefreshUpStock();
      }
    }
  };
  _ctor.prototype.checkRefresh = function (e) {
    undefined === e && (e = false);
    if (r_TimeSystem.TimeSystem.isNextDay2(r_PlayerData.PlayerData.data.stockMap.refreshTime, r_PlayerData.PlayerData.data.time)) {
      r_PlayerData.PlayerData.data.stockMap.refreshTime = r_PlayerData.PlayerData.data.time;
      this.refresh();
      e && r_StockUI.StockUI.Inst && r_StockUI.StockUI.Inst.refreshList();
    }
  };
  _ctor.prototype.checkRefreshUpStock = function () {
    r_PlayerData.PlayerData.data.stockMap.upTime || (r_PlayerData.PlayerData.data.stockMap.upTime = 0);
    if (r_TimeSystem.TimeSystem.isNextDay(r_PlayerData.PlayerData.data.stockMap.upTime)) {
      var e = r_UtilsSystem.UtilsSystem.getRandomFromArr(r_PlayerData.PlayerData.data.stockMap.stockList);
      r_PlayerData.PlayerData.data.stockMap.upTime = r_TimeSystem.TimeSystem.getServerTime();
      r_PlayerData.PlayerData.data.stockMap.upId = e.id;
      r_PlayerData.PlayerData.data.stockMap.watchUpNum = 0;
      r_PlayerData.PlayerData.saveData();
    }
  };
  _ctor.prototype.getStockInfo = function (e) {
    for (var t = 0; t < r_PlayerData.PlayerData.data.stockMap.stockList.length; t++) {
      if (r_PlayerData.PlayerData.data.stockMap.stockList[t].id == e) {
        return r_PlayerData.PlayerData.data.stockMap.stockList[t];
      }
    }
    return null;
  };
  _ctor.prototype.addStockNum = function (e, t) {
    for (var o = 0; o < r_PlayerData.PlayerData.data.stockMap.stockList.length; o++) {
      if (r_PlayerData.PlayerData.data.stockMap.stockList[o].id == e) {
        return void (r_PlayerData.PlayerData.data.stockMap.stockList[o].leftNum = r_PlayerData.PlayerData.data.stockMap.stockList[o].leftNum + t);
      }
    }
  };
  _ctor.prototype.isMyStock = function (e) {
    if (!r_PlayerData.PlayerData.data.stockMap.myList) {
      return false;
    }
    for (var t = 0; t < r_PlayerData.PlayerData.data.stockMap.myList.length; t++) {
      if (r_PlayerData.PlayerData.data.stockMap.myList[t].id == e) {
        return true;
      }
    }
    return false;
  };
  _ctor.prototype.getMyStock = function (e) {
    if (!r_PlayerData.PlayerData.data.stockMap.myList) {
      return null;
    }
    for (var t = 0; t < r_PlayerData.PlayerData.data.stockMap.myList.length; t++) {
      if (r_PlayerData.PlayerData.data.stockMap.myList[t].id == e) {
        return r_PlayerData.PlayerData.data.stockMap.myList[t];
      }
    }
    return null;
  };
  _ctor.prototype.removeMyStock = function (e) {
    if (!r_PlayerData.PlayerData.data.stockMap.myList) {
      return false;
    }
    for (var t = r_PlayerData.PlayerData.data.stockMap.myList.length - 1; t >= 0; t--) {
      r_PlayerData.PlayerData.data.stockMap.myList[t].id == e && r_PlayerData.PlayerData.data.stockMap.myList.splice(t, 1);
    }
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.refresh = function () {
    if (r_PlayerData.PlayerData.data.stockMap) {
      var e = r_PlayerData.PlayerData.data.stockMap.upId;
      var t = r_PlayerData.PlayerData.data.stockMap.stockList;
      for (var o = 0; o < t.length; o++) {
        var i = t[o];
        if (i.isbroke) {
          if (!(r_PlayerData.PlayerData.data.time - i.brokeTime > r_DaySystem.DaySystem.daySecond)) {
            continue;
          }
          i.isbroke = false;
          i.brokeTime = 0;
        }
        var n = r_UtilsSystem.UtilsSystem.getRandomNum(1, 100);
        var a = r_UtilsSystem.UtilsSystem.getRandomNum(0, 15);
        if (i.id == e) {
          n > 90 && (a = -a);
        } else if (this.isMyStock(i.id)) {
          n > 30 && (a = -a);
        } else {
          n > 40 && (a = -a);
        }
        i.price = Math.floor(i.price * ((100 + a) / 100));
        i.rate = a;
        if (i.price < 100) {
          i.isbroke = true;
          i.brokeTime = r_PlayerData.PlayerData.data.time;
        }
      }
      r_PlayerData.PlayerData.saveData();
    }
  };
  _ctor.prototype.checkShowBlockLayer = function () {
    if (!r_PlayerData.PlayerData.data.stockMap.myList) {
      return false;
    }
    var e = [];
    for (var t = 0; t < r_PlayerData.PlayerData.data.stockMap.myList.length; t++) {
      exports.StockSystem.getStockInfo(r_PlayerData.PlayerData.data.stockMap.myList[t].id).isbroke && e.push(r_PlayerData.PlayerData.data.stockMap.myList[t].id);
    }
    e.length > 0 && r_StockBrokeUI.StockBrokeUI.showUI({
      brokeList: e
    });
  };
  _ctor.prototype.checkRefreshBroke = function () {
    var e = false;
    for (var t = 0; t < r_PlayerData.PlayerData.data.stockMap.stockList.length; t++) {
      var o = r_PlayerData.PlayerData.data.stockMap.stockList[t];
      if (o.isbroke && r_PlayerData.PlayerData.data.time - o.brokeTime >= r_DaySystem.DaySystem.daySecond) {
        o.price = r_UtilsSystem.UtilsSystem.getRandomNum(200, 3e3);
        o.rate = r_UtilsSystem.UtilsSystem.getRandomNum(-15, 15);
        o.leftNum = r_UtilsSystem.UtilsSystem.getRandomNum(6e3, 12e3);
        o.isbroke = false;
        o.brokeTime = 0;
        e = true;
      }
    }
    if (e) {
      r_PlayerData.PlayerData.saveData();
      r_StockUI.StockUI.Inst && r_StockUI.StockUI.Inst.refreshList();
    }
  };
  _ctor.prototype.popStock = function () {
    if (0 == r_StockUI.StockUI.popTipNum && 2 != r_PlayerData.PlayerData.data.stockMap.watchUpNum) {
      r_StockTipUI.StockTipUI.showUI();
    } else {
      r_StockUI.StockUI.showUI();
    }
  };
  return _ctor;
}();
exports._StockSystem = exp__StockSystem;
exports.StockSystem = new exp__StockSystem();