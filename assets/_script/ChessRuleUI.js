var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChessRuleUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var exp_ChessRuleUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.ChineseChess, r_UIDef.UIDef.Res.UI.ChessRuleUI) || this;
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
    this.show(r_UIDef.UIDef.Urls.UI.ChessRuleUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ChessRuleUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack = this.contentPane.getChild("btnBack").asButton;
    this.btnBack.onClick(this.onClickBack, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
  };
  _ctor.prototype.onUpdate = function () {
    e.prototype.onUpdate.call(this);
  };
  _ctor.prototype.onClickBack = function () {
    this.hide();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.ChessRuleUI = exp_ChessRuleUI;