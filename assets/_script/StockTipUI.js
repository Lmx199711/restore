var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StockTipUI = undefined;
var r_UIDef = require("UIDef");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_UtilsSystem = require("UtilsSystem");
var r_TYIndex = require("TYIndex");
var r_StockUI = require("StockUI");
var exp_StockTipUI = function (e) {
  function _ctor() {
    return e.call(this, r_UIDef.UIDef.Pack.Stock, r_UIDef.UIDef.Res.UI.StockTipUI) || this;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.StockTipUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.StockTipUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    this.contentPane.getChild("btnBack2").asButton.onClick(this.hide, this);
    this.contentPane.getChild("btnBack3").asButton.onClick(this.hide, this);
    this.contentPane.getChild("btnAdd").asButton.onClick(this.onClickAdd, this);
    this.contentPane.getChild("btnInfo").asButton.onClick(this.onClickInfo, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    this.refreshInfo();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
    r_StockUI.StockUI.showUI();
  };
  _ctor.prototype.refreshInfo = function () {
    if (r_PlayerData.PlayerData.data.stockMap.watchUpNum) {
      if (1 == r_PlayerData.PlayerData.data.stockMap.watchUpNum) {
        this.contentPane.getController("mode").selectedIndex = 1;
        var e = [];
        for (var t = 0; t < r_PlayerData.PlayerData.data.stockMap.stockList.length; t++) {
          r_PlayerData.PlayerData.data.stockMap.stockList[t].id != r_PlayerData.PlayerData.data.stockMap.upId && e.push(r_PlayerData.PlayerData.data.stockMap.stockList[t].id);
        }
        r_UtilsSystem.UtilsSystem.shuffle(e);
        var o = [e[0], e[1], r_PlayerData.PlayerData.data.stockMap.upId];
        r_UtilsSystem.UtilsSystem.shuffle(o);
        var i = "";
        for (t = 0; t < 3; t++) {
          i = i + "【" + r_StockUI.StockUI.nameList[o[t] - 1] + "】";
        }
        this.contentPane.getChild("content2").text = "感谢款待,这样吧,我透露一些消息给你吧,根据我的观察[color=#DA694B]" + i + "[/color]这几只股其中会大涨,你关注一下";
        r_StockUI.StockUI.popTipNum = 2;
      } else {
        this.contentPane.getController("mode").selectedIndex = 2;
        i = "【" + r_StockUI.StockUI.nameList[r_PlayerData.PlayerData.data.stockMap.upId - 1] + "】";
        this.contentPane.getChild("content2").text = "经过我潜心研究，发现今日那只必涨的股票就是[color=#DA694B]" + i + "[/color]，你买下来就知道了！";
        r_StockUI.StockUI.popTipNum = 3;
      }
    } else {
      this.contentPane.getController("mode").selectedIndex = 0;
      r_StockUI.StockUI.popTipNum = 1;
    }
  };
  _ctor.prototype.onClickAdd = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("股票消息", function () {
      r_PlayerData.PlayerData.data.stockMap.watchUpNum = 1;
      r_PlayerData.PlayerData.saveData();
      e.refreshInfo();
    });
  };
  _ctor.prototype.onClickInfo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("股票精确消息", function () {
      r_PlayerData.PlayerData.data.stockMap.watchUpNum = 2;
      r_PlayerData.PlayerData.saveData();
      e.refreshInfo();
    });
  };
  _ctor.Inst = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.StockTipUI = exp_StockTipUI;