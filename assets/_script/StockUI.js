var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StockUI = undefined;
var r_UIDef = require("UIDef");
var r_SDKMgr1 = require("SDKMgr1");
var r_DaySystem = require("DaySystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_StockSystem = require("StockSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_TYIndex = require("TYIndex");
var r_StockBuyUI = require("StockBuyUI");
var r_StockSellUI = require("StockSellUI");
var exp_StockUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Stock, r_UIDef.UIDef.Res.UI.StockUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.StockUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.StockUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.contentPane.getChild("btnAll").asButton.onClick(this.onClickAll, this);
    this.contentPane.getChild("btnMy").asButton.onClick(this.onClickMy, this);
    this.contentPane.getChild("btnRefresh").asButton.onClick(this.onClickRefresh, this);
    this.allList = this.contentPane.getChild("list").asList;
    this.allList.setVirtual();
    this.allList.itemRenderer = this.onAllListRenderer.bind(this);
    this.myList = this.contentPane.getChild("myList").asList;
    this.myList.setVirtual();
    this.myList.itemRenderer = this.onMyListRenderer.bind(this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    this.contentPane.getController("mode").selectedIndex = 0;
    this.refreshList();
    this.showPop();
    r_TimeSystem.TimeSystem.registSecondUpdate("StockUIUpdate", function () {
      r_StockSystem.StockSystem.checkRefresh(true);
      r_StockSystem.StockSystem.checkRefreshBroke();
    });
    r_SDKMgr1.SDKMgr1.hideBanner();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
    r_TimeSystem.TimeSystem.unregistSecondUpdate("StockUIUpdate");
    for (var o = 0; o < _ctor.nameList.length; o++) {
      r_TimeSystem.TimeSystem.unregistSecondUpdate("stockbrokeupdate" + o);
    }
    r_SDKMgr1.SDKMgr1.showBanner();
  };
  _ctor.prototype.showPop = function () {
    r_StockSystem.StockSystem.checkShowBlockLayer();
  };
  _ctor.prototype.refreshList = function () {
    this.allList.numItems = r_PlayerData.PlayerData.data.stockMap.stockList.length;
    this.refreshMyList();
  };
  _ctor.prototype.refreshMyList = function () {
    r_PlayerData.PlayerData.data.stockMap.myList || (r_PlayerData.PlayerData.data.stockMap.myList = []);
    this.myList.numItems = r_PlayerData.PlayerData.data.stockMap.myList.length;
  };
  _ctor.prototype.onAllListRenderer = function (e, o) {
    var i = this;
    var n = r_PlayerData.PlayerData.data.stockMap.stockList[e];
    o.getChild("name").text = _ctor.nameList[n.id - 1];
    o.getChild("price").text = r_UtilsSystem.UtilsSystem.getShowCoin(n.price) + "";
    o.getChild("rate").text = n.rate + "%";
    if (o.registKey) {
      r_TimeSystem.TimeSystem.unregistSecondUpdate(o.registKey);
      o.registKey = null;
    }
    if (n.isbroke) {
      o.getChild("red").visible = true;
      o.getChild("red").grayed = true;
      o.getChild("green").visible = false;
      o.getController("mode").selectedIndex = 1;
      o.getChild("name").color = _ctor.gray;
      var a = function () {
        var t = r_PlayerData.PlayerData.data.time - n.brokeTime;
        if (t >= r_DaySystem.DaySystem.daySecond) {
          n.price = r_UtilsSystem.UtilsSystem.getRandomNum(2e4, 3e5);
          n.rate = r_UtilsSystem.UtilsSystem.getRandomNum(-15, 15);
          n.leftNum = r_UtilsSystem.UtilsSystem.getRandomNum(6e3, 12e3);
          n.isbroke = false;
          n.brokeTime = 0;
          r_PlayerData.PlayerData.saveData();
          r_TimeSystem.TimeSystem.unregistSecondUpdate("stockbrokeupdate" + e);
          i.onAllListRenderer(e, o);
        } else {
          o.getChild("time").text = r_TimeSystem.TimeSystem.getHourMinTime(r_DaySystem.DaySystem.daySecond - t);
        }
      };
      r_TimeSystem.TimeSystem.registSecondUpdate("stockbrokeupdate" + e, function () {
        a();
      });
      o.registKey = "stockbrokeupdate" + e;
      a();
    } else if (n.rate >= 0) {
      o.getController("mode").selectedIndex = 0;
      o.getChild("red").visible = true;
      o.getChild("red").grayed = false;
      o.getChild("green").visible = false;
      o.getChild("name").color = _ctor.red;
      o.getChild("price").color = _ctor.red;
      o.getChild("rate").color = _ctor.red;
    } else {
      o.getController("mode").selectedIndex = 0;
      o.getChild("red").visible = false;
      o.getChild("red").grayed = false;
      o.getChild("green").visible = true;
      o.getChild("name").color = _ctor.green;
      o.getChild("price").color = _ctor.green;
      o.getChild("rate").color = _ctor.green;
    }
    o.getChild("red").visible = false;
    o.getChild("green").visible = false;
    o.getChild("btnBuy").clearClick();
    o.getChild("btnBuy").onClick(function () {
      console.log("点击购买");
      r_StockBuyUI.StockBuyUI.showUI({
        stockInfo: n
      });
    }, this);
  };
  _ctor.prototype.onMyListRenderer = function (e, o) {
    var i = r_PlayerData.PlayerData.data.stockMap.myList[e];
    var n = r_StockSystem.StockSystem.getStockInfo(i.id);
    o.getChild("name").text = _ctor.nameList[n.id - 1];
    o.getChild("price").text = r_UtilsSystem.UtilsSystem.getShowCoin(n.price) + "";
    o.getChild("rate").text = n.rate + "%";
    o.getChild("buyPrice").text = r_UtilsSystem.UtilsSystem.getShowCoin(i.buyPrice) + "";
    o.getChild("num").text = i.buyNum;
    if (n.rate >= 0) {
      o.getChild("name").color = _ctor.red;
      o.getChild("price").color = _ctor.red;
      o.getChild("rate").color = _ctor.red;
      o.getChild("buyPrice").color = _ctor.red;
      o.getChild("num").color = _ctor.red;
      o.getChild("red").visible = true;
      o.getChild("red").grayed = false;
      o.getChild("green").visible = false;
    } else {
      o.getChild("name").color = _ctor.green;
      o.getChild("price").color = _ctor.green;
      o.getChild("rate").color = _ctor.green;
      o.getChild("buyPrice").color = _ctor.green;
      o.getChild("num").color = _ctor.green;
      o.getChild("red").visible = false;
      o.getChild("red").grayed = false;
      o.getChild("green").visible = true;
    }
    o.getChild("red").visible = false;
    o.getChild("green").visible = false;
    o.getChild("btnBuy").clearClick();
    o.getChild("btnBuy").onClick(function () {
      console.log("点击购买");
      r_StockBuyUI.StockBuyUI.showUI({
        stockInfo: n
      });
    }, this);
    o.getChild("btnSell").clearClick();
    o.getChild("btnSell").onClick(function () {
      console.log("点击卖出");
      r_StockSellUI.StockSellUI.showUI({
        stockInfo: n,
        myInfo: i
      });
    }, this);
  };
  _ctor.prototype.onClickAll = function () {
    this.contentPane.getController("mode").selectedIndex = 0;
  };
  _ctor.prototype.onClickMy = function () {
    this.contentPane.getController("mode").selectedIndex = 1;
  };
  _ctor.prototype.onClickRefresh = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("股票刷新", function () {
      r_StockSystem.StockSystem.refresh();
      e.refreshList();
      r_StockSystem.StockSystem.checkShowBlockLayer();
    });
  };
  _ctor.nameList = ["建工集团", "疼讯科技", "美困外卖", "常来常往", "并夕夕", "逗鱼直播", "啃得急", "网抑云音乐", "饿了没", "菠萝手机", "碧桂圆地产", "万大集团", "笔压地汽车", "哈喽出门", "格里空调", "必雪冰城", "小绿书", "低德地图", "旺者农药", "京西购物"];
  _ctor.Inst = null;
  _ctor.red = new cc.Color(207, 58, 47, 255);
  _ctor.green = new cc.Color(85, 170, 40, 255);
  _ctor.gray = new cc.Color(128, 128, 128, 255);
  _ctor.popTipNum = 0;
  return _ctor;
}(r_TYIndex.UIWind);
exports.StockUI = exp_StockUI;