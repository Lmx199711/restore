var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_AnimSystem = require("AnimSystem");
var r_CaidanSystem = require("CaidanSystem");
var r_GirlsFriendSystem = require("GirlsFriendSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_LotteryTicketCfg = require("LotteryTicketCfg");
var r_TYIndex = require("TYIndex");
var r_EraseCom = require("EraseCom");
var r_SoundMgr = require("SoundMgr");
var def_GirlsFriendUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Lottery, r_UIDef.UIDef.Res.UI.GirlsFriendUI) || this;
    t.m_isComplete = false;
    t.m_isWin = false;
    t.m_coin = 0;
    t.m_giftNum = 0;
    t.m_addNum = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.GirlsFriendUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.GirlsFriendUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.imgGirl0 = this.contentPane.getChild("imgGirl0");
    this.imgGirl1 = this.contentPane.getChild("imgGirl1");
    this.labWeight0 = this.contentPane.getChild("labWeight0");
    this.labWeight1 = this.contentPane.getChild("labWeight1");
    this.m_initWeightPos = cc.v2(this.labWeight1.x, this.labWeight1.y);
    this.labAward = this.contentPane.getChild("labAward");
    this.exHit = this.contentPane.getChild("exHit");
    this.imgRou = this.contentPane.getChild("imgRou");
    this.imgRou.on(fgui.Event.TOUCH_BEGIN, this.onRouTouchBegin, this);
    this.imgRou.on(fgui.Event.TOUCH_MOVE, this.onRouTouchMove, this);
    this.imgRou.on(fgui.Event.TOUCH_END, this.onRouTouchEnd, this);
    this.m_initRouPos = cc.v2(this.imgRou.x, this.imgRou.y);
    this.curGirl = this.contentPane.getChild("curGirl");
    this.curGirl.on(fgui.Event.TOUCH_BEGIN, this.onCurTouchBegin, this);
    this.curGirl.on(fgui.Event.TOUCH_MOVE, this.onCurTouchMove, this);
    this.curGirl.on(fgui.Event.TOUCH_END, this.onCurTouchEnd, this);
    this.m_initCurPos = cc.v2(this.curGirl.x, this.curGirl.y);
    this.exGirl = this.contentPane.getChild("exGirl");
    this.m_initExPos = cc.v2(this.exGirl.x, this.exGirl.y);
    this.bubble0 = this.contentPane.getChild("bubble0");
    this.bubble1 = this.contentPane.getChild("bubble1");
    this.btnBack = this.contentPane.getChild("btnBack");
    this.btnBack.onClick(this.hide, this);
    this.btnDaren = this.contentPane.getChild("btnDaren");
    this.btnDaren.onClick(this.test, this);
    this.btnAgain = this.contentPane.getChild("btnAgain");
    this.btnAgain.onClick(this.onClickAgin, this);
    this.btnAgain.getChild("num").asLabel.text = r_UtilsSystem.UtilsSystem.numFormats(r_LotteryTicketCfg.BuyGirlsCoin, 0);
    this.btnTip = this.contentPane.getChild("btnTip").asButton;
    r_CaidanSystem.CaidanSystem.bindBtn("bitizhong", this.btnTip, "girlsCaidanVideo");
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/lottery/girlsFriend", cc.Prefab, function (e, o) {
      t.prefab = cc.instantiate(o);
      t.prefab.active = true;
      t.contentPane.getChild("center").node.addChild(t.prefab);
      t.eraseCom = t.prefab.getComponent(r_EraseCom.default);
      t.eraseCom.cleanSuccessCallBack = t.cleanSuccess.bind(t);
      t.eraseCom.cleanAllSuccessCallBack = t.cleanAllSuccess.bind(t);
      t.groupAnim = t.prefab.getChildByName("groupAnim");
      t.animChi = t.groupAnim.getChildByName("chi").getComponent(sp.Skeleton);
      t.animChi.setCompleteListener(t.onListerAnim.bind(t));
      t.animBian = t.prefab.getChildByName("animBian").getComponent(sp.Skeleton);
      t.restart();
    });
  };
  _ctor.prototype.test = function () {
    if (r_TYIndex.Platform.isDarenPlatform()) {
      this.m_giftNum = 5e8;
      this.restart();
    }
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.restart = function () {
    r_CaidanSystem.CaidanSystem.setIsVisibleAndState(this.btnTip, [r_PlayerData.PlayerData.data.girlsChanged, r_PlayerData.PlayerData.data.girlsJitui], r_PlayerData.PlayerData.data.girlsCaidanVideo);
    if (this.prefab) {
      this.eraseCom.startClean();
      this.imgRou.visible = false;
      if (0 == r_PlayerData.PlayerData.data.girlsJitui) {
        this.imgRou.visible = true;
        this.imgRou.x = this.m_initRouPos.x;
        this.imgRou.y = this.m_initRouPos.y;
      }
      if (r_TYIndex.Platform.isDarenPlatform()) {
        this.imgRou.visible = true;
        this.imgRou.x = this.m_initRouPos.x;
        this.imgRou.y = this.m_initRouPos.y;
      }
      this.curGirl.x = this.m_initCurPos.x;
      this.curGirl.y = this.m_initCurPos.y;
      this.exGirl.x = this.m_initExPos.x;
      this.exGirl.y = this.m_initExPos.y;
      this.labWeight1.scaleX = this.labWeight1.scaleY = 1;
      this.labWeight1.x = this.m_initWeightPos.x;
      this.labWeight1.y = this.m_initWeightPos.y;
      this.m_isComplete = false;
      var e = r_GirlsFriendSystem.GirlsFriendSystem.getRandomGirl();
      this.m_isWin = r_GirlsFriendSystem.GirlsFriendSystem.getResult();
      this.m_data = r_GirlsFriendSystem.GirlsFriendSystem.getSortGirls(e, this.m_isWin);
      this.m_coin = r_GirlsFriendSystem.GirlsFriendSystem.getNumAward(this.m_isWin);
      r_TYIndex.Platform.isDarenPlatform() && this.m_giftNum > 0 && (this.m_coin = this.m_giftNum);
      this.labAward.text = r_UtilsSystem.UtilsSystem.getShowCoin(this.m_coin);
      this.labWeight0.text = r_GirlsFriendSystem.GirlsFriendSystem.getGirlById(this.m_data[0]).weight + "";
      this.labWeight1.text = r_GirlsFriendSystem.GirlsFriendSystem.getGirlById(this.m_data[1]).weight + "";
      this.imgGirl0.url = "ui/lottery/grils/" + this.m_data[0];
      this.imgGirl1.url = "ui/lottery/grils/" + this.m_data[1];
      this.btnAgain.visible = false;
      this.groupAnim.active = false;
      this.animBian.node.active = false;
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClearAll();
    this.m_giftNum = 0;
    this.m_tween && this.m_tween.stop();
  };
  _ctor.prototype.cleanSuccess = function () {};
  _ctor.prototype.cleanAllSuccess = function () {
    if (this.m_isWin) {
      r_AnimSystem.AnimSystem.playCoinAnim(this.labAward.node);
      r_PlayerData.PlayerData.addCoin("比体重获得奖励", this.m_coin, r_ReportSystem.SystemKey.彩票);
    } else {
      r_UtilsSystem.UtilsSystem.showTip("哦吼,没中！");
      this.m_isComplete = true;
    }
    this.btnTip.visible = false;
    this.btnAgain.visible = true;
  };
  _ctor.prototype.onCurTouchBegin = function (e) {
    console.log(e.pos);
    this.m_isComplete && (!r_TYIndex.Platform.isDarenPlatform() && r_PlayerData.PlayerData.data.girlsChanged > 0 || (e.captureTouch(), this.m_initCurTouchPos = e.pos.clone()));
  };
  _ctor.prototype.onCurTouchMove = function (e) {
    var t = e.pos.sub(this.m_initCurTouchPos);
    this.curGirl.x = this.m_initCurPos.x + t.x;
    this.curGirl.y = this.m_initCurPos.y + t.y;
  };
  _ctor.prototype.onCurTouchEnd = function () {
    var e = this;
    if (this.exHit.x <= this.curGirl.x && this.exHit.x + this.exHit.width >= this.curGirl.x && this.exHit.y <= this.curGirl.y && this.exHit.y + this.exHit.height >= this.curGirl.y) {
      r_PlayerData.PlayerData.data.girlsChanged++;
      this.curGirl.x = this.m_initExPos.x;
      this.curGirl.y = this.m_initExPos.y;
      this.exGirl.x = this.m_initCurPos.x;
      this.exGirl.y = this.m_initCurPos.y;
      this.bubble0.visible = true;
      r_SoundMgr.SoundMgr.playSound("girls/呸渣男");
      this.bubble0.getChild("title").text = "呸，渣男！";
      this.btnAgain.visible = false;
      r_TimeSystem.TimeSystem.scheduleOnce("girlBubble", 2, function () {
        e.bubble0.visible = false;
        e.bubble1.visible = false;
        r_AnimSystem.AnimSystem.playCoinAnim(e.labAward.node);
        r_PlayerData.PlayerData.addCoin("比体重获得奖励", e.m_coin, r_ReportSystem.SystemKey.彩票);
        e.m_isComplete = false;
        e.btnAgain.visible = true;
      });
    } else {
      this.curGirl.x = this.m_initCurPos.x;
      this.curGirl.y = this.m_initCurPos.y;
      this.exGirl.x = this.m_initExPos.x;
      this.exGirl.y = this.m_initExPos.y;
    }
  };
  _ctor.prototype.onRouTouchBegin = function (e) {
    if (this.m_isComplete) {
      e.captureTouch();
      this.m_initTouchRouPos = e.pos.clone();
    }
  };
  _ctor.prototype.onRouTouchMove = function (e) {
    var t = e.pos.sub(this.m_initTouchRouPos);
    this.imgRou.x = this.m_initRouPos.x + t.x;
    this.imgRou.y = this.m_initRouPos.y + t.y;
  };
  _ctor.prototype.onRouTouchEnd = function () {
    var e = this;
    if (this.imgGirl1.x <= this.imgRou.x && this.imgGirl1.x + this.imgGirl1.width >= this.imgRou.x && this.imgGirl1.y <= this.imgRou.y && this.imgGirl1.y + this.imgGirl1.height >= this.imgRou.y) {
      r_PlayerData.PlayerData.data.girlsJitui++;
      this.imgRou.visible = false;
      this.btnAgain.visible = false;
      this.bubble1.visible = true;
      this.bubble1.getChild("title").text = "我最爱吃零食了";
      r_SoundMgr.SoundMgr.playSound("girls/我最爱吃零食了");
      r_TimeSystem.TimeSystem.scheduleOnce("eatAnimtion", 2, function () {
        e.bubble1.visible = false;
        e.groupAnim.active = true;
        r_SoundMgr.SoundMgr.playSound("girls/吃东西1");
        e.animChi.setAnimation(0, "jitui", false);
      });
    } else if (this.imgGirl0.x <= this.imgRou.x && this.imgGirl0.x + this.imgGirl0.width >= this.imgRou.x && this.imgGirl0.y <= this.imgRou.y && this.imgGirl0.y + this.imgGirl0.height >= this.imgRou.y) {
      this.imgRou.x = this.m_initRouPos.x;
      this.imgRou.y = this.m_initRouPos.y;
      this.bubble0.visible = true;
      r_SoundMgr.SoundMgr.playSound("girls/狗都不吃");
      this.bubble0.getChild("title").text = "狗都不吃！";
    } else {
      this.imgRou.x = this.m_initRouPos.x;
      this.imgRou.y = this.m_initRouPos.y;
    }
    r_TimeSystem.TimeSystem.scheduleOnce("girlBubble2", 2, function () {
      e.bubble0.visible = false;
      e.bubble1.visible = false;
    });
  };
  _ctor.prototype.onListerAnim = function () {
    if ("jitui" == this.animChi.animation) {
      r_SoundMgr.SoundMgr.playSound("girls/吃东西2");
      this.animChi.setAnimation(0, "naicha", false);
    } else if ("naicha" == this.animChi.animation) {
      r_SoundMgr.SoundMgr.playSound("girls/吃东西3");
      this.animChi.setAnimation(0, "rou", false);
    } else if ("rou" == this.animChi.animation) {
      this.animBian.node.active = true;
      this.groupAnim.active = false;
      r_SoundMgr.SoundMgr.playSound("girls/变身特效");
      this.animBian.setAnimation(0, "animation", false);
      r_TimeSystem.TimeSystem.scheduleOnce("yanchi22", .5, this.caidanResult.bind(this));
    }
  };
  _ctor.prototype.caidanResult = function () {
    var e = this;
    this.m_data[1] = this.m_data[1].slice(0, -1) + "2";
    this.labAward.text = r_UtilsSystem.UtilsSystem.getShowCoin(this.m_coin);
    this.labWeight0.text = r_GirlsFriendSystem.GirlsFriendSystem.getGirlById(this.m_data[0]).weight + "";
    this.imgGirl0.url = "ui/lottery/grils/" + this.m_data[0];
    this.imgGirl1.url = "ui/lottery/grils/" + this.m_data[1];
    var t = r_GirlsFriendSystem.GirlsFriendSystem.getGirlById(this.m_data[1]).weight;
    var o = this.labWeight1.y;
    var i = parseInt(this.labWeight1.text);
    this.m_tween = cc.tween(this.labWeight1).to(.5, {
      y: o - 300,
      scaleX: 1.5,
      scaleY: 1.5
    }).call(function () {
      e.labWeight1.text = i + "";
      r_TimeSystem.TimeSystem.timeUpdate(1, function (o) {
        e.labWeight1.text = Math.round(i + o * (t - i));
      });
    }).delay(2).to(.5, {
      y: o,
      scaleX: 1,
      scaleY: 1
    }).call(function () {
      r_TimeSystem.TimeSystem.scheduleOnce("caidanChi", 1, function () {
        e.bubble0.visible = false;
        e.bubble1.visible = false;
        r_AnimSystem.AnimSystem.playCoinAnim(e.labAward.node);
        r_PlayerData.PlayerData.addCoin("比体重获得奖励", e.m_coin, r_ReportSystem.SystemKey.彩票);
        e.m_isComplete = false;
        e.btnAgain.visible = true;
      });
    }).start();
  };
  Object.defineProperty(_ctor.prototype, "addNum", {
    set: function (e) {
      this.m_addNum = e;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.onClickAgin = function () {
    if (r_PlayerData.PlayerData.isCoinEnough(r_LotteryTicketCfg.BuyGirlsCoin)) {
      r_PlayerData.PlayerData.deleteCoin("女友彩票", r_LotteryTicketCfg.BuyGirlsCoin, r_ReportSystem.SystemKey.彩票);
      this.btnAgain.visible = false;
      this.restart();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("金币不足");
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_GirlsFriendUI;