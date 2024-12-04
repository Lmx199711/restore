var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StopSpineAnimationCom = undefined;
var r_BehaviorComBase = require("BehaviorComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_StopSpineAnimationCom = function (e) {
  function _ctor() {
    return null !== e && e.apply(this, arguments) || this;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "停止动画的节点",
    type: cc.Node
  })], _ctor.prototype, "node", undefined);
  return __decorate([_ccclass("StopSpineAnimationCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.StopSpineAnimationCom = exp_StopSpineAnimationCom;