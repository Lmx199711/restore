var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrintHelpUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var exp_PrintHelpUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Printer, r_UIDef.UIDef.Res.UI.PrintHelpUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PrintHelpUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PrintHelpUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnOK").onClick(this.hide, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.PrintHelpUI = exp_PrintHelpUI;