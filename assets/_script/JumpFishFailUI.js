var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JumpFishFailUI = undefined;
var r_UIDef = require("UIDef");
var r_TYIndex = require("TYIndex");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_PlatformSystem = require("PlatformSystem");
var r_JumpFishUI = require("JumpFishUI");
var exp_JumpFishFailUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.JumpFish, r_UIDef.UIDef.Res.UI.JumpFishFailUI) || this;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.JumpFishFailUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.JumpFishFailUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnNo.onClick(this.onClickNo, this);
    this.btnVideo.onClick(this.onClickVideo, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickNo = function () {
    this.hide();
    r_JumpFishUI.JumpFishUI.hide();
  };
  _ctor.prototype.onClickVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("鱼跃龙门复活", function () {
      r_JumpFishUI.JumpFishUI.Inst.revive();
      e.hide();
    });
  };
  _ctor.Inst = null;
  __decorate([r_DecorateFunction1.AutoFind("btnNo")], _ctor.prototype, "btnNo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  return _ctor;
}(r_TYIndex.UIWind);
exports.JumpFishFailUI = exp_JumpFishFailUI;