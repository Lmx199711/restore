var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_TYIndex = require("TYIndex");
var def_TigerRuleUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Tiger, r_UIDef.UIDef.Res.UI.TigerRuleUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.TigerRuleUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.TigerRuleUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("black").onClick(this.hide, this);
    this.contentPane.getChild("n1").onClick(this.hide, this);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_TigerRuleUI;