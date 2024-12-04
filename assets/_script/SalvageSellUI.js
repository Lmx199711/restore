var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SalvageSellUI = undefined;
var r_UIDef = require("UIDef");
var r_FguiResSystem = require("FguiResSystem");
var r_ResSystem = require("ResSystem");
var r_TYIndex = require("TYIndex");
var r_SalvageLogic = require("SalvageLogic");
var exp_SalvageSellUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Salvage, r_UIDef.UIDef.Res.UI.SalvageSellUI) || this;
    t.uiType = "fullScreen";
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.m_data = e;
    this.show(r_UIDef.UIDef.Urls.UI.SalvageSellUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SalvageSellUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.loadCom();
  };
  _ctor.prototype.loadCom = function () {
    var e = this;
    r_ResSystem.ResSystem.loadBundleRes("game1", "salvage/salvageItem", cc.Prefab, function (o, i) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(e, i);
      var n = cc.instantiate(i);
      n.active = true;
      e.contentPane.getChild("center").node.addChild(n);
      n.getComponent(r_SalvageLogic.default).setData(_ctor.m_data);
      n.width = e.contentPane.width;
      n.height = e.contentPane.height;
    });
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    this.contentPane.getChild("center").node.destroyAllChildren();
  };
  _ctor.m_data = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.SalvageSellUI = exp_SalvageSellUI;