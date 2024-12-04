var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BitGameUI = undefined;
var r_UIDef = require("UIDef");
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_FguiResSystem = require("FguiResSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_ShareSystem = require("ShareSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_BitCfg = require("BitCfg");
var r_TYIndex = require("TYIndex");
var r_SoundMgr = require("SoundMgr");
var r_BitLogic = require("BitLogic");
var r_BitTipUI = require("BitTipUI");
var exp_BitGameUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Bit, r_UIDef.UIDef.Res.UI.BitGameUI) || this;
    t.uiType = "fullScreen";
    t.isUp = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.BitGameUI, e, t);
    this.isShow = true;
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.BitGameUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").asButton.onClick(this.hide, this);
    r_ResSystem.ResSystem.loadBundleRes("game1", "bit/bitMap", cc.Prefab, function (e, o) {
      if (e) {
        console.error("加载失败: ", e);
      } else {
        r_FguiResSystem.FguiResSystem.addAutoReleaseRes(t, o);
        var i = cc.instantiate(o);
        t.contentPane.getChild("center").node.addChild(i);
        i.active = true;
        t.bitLogic = i.getComponent(r_BitLogic.BitLogic);
      }
    });
    this.btnStart = this.contentPane.getChild("btnStart").asButton;
    this.btnStart.onClick(this.onClickStart, this);
    this.contentPane.getChild("headBtn").asButton.onClick(this.onHeadBtn, this);
    this.uiGroup = this.contentPane.getChild("uiGroup").asGroup;
    this.isUp = true;
    this.contentPane.getChild("item0").asCom.getChild("btnBuy").onClick(this.onBuyItem0, this);
    this.contentPane.getChild("item1").asCom.getChild("btnBuy").onClick(this.onBuyItem1, this);
    this.contentPane.getChild("item2").asCom.getChild("btnBuy").onClick(this.onBuyItem2, this);
    this.contentPane.getChild("item0").asCom.getChild("btnVieo").onClick(this.onFreeItem0, this);
    this.contentPane.getChild("item1").asCom.getChild("btnVieo").onClick(this.onFreeItem1, this);
    this.contentPane.getChild("item2").asCom.getChild("btnVieo").onClick(this.onFreeItem2, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    r_PlayerData.PlayerData.isGame = true;
    r_TYEventDispatcher.TYEventDispatcher.on(r_TYEvent.EventDef.bitAgain, this.onBitAgain, this);
    this.showItem0();
    this.showItem1();
    this.showItem2();
  };
  _ctor.prototype.onHeadBtn = function () {
    r_BitTipUI.BitTipUI.showUI(r_BitCfg.BitPropConfig[9999]);
  };
  _ctor.prototype.onUpdate = function () {
    e.prototype.onUpdate.call(this);
    this.isUp && (this.contentPane.getChild("headBtn").visible = 2 == r_PlayerData.PlayerData.data.bitHead);
  };
  _ctor.prototype.onClickStart = function () {
    this.uiGroup.visible = false;
    if (this.bitLogic) {
      this.bitLogic.gameStart();
      r_ShareSystem.ShareSystem.startRecord();
    }
  };
  _ctor.prototype.onBitAgain = function () {
    var e = this;
    r_SoundMgr.SoundMgr.playMusic("bgm");
    setTimeout(function () {
      e.uiGroup.visible = true;
    }, 1e3);
    this.showItem0();
    this.showItem1();
    this.showItem2();
  };
  _ctor.prototype.showItem0 = function () {
    this.contentPane.getChild("item0").asCom.getController("c2").setSelectedIndex(0);
    this.contentPane.getChild("item0").asCom.getChild("labLevel").text = "Lv." + r_BitCfg.BitLeveMoveSpeed[r_PlayerData.PlayerData.data.bitLeveMoveSpeed].nextLevel;
    if ("max" != r_BitCfg.BitLeveMoveSpeed[r_PlayerData.PlayerData.data.bitLeveMoveSpeed].nextLevel) {
      this.contentPane.getChild("item0").asCom.getChild("labelPrice").text = r_UtilsSystem.UtilsSystem.getShowCoin(r_BitCfg.BitLeveMoveSpeed[r_PlayerData.PlayerData.data.bitLeveMoveSpeed].upPrice);
      this.contentPane.getChild("item0").asCom.getController("c1").setSelectedIndex(r_PlayerData.PlayerData.isCoinEnough(r_BitCfg.BitLeveMoveSpeed[r_PlayerData.PlayerData.data.bitLeveMoveSpeed].upPrice) ? 0 : 1);
    } else {
      this.contentPane.getChild("item0").asCom.getController("c2").setSelectedIndex(1);
    }
  };
  _ctor.prototype.showItem1 = function () {
    this.contentPane.getChild("item1").asCom.getController("c2").setSelectedIndex(0);
    this.contentPane.getChild("item1").asCom.getChild("labLevel").text = "Lv." + r_BitCfg.BitLeveOilLoss[r_PlayerData.PlayerData.data.bitLeveOilLoss].nextLevel;
    if ("max" != r_BitCfg.BitLeveOilLoss[r_PlayerData.PlayerData.data.bitLeveOilLoss].nextLevel) {
      this.contentPane.getChild("item1").asCom.getChild("labelPrice").text = r_UtilsSystem.UtilsSystem.getShowCoin(r_BitCfg.BitLeveOilLoss[r_PlayerData.PlayerData.data.bitLeveOilLoss].upPrice);
      this.contentPane.getChild("item1").asCom.getController("c1").setSelectedIndex(r_PlayerData.PlayerData.isCoinEnough(r_BitCfg.BitLeveOilLoss[r_PlayerData.PlayerData.data.bitLeveOilLoss].upPrice) ? 0 : 1);
    } else {
      this.contentPane.getChild("item1").asCom.getController("c2").setSelectedIndex(1);
    }
  };
  _ctor.prototype.showItem2 = function () {
    this.contentPane.getChild("item2").asCom.getController("c2").setSelectedIndex(0);
    this.contentPane.getChild("item2").asCom.getChild("labLevel").text = "Lv." + r_BitCfg.BitLeveCoin[r_PlayerData.PlayerData.data.bitLeveCoin].nextLevel;
    if ("max" != r_BitCfg.BitLeveCoin[r_PlayerData.PlayerData.data.bitLeveCoin].nextLevel) {
      this.contentPane.getChild("item2").asCom.getChild("labelPrice").text = r_UtilsSystem.UtilsSystem.getShowCoin(r_BitCfg.BitLeveCoin[r_PlayerData.PlayerData.data.bitLeveCoin].upPrice);
      this.contentPane.getChild("item2").asCom.getController("c1").setSelectedIndex(r_PlayerData.PlayerData.isCoinEnough(r_BitCfg.BitLeveCoin[r_PlayerData.PlayerData.data.bitLeveCoin].upPrice) ? 0 : 1);
    } else {
      this.contentPane.getChild("item2").asCom.getController("c2").setSelectedIndex(1);
    }
  };
  _ctor.prototype.onBuyItem0 = function () {
    if (r_PlayerData.PlayerData.isCoinEnough(r_BitCfg.BitLeveMoveSpeed[r_PlayerData.PlayerData.data.bitLeveMoveSpeed].upPrice)) {
      r_PlayerData.PlayerData.deleteCoin("升级钻头移速", r_BitCfg.BitLeveMoveSpeed[r_PlayerData.PlayerData.data.bitLeveMoveSpeed].upPrice, r_ReportSystem.SystemKey.钻井);
      r_PlayerData.PlayerData.data.bitLeveMoveSpeed++;
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
    if (r_PlayerData.PlayerData.isCoinEnough(r_BitCfg.BitLeveOilLoss[r_PlayerData.PlayerData.data.bitLeveOilLoss].upPrice)) {
      r_PlayerData.PlayerData.deleteCoin("升级减少油耗", r_BitCfg.BitLeveOilLoss[r_PlayerData.PlayerData.data.bitLeveOilLoss].upPrice, r_ReportSystem.SystemKey.钻井);
      r_PlayerData.PlayerData.data.bitLeveOilLoss++;
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
    if (r_PlayerData.PlayerData.isCoinEnough(r_BitCfg.BitLeveCoin[r_PlayerData.PlayerData.data.bitLeveCoin].upPrice)) {
      r_PlayerData.PlayerData.deleteCoin("升级钻头金钱", r_BitCfg.BitLeveCoin[r_PlayerData.PlayerData.data.bitLeveCoin].upPrice, r_ReportSystem.SystemKey.钻井);
      r_PlayerData.PlayerData.data.bitLeveCoin++;
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
      r_PlayerData.PlayerData.data.bitLeveMoveSpeed++;
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
      r_PlayerData.PlayerData.data.bitLeveOilLoss++;
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
      r_PlayerData.PlayerData.data.bitLeveCoin++;
      r_PlayerData.PlayerData.saveData();
      r_SoundMgr.SoundMgr.playSound("bit/升级成功");
      e.showItem0();
      e.showItem1();
      e.showItem2();
    });
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_ShareSystem.ShareSystem.stopRecord(false);
    r_PlayerData.PlayerData.isGame = false;
    _ctor.isShow = false;
    r_TYEventDispatcher.TYEventDispatcher.off(r_TYEvent.EventDef.bitAgain, this.onBitAgain, this);
  };
  _ctor.isShow = false;
  return _ctor;
}(r_TYIndex.UIWind);
exports.BitGameUI = exp_BitGameUI;