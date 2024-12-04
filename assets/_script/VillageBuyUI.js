var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VillageBuyUI = undefined;
var r_UIDef = require("UIDef");
var r_BagSystem = require("BagSystem");
var r_FguiResSystem = require("FguiResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayGameLimitSystem = require("PlayGameLimitSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_DialogueUI = require("DialogueUI");
var v = {
  goodsList: [1, 2, 3, 4, 5, 6, 7, 8, 12, 13, 14, 15, 16, 25, 26, 27, 28, 33, 34, 36, 37, 39],
  goodsNameList: ["忒少哟", "闻相", "快前虽", "阔洛", "窗扣铁", "免摸", "木鱼漏", "负福拼", "刘奈", "丑子", "晓李福", "相虽", "冒抬", "银伸", "瘦半", "刘年", "薄闻倍", "没归发", "晓丹高", "谈过", "晓新弯藕", "均子", "吵摆保保"],
  upRate: [.35, .6, .8, 1.2],
  goodsRandCount: [5, 10, 15, 20],
  first: .2,
  maxCount: 100
};
var exp_VillageBuyUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.GoodsShop, r_UIDef.UIDef.Res.UI.VillageBuyUI) || this;
    t.initHairPos = null;
    t.money = 0;
    t.curDouble = 0;
    t.caidan = false;
    t.time = 0;
    t.clickCount = 0;
    t.buyItemList = [];
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.VillageBuyUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.VillageBuyUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack.onClick(this.hide, this);
    this.btnFanyi.onClick(this.onClickFanyi, this);
    this.btnSell.onClick(this.onClickSell, this);
    this.btnHuanJia.onClick(this.onClickHuanJia, this);
    this.btnAgain.onClick(this.onClickAgain, this);
    for (var t = 0; t < 4; t++) {
      this.buyItemList[t] = this.contentPane.getChild("buyItem" + (t + 1));
    }
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    r_ResSystem.ResSystem.loadBundleRes("bundle2", "roleAnim/小强", cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      t.role.node.removeAllChildren();
      var i = cc.instantiate(o);
      t.role.node.addChild(i);
      t.registHairTouch();
    });
    this.lbSay.text = "搞快一点，时间就是金钱";
    this.caidan = false;
    this.money = 0;
    this.time = 0;
    this.clickCount = 0;
    this.contentPane.getController("c1").selectedIndex = 0;
    if (r_PlayGameLimitSystem.PlayGameLimitSystem.getPlayGameRemainCount(r_PlayGameLimitSystem.playGameLimitEnum.小强收购) <= 0) {
      this.contentPane.getController("c1").selectedIndex = 1;
      r_PlayerData.PlayerData.data.riverHaiBoDong.curGoodsList = [];
      r_PlayerData.PlayerData.data.riverHaiBoDong.curDouble = .2;
      r_PlayerData.PlayerData.data.riverHaiBoDong.isFanYi = 0;
      r_PlayerData.PlayerData.data.riverHaiBoDong.curDoubleCount = 0;
    }
    this.btnFanyi.visible = true;
    r_PlayerData.PlayerData.data.riverHaiBoDong.isFanYi && (this.btnFanyi.visible = false);
    r_PlayerData.PlayerData.data.riverHaiBoDong.isCancaidan && r_PlayerData.PlayerData.data.riverHaiBoDong.curDouble < 1 && (r_PlayerData.PlayerData.data.riverHaiBoDong.curDouble += 3);
    this.refreshNeedGoods();
  };
  _ctor.prototype.registHairTouch = function () {
    var e = this;
    var t = this.role.node.getChildByName("anim");
    t.off(cc.Node.EventType.TOUCH_START);
    t.on(cc.Node.EventType.TOUCH_START, function (t) {
      t.getLocation();
      e.clickCount += 1;
      var o = new Date().getTime();
      if (e.time) {
        if (o - e.time <= 1e3) {
          if (e.clickCount > 3) {
            e.hide();
            r_TimeSystem.TimeSystem.scheduleOnce("VillageBuyUI", .2, function () {
              r_DialogueUI.DialogueUI.showUI(503);
            });
          }
        } else {
          e.clickCount = 0;
          e.time = new Date().getTime();
        }
      } else {
        e.time = new Date().getTime();
      }
    }, this);
    if (r_PlayerData.PlayerData.data.riverHaiBoDong.isCancaidan) {
      t.off(cc.Node.EventType.TOUCH_START);
      t.off(cc.Node.EventType.TOUCH_MOVE);
      t.off(cc.Node.EventType.TOUCH_END);
    }
  };
  _ctor.prototype.getOtherName = function (e) {
    var t = 0;
    for (var o = 0; o < v.goodsList.length; o++) {
      if (v.goodsList[o] == e) {
        t = o;
        break;
      }
    }
    return v.goodsNameList[t];
  };
  _ctor.prototype.isCanSell = function () {
    var e = true;
    for (var t = 0; t < r_PlayerData.PlayerData.data.riverHaiBoDong.curGoodsList.length; t++) {
      var o = r_PlayerData.PlayerData.data.riverHaiBoDong.curGoodsList[t];
      if (!r_BagSystem.BagSystem.getPlayerGoodsInfoById(o)) {
        e = false;
        break;
      }
      if (r_BagSystem.BagSystem.getPlayerGoodsInfoById(o).num < r_PlayerData.PlayerData.data.riverHaiBoDong.curGoodsCountList[t]) {
        e = false;
        break;
      }
    }
    return e;
  };
  _ctor.prototype.refreshNeedGoods = function () {
    this.money = 0;
    if (r_PlayerData.PlayerData.data.riverHaiBoDong.curGoodsList.length <= 0) {
      for (var e = 0; e < 4; e++) {
        for (var t = r_UtilsSystem.UtilsSystem.getRandomFromArr(v.goodsList); -1 != r_PlayerData.PlayerData.data.riverHaiBoDong.curGoodsList.indexOf(t);) {
          t = r_UtilsSystem.UtilsSystem.getRandomFromArr(v.goodsList);
        }
        r_PlayerData.PlayerData.data.riverHaiBoDong.curGoodsList.push(t);
        r_PlayerData.PlayerData.data.riverHaiBoDong.curGoodsCountList.push(r_UtilsSystem.UtilsSystem.getRandomFromArr(v.goodsRandCount));
      }
    }
    for (e = 0; e < r_PlayerData.PlayerData.data.riverHaiBoDong.curGoodsList.length; e++) {
      var o = r_PlayerData.PlayerData.data.riverHaiBoDong.curGoodsList[e];
      var i = 0;
      if (r_PlayerData.PlayerData.data.riverHaiBoDong.isFanYi) {
        this.buyItemList[e].getChild("lbName").text = r_BagSystem.BagSystem.getGoodsInfoById(o).name;
      } else {
        this.buyItemList[e].getChild("lbName").text = r_BagSystem.BagSystem.getGoodsInfoById(o).fangyan;
      }
      if (r_BagSystem.BagSystem.getPlayerGoodsInfoById(o)) {
        (i = r_BagSystem.BagSystem.getPlayerGoodsInfoById(o).num) > r_PlayerData.PlayerData.data.riverHaiBoDong.curGoodsCountList[e] && (i = r_PlayerData.PlayerData.data.riverHaiBoDong.curGoodsCountList[e]);
        this.buyItemList[e].getChild("lbCount").text = r_BagSystem.BagSystem.getPlayerGoodsInfoById(o).num + "/" + r_PlayerData.PlayerData.data.riverHaiBoDong.curGoodsCountList[e];
      } else {
        i = 0;
        this.buyItemList[e].getChild("lbCount").text = "0/" + r_PlayerData.PlayerData.data.riverHaiBoDong.curGoodsCountList[e];
      }
      this.buyItemList[e].getChild("lbValue").text = r_UtilsSystem.UtilsSystem.numFormats(r_BagSystem.BagSystem.getGoodsInfoById(o).value, 1);
      if (r_PlayerData.PlayerData.data.riverHaiBoDong.curDouble > 0) {
        this.buyItemList[e].getController("c1").selectedIndex = 1;
        var n = parseFloat((1 + r_PlayerData.PlayerData.data.riverHaiBoDong.curDouble).toFixed(2));
        this.buyItemList[e].getChild("lbUp").text = Math.ceil(100 * n) + "%";
      } else {
        this.buyItemList[e].getController("c1").selectedIndex = 0;
      }
      this.buyItemList[e].getChild("lbMoney").text = r_UtilsSystem.UtilsSystem.numFormats(r_PlayerData.PlayerData.data.riverHaiBoDong.curGoodsCountList[e] * r_BagSystem.BagSystem.getGoodsInfoById(o).value * (1 + r_PlayerData.PlayerData.data.riverHaiBoDong.curDouble), 1);
      this.money += i * r_BagSystem.BagSystem.getGoodsInfoById(o).value * (1 + r_PlayerData.PlayerData.data.riverHaiBoDong.curDouble);
    }
    this.lbTotal.text = "收购总价：" + r_UtilsSystem.UtilsSystem.numFormats(this.money, 1);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onClickFanyi = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("小强收购翻译", function () {
      r_PlayerData.PlayerData.data.riverHaiBoDong.isFanYi = 1;
      e.btnFanyi.visible = false;
      e.refreshNeedGoods();
    });
  };
  _ctor.prototype.onClickHuanJia = function () {
    var e = this;
    if (r_PlayerData.PlayerData.data.riverHaiBoDong.curDoubleCount >= v.maxCount) {
      r_UtilsSystem.UtilsSystem.showTip("不能再加了，要破产了");
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("小强收购讨价还价", function () {
        r_PlayerData.PlayerData.data.riverHaiBoDong.curDouble += r_UtilsSystem.UtilsSystem.getRandomFromArr(v.upRate);
        r_PlayerData.PlayerData.data.riverHaiBoDong.curDouble = parseFloat(r_PlayerData.PlayerData.data.riverHaiBoDong.curDouble.toFixed(2));
        r_PlayerData.PlayerData.data.riverHaiBoDong.curDoubleCount += 1;
        e.refreshNeedGoods();
      });
    }
  };
  _ctor.prototype.onClickAgain = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("小强收购刷新", function () {
      e.contentPane.getController("c1").selectedIndex = 0;
      r_PlayGameLimitSystem.PlayGameLimitSystem.recoverPlayGameCount(r_PlayGameLimitSystem.playGameLimitEnum.小强收购);
      e.refreshNeedGoods();
    });
  };
  _ctor.prototype.onClickSell = function () {
    if (this.isCanSell()) {
      for (var e = 0; e < r_PlayerData.PlayerData.data.riverHaiBoDong.curGoodsList.length; e++) {
        var t = r_PlayerData.PlayerData.data.riverHaiBoDong.curGoodsList[e];
        r_BagSystem.BagSystem.setPlayerGoodsInfoById(t, -r_PlayerData.PlayerData.data.riverHaiBoDong.curGoodsCountList[e]);
      }
      r_PlayerData.PlayerData.addCoin("小强收购", this.money);
      this.lbTotal.text = "收购总价：？？？";
      this.lbSay.text = "搞快一点，时间就是金钱";
      this.contentPane.getController("c1").selectedIndex = 1;
      r_PlayerData.PlayerData.data.riverHaiBoDong.isFanYi = 0;
      r_PlayerData.PlayerData.data.riverHaiBoDong.curGoodsList = [];
      r_PlayerData.PlayerData.data.riverHaiBoDong.curDouble = .2;
      r_PlayerData.PlayerData.data.riverHaiBoDong.isCancaidan && r_PlayerData.PlayerData.data.riverHaiBoDong.curDouble < 1 && (r_PlayerData.PlayerData.data.riverHaiBoDong.curDouble += 3);
      r_PlayerData.PlayerData.data.riverHaiBoDong.curDoubleCount = 0;
      r_PlayGameLimitSystem.PlayGameLimitSystem.setPlayGameInfoById(r_PlayGameLimitSystem.playGameLimitEnum.小强收购);
    } else {
      r_UtilsSystem.UtilsSystem.showTip("数量不够！");
    }
  };
  __decorate([r_DecorateFunction1.AutoFind("btnBack")], _ctor.prototype, "btnBack", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnFanyi")], _ctor.prototype, "btnFanyi", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSell")], _ctor.prototype, "btnSell", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnHuanJia")], _ctor.prototype, "btnHuanJia", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAgain")], _ctor.prototype, "btnAgain", undefined);
  __decorate([r_DecorateFunction1.AutoFind("role")], _ctor.prototype, "role", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbSay")], _ctor.prototype, "lbSay", undefined);
  __decorate([r_DecorateFunction1.AutoFind("lbTotal")], _ctor.prototype, "lbTotal", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.VillageBuyUI = exp_VillageBuyUI;