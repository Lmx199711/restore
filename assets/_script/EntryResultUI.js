var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_EntryChooseUI = require("EntryChooseUI");
var def_EntryResultUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Entry, r_UIDef.UIDef.Res.UI.EntryResultUI) || this;
    t.showAnimFlag = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.EntryResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.EntryResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnNo.onClick(this.hide, this);
    this.btnRestart.onClick(this.hide, this);
    this.bindBtnCallback(this.btnRun, this.btnRecruit);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_EntryChooseUI.default.instance && r_EntryChooseUI.default.hide();
  };
  _ctor.prototype.restart = function () {
    this.contentPane.getController("c1").selectedIndex = this.data;
  };
  _ctor.prototype.onClickbtnRun = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("收下保安彩礼", function () {
      r_PlayerData.PlayerData.addCoin("收下保安彩礼", 1e7, r_ReportSystem.SystemKey.打保安);
      e.hide();
    });
  };
  _ctor.prototype.onClickbtnRecruit = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("收保安做义子", function () {
      r_PlayerData.PlayerData.addCoin("收保安做义子", 1e9, r_ReportSystem.SystemKey.打保安, false);
      r_UtilsSystem.UtilsSystem.showTip("招收成功，获得奖励10亿元");
      e.hide();
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnRestart")], _ctor.prototype, "btnRestart", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnRun")], _ctor.prototype, "btnRun", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnNo")], _ctor.prototype, "btnNo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnRecruit")], _ctor.prototype, "btnRecruit", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_EntryResultUI;