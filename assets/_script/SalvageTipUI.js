var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SalvageTipUI = undefined;
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_TYIndex = require("TYIndex");
var r_SoundMgr = require("SoundMgr");
var r_SalvageSellUI = require("SalvageSellUI");
var exp_SalvageTipUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Salvage, r_UIDef.UIDef.Res.UI.SalvageTipUI) || this;
    t.showAnimFlag = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.m_data = e;
    this.show(r_UIDef.UIDef.Urls.UI.SalvageTipUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SalvageUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnSell").asButton.onClick(this.onClickSell, this);
    this.contentPane.getChild("btnSalvage").asButton.onClick(this.onClickGotoSell, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.isShow = true;
    var o = _ctor.m_data;
    this.contentPane.getChild("icon").asLoader.url = "ui://Salvage/SalvageProp" + o.id;
    this.contentPane.getChild("labSell").asLabel.text = r_UtilsSystem.UtilsSystem.getShowCoin(o.initPrice);
    this.contentPane.getChild("labDesc").asLabel.text = o.desc;
    this.contentPane.getController("c1").setSelectedIndex(o.isSell);
    this.contentPane.getController("c2").setSelectedIndex(o.isRare);
    r_SoundMgr.SoundMgr.playSound("salvage/dalaobaowu");
    o.isRare && r_SoundMgr.SoundMgr.playSound("salvage/xiyou");
  };
  _ctor.prototype.onClickSell = function () {
    var e = _ctor.m_data;
    r_PlayerData.PlayerData.addCoin("卖出打捞物品", e.initPrice, r_ReportSystem.SystemKey.强磁打捞);
    this.hide();
  };
  _ctor.prototype.onClickGotoSell = function () {
    var e = _ctor.m_data;
    r_SalvageSellUI.SalvageSellUI.showUI(e);
    this.hide();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.isShow = false;
  };
  _ctor.isShow = false;
  return _ctor;
}(r_TYIndex.UIWind);
exports.SalvageTipUI = exp_SalvageTipUI;