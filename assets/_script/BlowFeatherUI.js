var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlowFeatherUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_BlowFeatherLogic = require("BlowFeatherLogic");
var r_FguiResSystem = require("FguiResSystem");
var exp_BlowFeatherUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Lamp, r_UIDef.UIDef.Res.UI.BlowFeatherUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.BlowFeatherUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BlowFeatherUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnBack = this.contentPane.getChild("btnBack");
    this.btnBack.onClick(this.hide, this);
    r_ResSystem.ResSystem.loadBundleRes("game2", "blowFeather/BlowFeather", cc.Prefab, function (e, o) {
      if (e) {
        console.error("加载失败: ", e);
      } else {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
        var i = cc.instantiate(o);
        i.active = true;
        t.contentPane.getChild("center").node.addChild(i);
        t.levelNode = i;
      }
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.levelNode && this.levelNode.getComponent(r_BlowFeatherLogic.default).init();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.BlowFeatherUI = exp_BlowFeatherUI;