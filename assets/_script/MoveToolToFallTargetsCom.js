var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveToolToFallTargetsCom = exports.MoveToolToFallTargetInfo = undefined;
var r_OperationToolCom = require("OperationToolCom");
var r_ToolComBase = require("ToolComBase");
var r_ExecuteBehaviorInfo = require("ExecuteBehaviorInfo");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var d = _decorator.requireComponent;
var exp_MoveToolToFallTargetInfo = function () {
  function _ctor() {
    this.finishedBehaviors = null;
    this.target = null;
    this.fallTarget = null;
    this.costTime = 1;
    this.isFalled = false;
  }
  __decorate([_property({
    displayName: "拖动工具到目标位置后执行",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], _ctor.prototype, "finishedBehaviors", undefined);
  __decorate([_property({
    displayName: "掉落物体",
    type: cc.Node
  })], _ctor.prototype, "target", undefined);
  __decorate([_property({
    displayName: "目标掉落点",
    type: cc.Node
  })], _ctor.prototype, "fallTarget", undefined);
  __decorate([_property({
    displayName: "所需时间",
    type: cc.Float
  })], _ctor.prototype, "costTime", undefined);
  return __decorate([_ccclass("MoveToolToFallTargetInfo")], _ctor);
}();
exports.MoveToolToFallTargetInfo = exp_MoveToolToFallTargetInfo;
var exp_MoveToolToFallTargetsCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.checkPoint = null;
    t.targets = [];
    t.completedBehaviors = null;
    t.falledCount = 0;
    t.totalCount = 0;
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "检测点",
    type: cc.Node,
    tooltip: "检测点,如果没有,以自身位置为检测点"
  })], _ctor.prototype, "checkPoint", undefined);
  __decorate([_property({
    displayName: "掉落物体信息",
    type: [exp_MoveToolToFallTargetInfo]
  })], _ctor.prototype, "targets", undefined);
  __decorate([_property({
    displayName: "所有物体掉落完后，抬起执行的行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], _ctor.prototype, "completedBehaviors", undefined);
  return __decorate([_ccclass, d(r_OperationToolCom.OperationToolCom), _menu("新系统/工具/拖动工具碰撞掉落物体")], _ctor);
}(r_ToolComBase.ToolComBase);
exports.MoveToolToFallTargetsCom = exp_MoveToolToFallTargetsCom;