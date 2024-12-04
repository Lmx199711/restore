var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BanquetDownUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_BanquetCfg = require("BanquetCfg");
var r_PlatformSystem = require("PlatformSystem");
var r_EatBanquetUI = require("EatBanquetUI");
var r_SoundMgr = require("SoundMgr");
var exp_BanquetDownUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Banquet, r_UIDef.UIDef.Res.UI.BanquetDownUI) || this;
    t.uiType = "fullScreen";
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.BanquetDownUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BanquetDownUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack = this.contentPane.getChild("btnBack").asButton;
    this.btnBack.onClick(this.hide, this);
    this.anim = this.contentPane.getChild("anim").asCom;
    this.btnVideo = this.contentPane.getChild("btnVideo").asButton;
    this.btnVideo.onClick(this.onClickVideo, this);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onShown = function () {
    this.config = r_BanquetCfg.BanquetBaseCfg[this.data];
    this.PlayAnim(this.anim, this.config.anim_4, true, true);
  };
  _ctor.prototype.PlayAnim = function (e, t, o, i) {
    e.loop = o;
    e.animationName = t;
    e.playing = i;
  };
  _ctor.prototype.onClickVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("吃席小动作", function () {
      e.PlayAnim(e.anim, e.config.anim_3, false, true);
      r_EatBanquetUI.EatBanquetUI.Inst.npcPause();
      r_SoundMgr.SoundMgr.playSound("banquet/一脚");
      r_SoundMgr.SoundMgr.stopSound("banquet/压轴菜争抢");
      r_SoundMgr.SoundMgr.stopSound("banquet/" + e.data);
      setTimeout(function () {
        e.hide();
      }, 2e3);
    });
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.BanquetDownUI = exp_BanquetDownUI;