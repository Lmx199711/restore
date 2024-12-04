Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrinterCommon = undefined;
var r_UIDef = require("UIDef");
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_PlayerData = require("PlayerData");
var r_PrinterCfg = require("PrinterCfg");
var exp_PrinterCommon = function () {
  function _ctor() {}
  _ctor.init = function () {
    if (!this.getData("init")) {
      this.setData("init", true);
      this.cardList = [];
      this.curCardList = [];
      this.collectScore = 0;
      this.collectLevel = 0;
      return true;
    }
    if (!this.cardList) {
      this.cardList = this.getData("cardList") || [];
      this.curCardList = this.getData("curCardList") || [];
      this.collectScore = this.calculateCollectScore();
      this.collectLevel = this.calculateCollectLevel();
    }
  };
  _ctor.calculateCollectScore = function () {
    var e = 0;
    for (var t = 0; t < this.cardList.length; t++) {
      var o = this.cardList[t];
      e += r_PrinterCfg.CardInfo[o.quality].score;
    }
    return e;
  };
  _ctor.calculateCollectLevel = function () {
    var e = 0;
    for (var t = r_PrinterCfg.CollectInfo.length - 1; t >= 0; t--) {
      if (this.collectScore >= r_PrinterCfg.CollectInfo[t].score) {
        e = t;
        break;
      }
    }
    return e;
  };
  _ctor.checkCardGroup = function (e) {
    return this.curCardList.filter(function (t) {
      return t.type == e;
    }).length >= 11;
  };
  _ctor.getBigIcon = function (e) {
    if (e.quality < 2) {
      return "big_" + e.quality;
    } else {
      return "big_" + e.type + "_" + e.quality + "_" + e.id;
    }
  };
  _ctor.getSmallIcon = function (e) {
    if (e.quality < 2) {
      return "small_" + e.quality;
    } else {
      return "small_" + e.type + "_" + e.quality + "_" + e.id;
    }
  };
  _ctor.getQualityIcon = function (e) {
    return "ui://" + r_UIDef.UIDef.Pack.Printer + "/qualityIcon" + e.quality;
  };
  _ctor.getQualityBG = function (e) {
    if (e.quality < 2) {
      return "ui://" + r_UIDef.UIDef.Pack.Printer + "/qualityBG0";
    } else {
      return "ui://" + r_UIDef.UIDef.Pack.Printer + "/qualityBG" + e.quality;
    }
  };
  _ctor.randomRangeInt = function (e, t) {
    return Math.floor(e + Math.random() * (t - e));
  };
  _ctor.getInkCount = function () {
    return this.getData("inkCount") || 0;
  };
  _ctor.addInkCount = function (e) {
    e += this.getInkCount();
    this.setData("inkCount", e);
    r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.inkChange);
  };
  _ctor.getPinterUnlockVideo = function () {
    return this.getData("PinterUnlockVideo") || 0;
  };
  _ctor.setPinterUnlockVideo = function (e) {
    this.setData("PinterUnlockVideo", e);
  };
  _ctor.addPrintCardCount = function (e) {
    var t = r_PrinterCfg.LeastQuality[e].count;
    for (var o = 0; o < t.length; o++) {
      var i = "PrintCardCount" + e + t[o];
      var n = this.getData(i) || 0;
      this.setData(i, n + 1);
    }
  };
  _ctor.getPrintCardCount = function (e, t) {
    var o = "PrintCardCount" + e + t;
    return this.getData(o) || 0;
  };
  _ctor.setPrintCardCount = function (e, t, o) {
    var i = "PrintCardCount" + e + t;
    this.setData(i, o);
  };
  _ctor.getShowSellCardGroupTime = function () {
    return this.getData("ShowSellCardGroupTime") || 0;
  };
  _ctor.setShowSellCardGroupTime = function () {
    this.setData("ShowSellCardGroupTime", Date.now());
  };
  _ctor.setData = function (e, t) {
    r_PlayerData.PlayerData.data.printer[e] = t;
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.getData = function (e) {
    return r_PlayerData.PlayerData.data.printer[e];
  };
  _ctor.collectLevel = 0;
  _ctor.collectScore = 0;
  return _ctor;
}();
exports.PrinterCommon = exp_PrinterCommon;