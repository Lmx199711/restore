var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VitalityComponent = undefined;
var r_TYEvent = require("TYEvent");
var r_TYEventDispatcher = require("TYEventDispatcher");
var r_TimeSystem = require("TimeSystem");
var r_PetBuyVitalityUI = require("PetBuyVitalityUI");
var r_PetCfg = require("PetCfg");
var r_PetData = require("PetData");
var exp_VitalityComponent = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.onConstruct = function () {
    this.index = _ctor.staticId;
    _ctor.staticId = _ctor.staticId + 1;
    this.onClick(this.onClickSelf, this);
    this.numLb = this.getChild("num");
    this.timeText = this.getChild("timeText").asTextField;
  };
  _ctor.prototype.onEnable = function () {
    var o = this;
    e.prototype.onEnable.call(this);
    _ctor.activeCount++;
    1 == _ctor.activeCount && _ctor.downTimeRun();
    this.updateInfo();
    r_TimeSystem.TimeSystem.registSecondUpdate("VitalityComponent" + this.index, function () {
      o.updateInfo();
    });
    r_TYEventDispatcher.TYEventDispatcher.on(r_TYEvent.EventDef.vitalityChange, this.updateInfo, this);
  };
  _ctor.prototype.onDisable = function () {
    e.prototype.onDisable.call(this);
    _ctor.activeCount--;
    0 == _ctor.activeCount && _ctor.downTimeStop();
    r_TimeSystem.TimeSystem.unregistSecondUpdate("VitalityComponent" + this.index);
    r_TYEventDispatcher.TYEventDispatcher.off(r_TYEvent.EventDef.vitalityChange, this.updateInfo, this);
  };
  _ctor.prototype.updateInfo = function () {
    var e = r_PetData.PetData.getPetBaseInfo();
    e && (this.numLb.text = e.vitality + "/" + r_PetCfg.PetGameCfg.vitalityMax);
    if (e.vitality < r_PetCfg.PetGameCfg.vitalityMax) {
      this.timeText.visible = true;
      var o = Math.floor(_ctor.downTime % 3600 / 60);
      var i = _ctor.downTime % 60;
      this.timeText.setVar("time", o.toString().padStart(2, "0") + ":" + i.toString().padStart(2, "0")).flushVars();
    } else {
      this.timeText.visible = false;
    }
  };
  _ctor.prototype.onClickSelf = function () {
    r_PetBuyVitalityUI.PetBuyVitalityUI.showUI();
  };
  _ctor.downTimeRun = function () {
    var e = this;
    var t = Math.floor(Date.now() / 1e3);
    this.downTime = Math.floor(t - r_PetData.PetData.getData("addVitalityTime", t));
    var o = Math.floor(this.downTime / this.downTimeInterval);
    this.downTime %= this.downTimeInterval;
    if (o > 0) {
      r_PetData.PetData.addVitality(o, true);
      r_PetData.PetData.setData("addVitalityTime", t - this.downTime);
    }
    this.downTime = this.downTimeInterval - this.downTime;
    r_TimeSystem.TimeSystem.registSecondUpdate("vitalityDownTime", function () {
      if (r_PetData.PetData.getPetBaseInfo().vitality < r_PetCfg.PetGameCfg.vitalityMax) {
        e.downTime--;
        if (e.downTime <= 0) {
          e.downTime = e.downTimeInterval;
          r_PetData.PetData.addVitality(1, true);
          r_PetData.PetData.setData("addVitalityTime", Math.floor(Date.now() / 1e3));
        }
      } else {
        e.downTime = e.downTimeInterval;
      }
    });
  };
  _ctor.downTimeStop = function () {
    r_TimeSystem.TimeSystem.unregistSecondUpdate("vitalityDownTime");
    r_PetData.PetData.setData("addVitalityTime", Math.floor(Date.now() / 1e3) - this.downTimeInterval + this.downTime);
  };
  _ctor.staticId = 1;
  _ctor.downTimeInterval = 300;
  _ctor.downTime = 0;
  _ctor.activeCount = 0;
  return _ctor;
}(fgui.GComponent);
exports.VitalityComponent = exp_VitalityComponent;