var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewCardUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PrinterCommon = require("PrinterCommon");
var r_ResSystem = require("ResSystem");
var exp_NewCardUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Printer, r_UIDef.UIDef.Res.UI.NewCardUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.NewCardUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.NewCardUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").onClick(this.hide, this);
    this.contentPane.getChild("btnGet").onClick(this.hide, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    var t = this.data.card;
    r_ResSystem.ResSystem.loadBundleFguiImg(this.contentPane.getChild("icon"), "game3", "printer/girl/" + r_PrinterCommon.PrinterCommon.getBigIcon(t));
    this.contentPane.getChild("qualityIcon").asLoader.url = r_PrinterCommon.PrinterCommon.getQualityIcon(t);
    if (this.data.score > 0) {
      this.contentPane.getChild("scoreText").asTextField.text = "+" + this.data.score;
      this.contentPane.getChild("score").visible = true;
    } else {
      this.contentPane.getChild("score").visible = false;
    }
    this.contentPane.getChild("btnGet").visible = 1 == this.data.btnGet;
    this.contentPane.getChild("btnBack").visible = 1 == this.data.btnGet;
    this.contentPane.clearClick();
    this.data.btnGet || this.contentPane.onClick(this.hide, this);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    if (this.data.closeCallback) {
      this.data.closeCallback();
      this.data.closeCallback = null;
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.NewCardUI = exp_NewCardUI;