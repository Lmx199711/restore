var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailTipUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_UtilsSystem = require("UtilsSystem");
var r_PlayerData = require("PlayerData");
var r_MailSystem = require("MailSystem");
var r_MailBookUI = require("MailBookUI");
var r_ReportSystem = require("ReportSystem");
var exp_MailTipUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Mail, r_UIDef.UIDef.Res.UI.MailTipUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.MailTipUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MailTipUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.contentPane.getChild("btnOk").asButton.onClick(this.onClickSell, this);
    this.contentPane.getChild("btnOk2").asButton.onClick(this.hide, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.contentPane.getController("mode").selectedIndex = 0;
    this.contentPane.getChild("content").text = "整套[color=#DA694B]“" + this.data.groupCfg.name + "”[/color]邮册？";
    this.contentPane.getChild("content2").text = "整本的[color=#DA694B]“" + this.data.groupCfg.name + "”[/color]邮册在市场追捧!你卖出了巨额天价!";
    this.contentPane.getChild("coin").text = "+" + r_UtilsSystem.UtilsSystem.getShowCoin(this.data.groupCfg.coin);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickSell = function () {
    r_PlayerData.PlayerData.addCoin("卖整套邮票", this.data.groupCfg.coin, r_ReportSystem.SystemKey.None);
    r_MailSystem.MailSystem.removeGroup(this.data.groupCfg.id);
    this.contentPane.getController("mode").selectedIndex = 1;
    r_MailBookUI.MailBookUI.Inst.refreshInfo();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.MailTipUI = exp_MailTipUI;