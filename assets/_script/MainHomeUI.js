var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_GuideSystem = require("GuideSystem");
var r_IconSystem = require("IconSystem");
var r_PhoneSystem = require("PhoneSystem");
var r_PlayerData = require("PlayerData");
var r_PreloadSystem = require("PreloadSystem");
var r_ResSystem = require("ResSystem");
var r_RoleSystem = require("RoleSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_RoleCfg = require("RoleCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_TYIndex = require("TYIndex");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_MainHomeEffect = require("MainHomeEffect");
var r_MainUI = require("MainUI");
var r_PrinterUI = require("PrinterUI");
var r_SettingUI = require("SettingUI");
var r_BattleUpUI = require("BattleUpUI");
var r_ChatUI = require("ChatUI");
var r_HouseUI = require("HouseUI");
var r_PhoneUI = require("PhoneUI");
var r_FlayBtnSystem = require("FlayBtnSystem");
var r_OffLineSystem = require("OffLineSystem");
var r_SDKMgr1 = require("SDKMgr1");
var r_BridePriceTipUI = require("BridePriceTipUI");
var r_WeddingResultUI = require("WeddingResultUI");
var r_PlatformSystem = require("PlatformSystem");
var r_SideGiftUI = require("SideGiftUI");
var r_DeskUI = require("DeskUI");
var r_LoadWaitUI = require("LoadWaitUI");
var r_FairyLandUI = require("FairyLandUI");
var r_ShareSystem = require("ShareSystem");
var r_ShareUI = require("ShareUI");
var r_ChatSystem = require("ChatSystem");
var r_BagGoodsUI = require("BagGoodsUI");
var r_BlockSystem = require("BlockSystem");
var r_LevelUpUI = require("LevelUpUI");
var r_PoolSystem = require("PoolSystem");
var r_CoinSystem = require("CoinSystem");
var r_BusinessUI = require("BusinessUI");
var r_HouseEarnUI = require("HouseEarnUI");
var r_LevelRoleUI = require("LevelRoleUI");
var r_StarUI = require("StarUI");
var r_CityUI = require("CityUI");
var r_TrainUI = require("TrainUI");
var r_MinGameUI = require("MinGameUI");
var r_GameGuideUI = require("GameGuideUI");
var r_GameGuideSystem = require("GameGuideSystem");
var r_GameGuideTipUI = require("GameGuideTipUI");
var r_LimitSystem = require("LimitSystem");
var r_RoleGirlUI = require("RoleGirlUI");
var r_RoleGirlSystem = require("RoleGirlSystem");
var r_HouseEarnSystem = require("HouseEarnSystem");
var r_BusinessSystem = require("BusinessSystem");
var r_CitySystem = require("CitySystem");
var r_StarSystem = require("StarSystem");
var r_LevelUpCfg = require("LevelUpCfg");
var r_BattleSystem = require("BattleSystem");
var r_jsbi = require("jsbi");
var r_BigNumSystem = require("BigNumSystem");
var r_GroupSystem = require("GroupSystem");
var r_OnlineGiftUI = require("OnlineGiftUI");
var r_OnlineSystem = require("OnlineSystem");
var r_SignInUI = require("SignInUI");
var r_FairyLandGuide = require("FairyLandGuide");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_CitySelectUI = require("CitySelectUI");
var r_RankLevelUI = require("RankLevelUI");
var r_RankSystem = require("RankSystem");
var r_WXShareUI = require("WXShareUI");
var def_MainHomeUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.MainHome, r_UIDef.UIDef.Res.UI.MainHomeUI) || this;
    t.uiType = "fullScreen";
    t.roleAnim = null;
    t.itemMap = {};
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.MainHomeUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.MainHomeUI);
  };
  _ctor.prototype.onInit = function () {
    var o = this;
    e.prototype.onInit.call(this);
    _ctor.Inst = this;
    this.list = r_GroupSystem.GroupSystem.getCTestVersion() ? this.list2 : this.list1;
    r_MainHomeEffect.MianHomeEffect.init(this.contentPane);
    r_CoinSystem.CoinSystem.registMainTouch(this.listBg);
    r_PoolSystem.PoolSystem.createUIObjPool(r_PoolSystem.PoolSystem.MianCoinImg, "ui://MainHome/CoinImg", 1, this.contentPane);
    r_PoolSystem.PoolSystem.createUIObjPool(r_PoolSystem.PoolSystem.addCoinCom, "ui://MainHome/addCoinCom", 1, this.contentPane);
    this.bindBtnCallback(this.btnMarry, this.btnGoout, this.btnPhone, this.btnRoom, this.btnEquip, this.btnAtuo, this.btnEarn, this.btnMinGame, this.btnSecretNew, this.btnFere, this.btnRecord, this.btnBattle, this.btnSetting, this.btnContine, this.btnBride, this.btnWedding, this.btnHot, this.btnDesk, this.btnFairy, this.btnTask, this.btnBag, this.btnOnlineGift, this.btnSign, this.btnLevelRank, this.btnWXShare);
    this.iconBg = this.headCom.getChild("iconBg");
    this.btnGift = this.contentPane.getChild("btnGift").asButton;
    this.btnGift.onClick(function () {
      r_SideGiftUI.SideGiftUI.showUI();
    }, this);
    this.btnGift.visible = false;
    this.btnDesk.visible = false;
    this.btnWXShare.visible = !!window.wx;
    r_ResSystem.ResSystem.loadBundleRes("game3", "phone", cc.Prefab, function (e, t) {
      o.phoneAnim = cc.instantiate(t);
      o.phoneAnim.active = true;
      o.btnPhone.getChild("icon").visible = false;
      o.btnPhone.node.addChild(o.phoneAnim);
      o.phoneAnim.x = 15;
      o.phoneAnim.y = -15;
      o.refreshPhone();
    });
    r_ResSystem.ResSystem.loadBundleRes("game3", "bagAnim", cc.Prefab, function (e, t) {
      var i = cc.instantiate(t);
      o.btnBag.getChild("icon").node.addChild(i);
    });
    _ctor.coinCom = this.contentPane.getChild("coinCom");
    r_IconSystem.IconSystem.initMainHome(this);
    r_TimeSystem.TimeSystem.scheduleOnce("gameGuide", 1, function () {
      r_GameGuideSystem.GameGuideSystem.checkGuide();
    });
    r_FlayBtnSystem.FlayBtnSystem.bindBtn(this);
    r_OffLineSystem.OffLineSystem.openOfflineUI();
    this.btnHot.getChild("red").visible = true;
    this.btnRecord.visible = false;
    this.addChildEffect();
    this.role.visible = !r_BlockSystem.BlockSystem.isBlock(r_BlockSystem.BlockTrickType.人物);
    this.list.itemRenderer = this.onItemRenderer.bind(this);
    this.list.numItems = 4;
    this.listBg.itemRenderer = this.onItemBgRenderer.bind(this);
    this.bbqCom.gid = 1;
    r_PreloadSystem.PreloadSystem.preloadRes(r_PreloadSystem.PreloadSystem.enterHomeloadList);
    this.refreshStartRed();
    this.setInexTip();
  };
  _ctor.prototype.setInexTip = function () {
    var e = this;
    this.indexTip.visible = false;
    this.contentPane.getController("bg").onChanged(function (t) {
      1 == t.selectedIndex && (e.indexTip.visible = false);
    });
    r_TYEventDispatcher.TYEventDispatcher.on("inextTip", function () {
      e.indexTip.visible = true;
    }, this);
  };
  _ctor.prototype.refreshStartRed = function () {
    this.btnFairy.getChild("redTip").visible = true;
    this.btnGoout.getController("red").selectedIndex = 1;
  };
  _ctor.prototype.refreshHead = function () {
    r_ResSystem.ResSystem.loadHeadImg(this.iconBg.getChild("icon"), r_PlayerData.PlayerData.data.curHead);
  };
  _ctor.prototype.onItemBgRenderer = function (e, t) {
    t.getController("mode").selectedIndex = e;
    t.showSecret(e);
  };
  _ctor.prototype.onItemRenderer = function (e, t) {
    var o = e + 1;
    this.itemMap[o] = t;
    t.clearClick();
    t.onClick(function () {
      r_SoundMgr.SoundMgr.playSound("click");
      switch (e) {
        case 0:
          r_HouseEarnUI.HouseEarnUI.showUI();
          break;
        case 1:
          r_BusinessUI.BusinessUI.showUI();
          break;
        case 2:
          r_CityUI.CityUI.showUI();
          break;
        case 3:
          r_StarUI.StarUI.showUI();
      }
    }, this);
  };
  _ctor.prototype.showSecret = function () {
    if (r_RoleGirlSystem.RoleGirlSystem.getBoughtRoleCount() <= 10) {
      this.listBg.numItems = 1;
    } else {
      this.listBg.numItems = 2;
    }
  };
  _ctor.prototype.showPendant = function () {
    var e = this;
    if (r_RoleSystem.RoleSystem.hasPendant()) {
      var t = r_RoleSystem.RoleSystem.getPendantId();
      var o = r_RoleCfg.PendantCfg[t];
      if (o) {
        r_ResSystem.ResSystem.loadBundleRes("game2", "mainHome/pendant/pendant" + o.id, cc.Prefab, function (t, o) {
          if (t) {
            console.error("加载失败: ", t);
          } else {
            e.pendant.node.destroyAllChildren();
            var i = cc.instantiate(o);
            e.pendant.node.addChild(i);
            i.active = true;
            e.pendantAnim = i.getComponent(sp.Skeleton);
            e.pendantAnim.setAnimation(0, "animation", true);
          }
        });
      } else {
        this.pendant.node.destroyAllChildren();
      }
    } else {
      this.pendant.node.destroyAllChildren();
    }
  };
  _ctor.prototype.onAnimComplete = function () {
    this.roleAnim && "gz" == this.roleAnim.animation && r_RoleSystem.RoleSystem.getAutoExpNum() <= 0 && this.roleAnim.addAnimation(0, "dj", true);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    r_GroupSystem.GroupSystem.getCTestVersion() && (this.contentPane.getController("ABTest").selectedIndex = 1);
    r_SDKMgr1.SDKMgr1.showGameClubButton();
    r_TYIndex.UIWind.curMainUI = r_UIDef.UIDef.Res.UI.MainHomeUI;
    r_SignInUI.SignInUI.checkNextDay();
    this.restart();
    this.refreshHead();
    _ctor.instance = this;
    if (this.data && "mainUI" == this.data.from) {
      this.data.from = null;
      r_IconSystem.IconSystem.showMainHomeBtn();
      r_GuideSystem.GuideSystem.hideFinger();
      r_FlayBtnSystem.FlayBtnSystem.changeMainHome();
    }
    this.showUpdateOnce();
    r_TimeSystem.TimeSystem.registSecondUpdate("MainHomeSecondUpdate", this.secondUpdate.bind(this));
    r_PlayerData.PlayerData.data.newGuideStep >= 1 && r_ChatSystem.ChatSystem.addNewChatTaskById(46);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_SDKMgr1.SDKMgr1.hideGameClubButton();
    this.data = null;
    r_TimeSystem.TimeSystem.scheduleClear("MainHomeUpdate");
    r_TimeSystem.TimeSystem.unregistSecondUpdate("MainHomeSecondUpdate");
  };
  _ctor.prototype.secondUpdate = function () {
    this.showUpdateOnce();
    this.showRoleGirlCoin();
  };
  _ctor.prototype.showUpdateOnce = function () {
    this.refreshPhone();
    this.refreshTaskRed();
    this.refreshRecord();
    this.refreshBtnEquip();
    this.refreshBtnSecretNew();
    this.refreshList();
    this.refreshEarnTime();
    this.refreshContine();
    this.refreshBattle();
    this.refreshOnline();
    this.refreshSignBtn();
    this.refreshFairy();
    this.refreshRank();
    this.refreshWXShare();
    this.earnCom.refreshView();
    this.headCom.refreshView();
  };
  _ctor.prototype.refreshWXShare = function () {
    this.btnWXShare.getController("red").selectedIndex = r_PlayerData.PlayerData.data.wxShareTime == new Date().toLocaleDateString() ? 0 : 1;
  };
  _ctor.prototype.refreshFairy = function () {
    if (r_FairyLandGuide.FairyLandGuide.canShowFairyLand()) {
      this.btnFairy.visible = true;
    } else {
      this.btnFairy.visible = false;
    }
  };
  _ctor.prototype.refreshSignBtn = function () {
    var e = r_SignInUI.SignInUI.signCfgs[r_PlayerData.PlayerData.data.curSignIndex];
    if (r_PlayerData.PlayerData.data.curSignIndex > 6) {
      this.btnSign.getChild("redTip").visible = false;
    } else if (2 == r_PlayerData.PlayerData.data.curSignState || 1 == r_PlayerData.PlayerData.data.curSignState && e.noAgain) {
      this.btnSign.getChild("redTip").visible = false;
    } else {
      this.btnSign.getChild("redTip").visible = true;
    }
  };
  _ctor.prototype.refreshOnline = function () {
    if (r_OnlineSystem.OnlineSystem.needShowRedTip()) {
      this.btnOnlineGift.getChild("redTip").visible = true;
    } else {
      this.btnOnlineGift.getChild("redTip").visible = false;
    }
  };
  _ctor.prototype.refreshRank = function () {
    if (r_RankSystem.RankSystem.canGetLevelReward()) {
      this.btnLevelRank.getChild("redTip").visible = true;
    } else {
      this.btnLevelRank.getChild("redTip").visible = false;
    }
  };
  _ctor.prototype.onClickbtnPrinter = function () {
    r_PrinterUI.PrinterUI.showUI();
  };
  _ctor.prototype.onClickbtnFere = function () {
    r_UtilsSystem.UtilsSystem.showTip("即将开放");
  };
  _ctor.prototype.onClickbtnGoout = function () {
    this.btnGoout.getController("red").selectedIndex = 0;
    r_CitySelectUI.default.showUI();
  };
  _ctor.prototype.showMainUI = function (e) {
    var t = this;
    r_UtilsSystem.UtilsSystem.showLoading(true);
    r_PreloadSystem.PreloadSystem.preloadFguiRes({
      path: r_UIDef.UIDef.Pack.Main
    }, function () {
      r_UtilsSystem.UtilsSystem.showLoading(false);
      t.hide();
      if (e) {
        r_MainUI.MainUI.showUI({
          opendCallback: e
        });
      } else {
        r_MainUI.MainUI.showUI();
      }
    });
    r_FlayBtnSystem.FlayBtnSystem.changeOhtor();
  };
  _ctor.prototype.showMainAndChange = function (e) {
    var t = this;
    r_UtilsSystem.UtilsSystem.showLoading(true);
    r_PreloadSystem.PreloadSystem.preloadFguiRes({
      path: r_UIDef.UIDef.Pack.Main
    }, function () {
      r_UtilsSystem.UtilsSystem.showLoading(false);
      t.hide();
      r_MainUI.MainUI.showUI({
        changedId: e
      });
    });
    r_FlayBtnSystem.FlayBtnSystem.changeOhtor();
  };
  _ctor.prototype.onClickbtnPhone = function () {
    if (r_LimitSystem.LimitSystem.getCheckLevelLimit(r_GroupSystem.GroupSystem.getLimitLevel().手机)) {
      if (r_GuideSystem.GuideSystem.getGuideState("guidePhone")) {
        r_ChatUI.ChatUI.showUI();
      } else {
        r_PhoneUI.PhoneUI.showUI();
      }
    } else {
      r_UtilsSystem.UtilsSystem.showTip(r_GroupSystem.GroupSystem.getLimitLevel().手机 + "级以后开启");
    }
  };
  _ctor.prototype.onClickbtnRoom = function () {
    r_UtilsSystem.UtilsSystem.showLoading(true);
    r_PreloadSystem.PreloadSystem.preloadFguiRes({
      path: r_UIDef.UIDef.Pack.House
    }, function () {
      r_UtilsSystem.UtilsSystem.showLoading(false);
      r_HouseUI.default.showUI();
    });
  };
  _ctor.prototype.onClickbtnEquip = function () {
    r_LevelRoleUI.LevelRoleUI.showUI(null, function () {
      r_GameGuideUI.default.finishStep(2);
    });
  };
  _ctor.prototype.onClickbtnTask = function () {
    r_GameGuideTipUI.default.showUI();
  };
  _ctor.prototype.onClickbtnBag = function () {
    r_BagGoodsUI.BagGoodsUI.showUI();
  };
  _ctor.prototype.onClickbtnOnlineGift = function () {
    r_OnlineGiftUI.default.showUI();
  };
  _ctor.prototype.onClickbtnSign = function () {
    if (r_LimitSystem.LimitSystem.getCheckLevelLimit(r_GroupSystem.GroupSystem.getLimitLevel().签到系统)) {
      r_SignInUI.SignInUI.showUI();
    } else {
      r_UtilsSystem.UtilsSystem.showTip(r_GroupSystem.GroupSystem.getLimitLevel().签到系统 + "级以后开启");
    }
  };
  _ctor.prototype.onClickbtnAtuo = function () {
    r_PlatformSystem.PlatformSystem.showVideo("自动点击", function () {
      r_UtilsSystem.UtilsSystem.showTip("自动点击已生效");
      r_CoinSystem.CoinSystem.setAutoTime(r_CoinSystem.EarnTimeType.自动);
    });
  };
  _ctor.prototype.onClickbtnEarn = function () {
    r_PlatformSystem.PlatformSystem.showVideo("3倍收益", function () {
      r_UtilsSystem.UtilsSystem.showTip("三倍收益已生效");
      r_CoinSystem.CoinSystem.setAutoTime(r_CoinSystem.EarnTimeType.倍数);
    });
  };
  _ctor.prototype.onClickbtnBattle = function () {
    r_BattleUpUI.default.showUI(null, function () {
      r_GameGuideUI.default.finishStep(1);
    });
  };
  _ctor.prototype.onClickbtnSecretNew = function () {
    r_RoleGirlUI.RoleGirlUI.showUI(null, function () {
      r_GameGuideUI.default.finishStep(1);
    });
  };
  _ctor.prototype.onClickbtnMarry = function () {
    r_GameGuideTipUI.default.showUI({
      id: 1
    });
  };
  _ctor.prototype.onClickbtnBride = function () {
    if (r_RoleSystem.RoleSystem.checkNewGuideTime2()) {
      r_BridePriceTipUI.default.showUI({
        index: 0,
        isGuide: false
      });
    } else {
      r_BridePriceTipUI.default.showUI({
        index: 2,
        isGuide: false
      });
    }
  };
  _ctor.prototype.onClickbtnSetting = function () {
    r_SettingUI.SettingUI.showUI();
  };
  _ctor.prototype.onClickbtnContine = function () {
    if (r_CoinSystem.CoinSystem.checkContimieMax()) {
      r_UtilsSystem.UtilsSystem.showTip("已是最高点击收益");
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("增加连点收益", function () {
        r_CoinSystem.CoinSystem.setContinue();
        r_UtilsSystem.UtilsSystem.showTip("点击收益已翻倍");
      });
    }
  };
  _ctor.prototype.restart = function () {
    r_SoundMgr.SoundMgr.playMusic("bgm");
    this.showSecret();
    this.showPendant();
    this.refreshBtnEquip();
    this.mainTask.showView();
    this.bbqCom.restart();
    this.touchGiftCom.restart();
  };
  _ctor.prototype.addChildEffect = function () {
    var e = cc.director.getScene().getChildByName("effectsBg");
    r_ResSystem.ResSystem.loadBundleRes("resources1", "ui/main/effectsCom", cc.Prefab, function (t, o) {
      var i = cc.instantiate(o);
      e.addChild(i);
    });
  };
  _ctor.prototype.refreshEarnTime = function () {
    if (r_CoinSystem.CoinSystem.getHasAutoTouch(r_CoinSystem.EarnTimeType.自动)) {
      this.btnAtuo.getController("mode").selectedIndex = 1;
      this.btnAtuo.getChild("time").text = r_UtilsSystem.UtilsSystem.getTime(r_CoinSystem.CoinSystem.getAutoTime(r_CoinSystem.EarnTimeType.自动));
    } else {
      this.btnAtuo.getController("mode").selectedIndex = 0;
    }
    if (r_CoinSystem.CoinSystem.getHasAutoTouch(r_CoinSystem.EarnTimeType.倍数)) {
      this.btnEarn.getController("mode").selectedIndex = 1;
      this.btnEarn.getChild("time").text = r_UtilsSystem.UtilsSystem.getTime(r_CoinSystem.CoinSystem.getAutoTime(r_CoinSystem.EarnTimeType.倍数));
    } else {
      this.btnEarn.getController("mode").selectedIndex = 0;
    }
  };
  _ctor.prototype.refreshContine = function () {
    if (r_CoinSystem.CoinSystem.checkContimieMax()) {
      this.btnContine.getController("max").selectedIndex = 1;
    } else {
      this.btnContine.getController("max").selectedIndex = 0;
    }
    this.btnContine.title = r_CoinSystem.CoinSystem.showContinueCoff() ? "X" + r_CoinSystem.CoinSystem.showContinueCoff() : "MAX";
  };
  _ctor.prototype.refreshPendant = function () {
    if (r_RoleSystem.RoleSystem.hasPendant() && this.pendantAnim) {
      r_RoleSystem.RoleSystem.addPendantExp();
      cc.v2(this.pendant.x, this.pendant.y - 100);
      var e = r_RoleSystem.RoleSystem.getPendantExpOnce() * r_RoleSystem.RoleSystem.getEarnInfo().coeff;
      r_MainHomeEffect.MianHomeEffect.playAddExpAnimByNode("+" + e, this.pendantAnim.node.worldPosition.clone());
    }
  };
  _ctor.prototype.refreshBtnEquip = function () {
    var e = r_LevelUpCfg.LevelUpCfg[r_PlayerData.PlayerData.data.level];
    this.btnEquip.getChild("red").visible = r_PlayerData.PlayerData.isCoinEnough(e.coin);
  };
  _ctor.prototype.refreshBtnSecretNew = function () {
    if (r_RoleGirlSystem.RoleGirlSystem.needShowRedTip()) {
      this.btnSecretNew.getChild("redTip").visible = true;
    } else {
      this.btnSecretNew.getChild("redTip").visible = false;
    }
  };
  _ctor.prototype.refreshList = function () {
    for (var e = 1; e <= 4; e++) {
      var t = this.itemMap[e];
      if (1 == e) {
        if (r_HouseEarnSystem.HouseEarnSystem.needShowRedTip()) {
          t.getChild("redTip").visible = true;
        } else {
          t.getChild("redTip").visible = false;
        }
      } else if (2 == e) {
        if (r_BusinessSystem.BusinessSystem.needShowRedTip()) {
          t.getChild("redTip").visible = true;
        } else {
          t.getChild("redTip").visible = false;
        }
      } else if (3 == e) {
        if (r_CitySystem.CitySystem.needShowRedTip()) {
          t.getChild("redTip").visible = true;
        } else {
          t.getChild("redTip").visible = false;
        }
      } else if (4 == e) {
        if (r_StarSystem.StarSystem.needShowRedTip()) {
          t.getChild("redTip").visible = true;
        } else {
          t.getChild("redTip").visible = false;
        }
      } else if (5 == e) {
        if (r_CitySystem.CitySystem.needShowRedTip()) {
          t.getChild("redTip").visible = true;
        } else {
          t.getChild("redTip").visible = false;
        }
      }
    }
  };
  _ctor.prototype.refreshPhone = function () {
    if (r_PhoneSystem.PhoneSystem.needShowRedTip()) {
      this.phoneAnim && "shouji_2" != this.phoneAnim.getComponent(sp.Skeleton).animation && this.phoneAnim.getComponent(sp.Skeleton).setAnimation(0, "shouji_2", true);
    } else {
      this.phoneAnim && "shouji_1" != this.phoneAnim.getComponent(sp.Skeleton).animation && this.phoneAnim.getComponent(sp.Skeleton).setAnimation(0, "shouji_1", true);
    }
  };
  _ctor.prototype.refreshTaskRed = function () {
    if (r_GroupSystem.GroupSystem.getGameguideStory()[r_PlayerData.PlayerData.data.storyMap.id]) {
      _ctor.Inst.btnTask.visible = true;
      var e = r_PlayerData.PlayerData.data.gameGuideCountDown[r_PlayerData.PlayerData.data.storyMap.id] - r_TimeSystem.TimeSystem.getServerTime();
      this.btnTask.getChild("time").text = r_TimeSystem.TimeSystem.getTimeStr2(e);
    } else {
      _ctor.Inst.btnTask.visible = false;
    }
  };
  _ctor.prototype.refreshBattle = function () {
    this.btnBattle.getChild("redTip").visible = r_BattleSystem.BattleSystem.needShowRedTip();
  };
  _ctor.prototype.refreshRecord = function () {
    this.btnRecord.title = r_ShareSystem.ShareSystem.state == r_ShareSystem.ShareState.未开始 ? "" : r_ShareSystem.ShareSystem.getTime();
  };
  _ctor.prototype.refreshbtnTask = function () {};
  _ctor.prototype.showRoleGirlCoin = function () {
    var e = this.listBg.getChildAt(0);
    if (e) {
      var t = e.getRoleGirlPos();
      if (t && !r_jsbi.default.LE(r_CoinSystem.CoinSystem.getAllAddCoin().allCoin, r_BigNumSystem.BigNumSystem.getNum(0))) {
        var o = cc.v2();
        this.listBg.localToGlobal(t.x, t.y, o);
        var i = "+" + r_UtilsSystem.UtilsSystem.getShowCoin(r_CoinSystem.CoinSystem.getAllAddCoin().allCoin, 1);
        r_MainHomeEffect.MianHomeEffect.playAddCoinAnim(i, cc.v2(o.x, o.y - 150));
      }
    }
  };
  _ctor.prototype.onClickbtnRecord = function () {
    if (r_ShareSystem.ShareSystem.state != r_ShareSystem.ShareState.未开始) {
      r_ShareSystem.ShareSystem.stopRecord();
    } else {
      r_ShareUI.default.showUI();
    }
  };
  _ctor.prototype.onClickbtnWedding = function () {
    r_WeddingResultUI.default.showUI({
      index: 0
    });
  };
  _ctor.prototype.onClickbtnHot = function () {
    if (r_LimitSystem.LimitSystem.getCheckLevelLimit(r_GroupSystem.GroupSystem.getLimitLevel().热门游戏)) {
      r_TrainUI.default.showUI();
    } else {
      r_UtilsSystem.UtilsSystem.showTip(r_GroupSystem.GroupSystem.getLimitLevel().热门游戏 + "级以后开启");
    }
  };
  _ctor.prototype.onClickbtnDesk = function () {
    r_DeskUI.default.showUI();
  };
  _ctor.prototype.onClickbtnFairy = function () {
    if (r_LimitSystem.LimitSystem.getCheckLevelLimit(r_GroupSystem.GroupSystem.getLimitLevel().荒古遗迹)) {
      r_LoadWaitUI.LoadWaitUI.showUI({
        key: "fairy",
        loadedCallback: function () {
          r_FairyLandUI.FairyLandUI.showUI();
        }
      });
      this.btnFairy.getChild("redTip").visible = false;
    } else {
      r_UtilsSystem.UtilsSystem.showTip(r_GroupSystem.GroupSystem.getLimitLevel().荒古遗迹 + "级以后开启");
    }
  };
  _ctor.prototype.onClickbtnMinGame = function () {
    if (r_LimitSystem.LimitSystem.getCheckLevelLimit(r_GroupSystem.GroupSystem.getLimitLevel().小游戏)) {
      r_MinGameUI.MinGameUI.showUI();
    } else {
      r_UtilsSystem.UtilsSystem.showTip(r_GroupSystem.GroupSystem.getLimitLevel().小游戏 + "级以后开启");
    }
  };
  _ctor.prototype.onClickUp = function () {
    r_LevelUpUI.LevelUpUI.showUI(null, function () {});
  };
  _ctor.prototype.onClickbtnLevelRank = function () {
    if (r_LimitSystem.LimitSystem.getCheckLevelLimit(r_GroupSystem.GroupSystem.getLimitLevel().排行榜)) {
      r_RankLevelUI.RankLevelUI.showUI();
    } else {
      r_UtilsSystem.UtilsSystem.showTip(r_GroupSystem.GroupSystem.getLimitLevel().排行榜 + "级以后开启");
    }
  };
  _ctor.prototype.refreshDeskBtn = function () {};
  _ctor.prototype.playBbq = function () {
    this.bbqCom.play();
  };
  _ctor.prototype.onClickbtnWXShare = function () {
    r_WXShareUI.default.showUI();
  };
  _ctor.Inst = null;
  __decorate([r_DecorateFunction1.AutoFind("role")], _ctor.prototype, "role", undefined);
  __decorate([r_DecorateFunction1.AutoFind("roleTouch")], _ctor.prototype, "roleTouch", undefined);
  __decorate([r_DecorateFunction1.AutoFind("earnCom")], _ctor.prototype, "earnCom", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGoout")], _ctor.prototype, "btnGoout", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnPhone")], _ctor.prototype, "btnPhone", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnRoom")], _ctor.prototype, "btnRoom", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnEquip")], _ctor.prototype, "btnEquip", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAtuo")], _ctor.prototype, "btnAtuo", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnEarn")], _ctor.prototype, "btnEarn", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnMarry")], _ctor.prototype, "btnMarry", undefined);
  __decorate([r_DecorateFunction1.AutoFind("iconDiamond")], _ctor.prototype, "iconDiamond", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnPrinter")], _ctor.prototype, "btnPrinter", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnFere")], _ctor.prototype, "btnFere", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnAward")], _ctor.prototype, "btnAward", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSign")], _ctor.prototype, "btnSign", undefined);
  __decorate([r_DecorateFunction1.AutoFind("headCom")], _ctor.prototype, "headCom", undefined);
  __decorate([r_DecorateFunction1.AutoFind("pendant")], _ctor.prototype, "pendant", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBride")], _ctor.prototype, "btnBride", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnWedding")], _ctor.prototype, "btnWedding", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnHot")], _ctor.prototype, "btnHot", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGift")], _ctor.prototype, "btnGift", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnDesk")], _ctor.prototype, "btnDesk", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnFairy")], _ctor.prototype, "btnFairy", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnTask")], _ctor.prototype, "btnTask", undefined);
  __decorate([r_DecorateFunction1.AutoFind("mainTask")], _ctor.prototype, "mainTask", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnRecord")], _ctor.prototype, "btnRecord", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnMinGame")], _ctor.prototype, "btnMinGame", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBag")], _ctor.prototype, "btnBag", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnBattle")], _ctor.prototype, "btnBattle", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSetting")], _ctor.prototype, "btnSetting", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnSecretNew")], _ctor.prototype, "btnSecretNew", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnOnlineGift")], _ctor.prototype, "btnOnlineGift", undefined);
  __decorate([r_DecorateFunction1.AutoFind("list1")], _ctor.prototype, "list1", undefined);
  __decorate([r_DecorateFunction1.AutoFind("list2")], _ctor.prototype, "list2", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnGuide0")], _ctor.prototype, "btnGuide0", undefined);
  __decorate([r_DecorateFunction1.AutoFind("bbqCom")], _ctor.prototype, "bbqCom", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnContine")], _ctor.prototype, "btnContine", undefined);
  __decorate([r_DecorateFunction1.AutoFind("listBg")], _ctor.prototype, "listBg", undefined);
  __decorate([r_DecorateFunction1.AutoFind("touchGiftCom")], _ctor.prototype, "touchGiftCom", undefined);
  __decorate([r_DecorateFunction1.AutoFind("huanJing")], _ctor.prototype, "huanJing", undefined);
  __decorate([r_DecorateFunction1.AutoFind("indexTip")], _ctor.prototype, "indexTip", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnLevelRank")], _ctor.prototype, "btnLevelRank", undefined);
  __decorate([r_DecorateFunction1.AutoFind("btnWXShare")], _ctor.prototype, "btnWXShare", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_MainHomeUI;