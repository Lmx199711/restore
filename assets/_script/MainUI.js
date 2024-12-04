var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_SettingUI = require("SettingUI");
var r_SoundMgr = require("SoundMgr");
var r_BillUI = require("BillUI");
var r_TimeSystem = require("TimeSystem");
var r_BillSystem = require("BillSystem");
var r_PlayerData = require("PlayerData");
var r_ResSystem = require("ResSystem");
var r_GuideSystem = require("GuideSystem");
var r_PreloadSystem = require("PreloadSystem");
var r_RankAreaUI = require("RankAreaUI");
var r_DaySystem = require("DaySystem");
var r_UtilsSystem = require("UtilsSystem");
var r_PhoneUI = require("PhoneUI");
var r_PhoneSystem = require("PhoneSystem");
var r_RankUI = require("RankUI");
var r_AlmanacUI = require("AlmanacUI");
var r_AlmanacResultUI = require("AlmanacResultUI");
var r_PlatformSystem = require("PlatformSystem");
var r_PlatformBytedance = require("PlatformBytedance");
var r_BankSystem = require("BankSystem");
var r_BankTipUI = require("BankTipUI");
var r_BankResultUI = require("BankResultUI");
var r_MainHomeUI = require("MainHomeUI");
var r_SecretUI = require("SecretUI");
var r_RoleSystem = require("RoleSystem");
var r_BaseWin = require("BaseWin");
var r_DeskUI = require("DeskUI");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_HouseSystem = require("HouseSystem");
var r_EntryCityUI = require("EntryCityUI");
var r_DialogueUI = require("DialogueUI");
var r_BagGoodsUI = require("BagGoodsUI");
var r_LimitSystem = require("LimitSystem");
var r_EntryCitySystem = require("EntryCitySystem");
var r_GroupSystem = require("GroupSystem");
var exp_MainUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Main, r_UIDef.UIDef.Res.UI.MainUI) || this;
    t.uiType = "fullScreen";
    t.isShowAd = false;
    t.isOneStart = true;
    t.isOnce = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.MainUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MainUI);
  };
  _ctor.prototype.onInit = function () {
    var o = this;
    e.prototype.onInit.call(this);
    console.log("playerDataFilePath: ", r_PlatformBytedance.PlatformBytedance.playerDataFilePath);
    this.btnChat = this.contentPane.getChild("btnChat").asButton;
    this.btnChat.onClick(this.onClickChat, this);
    this.btnBill = this.contentPane.getChild("btnBill").asButton;
    this.btnBill.onClick(this.onClickBill, this);
    this.btnAlmanac = this.contentPane.getChild("btnAlmanac").asButton;
    this.btnAlmanac.onClick(this.onClickAlmanac, this);
    this.btnAlmanac.visible = false;
    this.freeCom = this.contentPane.getChild("freeCom").asButton;
    this.refreshFreeCard();
    this.freeCom.visible = false;
    this.btnGuanzhu = this.contentPane.getChild("btnGuanzhu").asButton;
    this.btnGuanzhu.visible = false;
    this.btnDesk = this.contentPane.getChild("btnDesk").asButton;
    this.btnDesk.onClick(function () {
      if (r_PlayerData.PlayerData.data.isAddDesk || r_PlatformSystem.PlatformSystem.isAddToDeskTop) {
        r_PlatformSystem.PlatformSystem.addToDeskTop(function () {});
      } else {
        r_DeskUI.default.showUI();
      }
    }, this);
    this.btnGohome = this.contentPane.getChild("btnGohome").asButton;
    this.btnGohome.onClick(this.onClcickGohome, this);
    this.btnBank = this.contentPane.getChild("btnBank");
    this.btnBank.loop = true;
    this.btnBank.animationName = "animation";
    this.btnBank.playing = true;
    this.btnBank.onClick(function () {
      if (r_DaySystem.DaySystem.getShowDay() < 2) {
        r_UtilsSystem.UtilsSystem.showTip("第二天开启");
      } else if (r_BankSystem.BankSystem.checkBankCard()) {
        if (r_BankSystem.BankSystem.checkCanGet()) {
          r_BankResultUI.BankResultUI.showUI();
        } else {
          r_BankTipUI.BankTipUI.showUI();
        }
      } else {
        r_BankSystem.BankSystem.createBankCard();
      }
    }, this);
    this.car1 = this.contentPane.getChild("car1");
    this.car1.animationName = "animation";
    this.car1.loop = true;
    this.car1.playing = true;
    this.car2 = this.contentPane.getChild("car2");
    this.car2.animationName = "animation";
    this.car2.loop = true;
    this.car2.playing = true;
    if (r_PlatformSystem.PlatformSystem.isSupportDesk()) {
      this.btnDesk.visible = true;
    } else {
      this.btnDesk.visible = false;
    }
    this.headCom = this.contentPane.getChild("headCom");
    _ctor.coinCom = this.contentPane.getChild("coinCom");
    this.iconBg = this.headCom.getChild("iconBg");
    r_ResSystem.ResSystem.loadBundleRes("game3", "bagAnim", cc.Prefab, function (e, t) {
      var i = cc.instantiate(t);
      o.btnBag.getChild("icon").node.addChild(i);
    });
    this.bindBtnCallback(this.btnBag);
  };
  _ctor.prototype.changeCity = function (e) {
    this.contentPane.getController("c1").selectedIndex = e;
    if (e == r_EntryCitySystem.CityType.旧城区) {
      if (r_LimitSystem.LimitSystem.getCheckLevelLimit(r_GroupSystem.GroupSystem.getLimitLevel().旧城区)) {
        this.OldScene.getController("lcok").selectedIndex = 0;
        r_PreloadSystem.PreloadSystem.preloadRes(r_PreloadSystem.PreloadSystem.oldSceneLoadList);
      } else {
        this.OldScene.getController("lcok").selectedIndex = 1;
      }
    }
    if (e == r_EntryCitySystem.CityType.新城区) {
      if (r_LimitSystem.LimitSystem.getCheckLevelLimit(r_GroupSystem.GroupSystem.getLimitLevel().新城区)) {
        r_PreloadSystem.PreloadSystem.preloadRes(r_PreloadSystem.PreloadSystem.newSceneLoadList);
        if (r_HouseSystem.HouseSystem.isBuyNewHouse) {
          r_HouseSystem.HouseSystem.isBuyNewHouse = false;
          r_EntryCityUI.default.showUI({
            index: 1
          });
        }
        this.NewScene.getController("lcok").selectedIndex = 0;
      } else {
        this.NewScene.getController("lcok").selectedIndex = 1;
      }
    } else if (e == r_EntryCitySystem.CityType.未来世界) {
      if (r_LimitSystem.LimitSystem.getCheckLevelLimit(r_GroupSystem.GroupSystem.getLimitLevel().未来世界)) {
        r_PreloadSystem.PreloadSystem.preloadRes(r_PreloadSystem.PreloadSystem.futureSceneLoadList);
        if (r_PlayerData.PlayerData.getComeInSysCount("futureScene") <= 0) {
          r_PlayerData.PlayerData.setComeInSysCount("futureScene");
          r_EntryCityUI.default.showUI({
            index: 2
          });
        }
        this.FutureScene.getController("lcok").selectedIndex = 0;
      } else {
        this.FutureScene.getController("lcok").selectedIndex = 1;
      }
    } else if (e == r_EntryCitySystem.CityType.乡村) {
      if (r_LimitSystem.LimitSystem.getCheckLevelLimit(r_GroupSystem.GroupSystem.getLimitLevel().乡村)) {
        r_PreloadSystem.PreloadSystem.preloadRes(r_PreloadSystem.PreloadSystem.villageSceneLoadList);
        this.VillageScene.getController("lcok").selectedIndex = 0;
      } else {
        this.VillageScene.getController("lcok").selectedIndex = 1;
      }
      r_PlayerData.PlayerData.setComeInSysCount("VillageScene");
      r_PlayerData.PlayerData.getComeInSysCount("VillageScene") <= 1 && r_DialogueUI.DialogueUI.showUI(501);
    }
  };
  _ctor.prototype.onClickSecret = function () {
    r_SoundMgr.SoundMgr.playMusic("secretbgm1");
    r_SecretUI.SecretUI.showUI();
  };
  _ctor.prototype.onClcickGohome = function () {
    this.hide();
    r_MainHomeUI.default.showUI({
      from: "mainUI"
    });
  };
  _ctor.prototype.onClickRank = function () {
    r_RankUI.RankUI.showUI();
  };
  _ctor.prototype.onClickChat = function () {
    r_PhoneUI.PhoneUI.showUI();
  };
  _ctor.prototype.onClickAlmanac = function () {
    if (!r_PlayerData.PlayerData.data.almanacMap.drawTime || r_TimeSystem.TimeSystem.isNextDay(r_PlayerData.PlayerData.data.almanacMap.drawTime)) {
      r_AlmanacUI.AlmanacUI.showUI();
    } else {
      r_AlmanacResultUI.AlmanacResultUI.showUI({
        restart: false
      });
    }
  };
  _ctor.prototype.onClickBill = function () {
    r_BillUI.BillUI.showUI();
  };
  _ctor.prototype.onClickHead = function () {
    r_SettingUI.SettingUI.showUI();
  };
  _ctor.prototype.onClickArea = function () {
    r_RankAreaUI.RankAreaUI.showUI();
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    r_RoleSystem.RoleSystem.isPause = true;
    r_TYIndex.UIWind.curMainUI = r_UIDef.UIDef.Res.UI.MainUI;
    _ctor.Inst = this;
    _ctor.instace = this;
    if (this.data && null != this.data.changedId) {
      this.changeCity(this.data.changedId);
      this.data.changedId = null;
    }
    r_TimeSystem.TimeSystem.registSecondUpdate("MainUIUpadte", this.secondUpdate.bind(this));
    this.refreshHead();
    this.refreshRedTips();
    r_GuideSystem.GuideSystem.enterMainUI();
    this.mainTask.showView();
    this.refreshTime();
    this.restart();
  };
  _ctor.prototype.restart = function () {
    this.VillageScene.init();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
    r_TimeSystem.TimeSystem.unregistSecondUpdate("MainUIUpadte");
    r_RoleSystem.RoleSystem.isPause = false;
  };
  _ctor.prototype.secondUpdate = function () {
    this.refreshRedTips();
    this.refreshFreeCard();
    this.refreshTime();
  };
  _ctor.prototype.refreshTime = function () {
    var e = r_DaySystem.DaySystem.getHour();
    this.contentPane.getController("mode").selectedIndex = e >= 6 && e < 20 ? 0 : 1;
  };
  _ctor.prototype.refreshFreeCard = function () {
    this.freeCom.getChild("lab").text = "X" + r_PlayerData.PlayerData.data.newMonpolyData.freeCard;
  };
  _ctor.prototype.refreshRedTips = function () {
    if (r_BillSystem.BillSystem.needShowRedTip()) {
      this.btnBill.getChild("redTip").visible = true;
    } else {
      this.btnBill.getChild("redTip").visible = false;
    }
    if (r_PhoneSystem.PhoneSystem.needShowRedTip()) {
      this.btnChat.getChild("redTip").visible = false;
      this.phoneAnim && "step_1" != this.phoneAnim.getComponent(sp.Skeleton).animation && this.phoneAnim.getComponent(sp.Skeleton).setAnimation(0, "step_1", true);
    } else {
      this.btnChat.getChild("redTip").visible = false;
      this.phoneAnim && "step_0" != this.phoneAnim.getComponent(sp.Skeleton).animation && this.phoneAnim.getComponent(sp.Skeleton).setAnimation(0, "step_0", true);
    }
    if (r_PlayerData.PlayerData.data.bankEndDay >= r_DaySystem.DaySystem.getShowDay() && !r_BankSystem.BankSystem.checkBankCard()) {
      this.btnBank.visible = false;
    } else {
      this.btnBank.visible = true;
    }
  };
  _ctor.prototype.refreshHead = function () {
    r_ResSystem.ResSystem.loadHeadImg(this.iconBg.getChild("icon"), r_PlayerData.PlayerData.data.curHead);
  };
  _ctor.prototype.onClickGuanzhu = function () {};
  _ctor.prototype.refreshBtn = function () {
    this.VillageScene.refreshBtn();
  };
  _ctor.prototype.onClickbtnBag = function () {
    r_BagGoodsUI.BagGoodsUI.showUI();
  };
  _ctor.Inst = null;
  _ctor.instace = null;
  _ctor.coinCom = null;
  __decorate([r_DecorateFunction1.AutoFind("mainTask")], _ctor.prototype, "mainTask", undefined);
  __decorate([r_DecorateFunction1.AutoFind("NewScene")], _ctor.prototype, "NewScene", undefined);
  __decorate([r_DecorateFunction1.AutoFind("FutureScene")], _ctor.prototype, "FutureScene", undefined);
  __decorate([r_DecorateFunction1.AutoFind("OldScene")], _ctor.prototype, "OldScene", undefined);
  __decorate([r_DecorateFunction1.AutoFind("VillageScene")], _ctor.prototype, "VillageScene", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBag")], _ctor.prototype, "btnBag", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.MainUI = exp_MainUI;