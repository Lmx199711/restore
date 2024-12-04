var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_FguiResSystem = require("FguiResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_ResSystem = require("ResSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_EscapeRoomTipUI = require("EscapeRoomTipUI");
var def_EscapeRoomUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.EscapeRoom, r_UIDef.UIDef.Res.UI.EscapeRoomUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.EscapeRoomUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.EscapeRoomUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnTip);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    r_SoundMgr.SoundMgr.playMusic("escapeRoom/BGM_01(1)");
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    this.prefab && this.prefab.destroy();
    this.prefab = null;
    r_SoundMgr.SoundMgr.playMusic("bgm");
    r_EscapeRoomTipUI.default.hide();
  };
  _ctor.prototype.restart = function () {
    var e = this;
    this.btnTip.node.off(cc.Node.EventType.TOUCH_START);
    this.btnTip.node.on(cc.Node.EventType.TOUCH_START, function () {}, this);
    this.BtnClose.node.off(cc.Node.EventType.TOUCH_START);
    this.BtnClose.node.on(cc.Node.EventType.TOUCH_START, function () {}, this);
    this.contentPane.visible = false;
    r_ResSystem.ResSystem.loadBundleRes("wenzi1", "prefab/逃出空房/逃出空房", cc.Prefab, function (t, o) {
      t && e.hide();
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(e, o);
      e.prefab = cc.instantiate(o);
      e.center.node.destroyAllChildren();
      e.center.node.addChild(e.prefab);
      e.contentPane.visible = true;
    });
  };
  _ctor.prototype.onClickbtnTip = function () {
    r_PlatformSystem.PlatformSystem.showVideo("逃离空房提示", function () {
      r_EscapeRoomTipUI.default.showUI();
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnTip")], _ctor.prototype, "btnTip", undefined);
  __decorate([r_DecorateFunction1.AutoFind("BtnClose")], _ctor.prototype, "BtnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("center")], _ctor.prototype, "center", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_EscapeRoomUI;