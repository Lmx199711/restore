var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HelpUI = undefined;
var r_UIDef = require("UIDef");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var exp_HelpUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Farm, r_UIDef.UIDef.Res.UI.HelpUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.HelpUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.HelpUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnClose.onClick(function () {
      t.hide();
    }, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
  };
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.HelpUI = exp_HelpUI;