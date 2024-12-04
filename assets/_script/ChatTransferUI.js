var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatTransferUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var exp_ChatTransferUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Chat, r_UIDef.UIDef.Res.UI.ChatTransferUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.ChatTransferUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ChatTransferUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.ChatTransferUI = exp_ChatTransferUI;