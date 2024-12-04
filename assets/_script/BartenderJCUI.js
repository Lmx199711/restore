var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_TimeSystem = require("TimeSystem");
var r_PlayerData = require("PlayerData");
var r_AnimSystem = require("AnimSystem");
var r_ResSystem = require("ResSystem");
var r_SoundMgr = require("SoundMgr");
var r_ReportSystem = require("ReportSystem");
var r_FguiResSystem = require("FguiResSystem");
var def_BartenderJCUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Bartender, r_UIDef.UIDef.Res.UI.BartenderJCUI) || this;
    t.showAnimFlag = true;
    t.lastTxt = "";
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.BartenderJCUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BartenderJCUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnBack = this.contentPane.getChild("btnBack");
    this.btnBack.onClick(this.hide, this);
    this.btnNext0 = this.contentPane.getChild("btnNext0");
    this.btnNext0.onClick(this.setChanged.bind(this, 1), this);
    this.btnNext1 = this.contentPane.getChild("btnNext1");
    this.btnNext1.onClick(this.setChanged.bind(this, 1), this);
    this.btnNext5 = this.contentPane.getChild("btnNext5");
    this.btnNext5.onClick(this.closeLight, this);
    this.btnNext3 = this.contentPane.getChild("btnNext3");
    this.btnNext3.onClick(this.setChanged.bind(this, 2), this);
    this.btnNext4 = this.contentPane.getChild("btnNext4");
    this.btnNext4.onClick(this.setChanged.bind(this, 2), this);
    this.btnClose = this.contentPane.getChild("btnClose");
    this.btnClose.onClick(this.onClickClose, this);
    this.imgCoin = this.contentPane.getChild("imgCoin");
    this.labBubble = this.contentPane.getChild("labBubble");
    r_ResSystem.ResSystem.loadBundleRes("game2", "bartender/naic", cc.Prefab, function (e, o) {
      if (e) {
        console.error("加载失败: ", e);
      } else {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
        var i = cc.instantiate(o);
        t.contentPane.getChild("center").node.addChild(i);
        i.active = true;
        t.roleAnim = i.getComponent(sp.Skeleton);
        t.roleAnim.setAnimation(0, "weixun_2", true);
        t.restart();
      }
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    r_SoundMgr.SoundMgr.playMusic("secretbgm1");
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.clearTimeMapUpdate("emgcTalk");
    this.labBubble.text = this.m_txt;
    r_TimeSystem.TimeSystem.scheduleClear("onchanged");
    r_TimeSystem.TimeSystem.scheduleClear("onchanged1");
    r_TimeSystem.TimeSystem.scheduleClear("close");
    r_SoundMgr.SoundMgr.playMusic("bgm");
  };
  _ctor.prototype.restart = function () {
    for (var e = 0; e < 6; e++) {
      if (2 != e) {
        var t = this["btnNext" + e];
        t.scaleX = t.scaleY = 0;
      }
    }
    this.setChanged(0);
  };
  _ctor.prototype.setChanged = function (e) {
    var t = this;
    this.contentPane.getController("c1").selectedIndex = e;
    if (e <= 3) {
      this.m_txt = this.labBubble.text;
      r_SoundMgr.SoundMgr.playSound("bartender/打字音效", true);
      r_TimeSystem.TimeSystem.timeMapUpdate("emgcTalk", 3 == e ? 8 : 3, function (o) {
        t.labBubble.text = t.m_txt.substring(0, Math.ceil(o * t.m_txt.length));
        e < 3 && 1 == o && t.contentPane.getTransition("t" + e).play(null, 1);
        1 == o && r_SoundMgr.SoundMgr.stopSound("bartender/打字音效");
      });
    }
  };
  _ctor.prototype.closeLight = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("bartender/关灯");
    this.contentPane.getTransition("anim").play();
    r_TimeSystem.TimeSystem.scheduleOnce("onchanged", 1, function () {
      e.setChanged(3);
    });
    r_TimeSystem.TimeSystem.scheduleOnce("onchanged1", 10, function () {
      e.contentPane.getTransition("anim").play();
      setTimeout(function () {
        e.setChanged(4);
      }, 1e3);
    });
  };
  _ctor.prototype.onClickClose = function () {
    var e = this;
    r_PlayerData.PlayerData.addCoin("金晨彩蛋", 5e5, r_ReportSystem.SystemKey.小游戏);
    r_AnimSystem.AnimSystem.playCoinAnim(this.imgCoin.node);
    r_TimeSystem.TimeSystem.scheduleOnce("close", 1, function () {
      e.hide();
    });
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_BartenderJCUI;