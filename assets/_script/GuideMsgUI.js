var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuideMsgUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_ChatDetailUI = require("ChatDetailUI");
var exp_GuideMsgUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Guide, r_UIDef.UIDef.Res.UI.GuideMsgUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.GuideMsgUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.GuideMsgUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnGo").asButton.onClick(this.onClickGo, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickGo = function () {
    this.hide();
    r_ChatDetailUI.ChatDetailUI.showUI({
      taskId: 1
    });
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.GuideMsgUI = exp_GuideMsgUI;