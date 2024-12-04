var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var def_BattleDebugUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Battle, r_UIDef.UIDef.Res.UI.BattleDebugUI) || this;
    t.showAnimFlag = false;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return false;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.BattleDebugUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BattleDebugUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btn0.onClick(this.onClickBtn.bind(this, 0), this);
    this.btn1.onClick(this.onClickBtn.bind(this, 1), this);
    this.btn2.onClick(this.onClickBtn.bind(this, 2), this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {};
  _ctor.prototype.onClickBtn = function (e) {
    if (/^\+?[1-9][0-9]*$/.test(this.putCoin.text)) {
      this.data.ui && this.data.ui.setDebugNum(parseInt(this.putCoin.text), e);
      this.hide();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("输入有误");
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("btn0")], _ctor.prototype, "btn0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btn1")], _ctor.prototype, "btn1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btn2")], _ctor.prototype, "btn2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("putCoin")], _ctor.prototype, "putCoin", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_BattleDebugUI;