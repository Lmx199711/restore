var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatResultUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_TimeSystem = require("TimeSystem");
var exp_ChatResultUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Chat, r_UIDef.UIDef.Res.UI.ChatResultUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.ChatResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ChatResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnHot = this.contentPane.getChild("btnHot").asButton;
    this.btnHot.onClick(this.onClickHot, this);
    this.btnHot.startX = this.btnHot.x;
    this.btnOk = this.contentPane.getChild("btnOk").asButton;
    this.btnOk.onClick(this.onClickOk, this);
    this.btnOk.startX = this.btnOk.x;
    this.contentPane.getChild("btnRevive").asButton.onClick(this.onClickRevive, this);
    this.contentPane.getChild("btnRestart").asButton.onClick(this.onClickRestart, this);
    this.contentPane.getChild("tip").visible = false;
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    if (this.data.isWin) {
      this.contentPane.getController("mode").selectedIndex = 1;
      if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
        this.btnHot.visible = false;
        this.btnOk.visible = false;
        this.btnOk.x = (this.btnOk.startX + this.btnHot.startX) / 2;
        r_PlatformSystem.PlatformSystem.stopRecorder(function (e) {
          t.btnOk.visible = true;
          if (r_PlatformSystem.PlatformSystem.hasShareVideo() && e) {
            t.btnHot.visible = true;
            t.btnOk.x = t.btnOk.startX;
          } else {
            t.btnHot.visible = false;
            t.btnOk.x = (t.btnOk.startX + t.btnHot.startX) / 2;
          }
          t.btnHot.visible = !!e;
        });
        r_TimeSystem.TimeSystem.scheduleOnce("resultOk", .5, function () {
          t.btnOk.visible = true;
        });
      } else {
        this.btnHot.visible = false;
        this.btnOk.visible = true;
        this.btnOk.x = (this.btnOk.startX + this.btnHot.startX) / 2;
      }
    } else {
      this.contentPane.getController("mode").selectedIndex = 0;
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickHot = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.shareAppVideoMessage(function () {
      e.hide();
      e.data.callBack && e.data.callBack("hot");
    }, function () {});
  };
  _ctor.prototype.onClickOk = function () {
    this.hide();
    this.data.callBack && this.data.callBack("ok");
  };
  _ctor.prototype.onClickRevive = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("聊天复活", function () {
      e.hide();
      e.data.callBack && e.data.callBack("revive");
    });
  };
  _ctor.prototype.onClickRestart = function () {
    this.hide();
    this.data.callBack && this.data.callBack("restart");
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.ChatResultUI = exp_ChatResultUI;