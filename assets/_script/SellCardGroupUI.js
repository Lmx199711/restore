var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SellCardGroupUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_PrinterCommon = require("PrinterCommon");
var r_PrinterCfg = require("PrinterCfg");
var r_UtilsSystem = require("UtilsSystem");
var r_RoleSystem = require("RoleSystem");
var exp_SellCardGroupUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Printer, r_UIDef.UIDef.Res.UI.SellCardGroupUI) || this;
    t.price = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SellCardGroupUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SellCardGroupUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnNO").onClick(this.hide, this);
    this.contentPane.getChild("btnOK").onClick(function () {
      t.sellCardGroup(t.data.type);
      t.hide();
    }, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.price = r_PrinterCfg.CardGroupReward.sell;
    this.contentPane.getChild("desc").asTextField.setVar("type", r_PrinterCfg.CardType[this.data.type]).setVar("price", r_UtilsSystem.UtilsSystem.getShowCoin(this.price)).flushVars();
    r_PrinterCommon.PrinterCommon.setShowSellCardGroupTime();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    if (this.data.closeCallback) {
      this.data.closeCallback();
      this.data.closeCallback = null;
    }
  };
  _ctor.prototype.sellCardGroup = function (e) {
    for (var t = r_PrinterCommon.PrinterCommon.curCardList.length - 1; t >= 0; t--) {
      r_PrinterCommon.PrinterCommon.curCardList[t].type == e && r_PrinterCommon.PrinterCommon.curCardList.splice(t, 1);
    }
    r_PrinterCommon.PrinterCommon.setData("curCardList", r_PrinterCommon.PrinterCommon.curCardList);
    r_PlayerData.PlayerData.addCoin(r_RoleSystem.ExpType.其它, this.price);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.SellCardGroupUI = exp_SellCardGroupUI;