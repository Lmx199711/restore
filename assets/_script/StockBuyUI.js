var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StockBuyUI = undefined;
var r_UIDef = require("UIDef");
var r_jsbi = require("jsbi");
var r_BigNumSystem = require("BigNumSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_StockSystem = require("StockSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_TYIndex = require("TYIndex");
var r_StockUI = require("StockUI");
var exp_StockBuyUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Stock, r_UIDef.UIDef.Res.UI.StockBuyUI) || this;
    t.selectNum = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.StockBuyUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.StockBuyUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.contentPane.getChild("btnOk").asButton.onClick(this.onClickBuy, this);
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
    this.selectNum > this.data.stockInfo.leftNum && (this.selectNum = this.data.stockInfo.leftNum);
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
    this.contentPane.getChild("leftNum").text = "(还剩下：" + (this.data.stockInfo.leftNum - this.selectNum) + "股)";
    this.contentPane.getChild("num").text = this.selectNum + "";
    this.contentPane.getChild("cost").text = r_UtilsSystem.UtilsSystem.getShowCoin(this.selectNum * this.data.stockInfo.price) + "";
    this.contentPane.getChild("title").text = r_StockUI.StockUI.nameList[this.data.stockInfo.id - 1];
  };
  _ctor.prototype.onClickAdd = function (e) {
    undefined === e && (e = 1);
    if (!(this.selectNum >= this.data.stockInfo.leftNum) && r_PlayerData.PlayerData.isCoinEnough((this.selectNum + 1) * this.data.stockInfo.price)) {
      if (!r_PlayerData.PlayerData.isCoinEnough((this.selectNum + e) * this.data.stockInfo.price)) {
        var t = e;
        for (var o = 0; o < t && !r_PlayerData.PlayerData.isCoinEnough((this.selectNum + e) * this.data.stockInfo.price); o++) {
          e -= 1;
        }
      }
      this.selectNum = this.selectNum + e;
      this.selectNum > this.data.stockInfo.leftNum && (this.selectNum = this.data.stockInfo.leftNum);
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
  _ctor.prototype.onClickBuy = function () {
    if (this.data.stockInfo.leftNum < this.selectNum) {
      r_UtilsSystem.UtilsSystem.showTip("数量不足");
    } else if (r_PlayerData.PlayerData.isCoinEnough(this.selectNum * this.data.stockInfo.price)) {
      r_StockSystem.StockSystem.addStockNum(this.data.stockInfo.id, -this.selectNum);
      r_PlayerData.PlayerData.deleteCoin("购买石头", this.selectNum * this.data.stockInfo.price, r_ReportSystem.SystemKey.石头, true);
      r_PlayerData.PlayerData.data.stockMap.myList || (r_PlayerData.PlayerData.data.stockMap.myList = []);
      var e = null;
      for (var t = 0; t < r_PlayerData.PlayerData.data.stockMap.myList.length; t++) {
        if (r_PlayerData.PlayerData.data.stockMap.myList[t].id == this.data.stockInfo.id) {
          e = r_PlayerData.PlayerData.data.stockMap.myList[t];
          break;
        }
      }
      if (!e) {
        (e = {}).id = this.data.stockInfo.id;
        e.buyPrice = this.data.stockInfo.price;
        e.buyNum = 0;
        r_PlayerData.PlayerData.data.stockMap.myList.push(e);
      }
      e.buyNum = e.buyNum + this.selectNum;
      r_PlayerData.PlayerData.saveData();
      r_UtilsSystem.UtilsSystem.showTip("购买成功");
      this.hide();
      r_StockUI.StockUI.Inst && r_StockUI.StockUI.Inst.refreshList();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("金币不足");
    }
  };
  _ctor.prototype.onClickMax = function () {
    var e = r_jsbi.default.divide(r_PlayerData.PlayerData.bigCoin, r_BigNumSystem.BigNumSystem.getNum(this.data.stockInfo.price));
    var t = parseInt(e.toString());
    this.selectNum = Math.min(t, this.data.stockInfo.leftNum);
    this.refreshInfo();
  };
  _ctor.Inst = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.StockBuyUI = exp_StockBuyUI;