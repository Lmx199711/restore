var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VentureUI = undefined;
var r_UIDef = require("UIDef");
var r_SDKMgr1 = require("SDKMgr1");
var r_ResSystem = require("ResSystem");
var r_BaseWin = require("BaseWin");
var exp_VentureUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Venture, r_UIDef.UIDef.Res.UI.VentureUI) || this;
    t.uiType = "fullScreen";
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.VentureUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.VentureUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/venture/venture", cc.Prefab, function (e, o) {
      t.prefab = cc.instantiate(o);
      t.prefab.active = true;
      t.contentPane.getChild("center").node.addChild(t.prefab);
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    r_SDKMgr1.SDKMgr1.showBanner();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_SDKMgr1.SDKMgr1.hideBanner();
  };
  return _ctor;
}(r_BaseWin.BaseWin);
exports.VentureUI = exp_VentureUI;