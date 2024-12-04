var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_HouseSystem = require("HouseSystem");
var r_HomeBedUI = require("HomeBedUI");
var r_TimeSystem = require("TimeSystem");
var r_PlayerData = require("PlayerData");
var r_HouseCfg = require("HouseCfg");
var r_UtilsSystem = require("UtilsSystem");
var r_PoolSystem = require("PoolSystem");
var r_ResSystem = require("ResSystem");
var r_BillSystem = require("BillSystem");
var r_BillUI = require("BillUI");
var r_HomeWawaUI = require("HomeWawaUI");
var r_PhoneSystem = require("PhoneSystem");
var r_PhoneUI = require("PhoneUI");
var r_SettingUI = require("SettingUI");
var r_HomeCfg = require("HomeCfg");
var r_SoundMgr = require("SoundMgr");
var r_SDKMgr1 = require("SDKMgr1");
var r_SCShowCarCom = require("SCShowCarCom");
var r_ReportSystem = require("ReportSystem");
var r_ScrapCarCfg = require("ScrapCarCfg");
var r_SleepAppData = require("SleepAppData");
var r_DogSchemeUI = require("DogSchemeUI");
var r_SCClickShowUI = require("SCClickShowUI");
var r_HouseMarketUI = require("HouseMarketUI");
var r_BlockSystem = require("BlockSystem");
var r_FguiResSystem = require("FguiResSystem");
var r_LimitSystem = require("LimitSystem");
var r_GroupSystem = require("GroupSystem");
var def_HouseUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Home, r_UIDef.UIDef.Res.UI.HouseUI) || this;
    t.uiType = "fullScreen";
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.HouseUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.HouseUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.imgHouse = this.contentPane.getChild("imgHouse").asLoader;
    this.imgBed = this.contentPane.getChild("imgBed").asButton;
    this.contentPane.getChild("btnPlay").asButton.onClick(this.hide, this);
    this.imgBed.onClick(this.onClickBed, this);
    this.btnBill = this.contentPane.getChild("btnBill").asButton;
    this.btnBill.onClick(this.onClickBill, this);
    this.btnBaomu = this.contentPane.getChild("btnBaomu").asButton;
    if (0 == r_SDKMgr1.SDKMgr1.weixinpingbi) {
      this.btnBaomu.node.active = false;
      this.contentPane.getChild("baomu").visible = false;
    } else {
      this.btnBaomu.node.active = true;
      this.btnBaomu.onClick(this.onClickBaomu, this);
    }
    this.btnBaomu.onClick(this.onClickBaomu, this);
    this.btnPhone = this.contentPane.getChild("btnPhone").asButton;
    this.btnPhone.onClick(this.onClickChat, this);
    this.headComp = this.contentPane.getChild("headComp").asButton;
    this.iconBg = this.headComp.getChild("iconBg").asButton;
    this.iconBg.onClick(this.onClickHead, this);
    this.btnHouseMarket = this.contentPane.getChild("btnHouseMarket").asButton;
    this.btnHouseMarket.onClick(this.onClickHouseMarket, this);
    this.contentPane.getChild("btnDog").onClick(this.onClickDogScheme, this);
    this.contentPane.getChild("btnHuyao").onClick(this.onClickDogScheme, this);
    this.contentPane.getChild("baomu").node.scale = .8;
    r_ResSystem.ResSystem.loadBundleRes("game1", "house/keshui", cc.Prefab, function (e, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
      var i = cc.instantiate(o);
      t.contentPane.getChild("center").node.addChild(i);
      i.active = !r_BlockSystem.BlockSystem.isBlock(r_BlockSystem.BlockTrickType.彩票);
    });
    r_ResSystem.ResSystem.loadBundleRes("game3", "phone", cc.Prefab, function (e, o) {
      t.phoneAnim = cc.instantiate(o);
      t.phoneAnim.active = true;
      t.btnPhone.getChild("icon").visible = false;
      t.btnPhone.node.addChild(t.phoneAnim);
      t.phoneAnim.x = 15;
      t.phoneAnim.y = -15;
      t.refreshPhone();
    });
    r_ResSystem.ResSystem.loadBundleRes("game2", "home/ms", cc.Prefab, function (e, o) {
      var i = cc.instantiate(o);
      t.btnBaomu.getChild("center").node.addChild(i);
      i.active = true;
    });
    r_ResSystem.ResSystem.loadBundleRes("game2", "scrapingCar/prefab/SCShowCaAnim", cc.Prefab, function (e, o) {
      var i = cc.instantiate(o);
      t.contentPane.getChild("center").node.addChild(i);
      t.sCShowCarCom = i.getComponent(r_SCShowCarCom.default);
      if (-1 != r_PlayerData.PlayerData.data.getCarId) {
        var n = r_ScrapCarCfg.ScrapCarCfg[r_PlayerData.PlayerData.data.getCarId];
        t.sCShowCarCom.showAnim(n, null);
      }
    });
    this.contentPane.getChild("btnCom").onClick(function () {
      -1 != r_PlayerData.PlayerData.data.getCarId && r_SCClickShowUI.SCClickShowUI.showUI();
    });
    r_TimeSystem.TimeSystem.registSecondUpdate("HomeUIUpadte", this.secondUpdate.bind(this));
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.instace = this;
    r_PoolSystem.PoolSystem.addPool(this.contentPane);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.instace = null;
    r_TimeSystem.TimeSystem.unregistSecondUpdate("secondEar");
    r_TimeSystem.TimeSystem.unregistSecondUpdate("HomeUIUpadte");
    r_TimeSystem.TimeSystem.scheduleClear("bubble13");
    if (this.soundString) {
      r_SoundMgr.SoundMgr.stopSound(this.soundString);
      this.soundString = null;
    }
    r_SleepAppData.SleepAppData.stopRecord();
  };
  _ctor.prototype.restart = function () {
    var e = this;
    var t = r_HouseSystem.HouseSystem.getHouseData();
    r_ResSystem.ResSystem.loadBundleRes("game2", "home/House" + t.houseId, cc.SpriteFrame, function (t, o) {
      if (!t) {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(e, o);
        e.imgHouse.texture = o;
      }
    });
    this.imgBed.icon = "ui/home/bed" + t.bedId;
    this.contentPane.getChild("baomu").node.destroyAllChildren();
    if (null != r_PlayerData.PlayerData.data.baomuId) {
      var o = r_HomeCfg.BaomuCfg[r_PlayerData.PlayerData.data.baomuId];
      r_ResSystem.ResSystem.loadBundleRes("game2", "home/baomu" + o.type, cc.Prefab, function (t, i) {
        var n = cc.instantiate(i);
        n.name = "baomu";
        e.contentPane.getChild("baomu").node.addChild(n);
        n.active = true;
        n.getComponent(sp.Skeleton).setAnimation(0, "animation", true);
        n.getComponent(sp.Skeleton).setSkin(o.isGood ? "1" : "2");
        e.bubble = n.getChildByName("chatItem0");
        e.bubble.active = false;
        e.setBubble(true);
        r_TimeSystem.TimeSystem.schedule("bubble13", 20, e.setBubble.bind(e));
      });
    } else if (null != r_PlayerData.PlayerData.data.baomuId2) {
      var i = r_HomeCfg.BaomuZpCfg[r_PlayerData.PlayerData.data.baomuId2];
      r_ResSystem.ResSystem.loadBundleRes("game2", "home/baomuzp" + i.type, cc.Prefab, function (t, o) {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(e, o);
        var n = cc.instantiate(o);
        n.name = "baomuzp";
        e.contentPane.getChild("baomu").node.addChild(n);
        n.active = true;
        n.getComponent(sp.Skeleton).setAnimation(0, i.animName, true);
        e.bubble = n.getChildByName("chatItem0");
        e.bubble.active = false;
        e.setBubble(true);
        r_TimeSystem.TimeSystem.schedule("bubble13", 20, e.setBubble.bind(e));
      });
    }
    var n = function (t) {
      var o = r_PlayerData.PlayerData.data.baomuList[t];
      var i = r_HomeCfg.BaomuZpCfg[o];
      r_ResSystem.ResSystem.loadBundleRes("game2", "home/baomuzp" + i.type, cc.Prefab, function (o, n) {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(e, n);
        var a = cc.instantiate(n);
        a.name = "baomuzp" + i.type;
        e.contentPane.getChild("baomu").node.addChild(a);
        if (r_PlayerData.PlayerData.data.baomuId || r_PlayerData.PlayerData.data.baomuId2) {
          a.x = 200 * (t + 1);
        } else {
          a.x = 200 * t;
        }
        a.active = true;
        a.getComponent(sp.Skeleton).setAnimation(0, i.animName, true);
        e.bubble = a.getChildByName("chatItem0");
        e.bubble.active = false;
        e.setBubble(true);
        r_TimeSystem.TimeSystem.schedule("bubble13", 20, e.setBubble.bind(e));
      });
    };
    for (var a = 0; a < r_PlayerData.PlayerData.data.baomuList.length; a++) {
      n(a);
    }
    this.refreshRedTips();
    if (1 == r_PlayerData.PlayerData.data.isHasDogScheme) {
      this.contentPane.getChild("btnDog").visible = true;
      this.contentPane.getChild("btnHuyao").visible = false;
    } else if (r_PlayerData.PlayerData.data.isHasDogScheme > 1) {
      this.contentPane.getChild("btnDog").visible = false;
      this.contentPane.getChild("btnHuyao").visible = true;
    } else {
      this.contentPane.getChild("btnDog").visible = false;
      this.contentPane.getChild("btnHuyao").visible = false;
    }
    r_ResSystem.ResSystem.loadHeadImg(this.iconBg.getChild("icon"), r_PlayerData.PlayerData.data.curHead);
    var s = cc.v2(this.imgBed.x + 150, this.imgBed.y - 140);
    r_TimeSystem.TimeSystem.registSecondUpdate("secondEar", function () {
      var e = r_HouseSystem.HouseSystem.getHouseData();
      var t = r_HouseCfg.HouseBedCfg[e.bedId];
      r_PlayerData.PlayerData.addCoin("床每秒收益: ", t.ear, r_ReportSystem.SystemKey.床, false, false, false);
      !r_HomeWawaUI.default.instace && !r_HomeBedUI.default.instace && r_SoundMgr.SoundMgr.playSound("home/huodejinbi1");
      t.ear > 0 && r_UtilsSystem.UtilsSystem.showCoinTip("+" + r_UtilsSystem.UtilsSystem.numFormats(t.ear, 0), s, r_PoolSystem.PoolSystem.CoinTipCom);
    });
    if (-1 != r_PlayerData.PlayerData.data.getCarId && null != this.sCShowCarCom) {
      var f = r_ScrapCarCfg.ScrapCarCfg[r_PlayerData.PlayerData.data.getCarId];
      this.sCShowCarCom.showAnim(f, null);
    }
    r_SleepAppData.SleepAppData.startRecord();
  };
  _ctor.prototype.secondUpdate = function () {
    this.refreshRedTips();
    this.refreshPhone();
  };
  _ctor.prototype.refreshRedTips = function () {
    if (r_BillSystem.BillSystem.needShowRedTip()) {
      this.btnBill.getChild("redTip").visible = true;
    } else {
      this.btnBill.getChild("redTip").visible = false;
    }
  };
  _ctor.prototype.refreshPhone = function () {
    if (r_PhoneSystem.PhoneSystem.needShowRedTip()) {
      this.phoneAnim && "step_1" != this.phoneAnim.getComponent(sp.Skeleton).animation && this.phoneAnim.getComponent(sp.Skeleton).setAnimation(0, "step_1", true);
    } else {
      this.phoneAnim && "step_0" != this.phoneAnim.getComponent(sp.Skeleton).animation && this.phoneAnim.getComponent(sp.Skeleton).setAnimation(0, "step_0", true);
    }
  };
  _ctor.prototype.onClickBed = function () {
    r_HomeBedUI.default.showUI();
  };
  _ctor.prototype.onClickBill = function () {
    r_BillUI.BillUI.showUI();
  };
  _ctor.prototype.onClickBaomu = function () {
    r_HomeWawaUI.default.showUI();
  };
  _ctor.prototype.onClickChat = function () {
    if (r_LimitSystem.LimitSystem.getCheckLevelLimit(r_GroupSystem.GroupSystem.getLimitLevel().手机)) {
      r_PhoneUI.PhoneUI.showUI();
    } else {
      r_UtilsSystem.UtilsSystem.showTip(r_GroupSystem.GroupSystem.getLimitLevel().手机 + "级以后开启");
    }
  };
  _ctor.prototype.onClickHead = function () {
    r_SettingUI.SettingUI.showUI();
  };
  _ctor.prototype.onClickDogScheme = function () {
    r_DogSchemeUI.default.showUI();
  };
  _ctor.prototype.setBubble = function (e) {
    undefined === e && (e = false);
    if (null != this.bubble) {
      var t = r_HomeCfg.BaomuBubble[e ? 0 : 1];
      var o = r_UtilsSystem.UtilsSystem.getRandomNum(0, t.length - 1);
      this.bubble.getChildByName("label").getComponent(cc.Label).string = t[o];
      this.bubble.active = true;
      this.bubble.opacity = 0;
      cc.tween(this.bubble).to(.3, {
        opacity: 255
      }).delay(3).to(.3, {
        opacity: 0
      }).start();
      if (!r_HomeWawaUI.default.instace) {
        this.soundString = "home/" + t[o];
        r_SoundMgr.SoundMgr.playSound(this.soundString);
      }
    }
  };
  _ctor.prototype.onClickHouseMarket = function () {
    r_HouseMarketUI.default.showUI();
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.default = def_HouseUI;