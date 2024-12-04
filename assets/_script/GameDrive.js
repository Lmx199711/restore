var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYIndex = require("TYIndex");
var r_Config = require("Config");
var r_MainCtrl = require("MainCtrl");
var r_TimeSystem = require("TimeSystem");
var r_DayComponent = require("DayComponent");
var r_CoinComponent = require("CoinComponent");
var r_RankSystem = require("RankSystem");
var r_ResUtil = require("ResUtil");
var r_SDKMgr1 = require("SDKMgr1");
var r_HouseIndustryCom = require("HouseIndustryCom");
var r_DiamondComponent = require("DiamondComponent");
var r_InkComponent = require("InkComponent");
var r_BattlePro = require("BattlePro");
var r_ShopMap = require("ShopMap");
var r_MainTaskCom = require("MainTaskCom");
var r_ShareSystem = require("ShareSystem");
var r_OldScene = require("OldScene");
var r_NewScene = require("NewScene");
var r_PotatoSelectCom = require("PotatoSelectCom");
var r_VillageScene = require("VillageScene");
var r_ClassFactory = require("ClassFactory");
var r_FguiResSystem = require("FguiResSystem");
var r_DatingSelectPanel = require("DatingSelectPanel");
var r_RussiaPassCom = require("RussiaPassCom");
var r_ZhazhaHuiMonster = require("ZhazhaHuiMonster");
var r_ZhazhaHuiRole = require("ZhazhaHuiRole");
var r_FutureScene = require("FutureScene");
var r_ZhazhaHuiGirl = require("ZhazhaHuiGirl");
var r_ZhazhaHuiBoss = require("ZhazhaHuiBoss");
var r_EarnComponet = require("EarnComponet");
var r_HeadComp = require("HeadComp");
var r_BBQCom = require("BBQCom");
var r_BgCom = require("BgCom");
var r_BBQCom2 = require("BBQCom2");
var r_TouchGiftCom = require("TouchGiftCom");
var r_GroupSystem = require("GroupSystem");
var r_CoinComponent2 = require("CoinComponent2");
var r_HamStoveCom = require("HamStoveCom");
var r_HamCom = require("HamCom");
var r_HamNpcCom = require("HamNpcCom");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
var def_GameDrive = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.prototype.start = function () {
    r_SDKMgr1.SDKMgr1.init(function () {});
    r_GroupSystem.GroupSystem.init();
    cc.macro.ENABLE_MULTI_TOUCH = true;
    r_TYIndex.Platform.isDarenPlatform() || cc.assetManager.cacheManager.clearLRU();
    r_Config.default.init();
    r_FguiResSystem.FguiResSystem.init();
    r_ResUtil.ResUtil.registerHeadImgLoader();
    cc.assetManager.downloader.retryInterval = 1e3;
    cc.assetManager.downloader.maxRetryCount = 6;
    cc.assetManager.downloader.maxConcurrency = 20;
    cc.assetManager.downloader.maxRequestsPerFrame = 12;
    cc.assetManager.presets.scene.maxConcurrency = 20;//下载时的最大并发数
    cc.assetManager.presets.scene.maxRequestsPerFrame = 12;
    cc.assetManager.presets.bundle.maxConcurrency = 20;
    cc.assetManager.presets.bundle.maxRequestsPerFrame = 12;
    this.handleImgCache();
    this.handleGameConfig();
    this.registerModel();
    this.initSDK();
    this.addFgui();
    r_ClassFactory.ClassFactory.init();
    this.gameStart();
    r_RankSystem.RankSystem.init();
    r_ShareSystem.ShareSystem.init();
    r_TimeSystem.TimeSystem.init();
    cc.PolygonCollider.prototype.onEnable = function () {
      _ref__ctor.DisableAddToCollisionManager || cc.director.getCollisionManager().addCollider(this);
    };
    cc.PolygonCollider.prototype.onDisable = function () {
      _ref__ctor.DisableAddToCollisionManager || cc.director.getCollisionManager().removeCollider(this);
    };
  };
  _ctor.prototype.addFgui = function () {
    fairygui.UIObjectFactory.setExtension("ui://MainHome/CoinCom", r_CoinComponent.CoinComponent);
    fairygui.UIObjectFactory.setExtension("ui://MainHome/DayCom", r_DayComponent.DayComponent);
    fairygui.UIObjectFactory.setExtension("ui://Main/DayCom2", r_DayComponent.DayComponent);
    fairygui.UIObjectFactory.setExtension("ui://MainHome/DiamondCom", r_DiamondComponent.DiamondComponent);
    fairygui.UIObjectFactory.setExtension("ui://MainHome/DayCom2", r_DayComponent.DayComponent);
    fairygui.UIObjectFactory.setExtension("ui://MainHome/EarnCom", r_EarnComponet.EarnComponet);
    fairygui.UIObjectFactory.setExtension("ui://MainHome/headComp", r_HeadComp.HeadComp);
    fairygui.UIObjectFactory.setExtension("ui://Main/headComp2", r_HeadComp.HeadComp);
    fairygui.UIObjectFactory.setExtension("ui://MainHome/BBQCom", r_BBQCom.BBQCom);
    fairygui.UIObjectFactory.setExtension("ui://Battle/BattleBBQCom", r_BBQCom.BBQCom);
    fairygui.UIObjectFactory.setExtension("ui://Battle/BattleBBQcom2", r_BBQCom2.BBQCom2);
    fairygui.UIObjectFactory.setExtension("ui://MainHome/BgCom", r_BgCom.BgCom);
    fairygui.UIObjectFactory.setExtension("ui://MainHome/TouchGiftCom", r_TouchGiftCom.TouchGiftCom);
    fairygui.UIObjectFactory.setExtension("ui://House/HouseTap3", r_HouseIndustryCom.default);
    fairygui.UIObjectFactory.setExtension("ui://Battle/battlePro", r_BattlePro.default);
    fairygui.UIObjectFactory.setExtension("ui://Printer/InkCom", r_InkComponent.InkComponent);
    fairygui.UIObjectFactory.setExtension("ui://Shop/ShopMap", r_ShopMap.default);
    fairygui.UIObjectFactory.setExtension("ui://MainHome/mainTaskCom", r_MainTaskCom.MainTaskCom);
    fairygui.UIObjectFactory.setExtension("ui://MainAudit/CoinCom", r_CoinComponent.CoinComponent);
    fairygui.UIObjectFactory.setExtension("ui://MainAudit/DayCom", r_DayComponent.DayComponent);
    fairygui.UIObjectFactory.setExtension("ui://Main/NewScene", r_NewScene.NewScene);
    fairygui.UIObjectFactory.setExtension("ui://Main/OldScene", r_OldScene.OldScene);
    fairygui.UIObjectFactory.setExtension("ui://Main/VillageScene", r_VillageScene.VillageScene);
    fairygui.UIObjectFactory.setExtension("ui://Main/FutureScene", r_FutureScene.FutureScene);
    fairygui.UIObjectFactory.setExtension("ui://Potato/PotatoSelectCom", r_PotatoSelectCom.PotatoSelectCom);
    fairygui.UIObjectFactory.setExtension("ui://Dating/SelectPanel", r_DatingSelectPanel.DatingSelectPanel);
    fairygui.UIObjectFactory.setExtension("ui://Russia/RussiaPassCom", r_RussiaPassCom.RussiaPassCom);
    fairygui.UIObjectFactory.setExtension("ui://ZhazhaHui/niu", r_ZhazhaHuiMonster.ZhazhaHuiMonster);
    fairygui.UIObjectFactory.setExtension("ui://ZhazhaHui/zhu", r_ZhazhaHuiMonster.ZhazhaHuiMonster);
    fairygui.UIObjectFactory.setExtension("ui://ZhazhaHui/boss", r_ZhazhaHuiBoss.ZhazhaHuiBoss);
    fairygui.UIObjectFactory.setExtension("ui://ZhazhaHui/role", r_ZhazhaHuiRole.ZhazhaHuiRole);
    fairygui.UIObjectFactory.setExtension("ui://ZhazhaHui/nvren", r_ZhazhaHuiGirl.ZhazhaHuiGirl);
    fairygui.UIObjectFactory.setExtension("ui://FairyLandShop/BarTwoRes", r_CoinComponent2.CoinComponent2);
    fairygui.UIObjectFactory.setExtension("ui://DrawCard/BarTwoRes", r_CoinComponent2.CoinComponent2);
    fairygui.UIObjectFactory.setExtension("ui://FairyLandDraw/BarTwoRes", r_CoinComponent2.CoinComponent2);
    fairygui.UIObjectFactory.setExtension("ui://Ham/HamStoveCom", r_HamStoveCom.HamStoveCom);
    fairygui.UIObjectFactory.setExtension("ui://Ham/HamCom", r_HamCom.HamCom);
    fairygui.UIObjectFactory.setExtension("ui://Ham/HamNpcCom", r_HamNpcCom.HamNpcCom);
  };
  _ctor.prototype.handleImgCache = function () {
    r_TYIndex.Platform.isMiniPlatform() && cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
      var e = cc.Texture2D.prototype.handleLoadedTexture;
      cc.Texture2D.prototype.handleLoadedTexture = function (t) {
        e.call(this, t);
        this._image.src = "";
      };
    });
  };
  _ctor.prototype.handleGameConfig = function () {
    if (!r_Config.default.isDebug) {
      console.log = function () {};
      console.error = function () {};
      console.warn = function () {};
    }
  };
  _ctor.prototype.registerModel = function () {
    r_Config.default.gameModel && r_Config.default.gameModel.length > 0 && r_Config.default.gameModel.forEach(function (e) {
      r_TYIndex.GameData.regModel(e);
    });
    r_Config.default.tableModel && r_Config.default.tableModel.length > 0 && r_Config.default.tableModel.forEach(function (e) {
      r_TYIndex.TableMgr.regTable(e);
    });
  };
  _ctor.prototype.initSDK = function () {};
  _ctor.prototype.gameStart = function () {
    r_TYIndex.App.inst.gameCtrl = new r_MainCtrl.MainCtrl();
    r_TYIndex.App.inst.start();
  };
  _ctor.prototype.update = function (e) {
    r_TimeSystem.TimeSystem.update(e);
  };
  _ctor.DisableAddToCollisionManager = true;
  return _ref__ctor = __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_GameDrive;