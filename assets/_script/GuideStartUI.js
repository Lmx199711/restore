var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuideStartUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var exp_GuideStartUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Guide, r_UIDef.UIDef.Res.UI.GuideStartUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.GuideStartUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.GuideStartUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnStart").asButton.onClick(this.hide, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.GuideStartUI = exp_GuideStartUI;