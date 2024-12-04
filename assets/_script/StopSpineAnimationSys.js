Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StopSpineAnimationSys = undefined;
var r_StopSpineAnimationCom = require("StopSpineAnimationCom");
var r_DecorateBehavior = require("DecorateBehavior");
var exp_StopSpineAnimationSys = function () {
  function _ctor() {}
  _ctor.prototype.trigger = function () {
    var e = this.entity.node.getComponent(sp.Skeleton);
    e && (e.paused = true);
  };
  _ctor.prototype.onStart = function () {};
  _ctor.prototype.onDestroy = function () {};
  return __decorate([r_DecorateBehavior.bindActionCom(r_StopSpineAnimationCom.StopSpineAnimationCom)], _ctor);
}();
exports.StopSpineAnimationSys = exp_StopSpineAnimationSys;