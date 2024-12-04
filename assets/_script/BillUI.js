var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BillUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_ReportSystem = require("ReportSystem");
var exp_BillUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Coin, r_UIDef.UIDef.Res.UI.BillUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.BillUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BillUI);
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
    this.list.numItems = r_PlayerData.PlayerData.data.billListNew.length;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.onListRenderer = function (e, t) {
    var o = this;
    var i = r_PlayerData.PlayerData.data.billListNew[e];
    var n = i.diyBill;
    t.getChild("title").text = n.billTile;
    t.getChild("content").text = n.billContent;
    t.getChild("time").text = "已还清" + i.day + "日";
    t.getChild("btnPayOff").clearClick();
    t.getChild("btnPayOff").onClick(function () {
      console.log("点击一次还清");
      var t = (n.day - i.day) * n.dayCoin;
      if (r_PlayerData.PlayerData.isCoinEnough(t)) {
        r_PlayerData.PlayerData.data.billListNew.splice(e, 1);
        r_PlayerData.PlayerData.deleteCoin("还账一次还清", t, r_ReportSystem.SystemKey.银行贷款还款);
        o.list.numItems = r_PlayerData.PlayerData.data.billListNew.length;
      } else {
        r_UtilsSystem.UtilsSystem.showTip("钱不够~");
      }
    }, this);
  };
  _ctor.prototype.onClickHot = function () {
    this.hide();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.BillUI = exp_BillUI;