var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WpRecWayUI = undefined;
var r_UIDef = require("UIDef");
var r_WeaponSystem = require("WeaponSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var exp_WpRecWayUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.FairyLandShop, r_UIDef.UIDef.Res.UI.WpRecWay) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.WpRecWayUI, e, t);
  };
  _ctor.prototype.onShown = function () {
    this.refreshAll();
  };
  _ctor.prototype.refreshAll = function () {
    var e = r_WeaponSystem.WeaponSystem.GetWeaponForgeInfo(this.data.id);
    for (var t = 0; t < e.res.length; t++) {
      var o = r_WeaponSystem.WeaponSystem.GetRecipeInfo(e.res[t]);
      o && (this.contentPane.getChild("txt" + t).text = o.name + ":" + (o.way || "未知"));
    }
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.WpRecWayUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnClose.onClick(function () {
      return t.hide();
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.WpRecWayUI = exp_WpRecWayUI;