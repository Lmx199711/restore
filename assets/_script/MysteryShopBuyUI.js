var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MysteryShopBuyUI = undefined;
var r_UIDef = require("UIDef");
var r_UtilsSystem = require("UtilsSystem");
var r_BagGoodsCfg = require("BagGoodsCfg");
var r_PlatformSystem = require("PlatformSystem");
var r_BaseWin = require("BaseWin");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_PlayerData = require("PlayerData");
var r_BagSystem = require("BagSystem");
var r_ReportSystem = require("ReportSystem");
var r_MysteryShopUI = require("MysteryShopUI");
var exp_MysteryShopBuyUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.MysteryShop, r_UIDef.UIDef.Res.UI.MysteryShopBuyUI) || this;
    t.maxMoney = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.MysteryShopBuyUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MysteryShopBuyUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnClose.onClick(this.onClose, this);
    this.btnBuy.onClick(this.onClickBuy, this);
    this.btnSub.onClick(this.onClickSub, this);
    this.btnAdd.onClick(this.onClickAdd, this);
    this.slider.on(fgui.Event.STATUS_CHANGED, this.onSliderChanged, this);
    this.slider.on(fgui.Event.CLICK, this.onSliderClick, this);
    this.slider.on(fgui.Event.SCROLL_END, this.onSliderScrollEnd, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.curData = this.data.goodsInfo;
    this.maxMoney = this.data.shopData.num;
    this.slider.min = 0;
    this.slider.max = this.maxMoney;
    this.slider.value = 1;
    this.updateTotalValue();
    this.lbName.text = this.curData.name;
    this.lbValue.text = "" + r_UtilsSystem.UtilsSystem.getShowCoin(this.curData.value).replace("元", "");
    this.Icon.asLoader.url = "ui://MysteryShop/" + this.curData.iconName;
    this.updateCountPosX();
    this.refreshSliderTouchenabel();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.updateTotalValue = function () {};
  _ctor.prototype.updateCountPosX = function () {
    this.num.text = Math.floor(this.slider.value) + "个";
    this.Count.x = 3.18 * this.slider.value * (100 / this.slider.max);
  };
  _ctor.prototype.onClose = function () {
    this.hide();
  };
  _ctor.prototype.onSliderChanged = function () {
    if (this.slider.value > this.maxMoney) {
      this.slider.value = this.maxMoney;
    } else {
      this.slider.value;
    }
    this.updateTotalValue();
    this.updateCountPosX();
    this.refreshSliderTouchenabel();
  };
  _ctor.prototype.refreshSliderTouchenabel = function () {
    if (1 == this.slider.max) {
      this.slider.touchable = false;
    } else {
      this.slider.touchable = true;
    }
  };
  _ctor.prototype.onSliderClick = function () {
    this.slider.value > this.maxMoney && (this.slider.value = this.maxMoney);
  };
  _ctor.prototype.onSliderScrollEnd = function () {
    this.slider.value <= 0 && (this.slider.value = 1);
  };
  _ctor.prototype.onClickBuy = function () {
    if (this.slider.value <= 0 || this.slider.value > this.data.shopData.num) {
      r_UtilsSystem.UtilsSystem.showTip("请选择正确数量");
    } else if (!r_BagSystem.BagSystem.getPlayerGoodsInfoById(this.data.shopData.id) && r_BagSystem.BagSystem.getPlayerGoodsKindByType(1) + 1 > r_PlayerData.PlayerData.data.bagInfo.bag2BoxCount) {
      r_UtilsSystem.UtilsSystem.showTip("背包空间不足");
    } else {
      if (r_PlayerData.PlayerData.data.mysteryShopMap.exchangeCardCount > 0) {
        r_PlayerData.PlayerData.data.mysteryShopMap.exchangeCardCount -= 1;
      } else {
        if (!r_PlayerData.PlayerData.isCoinEnough(this.curData.value * this.slider.value)) {
          return void r_UtilsSystem.UtilsSystem.showTip("金币不足");
        }
        r_PlayerData.PlayerData.deleteCoin("商店扣钱", this.curData.value * this.slider.value, r_ReportSystem.SystemKey.None);
      }
      r_MysteryShopUI.default.Inst && r_MysteryShopUI.default.Inst.setGoodsNumBuyId(this.data.shopData.id, this.slider.value);
      if (this.curData.goodsId) {
        if (this.curData.goodsId == r_BagGoodsCfg.GoodsName.免广卡) {
          r_PlatformSystem.PlatformSystem.addFreeCard(1);
        } else {
          r_BagSystem.BagSystem.setPlayerGoodsInfoById(this.curData.goodsId, this.slider.value);
        }
        r_UtilsSystem.UtilsSystem.showTip("获得 " + this.curData.name);
      } else {
        this.curData.coin && r_PlayerData.PlayerData.addCoin("神秘商店", this.curData.coin);
      }
      this.refreshSliderTouchenabel();
      r_PlayerData.PlayerData.saveData();
      this.hide();
      r_MysteryShopUI.default.Inst && r_MysteryShopUI.default.Inst.refreshItem();
    }
  };
  _ctor.prototype.onClickSub = function () {
    if (this.slider.value > 1) {
      this.slider.value -= 1;
      this.updateTotalValue();
      this.updateCountPosX();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("已最小");
    }
  };
  _ctor.prototype.onClickAdd = function () {
    if (this.slider.value < this.maxMoney) {
      this.slider.value += 1;
      this.updateTotalValue();
      this.updateCountPosX();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("已最大");
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("buySlider")], _ctor.prototype, "slider", undefined);
  __decorate([r_DecorateFunction1.AutoFind("buySlider/Count")], _ctor.prototype, "Count", undefined);
  __decorate([r_DecorateFunction1.AutoFind("buySlider/Count/num")], _ctor.prototype, "num", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBuy")], _ctor.prototype, "btnBuy", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSub")], _ctor.prototype, "btnSub", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAdd")], _ctor.prototype, "btnAdd", undefined);
  __decorate([r_DecorateFunction1.AutoFind("Icon")], _ctor.prototype, "Icon", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbName")], _ctor.prototype, "lbName", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbValue")], _ctor.prototype, "lbValue", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.MysteryShopBuyUI = exp_MysteryShopBuyUI;