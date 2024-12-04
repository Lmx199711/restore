var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_UIDef = require("UIDef");
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_FguiResSystem = require("FguiResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_AetherCfg = require("AetherCfg");
var r_DecorateFunction1 = require("DecorateFunction1");
var r_SoundMgr = require("SoundMgr");
var r_BaseWin = require("BaseWin");
var r_AetherGameCom = require("AetherGameCom");
var def_AetherUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Aether, r_UIDef.UIDef.Res.UI.AetherUI) || this;
    t.showAnimFlag = false;
    t.uiType = "fullScreen";
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "modal", {
    get: function () {
      return false;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.AetherUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.AetherUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.bindBtnCallback(this.btnStart);
    r_ResSystem.ResSystem.loadBundleRes("game4", "aether/aetherGameCom", cc.Prefab, function (e, o) {
      if (e) {
        console.error("加载失败: ", e);
      } else {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
        var i = cc.instantiate(o);
        t.center.node.addChild(i);
        i.active = true;
        t.bitLogic = i.getComponent(r_AetherGameCom.AetherGameCom);
      }
    });
    this.contentPane.getChild("item0").asCom.getChild("btnBuy").onClick(this.onBuyItem0, this);
    this.contentPane.getChild("item1").asCom.getChild("btnBuy").onClick(this.onBuyItem1, this);
    this.contentPane.getChild("item2").asCom.getChild("btnBuy").onClick(this.onBuyItem2, this);
    this.contentPane.getChild("item0").asCom.getChild("btnVieo").onClick(this.onFreeItem0, this);
    this.contentPane.getChild("item1").asCom.getChild("btnVieo").onClick(this.onFreeItem1, this);
    this.contentPane.getChild("item2").asCom.getChild("btnVieo").onClick(this.onFreeItem2, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    _ctor.Inst = this;
    r_TYEventDispatcher.TYEventDispatcher.on(r_TYEvent.EventDef.bitAgain, this.onBitAgain, this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TYEventDispatcher.TYEventDispatcher.off(r_TYEvent.EventDef.bitAgain, this.onBitAgain, this);
    r_PlayerData.PlayerData.isGame = false;
    _ctor.Inst = null;
  };
  _ctor.prototype.onBitAgain = function () {
    this.restart();
  };
  _ctor.prototype.restart = function () {
    this.contentPane.getController("c1").selectedIndex = 0;
    r_PlayerData.PlayerData.isGame = true;
    this.showItem0();
    this.showItem1();
    this.showItem2();
    this.contentPane.getTransition("init").play();
    this.btnStart.enabled = true;
  };
  _ctor.prototype.onClickbtnStart = function () {
    var e = this;
    if (this.bitLogic) {
      this.btnStart.enabled = false;
      r_SoundMgr.SoundMgr.playSound("aether/火箭");
      this.contentPane.getTransition("t1").play(function () {
        e.contentPane.getController("c1").selectedIndex = 1;
        r_TimeSystem.TimeSystem.scheduleOnce("onClickbtnStart1", 1.5, function () {
          r_UtilsSystem.UtilsSystem.playAnim(e.animHuojian, "step_3", false);
          e.bitLogic.setBitAction(true);
        });
        e.contentPane.getTransition("t2").play(function () {
          e.bitLogic.gameStart();
        });
      });
      r_UtilsSystem.UtilsSystem.playAnim(this.animHuojian, "step_1", false);
      r_TimeSystem.TimeSystem.scheduleOnce("onClickbtnStart", 1.4, function () {
        r_UtilsSystem.UtilsSystem.playAnim(e.animHuojian, "step_2", true);
      });
    }
  };
  _ctor.prototype.showItem0 = function () {
    this.contentPane.getChild("item0").asCom.getController("c2").setSelectedIndex(0);
    this.contentPane.getChild("item0").asCom.getChild("labLevel").text = "Lv." + r_AetherCfg.AetherLeveMoveSpeed[r_PlayerData.PlayerData.data.aetherLeveMoveSpeed].nextLevel;
    if ("max" != r_AetherCfg.AetherLeveMoveSpeed[r_PlayerData.PlayerData.data.aetherLeveMoveSpeed].nextLevel) {
      this.contentPane.getChild("item0").asCom.getChild("labelPrice").text = r_UtilsSystem.UtilsSystem.getShowCoin(r_AetherCfg.AetherLeveMoveSpeed[r_PlayerData.PlayerData.data.aetherLeveMoveSpeed].upPrice);
      this.contentPane.getChild("item0").asCom.getController("c1").setSelectedIndex(r_PlayerData.PlayerData.isCoinEnough(r_AetherCfg.AetherLeveMoveSpeed[r_PlayerData.PlayerData.data.aetherLeveMoveSpeed].upPrice) ? 0 : 1);
    } else {
      this.contentPane.getChild("item0").asCom.getController("c2").setSelectedIndex(1);
    }
  };
  _ctor.prototype.showItem1 = function () {
    this.contentPane.getChild("item1").asCom.getController("c2").setSelectedIndex(0);
    this.contentPane.getChild("item1").asCom.getChild("labLevel").text = "Lv." + r_AetherCfg.AetherLeveOilLoss[r_PlayerData.PlayerData.data.aetherLeveOilLoss].nextLevel;
    if ("max" != r_AetherCfg.AetherLeveOilLoss[r_PlayerData.PlayerData.data.aetherLeveOilLoss].nextLevel) {
      this.contentPane.getChild("item1").asCom.getChild("labelPrice").text = r_UtilsSystem.UtilsSystem.getShowCoin(r_AetherCfg.AetherLeveOilLoss[r_PlayerData.PlayerData.data.aetherLeveOilLoss].upPrice);
      this.contentPane.getChild("item1").asCom.getController("c1").setSelectedIndex(r_PlayerData.PlayerData.isCoinEnough(r_AetherCfg.AetherLeveOilLoss[r_PlayerData.PlayerData.data.aetherLeveOilLoss].upPrice) ? 0 : 1);
    } else {
      this.contentPane.getChild("item1").asCom.getController("c2").setSelectedIndex(1);
    }
  };
  _ctor.prototype.showItem2 = function () {
    this.contentPane.getChild("item2").asCom.getController("c2").setSelectedIndex(0);
    this.contentPane.getChild("item2").asCom.getChild("labLevel").text = "Lv." + r_AetherCfg.AetherLeveAttck[r_PlayerData.PlayerData.data.aetherLeveAttck].nextLevel;
    if ("max" != r_AetherCfg.AetherLeveAttck[r_PlayerData.PlayerData.data.aetherLeveAttck].nextLevel) {
      this.contentPane.getChild("item2").asCom.getChild("labelPrice").text = r_UtilsSystem.UtilsSystem.getShowCoin(r_AetherCfg.AetherLeveAttck[r_PlayerData.PlayerData.data.aetherLeveAttck].upPrice);
      this.contentPane.getChild("item2").asCom.getController("c1").setSelectedIndex(r_PlayerData.PlayerData.isCoinEnough(r_AetherCfg.AetherLeveAttck[r_PlayerData.PlayerData.data.aetherLeveAttck].upPrice) ? 0 : 1);
    } else {
      this.contentPane.getChild("item2").asCom.getController("c2").setSelectedIndex(1);
    }
  };
  _ctor.prototype.onBuyItem0 = function () {
    if (r_PlayerData.PlayerData.isCoinEnough(r_AetherCfg.AetherLeveMoveSpeed[r_PlayerData.PlayerData.data.aetherLeveMoveSpeed].upPrice)) {
      r_PlayerData.PlayerData.deleteCoin("升级钻头移速", r_AetherCfg.AetherLeveMoveSpeed[r_PlayerData.PlayerData.data.aetherLeveMoveSpeed].upPrice, r_ReportSystem.SystemKey.钻井);
      r_PlayerData.PlayerData.data.aetherLeveMoveSpeed++;
      r_PlayerData.PlayerData.saveData();
      r_SoundMgr.SoundMgr.playSound("bit/升级成功");
    } else {
      r_UtilsSystem.UtilsSystem.showTip("钱不够~");
    }
    this.showItem0();
    this.showItem1();
    this.showItem2();
  };
  _ctor.prototype.onBuyItem1 = function () {
    if (r_PlayerData.PlayerData.isCoinEnough(r_AetherCfg.AetherLeveOilLoss[r_PlayerData.PlayerData.data.aetherLeveOilLoss].upPrice)) {
      r_PlayerData.PlayerData.deleteCoin("升级减少油耗", r_AetherCfg.AetherLeveOilLoss[r_PlayerData.PlayerData.data.aetherLeveOilLoss].upPrice, r_ReportSystem.SystemKey.钻井);
      r_PlayerData.PlayerData.data.aetherLeveOilLoss++;
      r_PlayerData.PlayerData.saveData();
      r_SoundMgr.SoundMgr.playSound("bit/升级成功");
    } else {
      r_UtilsSystem.UtilsSystem.showTip("钱不够~");
    }
    this.showItem0();
    this.showItem1();
    this.showItem2();
  };
  _ctor.prototype.onBuyItem2 = function () {
    if (r_PlayerData.PlayerData.isCoinEnough(r_AetherCfg.AetherLeveAttck[r_PlayerData.PlayerData.data.aetherLeveAttck].upPrice)) {
      r_PlayerData.PlayerData.deleteCoin("升级钻头金钱", r_AetherCfg.AetherLeveAttck[r_PlayerData.PlayerData.data.aetherLeveAttck].upPrice, r_ReportSystem.SystemKey.钻井);
      r_PlayerData.PlayerData.data.aetherLeveAttck++;
      r_PlayerData.PlayerData.saveData();
      r_SoundMgr.SoundMgr.playSound("bit/升级成功");
    } else {
      r_UtilsSystem.UtilsSystem.showTip("钱不够~");
    }
    this.showItem0();
    this.showItem1();
    this.showItem2();
  };
  _ctor.prototype.onFreeItem0 = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("升级钻头移速", function () {
      r_PlayerData.PlayerData.data.aetherLeveMoveSpeed++;
      r_PlayerData.PlayerData.saveData();
      r_SoundMgr.SoundMgr.playSound("bit/升级成功");
      e.showItem0();
      e.showItem1();
      e.showItem2();
    });
  };
  _ctor.prototype.onFreeItem1 = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("升级减少油耗", function () {
      r_PlayerData.PlayerData.data.aetherLeveOilLoss++;
      r_PlayerData.PlayerData.saveData();
      r_SoundMgr.SoundMgr.playSound("bit/升级成功");
      e.showItem0();
      e.showItem1();
      e.showItem2();
    });
  };
  _ctor.prototype.onFreeItem2 = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("升级钻头金钱", function () {
      r_PlayerData.PlayerData.data.aetherLeveAttck++;
      r_PlayerData.PlayerData.saveData();
      r_SoundMgr.SoundMgr.playSound("bit/升级成功");
      e.showItem0();
      e.showItem1();
      e.showItem2();
    });
  };
  __decorate([r_DecorateFunction1.AutoFind("btnStart")], _ctor.prototype, "btnStart", undefined);
  __decorate([r_DecorateFunction1.AutoFind("center")], _ctor.prototype, "center", undefined);
  __decorate([r_DecorateFunction1.AutoFind("animHuojian")], _ctor.prototype, "animHuojian", undefined);
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_AetherUI;