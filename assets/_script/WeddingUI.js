var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_FguiResSystem = require("FguiResSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_ShareSystem = require("ShareSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_WeddingResultUI = require("WeddingResultUI");
var def_WeddingUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Wedding, r_UIDef.UIDef.Res.UI.WeddingUI) || this;
    t.showAnimFlag = false;
    t.uiType = "fullScreen";
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return false;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.WeddingUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.WeddingUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnOpen, this.btnGo, this.btnWear, this.btnAbel, this.btnStart);
    r_ResSystem.ResSystem.loadBundleRes("game3", "wedding/anim", cc.Prefab, function (e, o) {
      if (e) {
        console.error("加载失败: ", e);
      } else {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
        var i = cc.instantiate(o);
        t.animGril.node.addChild(i);
        i.getComponent(sp.Skeleton).setAnimation(0, "step_1", true);
      }
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    r_ShareSystem.ShareSystem.startRecord();
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_ShareSystem.ShareSystem.stopRecord(false);
    r_SoundMgr.SoundMgr.playMusic("bgm");
    r_SoundMgr.SoundMgr.stopSound("wedding/彩带烟花");
    r_PlayerData.PlayerData.isGame = false;
  };
  _ctor.prototype.restart = function () {
    r_PlayerData.PlayerData.isGame = true;
    this.contentPane.getController("c1").setSelectedIndex(0);
    r_SoundMgr.SoundMgr.playMusic("wedding/婚礼bgm1");
  };
  _ctor.prototype.onClickbtnGo = function () {
    var e = this;
    r_UtilsSystem.UtilsSystem.playAnim(this.animStart, "step_1", false);
    r_SoundMgr.SoundMgr.playSound("wedding/男生脚步声");
    this.showAnim("t0", 1, function () {
      r_UtilsSystem.UtilsSystem.playAnim(e.animOpen, "step_0", false);
      e.contentPane.getTransition("t1-1").play(function () {
        e.animOpen.animationName = null;
        e.animOpen.playing = false;
        e.contentPane.getTransition("t1-0").play();
      });
    });
    r_UtilsSystem.UtilsSystem.playAnim(this.animOpen, "step_00", false);
  };
  _ctor.prototype.onClickbtnAbel = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("wedding/深呼吸");
    this.btnAbel.visible = false;
    r_TimeSystem.TimeSystem.scheduleOnce("onClickbtnAbel", 1.5, function () {
      e.contentPane.getController("c1").selectedIndex = 2;
      e.contentPane.getTransition("t2").play(function () {
        e.contentPane.getController("c1").selectedIndex = 3;
      });
    });
  };
  _ctor.prototype.onClickbtnOpen = function () {
    r_UtilsSystem.UtilsSystem.playAnim(this.animOpen, "step_1", false);
    r_SoundMgr.SoundMgr.playSound("wedding/女孩笑");
    this.showAnim("t3", 4);
  };
  _ctor.prototype.onClickbtnWear = function () {
    var e = this;
    r_UtilsSystem.UtilsSystem.playAnim(this.pao, "animation", false);
    r_UtilsSystem.UtilsSystem.playAnim(this.caidan, "animation", true);
    r_UtilsSystem.UtilsSystem.playAnim(this.lihua, "animation", false);
    r_UtilsSystem.UtilsSystem.playAnim(this.animWear, "step_2", false);
    r_SoundMgr.SoundMgr.playSound("wedding/彩带烟花", true);
    this.contentPane.getTransition("t5").play(function () {
      r_UtilsSystem.UtilsSystem.playAnim(e.animWear, "step_3", true);
      r_TimeSystem.TimeSystem.scheduleOnce("wedEnd", 4, function () {
        r_WeddingResultUI.default.showUI({
          index: 1
        });
      });
    });
  };
  _ctor.prototype.onClickbtnStart = function () {
    var e = this;
    this.contentPane.getTransition("4-5").play();
    r_TimeSystem.TimeSystem.scheduleOnce("onClickbtnStart", 1, function () {
      e.contentPane.getController("c1").selectedIndex = 5;
      r_SoundMgr.SoundMgr.playMusic("wedding/婚礼bgm2");
    });
  };
  _ctor.prototype.showAnim = function (e, t, o) {
    var i = this;
    this.contentPane.getTransition(e).play(function () {
      i.contentPane.getController("c1").setSelectedIndex(t);
      o && o();
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnOpen")], _ctor.prototype, "btnOpen", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGo")], _ctor.prototype, "btnGo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnWear")], _ctor.prototype, "btnWear", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAbel")], _ctor.prototype, "btnAbel", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnStart")], _ctor.prototype, "btnStart", undefined);
  __decorate([r_DecorateFunction1.AutoFind("animStart")], _ctor.prototype, "animStart", undefined);
  __decorate([r_DecorateFunction1.AutoFind("animOpen")], _ctor.prototype, "animOpen", undefined);
  __decorate([r_DecorateFunction1.AutoFind("animGril")], _ctor.prototype, "animGril", undefined);
  __decorate([r_DecorateFunction1.AutoFind("pao")], _ctor.prototype, "pao", undefined);
  __decorate([r_DecorateFunction1.AutoFind("caidan")], _ctor.prototype, "caidan", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lihua")], _ctor.prototype, "lihua", undefined);
  __decorate([r_DecorateFunction1.AutoFind("animWear")], _ctor.prototype, "animWear", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_WeddingUI;