var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FundBuyUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var exp_FundBuyUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Stock, r_UIDef.UIDef.Res.UI.FundBuyUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.FundBuyUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FundBuyUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.contentPane.getChild("btnAll").asButton.onClick(this.onClickAll, this);
    this.contentPane.getChild("btnMy").asButton.onClick(this.onClickMy, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    this.contentPane.getController("mode").selectedIndex = 0;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
  };
  _ctor.prototype.onClickAll = function () {
    this.contentPane.getController("mode").selectedIndex = 0;
  };
  _ctor.prototype.onClickMy = function () {
    this.contentPane.getController("mode").selectedIndex = 1;
  };
  _ctor.Inst = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.FundBuyUI = exp_FundBuyUI;