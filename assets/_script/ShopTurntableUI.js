var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShopTurntableUI = undefined;
var r_UIDef = require("UIDef");
var r_DebugSystem = require("DebugSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_BagGoodsCfg = require("BagGoodsCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_GoodsShopUI = require("GoodsShopUI");
var r_ShopGetTurnRewardUI = require("ShopGetTurnRewardUI");
var exp_ShopTurntableUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.GoodsShop, r_UIDef.UIDef.Res.UI.ShopTurntableUI) || this;
    t.curAngle = 0;
    t.rewardId = 1;
    t.isRuning = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.ShopTurntableUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ShopTurntableUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.onClose, this);
    this.btnTurn.onClick(this.onClickTurn, this);
    this.btnTurnAdd.onClick(this.onClickAdd, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    this.rewardId = 1;
    this.turnCom.node.angle = 0;
    this.showResultLight();
    this.refreshTurnRewardUI();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClose = function () {
    this.hide();
    r_GoodsShopUI.GoodsShopUI.Inst && r_GoodsShopUI.GoodsShopUI.Inst.refreshItem();
    this.isRuning = false;
    _ctor.Inst = null;
  };
  _ctor.prototype.refreshTurnRewardUI = function () {
    for (var e = 1; e <= 8; e++) {
      var t = this.turnCom.getChild("trunItem" + e).asCom;
      r_ResSystem.ResSystem.loadBundleFguiImg(t.getChild("picItem"), "bundle2", "goodsShop/turntable/" + r_BagGoodsCfg.turntableRewardList[e - 1].name);
      t.getChild("labName").text = r_BagGoodsCfg.turntableRewardList[e - 1].turnName;
    }
    this.refreshBtnState();
  };
  _ctor.prototype.refreshBtnState = function () {
    if (r_PlayerData.PlayerData.data.shopMap.trunCount <= 0) {
      this.btnTurnAdd.visible = true;
      this.btnTurn.visible = false;
    } else {
      this.btnTurnAdd.visible = false;
      this.btnTurn.visible = true;
    }
    this.btnTurn.getChild("labCount").text = "(" + r_PlayerData.PlayerData.data.shopMap.trunCount + "/3)";
  };
  _ctor.prototype.showResultLight = function (e) {
    undefined === e && (e = false);
    for (var t = 1; t <= 8; t++) {
      if (e && this.rewardId == t) {
        this.turnCom.getChild("picResult" + t).visible = true;
        this.turnCom.getChild("light" + t).asCom.getController("c1").selectedIndex = 1;
      } else {
        this.turnCom.getChild("picResult" + t).visible = false;
        this.turnCom.getChild("light" + t).asCom.getController("c1").selectedIndex = 0;
      }
    }
  };
  _ctor.prototype.onClickTurn = function () {
    var e = this;
    if (this.isRuning) {
      r_UtilsSystem.UtilsSystem.showTip("抽奖中");
    } else {
      r_PlayerData.PlayerData.data.shopMap.trunCount -= 1;
      r_PlayerData.PlayerData.data.shopMap.trunCount <= 0 && (r_PlayerData.PlayerData.data.shopMap.trunCount = 0);
      r_PlayerData.PlayerData.saveData();
      this.refreshBtnState();
      this.showResultLight(false);
      var t = this.rewardId;
      this.randomResult();
      var o = 0;
      var i = t - this.rewardId;
      o = i > 0 ? 45 * i + 0 : 0 == i ? 360 : 360 - (45 * Math.abs(i) - 0);
      o += 1800;
      o -= this.turnCom.node.angle;
      o *= -1;
      console.log("中奖区域 angle=  ", o, " , 中奖区域 =  ", Math.ceil((360 + o) / 45));
      this.isRuning = true;
      cc.tween(this.turnCom.node).to(3, {
        angle: o
      }, {
        easing: "easeInOut"
      }).call(function () {
        e.turnCom.node.angle = o - 360 * Math.floor(o / 360);
        e.showResultLight(true);
        e.addRewad();
      }).start();
    }
  };
  _ctor.prototype.randomResult = function () {
    var e = 0;
    var t = Math.random();
    for (var o = 0; o < r_BagGoodsCfg.turntableRewardList.length; o++) {
      if (t < (e += r_BagGoodsCfg.turntableRewardList[o].pr)) {
        this.rewardId = r_BagGoodsCfg.turntableRewardList[o].id;
        break;
      }
    }
    if (r_PlatformSystem.PlatformSystem.getIsWebPlatform()) {
      if (r_DebugSystem.DebugSystem.goodsShopType == r_DebugSystem.GMToolTypeGoodsShop.jingyefu) {
        this.rewardId = 1;
      } else if (r_DebugSystem.DebugSystem.goodsShopType == r_DebugSystem.GMToolTypeGoodsShop.piaoliuping) {
        this.rewardId = 8;
      } else {
        r_DebugSystem.DebugSystem.goodsShopType == r_DebugSystem.GMToolTypeGoodsShop.caoshika && (this.rewardId = 6);
      }
    }
  };
  _ctor.prototype.addRewad = function () {
    var e = this;
    if (3 == this.rewardId || 7 == this.rewardId) {
      r_PlayerData.PlayerData.addCoin("商店转盘", r_BagGoodsCfg.turntableRewardList[this.rewardId - 1].count);
      this.isRuning = false;
    } else {
      r_TimeSystem.TimeSystem.scheduleOnce("turnReward", .3, function () {
        r_ShopGetTurnRewardUI.ShopGetTurnRewardUI.showUI({
          id: e.rewardId,
          opendCallback: function () {
            e.isRuning = false;
          }
        });
      });
    }
  };
  _ctor.prototype.onClickAdd = function () {
    var e = this;
    if (this.isRuning) {
      r_UtilsSystem.UtilsSystem.showTip("抽奖中");
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("超市转盘补充次数", function () {
        r_PlayerData.PlayerData.data.shopMap.trunCount = 3;
        r_PlayerData.PlayerData.saveData();
        e.refreshBtnState();
      });
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnTurn")], _ctor.prototype, "btnTurn", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnTurnAdd")], _ctor.prototype, "btnTurnAdd", undefined);
  __decorate([r_DecorateFunction1.AutoFind("turnCom")], _ctor.prototype, "turnCom", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.ShopTurntableUI = exp_ShopTurntableUI;