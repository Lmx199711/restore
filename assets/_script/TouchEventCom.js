var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TouchEventCom = exports.DragItemComNodeInfo = undefined;
var r_ExecuteBehaviorInfo = require("ExecuteBehaviorInfo");
var r_EventComBase = require("EventComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_DragItemComNodeInfo = function () {
  function _ctor() {
    this.target = null;
    this.isShow = false;
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "节点"
  })], _ctor.prototype, "target", undefined);
  __decorate([_property({
    displayName: "显示"
  })], _ctor.prototype, "isShow", undefined);
  return __decorate([_ccclass("DragItemComNodeInfo")], _ctor);
}();
exports.DragItemComNodeInfo = exp_DragItemComNodeInfo;
var exp_TouchEventCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.startTouchNodes = [];
    t.startTouchActionId = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    t.endTouchNodes = [];
    t.endTouchActionId = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    t.clickActions = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    type: [exp_DragItemComNodeInfo],
    displayName: "开始触摸显示隐藏的物体"
  })], _ctor.prototype, "startTouchNodes", undefined);
  __decorate([_property({
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo,
    displayName: "开始触摸执行的行为"
  })], _ctor.prototype, "startTouchActionId", undefined);
  __decorate([_property({
    type: [exp_DragItemComNodeInfo],
    displayName: "结束触摸显示隐藏的物体"
  })], _ctor.prototype, "endTouchNodes", undefined);
  __decorate([_property({
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo,
    displayName: "结束触摸执行的行为"
  })], _ctor.prototype, "endTouchActionId", undefined);
  __decorate([_property({
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo,
    displayName: "点击需要触发的行为"
  })], _ctor.prototype, "clickActions", undefined);
  return __decorate([_ccclass, _menu("新系统/玩家操作/按下和抬起事件")], _ctor);
}(r_EventComBase.EventComBase);
exports.TouchEventCom = exp_TouchEventCom;