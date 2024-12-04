Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DaySystem = exports._DaySystem = undefined;
var r_jsbi = require("jsbi");
var r_PayUI = require("PayUI");
var r_HomeWawaUI = require("HomeWawaUI");
var r_BillSystem = require("BillSystem");
var r_ChatSystem = require("ChatSystem");
var r_FruitsSystem = require("FruitsSystem");
var r_HouseSystem = require("HouseSystem");
var r_PhoneSystem = require("PhoneSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_StoneNewSystem = require("StoneNewSystem");
var r_StoneSystem = require("StoneSystem");
var r_SubwaySystem = require("SubwaySystem");
var r_TimeSystem = require("TimeSystem");
var exp__DaySystem = function () {
  function _ctor() {
    this.daySecond = 86400;
    this.addEnergyTime = 600;
    this.maxEnergy = 3;
    this.passTime = 0;
    this.oneSecondTime = 360;
    this.isPause = false;
    this.days = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11-15", "16-20", "21-25", "26-30", "31-35", "36-40", "41-45", "46-50", "50"];
    this.dayList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 99999];
    this.coins = ["0-10w", "10w-1000w", "1000w-1y", "1y-100y", "100y"];
    this.coinList = ["100000", "10000000", "100000000", "10000000000", "99999999999999"];
    this.diamonds = ["0-1000", "1000-5000", "5000-5W", "5W-20W", "20W-100W", "100W-1000W", "1000W+"];
    this.diamondList = ["1000", "5000", "50000", "200000", "1000000", "1000000", "99999999999999"];
  }
  _ctor.prototype.refresh = function () {};
  _ctor.prototype.update = function (e) {
    if (r_PlayerData.PlayerData && r_PlayerData.PlayerData.data && !this.isPause && (this.passTime = this.passTime + e, this.passTime > 1)) {
      this.passTime = 0;
      var t = Math.floor(r_PlayerData.PlayerData.data.time / r_TimeSystem.TimeSystem.oneDaySecond);
      var o = r_PlayerData.PlayerData.data.time + this.oneSecondTime;
      if (Math.floor(o / r_TimeSystem.TimeSystem.oneDaySecond) > t) {
        this.toNextDay();
      } else {
        r_PlayerData.PlayerData.data.time = o;
      }
    }
  };
  _ctor.prototype.setPause = function (e) {
    this.isPause = e;
  };
  _ctor.prototype.toNextDay = function () {
    var e = Math.floor(r_PlayerData.PlayerData.data.time / r_TimeSystem.TimeSystem.oneDaySecond);
    r_PlayerData.PlayerData.data.time = (e + 1) * r_TimeSystem.TimeSystem.oneDaySecond;
    var t = 0;
    for (var o = 0; o < r_PlayerData.PlayerData.data.billListNew.length; o++) {
      var i = r_PlayerData.PlayerData.data.billListNew[o];
      if (!r_BillSystem.BillSystem.needPayBill(i)) {
        break;
      }
      t += 1;
      break;
    }
    r_ChatSystem.ChatSystem.checkTriggerTask();
    r_SubwaySystem.SubwaySystem.dayCall();
    this.reportDayAndCoin();
    this.reportDayAndDiamond();
    r_PhoneSystem.PhoneSystem.nextDay();
    r_HouseSystem.HouseSystem.toNextDay();
    r_HouseSystem.HouseSystem.refreshPrice();
    r_HomeWawaUI.default.instace && r_HomeWawaUI.default.instace.refreshStartNum();
    r_PlayerData.PlayerData.saveData();
    r_FruitsSystem.FruitsSystem.nextDay();
    r_StoneSystem.StoneSystem.nextDay();
    r_StoneNewSystem.StoneNewSystem.nextDay();
    if (t > 0 && !r_PlayerData.PlayerData.isGame) {
      if (r_BillSystem.BillSystem.isPayEnough()) {
        return void r_BillSystem.BillSystem.payAllDayBill();
      }
      this.isPause = true;
      r_PayUI.PayUI.showUI();
    }
  };
  _ctor.prototype.payEnough = function () {
    var e = 0;
    for (var t = 0; t < r_PlayerData.PlayerData.data.billListNew.length; t++) {
      var o = r_PlayerData.PlayerData.data.billListNew[t];
      if (!r_BillSystem.BillSystem.needPayBill(o)) {
        break;
      }
      e += o.diyBill.dayCoin;
    }
    r_PlayerData.PlayerData.isCoinEnough(e) && r_BillSystem.BillSystem.payAllDayBill();
  };
  _ctor.prototype.getShowDay = function () {
    return 1 + Math.floor(r_PlayerData.PlayerData.data.time / r_TimeSystem.TimeSystem.oneDaySecond);
  };
  _ctor.prototype.reportDayAndCoin = function () {
    var e = Math.floor(r_PlayerData.PlayerData.data.time / r_TimeSystem.TimeSystem.oneDaySecond) + 1;
    for (var t = 0; t < this.days.length - 1; t++) {
      var o = this.days[t];
      if (e <= this.dayList[t]) {
        for (var n = 0; n < this.coins.length; n++) {
          var a = this.coins[n];
          var s = this.coinList[n];
          if (r_jsbi.default.LT(r_PlayerData.PlayerData.bigCoin, s)) {
            return void r_PlatformSystem.PlatformSystem.report("Days_coin", {
              num: o + "(" + a + ")"
            });
          }
        }
      }
    }
  };
  _ctor.prototype.reportDayAndDiamond = function () {
    var e = Math.floor(r_PlayerData.PlayerData.data.time / r_TimeSystem.TimeSystem.oneDaySecond) + 1;
    for (var t = 0; t < this.days.length - 1; t++) {
      var o = this.days[t];
      if (e <= this.dayList[t]) {
        for (var n = 0; n < this.diamonds.length; n++) {
          var a = this.diamonds[n];
          var s = this.diamondList[n];
          if (r_jsbi.default.LT(r_PlayerData.PlayerData.bigDiamond, s)) {
            return void r_PlatformSystem.PlatformSystem.report("Days_diamond", {
              zuanshi: o + "(" + a + ")"
            });
          }
        }
      }
    }
  };
  _ctor.prototype.reportLastDayAndCoin = function () {
    if (Math.floor(r_PlayerData.PlayerData.data.time / r_TimeSystem.TimeSystem.oneDaySecond) + 1 > 50) {
      for (var e = 0; e < this.coins.length; e++) {
        var t = this.coins[e];
        var o = this.coinList[e];
        r_jsbi.default.LT(r_PlayerData.PlayerData.bigCoin, o) && r_PlatformSystem.PlatformSystem.report("Days_coin", {
          num: "50(" + t + ")"
        });
      }
    }
  };
  _ctor.prototype.reportLastDayAndDiamond = function () {
    if (Math.floor(r_PlayerData.PlayerData.data.time / r_TimeSystem.TimeSystem.oneDaySecond) + 1 > 50) {
      for (var e = 0; e < this.diamonds.length; e++) {
        var t = this.diamonds[e];
        var o = this.diamondList[e];
        r_jsbi.default.LT(r_PlayerData.PlayerData.bigDiamond, o) && r_PlatformSystem.PlatformSystem.report("Days_diamond", {
          zuanshi: "50(" + t + ")"
        });
      }
    }
  };
  _ctor.prototype.clickNextDay = function () {
    this.toNextDay();
  };
  _ctor.prototype.getHour = function () {
    var e = 0;
    r_PlayerData.PlayerData && r_PlayerData.PlayerData.data && (e = r_PlayerData.PlayerData.data.time);
    e %= r_TimeSystem.TimeSystem.oneDaySecond;
    return Math.floor(e / 3600);
  };
  return _ctor;
}();
exports._DaySystem = exp__DaySystem;
exports.DaySystem = new exp__DaySystem();