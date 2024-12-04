var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_HamUI = require("HamUI");
var def_HamResultUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Ham, r_UIDef.UIDef.Res.UI.HamResultUI) || this;
    t.showAnimFlag = true;
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
    this.show(r_UIDef.UIDef.Urls.UI.HamResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.HamResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnOk, this.btnRestart);
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
  _ctor.prototype.onClickbtnOk = function () {
    if (1 == this.data.index) {
      r_PlayerData.PlayerData.addCoin("烤肠奖励", 2e6, r_ReportSystem.SystemKey.小游戏);
      this.hide();
      r_HamUI.default.hide();
    } else {
      this.hide();
      r_HamUI.default.hide();
    }
  };
  _ctor.prototype.onClickbtnRestart = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("重玩烤肠", function () {
      e.hide();
      r_HamUI.default.Inst && r_HamUI.default.Inst.restart();
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnOk")], _ctor.prototype, "btnOk", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnRestart")], _ctor.prototype, "btnRestart", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_HamResultUI;