var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetBuyVitalityUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PetData = require("PetData");
var r_PetCfg = require("PetCfg");
var exp_PetBuyVitalityUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Pet, r_UIDef.UIDef.Res.UI.PetBuyVitalityUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PetBuyVitalityUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PetBuyVitalityUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").onClick(function () {
      t.hide();
    }, this);
    this.contentPane.getChild("btnNO").onClick(function () {
      t.hide();
    }, this);
    this.contentPane.getChild("btnBuy").onClick(function () {
      r_PlatformSystem.PlatformSystem.showVideo("购买体力", function () {
        r_PetData.PetData.addVitality(r_PetCfg.PetGameCfg.vitalityMax);
      });
    }, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.bringToFront();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.PetBuyVitalityUI = exp_PetBuyVitalityUI;