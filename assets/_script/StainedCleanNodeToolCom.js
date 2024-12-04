var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StainedCleanNodeToolCom = undefined;
var r_ExecuteBehaviorInfo = require("ExecuteBehaviorInfo");
var r_ToolComBase = require("ToolComBase");
var r_OperationToolCom = require("OperationToolCom");
var r_CleanNodeInfo = require("CleanNodeInfo");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var y = _decorator.requireComponent;
var f = function () {
  function e() {
    this.colorNode = null;
    this.stainedBehavior = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
  }
  __decorate([_property({
    type: cc.Node,
    displayName: "颜色的节点"
  })], e.prototype, "colorNode", undefined);
  __decorate([_property({
    displayName: "选择颜色之后执行的action"
  })], e.prototype, "stainedBehavior", undefined);
  return __decorate([_ccclass("StainedColorInfo")], e);
}();
var exp_StainedCleanNodeToolCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.cleanInfos = [];
    t.cleanPoint = null;
    t.finishedBehaviors = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    t.stainedTime = 0;
    t.stainedColorInfos = [];
    t.stainedColorIndex = 0;
    t.stainedCostTime = 0;
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "清理组件",
    type: r_CleanNodeInfo.CleanNodeInfo
  })], _ctor.prototype, "cleanInfos", undefined);
  __decorate([_property({
    displayName: "清理点",
    type: cc.Node
  })], _ctor.prototype, "cleanPoint", undefined);
  __decorate([_property({
    displayName: "完成后执行的行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], _ctor.prototype, "finishedBehaviors", undefined);
  __decorate([_property({
    displayName: "沾色所需时间（单位：秒）",
    type: cc.Float
  })], _ctor.prototype, "stainedTime", undefined);
  __decorate([_property({
    displayName: "能够沾的颜色",
    type: f
  })], _ctor.prototype, "stainedColorInfos", undefined);
  return __decorate([_ccclass, y(r_OperationToolCom.OperationToolCom), _menu("新系统/工具/沾上颜色之后再清理的工具")], _ctor);
}(r_ToolComBase.ToolComBase);
exports.StainedCleanNodeToolCom = exp_StainedCleanNodeToolCom;