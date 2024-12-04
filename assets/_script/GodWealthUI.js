var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_GodWealthSystem = require("GodWealthSystem");
var r_DaySystem = require("DaySystem");
var r_UtilsSystem = require("UtilsSystem");
var r_EffectsCom = require("EffectsCom");
var r_PoolSystem = require("PoolSystem");
var r_TimeSystem = require("TimeSystem");
var r_GodWealthResultUI = require("GodWealthResultUI");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_SoundMgr = require("SoundMgr");
var r_PlatformSystem = require("PlatformSystem");
var r_FguiResSystem = require("FguiResSystem");
var def_GodWealthUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.GodWealth, r_UIDef.UIDef.Res.UI.GodWealthUI) || this;
    t.uiType = "fullScreen";
    t.m_awardsNum = [];
    t.m_awards = [];
    t.startFalg = false;
    t.m_index = 0;
    t.m_time = 0;
    t.isTimeOut = false;
    t.m_touchLen = 0;
    t.m_lastPos = null;
    t.m_curPos = null;
    t.m_isBaifo = false;
    t.m_num = 0;
    t.m_meritNum = 0;
    t.m_touchGod = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.GodWealthUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.GodWealthUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    r_PoolSystem.PoolSystem.createUIObjPool(this.godWealthAward, "ui://GodWealth/godWealthAward", 1, this.contentPane);
    r_PoolSystem.PoolSystem.createUIObjPool(r_PoolSystem.PoolSystem.MeritCom, "ui://GodWealth/MeritCom", 1, this.contentPane);
    r_PoolSystem.PoolSystem.createUIObjPool(r_PoolSystem.PoolSystem.MeritCom2, "ui://GodWealth/MeritCom2", 1, this.contentPane);
    this.godPro = this.contentPane.getChild("godPro");
    this.labName = this.contentPane.getChild("labName");
    this.tip = this.contentPane.getChild("tip");
    this.hand = this.contentPane.getChild("hand");
    this.btnLeft = this.contentPane.getChild("btnLeft");
    this.btnRight = this.contentPane.getChild("btnRight");
    this.btnStart = this.contentPane.getChild("btnStart");
    this.btnStart1 = this.contentPane.getChild("btnStart1");
    this.btnBack = this.contentPane.getChild("btnBack");
    this.center = this.contentPane.getChild("center");
    this.diName = this.contentPane.getChild("diName");
    this.imgGod = this.contentPane.getChild("imgGod");
    this.groupTime = this.contentPane.getChild("groupTime");
    this.imgMuyu = this.contentPane.getChild("imgMuyu");
    this.labTime = this.contentPane.getChild("labTime");
    this.spGod = this.contentPane.getChild("spGod");
    this.move = this.contentPane.getChild("move");
    this.spMuyu = this.contentPane.getChild("spMuyu");
    this.spEffect = this.contentPane.getChild("spEffect");
    this.spLight = this.contentPane.getChild("spLight");
    this.imgBubble = this.contentPane.getChild("imgBubble");
    this.labBubble = this.contentPane.getChild("labBubble");
    for (var o = 0; o < 3; o++) {
      this["spRole" + o] = this.contentPane.getChild("spRole" + o);
      var i = this["spRole" + o];
      i.animationName = "animation";
      i.loop = true;
      i.playing = true;
    }
    this.spEffect.animationName = "animation";
    this.spEffect.loop = true;
    this.spEffect.playing = true;
    r_ResSystem.ResSystem.loadBundleRes("game2", "godWealth/muyu", cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      t.ccspMuyu = cc.instantiate(o).getComponent(sp.Skeleton);
      t.spMuyu.node.addChild(t.ccspMuyu.node);
    });
    this.spMuyu.onClick(this.onClickMuyu, this);
    this.btnLeft.onClick(this.onClickLeft, this);
    this.btnRight.onClick(this.onClickRight, this);
    this.btnStart.onClick(this.onClickStart, this);
    this.btnStart1.onClick(this.onClickStart1, this);
    this.btnBack.onClick(this.hide, this);
    this.hand.node.on(fgui.Event.TOUCH_BEGIN, this.touchBegin, this);
    this.hand.on(fgui.Event.TOUCH_MOVE, this.touchMove, this);
    this.hand.on(fgui.Event.TOUCH_END, this.touchEnd, this);
    this.imgMuyu.node.on(fgui.Event.TOUCH_BEGIN, this.touchBeginMugun, this);
    this.imgMuyu.on(fgui.Event.TOUCH_MOVE, this.touchMoveMugun, this);
    this.imgMuyu.on(fgui.Event.TOUCH_END, this.touchEndMugun, this);
    this.initPos = cc.v2(this.hand.x, this.hand.y);
    this.awardPos = cc.v2(this.center.x, this.center.y);
    this.m_initposMuyu = cc.v2(this.imgMuyu.x, this.imgMuyu.y);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.instace = this;
    this.index = 0;
  };
  _ctor.prototype.onHide = function () {
    var o = this;
    e.prototype.onHide.call(this);
    _ctor.instace = null;
    this.m_awards.forEach(function (e) {
      r_PoolSystem.PoolSystem.revert(o.godWealthAward, e);
    });
    this.m_awards = [];
    this.m_awardsNum = [];
    r_TimeSystem.TimeSystem.scheduleClearAll();
  };
  Object.defineProperty(_ctor.prototype, "index", {
    set: function (e) {
      this.m_index = e;
      this.contentPane.getController("type").selectedIndex = e;
      this.restart();
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.restart = function () {
    this.m_awardsNum = [];
    this.m_awards = [];
    this.m_cfg = r_GodWealthSystem.GodWealthSystem.getCfg(this.m_index);
    if (this.m_cfg.day > r_DaySystem.DaySystem.getShowDay()) {
      this.contentPane.getController("lock").selectedIndex = 1;
    } else if (r_GodWealthSystem.GodWealthSystem.getIsCount(this.m_index)) {
      this.contentPane.getController("lock").selectedIndex = 0;
      this.hand.visible = false;
      this.tip.visible = false;
      this.btnStart.visible = !this.m_cfg.rule[r_GodWealthSystem.GodWealthSystem.getDayNum(this.m_index)];
      this.btnStart1.visible = this.m_cfg.rule[r_GodWealthSystem.GodWealthSystem.getDayNum(this.m_index)];
      this.btnStart.icon = r_GodWealthSystem.GodWealthSystem.getDayNum(this.m_index) < 1 ? "ui://GodWealth/开始搞钱" : "ui://GodWealth/再拜一次";
    } else {
      r_GodWealthSystem.GodWealthSystem.getIsCount(this.m_index) || (this.contentPane.getController("lock").selectedIndex = 2);
    }
    2 == this.m_index && (this.imgGod.url = 0 == r_PlayerData.PlayerData.data.godWealthOnce || cc.sys.platform == cc.sys.DESKTOP_BROWSER || cc.sys.platform == cc.sys.MOBILE_BROWSER ? "ui://GodWealth/05" : "ui://GodWealth/11");
    this.labName.text = this.m_cfg.name;
    this.btnRight.visible = true;
    this.btnLeft.visible = true;
    this.labName.visible = true;
    this.diName.visible = true;
    this.groupTime.visible = false;
  };
  _ctor.prototype.onClickLeft = function () {
    this.index = this.m_index - 1;
  };
  _ctor.prototype.onClickRight = function () {
    this.index = this.m_index + 1;
  };
  _ctor.prototype.onClickStart = function () {
    this.onStarts();
  };
  _ctor.prototype.onStarts = function () {
    r_PlayerData.PlayerData.data.godWealthNum++;
    r_PlayerData.PlayerData.saveData();
    if ((0 == r_PlayerData.PlayerData.data.godWealthOnce || cc.sys.platform == cc.sys.DESKTOP_BROWSER || cc.sys.platform == cc.sys.MOBILE_BROWSER) && 2 == this.m_index) {
      r_PlayerData.PlayerData.data.godWealthOnce++;
      this.contentPane.getController("lock").selectedIndex = 3;
      this.startFalg = true;
      this.m_meritNum = 0;
      this.godPro.value = this.m_meritNum;
      this.labName.text = this.m_cfg.name;
      this.btnRight.visible = true;
      this.btnLeft.visible = true;
      this.labName.visible = true;
      this.diName.visible = true;
      this.groupTime.visible = false;
      this.ccspMuyu.setAnimation(0, "muyu", false);
      this.ccspMuyu.timeScale = 0;
      this.spGod.animationName = "fozhu_1";
      this.spGod.playing = true;
      this.spGod.loop = false;
      this.btnRight.visible = false;
      this.btnLeft.visible = false;
      this.labBubble.text = "你功德不够，与fo无缘";
      this.labBubble.visible = true;
      return void (this.imgBubble.visible = true);
    }
    this.start();
  };
  _ctor.prototype.onClickStart1 = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("财神开始赚钱", function () {
      e.onStarts();
    });
  };
  _ctor.prototype.start = function () {
    this.contentPane.getController("lock").selectedIndex = 4;
    this.spEffect.visible = false;
    this.btnRight.visible = false;
    this.btnLeft.visible = false;
    this.hand.visible = true;
    this.tip.visible = true;
    this.btnStart.visible = false;
    this.hand.x = this.initPos.x;
    this.hand.y = this.initPos.y;
    this.m_time = this.m_cfg.time;
    this.startFalg = true;
    this.labName.visible = false;
    this.diName.visible = false;
    this.groupTime.visible = true;
    this.labTime.text = this.m_time + "";
    this.isTimeOut = false;
  };
  _ctor.prototype.timeUpdate = function () {
    this.labTime.text = --this.m_time + "";
    if (this.m_time <= 0) {
      r_TimeSystem.TimeSystem.scheduleClear("timeUpdate");
      this.gameOver();
    }
  };
  _ctor.prototype.touchBegin = function (e) {
    if (!this.isTimeOut) {
      r_TimeSystem.TimeSystem.schedule("timeUpdate", 1, this.timeUpdate.bind(this));
      this.isTimeOut = true;
      this.spEffect.visible = true;
    }
    e.captureTouch();
    this.tip.visible = false;
    this.m_pos = e.pos;
    this.hand.x = this.m_pos.x;
    this.hand.y = this.m_pos.y - 150;
    this.m_lastPos = this.m_pos.y;
    this.m_curPos = this.m_pos.y;
    this.m_isBaifo = false;
    this.m_touchLen = 0;
  };
  _ctor.prototype.touchMove = function (e) {
    this.m_pos = e.pos;
    this.hand.x = this.m_pos.x;
    this.hand.y = this.m_pos.y - 150;
    this.m_curPos = e.pos.y;
    this.m_touchLen += this.m_curPos - this.m_lastPos;
    if (this.m_isBaifo && this.m_touchLen < 200) {
      this.m_isBaifo = false;
      this.m_touchLen = 0;
      this.m_lastPos = this.m_curPos;
      this.m_num = 0;
      return void this.takeOnce();
    }
    if (this.m_touchLen > 200) {
      this.m_isBaifo = true;
      this.m_touchLen = 200;
    }
    this.m_touchLen < 0 && (this.m_touchLen = 0);
    this.m_lastPos = this.m_curPos;
  };
  _ctor.prototype.touchEnd = function () {
    this.m_pos = null;
  };
  _ctor.prototype.touchBeginMugun = function (e) {
    e.captureTouch();
    this.ccspMuyu.setAnimation(0, "muyu2", false);
    this.imgMuyu.alpha = 1;
    this.imgMuyu.x = e.pos.x;
    this.imgMuyu.y = e.pos.y - 150;
  };
  _ctor.prototype.touchMoveMugun = function (e) {
    this.imgMuyu.x = e.pos.x;
    this.imgMuyu.y = e.pos.y - 150;
  };
  _ctor.prototype.touchEndMugun = function () {
    if (this.move.x <= this.imgMuyu.x && this.move.x + this.move.width >= this.imgMuyu.x && this.move.y <= this.imgMuyu.y && this.move.y + this.move.height >= this.imgMuyu.y) {
      this.imgMuyu.x = this.m_initposMuyu.x;
      this.imgMuyu.y = this.m_initposMuyu.y;
      this.imgMuyu.alpha = 0;
      this.onClickGod();
    } else {
      this.imgMuyu.x = this.m_initposMuyu.x;
      this.imgMuyu.y = this.m_initposMuyu.y;
      this.imgMuyu.alpha = 0;
      this.ccspMuyu.setAnimation(0, "muyu", false);
      this.ccspMuyu.timeScale = 0;
    }
  };
  _ctor.prototype.takeOnce = function () {
    r_EffectsCom.default.instace.shake(.5, 1);
    var e = r_PoolSystem.PoolSystem.createObj(this.godWealthAward);
    var t = r_UtilsSystem.UtilsSystem.getRandomNum(0, this.m_cfg.award.length - 1);
    e.getController("c1").selectedIndex = this.m_cfg.coinIcon[t > 1 ? 1 : 0];
    e.getChild("labAward").text = r_UtilsSystem.UtilsSystem.numFormats(this.m_cfg.award[t]);
    var o = r_UtilsSystem.UtilsSystem.getRandomNum(-180, 180);
    var i = r_UtilsSystem.UtilsSystem.getRandomNum(0, 100);
    var n = cc.misc.degreesToRadians(o);
    var a = cc.v2(0, i).rotate(-n);
    var s = cc.v2(this.awardPos.x - a.x, this.awardPos.y + a.y);
    e.x = s.x;
    e.y = s.y;
    this.contentPane.addChildAt(e, 15);
    var r = r_UtilsSystem.UtilsSystem.getRandomNum(-180, 180);
    var c = cc.misc.degreesToRadians(r);
    var p = cc.v2(0, 200).rotate(-c);
    var d = cc.v2(s.x - p.x, s.y + p.y);
    var y = cc.v2(d.x + p.x / 2, d.y - 200);
    cc.tween(e).then(cc.bezierTo(.3, [s, y, d]).easing(cc.easeSineOut())).start();
    this.m_awards.push(e);
    this.m_awardsNum.push(this.m_cfg.award[t]);
    r_SoundMgr.SoundMgr.playSound("home/huodejinbi1");
  };
  _ctor.prototype.gameOver = function () {
    var e = this;
    this.m_awards.forEach(function (t) {
      r_PoolSystem.PoolSystem.revert(e.godWealthAward, t);
    });
    this.m_awards = [];
    var t = 0;
    this.m_awardsNum.forEach(function (e) {
      t += e;
    });
    r_GodWealthResultUI.default.showUI(t);
    r_GodWealthSystem.GodWealthSystem.playComplete(this.m_index);
    this.restart();
  };
  _ctor.prototype.onClickMuyu = function () {
    this.m_meritNum++;
    r_SoundMgr.SoundMgr.playSound("godWealth/敲木鱼");
    if (!(this.m_meritNum < 400)) {
      this.m_meritNum = 400;
      return void this.muyuChangedType();
    }
    var e = cc.v2(fgui.GRoot.inst.width / 2 - 63, fgui.GRoot.inst.height / 2 + 220);
    r_UtilsSystem.UtilsSystem.showCoinTip("", e, r_PoolSystem.PoolSystem.MeritCom);
    this.godPro.value = this.m_meritNum;
    this.ccspMuyu.setAnimation(0, "muyu", false);
    this.ccspMuyu.timeScale = 1;
  };
  _ctor.prototype.onClickGod = function () {
    var e = this;
    if (this.m_touchGod) {
      r_SoundMgr.SoundMgr.playSound("godWealth/敲佛像");
      this.m_touchGod = false;
      this.m_meritNum += 80;
      if (this.m_meritNum < 400) {
        var t = cc.v2(fgui.GRoot.inst.width / 2 - 148, fgui.GRoot.inst.height / 2 + 190);
        r_UtilsSystem.UtilsSystem.showCoinTip("", t, r_PoolSystem.PoolSystem.MeritCom2);
      } else {
        this.m_meritNum = 400;
      }
      this.godPro.value = this.m_meritNum;
      this.spGod.animationName = "fozhu_2";
      r_TimeSystem.TimeSystem.scheduleOnce("fozhu_2", .6, function () {
        e.spGod.animationName = "fozhu_1";
        e.spGod.loop = true;
        e.m_touchGod = true;
        e.ccspMuyu.setAnimation(0, "muyu", false);
        e.ccspMuyu.timeScale = 0;
        e.m_meritNum >= 400 && e.muyuChangedType();
      });
    }
  };
  _ctor.prototype.muyuChangedType = function () {
    var e = this;
    this.spLight.visible = true;
    this.spLight.animationName = "g";
    this.spLight.loop = false;
    this.labBubble.visible = true;
    this.imgBubble.visible = true;
    r_SoundMgr.SoundMgr.playSound("godWealth/光效音效");
    cc.tween(this.labBubble).to(.2, {
      alpha: 0
    }).call(function () {
      e.labBubble.text = "确认过眼神,\n你是对的人";
    }).to(.2, {
      alpha: 1
    }).delay(1).call(function () {
      e.start();
    }).delay(1.5).call(function () {
      e.spLight.visible = false;
    }).delay(2.5).call(function () {
      e.labBubble.visible = false;
      e.imgBubble.visible = false;
    }).start();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_GodWealthUI;