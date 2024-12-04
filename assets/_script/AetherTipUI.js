var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AetherTipUI = undefined;
var r_UIDef = require("UIDef");
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_PlatformSystem = require("PlatformSystem");
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_AetherCfg = require("AetherCfg");
var r_TYIndex = require("TYIndex");
var r_BitResultData = require("BitResultData");
var r_AetherResultUI = require("AetherResultUI");
var exp_AetherTipUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Aether, r_UIDef.UIDef.Res.UI.AetherTipUI) || this;
    t.showAnimFlag = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.m_data = e;
    this.show(r_UIDef.UIDef.Urls.UI.AetherTipUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.AetherTipUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnGiveUp").asButton.onClick(this.openResult, this);
    this.contentPane.getChild("btnFighting").asButton.onClick(this.onClickVideo, this);
    this.contentPane.getChild("btnOver").asButton.onClick(this.openResult, this);
    this.contentPane.getChild("btnBuy").asButton.onClick(this.onBuy, this);
    this.contentPane.getChild("btnLoss").asButton.onClick(this.onLoss, this);
    this.contentPane.getChild("btnUse").asButton.onClick(this.hide, this);
    this.labDec = this.contentPane.getChild("labDec").asLabel;
    this.c1 = this.contentPane.getController("c1");
    this.labName = this.contentPane.getChild("labName").asLabel;
    this.labPrice = this.contentPane.getChild("labPrice").asLabel;
    this.imgicon = this.contentPane.getChild("icon").asLoader;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    var o = _ctor.m_data;
    this.c1.setSelectedIndex(o.shootType);
    this.labDec.text = o.desc;
    this.labName.text = o.name;
    var i = o.count;
    null != o.layertIndex && o.isCoefficient && (i *= r_AetherCfg.AetherLayerCoeff[o.layertIndex]);
    this.labPrice.text = r_UtilsSystem.UtilsSystem.getShowCoin(Math.abs(i));
    r_ResSystem.ResSystem.loadBundleFguiImg(this.imgicon, "game4", "aether/icon/" + this.data.icon);
  };
  _ctor.prototype.openResult = function () {
    r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.bitGameOver);
    this.hide();
    r_AetherResultUI.AetherResultUI.showUI();
  };
  _ctor.prototype.onClickVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("太空探险补充氧气", function () {
      r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.bitFighting);
      e.hide();
    });
  };
  _ctor.prototype.onBuy = function () {
    var e = _ctor.m_data;
    var o = e.count;
    null != e.layertIndex && e.isCoefficient && (o *= r_AetherCfg.AetherLayerCoeff[e.layertIndex]);
    r_BitResultData.BitResultData.addIncome(o);
    this.hide();
    this.openResultForId(e.id);
  };
  _ctor.prototype.onLoss = function () {
    var e = _ctor.m_data;
    var o = e.count;
    null != e.layertIndex && e.isCoefficient && (o *= r_AetherCfg.AetherLayerCoeff[e.layertIndex]);
    r_BitResultData.BitResultData.addLoss(o);
    this.hide();
    this.openResultForId(e.id);
  };
  _ctor.prototype.openResultForId = function (e) {
    e > 100 && e < 999 && this.openResult();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.bitPause);
  };
  _ctor.vieoNum = 0;
  _ctor.m_data = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.AetherTipUI = exp_AetherTipUI;