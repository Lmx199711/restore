var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrintCardUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PrinterCfg = require("PrinterCfg");
var r_PrinterCommon = require("PrinterCommon");
var r_NewCardUI = require("NewCardUI");
var r_PlayerData = require("PlayerData");
var r_LevelUpUI = require("LevelUpUI");
var r_CardGroupFinishUI = require("CardGroupFinishUI");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
var r_PrinterUI = require("PrinterUI");
var r_RoleSystem = require("RoleSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_FguiResSystem = require("FguiResSystem");
var exp_PrintCardUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Printer, r_UIDef.UIDef.Res.UI.PrintCardUI) || this;
    t.isOpened = [];
    t.newCardInfoList = [];
    t.finishGroupList = [];
    t.score = 0;
    t.printCardList = [];
    t.openCount = 0;
    t.timeoutIndex = -1;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PrintCardUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PrintCardUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").onClick(this.hide, this);
    this.contentPane.getChild("btnOpenAll").onClick(this.openAll, this);
    this.contentPane.getChild("btnPrint").onClick(function () {
      t.printCard(t.data.printerType, t.data.count);
    }, this);
    this.contentPane.getChild("btnPrintVideo").onClick(function () {
      t.printCard(t.data.printerType, t.data.count, true);
    }, this);
    this.contentPane.visible = false;
    r_ResSystem.ResSystem.loadBundleRes("game3", "printer/prefab/printerAnim", cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      var i = cc.instantiate(o);
      t.contentPane.getChild("center").node.addChild(i);
      t.printerAnim = i.getComponent(sp.Skeleton);
      t.contentPane.visible = true;
      t.showPrinterAnim();
    });
    r_ResSystem.ResSystem.loadBundleRes("game3", "printer/prefab/cardAnim", cc.Prefab, function (e, o) {
      t.cardAnimPrefab = o;
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.initItem();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TYIndex.UIWind.get(r_UIDef.UIDef.Urls.UI.PrinterUI).redPoint();
  };
  _ctor.prototype.printCard = function (e, t, o) {
    var i = this;
    undefined === o && (o = false);
    if (o) {
      r_PlatformSystem.PlatformSystem.showVideo("打印机五连抽", function () {
        r_SoundMgr.SoundMgr.playSound("printer/出卡动画音效" + t);
        i.initItem();
      });
    } else {
      var n = r_PrinterCfg.PrinterInfo[e].cost * t;
      if (r_PlayerData.PlayerData.isCoinEnough(n)) {
        r_PlayerData.PlayerData.deleteCoin("打印机扣钱", n);
        r_SoundMgr.SoundMgr.playSound("printer/出卡动画音效" + t);
        this.initItem();
      } else {
        r_UtilsSystem.UtilsSystem.showTip("钱不够~");
      }
    }
  };
  _ctor.prototype.initItem = function () {
    this.createCardList(this.data.printerType, this.data.count);
    var e = this.printCardList;
    for (var t = 0; t < 5; t++) {
      var o = this.contentPane.getChild("card" + t).asCom;
      if (t < e.length) {
        var i = e[t];
        o.visible = true;
        o.node.scale = 1;
        o.getChild("qualityIcon").asLoader.url = r_PrinterCommon.PrinterCommon.getQualityIcon(i);
        o.getChild("qualityBG").asLoader.url = r_PrinterCommon.PrinterCommon.getQualityBG(i);
        r_ResSystem.ResSystem.loadBundleFguiImg(o.getChild("icon"), "game3", "printer/girl/" + r_PrinterCommon.PrinterCommon.getSmallIcon(i));
        o.getController("c1").selectedIndex = 0;
        o.clearClick();
        o.onClick(this.openOne.bind(this, t), this);
      } else {
        o.visible = false;
      }
    }
    this.showPrinterAnim();
    this.isOpened.length = 0;
    this.openCount = 0;
    this.newCardInfoList.length = 0;
    this.finishGroupList.length = 0;
    this.score = 0;
    this.contentPane.getController("c2").selectedIndex = 0;
  };
  _ctor.prototype.createCardList = function (e, t) {
    this.printCardList.length = 0;
    for (var o = 0; o < t; o++) {
      var i = this.getOneCard(e);
      this.printCardList.push(i);
    }
    r_TYIndex.UIWind.get(r_UIDef.UIDef.Urls.UI.PrinterUI).setPrintCount();
  };
  _ctor.prototype.randOneCard = function (e, t) {
    var o = {
      type: 0,
      quality: 0,
      id: 0
    };
    o.type = r_PrinterCommon.PrinterCommon.randomRangeInt(0, 3);
    o.quality = t;
    r_PrinterUI.PrinterUI.comboBoxVal > 0 && (o.quality = r_PrinterUI.PrinterUI.comboBoxVal);
    o.id = r_PrinterCommon.PrinterCommon.randomRangeInt(0, r_PrinterCfg.CardInfo[o.quality].count);
    return o;
  };
  _ctor.prototype.getOneCard = function (e) {
    if (!r_PrinterCommon.PrinterCommon.getData("caidan0_finish") && r_PrinterCommon.PrinterCommon.getData("caidan0_clean") && r_PrinterCommon.PrinterCommon.getData("caidan0_screw")) {
      r_PrinterCommon.PrinterCommon.setData("caidan0_finish", true);
      r_TYIndex.UIWind.get(r_UIDef.UIDef.Urls.UI.PrinterUI).setPrinterIcon(0);
      return this.randOneCard(e, r_PrinterCfg.CardQuality.SR);
    }
    if (2 == r_PrinterCommon.PrinterCommon.getData("caidan1")) {
      r_PrinterCommon.PrinterCommon.setData("caidan1", 3);
      r_TYIndex.UIWind.get(r_UIDef.UIDef.Urls.UI.PrinterUI).setPrinterIcon(1);
      return this.randOneCard(e, r_PrinterCfg.CardQuality.SSR);
    }
    r_PrinterCommon.PrinterCommon.addPrintCardCount(e);
    var t = this.checkLeastQuality(e);
    if (t) {
      return t;
    }
    var o = r_PrinterCfg.PrinterInfo[e];
    var i = Math.random();
    var n = 0;
    var l = 0;
    for (var u = 0; u < o.rate.length; u++) {
      if (i < (n += o.rate[u])) {
        l = u;
        break;
      }
    }
    var h = this.randOneCard(e, l);
    this.clearPrintCardCount(e, h.quality);
    return h;
  };
  _ctor.prototype.checkLeastQuality = function (e) {
    var t = r_PrinterCfg.LeastQuality[e];
    for (var o = t.count.length - 1; o >= 0; o--) {
      if (r_PrinterCommon.PrinterCommon.getPrintCardCount(e, t.count[o]) >= t.count[o]) {
        var i = 0;
        var n = 0;
        var a = Math.random();
        for (var s = 0; s < t.rate[o].length; s++) {
          if (a < (i += t.rate[o][s])) {
            n = t.quality[o][s];
            break;
          }
        }
        var l = this.randOneCard(e, n);
        console.log("保底卡：" + l);
        this.clearPrintCardCount(e, l.quality);
        return l;
      }
    }
  };
  _ctor.prototype.clearPrintCardCount = function (e, t) {
    var o = r_PrinterCfg.LeastQuality[e];
    for (var i = o.count.length - 1; i >= 0; i--) {
      t >= o.quality[i][0] && r_PrinterCommon.PrinterCommon.setPrintCardCount(e, o.count[i], 0);
    }
  };
  _ctor.prototype.showPrinterAnim = function () {
    var e = this;
    this.contentPane.getController("c1").selectedIndex = 1;
    if (this.printerAnim) {
      this.printerAnim.setAnimation(0, this.data.printerType + 1 + "_" + (1 == this.printCardList.length ? 2 : 3), false);
      r_TimeSystem.TimeSystem.scheduleOnce("printerAnim", 1, function () {
        e.contentPane.getController("c1").selectedIndex = 0;
      });
    }
  };
  _ctor.prototype.openCard = function (e, t) {
    var o = this;
    if (!this.isOpened[e]) {
      this.isOpened[e] = true;
      var i = this.printCardList[e];
      var n = this.contentPane.getChild("card" + e).asCom;
      this.playOneAnim(n, function () {
        var e = 0;
        if (!r_PrinterCommon.PrinterCommon.cardList.some(function (e) {
          return e.type == i.type && e.quality == i.quality && e.id == i.id;
        })) {
          r_PrinterCommon.PrinterCommon.cardList.push(i);
          r_PrinterCommon.PrinterCommon.setData("cardList", r_PrinterCommon.PrinterCommon.cardList);
          e = r_PrinterCfg.CardInfo[i.quality].score;
        }
        if (i.quality < 2 || r_PrinterCommon.PrinterCommon.curCardList.some(function (e) {
          return e.type == i.type && e.quality == i.quality && e.id == i.id;
        })) {
          var a = r_PrinterCfg.CardInfo[i.quality].sell;
          n.getController("c1").selectedIndex = 2;
          n.getChild("price").asTextField.text = "+" + r_UtilsSystem.UtilsSystem.getShowCoin(a);
          n.getChild("desc").asTextField.text = i.quality < 2 ? "已分解" : "重复已分解";
          r_PlayerData.PlayerData.addDiamond(r_RoleSystem.ExpType.其它, a);
        } else {
          n.getController("c1").selectedIndex = 1;
          r_PrinterCommon.PrinterCommon.curCardList.push(i);
          r_PrinterCommon.PrinterCommon.setData("curCardList", r_PrinterCommon.PrinterCommon.curCardList);
          o.newCardInfoList.push({
            card: i,
            score: e
          });
          if (i.quality > 1 && o.cardAnimPrefab) {
            var s = n.getChild("center").node.getChildByName("anim");
            if (!s) {
              s = cc.instantiate(o.cardAnimPrefab);
              n.getChild("center").node.addChild(s);
              s.name = "anim";
            }
            s.getComponent(sp.Skeleton).setAnimation(0, r_PrinterCfg.CardQuality[i.quality].toLowerCase(), true);
            r_SoundMgr.SoundMgr.playSound("printer/卡牌发背光_01");
          }
        }
        o.openCount++;
        o.openCount >= o.printCardList.length && (o.contentPane.getController("c2").selectedIndex = 1 == o.printCardList.length ? 1 : 0 != o.data.printerType && 5 == o.data.count ? 3 : 2);
        t && t();
      });
    }
  };
  _ctor.prototype.playOneAnim = function (e, t) {
    cc.Tween.stopAllByTarget(e.node);
    e.node.scale = 1;
    cc.tween(e.node).to(.25, {
      scaleX: 0
    }).call(function () {
      t && t();
    }).to(.25, {
      scaleX: 1
    }).call(function () {}).start();
  };
  _ctor.prototype.openOne = function (e) {
    var t = this;
    r_SoundMgr.SoundMgr.playSound("printer/卡牌翻转_01");
    this.openCard(e, function () {
      -1 != t.timeoutIndex && clearTimeout(t.timeoutIndex);
      t.timeoutIndex = setTimeout(function () {
        t.showNewCard();
      }, 250);
    });
  };
  _ctor.prototype.openAll = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("printer/卡牌翻转_01");
    var t = this.printCardList;
    var o = function (o) {
      var n = o;
      i.openCard(o, function () {
        if (n == t.length - 1) {
          -1 != e.timeoutIndex && clearTimeout(e.timeoutIndex);
          e.timeoutIndex = setTimeout(function () {
            e.showNewCard();
          }, 250);
        }
      });
    };
    var i = this;
    for (var n = 0; n < t.length; n++) {
      o(n);
    }
  };
  _ctor.prototype.showNewCard = function () {
    var e = this;
    if (0 != this.newCardInfoList.length) {
      var t = this.newCardInfoList.pop();
      r_PrinterCommon.PrinterCommon.checkCardGroup(t.card.type) && this.finishGroupList.push(t.card.type);
      this.score += t.score;
      r_NewCardUI.NewCardUI.showUI({
        card: t.card,
        score: t.score,
        btnGet: true,
        closeCallback: function () {
          setTimeout(function () {
            e.showNewCard();
          }, 20);
        }
      });
    } else {
      r_PrinterCommon.PrinterCommon.collectScore += this.score;
      this.score = 0;
      var o = r_PrinterCommon.PrinterCommon.calculateCollectLevel();
      if (o > r_PrinterCommon.PrinterCommon.collectLevel) {
        r_PrinterCommon.PrinterCommon.collectLevel = o;
        r_LevelUpUI.LevelUpUI.showUI({
          closeCallback: function () {}
        });
      }
    }
  };
  _ctor.prototype.showCardGroupFinish = function () {
    var e = this;
    if (0 != this.finishGroupList.length) {
      var t = this.finishGroupList.pop();
      r_CardGroupFinishUI.CardGroupFinishUI.showUI({
        type: t,
        closeCallback: function () {
          e.showCardGroupFinish();
        }
      });
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.PrintCardUI = exp_PrintCardUI;