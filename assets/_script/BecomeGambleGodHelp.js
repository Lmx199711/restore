var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BecomeGambleGodHelp = undefined;
var r_UIDef = require("UIDef");
var r_BaseWin = require("BaseWin");
var r_DecorateFunction1 = require("DecorateFunction1");
var exp_BecomeGambleGodHelp = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.BecomeGambleGod, r_UIDef.UIDef.Res.UI.BecomeGambleGodHelp) || this;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.BecomeGambleGodHelp, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BecomeGambleGodHelp);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnClose.onClick(this.onClickClose, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.clickLayer.node.off(cc.Node.EventType.TOUCH_START);
    this.clickLayer.node.on(cc.Node.EventType.TOUCH_START, function () {}, this);
    this.contentPane.getController("c1").selectedIndex = this.data.mode;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickClose = function () {
    this.hide();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("clickLayer")], _ctor.prototype, "clickLayer", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.BecomeGambleGodHelp = exp_BecomeGambleGodHelp;