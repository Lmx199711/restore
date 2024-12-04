var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecretBuyUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_SecretSystem = require("SecretSystem");
var r_EraseCom = require("EraseCom");
var r_PlayerData = require("PlayerData");
var r_PlatformSystem = require("PlatformSystem");
var r_GlassCom = require("GlassCom");
var r_UtilsSystem = require("UtilsSystem");
var r_SecretGetUI = require("SecretGetUI");
var r_ResSystem = require("ResSystem");
var r_SecretCfg = require("SecretCfg");
var r_SoundMgr = require("SoundMgr");
var r_RoleCfg = require("RoleCfg");
var r_ReportSystem = require("ReportSystem");
var exp_SecretBuyUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Secret, r_UIDef.UIDef.Res.UI.SecretBuyUI) || this;
    t.uiType = "fullScreen";
    t.curMaxIndex = 0;
    t.itemList = [];
    t.glassCom = null;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.SecretBuyUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.SecretBuyUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.btnBack = this.contentPane.getChild("btnBack").asButton;
    this.btnBack.onClick(this.onClickBack, this);
    this.btnLeft = this.contentPane.getChild("btnLeft").asButton;
    this.btnLeft.onClick(this.onClickLeft, this);
    this.btnRight = this.contentPane.getChild("btnRight").asButton;
    this.btnRight.onClick(this.onClickRight, this);
    this.btnRefresh = this.contentPane.getChild("btnRefresh").asButton;
    this.btnRefresh.onClick(this.onClickRefresh, this);
    this.btnDirect = this.contentPane.getChild("btnDirect").asButton;
    this.btnDirect.onClick(this.onClickDirect, this);
    this.btnWatch = this.contentPane.getChild("btnWatch").asButton;
    this.btnWatch.onClick(this.onClickWatch, this);
    this.btnAll = this.contentPane.getChild("btnAll").asButton;
    this.btnAll.onClick(this.onClickAll, this);
    this.btnSign = this.contentPane.getChild("btnSign").asButton;
    this.btnSign.onClick(this.onClickSign, this);
    this.btnOut = this.contentPane.getChild("btnOut").asButton;
    this.btnOut.onClick(this.onClickOut, this);
    this.coinCom = this.contentPane.getChild("coinCom");
    this.dayCom = this.contentPane.getChild("dayCom");
    this.list = this.contentPane.getChild("list").asList;
    this.list.itemRenderer = this.onListRenderer.bind(this);
    this.list.on(fgui.Event.SCROLL, this.onScroll, this);
    this.list.on(fgui.Event.SCROLL_END, this.onScrollEnd, this);
    r_ResSystem.ResSystem.loadBundleRes("game1", "secret/glass", cc.Prefab, function (e, o) {
      var i = cc.instantiate(o);
      i.active = true;
      t.contentPane.getChild("glassRoot").node.addChild(i);
      t.glassCom = i.getComponent(r_GlassCom.default);
      t.glassCom.node.active = false;
    });
    r_ResSystem.ResSystem.loadBundleRes("game1", "secret/finger", cc.Prefab, function (e, o) {
      t.finger = cc.instantiate(o);
      t.contentPane.getChild("glassRoot").node.addChild(t.finger);
      t.finger.active = false;
    });
  };
  _ctor.prototype.onClickBack = function () {
    r_SoundMgr.SoundMgr.playMusic("secretbgm1");
    this.hide();
  };
  _ctor.prototype.onClickRefresh = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("秘书刷新", function () {
      r_SecretSystem.SecretSystem.refreshBuyList();
      e.glassCom.node.active = false;
      e.refreshList();
    });
  };
  _ctor.prototype.onClickWatch = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("秘书透视", function () {
      e.btnWatch.visible = false;
      if (e.glassCom) {
        var t = e.itemList[e.list.scrollPane.currentPageX];
        if (t.secret) {
          e.glassCom.maskList[0] = t.secret.getChildByName("mask").getComponent(cc.Mask);
          e.list.enabled = false;
          e.glassCom.node.active = true;
          e.glassCom.showGlassArea();
        }
      }
    });
  };
  _ctor.prototype.hideGlass = function () {
    this.list.enabled = true;
    this.glassCom.clearMask();
    this.glassCom.node.active = false;
  };
  _ctor.prototype.signSecret = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playSound("secret/success");
    var t = this.getCurSecretCfg();
    this.removeCurSecret();
    r_SecretSystem.SecretSystem.addSecret(t);
    r_SecretGetUI.SecretGetUI.showUI({
      cfg: t,
      callBack: function () {
        e.onClickBack();
      }
    });
  };
  _ctor.prototype.onClickDirect = function () {
    var e = this;
    if (r_PlayerData.PlayerData.data.secretMap.secretList.length >= r_RoleCfg.SecretNumMAX) {
      r_UtilsSystem.UtilsSystem.showTip("招聘数量已达上线");
    } else {
      r_PlatformSystem.PlatformSystem.showVideo("直接签约", function () {
        e.signSecret();
      });
    }
  };
  _ctor.prototype.onClickSign = function () {
    if (r_PlayerData.PlayerData.data.secretMap.secretList.length >= r_RoleCfg.SecretNumMAX) {
      r_UtilsSystem.UtilsSystem.showTip("招聘数量已达上线");
    } else {
      var e = this.getCurSecretCfg();
      if (r_PlayerData.PlayerData.isCoinEnough(e.buyCoin)) {
        r_PlayerData.PlayerData.deleteCoin("秘书签约", e.buyCoin, r_ReportSystem.SystemKey.秘书);
        this.signSecret();
      } else {
        r_UtilsSystem.UtilsSystem.showTip("金币不足");
      }
    }
  };
  _ctor.prototype.removeCurSecret = function () {
    r_PlayerData.PlayerData.data.secretMap.buyList.splice(this.list.scrollPane.currentPageX, 1);
    this.itemList = [];
    this.list.numItems = r_PlayerData.PlayerData.data.secretMap.buyList.length;
    this.curMaxIndex = r_PlayerData.PlayerData.data.secretMap.buyList.length;
    r_PlayerData.PlayerData.data.secretMap.buyList.length > 1 && this.list.scrollToView(0);
    this.refreshInfo();
  };
  _ctor.prototype.onClickOut = function () {
    this.removeCurSecret();
  };
  _ctor.prototype.onClickAll = function () {
    var e = this.getCurSecretCfg();
    if (r_PlayerData.PlayerData.isCoinEnough(e.watchCoin)) {
      r_PlayerData.PlayerData.deleteCoin("秘书看全貌", e.watchCoin, r_ReportSystem.SystemKey.秘书);
      this.hideGlass();
      var t = this.itemList[this.list.scrollPane.currentPageX];
      if (t.secret) {
        var o = t.secret.getChildByName("erase").getComponent(r_EraseCom.default);
        o.cleanAllSuccessCallBack = this.cleanAllSuccess.bind(this);
        o.touchMove = this.cleanTouchMove.bind(this);
        this.list.enabled = false;
        this.btnLeft.visible = false;
        this.btnRight.visible = false;
        this.btnWatch.visible = false;
        this.btnAll.visible = false;
        this.btnRefresh.visible = false;
        this.btnBack.visible = false;
        this.coinCom.visible = false;
        this.dayCom.visible = false;
        o.startClean();
        var i = r_SecretCfg.SecretPosCfg[e.id];
        i || (i = r_SecretCfg.SecretPosCfg[1]);
        o.initPointsWithCfg(i);
        this.finger && (this.finger.active = true);
      }
    } else {
      r_UtilsSystem.UtilsSystem.showTip("金币不足");
    }
  };
  _ctor.prototype.cleanTouchMove = function () {
    this.finger && (this.finger.active = false);
  };
  _ctor.prototype.refreshList = function () {
    this.itemList = [];
    this.list.numItems = r_PlayerData.PlayerData.data.secretMap.buyList.length;
    this.curMaxIndex = r_PlayerData.PlayerData.data.secretMap.buyList.length;
    this.refreshInfo();
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    r_SecretSystem.SecretSystem.checkRefreshBuyList();
    this.refreshList();
    this.blockBtn(this.btnLeft);
    this.blockBtn(this.btnRight);
    this.blockBtn(this.btnRefresh);
    this.blockBtn(this.btnDirect);
    this.blockBtn(this.btnWatch);
    this.blockBtn(this.btnAll);
    this.blockBtn(this.btnSign);
    this.blockBtn(this.btnBack);
    this.blockBtn(this.btnOut);
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    _ctor.Inst = null;
  };
  _ctor.prototype.blockBtn = function (e) {
    e.off(cc.Node.EventType.TOUCH_START);
    e.on(cc.Node.EventType.TOUCH_START, function () {}, this);
  };
  _ctor.prototype.onScroll = function () {};
  _ctor.prototype.onScrollEnd = function () {
    console.log("onScrollEnd");
    this.refreshInfo();
  };
  _ctor.prototype.cleanAllSuccess = function () {
    console.log("cleanAllSuccess");
    var e = this.itemList[this.list.scrollPane.currentPageX];
    if (e.secret) {
      e.secret.getChildByName("mask").active = false;
      var t = e.secret.getChildByName("erase").getComponent(r_EraseCom.default);
      t.node.active = false;
      t.cleanAllSuccessCallBack = null;
      this.list.enabled = true;
      r_SecretSystem.SecretSystem.watchSecret(this.getCurSecretCfg().id);
      this.btnRefresh.visible = true;
      this.btnBack.visible = true;
      this.coinCom.visible = true;
      this.dayCom.visible = true;
      this.finger && (this.finger.active = false);
      this.refreshInfo();
    }
  };
  _ctor.prototype.onListRenderer = function (e, t) {
    this.itemList[e] = t;
    var o = r_PlayerData.PlayerData.data.secretMap.buyList[e];
    var i = r_SecretSystem.SecretSystem.getSecretCfgById(o);
    var n = function () {
      var e = t.secret.getChildByName("erase").getComponent(r_EraseCom.default);
      e.cleanAllSuccessCallBack = null;
      e.init();
      e.stopClean();
      e.clear();
      if (r_SecretSystem.SecretSystem.watchMap[o]) {
        t.secret.getChildByName("mask").active = false;
        e.node.active = false;
      } else {
        t.secret.getChildByName("mask").active = true;
        e.node.active = true;
      }
      r_ResSystem.ResSystem.loadBundleUIImg(t.secret.getChildByName("icon"), "game1", "secret/icon/" + i.icon);
      r_ResSystem.ResSystem.loadBundleUIImg(t.secret.getChildByName("mask").getChildByName("icon"), "game1", "secret/icon/" + i.icon);
    };
    if (t.secret) {
      n();
    } else {
      r_ResSystem.ResSystem.loadBundleRes("game1", "secret/secret", cc.Prefab, function (e, o) {
        t.secret = cc.instantiate(o);
        t.secret.active = true;
        t.getChild("icon").node.addChild(t.secret);
        n();
      });
    }
  };
  _ctor.prototype.onClickLeft = function () {
    var e = this.list.scrollPane.currentPageX + 1;
    if (!(e <= 1)) {
      this.hideGlass();
      this.list.scrollToView(e - 2, true);
    }
  };
  _ctor.prototype.onClickRight = function () {
    var e = this.list.scrollPane.currentPageX + 1;
    if (!(e >= this.curMaxIndex)) {
      this.hideGlass();
      this.list.scrollToView(e, true);
    }
  };
  _ctor.prototype.getCurSecretCfg = function () {
    var e = this.list.scrollPane.currentPageX;
    var t = r_PlayerData.PlayerData.data.secretMap.buyList[e];
    return r_SecretSystem.SecretSystem.getSecretCfgById(t);
  };
  _ctor.prototype.refreshInfo = function () {
    var e = this.getCurSecretCfg();
    if (e) {
      if (r_SecretSystem.SecretSystem.watchMap[e.id]) {
        this.btnWatch.visible = false;
        this.btnAll.visible = false;
        if (e.drop) {
          this.btnDirect.visible = false;
          this.btnSign.visible = false;
          this.btnOut.visible = true;
        } else {
          this.btnDirect.visible = true;
          this.btnSign.visible = true;
          this.btnOut.visible = false;
          this.btnSign.getChild("num").text = r_UtilsSystem.UtilsSystem.getShowCoin(e.buyCoin);
        }
      } else {
        this.btnWatch.visible = true;
        this.btnAll.visible = true;
        this.btnAll.getChild("num").text = r_UtilsSystem.UtilsSystem.getShowCoin(e.watchCoin);
        this.btnDirect.visible = false;
        this.btnSign.visible = false;
        this.btnOut.visible = false;
      }
    } else {
      this.btnWatch.visible = false;
      this.btnAll.visible = false;
      this.btnDirect.visible = false;
      this.btnSign.visible = false;
      this.btnOut.visible = false;
    }
    this.refreshBtn();
  };
  _ctor.prototype.refreshBtn = function () {
    var e = this.list.scrollPane.currentPageX + 1;
    this.btnLeft.visible = !(e <= 1);
    if (e >= this.curMaxIndex) {
      this.btnRight.visible = false;
    } else {
      this.btnRight.visible = true;
    }
  };
  _ctor.Inst = null;
  return _ctor;
}(r_TYIndex.UIWind);
exports.SecretBuyUI = exp_SecretBuyUI;