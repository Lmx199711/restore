var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BagGoodsUI = undefined;
var r_UIDef = require("UIDef");
var r_UtilsSystem = require("UtilsSystem");
var r_ResSystem = require("ResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_BagGoodsCfg = require("BagGoodsCfg");
var r_GoodsSellUI = require("GoodsSellUI");
var r_BaseWin = require("BaseWin");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_PlayerData = require("PlayerData");
var r_BagSystem = require("BagSystem");
var exp_BagGoodsUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.GoodsShop, r_UIDef.UIDef.Res.UI.BagGoodsUI) || this;
    t.isChangePos = false;
    t.curScrollNum = 0;
    t.selectBtnIndex = 1;
    t.goodsList = [];
    t.itemBaozi = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.BagGoodsUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BagGoodsUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnClose.onClick(this.onClose, this);
    this.goodsBg.onClick(this.onCloseGoodsInfoLayer, this);
    this.goodsInfo.onClick(this.onClickNothing, this);
    this.goodsInfoLayerInitPos = new cc.Vec2(this.goodsInfoLayer.x, this.goodsInfoLayer.y);
    this.list.on(fgui.Event.SCROLL_END, this.onScrollEnd, this);
    this.list.itemRenderer = this.onItemRenderer.bind(this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    this.selectBtnIndex = 1;
    this.goodsInfoLayer.visible = false;
    this.finger.visible = false;
    this.goodsInfoLayer.y = this.goodsInfoLayerInitPos.y;
    this.initSelectContent(this.btnBagType, 3);
    this.refreshList();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
  };
  _ctor.prototype.onClose = function () {
    this.hide();
  };
  _ctor.prototype.initSelectContent = function (e, t) {
    var o = this;
    var i = function () {
      for (var i = 1; i <= t; i++) {
        var n = e.getChild("selectitem" + i);
        if (n) {
          if (o.selectBtnIndex == i) {
            n.getController("c1").selectedIndex = 1;
          } else {
            n.getController("c1").selectedIndex = 0;
          }
        }
      }
    };
    var n = function (t) {
      var n = e.getChild("selectitem" + t);
      if (n) {
        n.clearClick();
        n.onClick(function () {
          o.selectBtnIndex = t;
          i();
          o.refreshList();
        }, a);
      }
    };
    var a = this;
    for (var s = 1; s <= t; s++) {
      n(s);
    }
    i();
  };
  _ctor.prototype.onItemRenderer = function (e, o) {
    var i = this;
    o.getChild("boxLock").clearClick();
    if (this.list.numItems < _ctor.MaxLine && e == this.list.numItems - 1) {
      o.getController("c1").selectedIndex = 0;
      o.getChild("boxLock").clearClick();
      o.getChild("boxLock").onClick(function () {
        r_PlatformSystem.PlatformSystem.showVideo("背包解锁格子", function () {
          if (1 == i.selectBtnIndex) {
            r_PlayerData.PlayerData.data.bagInfo.bag1BoxCount += _ctor.MaxOneLine;
            r_PlayerData.PlayerData.data.bagInfo.bag1BoxCount > _ctor.MaxLine * _ctor.MaxOneLine && (r_PlayerData.PlayerData.data.bagInfo.bag1BoxCount = _ctor.MaxLine * _ctor.MaxOneLine);
          } else if (2 == i.selectBtnIndex) {
            r_PlayerData.PlayerData.data.bagInfo.bag2BoxCount += _ctor.MaxOneLine;
            r_PlayerData.PlayerData.data.bagInfo.bag2BoxCount > _ctor.MaxLine * _ctor.MaxOneLine && (r_PlayerData.PlayerData.data.bagInfo.bag2BoxCount = _ctor.MaxLine * _ctor.MaxOneLine);
          } else if (3 == i.selectBtnIndex) {
            r_PlayerData.PlayerData.data.bagInfo.bag3BoxCount += _ctor.MaxOneLine;
            r_PlayerData.PlayerData.data.bagInfo.bag3BoxCount > _ctor.MaxLine * _ctor.MaxOneLine && (r_PlayerData.PlayerData.data.bagInfo.bag3BoxCount = _ctor.MaxLine * _ctor.MaxOneLine);
          }
          i.refreshList();
        });
      });
    } else {
      o.getController("c1").selectedIndex = 1;
    }
    var n = function (n) {
      o.getChild("goods" + (n + 1)).clearClick();
      if (!a.goodsList[e * _ctor.MaxOneLine + n]) {
        o.getChild("goods" + (n + 1)).getController("c1").selectedIndex = 0;
        return "continue";
      }
      var s = r_BagGoodsCfg.BagGoodsList[a.goodsList[e * _ctor.MaxOneLine + n].id - 1];
      s.num = a.goodsList[e * _ctor.MaxOneLine + n].num;
      if (s && s.num > 0) {
        o.getChild("goods" + (n + 1)).getController("c1").selectedIndex = 1;
        o.getChild("goods" + (n + 1)).getChild("name").asTextField.text = s.name;
        if (3 == s.classify) {
          if (s.num > 0) {
            o.getChild("goods" + (n + 1)).getChild("count").asTextField.text = "+" + s.num;
          } else {
            o.getChild("goods" + (n + 1)).getChild("count").asTextField.text = "";
          }
        } else {
          o.getChild("goods" + (n + 1)).getChild("count").asTextField.text = "x" + s.num;
        }
        r_ResSystem.ResSystem.loadBundleFguiImg(o.getChild("goods" + (n + 1)).getChild("Icon"), "bundle2", "goodsShop/bag/icon/" + s.icon);
        o.getChild("goods" + (n + 1)).getChild("Icon").setScale(1.1, 1.1);
        o.getChild("goods" + (n + 1)).clearClick();
        o.getChild("goods" + (n + 1)).onClick(function () {
          if (Math.floor(i.scrollingPosY / _ctor.itemHeight) > i.curScrollNum) {
            if (e - i.curScrollNum < 1) {
              return void console.log("未完全显示");
            }
          } else if (!i.scrollingPosY || i.scrollingPosY <= 0) {
            if (e - i.curScrollNum >= 3) {
              return void console.log("未完全显示");
            }
          } else if (e - i.curScrollNum > 3) {
            return void console.log("未完全显示");
          }
          i.onShowGoodsInfo(s, e, n);
        });
      } else {
        o.getChild("goods" + (n + 1)).getController("c1").selectedIndex = 0;
      }
    };
    var a = this;
    for (var s = 0; s < _ctor.MaxOneLine; s++) {
      n(s);
    }
  };
  _ctor.prototype.getGoodsInfoPos = function (e) {
    var t = e - this.curScrollNum;
    if (0 == Math.floor(t)) {
      return 0;
    } else if (1 == Math.floor(t)) {
      return 1;
    } else if (2 == Math.floor(t)) {
      return 2;
    } else if (3 == Math.floor(t)) {
      return 3;
    } else {
      return undefined;
    }
  };
  _ctor.prototype.onScrollEnd = function () {
    this.scrollingPosY = this.list.scrollPane.scrollingPosY;
    this.curScrollNum = Math.floor(this.scrollingPosY / _ctor.itemHeight);
    if (this.scrollingPosY / _ctor.itemHeight > this.curScrollNum) {
      if (!this.isChangePos) {
        this.goodsInfoLayer.y -= _ctor.offset;
        this.isChangePos = true;
      }
    } else if (this.isChangePos) {
      this.goodsInfoLayer.y += _ctor.offset;
      this.isChangePos = false;
    }
    console.log("  onScrollEnd  ", Math.floor(this.scrollingPosY / _ctor.itemHeight));
  };
  _ctor.prototype.onClickNothing = function () {};
  _ctor.prototype.onCloseGoodsInfoLayer = function () {
    this.goodsInfoLayer.visible = false;
  };
  _ctor.prototype.onShowGoodsInfo = function (e, o, i) {
    this.goodsInfoLayer.visible = true;
    this.goodsInfo.getChild("content").text = e.describe;
    this.goodsInfo.getChild("btnSell").visible = e.isCanSell;
    this.goodsInfo.getChild("btnUse").visible = e.isCanUse;
    if (this.data) {
      this.goodsInfo.getChild("btnGive").visible = e.isCanGive;
      this.goodsInfo.getChild("btnSell").visible = false;
      this.goodsInfo.getChild("btnUse").visible = false;
    } else {
      this.goodsInfo.getChild("btnGive").visible = false;
    }
    this.goodsInfo.getChild("name").asTextField.text = e.name;
    this.goodsInfo.getChild("value").asTextField.text = "价值：" + r_UtilsSystem.UtilsSystem.getShowCoin(e.value / 2).replace("元", "");
    this.goodsInfoLayer.getController("c1").selectedIndex = this.getGoodsInfoPos(o);
    if (2 == this.goodsInfoLayer.getController("c1").selectedIndex || 3 == this.goodsInfoLayer.getController("c1").selectedIndex) {
      this.goodsInfo.getController("c1").selectedIndex = i;
    } else {
      this.goodsInfo.getController("c1").selectedIndex = i + _ctor.MaxOneLine;
    }
    this.goodsInfo.getController("c2").selectedIndex = 0;
    this.goodsInfo.getChild("count").asTextField.text = "持有数量：" + e.num + "个";
    var n = this.goodsInfoLayer.getChild("goodsInfo").getChild("btnSell");
    n.clearClick();
    n.onClick(function () {
      r_GoodsSellUI.GoodsSellUI.showUI({
        itemData: e,
        index: o * _ctor.MaxOneLine + i
      });
    });
    var a = this.goodsInfoLayer.getChild("goodsInfo").getChild("btnUse");
    a.clearClick();
    a.onClick(function () {
      console.log(e.useWay);
      e.useWay && e.useWay();
    });
    var s = this.goodsInfoLayer.getChild("goodsInfo").getChild("btnGive");
    s.clearClick();
    s.onClick(function () {
      r_BagSystem.BagSystem.setPlayerGoodsInfoById(e.id, -1);
      _ctor.hide();
    });
  };
  _ctor.prototype.refreshList = function () {
    this.list.setVirtual();
    this.onCloseGoodsInfoLayer();
    this.goodsInfoLayer.y = this.goodsInfoLayerInitPos.y;
    this.goodsList = [];
    if (r_PlayerData.PlayerData.data.newMonpolyData.freeCard > 0 && r_BagSystem.BagSystem.getGoodsInfoById(r_BagGoodsCfg.GoodsName.免广卡).classify == this.selectBtnIndex) {
      var e = {
        id: r_BagGoodsCfg.GoodsName.免广卡,
        num: r_PlayerData.PlayerData.data.newMonpolyData.freeCard
      };
      this.goodsList.push(e);
    }
    for (var o = 0; o < r_PlayerData.PlayerData.data.bagInfo.goodsList.length; o++) {
      r_BagGoodsCfg.BagGoodsList[r_PlayerData.PlayerData.data.bagInfo.goodsList[o].id - 1] && r_BagGoodsCfg.BagGoodsList[r_PlayerData.PlayerData.data.bagInfo.goodsList[o].id - 1].classify == this.selectBtnIndex && r_PlayerData.PlayerData.data.bagInfo.goodsList[o].num > 0 && this.goodsList.push(r_PlayerData.PlayerData.data.bagInfo.goodsList[o]);
    }
    var i;
    if (1 == this.selectBtnIndex) {
      i = Math.floor(r_PlayerData.PlayerData.data.bagInfo.bag1BoxCount / _ctor.MaxOneLine);
    } else if (2 == this.selectBtnIndex) {
      i = Math.floor(r_PlayerData.PlayerData.data.bagInfo.bag2BoxCount / _ctor.MaxOneLine);
    } else {
      3 == this.selectBtnIndex && (i = Math.floor(r_PlayerData.PlayerData.data.bagInfo.bag3BoxCount / _ctor.MaxOneLine));
    }
    if (i < _ctor.MaxLine) {
      i += 1;
    } else {
      i = _ctor.MaxLine;
    }
    this.list.numItems = i;
  };
  _ctor.Inst = null;
  _ctor.itemHeight = 344;
  _ctor.offset = 240;
  _ctor.MaxOneLine = 3;
  _ctor.MaxLine = 20;
  __decorate([r_DecorateFunction1.AutoFind("btnClose")], _ctor.prototype, "btnClose", undefined);
  __decorate([r_DecorateFunction1.AutoFind("list")], _ctor.prototype, "list", undefined);
  __decorate([r_DecorateFunction1.AutoFind("goodsInfoLayer")], _ctor.prototype, "goodsInfoLayer", undefined);
  __decorate([r_DecorateFunction1.AutoFind("goodsInfoLayer/goodsBg")], _ctor.prototype, "goodsBg", undefined);
  __decorate([r_DecorateFunction1.AutoFind("goodsInfoLayer/goodsInfo")], _ctor.prototype, "goodsInfo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBagType")], _ctor.prototype, "btnBagType", undefined);
  __decorate([r_DecorateFunction1.AutoFind("finger")], _ctor.prototype, "finger", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.BagGoodsUI = exp_BagGoodsUI;