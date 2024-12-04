var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GiveRedPacketReward = undefined;
var r_GameEvent = require("GameEvent");
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_Index = require("Index");
var r_BaseWin = require("BaseWin");
var r_GiveRedPacketGame = require("GiveRedPacketGame");
var r_GiveRedPacketSelectUI = require("GiveRedPacketSelectUI");
var exp_GiveRedPacketReward = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.GiveRedPacket, r_UIDef.UIDef.Res.UI.GiveRedPacketReward) || this;
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
    this.show(r_UIDef.UIDef.Urls.UI.GiveRedPacketReward, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.GiveRedPacketReward);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnGet.onClick(this.onClickGet, this);
    this.btnDouble.onClick(this.onClickGetDouble, this);
    this.btnBack.onClick(this.onClickBack, this);
    this.btnAagin.onClick(this.onClickAagin, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.clickLayer.node.off(cc.Node.EventType.TOUCH_START);
    this.clickLayer.node.on(cc.Node.EventType.TOUCH_START, function () {}, this);
    this.contentPane.getController("c1").selectedIndex = this.data.mode;
    var t;
    this.curCityId = r_GiveRedPacketSelectUI.GiveRedPacketSelectUI.Inst.cityId;
    t = r_GiveRedPacketSelectUI.GiveRedPacketSelectUI.Inst.tiggerCaidan1 && r_PlayerData.PlayerData.data.giveRedPacketMap.caidan1 ? "全国" : r_GiveRedPacketSelectUI.redPacketCityInfo[this.curCityId - 1].name;
    this.curDouble = 10;
    if (0 == this.data.mode) {
      this.lbDesc.text = t + "的亲戚觉得你很大气，一如既往地给你发个" + r_GiveRedPacketSelectUI.GiveRedPacketSelectUI.Inst.oneRedMoney + "元红包";
    } else if (1 == this.data.mode) {
      this.lbDesc.text = t + "的亲戚觉得你很抠门，一个红包都不发";
    } else {
      this.lbDesc.text = "女友身上的红包全都被你掏出";
      this.curDouble = 10;
    }
    this.lbMoney.text = "x" + r_UtilsSystem.UtilsSystem.getShowCoin(this.data.totalMoney * this.curDouble);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_GiveRedPacketSelectUI.GiveRedPacketSelectUI.Inst.tiggerCaidan1 = false;
  };
  _ctor.prototype.onClickGet = function () {
    this.hide();
    r_GiveRedPacketGame.GiveRedPacketGame.hide();
    r_PlayerData.PlayerData.addCoin("派红包", this.data.totalMoney * this.curDouble);
  };
  _ctor.prototype.onClickGetDouble = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("派红包双倍领取", function () {
      e.hide();
      r_GiveRedPacketGame.GiveRedPacketGame.hide();
      r_PlayerData.PlayerData.addCoin("派红包", e.data.totalMoney * e.curDouble * 2);
    });
  };
  _ctor.prototype.onClickBack = function () {
    this.hide();
    r_GiveRedPacketGame.GiveRedPacketGame.hide();
  };
  _ctor.prototype.onClickAagin = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("派红包再来一局", function () {
      r_Index.App.inst.dispatchEventWith(r_GameEvent.default.RestartGame);
      e.hide();
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("lbDesc")], _ctor.prototype, "lbDesc", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGet")], _ctor.prototype, "btnGet", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDouble")], _ctor.prototype, "btnDouble", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAagin")], _ctor.prototype, "btnAagin", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbMoney")], _ctor.prototype, "lbMoney", undefined);
  __decorate([r_DecorateFunction1.AutoFind("clickLayer")], _ctor.prototype, "clickLayer", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.GiveRedPacketReward = exp_GiveRedPacketReward;