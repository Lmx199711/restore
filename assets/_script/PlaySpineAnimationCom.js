var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlaySpineAnimationCom = undefined;
var r_BehaviorComBase = require("BehaviorComBase");
var r_ExecuteBehaviorInfoByKeys = require("ExecuteBehaviorInfoByKeys");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
_decorator.menu;
var exp_PlaySpineAnimationCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.isLoop = false;
    t.finishBehavior = [];
    t.animationName = "";
    t.isResume = false;
    t.skinName = "";
    t.hideWhenFinish = false;
    t.cannotDragPlaying = true;
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "是否需要循环播放"
  })], _ctor.prototype, "isLoop", undefined);
  __decorate([_property({
    displayName: "播放完的行为",
    tooltip: "结束后播放后所有行为",
    type: r_ExecuteBehaviorInfoByKeys.ExecuteBehaviorInfoByKeys,
    visible: function () {
      return !this.isLoop;
    }
  })], _ctor.prototype, "finishBehavior", undefined);
  __decorate([_property({
    displayName: "播放动画的名字"
  })], _ctor.prototype, "animationName", undefined);
  __decorate([_property({
    displayName: "恢复模式",
    tooltip: "勾选则每次触发会切换动画的状态:(暂停/恢复)",
    visible: function () {
      return this.animationName.length > 0;
    }
  })], _ctor.prototype, "isResume", undefined);
  __decorate([_property({
    displayName: "播放动画的皮肤"
  })], _ctor.prototype, "skinName", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "播放动画的spine节点"
  })], _ctor.prototype, "node", undefined);
  __decorate([_property({
    displayName: "该动画完成后隐藏节点"
  })], _ctor.prototype, "hideWhenFinish", undefined);
  __decorate([_property({
    displayName: "在播放动画的时候是否禁用拖拽"
  })], _ctor.prototype, "cannotDragPlaying", undefined);
  return __decorate([_ccclass("PlaySpineAnimationCom")], _ctor);
}(r_BehaviorComBase.BehaviorComBase);
exports.PlaySpineAnimationCom = exp_PlaySpineAnimationCom;