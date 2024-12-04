var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JumpFishUI = undefined;
var r_UIDef = require("UIDef");
var r_TYIndex = require("TYIndex");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_ResSystem = require("ResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_FguiResSystem = require("FguiResSystem");
var exp_JumpFishUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.JumpFish, r_UIDef.UIDef.Res.UI.JumpFishUI) || this;
    t.uiType = "fullScreen";
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.JumpFishUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.JumpFishUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    _ctor.Inst = this;
    this.btnBack.onClick(this.onClickBack, this);
    this.btnPlay.onClick(this.onClickPlay, this);
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    this.btnPlay.visible = true;
    r_ResSystem.ResSystem.loadBundleRes("game1", "jumpFish/jumpFish", cc.Prefab, function (e, o) {
      if (e) {
        console.error("加载失败", e);
      } else {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
        t.prefab && t.prefab.destroy();
        t.prefab = cc.instantiate(o);
        t.prefab.parent = cc.find("Canvas");
        t.JumpFishCom = t.prefab.getComponent("JumpFishCom");
      }
    });
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    if (this.prefab) {
      this.prefab.destroy();
      this.prefab = null;
    }
  };
  _ctor.prototype.onClickBack = function () {
    this.hide();
  };
  _ctor.prototype.onClickPlay = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("鱼跃龙门", function () {
      e.btnPlay.visible = false;
      e.JumpFishCom.startGame();
    });
  };
  _ctor.prototype.revive = function () {
    this.JumpFishCom.revive();
  };
  _ctor.Inst = null;
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnPlay")], _ctor.prototype, "btnPlay", undefined);
  return _ctor;
}(r_TYIndex.UIWind);
exports.JumpFishUI = exp_JumpFishUI;