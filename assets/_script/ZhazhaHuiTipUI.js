var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ZhazhaHuiCfg = require("ZhazhaHuiCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_ZhazhaHuiUI = require("ZhazhaHuiUI");
var def_ZhazhaHuiTipUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.ZhazhaHui, r_UIDef.UIDef.Res.UI.ZhazhaHuiTipUI) || this;
    t.showAnimFlag = false;
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.ZhazhaHuiTipUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ZhazhaHuiTipUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnOpen, this.btnBack, this.btnRestart, this.btnOk, this.btnDouble);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ref__ctor.Inst = null;
  };
  _ctor.prototype.restart = function () {
    this.contentPane.getController("c1").selectedIndex = this.data.index;
  };
  _ctor.prototype.onClickbtnOpen = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("传奇打开宝箱", function () {
      e.data.openChest && e.data.openChest();
      e.hide();
    });
  };
  _ctor.prototype.onClickbtnBack = function () {
    this.hide();
    r_ZhazhaHuiUI.default.hide();
  };
  _ctor.prototype.onClickbtnRestart = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("传奇重开", function () {
      e.hide();
      r_ZhazhaHuiUI.default.Inst && r_ZhazhaHuiUI.default.Inst.restart();
    });
  };
  _ctor.prototype.onClickbtnOk = function () {
    r_PlayerData.PlayerData.addCoin("传奇奖励", r_ZhazhaHuiCfg.ZhazhaHuiPrice, r_ReportSystem.SystemKey.小游戏);
    this.hide();
    r_ZhazhaHuiUI.default.hide();
  };
  _ctor.prototype.onClickbtnDouble = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("传奇奖励", function () {
      r_PlayerData.PlayerData.addCoin("传奇奖励", 2 * r_ZhazhaHuiCfg.ZhazhaHuiPrice, r_ReportSystem.SystemKey.小游戏);
      e.hide();
      r_ZhazhaHuiUI.default.hide();
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnOpen")], _ctor.prototype, "btnOpen", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnRestart")], _ctor.prototype, "btnRestart", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOk")], _ctor.prototype, "btnOk", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDouble")], _ctor.prototype, "btnDouble", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_ZhazhaHuiTipUI;