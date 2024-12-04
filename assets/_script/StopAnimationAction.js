var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StopAnimationAction = undefined;
var r_ActionBase = require("ActionBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
_decorator.property;
_decorator.menu;
var exp_StopAnimationAction = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  _ctor.prototype.onTrigger = function () {
    e.prototype.onTrigger.call(this);
    var t = this.target.getComponent(sp.Skeleton);
    t && (t.paused = true);
  };
  return __decorate([_ccclass("StopAnimationAction")], _ctor);
}(r_ActionBase.ActionBase);
exports.StopAnimationAction = exp_StopAnimationAction;