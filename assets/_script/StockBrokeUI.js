var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StockBrokeUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_StockUI = require("StockUI");
var r_StockSystem = require("StockSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_ReportSystem = require("ReportSystem");
var exp_StockBrokeUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Stock, r_UIDef.UIDef.Res.UI.StockBrokeUI) || this;
    t.curIndex = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.StockBrokeUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.StockBrokeUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.onClickHide, this);
    this.contentPane.getChild("btnVideo").asButton.onClick(this.onClickVideo, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.curIndex = 0;
    this.refreshInfo();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.refreshInfo = function () {
    var e = this.data.brokeList[this.curIndex];
    this.contentPane.getChild("name").text = r_StockUI.StockUI.nameList[e - 1];
  };
  _ctor.prototype.onClickHide = function () {
    var e = this.data.brokeList[this.curIndex];
    r_StockSystem.StockSystem.removeMyStock(e);
    if (this.curIndex >= this.data.brokeList.length - 1) {
      this.hide();
      return void (r_StockUI.StockUI.Inst && r_StockUI.StockUI.Inst.refreshMyList());
    }
    this.curIndex = this.curIndex + 1;
    this.refreshInfo();
  };
  _ctor.prototype.onClickVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("减少损失", function () {
      var t = e.data.brokeList[e.curIndex];
      var o = r_StockSystem.StockSystem.getMyStock(t);
      r_PlayerData.PlayerData.addCoin("切石头减少损失", .5 * o.buyPrice * o.buyNum, r_ReportSystem.SystemKey.石头);
      e.onClickHide();
    });
  };
  _ctor.Inst = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.StockBrokeUI = exp_StockBrokeUI;