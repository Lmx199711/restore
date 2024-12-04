var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuyInkUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PrinterCfg = require("PrinterCfg");
var r_PlayerData = require("PlayerData");
var r_PlatformSystem = require("PlatformSystem");
var r_PrinterCommon = require("PrinterCommon");
var r_UtilsSystem = require("UtilsSystem");
var r_ReportSystem = require("ReportSystem");
var exp_BuyInkUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Printer, r_UIDef.UIDef.Res.UI.BuyInkUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.BuyInkUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BuyInkUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").onClick(this.hide, this);
    this.list = this.contentPane.getChild("list");
    this.list.itemRenderer = this.onItemRenderer.bind(this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.list.numItems = 4;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.setVideoCount = function (e) {
    var t = r_PrinterCommon.PrinterCommon.getData("BuyInkVideo") || 0;
    this.list.getChildAt(e).asCom.getChild("btnBuy").asButton.title = "(" + t + " / " + r_PrinterCfg.BuyInkInfo[e].cost + ")";
  };
  _ctor.prototype.btnBuyClick = function (e) {
    var t = this;
    var o = r_PrinterCfg.BuyInkInfo[e];
    switch (e) {
      case 0:
        r_PrinterCommon.PrinterCommon.addInkCount(o.count);
        break;
      case 1:
        r_PlatformSystem.PlatformSystem.showVideo("购买墨水", function () {
          var e = r_PrinterCommon.PrinterCommon.getData("BuyInkVideo") || 0;
          e++;
          r_PrinterCommon.PrinterCommon.setData("BuyInkVideo", e);
          if (e >= r_PrinterCfg.BuyInkInfo[1].cost) {
            r_PrinterCommon.PrinterCommon.addInkCount(r_PrinterCfg.BuyInkInfo[1].count);
            r_PrinterCommon.PrinterCommon.setData("BuyInkVideo", 0);
          }
          t.setVideoCount(1);
        });
        break;
      case 2:
      case 3:
        if (r_PlayerData.PlayerData.isCoinEnough(o.cost)) {
          r_PlayerData.PlayerData.deleteCoin("购买墨水", o.cost, r_ReportSystem.SystemKey.None);
          r_PrinterCommon.PrinterCommon.addInkCount(o.count);
        } else {
          r_UtilsSystem.UtilsSystem.showTip("钱不够~");
        }
    }
  };
  _ctor.prototype.onItemRenderer = function (e, t) {
    t.getChild("title").asTextField.text = r_PrinterCfg.BuyInkInfo[e].count + "瓶墨水";
    t.getChild("icon").asLoader.url = "ui://" + r_UIDef.UIDef.Pack.Printer + "/inkIcon" + e;
    t.getChild("btnBuy").asCom.getController("type").selectedIndex = e;
    if (1 == e) {
      this.setVideoCount(e);
    } else {
      t.getChild("btnBuy").asButton.title = r_PrinterCfg.BuyInkInfo[e].cost.toString();
    }
    t.getChild("btnBuy").clearClick();
    t.getChild("btnBuy").onClick(this.btnBuyClick.bind(this, e), this);
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.BuyInkUI = exp_BuyInkUI;