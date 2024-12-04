var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_SecretUpSystem = require("SecretUpSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_SecretUpUI = require("SecretUpUI");
var def_SecretUpDebugUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.SecretUp, r_UIDef.UIDef.Res.UI.SecretUpDebugUI) || this;
    t.showAnimFlag = false;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SecretUpDebugUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SecretUpDebugUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btn0, this.btn1, this.btn2);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {};
  _ctor.prototype.onClickbtn0 = function () {
    r_PlayerData.PlayerData.addStone(1e3);
    r_SecretUpUI.SecretUpUI.Inst && r_SecretUpUI.SecretUpUI.Inst.restart();
  };
  _ctor.prototype.onClickbtn1 = function () {
    r_SecretUpSystem.SecretUpSystem.debugAddAllSecret();
  };
  _ctor.prototype.onClickbtn2 = function () {
    r_SecretUpSystem.SecretUpSystem.debugAllMaxLevel();
  };
  __decorate([r_DecorateFunction1.AutoFind("btn0")], _ctor.prototype, "btn0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btn1")], _ctor.prototype, "btn1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btn2")], _ctor.prototype, "btn2", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_SecretUpDebugUI;