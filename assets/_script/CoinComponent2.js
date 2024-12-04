var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CoinComponent2 = undefined;
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_CoinSystem = require("CoinSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_WeaponSystem = require("WeaponSystem");
var r_BuyStoneUI = require("BuyStoneUI");
var exp_CoinComponent2 = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.lastNum = 0;
    t.isFixUi = false;
    t.isInit = true;
    t.curCoin = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onConstruct = function () {
    this.index = _ctor.staticId;
    _ctor.staticId = _ctor.staticId + 1;
    console.log("CoinComponent onConstruct");
    this.getChild("btnCoin") && this.getChild("btnCoin").onClick(this.onClickSelf, this);
    this.getChild("btnStone") && this.getChild("btnStone").onClick(this.onClickStone, this);
    this.getChild("btnStoneBg") && this.getChild("btnStoneBg").onClick(this.onClickStoneGm, this);
    this.coinPic = this.getChild("icon");
    this.numLb = this.getChild("lbCoin");
    this.numST = this.getChild("lbStone");
    this.lbClick = this.getChild("lbClick");
    this.lbSecond = this.getChild("lbSecond");
  };
  _ctor.prototype.onEnable = function () {
    e.prototype.onEnable.call(this);
    r_TYEventDispatcher.TYEventDispatcher.on(r_TYEvent.EventDef.coinChange, this.updateInfo, this);
    this.updateInfo();
  };
  _ctor.prototype.onDisable = function () {
    e.prototype.onDisable.call(this);
    r_TYEventDispatcher.TYEventDispatcher.off(r_TYEvent.EventDef.coinChange, this.updateInfo, this);
  };
  _ctor.prototype.playerScaleAnim = function () {
    if (this.coinPic) {
      cc.Tween.stopAllByTarget(this.coinPic.node);
      cc.tween(this.coinPic.node).to(.25, {
        scale: 1.25
      }).to(.25, {
        scale: 1
      }).start();
    }
    if (this.numLb) {
      cc.Tween.stopAllByTarget(this.numLb.node);
      cc.tween(this.numLb.node).to(.25, {
        scale: 1.25
      }).to(.25, {
        scale: 1
      }).start();
    }
  };
  _ctor.prototype.refreshCoinTip = function () {
    this.lbClick && (this.lbClick.text = r_UtilsSystem.UtilsSystem.getShowCoin(r_CoinSystem.CoinSystem.getClickCoin()));
    this.lbSecond && (this.lbSecond.text = r_UtilsSystem.UtilsSystem.getShowCoin(r_CoinSystem.CoinSystem.getAllAddCoin().allCoin));
  };
  _ctor.prototype.updateInfo = function () {
    if (r_PlayerData.PlayerData.data) {
      this.numLb && (this.numLb.text = r_UtilsSystem.UtilsSystem.getShowCoin(r_PlayerData.PlayerData.bigCoin, 2) + "");
    } else {
      this.numLb && (this.numLb.text = "0元");
    }
    if (r_PlayerData.PlayerData.data) {
      this.numST && (this.numST.text = r_UtilsSystem.UtilsSystem.getShowCoin(r_PlayerData.PlayerData.bigStone, 1, false) + "");
    } else {
      this.numST && (this.numST.text = "0");
    }
    this.refreshCoinTip();
  };
  _ctor.prototype.onClickSelf = function () {
    cc.sys.platform != cc.sys.DESKTOP_BROWSER && cc.sys.platform != cc.sys.MOBILE_BROWSER || r_PlayerData.PlayerData.addCoin("调试金币", 1e20, r_ReportSystem.SystemKey.None);
  };
  _ctor.prototype.onClickStoneGm = function () {
    if (!(cc.sys.platform != cc.sys.DESKTOP_BROWSER && cc.sys.platform != cc.sys.MOBILE_BROWSER)) {
      r_PlayerData.PlayerData.addStone("调试灵石", 9e6, r_ReportSystem.SystemKey.None);
      r_WeaponSystem.WeaponSystem.GetAllRecipe();
    }
  };
  _ctor.prototype.onClickStone = function () {
    r_BuyStoneUI.BuyStoneUI.showUI();
  };
  _ctor.staticId = 1;
  return _ctor;
}(fgui.GComponent);
exports.CoinComponent2 = exp_CoinComponent2;