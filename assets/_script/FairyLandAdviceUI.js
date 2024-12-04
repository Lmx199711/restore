var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FairyLandAdviceUI = undefined;
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseLayer = require("BaseLayer");
var exp_FairyLandAdviceUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.FairyLand, r_UIDef.UIDef.Res.UI.FairyLandHelpUI) || this;
    t.showAnimFlag = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.FairyLandHelpUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FairyLandHelpUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnAc.onClick(this.clickAc.bind(this));
    this.btnNo.onClick(this.clickNo.bind(this));
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
  };
  _ctor.prototype.clickNo = function () {
    if (this.data && this.data.closeCallback) {
      this.data.closeCallback();
      this.hide();
    }
  };
  _ctor.prototype.clickAc = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("请锻造大师帮助", function () {
      if (e.data && e.data.videoCallback) {
        e.data.videoCallback();
        e.hide();
      }
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnNo")], _ctor.prototype, "btnNo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAc")], _ctor.prototype, "btnAc", undefined);
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.FairyLandAdviceUI = exp_FairyLandAdviceUI;