var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HuntResult = undefined;
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_BaseWin = require("BaseWin");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_TimeSystem = require("TimeSystem");
var r_HuntUI = require("HuntUI");
var exp_HuntResult = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Hunt, r_UIDef.UIDef.Res.UI.HuntResult) || this;
    t.isGet = false;
    t.curReward = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.HuntResult, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.HuntResult);
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
    this.isGet = false;
    this.clickLayer.node.off(cc.Node.EventType.TOUCH_START);
    this.clickLayer.node.on(cc.Node.EventType.TOUCH_START, function () {}, this);
    if (this.data && this.data.mode) {
      this.contentPane.getController("c1").selectedIndex = 1;
    } else {
      this.contentPane.getController("c1").selectedIndex = 0;
    }
    this.curReward = this.data.rewardMoneyList[this.data.count];
    this.lbMoney.text = "x" + r_UtilsSystem.UtilsSystem.numFormats(this.curReward);
    this.lbCur.text = "x" + r_UtilsSystem.UtilsSystem.numFormats(this.curReward);
    this.lbMax.text = "x" + r_UtilsSystem.UtilsSystem.numFormats(this.data.rewardMoneyList[this.data.rewardMoneyList.length - 1]);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickClose = function () {
    r_PlayerData.PlayerData.addCoin("狩猎", this.curReward, r_ReportSystem.SystemKey.None, true, true);
    this.hide();
    r_HuntUI.HuntUI.Inst && r_HuntUI.HuntUI.Inst.onClickBack();
  };
  _ctor.prototype.onClickAgain = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("狩猎复活", function () {
      r_HuntUI.HuntUI.Inst && r_HuntUI.HuntUI.Inst.continueGame();
      e.hide();
    });
  };
  _ctor.prototype.onClickGet = function () {
    var e = this;
    if (!this.isGet) {
      this.isGet = true;
      r_PlayerData.PlayerData.addCoin("狩猎", this.curReward, r_ReportSystem.SystemKey.None, true, true);
      r_TimeSystem.TimeSystem.scheduleOnce("huodejinbiSound", .2, function () {
        e.hide();
        r_HuntUI.HuntUI.Inst && r_HuntUI.HuntUI.Inst.onClickBack();
      });
    }
  };
  _ctor.prototype.onClickDouble = function () {
    var e = this;
    this.isGet || r_PlatformSystem.PlatformSystem.showVideo("狩猎双倍领取", function () {
      e.isGet = true;
      r_PlayerData.PlayerData.addCoin("狩猎", 2 * e.curReward, r_ReportSystem.SystemKey.None, true, true);
      r_TimeSystem.TimeSystem.scheduleOnce("huodejinbiSound", .2, function () {
        e.hide();
        r_HuntUI.HuntUI.Inst && r_HuntUI.HuntUI.Inst.onClickBack();
      });
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAgain")], _ctor.prototype, "btnAgain", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGet")], _ctor.prototype, "btnGet", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDouble")], _ctor.prototype, "btnDouble", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbMoney")], _ctor.prototype, "lbMoney", undefined);
  __decorate([r_DecorateFunction1.AutoFind("clickLayer")], _ctor.prototype, "clickLayer", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbMax")], _ctor.prototype, "lbMax", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbCur")], _ctor.prototype, "lbCur", undefined);
  __decorate([r_DecorateFunction1.AutoFind("winImage")], _ctor.prototype, "winImage", undefined);
  __decorate([r_DecorateFunction1.AutoFind("loseImage")], _ctor.prototype, "loseImage", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.HuntResult = exp_HuntResult;