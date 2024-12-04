var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BitTipUI = undefined;
var r_UIDef = require("UIDef");
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_BitCfg = require("BitCfg");
var r_TYIndex = require("TYIndex");
var r_BitResultData = require("BitResultData");
var r_BitResultUI = require("BitResultUI");
var exp_BitTipUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Bit, r_UIDef.UIDef.Res.UI.BitTipUI) || this;
    t.showAnimFlag = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.m_data = e;
    this.show(r_UIDef.UIDef.Urls.UI.BitTipUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BitTipUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnGiveUp").asButton.onClick(this.openResult, this);
    this.contentPane.getChild("btnFighting").asButton.onClick(this.onClickVideo, this);
    this.contentPane.getChild("btnOver").asButton.onClick(this.openResult, this);
    this.contentPane.getChild("btnBuy").asButton.onClick(this.onBuy, this);
    this.contentPane.getChild("btnLoss").asButton.onClick(this.onLoss, this);
    this.contentPane.getChild("btnShouxia").asButton.onClick(this.onBtnShouxia, this);
    this.contentPane.getChild("btnShouxia").asButton.getChild("label").text = "(" + _ctor.vieoNum + "/2)";
    this.contentPane.getChild("btnJujue").asButton.onClick(this.hide, this);
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
    var i = r_BitCfg.BitLeveCoin[r_PlayerData.PlayerData.data.bitLeveCoin].coefficient;
    var n = o.isCoefficient ? i * o.count : o.count;
    null != o.layertIndex && o.isCoefficient && (n *= r_BitCfg.BitLayerCoeff[o.layertIndex]);
    this.labPrice.text = r_UtilsSystem.UtilsSystem.getShowCoin(Math.abs(n));
    this.imgicon.url = "ui://Bit/BitIcon" + o.id;
  };
  _ctor.prototype.openResult = function () {
    r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.bitGameOver);
    this.hide();
    r_BitResultUI.BitResultUI.showUI();
  };
  _ctor.prototype.onClickVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("钻头加油", function () {
      r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.bitFighting);
      e.hide();
    });
  };
  _ctor.prototype.onBtnShouxia = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("获得金刚钻", function () {
      e.contentPane.getChild("btnShouxia").asButton.getChild("label").text = "(" + _ctor.vieoNum + "/2)";
      r_PlayerData.PlayerData.data.bitHead = 1;
      r_PlayerData.PlayerData.saveData();
      r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.bitChangeHead);
      e.hide();
    });
  };
  _ctor.prototype.onBuy = function () {
    var e = _ctor.m_data;
    var o = r_BitCfg.BitLeveCoin[r_PlayerData.PlayerData.data.bitLeveCoin].coefficient;
    var i = e.isCoefficient ? o * e.count : e.count;
    null != e.layertIndex && e.isCoefficient && (i *= r_BitCfg.BitLayerCoeff[e.layertIndex]);
    r_BitResultData.BitResultData.addIncome(i);
    this.hide();
    this.openResultForId(e.id);
  };
  _ctor.prototype.onLoss = function () {
    var e = _ctor.m_data;
    var o = r_BitCfg.BitLeveCoin[r_PlayerData.PlayerData.data.bitLeveCoin].coefficient;
    var i = e.isCoefficient ? o * e.count : e.count;
    null != e.layertIndex && e.isCoefficient && (i *= r_BitCfg.BitLayerCoeff[e.layertIndex]);
    r_BitResultData.BitResultData.addLoss(i);
    this.hide();
    this.openResultForId(e.id);
  };
  _ctor.prototype.openResultForId = function (e) {
    e > 100 && e < 105 && r_BitResultUI.BitResultUI.showUI();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TYEventDispatcher.TYEventDispatcher.dispatchEventWith(r_TYEvent.EventDef.bitPause);
  };
  _ctor.vieoNum = 0;
  _ctor.m_data = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.BitTipUI = exp_BitTipUI;