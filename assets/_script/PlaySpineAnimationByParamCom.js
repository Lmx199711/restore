var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlaySpineAnimationByParamCom = undefined;
var r_BehaviorComBase = require("BehaviorComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_PlaySpineAnimationByParamCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.isDefaultLoop = false;
    t.defaultAnimationName = "animation";
    t.cannotDragPlaying = true;
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "默认是否循环"
  })], _ctor.prototype, "isDefaultLoop", undefined);
  __decorate([_property({
    displayName: "默认动画名称"
  })], _ctor.prototype, "defaultAnimationName", undefined);
  __decorate([_property({
    type: sp.Skeleton,
    displayName: "播放动画的spine节点"
  })], _ctor.prototype, "skNode", undefined);
  return __decorate([_ccclass("PlaySpineAnimationByParamCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.PlaySpineAnimationByParamCom = exp_PlaySpineAnimationByParamCom;