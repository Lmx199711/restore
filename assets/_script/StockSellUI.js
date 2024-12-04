var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StockSellUI = undefined;
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_StockSystem = require("StockSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_TYIndex = require("TYIndex");
var r_StockUI = require("StockUI");
var exp_StockSellUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Stock, r_UIDef.UIDef.Res.UI.StockSellUI) || this;
    t.selectNum = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.StockSellUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.StockSellUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.contentPane.getChild("btnSell").asButton.onClick(this.onClickSell, this);
    this.btnMax = this.contentPane.getChild("btnMax").asButton;
    this.btnMax.onClick(this.onClickMax, this);
  };
  _ctor.prototype.onShown = function () {
    var o = this;
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    var i = this.contentPane.getChild("btnAdd").asButton;
    this.registBtn("btnBuy", i, function (e) {
      o.onClickAdd(e);
    });
    var n = this.contentPane.getChild("btnDel").asButton;
    this.registBtn("btnDel", n, function (e) {
      o.onClickDel(e);
    });
    this.selectNum = 1;
    this.refreshInfo();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
  };
  _ctor.prototype.registBtn = function (e, t, o) {
    var i = 0;
    t.off(cc.Node.EventType.TOUCH_START);
    t.off(cc.Node.EventType.TOUCH_MOVE);
    t.off(cc.Node.EventType.TOUCH_END);
    t.off(cc.Node.EventType.TOUCH_CANCEL);
    t.on(cc.Node.EventType.TOUCH_START, function () {
      o(1);
      i = 0;
      r_TimeSystem.TimeSystem.registUpdate(t, function (e) {
        (i += e) > .5 && o(30);
      });
    }, this);
    t.on(cc.Node.EventType.TOUCH_MOVE, function () {}, this);
    t.on(cc.Node.EventType.TOUCH_END, function () {
      r_TimeSystem.TimeSystem.unregistUpdate(t);
    }, this);
    t.on(cc.Node.EventType.TOUCH_CANCEL, function () {
      r_TimeSystem.TimeSystem.unregistUpdate(t);
    }, this);
  };
  _ctor.prototype.refreshInfo = function () {
    this.contentPane.getChild("leftNum").text = "(还剩下：" + (this.data.myInfo.buyNum - this.selectNum) + "股)";
    this.contentPane.getChild("num").text = this.selectNum + "";
    var e = Math.floor(this.selectNum * this.data.stockInfo.price * .98);
    var t = this.selectNum * this.data.myInfo.buyPrice;
    this.contentPane.getChild("loseNum").text = e >= t ? "盈利" + r_UtilsSystem.UtilsSystem.getShowCoin(e - t) : "亏损" + r_UtilsSystem.UtilsSystem.getShowCoin(t - e);
    this.contentPane.getChild("cost").text = r_UtilsSystem.UtilsSystem.getShowCoin(e) + "";
    this.contentPane.getChild("title").text = r_StockUI.StockUI.nameList[this.data.stockInfo.id - 1];
  };
  _ctor.prototype.onClickAdd = function (e) {
    undefined === e && (e = 1);
    if (!(this.selectNum >= this.data.myInfo.buyNum)) {
      this.selectNum = this.selectNum + e;
      this.selectNum > this.data.myInfo.buyNum && (this.selectNum = this.data.myInfo.buyNum);
      this.refreshInfo();
    }
  };
  _ctor.prototype.onClickDel = function (e) {
    undefined === e && (e = 1);
    if (!(this.selectNum <= 0)) {
      this.selectNum = this.selectNum - e;
      this.selectNum < 0 && (this.selectNum = 0);
      this.refreshInfo();
    }
  };
  _ctor.prototype.onClickSell = function () {
    if (this.selectNum > this.data.myInfo.buyNum) {
      r_UtilsSystem.UtilsSystem.showTip("数量不够");
    } else {
      for (var e = r_PlayerData.PlayerData.data.stockMap.myList.length - 1; e >= 0; e--) {
        if (this.data.myInfo.id == r_PlayerData.PlayerData.data.stockMap.myList[e].id) {
          r_PlayerData.PlayerData.data.stockMap.myList[e].buyNum = r_PlayerData.PlayerData.data.stockMap.myList[e].buyNum - this.selectNum;
          r_PlayerData.PlayerData.data.stockMap.myList[e].buyNum <= 0 && r_PlayerData.PlayerData.data.stockMap.myList.splice(e, 1);
        }
      }
      r_StockSystem.StockSystem.addStockNum(this.data.stockInfo.id, this.selectNum);
      var t = Math.floor(this.selectNum * this.data.stockInfo.price * .98);
      r_PlayerData.PlayerData.addCoin("卖出股票", t, r_ReportSystem.SystemKey.股市);
      this.hide();
      r_StockUI.StockUI.Inst && r_StockUI.StockUI.Inst.refreshList();
    }
  };
  _ctor.prototype.onClickMax = function () {
    this.selectNum = this.data.myInfo.buyNum;
    this.refreshInfo();
  };
  _ctor.Inst = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.StockSellUI = exp_StockSellUI;