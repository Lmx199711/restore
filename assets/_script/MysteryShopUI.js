var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_BagGoodsUI = require("BagGoodsUI");
var r_MysteryShopBuyUI = require("MysteryShopBuyUI");
var r_MysteryShopDrawCard = require("MysteryShopDrawCard");
var g = [{
  id: 2,
  name: "种植证",
  goodsId: 47,
  count: 1,
  value: 88e4,
  iconName: "6"
}, {
  id: 4,
  name: "营业证",
  goodsId: 41,
  count: 1,
  value: 128e4,
  iconName: "7"
}, {
  id: 6,
  name: "狩猎证",
  goodsId: 49,
  count: 1,
  value: 188e4,
  iconName: "26"
}];
var def_MysteryShopUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.MysteryShop, r_UIDef.UIDef.Res.UI.MysteryShopUI) || this;
    t.uiType = "fullScreen";
    t.m_itemList = [];
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.MysteryShopUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MysteryShopUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.hide, this);
    this.btnRefresh.onClick(this.onClickRefresh, this);
    this.btnDraw.onClick(this.onClickDraw, this);
    this.btnBag.onClick(this.onClickBag, this);
    r_ResSystem.ResSystem.loadBundleRes("game3", "bagAnim", cc.Prefab, function (e, o) {
      var i = cc.instantiate(o);
      t.btnBag.getChild("icon").node.addChild(i);
    });
    r_ResSystem.ResSystem.loadBundleRes("bundle2", "mysteryShop/roleAnim", cc.Prefab, function (e, o) {
      var i = cc.instantiate(o);
      t.roleCom.getChild("roleAnim").node.addChild(i);
      t.roleCom.getChild("roleAnim").node.getChildByName("anim").getComponent(sp.Skeleton).setAnimation(0, "step_1", true);
    });
    var o = function (e) {
      i.m_itemList[e] = i.contentPane.getChild("goodsIcon" + (e + 1)).asCom;
      i.m_itemList[e].getChild("goodsIcon").asLoader.url = "ui://MysteryShop/" + g[e].iconName;
      i.m_itemList[e].getChild("lbCount").asTextField.text = r_UtilsSystem.UtilsSystem.numFormats(g[e].value);
      e >= 4 && (i.m_itemList[e].getChild("n14").height = 224);
      i.m_itemList[e].clearClick();
      i.m_itemList[e].onClick(function () {
        t.onClickBuy(e);
      }, i);
    };
    var i = this;
    for (var n = 0; n < g.length; n++) {
      o(n);
    }
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
    this.refreshItem();
    this.showQipao("我这里是收票子的");
    this.refreshExchangeNum();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ref__ctor.Inst = null;
  };
  _ctor.prototype.refreshItem = function () {
    if (r_PlayerData.PlayerData.data.mysteryShopMap.refreshTime && r_TimeSystem.TimeSystem.isNextDay(r_PlayerData.PlayerData.data.mysteryShopMap.refreshTime)) {
      r_PlayerData.PlayerData.data.mysteryShopMap.refreshTime = 0;
      r_PlayerData.PlayerData.saveData();
    }
    if (!r_PlayerData.PlayerData.data.mysteryShopMap.refreshTime) {
      r_PlayerData.PlayerData.data.mysteryShopMap.goodsList = [];
      for (var e = 0; e < g.length; e++) {
        r_PlayerData.PlayerData.data.mysteryShopMap.goodsList.push({
          id: g[e].id,
          num: g[e].count
        });
      }
      r_PlayerData.PlayerData.data.mysteryShopMap.refreshTime = r_TimeSystem.TimeSystem.getServerTime();
    }
    for (e = 0; e < g.length; e++) {
      if (r_PlayerData.PlayerData.data.mysteryShopMap.goodsList[e].num > 0) {
        this.m_itemList[e].getController("c1").selectedIndex = 0;
      } else {
        this.m_itemList[e].getController("c1").selectedIndex = 1;
      }
    }
    this.refreshExchangeNum();
  };
  _ctor.prototype.setGoodsNumBuyId = function (e, t) {
    for (var o = 0; o < r_PlayerData.PlayerData.data.mysteryShopMap.goodsList.length; o++) {
      if (r_PlayerData.PlayerData.data.mysteryShopMap.goodsList[o].id == e) {
        r_PlayerData.PlayerData.data.mysteryShopMap.goodsList[o].num -= t;
        r_PlayerData.PlayerData.data.mysteryShopMap.goodsList[o].num < 0 && (r_PlayerData.PlayerData.data.mysteryShopMap.goodsList[o].num = 0);
      }
    }
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.onClickBuy = function (e) {
    if (r_PlayerData.PlayerData.data.mysteryShopMap.goodsList[e].num <= 0 || 1 == this.m_itemList[e].getController("c1").selectedIndex) {
      r_UtilsSystem.UtilsSystem.showTip("商品已售空，请刷新");
    } else {
      r_MysteryShopBuyUI.MysteryShopBuyUI.showUI({
        goodsInfo: g[e],
        shopData: r_PlayerData.PlayerData.data.mysteryShopMap.goodsList[e]
      });
    }
  };
  _ctor.prototype.onClickRefresh = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("神秘商店刷新", function () {
      r_PlayerData.PlayerData.data.mysteryShopMap.refreshTime = 0;
      e.refreshItem();
      r_PlayerData.PlayerData.saveData();
    });
  };
  _ctor.prototype.refreshExchangeNum = function () {
    this.lbExchangeNum.text = r_PlayerData.PlayerData.data.mysteryShopMap.exchangeCardCount + "张";
  };
  _ctor.prototype.onClickDraw = function () {
    r_MysteryShopDrawCard.default.showUI();
  };
  _ctor.prototype.onClickBag = function () {
    r_BagGoodsUI.BagGoodsUI.showUI();
  };
  _ctor.prototype.showQipao = function (e) {
    if ("" != e) {
      this.qipao.visible = true;
      cc.Tween.stopAllByTarget(this.qipao.node);
      this.qipao.getChild("content").text = e;
      this.qipao.node.scale = 1;
      cc.tween(this.qipao.node).delay(3).to(.5, {
        scale: 0
      }).start();
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("lbExchangeNum")], _ctor.prototype, "lbExchangeNum", undefined);
  __decorate([r_DecorateFunction1.AutoFind("roleCom")], _ctor.prototype, "roleCom", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnRefresh")], _ctor.prototype, "btnRefresh", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDraw")], _ctor.prototype, "btnDraw", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBag")], _ctor.prototype, "btnBag", undefined);
  __decorate([r_DecorateFunction1.AutoFind("qipao")], _ctor.prototype, "qipao", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_MysteryShopUI;