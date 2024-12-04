Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimerSys = undefined;
var r_DecorateBehavior = require("DecorateBehavior");
var r_TimerCom = require("TimerCom");
var r_BehaviorMgr = require("BehaviorMgr");
var exp_TimerSys = function () {
  function _ctor() {}
  _ctor.prototype.trigger = function () {
    this.timerChange();
  };
  _ctor.prototype.onStart = function () {
    this.timer = this.entity.keyTimer;
    this.event = this.entity.events;
    this.time = Number(this.entity.time);
  };
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.timerChange = function () {
    var e = this;
    clearTimeout(this.timer);
    this.timer = setTimeout(function () {
      r_BehaviorMgr.BehaviorMgr.trigger(e.event);
    }, 1e3 * this.time);
  };
  return __decorate([r_DecorateBehavior.bindActionCom(r_TimerCom.TimerCom)], _ctor);
}();
exports.TimerSys = exp_TimerSys;