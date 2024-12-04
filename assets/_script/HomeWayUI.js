var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomeWayUI = undefined;
var r_UIDef = require("UIDef");
var r_TYIndex = require("TYIndex");
var r_ResSystem = require("ResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_SoundMgr = require("SoundMgr");
var r_FguiResSystem = require("FguiResSystem");
var exp_HomeWayUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Phone, r_UIDef.UIDef.Res.UI.HomeWayUI) || this;
    t.uiType = "fullScreen";
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.HomeWayUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.HomeWayUI);
  };
  _ctor.prototype.onInit = function () {
    var o = this;
    e.prototype.onInit.call(this);
    _ctor.Inst = this;
    this.btnBack = this.contentPane.getChild("btnBack").asButton;
    this.btnBack.onClick(this.onClickBack, this);
    this.centerLoader = this.contentPane.getChild("center").asLoader;
    this.btnVideo = this.contentPane.getChild("btnVideo").asButton;
    this.btnVideo.onClick(this.onClickVideo, this);
    this.checkShowVideoBtn();
    r_ResSystem.ResSystem.loadBundleRes("game1", "homeWay/home", cc.Prefab, function (e, t) {
      if (e) {
        console.error(e);
      } else {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(o, t);
        o.prefab = cc.instantiate(t);
        o.centerLoader.node.addChild(o.prefab);
        o.homeWayCom = o.prefab.getComponent("HomeWayCom");
      }
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.checkShowVideoBtn();
    r_SoundMgr.SoundMgr.playMusic("homeWay/huijiabgm");
    this.homeWayCom && this.homeWayCom.init();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_SoundMgr.SoundMgr.playMusic("bgm");
  };
  _ctor.prototype.onClickBack = function () {
    this.hide();
  };
  _ctor.prototype.onClickVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("补充金币", function () {
      r_PlayerData.PlayerData.addCoin("补充金币", 1e7);
      e.checkShowVideoBtn();
    });
  };
  _ctor.prototype.checkShowVideoBtn = function () {
    this.btnVideo.visible = !r_PlayerData.PlayerData.isCoinEnough(2e6);
    this.homeWayCom && this.homeWayCom.initMoney();
  };
  _ctor.Inst = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.HomeWayUI = exp_HomeWayUI;