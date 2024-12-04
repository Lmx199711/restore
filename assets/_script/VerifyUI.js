var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VerifyUI = undefined;
var r_UIDef = require("UIDef");
var r_UtilsSystem = require("UtilsSystem");
var r_Config = require("Config");
var r_BaseWin = require("BaseWin");
var r_DecorateFunction1 = require("DecorateFunction1");
var exp_VerifyUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Verify, r_UIDef.UIDef.Res.UI.VerifyUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.VerifyUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.VerifyUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnOk.onClick(this.onClickOk, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
  };
  _ctor.prototype.onClickOk = function () {
    if ("" != this.input.text) {
      if (this.input.text == r_Config.default.verifyCode) {
        this.hide();
        this.data();
      } else {
        r_UtilsSystem.UtilsSystem.showTip("验证码错误");
      }
    } else {
      r_UtilsSystem.UtilsSystem.showTip("请输入验证码");
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("input")], _ctor.prototype, "input", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOk")], _ctor.prototype, "btnOk", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.VerifyUI = exp_VerifyUI;