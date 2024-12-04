var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoodsShopBuyUI = undefined;
var r_UIDef = require("UIDef");
var r_UtilsSystem = require("UtilsSystem");
var r_ResSystem = require("ResSystem");
var r_BagGoodsCfg = require("BagGoodsCfg");
var r_BaseWin = require("BaseWin");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_PlayerData = require("PlayerData");
var r_BagSystem = require("BagSystem");
var r_ReportSystem = require("ReportSystem");
var r_GoodsShopUI = require("GoodsShopUI");
var exp_GoodsShopBuyUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.GoodsShop, r_UIDef.UIDef.Res.UI.GoodsShopBuyUI) || this;
    t.maxMoney = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.GoodsShopBuyUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.GoodsShopBuyUI);
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
    this.curData = r_BagGoodsCfg.BagGoodsList[this.data.id - 1];
    this.maxMoney = this.data.num;
    this.slider.min = 0;
    this.slider.max = this.maxMoney;
    this.slider.value = 1;
    this.updateTotalValue();
    this.lbName.text = this.curData.name;
    this.lbValue.text = "" + r_UtilsSystem.UtilsSystem.getShowCoin(this.curData.value).replace("元", "");
    r_ResSystem.ResSystem.loadBundleFguiImg(this.Icon, "bundle2", "goodsShop/bag/icon/" + this.curData.icon);
    this.updateCountPosX();
    this.refreshSliderTouchenabel();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.updateTotalValue = function () {
    this.lbMoney.text = "" + r_UtilsSystem.UtilsSystem.getShowCoin(this.slider.value * this.curData.value).replace("元", "");
  };
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
    if (this.slider.value <= 0 || this.slider.value > this.data.num) {
      r_UtilsSystem.UtilsSystem.showTip("请选择正确数量");
    } else if (r_PlayerData.PlayerData.isCoinEnough(this.slider.value * this.curData.value)) {
      if (!r_BagSystem.BagSystem.getPlayerGoodsInfoById(this.data.id) && r_BagSystem.BagSystem.getPlayerGoodsKindByType(1) + 1 > r_PlayerData.PlayerData.data.bagInfo.bag1BoxCount) {
        r_UtilsSystem.UtilsSystem.showTip("背包空间不足");
      } else {
        r_BagSystem.BagSystem.setPlayerGoodsInfoById(this.data.id, this.slider.value);
        r_GoodsShopUI.GoodsShopUI.Inst && r_GoodsShopUI.GoodsShopUI.Inst.setGoodsNumBuyId(this.data.id, this.slider.value);
        r_PlayerData.PlayerData.deleteCoin("购买物品", this.slider.value * this.curData.value, r_ReportSystem.SystemKey.None, false);
        this.refreshSliderTouchenabel();
        r_PlayerData.PlayerData.saveData();
        this.hide();
        r_GoodsShopUI.GoodsShopUI.Inst && r_GoodsShopUI.GoodsShopUI.Inst.refreshItem();
      }
    } else {
      r_UtilsSystem.UtilsSystem.showTip("钱不够！");
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
  __decorate([r_DecorateFunction1.AutoFind("btnBuy/lbMoney")], _ctor.prototype, "lbMoney", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSub")], _ctor.prototype, "btnSub", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAdd")], _ctor.prototype, "btnAdd", undefined);
  __decorate([r_DecorateFunction1.AutoFind("Icon")], _ctor.prototype, "Icon", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbName")], _ctor.prototype, "lbName", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbValue")], _ctor.prototype, "lbValue", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.GoodsShopBuyUI = exp_GoodsShopBuyUI;