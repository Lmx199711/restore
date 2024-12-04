var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragDirectionCom = undefined;
var r_ExecuteBehaviorInfo = require("ExecuteBehaviorInfo");
var r_EventComBase = require("EventComBase");
var r_BehaviorDef = require("BehaviorDef");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_DragDirectionCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.moveDis = 40;
    t.dirAngle = 0;
    t.moveLeft = false;
    t.moveRight = false;
    t.moveUp = true;
    t.moveDown = false;
    t.needRubTime = 0;
    t.isDragItem = true;
    t.resetMode = r_BehaviorDef.DragEndResetMode.失败后重置;
    t.targetHideMode = false;
    t.isDisableTouch = false;
    t.beginEvent = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    t.endEvent = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    t.successEvent = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "拖动最小距离"
  })], _ctor.prototype, "moveDis", undefined);
  __decorate([_property({
    displayName: "拖动最大角度"
  })], _ctor.prototype, "dirAngle", undefined);
  __decorate([_property({
    displayName: "向左拖动"
  })], _ctor.prototype, "moveLeft", undefined);
  __decorate([_property({
    displayName: "向右拖动"
  })], _ctor.prototype, "moveRight", undefined);
  __decorate([_property({
    displayName: "向上拖动"
  })], _ctor.prototype, "moveUp", undefined);
  __decorate([_property({
    displayName: "向下拖动"
  })], _ctor.prototype, "moveDown", undefined);
  __decorate([_property({
    displayName: "摩擦时间"
  })], _ctor.prototype, "needRubTime", undefined);
  __decorate([_property({
    displayName: "是否拖拽对象"
  })], _ctor.prototype, "isDragItem", undefined);
  __decorate([_property({
    type: cc.Enum(r_BehaviorDef.DragEndResetMode),
    displayName: "是否重置回初始点？"
  })], _ctor.prototype, "resetMode", undefined);
  __decorate([_property({
    displayName: "成功后是否隐藏目标节点"
  })], _ctor.prototype, "targetHideMode", undefined);
  __decorate([_property({
    displayName: "成功后是否禁用点击"
  })], _ctor.prototype, "isDisableTouch", undefined);
  __decorate([_property({
    displayName: "拖动开始事件"
  })], _ctor.prototype, "beginEvent", undefined);
  __decorate([_property({
    displayName: "拖动结束事件"
  })], _ctor.prototype, "endEvent", undefined);
  __decorate([_property({
    displayName: "成功后事件",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], _ctor.prototype, "successEvent", undefined);
  return __decorate([_ccclass, _menu("新系统/玩家操作/按指定方向拖动")], _ctor);
}(r_EventComBase.EventComBase);
exports.DragDirectionCom = exp_DragDirectionCom;