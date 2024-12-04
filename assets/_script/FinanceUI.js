var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FinanceUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
require("FundUI");
var r_StockSystem = require("StockSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_StockMailUI = require("StockMailUI");
var r_MailSystem = require("MailSystem");
var r_SDKMgr1 = require("SDKMgr1");
var r_ResSystem = require("ResSystem");
var exp_FinanceUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Stock, r_UIDef.UIDef.Res.UI.FinanceUI) || this;
    t.uiType = "fullScreen";
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.FinanceUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.FinanceUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.contentPane.getChild("btnStock").asButton.onClick(this.onClickStock, this);
    this.contentPane.getChild("btnFund").asButton.onClick(this.onClickFund, this);
    this.contentPane.getChild("btnJack").asButton.onClick(this.onClickJack, this);
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/stock/stock", cc.Prefab, function (e, o) {
      t.prefab = cc.instantiate(o);
      t.prefab.active = true;
      t.contentPane.getChild("center").node.addChild(t.prefab);
      t.prefab.y = -500;
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    r_StockSystem.StockSystem.init();
    r_SDKMgr1.SDKMgr1.showBanner();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
    r_SDKMgr1.SDKMgr1.hideBanner();
  };
  _ctor.prototype.onClickStock = function () {
    r_StockSystem.StockSystem.popStock();
  };
  _ctor.prototype.onClickFund = function () {
    r_UtilsSystem.UtilsSystem.showTip("暂未开启");
  };
  _ctor.prototype.onClickJack = function () {
    r_MailSystem.MailSystem.hasMail(r_MailSystem.MailSystem.getMailCfg(r_MailSystem.MailSystem.monkeyMailId)) && r_StockMailUI.StockMailUI.showUI();
  };
  _ctor.Inst = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.FinanceUI = exp_FinanceUI;