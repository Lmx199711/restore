var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrapingCarUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_ScrapCarCom = require("ScrapCarCom");
var r_ScrapCarCfg = require("ScrapCarCfg");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ScrapSystem = require("ScrapSystem");
var r_BaseWin = require("BaseWin");
var r_TaskSystem = require("TaskSystem");
var r_TaskCfg = require("TaskCfg");
var r_FguiResSystem = require("FguiResSystem");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_AuctionHouseSystem = require("AuctionHouseSystem");
var r_UtilsSystem = require("UtilsSystem");
var exp_ScrapingCarUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.ScrapingCar, r_UIDef.UIDef.Res.UI.ScrapingCarUI) || this;
    t.uiType = "fullScreen";
    t.btnBack = null;
    t.btnStart = null;
    t.btnStartVideo = null;
    t.title = null;
    t.centerNode = null;
    t.scrapCarCom = null;
    t.currCarInfo = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.ScrapingCarUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.ScrapingCarUI);
  };
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
    this.btnBack = this.contentPane.getChild("btnBack");
    this.btnBack.onClick(this.clickBtnBack, this);
    this.btnStart = this.contentPane.getChild("btnStart");
    this.btnStart.onClick(this.onClickStart, this);
    this.btnStartVideo = this.contentPane.getChild("btnStartVideo");
    this.btnStartVideo.onClick(this.onClickStartVideo, this);
    this.btnStartVideo.visible = false;
    this.title = this.contentPane.getChild("title");
    this.btnDaren = this.contentPane.getChild("btnDaren");
    this.btnDaren.onClick(this.onClickTitle, this);
    this.centerNode = this.contentPane.getChild("center");
    this.addGamePrefab();
    this.items = [];
    for (var t = 0; t < 17; t++) {
      var o = this.contentPane.getChild("item" + t);
      this.items.push(o);
      o.onClick(this.onClickItem.bind(this, t), this);
    }
  };
  _ctor.prototype.onClickStart = function () {
    this.btnStart.visible = false;
    this.title.visible = false;
    this.scrapCarCom.initCarInfo(this.currCarInfo);
    this.scrapCarCom.startScrap();
    r_PlayerData.PlayerData.data.startScrapCar = 1;
    r_TaskSystem.TaskSystem.addDayTaskValue(r_TaskCfg.TaskDayType.刮车);
  };
  _ctor.prototype.onClickStartVideo = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("视频刮车", function () {
      e.btnStartVideo.visible = false;
      e.title.visible = false;
      e.scrapCarCom.initCarInfo(e.currCarInfo);
      e.scrapCarCom.startScrap();
      e.scrapCarCom.eraseCom.registTouch();
      r_TaskSystem.TaskSystem.addDayTaskValue(r_TaskCfg.TaskDayType.刮车);
    });
  };
  _ctor.prototype.clickBtnBack = function () {
    this.scrapCarCom.resetClean();
    this.hide();
  };
  _ctor.prototype.addGamePrefab = function () {
    var e = this;
    r_ResSystem.ResSystem.loadBundleRes("game2", "scrapingCar/prefab/ScrapCar", cc.Prefab, function (t, o) {
      if (t) {
        console.error("加载失败: ", t);
      } else {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(e, o);
        var i = cc.instantiate(o);
        e.centerNode.node.addChild(i);
        i.active = true;
        e.scrapCarCom = i.getComponent(r_ScrapCarCom.default);
      }
    });
  };
  _ctor.prototype.restart = function () {
    this.showStartBtn();
    this.scrapCarCom.resetClean();
    this.currCarInfo = r_ScrapSystem.ScrapSystem.getCarInfo();
  };
  _ctor.prototype.showStartBtn = function () {
    if (-1 == r_PlayerData.PlayerData.data.startScrapCar) {
      this.btnStart.visible = true;
      this.btnStartVideo.visible = false;
    } else {
      this.btnStartVideo.visible = true;
      this.btnStart.visible = false;
    }
  };
  _ctor.prototype.onClickTitle = function () {
    r_TYIndex.Platform.isDarenPlatform() && (this.contentPane.getChild("daren").visible = true);
  };
  _ctor.prototype.onClickItem = function (e) {
    var t = this;
    var o = r_ScrapCarCfg.ScrapCarCfg.findIndex(function (o) {
      return o.name == t.items[e].title;
    });
    this.currCarInfo = r_ScrapCarCfg.ScrapCarCfg[o];
    this.contentPane.getChild("daren").visible = false;
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.contentPane.getChild("daren").visible = false;
    this.title.visible = true;
    this.currCarInfo = r_ScrapSystem.ScrapSystem.getCarInfo();
    _ctor.instace = this;
    r_PlatformSystem.PlatformSystem.startRecorder();
    this.showStartBtn();
    r_AuctionHouseSystem.AuctionHouseSystem.setRandomMaxPrice(1);
    console.log("AuctionHouseSystem.maxPrice: ", r_AuctionHouseSystem.AuctionHouseSystem.maxPrice);
    this.labMaxPirce.text = r_UtilsSystem.UtilsSystem.getShowCoin(r_AuctionHouseSystem.AuctionHouseSystem.maxPrice);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.instace = null;
    r_PlatformSystem.PlatformSystem.stopRecorder();
  };
  _ctor.instace = null;
  __decorate([r_DecorateFunction1.AutoFind("labMaxPirce")], _ctor.prototype, "labMaxPirce", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.ScrapingCarUI = exp_ScrapingCarUI;