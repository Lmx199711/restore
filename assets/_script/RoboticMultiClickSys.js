var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoboticMultiClickSys = undefined;
var r_TYEventType = require("TYEventType");
var r_BehaviorMgr = require("BehaviorMgr");
var r_RoboticMultiClick = require("RoboticMultiClick");
var r_DecorateBehavior = require("DecorateBehavior");
var r_RoboticBaseSys = require("RoboticBaseSys");
var exp_RoboticMultiClickSys = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.timers = 0;
    t.comboCount = 0;
    t.canAnswer = true;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onStart = function () {};
  _ctor.prototype.onUpdate = function (e) {
    if (this.UpdateFlag) {
      this.timers += e;
      if (this.timers > this.entity.comboTime) {
        console.log(this.entity.node.name + "->combo结束,找连击数对应事件:" + this.comboCount);
        this.triggerSomeThing(this.comboCount);
        this.comboCount = 0;
        this.UpdateFlag = false;
      }
    }
  };
  _ctor.prototype.triggerSomeThing = function (e) {
    for (var t = this.entity.multiInfo.length - 1; t >= 0; t--) {
      var o = this.entity.multiInfo[t];
      if (e >= o.clickTime) {
        o.action && r_BehaviorMgr.BehaviorMgr.trigger(o.action);
        break;
      }
    }
  };
  _ctor.prototype.onEnable = function () {
    this.initNode(this.entity.node);
    this.entity.node.on(r_TYEventType.TYEventType.TOUCH_END, this.onTouchEnd, this);
  };
  _ctor.prototype.onTouchEnd = function () {
    if (this.entityBase.isClick && this.CanClick()) {
      this.comboCount++;
      this.timers = 0;
      this.UpdateFlag = true;
    }
  };
  _ctor.prototype.onDisable = function () {};
  _ctor.prototype.onDestroy = function () {
    this.entity.node.off(r_TYEventType.TYEventType.TOUCH_END, this.onTouchEnd, this);
  };
  return __decorate([r_DecorateBehavior.bindEventCom(r_RoboticMultiClick.RoboticMultiClick)], _ctor);
}(r_RoboticBaseSys.default);
exports.RoboticMultiClickSys = exp_RoboticMultiClickSys;