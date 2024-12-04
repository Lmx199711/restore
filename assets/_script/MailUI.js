var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_MailRewardUI = require("MailRewardUI");
var r_PlatformSystem = require("PlatformSystem");
var r_MailBookUI = require("MailBookUI");
var r_MailSystem = require("MailSystem");
var r_MailCompUI = require("MailCompUI");
var r_ReportSystem = require("ReportSystem");
var exp_MailUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Mail, r_UIDef.UIDef.Res.UI.MailUI) || this;
    t.uiType = "fullScreen";
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.MailUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MailUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.btnOne = this.contentPane.getChild("btnOne").asButton;
    this.btnOne.onClick(this.onClickOne, this);
    this.btnVideo = this.contentPane.getChild("btnVideo").asButton;
    this.btnVideo.onClick(this.onClickVideo, this);
    this.btnBook = this.contentPane.getChild("btnBook").asButton;
    this.btnBook.onClick(this.onClickBook, this);
    this.btnMail = this.contentPane.getChild("btnMail").asButton;
    this.contentPane.getChild("btnComp").asButton.onClick(function () {
      r_MailCompUI.MailCompUI.showUI();
    });
    _ctor.Inst = this;
    r_MailSystem.MailSystem.checkInit();
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.refreshLucky();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.setBtnsVisible = function (e) {
    this.btnOne.visible = e;
    this.btnVideo.visible = e;
    this.btnMail.visible = e;
  };
  _ctor.prototype.onClickOne = function () {
    if (r_PlayerData.PlayerData.isCoinEnough(_ctor.coinOne)) {
      r_PlayerData.PlayerData.deleteCoin("邮箱抽奖", _ctor.coinOne, r_ReportSystem.SystemKey.None);
      r_MailRewardUI.MailRewardUI.showUI({
        num: 1
      });
    } else {
      r_UtilsSystem.UtilsSystem.showTip("金币不足");
    }
  };
  _ctor.prototype.onClickFive = function () {
    if (r_PlayerData.PlayerData.isCoinEnough(_ctor.coinFive)) {
      r_PlayerData.PlayerData.deleteCoin("邮箱抽奖", _ctor.coinFive, r_ReportSystem.SystemKey.None);
      r_MailRewardUI.MailRewardUI.showUI({
        num: 5
      });
    } else {
      r_UtilsSystem.UtilsSystem.showTip("金币不足");
    }
  };
  _ctor.prototype.onClickVideo = function () {
    r_PlatformSystem.PlatformSystem.showVideo("邮箱抽奖", function () {
      r_MailRewardUI.MailRewardUI.showUI({
        num: 5,
        isVideo: true
      });
    });
  };
  _ctor.prototype.onClickBook = function () {
    r_MailBookUI.MailBookUI.showUI();
  };
  _ctor.prototype.refreshLucky = function () {
    this.contentPane.getChild("lucky").text = r_PlayerData.PlayerData.data.mailData.curLucky + "";
  };
  _ctor.coinOne = 1e5;
  _ctor.coinFive = 5e5;
  _ctor.Inst = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.MailUI = exp_MailUI;