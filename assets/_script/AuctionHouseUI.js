var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_AuctionHouseSystem = require("AuctionHouseSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_BaseWin = require("BaseWin");
var r_AuctionHouseResultUI = require("AuctionHouseResultUI");
var def_AuctionHouseUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.AuctionHouse, r_UIDef.UIDef.Res.UI.AuctionHouseUI) || this;
    t.showAnimFlag = false;
    t.lastIsMe = false;
    t.bubbles = [];
    t.chujia = [];
    t.m_npcList = [];
    t.waitTime = 3;
    t.overTimes = 3;
    t.timesTime = 3;
    t.m_overTimes = 1;
    t.m_id = 1;
    t.m_isGame = false;
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.AuctionHouseUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.AuctionHouseUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    for (var t = 0; t < 3; t++) {
      var o = this.contentPane.getChild("bubble" + t);
      this.bubbles.push(o);
      var i = this.contentPane.getChild("chujia" + t);
      this.chujia.push(i);
    }
    this.labMax = this.scrn.getChild("labMax");
    this.bindBtnCallback(this.btnAdd0, this.btnAdd1, this.btnGuzhi);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ref__ctor.Inst = this;
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ref__ctor.Inst = null;
    r_TimeSystem.TimeSystem.scheduleClear("timeDownBid");
    r_TimeSystem.TimeSystem.scheduleClear("timeDownBid1");
    r_TimeSystem.TimeSystem.scheduleClear("gameover222");
    r_TimeSystem.TimeSystem.scheduleClear("gameover333");
    r_AuctionHouseSystem.AuctionHouseSystem.maxPrice = 0;
  };
  _ctor.prototype.restart = function () {
    this.contentPane.getTransition("init").play();
    r_UtilsSystem.UtilsSystem.playAnim(this.roleAnim, "step_1", true);
    this.gameStart();
    this.btnGuzhi.visible = false;
    this.lastIsMe = false;
    this.btnAdd0.visible = false;
    this.btnAdd1.visible = false;
    0 == r_AuctionHouseSystem.AuctionHouseSystem.currPrice && r_AuctionHouseSystem.AuctionHouseSystem.setRandomMaxPrice(this.m_id);
  };
  _ctor.prototype.gameStart = function () {
    var e = this;
    this.m_isGame = true;
    var t = r_AuctionHouseSystem.AuctionHouseSystem.getCfg(1);
    r_AuctionHouseSystem.AuctionHouseSystem.currPrice = t.startPrice;
    this.scrn.getChild("labCurrt").text = "当前价格：" + r_UtilsSystem.UtilsSystem.getShowCoin(t.startPrice, 1);
    this.scrn.getChild("labMax").text = "估值：？？？";
    this.contentPane.getTransition("start").play(function () {
      r_UtilsSystem.UtilsSystem.showBubble(e.timeDown, "起拍价" + r_UtilsSystem.UtilsSystem.getShowCoin(t.startPrice, 1) + "!,\n拍卖正式开始", e.bidStart.bind(e));
    });
  };
  _ctor.prototype.bidStart = function () {
    this.randomNpc();
    this.timeDownBid();
  };
  _ctor.prototype.randomNpc = function () {
    this.m_npcList = r_AuctionHouseSystem.AuctionHouseSystem.getRandomNpcList();
    this.timeDownBid();
  };
  _ctor.prototype.timeDownBid = function () {
    var e = this;
    if (this.m_npcList.length < 1 || this.checkMaxkPrice()) {
      this.timeDownOver();
    } else {
      r_TimeSystem.TimeSystem.scheduleOnce("timeDownBid", r_AuctionHouseSystem.AuctionHouseSystem.getRandomRoundTime(), function () {
        e.npcBid();
      });
    }
  };
  _ctor.prototype.timeDownOver = function () {
    var e = this;
    this.m_overTimes = 1;
    r_TimeSystem.TimeSystem.schedule("timeDownBid1", this.timesTime + .1, function () {
      if (e.m_overTimes > e.overTimes) {
        e.gameOver();
      } else {
        r_UtilsSystem.UtilsSystem.showBubble(e.timeDown, r_UtilsSystem.UtilsSystem.getShowCoin(r_AuctionHouseSystem.AuctionHouseSystem.currPrice, 1) + "！" + e.m_overTimes++ + "次");
      }
    });
  };
  _ctor.prototype.gameOver = function () {
    var e = this;
    r_TimeSystem.TimeSystem.scheduleClear("timeDownBid");
    r_TimeSystem.TimeSystem.scheduleClear("timeDownBid1");
    r_TimeSystem.TimeSystem.scheduleClear("gameover222");
    r_TimeSystem.TimeSystem.scheduleClear("gameover333");
    r_UtilsSystem.UtilsSystem.playAnim(this.roleAnim, "step_2", false);
    r_TimeSystem.TimeSystem.scheduleOnce("gameover222", 1, function () {
      r_UtilsSystem.UtilsSystem.playAnim(e.roleAnim, "step_1", true);
      r_UtilsSystem.UtilsSystem.showBubble(e.timeDown, r_UtilsSystem.UtilsSystem.getShowCoin(r_AuctionHouseSystem.AuctionHouseSystem.currPrice, 1) + "成交！");
    });
    r_TimeSystem.TimeSystem.scheduleOnce("gameover333", 3, function () {
      r_AuctionHouseResultUI.default.showUI({
        index: e.lastIsMe ? 0 : 1
      });
    });
    console.log("游戏结束");
    r_AuctionHouseSystem.AuctionHouseSystem.maxPrice = 0;
  };
  _ctor.prototype.checkMaxkPrice = function () {
    r_AuctionHouseSystem.AuctionHouseSystem.getCfg(1);
    return r_AuctionHouseSystem.AuctionHouseSystem.currPrice >= r_AuctionHouseSystem.AuctionHouseSystem.maxPrice;
  };
  _ctor.prototype.npcBid = function () {
    r_TimeSystem.TimeSystem.scheduleClear("timeDownBid");
    r_TimeSystem.TimeSystem.scheduleClear("timeDownBid1");
    r_TimeSystem.TimeSystem.scheduleClear("gameover222");
    r_TimeSystem.TimeSystem.scheduleClear("gameover333");
    this.bubbles[this.m_npcList[0]];
    var e = r_AuctionHouseSystem.AuctionHouseSystem.currPrice = r_AuctionHouseSystem.AuctionHouseSystem.currPrice + r_AuctionHouseSystem.AuctionHouseSystem.getRandomPrice(1);
    this.showBubble(this.m_npcList[0], "我出" + r_UtilsSystem.UtilsSystem.getShowCoin(e, 1) + "！", this.timeDownBid.bind(this));
    this.m_npcList.shift();
    this.scrn.getChild("labCurrt").text = "当前价格:" + r_UtilsSystem.UtilsSystem.getShowCoin(r_AuctionHouseSystem.AuctionHouseSystem.currPrice, 1);
    this.lastIsMe = false;
    this.btnAdd0.visible = true;
    this.btnAdd1.visible = true;
  };
  _ctor.prototype.bid = function (e) {
    r_TimeSystem.TimeSystem.scheduleClear("timeDownBid");
    r_TimeSystem.TimeSystem.scheduleClear("timeDownBid1");
    r_TimeSystem.TimeSystem.scheduleClear("gameover222");
    r_TimeSystem.TimeSystem.scheduleClear("gameover333");
    this.btnAdd0.visible = false;
    this.btnAdd1.visible = false;
    this.bubbleMe;
    var t = r_AuctionHouseSystem.AuctionHouseSystem.getCfg(this.m_id);
    var o = e ? t.addCoinList[0] : t.addCoinList[1];
    var i = r_AuctionHouseSystem.AuctionHouseSystem.currPrice = r_AuctionHouseSystem.AuctionHouseSystem.currPrice + o;
    this.showBubble(-1, "我出" + r_UtilsSystem.UtilsSystem.getShowCoin(i, 1) + "！", this.randomNpc.bind(this));
    this.scrn.getChild("labCurrt").text = "当前价格:" + r_UtilsSystem.UtilsSystem.getShowCoin(r_AuctionHouseSystem.AuctionHouseSystem.currPrice, 1);
    this.lastIsMe = true;
    this.btnAdd0.visible = false;
    this.btnAdd1.visible = false;
  };
  _ctor.prototype.onClickbtnAdd0 = function () {
    this.m_isGame && this.bid(true);
  };
  _ctor.prototype.onClickbtnAdd1 = function () {
    this.m_isGame && this.bid(false);
  };
  _ctor.prototype.onClickbtnGuzhi = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("拍卖会估值揭晓", function () {
      r_AuctionHouseSystem.AuctionHouseSystem.getCfg(e.m_id);
      e.labMax.text = "估值:" + r_UtilsSystem.UtilsSystem.getShowCoin(r_AuctionHouseSystem.AuctionHouseSystem.maxPrice, 1);
      e.btnGuzhi.visible = false;
    });
  };
  _ctor.prototype.showBubble = function (e, t, o) {
    var i = this;
    var n = -1 == e ? this.chujiaMe : this.chujia[e];
    n.visible = true;
    n.scaleY = 0;
    cc.Tween.stopAllByTarget(n);
    cc.tween(n).to(.2, {
      scaleY: 1
    }).call(function () {
      var a = -1 == e ? i.bubbleMe : i.bubbles[e];
      r_UtilsSystem.UtilsSystem.showBubble(a, t, function () {
        o && o();
        cc.tween(n).to(.2, {
          scaleY: 0
        }).start();
      });
    }).start();
  };
  __decorate([r_DecorateFunction1.AutoFind("scrn")], _ctor.prototype, "scrn", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bubbleMe")], _ctor.prototype, "bubbleMe", undefined);
  __decorate([r_DecorateFunction1.AutoFind("timeDown")], _ctor.prototype, "timeDown", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAdd0")], _ctor.prototype, "btnAdd0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAdd1")], _ctor.prototype, "btnAdd1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGuzhi")], _ctor.prototype, "btnGuzhi", undefined);
  __decorate([r_DecorateFunction1.AutoFind("chujiaMe")], _ctor.prototype, "chujiaMe", undefined);
  __decorate([r_DecorateFunction1.AutoFind("roleAnim")], _ctor.prototype, "roleAnim", undefined);
  return _ref__ctor = __decorate([r_DecorateFunction1.UIClass()], _ctor);
}(r_BaseWin.BaseWin);
exports.default = def_AuctionHouseUI;