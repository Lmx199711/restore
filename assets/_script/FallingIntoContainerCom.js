var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FallingIntoContainerCom = undefined;
var r_ToolComBase = require("ToolComBase");
var r_OperationToolCom = require("OperationToolCom");
var r_ExecuteBehaviorInfo = require("ExecuteBehaviorInfo");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var d = _decorator.requireComponent;
var exp_FallingIntoContainerCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.triggerNode = [];
    t.containerNode = [];
    t.isOneByOne = true;
    t.checkNode = null;
    t.containerRoot = null;
    t.checkFallInContainerArea = null;
    t.containerMinY = 50;
    t.followToolNode = null;
    t.fallMinY = 0;
    t.fallSpeed = 800;
    t.showWhenFallScreen = false;
    t.triggerBehavior = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    t.showConNodeBehavior = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    t.finishedBehaviors = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    type: cc.Node,
    displayName: "掉落节点"
  })], _ctor.prototype, "triggerNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "容器中的节点",
    tooltip: "若和[掉落节点]长度不一致，会有不一样的表现，具体看sys里的注释"
  })], _ctor.prototype, "containerNode", undefined);
  __decorate([_property({
    displayName: "是否一一对应",
    tooltip: "勾选：第一个掉落会触发第一个容器节点，以此类推"
  })], _ctor.prototype, "isOneByOne", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "检测点"
  })], _ctor.prototype, "checkNode", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "容器根节点"
  })], _ctor.prototype, "containerRoot", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "检测是否掉落在容器中区域"
  })], _ctor.prototype, "checkFallInContainerArea", undefined);
  __decorate([_property({
    displayName: "容器跟随时最低位置",
    tooltip: "用于不能超出屏幕"
  })], _ctor.prototype, "containerMinY", undefined);
  __decorate([_property({
    type: cc.Node,
    displayName: "容器跟随道具节点"
  })], _ctor.prototype, "followToolNode", undefined);
  __decorate([_property({
    displayName: "掉落的最小y"
  })], _ctor.prototype, "fallMinY", undefined);
  __decorate([_property({
    displayName: "掉落速度"
  })], _ctor.prototype, "fallSpeed", undefined);
  __decorate([_property({
    displayName: "在掉出屏幕之后是否直接显示"
  })], _ctor.prototype, "showWhenFallScreen", undefined);
  __decorate([_property({
    displayName: "触碰到时执行的行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], _ctor.prototype, "triggerBehavior", undefined);
  __decorate([_property({
    displayName: "容器中显示时执行的行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], _ctor.prototype, "showConNodeBehavior", undefined);
  __decorate([_property({
    displayName: "完成后执行的行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], _ctor.prototype, "finishedBehaviors", undefined);
  return __decorate([_ccclass, d(r_OperationToolCom.OperationToolCom), _menu("新系统/工具/触碰掉落到容器中")], _ctor);
}(r_ToolComBase.ToolComBase);
exports.FallingIntoContainerCom = exp_FallingIntoContainerCom;