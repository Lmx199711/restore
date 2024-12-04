Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MagicBoardSystem = exports._MagicBoardSystem = undefined;
var r_PlayerData = require("PlayerData");
var r_OpenBoxCfg = require("OpenBoxCfg");
var r_ReportSystem = require("ReportSystem");
var exp__MagicBoardSystem = function () {
  function _ctor() {}
  _ctor.prototype.initData = function () {
    r_PlayerData.PlayerData.data.magicBoard = {
      skill1: false,
      skill2: false,
      giftBox: 0,
      superGiftBox: 0
    };
  };
  _ctor.prototype.resetData = function () {
    if (!r_PlayerData.PlayerData.data.magicBoard) {
      return this.initData();
    }
    r_PlayerData.PlayerData.data.magicBoard.skill1 || (r_PlayerData.PlayerData.data.magicBoard.skill1 = false);
    r_PlayerData.PlayerData.data.magicBoard.skill2 || (r_PlayerData.PlayerData.data.magicBoard.skill2 = false);
    r_PlayerData.PlayerData.data.magicBoard.giftBox || (r_PlayerData.PlayerData.data.magicBoard.giftBox = 0);
    r_PlayerData.PlayerData.data.magicBoard.superGiftBox || (r_PlayerData.PlayerData.data.magicBoard.superGiftBox = 0);
  };
  _ctor.prototype.openBox = function (e) {
    var t = [];
    var o = e && 1 == e.boxType ? e.boxNum : r_PlayerData.PlayerData.data.magicBoard.giftBox;
    var a = e && 2 == e.boxType ? e.boxNum : r_PlayerData.PlayerData.data.magicBoard.superGiftBox;
    var s = 0;
    if (3 == e.boxType) {
      s = e ? 3 == e.boxType ? r_PlayerData.PlayerData.data.magicBoard.surpriseBox : 0 : r_PlayerData.PlayerData.data.magicBoard.surpriseBox;
      o = 0;
      a = 0;
    }
    for (var r = 0; r < o; r++) {
      var c = 0;
      var l = null;
      for (var u = 0; u < r_OpenBoxCfg.giftProbabilityCfg.length; u++) {
        if (Math.random() < (c += r_OpenBoxCfg.giftProbabilityCfg[u].probability)) {
          l = r_OpenBoxCfg.giftProbabilityCfg[u];
          break;
        }
      }
      this.addGift(l, t);
    }
    for (r = 0; r < a; r++) {
      c = 0;
      l = null;
      for (u = 0; u < r_OpenBoxCfg.superGiftProbabilityCfg.length; u++) {
        if (Math.random() < (c += r_OpenBoxCfg.superGiftProbabilityCfg[u].probability)) {
          l = r_OpenBoxCfg.superGiftProbabilityCfg[u];
          break;
        }
      }
      this.addGift(l, t);
    }
    for (r = 0; r < s; r++) {
      l = null;
      for (u = 0; u < r_OpenBoxCfg.surpriseGiftProbabilityCfg.length; u++) {
        "金砖" != r_OpenBoxCfg.surpriseGiftProbabilityCfg[u].name && (l = r_OpenBoxCfg.surpriseGiftProbabilityCfg[u]);
        this.addGift(l, t);
      }
    }
    r_PlayerData.PlayerData.data.magicBoard.giftBox -= o;
    r_PlayerData.PlayerData.data.magicBoard.superGiftBox -= a;
    r_PlayerData.PlayerData.data.magicBoard.surpriseBox -= s;
    return t;
  };
  _ctor.prototype.addGift = function (e, t, o) {
    undefined === o && (o = false);
    if (e) {
      for (var i = 0; i < t.length; i++) {
        if (t[i].name == e.name && t[i].num == e.num) {
          return void t[i].count++;
        }
      }
      if (e.count) {
        t.push({
          name: e.name,
          num: e.num,
          count: e.count
        });
      } else {
        t.push({
          name: e.name,
          num: e.num,
          count: 1
        });
      }
    }
  };
  _ctor.prototype.getReward = function (e, t) {
    undefined === t && (t = false);
    var o = t ? 2 : 1;
    r_PlayerData.PlayerData.data.magicBoard.superGiftBox += e.reward.superGiftBox * o;
    r_PlayerData.PlayerData.data.magicBoard.giftBox += e.reward.giftBox * o;
    r_PlayerData.PlayerData.addCoin("神奇的菜板", e.reward.money * o + e.reward.gold * o, r_ReportSystem.SystemKey.None, true);
  };
  return _ctor;
}();
exports._MagicBoardSystem = exp__MagicBoardSystem;
exports.MagicBoardSystem = new exp__MagicBoardSystem();