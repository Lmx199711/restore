var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VentureLoadingUI = undefined;
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_TYIndex = require("TYIndex");
var r_VentureUI = require("VentureUI");
var exp_VentureLoadingUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Venture, r_UIDef.UIDef.Res.UI.VentureLoadingUI) || this;
    t.m_prefabs = [];
    t.m_num = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.VentureLoadingUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.VentureLoadingUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
  };
  _ctor.prototype.onShown = function () {
    var t = this;
    e.prototype.onShown.call(this);
    this.m_num = 0;
    this.m_prefabs = [];
    this.contentPane.getChild("ProgressBar").asProgress.value = 0;
    this.contentPane.getChild("lanPro").asProgress.text = "加载中:0%";
    for (var o = 0; o < 20; o++) {
      this.m_prefabs.push("bit/bitMap" + o);
    }
    this.m_prefabs.push("bit/bitMap");
    this.m_prefabs.push("salvage/salvageBg");
    for (var i = 0; i < this.m_prefabs.length; i++) {
      r_ResSystem.ResSystem.loadBundleRes("game1", this.m_prefabs[i], cc.Prefab, function () {
        t.m_num++;
        var e = t.contentPane.getChild("ProgressBar").asProgress;
        cc.tween(e).to(.2, {
          value: Math.ceil(t.m_num / 21 * 100)
        }).start();
        t.contentPane.getChild("lanPro").asProgress.text = "加载中:" + Math.ceil(t.m_num / 21 * 100) + "%";
        if (t.m_num >= 21) {
          t.hide();
          r_VentureUI.VentureUI.showUI();
        }
      });
    }
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.VentureLoadingUI = exp_VentureLoadingUI;