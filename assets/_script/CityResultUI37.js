var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_ChatSystem = require("ChatSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_RelaxSystem = require("RelaxSystem");
var r_ReportSystem = require("ReportSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_ChatDetailUI = require("ChatDetailUI");
var def_CityResultUI37 = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.City85, r_UIDef.UIDef.Res.UI.CityResultUI37) || this;
    t.showAnimFlag = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.CityResultUI37, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.CityResultUI37);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnBuy, this.btnVideo);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {};
  _ctor.prototype.onClickbtnBuy = function () {
    r_PlayerData.PlayerData.addCoin("拯救GG男神", 1e6, r_ReportSystem.SystemKey.任务大厅);
    this.hide();
    r_RelaxSystem.RelaxSystem.clearLevel();
  };
  _ctor.prototype.onClickbtnVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("兑换猪猪侠内裤", function () {
      e.hide();
      r_RelaxSystem.RelaxSystem.clearLevel37();
      r_ChatDetailUI.ChatDetailUI.showUI({
        taskId: r_ChatSystem.ChatSystem.ggBondTaskId
      });
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBuy")], _ctor.prototype, "btnBuy", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnVideo")], _ctor.prototype, "btnVideo", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_CityResultUI37;