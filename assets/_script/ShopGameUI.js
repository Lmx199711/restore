var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ShopSystem = require("ShopSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_ShopCfg = require("ShopCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_ShopCaidanUI = require("ShopCaidanUI");
var r_ShopResultUI = require("ShopResultUI");
var r_ShopRuleUI = require("ShopRuleUI");
var r_ShopTipUI = require("ShopTipUI");
var def_ShopGameUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Shop, r_UIDef.UIDef.Res.UI.ShopGameUI) || this;
    t.showAnimFlag = false;
    t.propList = [];
    t.isShowPrice = false;
    t.m_isRotate = false;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return false;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.ShopGameUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ShopGameUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.shopMap.init();
    for (var t = 0; t < 3; t++) {
      var o = this["shopItem" + t];
      o.on(fgui.Event.TOUCH_BEGIN, this.touchBegin.bind(this, t), this);
      o.on(fgui.Event.TOUCH_MOVE, this.touchMove.bind(this, t), this);
      o.on(fgui.Event.TOUCH_END, this.touchEnd.bind(this, t), this);
    }
    this.bindBtnCallback(this.btnRefresh, this.btnEnd, this.btnShow, this.btnRule, this.btnStart, this.btnStartVideo);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.touchBegin = function (e, t) {
    var o = r_ShopCfg.ShopPropCfg[this.propList[e]];
    if (o) {
      this.touchItem.url = "ui://Shop/" + o.name;
      this.touchItem.rotation = this["shopItem" + e].rotation;
      t.captureTouch();
      var i = t.pos;
      this.touchItem.x = this["shopItem" + e].x + this["shopItem" + e].width / 2 - this.touchItem.width / 2;
      this.touchItem.y = this["shopItem" + e].y + this["shopItem" + e].height / 2 - this.touchItem.height / 2;
      this.m_initTouchVect = cc.v2(this.touchItem.x, this.touchItem.y);
      this.m_initMoveVect = i.clone();
      this.m_isRotate = true;
    }
  };
  _ctor.prototype.touchMove = function (e, t) {
    var o = r_ShopCfg.ShopPropCfg[this.propList[e]];
    if (o) {
      var i = t.pos;
      if (cc.Vec2.distance(this.m_initMoveVect, i) > 10) {
        this.touchItem.visible = true;
        this.checkPlace(o, i);
        this.m_isRotate = false;
      }
    }
  };
  _ctor.prototype.touchEnd = function (e, t) {
    var o = this;
    this.touchItem.visible = false;
    var i = r_ShopCfg.ShopPropCfg[this.propList[e]];
    if (i) {
      if (this.m_isRotate && i.isRotate) {
        this["shopItem" + e].rotation = 0 == this["shopItem" + e].rotation ? 90 : 0;
        return void r_SoundMgr.SoundMgr.playSound("shop/旋转");
      }
      var n = t.pos;
      var a = this.checkPlace(i, n);
      if (a && a.isPlace) {
        this.shopMap.setPropToMap(i, a.matrix, this.touchItem.rotation);
        r_ShopSystem.ShopSystem.clearProp(this.propList[e]);
        if (r_ShopSystem.ShopSystem.props.length > 0) {
          this.propList[e] = r_ShopSystem.ShopSystem.getRandomShowPropOnce(this.propList);
        } else {
          this.propList[e] = null;
        }
        this["shopItem" + e].rotation = 0;
        r_SoundMgr.SoundMgr.playSound("shop/放置");
      }
      this.shopMap.showgridType();
      if (this.shopMap.checkSummonDragon()) {
        this.btnEnd.enabled = false;
        r_SoundMgr.SoundMgr.playSound("shop/龙珠");
        this.anim.visible = true;
        this.animMask.visible = true;
        r_UtilsSystem.UtilsSystem.playAnim(this.anim, "lz_1", false);
        r_TimeSystem.TimeSystem.scheduleOnce("lz_1", 3, function () {
          o.anim.visible = false;
          o.animMask.visible = false;
          r_ShopCaidanUI.default.showUI();
        });
      }
      this.refreshView();
    }
  };
  _ctor.prototype.checkPlace = function (e, t) {
    var o = t.sub(this.m_initMoveVect);
    this.touchItem.x = this.m_initTouchVect.x + o.x;
    this.touchItem.y = this.m_initTouchVect.y + o.y;
    var i = cc.v2(this.touchItem.x, this.touchItem.y);
    90 == this.touchItem.rotation && (i = r_ShopSystem.ShopSystem.getChange90to0(i, this.touchItem.width, this.touchItem.height));
    var n = cc.v2(i.x - this.shopMap.x + 29, i.y - this.shopMap.y + 29);
    var a = this.shopMap.getMatrixByPx(n);
    if (a) {
      return {
        isPlace: this.shopMap.checkPlace(a, e["grids" + this.touchItem.rotation]),
        matrix: a
      };
    } else {
      this.shopMap.showgridType();
      return null;
    }
  };
  _ctor.prototype.restart = function () {
    this.contentPane.getController("c1").selectedIndex = 0;
    if (0 == r_PlayerData.PlayerData.data.shopVideoNum) {
      this.btnStart.visible = true;
      this.btnStartVideo.visible = false;
    } else {
      this.btnStart.visible = false;
      this.btnStartVideo.visible = true;
    }
    r_ShopSystem.ShopSystem.initData();
    this.isShowPrice = false;
    this.propList = r_ShopSystem.ShopSystem.getRandomShowProp(3);
    this.refreshView();
    this.btnEnd.enabled = true;
    this.animMask.visible = false;
    this.anim.visible = false;
    this.shopMap.restart();
  };
  _ctor.prototype.refreshView = function () {
    this.labNum.text = r_ShopSystem.ShopSystem.props.length + "";
    this.setPropList();
  };
  _ctor.prototype.setPropList = function () {
    var e = this;
    this.propList.forEach(function (t, o) {
      var i = r_ShopCfg.ShopPropCfg[t];
      if (!i) {
        e["shopItem" + o].getChild("icon").url = "";
        e["shopItem" + o].getChild("labPrice").text = "";
        return void (e["labPrice" + o].text = "");
      }
      e["shopItem" + o].getChild("icon").url = "ui://Shop/" + i.name;
      e["shopItem" + o].getChild("labPrice").text = r_UtilsSystem.UtilsSystem.numFormats(i.price);
      e["shopItem" + o].getChild("labPrice").visible = e.isShowPrice;
      e["labPrice" + o].text = r_UtilsSystem.UtilsSystem.numFormats(i.price);
      e["labPrice" + o].visible = e.isShowPrice;
    });
  };
  _ctor.prototype.initView = function () {
    this.touchItem.visible = false;
  };
  _ctor.prototype.onClickbtnRefresh = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("双十一刷新商品", function () {
      e.propList = r_ShopSystem.ShopSystem.getRandomShowProp(3);
      e.refreshView();
      e.propList.forEach(function (t, o) {
        e["shopItem" + o].rotation = 0;
      });
    });
  };
  _ctor.prototype.onClickbtnEnd = function () {
    if (this.shopMap.checkFull()) {
      r_ShopResultUI.default.showUI({
        propList: this.shopMap.propIds,
        earn: 1
      });
    } else {
      r_ShopTipUI.default.showUI({
        propList: this.shopMap.propIds
      });
    }
  };
  _ctor.prototype.onClickbtnShow = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("双十一显示价格", function () {
      e.isShowPrice = true;
      e.setPropList();
    });
  };
  _ctor.prototype.onClickbtnRule = function () {
    r_ShopRuleUI.default.showUI();
  };
  _ctor.prototype.onClickbtnStart = function () {
    this.contentPane.getController("c1").selectedIndex = 1;
    r_PlayerData.PlayerData.data.shopVideoNum++;
    r_PlayerData.PlayerData.saveData();
  };
  _ctor.prototype.onClickbtnStartVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("双十一开始游戏", function () {
      e.contentPane.getController("c1").selectedIndex = 1;
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("shopMap")], _ctor.prototype, "shopMap", undefined);
  __decorate([r_DecorateFunction1.AutoFind("touchItem")], _ctor.prototype, "touchItem", undefined);
  __decorate([r_DecorateFunction1.AutoFind("shopItem0")], _ctor.prototype, "shopItem0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("shopItem1")], _ctor.prototype, "shopItem1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("shopItem2")], _ctor.prototype, "shopItem2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labNum")], _ctor.prototype, "labNum", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnEnd")], _ctor.prototype, "btnEnd", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnRefresh")], _ctor.prototype, "btnRefresh", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnShow")], _ctor.prototype, "btnShow", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnRule")], _ctor.prototype, "btnRule", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnStart")], _ctor.prototype, "btnStart", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnStartVideo")], _ctor.prototype, "btnStartVideo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("animMask")], _ctor.prototype, "animMask", undefined);
  __decorate([r_DecorateFunction1.AutoFind("anim")], _ctor.prototype, "anim", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labPrice0")], _ctor.prototype, "labPrice0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labPrice1")], _ctor.prototype, "labPrice1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("labPrice2")], _ctor.prototype, "labPrice2", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_ShopGameUI;