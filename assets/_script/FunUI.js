var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FunUI = undefined;
var r_UIDef = require("UIDef");
var r_SDKMgr1 = require("SDKMgr1");
var r_BaseWin = require("BaseWin");
var r_ResSystem = require("ResSystem");
var exp_FunUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Fun, r_UIDef.UIDef.Res.UI.FunUI) || this;
    t.uiType = "fullScreen";
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.FunUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FunUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/fun/fun", cc.Prefab, function (e, o) {
      t.prefab = cc.instantiate(o);
      t.prefab.active = true;
      t.contentPane.getChild("center").node.addChild(t.prefab);
      t.prefab.getChildByName("1_1").active = 1 == r_SDKMgr1.SDKMgr1.weixinpingbi;
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    r_SDKMgr1.SDKMgr1.showBanner();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
    r_SDKMgr1.SDKMgr1.hideBanner();
  };
  _ctor.Inst = null;
  return _ctor;
}(r_BaseWin.BaseWin);
exports.FunUI = exp_FunUI;