var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RebuildHomeUI = undefined;
var r_UIDef = require("UIDef");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_FguiResSystem = require("FguiResSystem");
var r_ResSystem = require("ResSystem");
var r_VideoRebuildHomeCfg = require("VideoRebuildHomeCfg");
var r_SoundMgr = require("SoundMgr");
var r_BaseLayer = require("BaseLayer");
var r_RebuideResUI = require("RebuideResUI");
var r_ARebuildHomeEvent = require("ARebuildHomeEvent");
var r_RebuildHomeCom = require("RebuildHomeCom");
var exp_RebuildHomeUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Lamp, r_UIDef.UIDef.Res.UI.RebuideHomeUI) || this;
    t.curIndex = 1;
    t.levelNode = null;
    t.lastId = "";
    t.info = null;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return true;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.RebuideHomeUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.RebuideHomeUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.clickHide, this);
  };
  _ctor.prototype.clickHide = function () {
    this.hide();
  };
  _ctor.prototype.lockBack = function () {
    this.hide();
  };
  _ctor.prototype.lockVideo = function () {};
  _ctor.prototype.activeBtns = function () {};
  _ctor.prototype.lockingGame = function () {};
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    this.data && (this.info = r_VideoRebuildHomeCfg.VideoRebuildHomeCfg[this.data]);
    if (this.info) {
      if (this.lastId && this.lastId == this.data) {
        var o = cc.instantiate(this.hostess);
        o.active = true;
        this.contentPane.getChild("center").node.addChild(o);
        this.levelNode = o;
        this.initCom(this.levelNode);
      } else {
        this.lastId = this.data;
        r_ResSystem.ResSystem.loadBundleRes("game2", this.info.path, cc.Prefab, function (e, o) {
          if (e) {
            console.log("加载出错：" + t.info.path);
          } else {
            r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
            t.hostess = o;
            var i = cc.instantiate(t.hostess);
            i.active = true;
            t.contentPane.getChild("center").node.addChild(i);
            t.levelNode = i;
            t.initCom(t.levelNode);
          }
        });
      }
      r_TYEventDispatcher.TYEventDispatcher.on(r_ARebuildHomeEvent.ARebuildHomeEvent.GameOver, this.gameover, this);
    } else {
      cc.warn("-没有data，或id名错误");
    }
  };
  _ctor.prototype.gameover = function (e) {
    if (e.data) {
      if (1 == e.data.win) {
        r_RebuideResUI.RebuideResUI.showUI({
          win: true,
          reward: 2e6
        });
      } else {
        r_RebuideResUI.RebuideResUI.showUI({
          win: false
        });
      }
    }
    this.hide();
  };
  _ctor.prototype.initCom = function (e) {
    var t;
    console.log("com初始化");
    null === (t = e.getComponent(r_RebuildHomeCom.default)) || undefined === t || t.initData(this.info);
    r_SoundMgr.SoundMgr.playMusic(this.info.bgm, true);
  };
  _ctor.prototype.onHide = function () {
    var t;
    e.prototype.onHide.call(this);
    r_SoundMgr.SoundMgr.playMusic("bgm", true);
    null === (t = this.levelNode) || undefined === t || t.destroy();
    r_TYEventDispatcher.TYEventDispatcher.off(r_ARebuildHomeEvent.ARebuildHomeEvent.GameOver, this.gameover, this);
  };
  _ctor.rewardCoin = 1e10;
  return _ctor;
}(r_BaseLayer.BaseLayer);
exports.RebuildHomeUI = exp_RebuildHomeUI;