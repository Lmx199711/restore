var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_FguiResSystem = require("FguiResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_TakeTrashSystem = require("TakeTrashSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_Index = require("Index");
var r_EraseCom = require("EraseCom");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_TakeTrashCom = require("TakeTrashCom");
var r_TakeTrashDebug = require("TakeTrashDebug");
var def_TakeTrashUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.TakeTrash, r_UIDef.UIDef.Res.UI.TakeTrashUI) || this;
    t.showAnimFlag = false;
    t.uiType = "fullScreen";
    t.isDebug = false;
    t.m_trashData = [];
    t.m_index = 0;
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
    this.show(r_UIDef.UIDef.Urls.UI.TakeTrashUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.TakeTrashUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnOpen0, this.btnOpen1, this.btnOpen2, this.btnAgain, this.btnDebug0, this.btnDebug1, this.btnDebug2);
    this.contentPane.visible = false;
    r_ResSystem.ResSystem.loadBundleRes("game3", "takeTrash/takeTrashMap", cc.Prefab, function (e, o) {
      if (!e) {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
        t.contentPane.visible = true;
        var i = cc.instantiate(o);
        t.imgMask.node.addChild(i);
        t.takeTrashCom = i.getComponent(r_TakeTrashCom.default);
        t.eraseCom = i.getComponent(r_EraseCom.default);
        t.eraseCom.cleanSuccessCallBack = t.cleanSuccess.bind(t);
        t.eraseCom.cleanAllSuccessCallBack = t.cleanAllSuccess.bind(t);
      }
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.instance = this;
    r_TimeSystem.TimeSystem.schedule("updateTimeTake", 1, this.onUpdateTime.bind(this));
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.instance = null;
    r_TimeSystem.TimeSystem.scheduleClear("updateTimeTake");
    r_TimeSystem.TimeSystem.scheduleClear("startGmae");
    this.takeTrashCom.destruct();
    r_SoundMgr.SoundMgr.stopAllSound();
  };
  _ctor.prototype.setAgain = function () {
    this.btnAgain.visible = true;
  };
  _ctor.prototype.onClickbtnAgain = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("再来一次倒垃圾", function () {
      e.btnAgain.visible = false;
      e.randTrash(e.m_index);
    });
  };
  _ctor.prototype.restart = function () {
    this.refreshBtn();
    this.contentPane.getController("c1").selectedIndex = 0;
    this.m_trashData = [];
    this.anim.visible = false;
    this.btnAgain.visible = false;
  };
  _ctor.prototype.onClickbtnOpen0 = function () {
    this.take(0);
  };
  _ctor.prototype.onClickbtnOpen1 = function () {
    this.take(1);
  };
  _ctor.prototype.onClickbtnOpen2 = function () {
    this.take(2);
  };
  _ctor.prototype.take = function (e) {
    var t = this;
    this.isDebug && (e = 3);
    this.m_index = e;
    if (r_TakeTrashSystem.TakeTrashSystem.getBtnState(e)) {
      r_PlatformSystem.PlatformSystem.showVideo("开始倒垃圾" + e, function () {
        t.randTrash(e);
      });
    } else {
      r_PlayerData.PlayerData.data["trashTime" + e] = r_TimeSystem.TimeSystem.getServerTime() + r_TakeTrashSystem.TakeTrashSystem.getTakeTrashCfg(e).time;
      this.refreshBtn();
      this.randTrash(e);
    }
  };
  _ctor.prototype.randTrash = function (e) {
    this.m_trashData = r_TakeTrashSystem.TakeTrashSystem.getTakeTrashList(e);
    cc.log("m_trashData: ", this.m_trashData);
    this.takeTrashCom.clearCom();
    this.takeTrashCom.createCom(this.m_trashData);
  };
  _ctor.prototype.startGame = function () {
    var e = this;
    this.eraseCom.node.active = false;
    this.contentPane.getController("c1").selectedIndex = 1;
    r_UtilsSystem.UtilsSystem.playAnim(this.anim, "step_" + (this.m_index + 1 > 3 ? 3 : this.m_index + 1), false);
    r_SoundMgr.SoundMgr.playSound("takeTrash/daolaji");
    r_TimeSystem.TimeSystem.scheduleOnce("startGmae", 2, function () {
      e.anim.visible = false;
      e.eraseCom.node.active = true;
      e.eraseCom.startClean();
    });
  };
  _ctor.prototype.cleanSuccess = function (e) {
    this.takeTrashCom.cleanSuccess(e);
  };
  _ctor.prototype.cleanAllSuccess = function () {};
  _ctor.prototype.onUpdateTime = function () {
    this.refreshBtn();
  };
  _ctor.prototype.refreshBtn = function () {
    this.btnOpen0.getController("c1").selectedIndex = r_TakeTrashSystem.TakeTrashSystem.getBtnState(0);
    this.btnOpen1.getController("c1").selectedIndex = r_TakeTrashSystem.TakeTrashSystem.getBtnState(1);
    this.btnOpen0.title = r_TakeTrashSystem.TakeTrashSystem.getTakeTime(0);
    this.btnOpen1.title = r_TakeTrashSystem.TakeTrashSystem.getTakeTime(1);
  };
  _ctor.prototype.onClickbtnDebug0 = function () {
    this.openDebug();
  };
  _ctor.prototype.onClickbtnDebug1 = function () {
    this.openDebug();
  };
  _ctor.prototype.onClickbtnDebug2 = function () {
    this.openDebug();
  };
  _ctor.prototype.openDebug = function () {
    r_Index.Platform.isDarenPlatform() && r_TakeTrashDebug.default.showUI();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnOpen0")], _ctor.prototype, "btnOpen0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOpen1")], _ctor.prototype, "btnOpen1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOpen2")], _ctor.prototype, "btnOpen2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("imgMask")], _ctor.prototype, "imgMask", undefined);
  __decorate([r_DecorateFunction1.AutoFind("anim")], _ctor.prototype, "anim", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAgain")], _ctor.prototype, "btnAgain", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDebug0")], _ctor.prototype, "btnDebug0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDebug1")], _ctor.prototype, "btnDebug1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDebug2")], _ctor.prototype, "btnDebug2", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_TakeTrashUI;