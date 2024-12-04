var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_TYIndex = require("TYIndex");
var r_SettingUI = require("SettingUI");
var r_SideGiftUI = require("SideGiftUI");
var r_JobUI = require("JobUI");
var r_MailUI = require("MailUI");
var def_MainAuditUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.MainAudit, r_UIDef.UIDef.Res.UI.MainAuditUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.MainAuditUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MainAuditUI);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    r_TYIndex.UIWind.curMainUI = r_UIDef.UIDef.Res.UI.MainAuditUI;
    this.refreshHead();
    this.refreshGiftBtn();
  };
  _ctor.prototype.onHide = function () {
    _ctor.Inst = null;
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.iconBg = this.contentPane.getChild("iconBg");
    this.iconBg.onClick(function () {
      r_SettingUI.SettingUI.showUI();
    });
    for (var o = 0; o < 7; o++) {
      this.contentPane.getChild("btn" + o).onClick(this.onClickBtn.bind(this, o), this);
    }
    this.btnGift = this.contentPane.getChild("btnGift");
    this.btnGift.onClick(function () {
      r_SideGiftUI.SideGiftUI.showUI();
    }, this);
    _ctor.coinCom = this.contentPane.getChild("coinCom");
  };
  _ctor.prototype.onClickBtn = function (e) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 5:
      case 3:
        r_UtilsSystem.UtilsSystem.showTip("暂未开启");
        break;
      case 0:
        r_JobUI.JobUI.showUI();
        break;
      case 6:
        r_MailUI.MailUI.showUI();
    }
  };
  _ctor.prototype.refreshGiftBtn = function () {
    if (r_PlatformSystem.PlatformSystem.canShowSideGift()) {
      if (r_PlatformSystem.PlatformSystem.islaunchFromSide()) {
        r_SideGiftUI.SideGiftUI.showUI();
        this.btnGift.visible = false;
      } else {
        this.btnGift.visible = true;
      }
    } else {
      this.btnGift.visible = false;
    }
  };
  _ctor.hideGiftBtn = function () {
    _ctor.Inst && (_ctor.Inst.btnGift.visible = false);
  };
  _ctor.prototype.refreshHead = function () {
    r_ResSystem.ResSystem.loadHeadImg(this.iconBg.getChild("icon"), r_PlayerData.PlayerData.data.curHead);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_MainAuditUI;