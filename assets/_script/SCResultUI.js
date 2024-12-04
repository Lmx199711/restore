var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SCResultUI = undefined;
var r_UIDef = require("UIDef");
var r_FguiResSystem = require("FguiResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_TYIndex = require("TYIndex");
var r_AuctionHouseUI = require("AuctionHouseUI");
var r_HouseUI = require("HouseUI");
var r_SCResultAnimCom = require("SCResultAnimCom");
var r_ScrapingCarUI = require("ScrapingCarUI");
var exp_SCResultUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.ScrapingCar, r_UIDef.UIDef.Res.UI.SCResultUI) || this;
    t.btnSale = null;
    t.btnGet = null;
    t.btnSale2 = null;
    t.btnDoubleSale = null;
    t.sacleIncome = null;
    t.sacleIncome2 = null;
    t.btnController = null;
    t.centerNode = null;
    t.sCResultAnimCom = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SCResultUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SCResultUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnController = this.contentPane.getController("control");
    this.btnController.selectedIndex = 2;
    this.btnSale = this.contentPane.getChild("btnSale");
    this.btnSale.onClick(this.onclickSale.bind(this), this);
    this.sacleIncome = this.btnSale.getChild("income");
    this.btnGet = this.contentPane.getChild("btnGet");
    this.btnGet.onClick(this.onClickGet.bind(this), this);
    this.btnSale2 = this.contentPane.getChild("btnSale2");
    this.btnSale2.onClick(this.onClickSale2.bind(this), this);
    this.sacleIncome2 = this.btnSale2.getChild("income");
    this.labName = this.contentPane.getChild("labName");
    this.btnDoubleSale = this.contentPane.getChild("btnDouble");
    this.btnDoubleSale.onClick(this.onClickDouble.bind(this), this);
    this.btnAH = this.contentPane.getChild("btnAH");
    this.btnAH.onClick(this.onClickAH.bind(this), this);
    this.centerNode = this.contentPane.getChild("center");
    this.addAnimPrefab();
  };
  _ctor.prototype.addAnimPrefab = function () {
    var e = this;
    r_ResSystem.ResSystem.loadBundleRes("game2", "scrapingCar/prefab/SCResultAnim", cc.Prefab, function (t, o) {
      if (t) {
        console.error("加载失败: ", t);
      } else {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(e, o);
        var i = cc.instantiate(o);
        e.centerNode.node.addChild(i);
        e.sCResultAnimCom = i.getComponent(r_SCResultAnimCom.default);
        e.sCResultAnimCom.showAnim(e.data, e.showBtn.bind(e));
      }
    });
  };
  _ctor.prototype.showBtn = function () {
    if (16 != this.data.id) {
      if (this.data.isRare) {
        this.btnController.selectedIndex = 1;
      } else {
        this.btnController.selectedIndex = 0;
      }
    } else {
      this.btnController.selectedIndex = 3;
    }
  };
  _ctor.prototype.onclickSale = function () {
    var e = this.data.income;
    r_PlayerData.PlayerData.addCoin("出卖座驾", e, r_ReportSystem.SystemKey.小游戏);
    r_ScrapingCarUI.ScrapingCarUI.instace.restart();
    this.hide();
    r_ScrapingCarUI.ScrapingCarUI.showUI();
  };
  _ctor.prototype.onClickSale2 = function () {
    var e = this.data.income;
    r_PlayerData.PlayerData.addCoin("出卖座驾", e, r_ReportSystem.SystemKey.小游戏);
    r_ScrapingCarUI.ScrapingCarUI.instace.restart();
    this.hide();
    r_ScrapingCarUI.ScrapingCarUI.showUI();
  };
  _ctor.prototype.onClickGet = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("获得座驾", function () {
      r_PlayerData.PlayerData.data.getCarId = e.data.id;
      r_PlayerData.PlayerData.saveData();
      e.hide();
      r_ScrapingCarUI.ScrapingCarUI.hide();
      r_TimeSystem.TimeSystem.scheduleOnce("HouseUIshowUI", .1, function () {
        r_HouseUI.default.showUI();
      });
    });
  };
  _ctor.prototype.onClickDouble = function () {
    var e = this;
    var t = 2 * this.data.income;
    r_PlatformSystem.PlatformSystem.showVideo("双倍卖出", function () {
      r_ScrapingCarUI.ScrapingCarUI.instace.restart();
      r_PlayerData.PlayerData.addCoin("出卖座驾", t, r_ReportSystem.SystemKey.小游戏);
      e.hide();
      r_ScrapingCarUI.ScrapingCarUI.showUI();
    });
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.btnController.selectedIndex = 2;
    this.sacleIncome2.text = r_UtilsSystem.UtilsSystem.getShowCoin(this.data.income);
    this.sacleIncome.text = r_UtilsSystem.UtilsSystem.getShowCoin(this.data.income);
    this.sCResultAnimCom && this.sCResultAnimCom.showAnim(this.data, this.showBtn.bind(this));
    this.labName.text = this.data.name;
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_ScrapingCarUI.ScrapingCarUI.instace && (r_ScrapingCarUI.ScrapingCarUI.instace.title.visible = true);
    this.sCResultAnimCom && this.sCResultAnimCom.hideAnim();
  };
  _ctor.prototype.onClickAH = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("拍卖劳斯莱斯", function () {
      r_ScrapingCarUI.ScrapingCarUI.instace.restart();
      e.hide();
      r_ScrapingCarUI.ScrapingCarUI.showUI();
      r_AuctionHouseUI.default.showUI();
    });
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.SCResultUI = exp_SCResultUI;