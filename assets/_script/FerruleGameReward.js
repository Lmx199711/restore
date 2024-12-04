var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FerruleGameReward = undefined;
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var exp_FerruleGameReward = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.FerruleGame, r_UIDef.UIDef.Res.UI.FerruleGameReward) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.FerruleGameReward, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FerruleGameReward);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnGetMoney.onClick(this.onClickGetMoney, this);
    this.btnTakeAway.onClick(this.onClickTakeAway, this);
    this.btnAll.onClick(this.onClickAll, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.clickLayer.node.off(cc.Node.EventType.TOUCH_START);
    this.clickLayer.node.on(cc.Node.EventType.TOUCH_START, function () {}, this);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_PlatformSystem.PlatformSystem.getIsWebPlatform() || (r_PlayerData.PlayerData.data.ferruleGameMap.caidan = 1);
    r_PlayerData.PlayerData.data.ferruleGameMap.hitFamaleBossNum = 0;
    r_PlayerData.PlayerData.saveData();
    this.data.hideCallBack && this.data.hideCallBack();
  };
  _ctor.prototype.onClickGetMoney = function () {
    r_PlayerData.PlayerData.addCoin("套圈", 1e8);
    this.hide();
  };
  _ctor.prototype.onClickTakeAway = function () {
    -1 == r_PlayerData.PlayerData.data.baomuList.indexOf(3) && r_PlayerData.PlayerData.data.baomuList.push(3);
    this.hide();
  };
  _ctor.prototype.onClickAll = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("套圈全都要", function () {
      r_PlayerData.PlayerData.addCoin("套圈", 1e8);
      -1 == r_PlayerData.PlayerData.data.baomuList.indexOf(3) && r_PlayerData.PlayerData.data.baomuList.push(3);
      r_TimeSystem.TimeSystem.scheduleOnce("ferruleReward", 1, function () {
        r_UtilsSystem.UtilsSystem.showTip("恭喜你招聘老板娘，请前往卧室查看");
      });
      e.hide();
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("clickLayer")], _ctor.prototype, "clickLayer", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGetMoney")], _ctor.prototype, "btnGetMoney", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnTakeAway")], _ctor.prototype, "btnTakeAway", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAll")], _ctor.prototype, "btnAll", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.FerruleGameReward = exp_FerruleGameReward;