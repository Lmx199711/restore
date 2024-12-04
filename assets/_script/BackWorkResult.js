var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackWorkResult = undefined;
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_PlayerData = require("PlayerData");
var r_BaseWin = require("BaseWin");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BackWorkUI = require("BackWorkUI");
var exp_BackWorkResult = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Lamp, r_UIDef.UIDef.Res.UI.BackWorkResult) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.BackWorkResult, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BackWorkResult);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.onClickClose, this);
    this.btnAgain.onClick(this.onClickAgain, this);
    this.btnGet.onClick(this.onClickGet, this);
    this.btnDouble.onClick(this.onClickDouble, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.clickLayer.node.off(cc.Node.EventType.TOUCH_START);
    this.clickLayer.node.on(cc.Node.EventType.TOUCH_START, function () {}, this);
    if (this.data && this.data.mode) {
      this.contentPane.getController("c1").selectedIndex = 1;
    } else {
      this.contentPane.getController("c1").selectedIndex = 0;
    }
    this.lbMoney.text = "x" + r_UtilsSystem.UtilsSystem.numFormats(2e6);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickClose = function () {
    this.hide();
    r_BackWorkUI.BackWorkUI.hide();
  };
  _ctor.prototype.onClickAgain = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("春节返工重新挑战", function () {
      r_BackWorkUI.BackWorkUI.Inst && r_BackWorkUI.BackWorkUI.Inst.againStartGame();
      e.hide();
    });
  };
  _ctor.prototype.onClickGet = function () {
    r_PlayerData.PlayerData.addCoin("春节返工", 2e6);
    r_SoundMgr.SoundMgr.playSound("huodejinbi");
    this.onClickClose();
  };
  _ctor.prototype.onClickDouble = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("春节返工双倍领取", function () {
      r_PlayerData.PlayerData.addCoin("要不要", 4e6);
      e.onClickClose();
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAgain")], _ctor.prototype, "btnAgain", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGet")], _ctor.prototype, "btnGet", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDouble")], _ctor.prototype, "btnDouble", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbMoney")], _ctor.prototype, "lbMoney", undefined);
  __decorate([r_DecorateFunction1.AutoFind("clickLayer")], _ctor.prototype, "clickLayer", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.BackWorkResult = exp_BackWorkResult;