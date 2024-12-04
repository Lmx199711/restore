var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RussuaAction = undefined;
var s;
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_RussiaSystem = require("RussiaSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_RussiaCfg = require("RussiaCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_RussiaBuffUI = require("RussiaBuffUI");
var r_RussiaResult = require("RussiaResult");
var r_RussiaReviveUI = require("RussiaReviveUI");
var r_RussiaTriggerUI = require("RussiaTriggerUI");
var def_RussiaGameUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Russia, r_UIDef.UIDef.Res.UI.RussiaGameUI) || this;
    t.showAnimFlag = false;
    t.uiType = "fullScreen";
    t.m_round = 0;
    t.m_maxRound = 5;
    t.m_bulletNum = 0;
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return false;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.RussiaGameUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.RussiaGameUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnFire = this.passCom.getChild("btnFire").asButton;
    this.bindBtnCallback(this.btnFire);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ref__ctor.Inst = null;
    this.passCom.destruct();
    r_TimeSystem.TimeSystem.scheduleClear("pass1");
    r_TimeSystem.TimeSystem.scheduleClear("pass");
    r_TimeSystem.TimeSystem.scheduleClear("step_4");
  };
  _ctor.prototype.restart = function () {
    r_RussiaSystem.RussiaSystem.init();
    this.m_round = 0;
    this.contentPane.getTransition("init").play();
    this.labPr.text = "";
    this.roundStart();
  };
  _ctor.prototype.nextRound = function () {
    var e = this;
    if (this.m_round >= this.m_maxRound - 1) {
      r_RussiaResult.default.showUI();
    } else {
      r_PlayerData.PlayerData.addCoin("俄罗斯轮盘奖励", r_RussiaCfg.RussiaRoundAward[this.m_round], r_ReportSystem.SystemKey.俄罗斯轮盘);
      if (this.m_round < this.m_maxRound - 1 && this.m_round > 0) {
        this.selectBuff(function () {
          e.m_round++;
          e.roundStart();
        });
      } else {
        this.m_round++;
        this.roundStart();
      }
    }
  };
  _ctor.prototype.roundStart = function () {
    this.contentPane.getController("round").selectedIndex = this.m_round;
    this.initRound();
    this.showRound();
    this.roleIdle();
    r_UtilsSystem.UtilsSystem.playAnim(this.animGan, "step_0", true);
  };
  _ctor.prototype.selectBuff = function (e) {
    r_RussiaBuffUI.default.showUI({
      hideBack: e
    });
  };
  _ctor.prototype.initRound = function () {
    this.btnFire.enabled = false;
    this.passCom.initRound();
  };
  _ctor.prototype.showRound = function () {
    var e = this;
    this.contentPane.getTransition("roundTxt").play(function () {
      e.openBulletView();
    });
  };
  _ctor.prototype.openBulletView = function () {
    r_RussiaTriggerUI.default.showUI({
      round: this.m_round
    });
  };
  _ctor.prototype.countDown = function () {
    this.passCom.countDown();
    this.btnFire.enabled = true;
    this.roleFear();
    var e = r_RussiaSystem.RussiaSystem.randomList.filter(function (e) {
      return !e;
    }).length + "/" + r_RussiaSystem.RussiaSystem.randomList.length;
    this.labPr.text = e;
  };
  _ctor.prototype.laodBullet = function () {
    r_RussiaSystem.RussiaSystem.setRandomList(this.m_round);
    this.countDown();
  };
  _ctor.prototype.fire = function () {
    var e = this;
    this.passCom.stop();
    this.btnFire.enabled = false;
    if (this.checkHit()) {
      this.hit();
    } else {
      r_UtilsSystem.UtilsSystem.playAnim(this.animGan, "step_2", false);
      r_SoundMgr.SoundMgr.playSound("russia/射出空弹");
      r_TimeSystem.TimeSystem.scheduleOnce("pass1", 1.5, function () {
        e.roleHappy();
      });
      r_TimeSystem.TimeSystem.scheduleOnce("pass", 3, function () {
        e.pass();
      });
    }
  };
  _ctor.prototype.checkHit = function () {
    return r_RussiaSystem.RussiaSystem.checkHit();
  };
  _ctor.prototype.hit = function () {
    var e = this;
    if (r_RussiaSystem.RussiaSystem.checkHood()) {
      r_UtilsSystem.UtilsSystem.playAnim(this.animGan, "step_4", false);
      r_RussiaSystem.RussiaSystem.gameData.hoodCount--;
      r_SoundMgr.SoundMgr.playSound("russia/打到护盾");
      r_SoundMgr.SoundMgr.playSound("russia/射出实弹");
      r_TimeSystem.TimeSystem.scheduleOnce("pass1", 1.5, function () {
        e.roleHappy();
      });
      r_TimeSystem.TimeSystem.scheduleOnce("step_4", 3, function () {
        r_UtilsSystem.UtilsSystem.playAnim(e.animGan, "step_0", false);
        e.noDie();
      });
    } else if (r_RussiaSystem.RussiaSystem.checkDodge()) {
      r_UtilsSystem.UtilsSystem.playAnim(this.animGan, "step_3", false);
      r_SoundMgr.SoundMgr.playSound("russia/射出实弹");
      r_TimeSystem.TimeSystem.scheduleOnce("pass1", .8, function () {
        e.roleElude();
      });
      r_TimeSystem.TimeSystem.scheduleOnce("step_4", 3, function () {
        e.roleIdle();
        e.noDie();
      });
    } else {
      r_UtilsSystem.UtilsSystem.playAnim(this.animGan, "step_1", false);
      r_SoundMgr.SoundMgr.playSound("russia/射出实弹");
      r_TimeSystem.TimeSystem.scheduleOnce("pass1", 1.5, function () {
        e.roleShot();
      });
      r_TimeSystem.TimeSystem.scheduleOnce("step_4", 3, function () {
        e.subHp();
      });
    }
  };
  _ctor.prototype.checkSubHp = function () {
    return r_RussiaSystem.RussiaSystem.checkSubHp();
  };
  _ctor.prototype.subHp = function () {
    r_RussiaSystem.RussiaSystem.subHp();
    this.passCom.subHp();
    if (this.checkDie()) {
      this.die();
    } else {
      this.noDie();
    }
  };
  _ctor.prototype.checkDie = function () {
    return r_RussiaSystem.RussiaSystem.checkDie();
  };
  _ctor.prototype.die = function () {
    r_RussiaReviveUI.default.showUI();
  };
  _ctor.prototype.revive = function () {
    this.passCom.showHp();
    this.noDie();
  };
  _ctor.prototype.noDie = function () {
    if (this.checkBulletIsNull()) {
      this.nextRound();
    } else {
      this.countDown();
    }
  };
  _ctor.prototype.checkBulletIsNull = function () {
    return r_RussiaSystem.RussiaSystem.checkBullectCount();
  };
  _ctor.prototype.pass = function () {
    this.nextRound();
  };
  _ctor.prototype.onClickbtnFire = function () {
    this.fire();
  };
  _ctor.prototype.roleIdle = function () {
    r_UtilsSystem.UtilsSystem.playAnim(this.animRole, s.待机, true);
  };
  _ctor.prototype.roleFear = function () {
    r_UtilsSystem.UtilsSystem.playAnim(this.animRole, s.害怕, true);
  };
  _ctor.prototype.roleShot = function () {
    r_SoundMgr.SoundMgr.playSound("russia/黑人状态");
    r_UtilsSystem.UtilsSystem.playAnim(this.animRole, s.中弹, true);
  };
  _ctor.prototype.roleHappy = function () {
    r_SoundMgr.SoundMgr.playSound("russia/坏笑");
    r_UtilsSystem.UtilsSystem.playAnim(this.animRole, s.窃喜, true);
  };
  _ctor.prototype.roleElude = function () {
    r_SoundMgr.SoundMgr.playSound("russia/躲避");
    r_UtilsSystem.UtilsSystem.playAnim(this.animRole, s.闪躲, false);
  };
  __decorate([r_DecorateFunction1.AutoFind("passCom")], _ctor.prototype, "passCom", undefined);
  __decorate([r_DecorateFunction1.AutoFind("animGan")], _ctor.prototype, "animGan", undefined);
  __decorate([r_DecorateFunction1.AutoFind("animRole")], _ctor.prototype, "animRole", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labPr")], _ctor.prototype, "labPr", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_RussiaGameUI;
(function (e) {
  e["待机"] = "step_1";
  e["害怕"] = "step_2";
  e["中弹"] = "step_3";
  e["窃喜"] = "step_4";
  e["闪躲"] = "step_5";
})(s = exports.RussuaAction || (exports.RussuaAction = {}));