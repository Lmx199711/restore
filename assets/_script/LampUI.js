var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LampUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_LampCom = require("LampCom");
var r_TimeSystem = require("TimeSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_LampResultUI = require("LampResultUI");
var r_SoundMgr = require("SoundMgr");
var r_FguiResSystem = require("FguiResSystem");
var exp_LampUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Lamp, r_UIDef.UIDef.Res.UI.LampUI) || this;
    t.m_maxTime = 20;
    t.m_tempTime = 0;
    t.m_tween = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.LampUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.LampUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnBack = this.contentPane.getChild("btnBack");
    this.btnBack.onClick(this.hide, this);
    this.pro = this.contentPane.getChild("pro");
    this.imgFail = this.contentPane.getChild("imgFail");
    this.imgLamp = this.contentPane.getChild("imgLamp");
    this.labTime = this.contentPane.getChild("labTime");
    r_ResSystem.ResSystem.loadBundleRes("game2", "lamp/lamp", cc.Prefab, function (e, o) {
      if (e) {
        console.error("加载失败: ", e);
      } else {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
        var i = cc.instantiate(o);
        t.contentPane.getChild("center").node.addChild(i);
        i.active = true;
        t.lampCom = i.getComponent(r_LampCom.default);
      }
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.instace = this;
    r_SoundMgr.SoundMgr.playMusic("lamp/欢快bgm");
    this.restart();
  };
  _ctor.prototype.restart = function () {
    var e = this;
    this.lampCom && this.lampCom.restart();
    this.pro.value = 0;
    this.imgFail.visible = true;
    this.contentPane.getController("c1").selectedIndex = 0;
    this.m_tempTime = this.m_maxTime;
    this.labTime.text = this.m_maxTime + "";
    r_TimeSystem.TimeSystem.schedule("timeSco", 1, function () {
      e.labTime.text = --e.m_tempTime + "";
      if (0 == e.m_tempTime) {
        e.gameOver();
        r_TimeSystem.TimeSystem.scheduleClear("timeSco");
      }
    }, this.m_maxTime);
    r_PlatformSystem.PlatformSystem.startRecorder();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.instace = null;
    r_TimeSystem.TimeSystem.scheduleClear("timeSco");
    r_SoundMgr.SoundMgr.stopSound("lamp/维修电路");
    r_SoundMgr.SoundMgr.playMusic("bgm");
    r_PlatformSystem.PlatformSystem.stopRecorder();
  };
  _ctor.prototype.setLight = function (e) {
    this.lampCom.isEnd || this.lampCom.isSucc || e && 1 == this.contentPane.getController("c1").selectedIndex || (e || 0 != this.contentPane.getController("c1").selectedIndex) && (this.contentPane.getController("c1").selectedIndex = e ? 1 : 0, this.imgFail.visible = !e, e ? (this.pro.value = 0, r_SoundMgr.SoundMgr.playSound("lamp/维修电路", true), this.m_tween = cc.tween(this.pro).to(3, {
      value: 100
    }).call(this.gameSucc.bind(this)).start()) : (this.m_tween && this.m_tween.stop(), r_SoundMgr.SoundMgr.stopSound("lamp/维修电路")));
  };
  _ctor.prototype.gameSucc = function () {
    this.lampCom.gameSucc();
    this.contentPane.getController("c1").selectedIndex = 2;
    this.m_tween && this.m_tween.stop();
    r_SoundMgr.SoundMgr.playSound("lamp/梯子胜利");
    r_SoundMgr.SoundMgr.stopSound("lamp/维修电路");
    this.pro.value = 100;
    r_TimeSystem.TimeSystem.scheduleOnce("succ", 2, function () {
      r_LampResultUI.LampResultUI.showUI(0);
      r_SoundMgr.SoundMgr.playSound("win");
    });
  };
  _ctor.prototype.gameOver = function () {
    this.lampCom.gameOver();
    this.m_tween && this.m_tween.stop();
    r_SoundMgr.SoundMgr.stopSound("lamp/维修电路");
    this.imgFail.visible = true;
    this.pro.value = 0;
    r_PlatformSystem.PlatformSystem.stopRecorder();
    r_LampResultUI.LampResultUI.showUI(1);
    r_SoundMgr.SoundMgr.playSound("fail");
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.LampUI = exp_LampUI;