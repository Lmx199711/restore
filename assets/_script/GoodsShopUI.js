var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoodsShopUI = undefined;
var r_UIDef = require("UIDef");
var r_UtilsSystem = require("UtilsSystem");
var r_ResSystem = require("ResSystem");
var r_BagGoodsCfg = require("BagGoodsCfg");
var r_PlatformSystem = require("PlatformSystem");
var r_TimeSystem = require("TimeSystem");
var r_BaseWin = require("BaseWin");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_PlayerData = require("PlayerData");
var r_BagSystem = require("BagSystem");
var r_ShopTurntableUI = require("ShopTurntableUI");
var r_GoodsShopBuyUI = require("GoodsShopBuyUI");
var r_FguiResSystem = require("FguiResSystem");
var exp_GoodsShopUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.GoodsShop, r_UIDef.UIDef.Res.UI.GoodsShopUI) || this;
    t.goodsIdList = [];
    t.shopItemList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.GoodsShopUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.GoodsShopUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.onClose, this);
    this.btnShopRefresh.onClick(this.onClickRefresh, this);
    var o = function (e) {
      i.shopItemList[e] = i.contentPane.getChild("shopItem" + (e + 1));
      i.shopItemList[e].clearClick();
      i.shopItemList[e].onClick(function () {
        if (1 == t.shopItemList[e].getController("c1").selectedIndex) {
          r_UtilsSystem.UtilsSystem.showTip("已售空,请刷新商品");
        } else {
          r_GoodsShopBuyUI.GoodsShopBuyUI.showUI(r_PlayerData.PlayerData.data.shopMap.shopGoodsList[e]);
        }
      });
    };
    var i = this;
    for (var n = 0; n < 9; n++) {
      o(n);
    }
    this.btnTurn.onClick(this.onClickTurn, this);
    r_ResSystem.ResSystem.loadBundleRes("bundle2", "roleAnim/超市女神", cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      var i = cc.instantiate(o);
      t.roleAnim.node.addChild(i);
      t.roleAnim.node.getChildByName("anim").getComponent(sp.Skeleton).setAnimation(0, "animation", true);
    });
  };
  _ctor.prototype.onShown = function () {
    var o = this;
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    this.getCanBuyGoodsList();
    this.refreshItem();
    this.qipao.node.scale = 0;
    cc.tween(this.qipao.node).to(.5, {
      scale: 1
    }).delay(2).to(.5, {
      scale: 0
    }).call(function () {}).start();
    r_TimeSystem.TimeSystem.unregistSecondUpdate("GoodsShopUIShopUIUpdate");
    r_TimeSystem.TimeSystem.registSecondUpdate("GoodsShopUIShopUIUpdate", function () {
      o.showShopQiPao();
    }, 5);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.unregistSecondUpdate("GoodsShopUIShopUIUpdate");
    _ctor.Inst = null;
  };
  _ctor.prototype.refreshGuideFiger = function () {};
  _ctor.prototype.refreshItem = function () {
    if (r_PlayerData.PlayerData.data.shopMap.buyTime && r_TimeSystem.TimeSystem.isNextDay(r_PlayerData.PlayerData.data.shopMap.buyTime)) {
      r_PlayerData.PlayerData.data.shopMap.buyTime = 0;
      r_PlayerData.PlayerData.data.shopMap.trunCount = 3;
      r_PlayerData.PlayerData.saveData();
    }
    if (!r_PlayerData.PlayerData.data.shopMap.buyTime) {
      r_PlayerData.PlayerData.data.shopMap.shopGoodsList = [];
      r_PlayerData.PlayerData.data.shopMap.refreshCount = 1;
      for (var e = 0; e < 9; e++) {
        for (var t = this.randomGoods(); this.isExistShopGoodsList(t.id);) {
          t = this.randomGoods();
        }
        r_PlayerData.PlayerData.data.shopMap.shopGoodsList.push(t);
      }
      r_PlayerData.PlayerData.data.shopMap.buyTime = r_TimeSystem.TimeSystem.getServerTime();
    }
    for (e = 0; e < 9; e++) {
      if (r_PlayerData.PlayerData.data.shopMap.shopGoodsList[e].num > 0) {
        this.shopItemList[e].getController("c1").selectedIndex = 0;
      } else {
        this.shopItemList[e].getController("c1").selectedIndex = 1;
      }
      var o = r_BagSystem.BagSystem.getGoodsInfoById(r_PlayerData.PlayerData.data.shopMap.shopGoodsList[e].id);
      r_ResSystem.ResSystem.loadBundleFguiImg(this.shopItemList[e].getChild("goodsIcon"), "bundle2", "goodsShop/bag/icon/" + o.icon);
      this.shopItemList[e].getChild("lbName").text = r_BagSystem.BagSystem.getGoodsInfoById(r_PlayerData.PlayerData.data.shopMap.shopGoodsList[e].id).name;
      this.shopItemList[e].getChild("lbVaule").text = r_UtilsSystem.UtilsSystem.numFormats(r_BagSystem.BagSystem.getGoodsInfoById(r_PlayerData.PlayerData.data.shopMap.shopGoodsList[e].id).value).replace("元", "");
    }
    if (r_PlayerData.PlayerData.data.shopMap.freeCount >= 1) {
      this.btnShopRefresh.getController("c1").selectedIndex = 0;
      this.contentPane.getController("c1").selectedIndex = 0;
      this.lbCardNum.text = "x" + r_PlayerData.PlayerData.data.shopMap.freeCount;
    } else {
      this.btnShopRefresh.getController("c1").selectedIndex = 1;
      this.contentPane.getController("c1").selectedIndex = 1;
    }
    r_PlayerData.PlayerData.saveData();
    this.refreshGuideFiger();
  };
  _ctor.prototype.getShopItemListIndexById = function (e) {
    for (var t = 0; t < r_PlayerData.PlayerData.data.shopMap.shopGoodsList.length; t++) {
      if (r_PlayerData.PlayerData.data.shopMap.shopGoodsList[t].id == e) {
        return t;
      }
    }
    return null;
  };
  _ctor.prototype.isExistShopGoodsList = function (e) {
    for (var t = 0; t < r_PlayerData.PlayerData.data.shopMap.shopGoodsList.length; t++) {
      if (r_PlayerData.PlayerData.data.shopMap.shopGoodsList[t].id == e) {
        return true;
      }
    }
    return false;
  };
  _ctor.prototype.low500Value = function () {
    var e = [];
    for (var t = 0; t < r_BagGoodsCfg.BagGoodsList.length; t++) {
      r_BagGoodsCfg.BagGoodsList[t].value <= 500 && e.push(r_BagGoodsCfg.BagGoodsList[t].id);
    }
    return e;
  };
  _ctor.prototype.getCanBuyGoodsList = function () {
    this.goodsIdList = [];
    for (var e = 0; e < r_BagGoodsCfg.BagGoodsList.length; e++) {
      r_BagGoodsCfg.BagGoodsList[e].canBuy && this.goodsIdList.push(r_BagGoodsCfg.BagGoodsList[e].id);
    }
  };
  _ctor.prototype.randomGoods = function () {
    var e = {};
    e.id = r_UtilsSystem.UtilsSystem.getRandomFromArr(this.goodsIdList);
    r_BagSystem.BagSystem.getGoodsInfoById(e.id);
    e.num = r_BagSystem.BagSystem.getGoodsInfoById(e.id).MaxNum;
    return e;
  };
  _ctor.prototype.randomGoodsById = function (e) {
    var t = {};
    t.id = e;
    t.num = r_BagSystem.BagSystem.getGoodsInfoById(t.id).MaxNum;
    return t;
  };
  _ctor.prototype.onClose = function () {
    this.hide();
  };
  _ctor.prototype.onClickRefresh = function () {
    var e = this;
    if (0 == this.btnShopRefresh.getController("c1").selectedIndex) {
      r_PlayerData.PlayerData.data.shopMap.shopGoodsList = [];
      r_PlayerData.PlayerData.data.shopMap.refreshCount += 1;
      for (var t = 0; t < 9; t++) {
        for (var o = this.randomGoods(); this.isExistShopGoodsList(o.id);) {
          o = this.randomGoods();
        }
        r_PlayerData.PlayerData.data.shopMap.shopGoodsList.push(o);
      }
      r_PlayerData.PlayerData.data.shopMap.freeCount -= 1;
      r_PlayerData.PlayerData.data.shopMap.freeCount < 0 && (r_PlayerData.PlayerData.data.shopMap.freeCount = 0);
      this.refreshItem();
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("商店刷新", function () {
        r_PlayerData.PlayerData.data.shopMap.shopGoodsList = [];
        r_PlayerData.PlayerData.data.shopMap.refreshCount += 1;
        for (var t = 0; t < 9; t++) {
          for (var o = e.randomGoods(); e.isExistShopGoodsList(o.id);) {
            o = e.randomGoods();
          }
          r_PlayerData.PlayerData.data.shopMap.shopGoodsList.push(o);
        }
        e.refreshItem();
      });
    }
  };
  _ctor.prototype.onClickTurn = function () {
    r_ShopTurntableUI.ShopTurntableUI.showUI();
  };
  _ctor.prototype.setGoodsNumBuyId = function (e, t) {
    for (var o = 0; o < r_PlayerData.PlayerData.data.shopMap.shopGoodsList.length; o++) {
      if (r_PlayerData.PlayerData.data.shopMap.shopGoodsList[o].id == e) {
        r_PlayerData.PlayerData.data.shopMap.shopGoodsList[o].num -= t;
        r_PlayerData.PlayerData.data.shopMap.shopGoodsList[o].num < 0 && (r_PlayerData.PlayerData.data.shopMap.shopGoodsList[o].num = 0);
      }
    }
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.showShopQiPao = function () {
    this.qipao.visible = true;
    cc.Tween.stopAllByTarget(this.qipao.node);
    this.qipao.getChild("content").text = r_UtilsSystem.UtilsSystem.getRandomFromArr(["要不要来试一下手气"]);
    cc.tween(this.qipao.node).to(.5, {
      scale: 1
    }).delay(3).to(.5, {
      scale: 0
    }).call(function () {}).start();
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("roleAnim")], _ctor.prototype, "roleAnim", undefined);
  __decorate([r_DecorateFunction1.AutoFind("qipao")], _ctor.prototype, "qipao", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnShopRefresh")], _ctor.prototype, "btnShopRefresh", undefined);
  __decorate([r_DecorateFunction1.AutoFind("shopItem1")], _ctor.prototype, "shopItem1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("finger")], _ctor.prototype, "finger", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbCardNum")], _ctor.prototype, "lbCardNum", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnTurn")], _ctor.prototype, "btnTurn", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.GoodsShopUI = exp_GoodsShopUI;