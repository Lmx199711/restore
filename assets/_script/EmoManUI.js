var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmoManUI = undefined;
var r_UIDef = require("UIDef");
var r_BaseLayer = require("BaseLayer");
var r_ResSystem = require("ResSystem");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_GameKeyMgr = require("GameKeyMgr");
var r_SoundMgr = require("SoundMgr");
var r_LoadMgr = require("LoadMgr");
var r_FguiResSystem = require("FguiResSystem");
var exp_EmoManUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Lamp, r_UIDef.UIDef.Res.UI.EmoManUI) || this;
    t.uiType = "fullScreen";
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.EmoManUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.EmoManUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.clickHide, this);
    this.centerLoader = this.contentPane.getChild("center").asLoader;
  };
  _ctor.prototype.clickHide = function () {
    this.hide();
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    r_SoundMgr.SoundMgr.stopMusic();
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.clearLevel();
    r_ResSystem.ResSystem.loadBundleRes("game2", "emoMan/emo男神", cc.Prefab, function (e, o) {
      if (!e) {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
        t.prefab && t.prefab.destroy();
        t.prefab = cc.instantiate(o);
        t.centerLoader.node.addChild(t.prefab);
        r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.onLoadLevelSuccess(t.prefab);
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
}(r_BaseLayer.BaseLayer);
exports.EmoManUI = exp_EmoManUI;