var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardGroupFinishUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_SellCardGroupUI = require("SellCardGroupUI");
var r_PrinterCfg = require("PrinterCfg");
var r_UtilsSystem = require("UtilsSystem");
var r_RoleSystem = require("RoleSystem");
var r_ReportSystem = require("ReportSystem");
var exp_CardGroupFinishUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Printer, r_UIDef.UIDef.Res.UI.CardGroupFinishUI) || this;
    t.reward = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.CardGroupFinishUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.CardGroupFinishUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").onClick(this.hide, this);
    this.contentPane.getChild("btnOK").onClick(function () {
      t.hide();
    }, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.reward = r_PrinterCfg.CardGroupReward.finish;
    this.contentPane.getChild("reward").asTextField.text = "+" + r_UtilsSystem.UtilsSystem.getShowCoin(this.reward);
    this.contentPane.getChild("cardType").asTextField.setVar("type", r_PrinterCfg.CardType[this.data.type]).flushVars();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_PlayerData.PlayerData.addCoin(r_RoleSystem.ExpType.其它, this.reward, r_ReportSystem.SystemKey.武器系统);
    r_SellCardGroupUI.SellCardGroupUI.showUI({
      type: this.data.type,
      closeCallback: this.data.closeCallback
    });
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.CardGroupFinishUI = exp_CardGroupFinishUI;