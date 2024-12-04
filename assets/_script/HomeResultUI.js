var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_HomeSystem = require("HomeSystem");
var r_HomeCfg = require("HomeCfg");
var r_PlayerData = require("PlayerData");
var r_SoundMgr = require("SoundMgr");
var r_FguiResSystem = require("FguiResSystem");
var def_HomeResultUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Home, r_UIDef.UIDef.Res.UI.HomeResultUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.HomeResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.HomeResultUI);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.imgGuan = this.contentPane.getChild("imgGuan").asLoader;
    this.btnOpen = this.contentPane.getChild("btnOpen");
    this.btnOpen.onClick(this.onClickOpen, this);
    this.btnBack = this.contentPane.getChild("btnBack");
    this.btnBack.onClick(this.onClickGet, this);
    this.initPos = cc.v2(this.imgGuan.x, this.imgGuan.y);
    this.img = new cc.Node();
    this.img.addComponent(cc.Sprite);
    this.imgGuan.node.addChild(this.img);
  };
  _ctor.prototype.restart = function () {
    var e = this;
    this.contentPane.getController("c1").selectedIndex = 0;
    r_ResSystem.ResSystem.loadBundleRes("game2", "home/guan" + this.data, cc.SpriteFrame, function (t, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(e, o);
      e.img.getComponent(cc.Sprite).spriteFrame = o;
    });
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    if (this.soundString) {
      r_SoundMgr.SoundMgr.stopSound(this.soundString);
      this.soundString = null;
    }
  };
  _ctor.prototype.onClickOpen = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("home/打开盲盒");
    this.contentPane.getController("c1").selectedIndex = 1;
    var t = this.contentPane.getChild("center").node.getChildByName("baomu");
    t && t.destroy();
    var o = 1 == r_PlayerData.PlayerData.data.wawaCaidan ? r_HomeSystem.HomeSystem.getCaidanBaomu(this.data) : r_HomeSystem.HomeSystem.getRandomBaomu(this.data);
    var i = r_HomeCfg.BaomuCfg[o];
    r_ResSystem.ResSystem.loadBundleRes("game2", "home/baomu" + i.type, cc.Prefab, function (t, n) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(e, n);
      var a = cc.instantiate(n);
      a.name = "baomu";
      e.contentPane.getChild("center").node.addChild(a);
      a.active = true;
      a.getComponent(sp.Skeleton).setAnimation(0, "animation", true);
      a.getComponent(sp.Skeleton).setSkin(i.isGood ? "1" : "2");
      e.bubble = a.getChildByName("chatItem0");
      e.bubble.active = false;
      e.setBubble(o);
    });
  };
  _ctor.prototype.onClickGet = function () {
    this.hide();
  };
  _ctor.prototype.setBubble = function (e) {
    var t = r_HomeCfg.BaomuAwardBubble[e];
    this.bubble.getChildByName("label").getComponent(cc.Label).string = t;
    this.bubble.active = true;
    this.bubble.opacity = 0;
    cc.tween(this.bubble).to(.3, {
      opacity: 255
    }).start();
    this.soundString = "home/" + t;
    r_SoundMgr.SoundMgr.playSound(this.soundString);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_HomeResultUI;