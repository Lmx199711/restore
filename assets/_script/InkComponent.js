var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InkComponent = undefined;
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_PlayerData = require("PlayerData");
var r_SoundMgr = require("SoundMgr");
var r_BuyInkUI = require("BuyInkUI");
var r_PrinterCommon = require("PrinterCommon");
var exp_InkComponent = function (e) {
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
    this.onClick(this.onClickSelf, this);
    this.numLb = this.getChild("num");
  };
  _ctor.prototype.onEnable = function () {
    e.prototype.onEnable.call(this);
    r_TYEventDispatcher.TYEventDispatcher.on(r_TYEvent.EventDef.inkChange, this.updateInfo, this);
    this.updateInfo();
  };
  _ctor.prototype.onDisable = function () {
    e.prototype.onDisable.call(this);
    r_TYEventDispatcher.TYEventDispatcher.off(r_TYEvent.EventDef.inkChange, this.updateInfo, this);
  };
  _ctor.prototype.updateInfo = function () {
    if (r_PlayerData.PlayerData.data) {
      this.numLb.text = r_PrinterCommon.PrinterCommon.getInkCount() + "";
    } else {
      this.numLb.text = "0";
    }
  };
  _ctor.prototype.onClickSelf = function () {
    r_SoundMgr.SoundMgr.playSound("click");
    r_BuyInkUI.BuyInkUI.showUI();
  };
  _ctor.staticId = 1;
  return _ctor;
}(fgui.GComponent);
exports.InkComponent = exp_InkComponent;