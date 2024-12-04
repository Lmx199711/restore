var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TouchGiftCom = undefined;
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_AnimSystem = require("AnimSystem");
var r_CoinSystem = require("CoinSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var d = 0;
var exp_TouchGiftCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.touchGifts = [];
    t.m_currTouchNum = 0;
    t.maxTouchNum = 100;
    t.m_hasGiftNum = 0;
    t.maxGiftNum = 5;
    t.awardCoeff = 20;
    t.isTouch = true;
    t.initAnimGiftPos = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onConstruct = function () {
    _ctor.Inst = this;
    this.proTouch = this.getChild("proTouch").asProgress;
    this.animGift = this.getChild("animGift");
    this.initAnimGiftPos = cc.v2(this.animGift.x, this.animGift.y);
    for (var e = 0; e < this.maxGiftNum; e++) {
      var o = this.getChild("touchGift_" + e);
      this.touchGifts.push(o);
      o.onClick(this.onClickGift.bind(this, e), this);
      o.enabled = o.visible = false;
    }
  };
  _ctor.prototype.restart = function () {
    this.getTransition("init").play();
    this.initPro();
  };
  _ctor.prototype.onEnable = function () {
    e.prototype.onEnable.call(this);
    r_TYEventDispatcher.TYEventDispatcher.on(r_TYEvent.EventDef.touchEarn, this.onTouchEvent, this);
  };
  _ctor.prototype.onDisable = function () {
    e.prototype.onDisable.call(this);
    r_TYEventDispatcher.TYEventDispatcher.off(r_TYEvent.EventDef.touchEarn, this.onTouchEvent, this);
    cc.Tween.stopAllByTarget(this);
  };
  _ctor.prototype.onTouchEvent = function () {
    if (this.isTouch) {
      this.m_currTouchNum++;
      this.checkMaxPro() && (this.cehckMaxGiftNum() || this.createGift());
      this.proTouch.value = this.m_currTouchNum;
    }
  };
  _ctor.prototype.checkMaxPro = function () {
    return this.m_currTouchNum >= this.maxTouchNum;
  };
  _ctor.prototype.cehckMaxGiftNum = function () {
    return this.m_hasGiftNum >= this.maxGiftNum;
  };
  _ctor.prototype.createGift = function () {
    this.moveGiftAction();
  };
  _ctor.prototype.moveGiftAction = function () {
    var e = this;
    var t = this.getGiftIndex();
    if (-1 != t) {
      this.getController("c1").selectedIndex = 1;
      this.m_hasGiftNum++;
      this.animGift.x = this.initAnimGiftPos.x;
      this.animGift.y = this.initAnimGiftPos.y;
      var o = this.touchGifts[t];
      this.isTouch = false;
      cc.Tween.stopAllByTarget(this);
      cc.tween(this.animGift).to(1, {
        x: o.x,
        y: o.y
      }).call(function () {
        e.showGift(t);
        e.initPro();
      }).start();
    }
  };
  _ctor.prototype.getGiftIndex = function () {
    return this.touchGifts.findIndex(function (e) {
      return !e.visible;
    });
  };
  _ctor.prototype.showGift = function (e) {
    this.touchGifts[e].visible = this.touchGifts[e].enabled = true;
    r_UtilsSystem.UtilsSystem.playAnim(this.touchGifts[e], "step_1", true);
  };
  _ctor.prototype.initPro = function () {
    this.getController("c1").selectedIndex = 0;
    this.m_currTouchNum = 0;
    this.proTouch.max = this.maxTouchNum;
    this.proTouch.value = 0;
    this.isTouch = true;
    this.m_hasGiftNum = 0;
  };
  _ctor.prototype.onClickGift = function (e) {
    this.giftVanish(e);
  };
  _ctor.prototype.giftVanish = function (e) {
    var t = this;
    this.m_hasGiftNum--;
    var o = this.touchGifts[e];
    if (o) {
      o.enabled = false;
      r_UtilsSystem.UtilsSystem.playAnim(o, "step_2", false);
      r_TimeSystem.TimeSystem.scheduleOnce("giftVanish" + ++d, .3, function () {
        o.visible = false;
        t.playAddCoin(e);
      });
    }
  };
  _ctor.prototype.playAddCoin = function (e) {
    var t = this.touchGifts[e];
    r_AnimSystem.AnimSystem.playCoinAnim2(t.node);
    var o = r_CoinSystem.CoinSystem.getClickCoin() * this.awardCoeff;
    r_PlayerData.PlayerData.addCoin("点击100获得礼包", o, r_ReportSystem.SystemKey.点击系统);
  };
  _ctor.Inst = null;
  return _ctor;
}(fgui.GComponent);
exports.TouchGiftCom = exp_TouchGiftCom;