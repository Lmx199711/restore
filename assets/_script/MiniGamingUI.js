var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MiniGamingUI = undefined;
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_GameKeyMgr = require("GameKeyMgr");
var r_SoundMgr = require("SoundMgr");
var r_LoadMgr = require("LoadMgr");
var r_MiniGameData = require("MiniGameData");
var r_Index = require("Index");
var r_VideoGameCfg = require("VideoGameCfg");
var r_VideoGameSystem = require("VideoGameSystem");
var r_FguiResSystem = require("FguiResSystem");
var exp_MiniGamingUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Lamp, r_UIDef.UIDef.Res.UI.MiniGamingUI) || this;
    t.uiType = "fullScreen";
    t.cfg = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.MiniGamingUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MiniGamingUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.clickHide, this);
  };
  _ctor.prototype.clickHide = function () {
    this.hide();
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    if (!this.data) {
      return this.hide();
    }
    var o = r_MiniGameData.MiniGameData[this.data];
    this.cfg = r_VideoGameSystem.VideoGameSystem.getCfg(r_VideoGameCfg.VideoGameCfg, {
      data: this.data
    })[0];
    if (!o) {
      return this.hide();
    }
    r_ResSystem.ResSystem.loadBundleRes(o.bundle, o.path, cc.Prefab, function (e, i) {
      if (!e) {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, i);
        t.prefab && t.prefab.destroy();
        t.prefab = cc.instantiate(i);
        t.prefab.parent = cc.find("Canvas");
        r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.onLoadLevelSuccess(t.prefab);
        t.miniGameCom = t.prefab.getComponent("MiniGameCom");
        t.miniGameCom.successCallback = function (e, i, n) {
          if (o.successUI) {
            o.successUI.showUI({
              title: n || o.successTitle,
              data: o.successData,
              type: "success",
              reward: t.cfg.reward,
              closeCallback: function () {
                t.hide();
              }
            });
          } else {
            t.hide();
          }
        };
        t.miniGameCom.failCallback = function (e, i, n) {
          if (o.failUI) {
            o.failUI.showUI({
              title: n || o.failTitle,
              data: o.failData,
              type: "fail",
              closeCallback: function () {
                t.hide();
              }
            });
          } else {
            t.hide();
          }
        };
      }
    });
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    this.prefab && this.prefab.destroy();
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
    r_SoundMgr.SoundMgr.stopAllSound();
    r_SoundMgr.SoundMgr.playMusic("bgm");
    cc.audioEngine.stopEffect(r_GameKeyMgr.GameKeyMgr.audioID);
    r_LoadMgr.default.audioCallback = null;
  };
  return _ctor;
}(r_Index.UIWind);
exports.MiniGamingUI = exp_MiniGamingUI;