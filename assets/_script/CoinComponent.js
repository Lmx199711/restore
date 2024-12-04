var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CoinComponent = undefined;
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_SoundMgr = require("SoundMgr");
var exp_CoinComponent = function (e) {
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
    this.onClick(this.onClickSelf, this);
    this.numLb = this.getChild("num");
    this.img = this.getChild("img");
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
  _ctor.prototype.updateInfo = function () {
    if (r_PlayerData.PlayerData.data) {
      this.numLb.text = r_UtilsSystem.UtilsSystem.getShowCoin(r_PlayerData.PlayerData.bigCoin) + "";
    } else {
      this.numLb.text = "0";
    }
    cc.Tween.stopAllByTarget(this.numLb);
    cc.tween(this.numLb).to(.25, {
      scaleX: 1.2,
      scaleY: 1.2
    }).to(.25, {
      scaleX: 1,
      scaleY: 1
    }).start();
    cc.Tween.stopAllByTarget(this.img);
    cc.tween(this.img).to(.25, {
      scaleX: 1.2,
      scaleY: 1.2
    }).to(.25, {
      scaleX: 1,
      scaleY: 1
    }).start();
  };
  _ctor.prototype.onClickSelf = function () {
    r_SoundMgr.SoundMgr.playSound("click");
    cc.sys.platform != cc.sys.DESKTOP_BROWSER && cc.sys.platform != cc.sys.MOBILE_BROWSER || r_PlayerData.PlayerData.addCoin("调试金币", 1e16, r_ReportSystem.SystemKey.None);
  };
  _ctor.staticId = 1;
  return _ctor;
}(fgui.GComponent);
exports.CoinComponent = exp_CoinComponent;