Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawCardSystem = exports._DrawCardSystem = undefined;
var r_DrawCardCfg = require("DrawCardCfg");
var r_RoleCfg = require("RoleCfg");
var r_DrawUI = require("DrawUI");
var r_PlayerData = require("PlayerData");
var r_SecretUpSystem = require("SecretUpSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var exp__DrawCardSystem = function () {
  function _ctor() {
    this.passTime = 0;
    this.cardList0 = [];
    this.cardList1 = [];
    this.cardList2 = [];
    this.cardList3 = [];
    this.cardList4 = [];
  }
  _ctor.prototype.init = function () {
    var e = this;
    Object.values(r_RoleCfg.SecretQualityCfg).filter(function (e) {
      return 0 == e.quality;
    }).forEach(function (t) {
      e.cardList0.push(t);
    });
    Object.values(r_RoleCfg.SecretQualityCfg).filter(function (e) {
      return 1 == e.quality;
    }).forEach(function (t) {
      e.cardList1.push(t);
    });
    Object.values(r_RoleCfg.SecretQualityCfg).filter(function (e) {
      return 2 == e.quality;
    }).forEach(function (t) {
      e.cardList2.push(t);
    });
    Object.values(r_RoleCfg.SecretQualityCfg).filter(function (e) {
      return 3 == e.quality;
    }).forEach(function (t) {
      e.cardList3.push(t);
    });
    Object.values(r_RoleCfg.SecretQualityCfg).filter(function (e) {
      return 4 == e.quality;
    }).forEach(function (t) {
      e.cardList4.push(t);
    });
  };
  _ctor.prototype.initData = function () {
    r_PlayerData.PlayerData.data.drawData1 = {};
    r_PlayerData.PlayerData.data.drawData1.use = 5;
    r_PlayerData.PlayerData.data.drawData1.total = 0;
    r_PlayerData.PlayerData.data.drawData1.nextTime = 0;
    r_PlayerData.PlayerData.data.drawData1.hasDefeat = 0;
    r_PlayerData.PlayerData.data.drawData2 = {};
    r_PlayerData.PlayerData.data.drawData2.use = 5;
    r_PlayerData.PlayerData.data.drawData2.total = 0;
    r_PlayerData.PlayerData.data.drawData2.nextTime = 0;
    r_PlayerData.PlayerData.data.drawData2.hasDefeat = 0;
  };
  _ctor.prototype.resetData = function () {
    r_PlayerData.PlayerData.data.drawData1 || (r_PlayerData.PlayerData.data.drawData1 = {});
    null == r_PlayerData.PlayerData.data.drawData1.use && (r_PlayerData.PlayerData.data.drawData1.use = 5);
    r_PlayerData.PlayerData.data.drawData1.total || (r_PlayerData.PlayerData.data.drawData1.total = 0);
    r_PlayerData.PlayerData.data.drawData1.nextTime || (r_PlayerData.PlayerData.data.drawData1.nextTime = 0);
    r_PlayerData.PlayerData.data.drawData1.hasDefeat || (r_PlayerData.PlayerData.data.drawData1.hasDefeat = 0);
    r_PlayerData.PlayerData.data.drawData2 || (r_PlayerData.PlayerData.data.drawData2 = {});
    null == r_PlayerData.PlayerData.data.drawData2.use && (r_PlayerData.PlayerData.data.drawData2.use = 5);
    r_PlayerData.PlayerData.data.drawData2.total || (r_PlayerData.PlayerData.data.drawData2.total = 0);
    r_PlayerData.PlayerData.data.drawData2.nextTime || (r_PlayerData.PlayerData.data.drawData2.nextTime = 0);
    r_PlayerData.PlayerData.data.drawData2.hasDefeat || (r_PlayerData.PlayerData.data.drawData2.hasDefeat = 0);
  };
  _ctor.prototype.getDrawCardCfgById = function (e) {
    this.resetData();
    return r_DrawCardCfg.DrawCardCfg[e];
  };
  _ctor.prototype.getRemainTimes = function () {
    return r_PlayerData.PlayerData.data.drawData1.use;
  };
  _ctor.prototype.getRemainCount = function (e) {
    var t = this.getDrawCardCfgById(e);
    t.cost;
    var o = t.count;
    t.type;
    t.weight;
    t.desc;
    t.drawTimes;
    t.drawCool;
    return o - 1 - r_PlayerData.PlayerData.data["drawData" + e].total % o;
  };
  _ctor.prototype.addTotal = function (e) {
    if (!(r_PlayerData.PlayerData.data.drawData1.z <= 0)) {
      r_PlayerData.PlayerData.data["drawData" + e].total++;
      if (1 == e) {
        r_PlayerData.PlayerData.data["drawData" + e].use--;
        0 == r_PlayerData.PlayerData.data["drawData" + e].nextTime && (r_PlayerData.PlayerData.data["drawData" + e].nextTime = r_TimeSystem.TimeSystem.getServerTime() + this.getDrawCardCfgById(1).drawCool);
      }
      r_PlayerData.PlayerData.saveData();
    }
  };
  _ctor.prototype.update = function (e) {
    if (r_PlayerData.PlayerData && r_PlayerData.PlayerData.data) {
      this.passTime = this.passTime + e;
      if (this.passTime > 1) {
        this.passTime = 0;
        this.addUse(r_PlayerData.PlayerData.data.drawData1.nextTime);
      }
    }
  };
  _ctor.prototype.addUse = function (e) {
    var t = this.getDrawCardCfgById(1);
    if (0 != e && e <= r_TimeSystem.TimeSystem.getServerTime()) {
      r_PlayerData.PlayerData.data.drawData1.use++;
      if (r_PlayerData.PlayerData.data.drawData1.use < 5) {
        r_PlayerData.PlayerData.data.drawData1.nextTime = e + t.drawCool;
      } else {
        r_PlayerData.PlayerData.data.drawData1.use = 5;
        r_PlayerData.PlayerData.data.drawData1.nextTime = 0;
      }
      r_PlayerData.PlayerData.saveData();
      r_DrawUI.DrawUI.Inst && r_DrawUI.DrawUI.Inst.refreshAll();
      r_DrawUI.DrawUI.Inst && r_DrawUI.DrawUI.Inst.updateTime();
      this.addUse(r_PlayerData.PlayerData.data.drawData1.nextTime);
    }
  };
  _ctor.prototype.countDownTime = function () {
    var e = r_PlayerData.PlayerData.data.drawData1.nextTime;
    if (e <= 0) {
      return "";
    }
    var t = e - r_TimeSystem.TimeSystem.getServerTime();
    if (t <= 0) {
      return "";
    }
    var o = Math.floor(t / 60);
    var i = t % 60;
    return (o >= 10 ? "" + o : "0" + o) + ":" + (i >= 10 ? "" + i : "0" + i);
  };
  _ctor.prototype.getWeightDrawCard = function (e, t) {
    undefined === t && (t = false);
    var o = this.getDrawCardCfgById(e);
    var n = t ? r_DrawCardCfg.DrawCardType.品质UR : r_UtilsSystem.UtilsSystem.getWeight(o.weight);
    var a = 0;
    switch (n) {
      case r_DrawCardCfg.DrawCardType.金币:
      case r_DrawCardCfg.DrawCardType.钻石:
        a = r_UtilsSystem.UtilsSystem.randomPercentFromArray(r_DrawCardCfg.DrawCardAward[n]).id;
        break;
      case r_DrawCardCfg.DrawCardType.品质N:
        a = this.getRandomCard(0).id;
        break;
      case r_DrawCardCfg.DrawCardType.品质R:
        a = this.getRandomCard(1).id;
        break;
      case r_DrawCardCfg.DrawCardType.品质SR:
        a = this.getRandomCard(2).id;
        break;
      case r_DrawCardCfg.DrawCardType.品质SSR:
        a = this.getRandomCard(3).id;
        break;
      case r_DrawCardCfg.DrawCardType.品质UR:
        a = this.getRandomCard(4).id;
    }
    console.log("秘书2：", a);
    return {
      id: a,
      type: n
    };
  };
  _ctor.prototype.getRandomCard = function (e) {
    return this["cardList" + e][r_UtilsSystem.UtilsSystem.getRandomNum(0, this["cardList" + e].length - 1)];
  };
  _ctor.prototype.getSSRCard = function () {
    return this.cardList3.find(function (e) {
      return !r_SecretUpSystem.SecretUpSystem.hasSecret(e.id);
    }) || this.cardList3[r_UtilsSystem.UtilsSystem.getRandomNum(0, this.cardList3.length - 1)];
  };
  return _ctor;
}();
exports._DrawCardSystem = exp__DrawCardSystem;
exports.DrawCardSystem = new exp__DrawCardSystem();