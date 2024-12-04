var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveToolToTargetsCom = exports.MoveToolToTargetInfo = undefined;
var r_OperationToolCom = require("OperationToolCom");
var r_ToolComBase = require("ToolComBase");
var r_ExecuteBehaviorInfo = require("ExecuteBehaviorInfo");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var d = _decorator.requireComponent;
var exp_MoveToolToTargetInfo = function () {
  function _ctor() {
    this.finishedBehaviors = null;
    this.target = null;
  }
  __decorate([_property({
    displayName: "拖动工具到目标位置后执行",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], _ctor.prototype, "finishedBehaviors", undefined);
  __decorate([_property({
    displayName: "目标位置",
    type: cc.Node
  })], _ctor.prototype, "target", undefined);
  return __decorate([_ccclass("MoveToolToTargetInfo")], _ctor);
}();
exports.MoveToolToTargetInfo = exp_MoveToolToTargetInfo;
var exp_MoveToolToTargetsCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.checkPoint = null;
    t.targets = [];
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "检测点",
    type: cc.Node,
    tooltip: "检测点,如果没有,以自身位置为检测点"
  })], _ctor.prototype, "checkPoint", undefined);
  __decorate([_property({
    displayName: "目标位置信息",
    type: [exp_MoveToolToTargetInfo]
  })], _ctor.prototype, "targets", undefined);
  return __decorate([_ccclass, d(r_OperationToolCom.OperationToolCom), _menu("新系统/工具/拖动工具到一些指定位置")], _ctor);
}(r_ToolComBase.ToolComBase);
exports.MoveToolToTargetsCom = exp_MoveToolToTargetsCom;