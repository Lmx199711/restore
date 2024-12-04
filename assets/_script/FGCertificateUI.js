var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FGCertificateUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var exp_FGCertificateUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.FlirtingGirl, r_UIDef.UIDef.Res.UI.FGCertificateUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.FGCertificateUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FGCertificateUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnClose = this.contentPane.getChild("btnClose");
    this.btnClose.onClick(this.hide, this);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.FGCertificateUI = exp_FGCertificateUI;