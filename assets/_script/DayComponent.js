var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DayComponent = undefined;
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_DaySystem = require("DaySystem");
var r_PlayerData = require("PlayerData");
var r_TimeSystem = require("TimeSystem");
var r_SoundMgr = require("SoundMgr");
var exp_DayComponent = function (e) {
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
    console.log("DayComponent onConstruct");
    this.onClick(this.onClickSelf, this);
    r_TYEventDispatcher.TYEventDispatcher.on(r_TYEvent.EventDef.energyChange, this.updateInfo, this);
  };
  _ctor.prototype.onEnable = function () {
    var t = this;
    e.prototype.onEnable.call(this);
    this.updateInfo();
    r_TimeSystem.TimeSystem.registSecondUpdate("DayComponent" + this.index, function () {
      t.updateInfo();
    });
  };
  _ctor.prototype.onDisable = function () {
    e.prototype.onDisable.call(this);
    r_TimeSystem.TimeSystem.unregistSecondUpdate("DayComponent" + this.index);
  };
  _ctor.prototype.updateInfo = function () {
    this.updateTime();
  };
  _ctor.prototype.updateTime = function () {
    if (r_PlayerData.PlayerData && r_PlayerData.PlayerData.data && r_PlayerData.PlayerData.data.gameguide < 7) {
      r_DaySystem.DaySystem.setPause(true);
    } else {
      r_DaySystem.DaySystem.setPause(false);
      var e = 0;
      r_PlayerData.PlayerData && r_PlayerData.PlayerData.data && (e = r_PlayerData.PlayerData.data.time);
      var t = Math.floor(e / r_TimeSystem.TimeSystem.oneDaySecond) + 1;
      e %= r_TimeSystem.TimeSystem.oneDaySecond;
      var o = Math.floor(e / 3600);
      var i = Math.floor(e % 3600 / 60);
      var n = "";
      o < 10 && (o = "0" + o);
      n = n + o + ":";
      i < 10 && (i = "0" + i);
      n += i;
      this.getChild("day").text = "第" + t + "天";
      this.getChild("time").text = n;
    }
  };
  _ctor.prototype.onClickSelf = function () {
    this.getChild("main");
    if (!(cc.sys.platform != cc.sys.DESKTOP_BROWSER && cc.sys.platform != cc.sys.MOBILE_BROWSER)) {
      r_SoundMgr.SoundMgr.playSound("click");
      r_DaySystem.DaySystem.clickNextDay();
    }
  };
  _ctor.staticId = 1;
  return _ctor;
}(fgui.GComponent);
exports.DayComponent = exp_DayComponent;