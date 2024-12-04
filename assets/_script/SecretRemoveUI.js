var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecretRemoveUI = undefined;
var r_UIDef = require("UIDef");
var r_TYIndex = require("TYIndex");
var exp_SecretRemoveUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Secret, r_UIDef.UIDef.Res.UI.SecretRemoveUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SecretRemoveUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SecretRemoveUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.contentPane.getChild("btnOk").asButton.onClick(this.onClickOk, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickOk = function () {
    this.hide();
    this.data.callBack && this.data.callBack();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.SecretRemoveUI = exp_SecretRemoveUI;