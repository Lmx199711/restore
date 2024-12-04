var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_FlayBtnSystem = require("FlayBtnSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_RoleSystem = require("RoleSystem");
var r_TaskSystem = require("TaskSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_TaskCfg = require("TaskCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var def_FlyGodUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.FlyGod, r_UIDef.UIDef.Res.UI.FlyGodUI) || this;
    t.showAnimFlag = true;
    t.m_coin = "0";
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.FlyGodUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FlyGodUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnBack, this.btnVideo, this.btnClose1);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {
    var e = r_RoleSystem.RoleSystem.getCurTouchInfo();
    this.m_coin = e.flyCoin;
    this.labAward.text = r_UtilsSystem.UtilsSystem.getShowCoin(e.flyCoin);
  };
  _ctor.prototype.onClickbtnClose1 = function () {
    this.setClose();
  };
  _ctor.prototype.onClickbtnBack = function () {
    this.setClose();
  };
  _ctor.prototype.onClickbtnVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("领取财神到", function () {
      r_PlayerData.PlayerData.data.flyGodNum++;
      r_TaskSystem.TaskSystem.addDayTaskValue(r_TaskCfg.TaskDayType.领取财神爷);
      r_PlayerData.PlayerData.addCoin("领取财神到", e.m_coin, r_ReportSystem.SystemKey.财神到);
      r_FlayBtnSystem.FlayBtnSystem.btnStop();
      e.hide();
    });
  };
  _ctor.prototype.setClose = function () {
    this.hide();
    r_FlayBtnSystem.FlayBtnSystem.btnGoon();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnClose1")], _ctor.prototype, "btnClose1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labAward")], _ctor.prototype, "labAward", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_FlyGodUI;