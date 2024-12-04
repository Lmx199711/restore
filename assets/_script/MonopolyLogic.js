Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonopolyLogic = undefined;
var r_jsbi = require("jsbi");
var r_BigNumSystem = require("BigNumSystem");
var r_MonopolySystem = require("MonopolySystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_MonopolyCfg = require("MonopolyCfg");
var r_SoundMgr = require("SoundMgr");
var r_MonopolyBankUI = require("MonopolyBankUI");
var r_MonopolyEmgcUI = require("MonopolyEmgcUI");
var r_MonopolyFreeUI = require("MonopolyFreeUI");
var r_MonopolyUI = require("MonopolyUI");
var m = function () {
  function e() {
    this.m_mapType = 0;
    this.m_targetStep = 0;
    this.m_diceNum = 1;
    this.m_moveTime = .5;
    this.m_diceList = [1, 2, 3, 4, 5, 6];
  }
  Object.defineProperty(e.prototype, "step", {
    get: function () {
      return this.m_step;
    },
    set: function (e) {
      this.m_step = e;
      this.setResult();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(e.prototype, "mapPath", {
    get: function () {
      return r_MonopolySystem.MonopolySystem.getMap(this.m_mapType);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(e.prototype, "targetStep", {
    get: function () {
      return this.m_targetStep;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(e.prototype, "diceNum", {
    get: function () {
      return this.m_diceNum;
    },
    enumerable: false,
    configurable: true
  });
  e.prototype.init = function (e, t) {
    this.m_itemMap = e;
    this.m_chess = t;
    this.m_mapType = 0;
  };
  e.prototype.restart = function () {
    this.changeMap(0);
    this.m_tempStep = 0;
    this.m_step = 0;
    this.angleLeftAndRight(0);
    Object.values(this.m_itemMap).forEach(function (e, t) {
      e.getController("c1").selectedIndex = 0 == t ? 1 : 0;
    });
  };
  e.prototype.findPath = function (e) {
    if (0 != e) {
      r_MonopolyUI.default.instance.currType = r_MonopolyUI.monopolyType.移动中;
      this.mapPath.length;
      if (this.m_step + e < 0) {
        this.m_targetStep = this.mapPath.length - (this.m_step + e);
      } else if (this.m_step + e >= this.mapPath.length) {
        this.m_targetStep = (this.m_step + e) % this.mapPath.length;
        r_MonopolyUI.default.instance;
      }
      this.m_tempStep = this.m_step;
      this.moveChess(this.m_step + e);
    }
  };
  e.prototype.moveChess = function (e) {
    var t;
    var o;
    var i;
    var n = this;
    if (this.m_step < e) {
      this.m_tempStep++;
    } else {
      this.m_tempStep--;
    }
    var c = false;
    var u = this.mapPath.length - 1;
    if (this.m_tempStep > u) {
      o = this.m_tempStep % this.mapPath.length;
      i = this.getItemByMapStep(o);
      t = cc.v2(i.x, i.y);
      c = true;
    } else if (this.m_tempStep < 0) {
      o = this.mapPath.length + this.m_tempStep;
      i = this.getItemByMapStep(o);
      t = cc.v2(i.x, i.y);
    } else {
      o = this.m_tempStep;
      i = this.getItemByMapStep(o);
      t = cc.v2(i.x, i.y);
    }
    t = r_MonopolySystem.MonopolySystem.getCheesPos(t);
    if (this.m_tempStep == e) {
      this.m_tween = cc.tween(this.m_chess).to(this.m_moveTime, {
        x: t.x,
        y: t.y
      }).call(function () {
        if (c && 0 == o) {
          r_UtilsSystem.UtilsSystem.showTip("跑完一圈奖励500万");
          r_PlayerData.PlayerData.addCoin("大富翁奖励", 5e6, r_ReportSystem.SystemKey.大富翁, false);
        }
        c && n.changeMap(0);
        n.step = o;
        Object.values(n.m_itemMap).forEach(function (e, t) {
          e.getController("c1").selectedIndex = 0 == t ? 1 : 0;
        });
        n.m_itemMap[n.mapPath[n.step]].getController("c1").selectedIndex = 2;
      }).start();
    } else {
      this.m_tween = cc.tween(this.m_chess).to(this.m_moveTime, {
        x: t.x,
        y: t.y
      }).call(function () {
        if (c && 0 == o) {
          r_UtilsSystem.UtilsSystem.showTip("跑完一圈奖励500万");
          r_PlayerData.PlayerData.addCoin("大富翁奖励", 5e6, r_ReportSystem.SystemKey.大富翁, false);
        }
        Object.values(n.m_itemMap).forEach(function (e, t) {
          e.getController("c1").selectedIndex = 0 == t ? 1 : 0;
        });
        n.m_itemMap[n.mapPath[o]].getController("c1").selectedIndex = 2;
        n.moveChess(e);
      }).start();
    }
    this.angleLeftAndRight(o);
  };
  e.prototype.angleLeftAndRight = function (e) {
    this.m_chess.scaleX = r_MonopolyCfg.MpnppolyGridCfg[this.mapPath[e]].direction;
  };
  e.prototype.getRandomDice = function (e) {
    var t = this;
    if (null != e) {
      this.m_diceNum = e;
      return this.m_diceNum;
    }
    var o = this.mapPath.length - 1;
    var i = this.m_diceList.concat();
    r_MonopolyUI.default.instance.videoNum <= 2 && (i = this.m_diceList.filter(function (e) {
      if (t.m_step + e > o) {
        var i = (t.m_step + e) % t.mapPath.length;
        return !r_MonopolyCfg.MpnppolyGridCfg[t.mapPath[i]].isNoGet;
      }
      return !r_MonopolyCfg.MpnppolyGridCfg[t.mapPath[t.m_step + e]].isNoGet;
    }));
    this.m_diceNum = i[r_UtilsSystem.UtilsSystem.getRandomNum(0, i.length - 1)];
    return this.m_diceNum;
  };
  e.prototype.setResult = function () {
    var e = this;
    var t = r_MonopolyCfg.MpnppolyGridCfg[this.mapPath[this.m_step]];
    r_TimeSystem.TimeSystem.scheduleOnce("triggerEvent", 1, function () {
      r_MonopolyUI.default.instance.currType = r_MonopolyUI.monopolyType.等待中;
      if (r_PlayerData.PlayerData.data.newMonpolyData.shield > 0 && t.isBad) {
        r_PlayerData.PlayerData.data.newMonpolyData.shield--;
        r_PlayerData.PlayerData.saveData();
        r_MonopolyUI.default.instance.propShow();
        r_UtilsSystem.UtilsSystem.showTip("护盾成功抵御一次惩罚");
        return void r_SoundMgr.SoundMgr.playSound("monopoly/护盾抵消");
      }
      r_UtilsSystem.UtilsSystem.showTip(t.tips);
      e["triggerEvent" + t.type](t);
    });
  };
  e.prototype.triggerEvent0 = function () {};
  e.prototype.triggerEvent1 = function (e) {
    var t = e.value;
    if (t >= 0) {
      r_PlayerData.PlayerData.addCoin("大富翁奖励", t, r_ReportSystem.SystemKey.大富翁, false);
      r_SoundMgr.SoundMgr.playSound("monopoly/获得钱");
    } else {
      if (!r_PlayerData.PlayerData.isCoinEnough(Math.abs(t))) {
        r_PlayerData.PlayerData.deleteCoin("大富翁惩罚", r_PlayerData.PlayerData.bigCoin, r_ReportSystem.SystemKey.大富翁, true);
        return void r_SoundMgr.SoundMgr.playSound("monopoly/扣钱");
      }
      r_PlayerData.PlayerData.deleteCoin("大富翁惩罚", Math.abs(t), r_ReportSystem.SystemKey.大富翁, true);
      r_SoundMgr.SoundMgr.playSound("monopoly/扣钱");
    }
  };
  e.prototype.triggerEvent2 = function (e) {
    var t = e.value;
    exports.MonopolyLogic.findPath(t);
  };
  e.prototype.triggerEvent3 = function (e) {
    var t = e.value;
    if (3 != t) {
      e.num > 0 && r_SoundMgr.SoundMgr.playSound("monopoly/获得道具");
      r_PlayerData.PlayerData.data.newMonpolyData[r_MonopolyCfg.MpnppolyProp[t].key] += e.num;
      r_PlayerData.PlayerData.data.newMonpolyData[r_MonopolyCfg.MpnppolyProp[t].key] < 0 && (r_PlayerData.PlayerData.data.newMonpolyData[r_MonopolyCfg.MpnppolyProp[t].key] = 0);
      r_PlayerData.PlayerData.saveData();
      r_MonopolyUI.default.instance.propShow();
    } else {
      r_MonopolyFreeUI.default.showUI();
    }
  };
  e.prototype.triggerEvent4 = function () {
    this.changeMap(1);
    this.m_chess.scaleX = -1;
    r_SoundMgr.SoundMgr.playSound("monopoly/获得道具");
  };
  e.prototype.triggerEvent5 = function (e) {
    var t = e.value;
    var o = r_BigNumSystem.BigNumSystem.getNum(1 / Math.abs(t));
    var a = r_jsbi.default.divide(r_PlayerData.PlayerData.bigCoin, o);
    if (!r_PlayerData.PlayerData.isCoinEnough(a)) {
      r_PlayerData.PlayerData.deleteCoin("大富翁惩罚", r_PlayerData.PlayerData.bigCoin, r_ReportSystem.SystemKey.大富翁, true);
      return void r_SoundMgr.SoundMgr.playSound("monopoly/扣钱");
    }
    r_PlayerData.PlayerData.deleteCoin("大富翁惩罚", a, r_ReportSystem.SystemKey.大富翁, true);
    r_SoundMgr.SoundMgr.playSound("monopoly/扣钱");
  };
  e.prototype.triggerEvent6 = function (e) {
    var t = e.value;
    var o = r_MonopolyCfg.MpnppolyRandomCoin[t];
    var i = r_UtilsSystem.UtilsSystem.randomPercentFromArray(o);
    r_MonopolyBankUI.default.showUI(i);
  };
  e.prototype.triggerEvent7 = function () {
    r_MonopolyUI.default.instance.restart();
    r_SoundMgr.SoundMgr.playSound("monopoly/炸弹");
  };
  e.prototype.triggerEvent8 = function () {
    var e = r_MonopolyCfg.MpnppolyEventCfg[r_UtilsSystem.UtilsSystem.getRandomNum(0, r_MonopolyCfg.MpnppolyEventCfg.length - 1)];
    r_MonopolyEmgcUI.default.showUI(e);
  };
  e.prototype.triggerEvent9 = function () {
    r_MonopolyUI.default.instance.rollDice();
  };
  e.prototype.changeMap = function (e) {
    this.m_mapType = e;
  };
  e.prototype.getItemByMapStep = function (e) {
    return this.m_itemMap[this.mapPath[e]];
  };
  e.prototype.destruct = function () {
    r_TimeSystem.TimeSystem.scheduleClear("triggerEvent");
    this.m_tween && this.m_tween.stop();
  };
  return e;
}();
exports.MonopolyLogic = new m();