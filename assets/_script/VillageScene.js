var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VillageScene = undefined;
var r_ResSystem = require("ResSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_MainUI = require("MainUI");
var r_BlockSystem = require("BlockSystem");
var r_CatchFishUI = require("CatchFishUI");
var r_PreloadSystem = require("PreloadSystem");
var r_UIDef = require("UIDef");
var r_PlayerData = require("PlayerData");
var r_DialogueUI = require("DialogueUI");
var r_BaseCom = require("BaseCom");
var r_FarmUI = require("FarmUI");
var r_ChatSystem = require("ChatSystem");
var r_VillageBuyUI = require("VillageBuyUI");
var r_MarketUI = require("MarketUI");
var r_CountMoneyUI = require("CountMoneyUI");
var r_HomeworkEntryUI = require("HomeworkEntryUI");
var r_MysteryShopUI = require("MysteryShopUI");
var r_FerruleGameEnter = require("FerruleGameEnter");
var r_HuntUI = require("HuntUI");
var r_HuntCaidanUI = require("HuntCaidanUI");
var exp_VillageScene = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.onConstruct = function () {
    var t = this;
    e.prototype.onConstruct.call(this);
    this.btnOldCity = this.getChild("btnOldCity");
    this.btnFish = this.getChild("btnFish");
    this.btnFarm = this.getChild("btnFarm");
    this.btnMarket = this.getChild("btnMarket");
    this.btnShop = this.getChild("btnShop");
    this.btnVilla = this.getChild("btnVilla");
    this.btnStreetGame = this.getChild("btnStreetGame");
    this.btnHunt = this.getChild("btnHunt");
    this.birdAnim = this.getChild("birdAnim");
    this.cloudAnim = this.getChild("cloudAnim");
    this.btnHuiShou = this.getChild("btnHuiShou");
    this.btnTunshu = this.getChild("btnTunshu");
    this.btnHuntCaidan = this.getChild("btnHuntCaidan");
    this.refreshBtn();
    this.btnTunshu.visible = !r_BlockSystem.BlockSystem.isBlock(r_BlockSystem.BlockTrickType.寒假作业);
    this.bindBtnCallback(this.btnOldCity, this.btnFish, this.btnFarm, this.btnMarket, this.btnShop, this.btnVilla, this.btnStreetGame, this.btnHunt, this.btnHuiShou, this.btnTunshu, this.btnHuntCaidan);
    r_ResSystem.ResSystem.loadBundleRes("bundle2", "villageScene/birdAnim", cc.Prefab, function (e, o) {
      if (e) {
        console.log("加载预制体错误>:", e);
      } else {
        t.birdAnim.node.removeAllChildren();
        var i = cc.instantiate(o);
        t.birdAnim.node.addChild(i);
      }
    });
    r_ResSystem.ResSystem.loadBundleRes("bundle2", "villageScene/couldAnim", cc.Prefab, function (e, o) {
      if (e) {
        console.log("加载预制体错误>:", e);
      } else {
        t.cloudAnim.node.removeAllChildren();
        var i = cc.instantiate(o);
        t.cloudAnim.node.addChild(i);
      }
    });
    r_ResSystem.ResSystem.loadBundleRes("bundle2", "villageScene/小强回收", cc.Prefab, function (e, o) {
      if (e) {
        console.log("加载预制体错误>:", e);
      } else {
        t.btnHuiShou.node.removeAllChildren();
        var i = cc.instantiate(o);
        t.btnHuiShou.node.addChild(i);
      }
    });
    this.checkIsLockHuiShou();
  };
  _ctor.prototype.init = function () {
    this.checkIsLockHuiShou();
  };
  _ctor.prototype.touchBtn = function (e) {
    switch (e) {
      case "btnOldCity":
        r_MainUI.MainUI.Inst && r_MainUI.MainUI.Inst.changeCity(0);
        break;
      case "btnHuiShou":
        this.onClickHuiShou();
        break;
      case "btnFish":
        this.clickCatchFish();
        break;
      case "btnFarm":
        if (r_BlockSystem.BlockSystem.isBlock(r_BlockSystem.BlockTrickType.农场)) {
          r_UtilsSystem.UtilsSystem.showTip("暂未开放");
        } else {
          this.clickFarm();
        }
        break;
      case "btnMarket":
        this.clickMarket();
        break;
      case "btnShop":
        if (r_BlockSystem.BlockSystem.isBlock(r_BlockSystem.BlockTrickType.神秘商店)) {
          r_UtilsSystem.UtilsSystem.showTip("暂未开放");
        } else {
          r_MysteryShopUI.default.showUI();
        }
        break;
      case "btnVilla":
        this.clickVilla();
        break;
      case "btnStreetGame":
        if (r_BlockSystem.BlockSystem.isBlock(r_BlockSystem.BlockTrickType.套圈)) {
          return void r_UtilsSystem.UtilsSystem.showTip("暂未开放");
        }
        r_FerruleGameEnter.FerruleGameEnter.showUI();
        break;
      case "btnHunt":
        if (r_BlockSystem.BlockSystem.isBlock(r_BlockSystem.BlockTrickType.猎场)) {
          return void r_UtilsSystem.UtilsSystem.showTip("暂未开放");
        }
        r_HuntUI.HuntUI.showUI();
        break;
      case "btnHuntCaidan":
        r_HuntCaidanUI.HuntCaidanUI.showUI();
        break;
      case "btnTunshu":
        r_HomeworkEntryUI.default.showUI();
        break;
      default:
        r_UtilsSystem.UtilsSystem.showTip("暂未开放");
    }
  };
  _ctor.prototype.checkIsLockHuiShou = function () {
    r_ChatSystem.ChatSystem.isTaskFinish(46) && (r_PlayerData.PlayerData.data.riverHaiBoDong.unlock = 1);
    if (r_PlayerData.PlayerData.data.riverHaiBoDong.unlock) {
      this.btnHuiShou.visible = true;
    } else {
      this.btnHuiShou.visible = false;
    }
  };
  _ctor.prototype.onClickHuiShou = function () {
    if (r_PlayerData.PlayerData.data.riverHaiBoDong.firstClick) {
      r_VillageBuyUI.VillageBuyUI.showUI();
    } else {
      r_DialogueUI.DialogueUI.showUI(502);
      r_PlayerData.PlayerData.data.riverHaiBoDong.firstClick = 1;
      r_PlayerData.PlayerData.saveData();
    }
  };
  _ctor.prototype.clickCatchFish = function () {
    r_UtilsSystem.UtilsSystem.showLoading(true);
    r_PreloadSystem.PreloadSystem.preloadFguiRes({
      path: r_UIDef.UIDef.Pack.CatchFish
    }, function () {
      r_ResSystem.ResSystem.loadBundleRes("game1", "fishBoat/catchFish", cc.Prefab, function () {
        r_UtilsSystem.UtilsSystem.showLoading(false);
        r_CatchFishUI.CatchFishUI.showUI();
      });
    });
  };
  _ctor.showUI = function (t) {
    e.onShown.call(this, t);
    r_MainUI.MainUI.Inst.contentPane.getController("c1").selectedIndex = 3;
    r_MainUI.MainUI.Inst.VillageScene.checkIsLockHuiShou();
  };
  _ctor.prototype.clickFarm = function () {
    r_UtilsSystem.UtilsSystem.showLoading(true);
    r_PreloadSystem.PreloadSystem.preloadFguiRes({
      path: r_UIDef.UIDef.Pack.Farm
    }, function () {
      r_ResSystem.ResSystem.loadBundleRes("game2", "farm/farm", cc.Prefab, function () {
        r_UtilsSystem.UtilsSystem.showLoading(false);
        r_FarmUI.FarmUI.showUI();
      });
    });
  };
  _ctor.prototype.clickMarket = function () {
    r_UtilsSystem.UtilsSystem.showLoading(true);
    r_PreloadSystem.PreloadSystem.preloadFguiRes({
      path: r_UIDef.UIDef.Pack.Market
    }, function () {
      r_UtilsSystem.UtilsSystem.showLoading(false);
      r_MarketUI.MarketUI.showUI();
    });
  };
  _ctor.prototype.clickVilla = function () {
    var e = this;
    if (r_BlockSystem.BlockSystem.isBlock(r_BlockSystem.BlockTrickType.数钱)) {
      return r_UtilsSystem.UtilsSystem.showTip("暂未开放");
    }
    r_UtilsSystem.UtilsSystem.showLoading(true);
    r_PreloadSystem.PreloadSystem.preloadFguiRes({
      path: r_UIDef.UIDef.Pack.CountMoney
    }, function () {
      r_ResSystem.ResSystem.loadBundleRes("game1", "countMoney/countMoneyPrefab", cc.Prefab, function () {
        return __awaiter(e, undefined, undefined, function () {
          return __generator(this, function () {
            r_UtilsSystem.UtilsSystem.showLoading(false);
            r_CountMoneyUI.CountMoneyUI.showUI();
            return [2];
          });
        });
      });
    });
  };
  _ctor.prototype.refreshBtn = function () {
    this.btnTunshu.getController("c1").selectedIndex = r_PlayerData.PlayerData.data.homeworkCaidan;
    if (r_PlayerData.PlayerData.data.huntMap.pass && !r_PlayerData.PlayerData.data.huntMap.caidan1) {
      if (r_BlockSystem.BlockSystem.isBlock(r_BlockSystem.BlockTrickType.猎场)) {
        this.btnHuntCaidan.visible = false;
      } else {
        this.btnHuntCaidan.visible = true;
      }
    } else {
      this.btnHuntCaidan.visible = false;
    }
  };
  return _ctor;
}(r_BaseCom.BaseCom);
exports.VillageScene = exp_VillageScene;