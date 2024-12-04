var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoopAction = undefined;
var r_TimeSystem = require("TimeSystem");
var r_TriggerActionMgr = require("TriggerActionMgr");
var r_ActionBase = require("ActionBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_LoopAction = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.loopActionName = "";
    t.loopTime = "";
    t.firstTrigger = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onTrigger = function () {
    e.prototype.onTrigger.call(this);
    this.firstTrigger && r_TriggerActionMgr.TriggerActionMgr.trigger(this.loopActionName);
    this.delayTrigger();
  };
  _ctor.prototype.delayTrigger = function () {
    var e = this;
    r_TimeSystem.TimeSystem.scheduleOnce("loop_" + this.actionId, this.loopTime, function () {
      r_TriggerActionMgr.TriggerActionMgr.trigger(e.loopActionName);
      e.delayTrigger();
    });
  };
  _ctor.prototype.onStop = function () {
    r_TimeSystem.TimeSystem.scheduleClear("loop_" + this.actionId);
  };
  __decorate([_property({
    displayName: "循环动作的名称"
  })], _ctor.prototype, "loopActionName", undefined);
  __decorate([_property({
    displayName: "循环触发的时间"
  })], _ctor.prototype, "loopTime", undefined);
  __decorate([_property({
    displayName: "进入就触发"
  })], _ctor.prototype, "firstTrigger", undefined);
  return __decorate([_ccclass("LoopAction")], _ctor);
}(r_ActionBase.ActionBase);
exports.LoopAction = exp_LoopAction;