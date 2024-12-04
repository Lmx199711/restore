var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SalvageResultUI = undefined;
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_TYIndex = require("TYIndex");
var r_SoundMgr = require("SoundMgr");
var r_SalvageSellUI = require("SalvageSellUI");
var exp_SalvageResultUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Salvage, r_UIDef.UIDef.Res.UI.SalvageResultUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.m_data = e;
    this.show(r_UIDef.UIDef.Urls.UI.SalvageResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SalvageResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.onBack, this);
    this.contentPane.getChild("btnSellVideo").asButton.onClick(this.onSellVideo, this);
    this.contentPane.getChild("btnDouble").asButton.onClick(this.onBtnDouble, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.contentPane.getChild("icon").asLoader.url = "ui://Salvage/SalvageProp" + this.data.id;
    this.contentPane.getChild("labName").asLabel.text = this.data.name;
    this.contentPane.getChild("labSellPrice").asLabel.text = r_UtilsSystem.UtilsSystem.getShowCoin(this.data.resultPrice);
    this.contentPane.getChild("labStroePrice").asLabel.text = r_UtilsSystem.UtilsSystem.getShowCoin(this.data.stroePrice);
    this.contentPane.getController("c1").setSelectedIndex(this.data.resultPrice >= this.data.stroePrice ? 0 : 1);
    r_SoundMgr.SoundMgr.playSound(this.data.resultPrice >= this.data.stroePrice ? "win" : "fail");
  };
  _ctor.prototype.onBack = function () {
    this.hide();
    r_SalvageSellUI.SalvageSellUI.hide();
    r_PlayerData.PlayerData.addCoin("拍卖成交", this.data.resultPrice, r_ReportSystem.SystemKey.强磁打捞);
  };
  _ctor.prototype.onSellVideo = function () {
    var e = this;
    var t = this;
    r_PlatformSystem.PlatformSystem.showVideo("原价出售", function () {
      r_PlayerData.PlayerData.addCoin("原价拍卖", t.data.stroePrice, r_ReportSystem.SystemKey.强磁打捞);
      e.hide();
      r_SalvageSellUI.SalvageSellUI.hide();
    });
  };
  _ctor.prototype.onBtnDouble = function () {
    var e = this;
    var t = this;
    r_PlatformSystem.PlatformSystem.showVideo("双倍出售", function () {
      r_PlayerData.PlayerData.addCoin("双倍拍卖", 2 * t.data.resultPrice, r_ReportSystem.SystemKey.强磁打捞);
      e.hide();
      r_SalvageSellUI.SalvageSellUI.hide();
    });
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.SalvageResultUI = exp_SalvageResultUI;