var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GiveRedPacketResult = undefined;
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_GiveRedPacketGame = require("GiveRedPacketGame");
var r_GiveRedPacketReward = require("GiveRedPacketReward");
var r_GiveRedPacketSelectUI = require("GiveRedPacketSelectUI");
var exp_GiveRedPacketResult = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.GiveRedPacket, r_UIDef.UIDef.Res.UI.GiveRedPacketResult) || this;
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
    this.show(r_UIDef.UIDef.Urls.UI.GiveRedPacketResult, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.GiveRedPacketResult);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnClose.onClick(this.onClickClose, this);
    this.btnOpen.onClick(this.onClickOpen, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.clickLayer.node.off(cc.Node.EventType.TOUCH_START);
    this.clickLayer.node.on(cc.Node.EventType.TOUCH_START, function () {}, this);
    this.curCityId = r_GiveRedPacketSelectUI.GiveRedPacketSelectUI.Inst.cityId;
    if (r_GiveRedPacketSelectUI.GiveRedPacketSelectUI.Inst.tiggerCaidan1 && r_PlayerData.PlayerData.data.giveRedPacketMap.caidan1) {
      this.lbCityName.text = "全国";
      this.lbRedValue.text = "" + r_GiveRedPacketSelectUI.GiveRedPacketSelectUI.Inst.oneRedMoney;
    } else {
      this.lbCityName.text = "" + r_GiveRedPacketSelectUI.redPacketCityInfo[this.curCityId - 1].name;
      this.lbRedValue.text = "" + r_GiveRedPacketSelectUI.GiveRedPacketSelectUI.Inst.oneRedMoney;
    }
    this.lbSend.text = "成功派发：" + this.data.sendCount + "个";
    this.lbHold.text = "被拦截：" + this.data.holdCount + "个";
    this.lbDesc.text = "收到" + this.data.sendCount + "个送礼红包";
    this.btnClose.visible = false;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickClose = function () {
    this.hide();
    r_GiveRedPacketGame.GiveRedPacketGame.hide();
    r_GiveRedPacketSelectUI.GiveRedPacketSelectUI.Inst.tiggerCaidan1 = false;
  };
  _ctor.prototype.onClickOpen = function () {
    this.hide();
    1 != r_PlayerData.PlayerData.data.giveRedPacketMap.caidan1 && (r_PlayerData.PlayerData.data.giveRedPacketMap.caidan1 = 1);
    if (this.data.sendCount > 0) {
      r_GiveRedPacketReward.GiveRedPacketReward.showUI({
        mode: 0,
        totalMoney: r_GiveRedPacketSelectUI.GiveRedPacketSelectUI.Inst.oneRedMoney * this.data.sendCount
      });
    } else if (this.data.holdCount > 0 && 1 != r_PlayerData.PlayerData.data.giveRedPacketMap.caidan2) {
      r_PlayerData.PlayerData.data.giveRedPacketMap.caidan2 = 1;
      r_GiveRedPacketGame.GiveRedPacketGame.Inst && r_GiveRedPacketGame.GiveRedPacketGame.Inst.showCaidan2();
    } else {
      r_GiveRedPacketReward.GiveRedPacketReward.showUI({
        mode: 1,
        totalMoney: r_GiveRedPacketSelectUI.GiveRedPacketSelectUI.Inst.oneRedMoney * this.data.sendCount
      });
    }
    r_PlayerData.PlayerData.saveData();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbCityName")], _ctor.prototype, "lbCityName", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbRedValue")], _ctor.prototype, "lbRedValue", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbSend")], _ctor.prototype, "lbSend", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbHold")], _ctor.prototype, "lbHold", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbDesc")], _ctor.prototype, "lbDesc", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOpen")], _ctor.prototype, "btnOpen", undefined);
  __decorate([r_DecorateFunction1.AutoFind("clickLayer")], _ctor.prototype, "clickLayer", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.GiveRedPacketResult = exp_GiveRedPacketResult;