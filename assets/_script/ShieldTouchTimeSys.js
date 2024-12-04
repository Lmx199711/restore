Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShieldTouchTimeSys = undefined;
var r_DecorateBehavior = require("DecorateBehavior");
var r_ShieldTouchTimeCom = require("ShieldTouchTimeCom");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_BehaviorMgr = require("BehaviorMgr");
var exp_ShieldTouchTimeSys = function () {
  function _ctor() {}
  _ctor.prototype.trigger = function (e) {
    var t = this.entity.defaultShieldTime;
    e && !isNaN(parseInt(e)) && (t = parseInt(e));
    r_BehaviorMgr.BehaviorMgr.timeout(.01, function () {
      r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.touchDisabled = true;
    });
    r_BehaviorMgr.BehaviorMgr.timeout(t, function () {
      r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.touchDisabled = false;
    });
  };
  _ctor.prototype.onStart = function () {};
  _ctor.prototype.onDestroy = function () {};
  return __decorate([r_DecorateBehavior.bindActionCom(r_ShieldTouchTimeCom.ShieldTouchTimeCom)], _ctor);
}();
exports.ShieldTouchTimeSys = exp_ShieldTouchTimeSys;