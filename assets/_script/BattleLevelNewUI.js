var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_CoinSystem = require("CoinSystem");
var r_FguiResSystem = require("FguiResSystem");
var r_GroupSystem = require("GroupSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_RoleSystem = require("RoleSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_GameGuideUI = require("GameGuideUI");
var r_BattleFailUI = require("BattleFailUI");
var r_BattleResultUI = require("BattleResultUI");
var r_BattleUpUI = require("BattleUpUI");
var def_BattleLevelNewUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Battle, r_UIDef.UIDef.Res.UI.BattleLevelNewUI) || this;
    t.showAnimFlag = false;
    t.uiType = "fullScreen";
    t.isStart = false;
    t.m_isEnd = false;
    t.m_meValue = 0;
    t.m_rivalValue = 0;
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
    this.show(r_UIDef.UIDef.Urls.UI.BattleLevelNewUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BattleLevelNewUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.meTouch, this.btnStart, this.btnLose);
    this.initV2 = cc.v2(this.roleAnim.x, this.roleAnim.y);
    this.bbqCom.gid = 2;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
    this.restart();
    r_SoundMgr.SoundMgr.playMusic("battle/挑战bgm");
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ref__ctor.Inst = null;
    r_TimeSystem.TimeSystem.scheduleClear("battleUpdate");
    r_GameGuideUI.default.finishStep(2);
    r_SoundMgr.SoundMgr.playMusic("bgm");
  };
  _ctor.prototype.restart = function () {
    this.contentPane.getController("c1").selectedIndex = 0;
    this.proMe.init();
    var e = this.getInfo();
    this.proMe.maxValue = e.upExp;
    this.meValue = 0;
    this.rivalValue = 0;
    this.m_isEnd = false;
    this.proMe.setOtherHead(this.data.level || 2);
    this.loadRole();
    this.bbqCom.restart();
    this.bbqCom2.restart(this.data.level);
    this.btnLose.visible = !this.data.ispingbi;
    this.animHand.visible = 1 == this.data.level;
  };
  _ctor.prototype.getInfo = function () {
    if (null == this.data.level) {
      return r_GroupSystem.GroupSystem.getRoleCfg()[2];
    } else {
      return r_GroupSystem.GroupSystem.getRoleCfg()[this.data.level];
    }
  };
  _ctor.prototype.onClickbtnStart = function () {
    this.contentPane.getController("c1").selectedIndex = 1;
    this.isStart = true;
    this.roleSke.setAnimation(0, "step_2", true);
    this.bbqCom2.animTanhuo.visible = true;
    r_TimeSystem.TimeSystem.schedule("battleUpdate", 1, this.onUpdateTime.bind(this));
  };
  Object.defineProperty(_ctor.prototype, "meValue", {
    set: function (e) {
      var t = e - this.m_meValue;
      this.meProTXt.getChild("labAdd").text = t > 0 ? "+" + r_UtilsSystem.UtilsSystem.numFormats(t) : "";
      this.meProTXt.getTransition("t0").play();
      this.m_meValue = e;
      this.proMe.selfValue = e;
      this.meProTXt.getChild("labValue").text = r_UtilsSystem.UtilsSystem.numFormats(e) + "_" + r_UtilsSystem.UtilsSystem.numFormats(this.proMe.maxValue);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "rivalValue", {
    set: function (e) {
      var t = e - this.m_rivalValue;
      this.rivalProTXt.getChild("labAdd").text = t > 0 ? "+" + r_UtilsSystem.UtilsSystem.numFormats(t) : "";
      this.rivalProTXt.getTransition("t0").play();
      this.m_rivalValue = e;
      this.proMe.otherValue = e;
      this.rivalProTXt.getChild("labValue").text = r_UtilsSystem.UtilsSystem.numFormats(e) + "_" + r_UtilsSystem.UtilsSystem.numFormats(this.proMe.maxValue);
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.onClickmeTouch = function () {
    this.m_isEnd || this.isStart && (this.bbqCom.play(), this.meValue = this.m_meValue + r_CoinSystem.CoinSystem.getClickOnceCoin(), -1 != this.checkReulst() && (1 == this.checkReulst() ? this.win() : this.lose()));
  };
  _ctor.prototype.loadRole = function () {
    var e = this;
    this.btnStart.visible = false;
    var t = this.getInfo();
    this.roleAnim.node.destroyAllChildren();
    r_ResSystem.ResSystem.loadBundleRes("game5", "battle/" + t.anim, cc.Prefab, function (o, i) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(e, i);
      var n = cc.instantiate(i);
      e.roleAnim.node.addChild(n);
      e.roleSke = n.getComponent(sp.Skeleton);
      e.roleSke.setAnimation(0, "step_1", true);
      e.bbqCom2.animTanhuo.visible = false;
      e.btnStart.visible = true;
      e.roleAnim.x = e.initV2.x + t.offset[0];
      e.roleAnim.y = e.initV2.y + t.offset[1];
    });
  };
  _ctor.prototype.onUpdateTime = function () {
    if (this.roleSke) {
      this.bbqCom2.play();
      var e = this.getInfo();
      this.rivalValue = this.m_rivalValue + e.rivalSpeed;
      if (-1 != this.checkReulst()) {
        if (1 == this.checkReulst()) {
          this.win();
        } else {
          this.lose();
        }
      }
    }
  };
  _ctor.prototype.checkReulst = function () {
    if (this.proMe.selfValue >= this.proMe.maxValue) {
      return 1;
    } else if (this.proMe.otherValue >= this.proMe.maxValue) {
      return 0;
    } else {
      return -1;
    }
  };
  _ctor.prototype.win = function () {
    var e = this;
    this.end();
    r_SoundMgr.SoundMgr.playSound("win");
    this.contentPane.getController("c1").selectedIndex = 2;
    this.winAnim.loop = false;
    this.winAnim.animationName = "animation";
    this.winAnim.playing = true;
    r_TimeSystem.TimeSystem.scheduleOnce("upLvel0", 1.5, function () {
      e.winAnim.playing = false;
      e.winAnim.loop = true;
      e.winAnim.animationName = "animation2";
      e.winAnim.playing = true;
    });
    var t = this.data.level >= r_PlayerData.PlayerData.data.battleLevel;
    r_TimeSystem.TimeSystem.scheduleOnce("upLvel1", 2.5, function () {
      if (t) {
        r_ReportSystem.ReportSystem.reportBattleUp(r_PlayerData.PlayerData.data.battleLevel);
        r_RoleSystem.RoleSystem.upLevel();
      }
    });
    r_TimeSystem.TimeSystem.scheduleOnce("upLvel2", 3.5, function () {
      if (t) {
        r_BattleResultUI.default.showUI({
          awardCompleteFun: function () {
            r_BattleUpUI.default.hide();
            e.hide();
          }
        });
      } else {
        r_BattleUpUI.default.hide();
        e.hide();
      }
    });
  };
  _ctor.prototype.lose = function () {
    this.end();
    r_SoundMgr.SoundMgr.playSound("fail");
    this.contentPane.getController("c1").selectedIndex = 3;
    this.loseAnim.loop = false;
    this.loseAnim.animationName = "animation";
    this.loseAnim.playing = true;
    r_TimeSystem.TimeSystem.scheduleOnce("uplose", 3, function () {
      r_BattleFailUI.default.showUI();
    });
  };
  _ctor.prototype.end = function () {
    r_TimeSystem.TimeSystem.scheduleClear("battleUpdate");
    this.m_isEnd = true;
    this.roleSke.setAnimation(0, "step_1", true);
    this.bbqCom2.animTanhuo.visible = false;
  };
  _ctor.prototype.onClickbtnLose = function () {
    this.lose();
  };
  __decorate([r_DecorateFunction1.AutoFind("bbqCom")], _ctor.prototype, "bbqCom", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bbqCom2")], _ctor.prototype, "bbqCom2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("meTouch")], _ctor.prototype, "meTouch", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnStart")], _ctor.prototype, "btnStart", undefined);
  __decorate([r_DecorateFunction1.AutoFind("proMe")], _ctor.prototype, "proMe", undefined);
  __decorate([r_DecorateFunction1.AutoFind("meProTXt")], _ctor.prototype, "meProTXt", undefined);
  __decorate([r_DecorateFunction1.AutoFind("rivalProTXt")], _ctor.prototype, "rivalProTXt", undefined);
  __decorate([r_DecorateFunction1.AutoFind("roleAnim")], _ctor.prototype, "roleAnim", undefined);
  __decorate([r_DecorateFunction1.AutoFind("win")], _ctor.prototype, "winAnim", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lose")], _ctor.prototype, "loseAnim", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnLose")], _ctor.prototype, "btnLose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("animHand")], _ctor.prototype, "animHand", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_BattleLevelNewUI;