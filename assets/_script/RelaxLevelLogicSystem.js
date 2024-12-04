var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RelaxLevelLogicSystem = undefined;
var r_GameKeyMgr = require("GameKeyMgr");
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_BehaviorMgr = require("BehaviorMgr");
var r_TimeSystem = require("TimeSystem");
var r_TouchMgrLevel = require("TouchMgrLevel");
var l = function (e) {
  function t() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(t, e);
  t.prototype.onLoadLevelSuccess = function (t) {
    e.prototype.onLoadLevelSuccess.call(this, t);
  };
  t.prototype.onStart = function () {
    r_TriggerActionMgr.TriggerActionMgr.start();
    r_BehaviorMgr.BehaviorMgr.start();
  };
  t.prototype.onDestroy = function () {
    e.prototype.onDestroy.call(this);
    r_GameKeyMgr.GameKeyMgr.clear();
    r_TriggerActionMgr.TriggerActionMgr.clear();
    r_BehaviorMgr.BehaviorMgr.stopAll();
  };
  t.prototype.clearLevel = function () {
    e.prototype.clearLevel.call(this);
    r_TimeSystem.TimeSystem.scheduleClearAll();
    r_GameKeyMgr.GameKeyMgr.clear();
    r_TriggerActionMgr.TriggerActionMgr.clear();
    r_BehaviorMgr.BehaviorMgr.stopAll();
    cc.audioEngine.stopAllEffects();
  };
  return t;
}(r_TouchMgrLevel.TouchMgrLevel);
exports.RelaxLevelLogicSystem = new l();