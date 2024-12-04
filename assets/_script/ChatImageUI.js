var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatImageUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var exp_ChatImageUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Chat, r_UIDef.UIDef.Res.UI.ChatImageUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.ChatImageUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ChatImageUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("touchArea").asButton.onClick(this.hide, this);
    this.iconUI = this.contentPane.getChild("icon");
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.iconUI.texture = this.data;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.ChatImageUI = exp_ChatImageUI;