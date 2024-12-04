var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_FguiResSystem = require("FguiResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_TYIndex = require("TYIndex");
var r_BottleCom = require("BottleCom");
var def_BottleUI = function (e) {
  function _ctor() {
    var o = e.call(this, r_UIDef.UIDef.Pack.Bottle, r_UIDef.UIDef.Res.UI.BottleUI) || this;
    o.uiType = "fullScreen";
    o.roundNum = 0;
    _ctor.instance = o;
    return o;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.BottleUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BottleUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.imgTip = this.contentPane.getChild("imgTip");
    this.imgTip2 = this.contentPane.getChild("imgTip2");
    this.roundNum = 0;
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.contentPane.getChild("btnPlay").asButton.onClick(this.onPlay, this);
    this.btnPlay = this.contentPane.getChild("btnPlay");
    this.btnPlay.visible = false;
    r_PlayerData.PlayerData.isGame = true;
    r_ResSystem.ResSystem.loadBundleRes("game1", "bottle/bottleCom", cc.Prefab, function (e, o) {
      if (e) {
        console.error("加载失败: ", e);
      } else {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
        t.m_prefab = cc.instantiate(o);
        t.contentPane.getChild("center").node.addChild(t.m_prefab);
        t.bottleCom = t.m_prefab.getComponent(r_BottleCom.default);
        t.contentPane.getChild("btnPlay").visible = true;
        t.restart();
      }
    });
  };
  _ctor.prototype.restart = function () {
    var e = 2 - this.roundNum % 3;
    this.imgTip.url = 0 == e ? "" : "ui://Bottle/" + e;
    this.imgTip2.visible = 0 != e;
    this.btnPlay.getController("c1").selectedIndex = 0 == e ? 1 : 0;
  };
  _ctor.prototype.onPlay = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("玩一局滚瓶子", function () {
      e.roundNum++;
      e.bottleCom.ready();
      e.contentPane.getChild("btnPlay").visible = false;
    });
  };
  _ctor.prototype.showBtnPlay = function (e) {
    this.contentPane.getChild("btnPlay").visible = e;
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_PlayerData.PlayerData.isGame = false;
    this.m_prefab.destroy();
    this.m_prefab = null;
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_BottleUI;