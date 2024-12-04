var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_AnimSystem = require("AnimSystem");
var r_CaidanSystem = require("CaidanSystem");
var r_FguiGestureSys = require("FguiGestureSys");
var r_LotteryCountSystem = require("LotteryCountSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_Index = require("Index");
var r_BaseLottery = require("BaseLottery");
var def_WangPoUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Lottery2, r_UIDef.UIDef.Res.UI.WangPoUI) || this;
    t.animfeizis = [];
    t.btnSelects = [];
    t.items = [];
    t.price = [1e10, 100, 5e7, 1e9];
    t.bubbleStr = ["别问我，自己选呀", "别墨迹了，女孩子都等急了", "你莫不是看上了干娘我？"];
    t.bubbleStr2 = ["干娘给你发点零花钱", "他们为什么都说我大方？", "宝贝，探讨哲学吗？", "刚满十八岁~"];
    t.winId = 6010;
    t.touchNum = 0;
    return t;
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
    this.show(r_UIDef.UIDef.Urls.UI.WangPoUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.WangPoUI);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("onClickSelect");
    r_TimeSystem.TimeSystem.scheduleClear("onClickSelect1");
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    for (var t = 0; t < 9; t++) {
      var o = this.contentPane.getChild("item" + t).asCom;
      this.items.push(o);
    }
    for (t = 0; t < 4; t++) {
      var i = this.contentPane.getChild("animfeizi" + t);
      this.animfeizis.push(i);
      var n = this.contentPane.getChild("btnSelect" + t).asButton;
      n.clearClick();
      n.onClick(this.onClickSelect.bind(this, t));
      this.btnSelects.push(n);
    }
    r_FguiGestureSys.FguiGestureSys.bindMoveEvent("wangpoFlower", this.flower, this.flower, this.flowerTaget, this.hitSucc0.bind(this));
    this.bindBtnCallback(this.btnWangpo);
  };
  _ctor.prototype.restart = function () {
    e.prototype.restart.call(this);
    this.contentPane.getTransition("init").play();
    this.contentPane.getController("mode").selectedIndex = 0;
    this.touchNum = 0;
    this.setResult(false);
  };
  _ctor.prototype.setResult = function (e) {
    this.getCfg();
    if (r_Index.Platform.isDarenPlatform() || 0 == r_CaidanSystem.CaidanSystem.getCaidanNum(this.winId, 0)) {
      r_FguiGestureSys.FguiGestureSys.enableBiyId("wangpoFlower", true);
    } else {
      r_FguiGestureSys.FguiGestureSys.enableBiyId("wangpoFlower", false);
    }
    this.items.forEach(function (t) {
      if (e) {
        t.isWin = true;
        t.getChild("item").asLoader.url = "ui://Lottery2/mei_" + r_UtilsSystem.UtilsSystem.getRandomNum(0, 4);
        i = r_LotteryCountSystem.LotteryCountSystem.getCaidanCoin("WangpoCfg");
        t.getChild("num").text = r_UtilsSystem.UtilsSystem.getShowCoin(i);
        t.getChild("tip").visible = false;
        t.icon = i;
      } else {
        var o = r_LotteryCountSystem.LotteryCountSystem.getIsWin("WangpoCfg");
        t.isWin = o;
        t.getChild("item").asLoader.url = "ui://Lottery2/" + (o ? "mei_" : "chou_") + r_UtilsSystem.UtilsSystem.getRandomNum(0, 4);
        var i = r_LotteryCountSystem.LotteryCountSystem.getNumAward("WangpoCfg", o);
        t.getChild("num").text = r_UtilsSystem.UtilsSystem.getShowCoin(i);
        t.getChild("tip").visible = false;
        t.icon = i;
      }
    });
  };
  _ctor.prototype.cleanSuccess = function (e) {
    var t = this.contentPane.getChild("item" + e);
    if (t.isWin) {
      t.getChild("tip").visible = true;
      r_AnimSystem.AnimSystem.playCoinAnim(t.getChild("tip").node);
      r_PlayerData.PlayerData.addCoin("王婆彩票中奖", t.coin, r_ReportSystem.SystemKey.彩票);
    } else {
      t.getChild("tip").visible = false;
    }
  };
  _ctor.prototype.hitSucc0 = function () {
    var e = this;
    r_CaidanSystem.CaidanSystem.setCaidanNum(this.winId, 0, 1);
    r_UtilsSystem.UtilsSystem.playAnim(this.caidanAnim, "animation", false);
    this.contentPane.getTransition("t1").play(function () {
      e.contentPane.getController("mode").selectedIndex = 1;
      e.animfeizis.forEach(function (e) {
        r_UtilsSystem.UtilsSystem.playAnim(e, "step_1", true);
      });
      e.caidanAnim.visible = false;
    });
  };
  _ctor.prototype.cleanAllSuccess = function () {
    e.prototype.cleanAllSuccess.call(this);
    r_FguiGestureSys.FguiGestureSys.enableBiyId("wangpoFlower", false);
  };
  _ctor.prototype.onClickSelect = function (e) {
    var t = this;
    this.contentPane.getTransition("t2").play();
    this.animfeizis.forEach(function (e) {
      e.sortingOrder = 0;
    });
    this.animfeizis[e].sortingOrder = 100;
    r_UtilsSystem.UtilsSystem.playAnim(this.animfeizis[e], "step_2", false);
    r_TimeSystem.TimeSystem.scheduleOnce("onClickSelect", 1.3, function () {
      r_UtilsSystem.UtilsSystem.playAnim(t.animfeizis[e], "step_3", true);
      r_PlayerData.PlayerData.addCoin("王婆彩蛋", t.price[e], r_ReportSystem.SystemKey.彩票);
      t.setBubble2(t.bubbleStr2[e]);
    });
    r_TimeSystem.TimeSystem.scheduleOnce("onClickSelect1", 5, function () {
      t.contentPane.getController("mode").selectedIndex = 0;
      t.setResult(true);
    });
  };
  _ctor.prototype.onClickbtnWangpo = function () {
    var e = this;
    if (2 != this.touchNum) {
      var t = this.bubbleStr[this.touchNum];
      t && this.setBubble(t);
      this.touchNum++;
    } else {
      var o = this.bubbleStr[this.touchNum];
      o && this.setBubble(o, function () {
        e.btnSelects[0].visible = true;
      });
    }
  };
  _ctor.prototype.setBubble = function (e, t) {
    this.bubble.visible = true;
    this.bubble.alpha = 0;
    cc.Tween.stopAllByTarget(this.bubble);
    this.bubble.title = e;
    t && t();
    cc.tween(this.bubble).to(.5, {
      alpha: 1
    }).delay(2).to(.5, {
      alpha: 0
    }).start();
  };
  _ctor.prototype.setBubble2 = function (e, t) {
    this.bubble2.visible = true;
    this.bubble2.sortingOrder = 101;
    this.bubble2.alpha = 0;
    cc.Tween.stopAllByTarget(this.bubble2);
    this.bubble2.title = e;
    t && t();
    cc.tween(this.bubble2).to(.5, {
      alpha: 1
    }).delay(2).to(.5, {
      alpha: 0
    }).start();
  };
  __decorate([r_DecorateFunction1.AutoFind("flower")], _ctor.prototype, "flower", undefined);
  __decorate([r_DecorateFunction1.AutoFind("flowerTaget")], _ctor.prototype, "flowerTaget", undefined);
  __decorate([r_DecorateFunction1.AutoFind("caidanAnim")], _ctor.prototype, "caidanAnim", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnWangpo")], _ctor.prototype, "btnWangpo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bubble")], _ctor.prototype, "bubble", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bubble2")], _ctor.prototype, "bubble2", undefined);
  return __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseLottery.default);
exports.default = def_WangPoUI;