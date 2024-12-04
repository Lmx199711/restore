Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StartBehaviorSys = undefined;
var r_DecorateBehavior = require("DecorateBehavior");
var r_StartBehaviorCom = require("StartBehaviorCom");
var r_BehaviorMgr = require("BehaviorMgr");
var exp_StartBehaviorSys = function () {
  function _ctor() {}
  _ctor.prototype.trigger = function () {};
  _ctor.prototype.onStart = function () {
    var e = this;
    r_BehaviorMgr.BehaviorMgr.timeout(.1, function () {
      r_BehaviorMgr.BehaviorMgr.trigger(e.entity.behaviorId);
    });
  };
  _ctor.prototype.onDestroy = function () {};
  return __decorate([r_DecorateBehavior.bindActionCom(r_StartBehaviorCom.StartBehaviorCom)], _ctor);
}();
exports.StartBehaviorSys = exp_StartBehaviorSys;