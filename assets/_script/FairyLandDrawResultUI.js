var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FairyLandDrawResultUI = undefined;
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_WeaponSystem = require("WeaponSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var exp_FairyLandDrawResultUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.FairyLandDraw, r_UIDef.UIDef.Res.UI.FairyLandDrawResultUI) || this;
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
    this.show(r_UIDef.UIDef.Urls.UI.FairyLandDrawResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FairyLandDrawResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.touch.onClick(this.onClickHide, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    cc.Tween.stopAllByTarget(this.contentPane.getChild("guang").node);
    cc.tween(this.contentPane.getChild("guang").node).by(2, {
      angle: 360
    }).repeatForever().start();
    var t = r_WeaponSystem.WeaponSystem.GetRecipeInfo(this.data.id);
    this.lbName.text = t.name;
    r_ResSystem.ResSystem.loadBundleFguiImg(this.iconLoader, "bdWeaponForge", "mat/big/" + t.name);
    this.contentPane.getController("type").selectedIndex = t.type;
    r_WeaponSystem.WeaponSystem.setDrawed(this.data.id);
  };
  _ctor.prototype.onClickHide = function () {
    this.hide();
    this.data.callBack && this.data.callBack();
  };
  __decorate([r_DecorateFunction1.AutoFind("touch")], _ctor.prototype, "touch", undefined);
  __decorate([r_DecorateFunction1.AutoFind("iconLoader")], _ctor.prototype, "iconLoader", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbName")], _ctor.prototype, "lbName", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.FairyLandDrawResultUI = exp_FairyLandDrawResultUI;