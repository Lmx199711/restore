Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SystemKey = exports.ReportSystem = undefined;
var i;
var r_jsbi = require("jsbi");
var r_DaySystem = require("DaySystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
var l = function () {
  function e() {}
  e.prototype.addCoin = function (e, t, o) {
    undefined === o && (o = i.None);
    var a = r_jsbi.default.BigInt(t);
    r_PlayerData.PlayerData.data.systemIncomeMap[o] || (r_PlayerData.PlayerData.data.systemIncomeMap[o] = {});
    r_PlayerData.PlayerData.data.systemIncomeMap[o][e] || (r_PlayerData.PlayerData.data.systemIncomeMap[o][e] = 0);
    var s = r_jsbi.default.BigInt(r_PlayerData.PlayerData.data.systemIncomeMap[o][e]);
    r_PlayerData.PlayerData.data.systemIncomeMap[o][e] = r_jsbi.default.ADD(s, a).toString();
  };
  e.prototype.deleteCoin = function (e, t, o) {
    undefined === o && (o = i.None);
    var a = r_jsbi.default.BigInt(t);
    r_PlayerData.PlayerData.data.systemOutCoinMap[o] || (r_PlayerData.PlayerData.data.systemOutCoinMap[o] = {});
    r_PlayerData.PlayerData.data.systemOutCoinMap[o][e] || (r_PlayerData.PlayerData.data.systemOutCoinMap[o][e] = 0);
    var s = r_jsbi.default.BigInt(r_PlayerData.PlayerData.data.systemOutCoinMap[o][e]);
    r_PlayerData.PlayerData.data.systemOutCoinMap[o][e] = r_jsbi.default.ADD(s, a).toString();
  };
  e.prototype.reportSystemMes = function () {
    if (r_TimeSystem.TimeSystem.isNextDay(r_PlayerData.PlayerData.data.systemExpendStamp)) {
      this.reportExpend();
      r_PlayerData.PlayerData.data.systemIncomeMap = {};
      r_PlayerData.PlayerData.data.systemOutCoinMap = {};
      r_PlayerData.PlayerData.data.systemExpendStamp = r_TimeSystem.TimeSystem.getServerTime();
      r_PlayerData.PlayerData.saveData();
    }
  };
  e.prototype.reportExpend = function () {
    for (var e in r_PlayerData.PlayerData.data.systemIncomeMap) if (Object.prototype.hasOwnProperty.call(r_PlayerData.PlayerData.data.systemIncomeMap, e)) {
      if (!((h = r_PlayerData.PlayerData.data.systemIncomeMap[e]) instanceof Object)) {
        continue;
      }
      var t = r_jsbi.default.__zero();
      for (var o in h) if (Object.prototype.hasOwnProperty.call(h, o)) {
        var i = h[o];
        t = r_jsbi.default.BigInt(r_jsbi.default.ADD(t, r_jsbi.default.BigInt(i)));
      }
      console.log(t.toString());
      for (var a = u.length - 1; a >= 0; a--) {
        var c = u[a];
        var l = r_jsbi.default.BigInt(c.value);
        if (r_jsbi.default.GE(t, l)) {
          r_PlatformSystem.PlatformSystem.report("Get_coin", {
            stage: e,
            interval: c.key
          });
          break;
        }
      }
    }
    for (var e in r_PlayerData.PlayerData.data.systemOutCoinMap) if (Object.prototype.hasOwnProperty.call(r_PlayerData.PlayerData.data.systemOutCoinMap, e)) {
      var h;
      if (!((h = r_PlayerData.PlayerData.data.systemOutCoinMap[e]) instanceof Object)) {
        continue;
      }
      t = r_jsbi.default.__zero();
      for (var o in h) if (Object.prototype.hasOwnProperty.call(h, o)) {
        i = h[o];
        t = r_jsbi.default.BigInt(r_jsbi.default.ADD(t, r_jsbi.default.BigInt(i)));
      }
      console.log(t.toString());
      for (a = u.length - 1; a >= 0; a--) {
        c = u[a];
        l = r_jsbi.default.BigInt(c.value);
        if (r_jsbi.default.GE(t, l)) {
          r_PlatformSystem.PlatformSystem.report("Use_coin", {
            stage: e,
            interval: c.key
          });
          break;
        }
      }
    }
  };
  e.prototype.reportBattleUp = function (e) {
    r_PlatformSystem.PlatformSystem.report("PlayPkFinish1", {
      result: e
    });
  };
  e.prototype.reportBattleEntery = function (e) {
    r_PlatformSystem.PlatformSystem.report("PlayPk1", {
      result: e
    });
  };
  e.prototype.reportUserDay = function (e) {
    if (!r_PlayerData.PlayerData.data) {
      return e;
    }
    var t = r_DaySystem.DaySystem.getShowDay();
    for (var o = h.length - 1; o >= 0; o--) {
      var i = h[o];
      if (t >= i.value) {
        e.users = i.key;
        return e;
      }
    }
    return e;
  };
  return e;
}();
exports.ReportSystem = new l();
(function (e) {
  e.None = "未知系统";
  e["点击系统"] = "点击系统";
  e["秘书"] = "秘书";
  e["钻井"] = "钻井";
  e["石头"] = "石头";
  e["福袋"] = "福袋";
  e["股市"] = "股市";
  e["赛马"] = "赛马";
  e["弹球"] = "弹球";
  e["电子厂"] = "电子厂";
  e["床"] = "床";
  e["彩票"] = "彩票";
  e["瓶子"] = "瓶子";
  e["榴莲"] = "榴莲";
  e["小游戏"] = "小游戏";
  e["大富翁"] = "大富翁";
  e["饿了吗"] = "饿了吗";
  e["零花钱"] = "零花钱";
  e["能力升级"] = "能力升级";
  e["楼市"] = "楼市";
  e["任务大厅"] = "任务大厅";
  e["招财猫"] = "招财猫";
  e["打保安"] = "打保安";
  e["未来银行卡"] = "未来银行卡";
  e["银行贷款还款"] = "银行贷款还款";
  e["强磁打捞"] = "强磁打捞";
  e["财神到"] = "财神到";
  e["抓狗"] = "抓狗";
  e["砸电脑"] = "砸电脑";
  e["灵石交易"] = "灵石交易";
  e["武器数值洗炼"] = "武器数值洗炼";
  e["器武魂"] = "器武魂";
  e["美杜莎"] = "美杜莎";
  e["任务系统"] = "任务系统";
  e["倒垃圾"] = "倒垃圾";
  e["洗脚城"] = "洗脚城";
  e["挑战奖励"] = "挑战奖励";
  e["南方小土豆旅游"] = "南方小土豆旅游";
  e["新年许愿"] = "新年许愿";
  e["太空探险"] = "太空探险";
  e["渔船"] = "渔船";
  e["零食满屋"] = "零食满屋";
  e["超市"] = "超市";
  e["农场"] = "农场";
  e["集市"] = "集市";
  e["俄罗斯轮盘"] = "俄罗斯轮盘";
  e["城市"] = "城市";
  e["房产系统"] = "房产系统";
  e["企业"] = "企业";
  e["星球"] = "星球";
  e["升级系统"] = "升级系统";
  e["雇佣系统"] = "雇佣系统";
  e["寒假作业"] = "寒假作业";
  e["武器系统"] = "武器系统";
  e["签到"] = "签到";
  e["武器开炼"] = "武器开炼";
  e["天工神兵"] = "天工神兵";
  e["爬塔"] = "爬塔";
  e["武器强化"] = "武器强化";
  e["仙界神树"] = "仙界神树";
  e["二手车"] = "二手车";
  e["二手车app"] = "二手车app";
})(i = exports.SystemKey || (exports.SystemKey = {}));
var u = [{
  key: "1-10W",
  value: "1"
}, {
  key: "10W-100W",
  value: "100000"
}, {
  key: "100W-500W",
  value: "1000000"
}, {
  key: "500W-1000W",
  value: "5000000"
}, {
  key: "1000W-1E",
  value: "10000000"
}, {
  key: "1E-10E",
  value: "100000000"
}, {
  key: "10E+",
  value: "1000000000"
}];
var h = [{
  key: "1-2",
  value: 1
}, {
  key: "3-4",
  value: 3
}, {
  key: "5-7",
  value: 5
}, {
  key: "8-10",
  value: 8
}, {
  key: "11-15",
  value: 11
}, {
  key: "16-20",
  value: 16
}, {
  key: "21-30",
  value: 21
}, {
  key: "31-40",
  value: 31
}, {
  key: "40+",
  value: 41
}];