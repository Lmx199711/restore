var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CoinBillUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_SDKMgr1 = require("SDKMgr1");
var exp_CoinBillUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Phone, r_UIDef.UIDef.Res.UI.CoinBillUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.CoinBillUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.CoinBillUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.list = this.contentPane.getChild("list").asList;
    this.list.setVirtual();
    this.list.itemRenderer = this.onListRenderer.bind(this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.list.numItems = r_PlayerData.PlayerData.data.coinInfoList.length;
    r_SDKMgr1.SDKMgr1.hideCustomAd22();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_SDKMgr1.SDKMgr1.showCustomAd22(10, 170);
  };
  _ctor.prototype.onListRenderer = function (e, t) {
    var o = r_PlayerData.PlayerData.data.coinInfoList[r_PlayerData.PlayerData.data.coinInfoList.length - e - 1];
    t.getChild("day").text = "第" + o.day + "天";
    t.getChild("content").text = o.reason;
    if (o.num >= 0) {
      t.getChild("green").visible = false;
      t.getChild("red").visible = true;
      t.getChild("red").text = "+" + r_UtilsSystem.UtilsSystem.getShowCoin(o.num);
    } else {
      t.getChild("green").visible = true;
      t.getChild("red").visible = false;
      t.getChild("green").text = "-" + r_UtilsSystem.UtilsSystem.getShowCoin(Math.abs(o.num));
    }
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.CoinBillUI = exp_CoinBillUI;