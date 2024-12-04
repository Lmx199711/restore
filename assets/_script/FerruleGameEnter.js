var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FerruleGameEnter = undefined;
var r_UIDef = require("UIDef");
var r_FguiResSystem = require("FguiResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_ResSystem = require("ResSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_FerruleGameUI = require("FerruleGameUI");
var exp_FerruleGameEnter = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.FerruleGame, r_UIDef.UIDef.Res.UI.FerruleGameEnter) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.FerruleGameEnter, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FerruleGameEnter);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.hide, this);
    this.btnStart.onClick(this.onClickStart, this);
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    r_ResSystem.ResSystem.loadBundleRes("game5", "ferruleGame/roleAnim", cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      t.role.node.destroyAllChildren();
      var i = cc.instantiate(o);
      t.role.node.addChild(i);
      t.role.node.getChildByName("anim").getComponent(sp.Skeleton).setAnimation(0, "step_1", true);
    });
    for (var o = 1; o <= 10; o++) {
      r_ResSystem.ResSystem.loadBundleRes("game5", "ferruleGame/clearNode" + o, cc.Prefab, function (e, o) {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      });
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickStart = function () {
    r_PlatformSystem.PlatformSystem.showVideo("套圈玩一次", function () {
      r_FerruleGameUI.FerruleGameUI.showUI();
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnStart")], _ctor.prototype, "btnStart", undefined);
  __decorate([r_DecorateFunction1.AutoFind("role")], _ctor.prototype, "role", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.FerruleGameEnter = exp_FerruleGameEnter;