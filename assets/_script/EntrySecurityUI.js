var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var a;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_PlayerData = require("PlayerData");
var r_EntrySystem = require("EntrySystem");
var r_UtilsSystem = require("UtilsSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PoolSystem = require("PoolSystem");
var r_TimeSystem = require("TimeSystem");
var r_EntryCfg = require("EntryCfg");
var r_SoundMgr = require("SoundMgr");
var r_EntryUI = require("EntryUI");
var r_FguiResSystem = require("FguiResSystem");
var def_EntrySecurityUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Entry, r_UIDef.UIDef.Res.UI.EntrySecurityUI) || this;
    t.uiType = "fullScreen";
    t.m_allEarn = 0;
    t.m_gType = 0;
    t.m_tween = null;
    t.m_actions = ["zuo", "you"];
    t.m_actIndex = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.EntrySecurityUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.EntrySecurityUI);
  };
  Object.defineProperty(_ctor.prototype, "gType", {
    get: function () {
      return this.m_gType;
    },
    set: function (e) {
      this.m_gType = e;
      if (this.m_gType == a.open) {
        this.yinx.animationName = "yingx";
        this.yinx.loop = true;
        this.yinx.playing = true;
      } else {
        this.yinx.animationName = "yingx2";
        this.yinx.loop = true;
        this.yinx.playing = true;
      }
      this.m_gType == a.open && r_SoundMgr.SoundMgr.playMusic("entry/躲闪摇");
      this.m_gType == a.close && r_SoundMgr.SoundMgr.stopMusic();
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnBack = this.contentPane.getChild("btnBack").asButton;
    this.btnBack.onClick(this.hide, this);
    this.btnFight = this.contentPane.getChild("btnFight").asButton;
    this.btnFight.onClick(this.onClickFight, this);
    this.labEarn = this.contentPane.getChild("labEarn");
    this.labNum = this.contentPane.getChild("labNum");
    this.labAllEarn = this.contentPane.getChild("labAllEarn");
    this.btnYinx = this.contentPane.getChild("btnYinx");
    this.btnYinx.onClick(this.onClickChanged, this);
    this.yinx = this.contentPane.getChild("yinx");
    this.bubble = this.contentPane.getChild("bubble");
    this.labBubble = this.bubble.getChild("labBubble");
    this.m_allEarn = 0;
    r_ResSystem.ResSystem.loadBundleRes("game2", "entry/baoan", cc.Prefab, function (e, o) {
      if (e) {
        console.error("加载失败: ", e);
      } else {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
        var i = cc.instantiate(o);
        t.contentPane.getChild("center").node.addChild(i);
        i.active = true;
        t.roleAnim = i.getComponent(sp.Skeleton);
        t.roleAnim.setCompleteListener(t.onAnimFnish.bind(t));
        t.restart();
      }
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    r_SoundMgr.SoundMgr.stopMusic();
    r_PoolSystem.PoolSystem.createUIObjPool(r_PoolSystem.PoolSystem.CoinTipCom2, "ui://MainHome/CoinTipCom", 1, this.contentPane);
    this.restart();
    r_PlayerData.PlayerData.isGame = true;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("updateBubble");
    this.m_tween && this.m_tween.stop();
    r_SoundMgr.SoundMgr.playMusic("bgm");
    r_PlayerData.PlayerData.isGame = false;
    r_EntryUI.default.instace.hide();
  };
  _ctor.prototype.restart = function () {
    var e = this;
    if (this.roleAnim) {
      this.roleAnim.setAnimation(0, "daiji", true);
      this.gType = a.open;
      this.updateView();
      this.bubble.visible = false;
      r_TimeSystem.TimeSystem.schedule("updateBubble", 6, function () {
        e.bubble.visible = true;
        e.bubble.alpha = 0;
        var t = e.roleAnim.animation;
        var o = r_EntryCfg.EntryIdleBubbleCfg[r_UtilsSystem.UtilsSystem.getRandomNum(0, r_EntryCfg.EntryIdleBubbleCfg.length - 1)];
        var i = r_EntryCfg.EntryFightBubbleCfg[r_UtilsSystem.UtilsSystem.getRandomNum(0, r_EntryCfg.EntryFightBubbleCfg.length - 1)];
        e.labBubble.text = "daiji2" == t || "aizhou" == t ? i : o;
        e.m_tween = cc.tween(e.bubble).to(.2, {
          alpha: 1
        }).delay(2.6).to(.2, {
          alpha: 0
        }).start();
      });
    }
  };
  _ctor.prototype.updateView = function () {
    this.labEarn.text = r_UtilsSystem.UtilsSystem.numFormats(r_EntrySystem.EntrySystem.getOncePrice());
    this.labNum.text = "累计被扁：" + r_EntrySystem.EntrySystem.getNum();
    this.labAllEarn.text = "(总收益：" + r_UtilsSystem.UtilsSystem.getShowCoin(r_EntrySystem.EntrySystem.getAllEarn()) + ")";
    this.btnFight.title = 20 - r_EntrySystem.EntrySystem.getNum() % 20 + "/20";
    this.btnFight.getController("c1").selectedIndex = r_EntrySystem.EntrySystem.checkFight() ? 0 : 1;
  };
  _ctor.prototype.onClickFight = function () {
    var e = this;
    if (r_EntrySystem.EntrySystem.checkFight()) {
      var t = this.m_actions[this.m_actIndex % 2];
      this.roleAnim.setAnimation(0, this.m_gType == a.open ? t : "aizhou", false);
      r_SoundMgr.SoundMgr.playSound("entry/飞拳");
      this.m_actIndex++;
      if (this.m_gType == a.close) {
        var o = cc.v2(this.btnFight.x + 120, this.btnFight.y - 150);
        r_UtilsSystem.UtilsSystem.showCoinTip("+" + r_UtilsSystem.UtilsSystem.numFormats(r_EntrySystem.EntrySystem.getOncePrice()), o, r_PoolSystem.PoolSystem.CoinTipCom2);
        r_EntrySystem.EntrySystem.fight();
        this.updateView();
      }
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("增加揍保安次数", function () {
        r_EntrySystem.EntrySystem.addNum();
        e.updateView();
      });
    }
  };
  _ctor.prototype.onAnimFnish = function () {
    if ("zuo" == this.roleAnim.animation || "you" == this.roleAnim.animation) {
      this.roleAnim.addAnimation(0, "daiji", true);
    } else {
      "aizhou" == this.roleAnim.animation && this.roleAnim.addAnimation(0, "daiji2", true);
    }
  };
  _ctor.prototype.onClickChanged = function () {
    this.gType = this.m_gType == a.open ? a.close : a.open;
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_EntrySecurityUI;
(function (e) {
  e[e.open = 0] = "open";
  e[e.close = 1] = "close";
})(a || (a = {}));