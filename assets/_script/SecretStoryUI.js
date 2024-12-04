var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecretStoryUI = undefined;
var r_UIDef = require("UIDef");
var r_SecretSystem = require("SecretSystem");
var r_TYIndex = require("TYIndex");
var exp_SecretStoryUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Secret, r_UIDef.UIDef.Res.UI.SecretStoryUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SecretStoryUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SecretStoryUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.content = this.contentPane.getChild("content");
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    if (this.data) {
      var t = r_SecretSystem.SecretSystem.getSecretCfgById(this.data.id);
      this.content.text = t.story;
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.SecretStoryUI = exp_SecretStoryUI;