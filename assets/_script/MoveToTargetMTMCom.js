var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveToTargetMTMCom = undefined;
var r_OperationToolCom = require("OperationToolCom");
var r_ExecuteBehaviorInfo = require("ExecuteBehaviorInfo");
var r_ToolComBase = require("ToolComBase");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var d = _decorator.requireComponent;
var y = function () {
  function e() {
    this.pickOriginNode = null;
    this.putTargetNode = null;
    this.putTargetShowNode = null;
    this.putCompleted = false;
    this.pickCompleted = false;
  }
  __decorate([_property({
    displayName: "拾取的节点",
    type: cc.Node
  })], e.prototype, "pickOriginNode", undefined);
  __decorate([_property({
    displayName: "放置的节点",
    type: cc.Node,
    tooltip: "放置时作为放置的父节点"
  })], e.prototype, "putTargetNode", undefined);
  __decorate([_property({
    displayName: "放置之后显示的节点",
    type: cc.Node
  })], e.prototype, "putTargetShowNode", undefined);
  return __decorate([_ccclass("MTMInfo")], e);
}();
var exp_MoveToTargetMTMCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.isAllFinish = false;
    t.pickInfo = [];
    t.putArea = null;
    t.isSort = false;
    t.putScale = false;
    t.pickBehavior = null;
    t.putBehavior = null;
    t.finishedBehaviors = null;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "hasPickInfo", {
    get: function () {
      return 0 != this.pickInfo.length;
    },
    enumerable: false,
    configurable: true
  });
  __decorate([_property({
    displayName: "移动信息",
    type: [y]
  })], _ctor.prototype, "pickInfo", undefined);
  __decorate([_property({
    displayName: "放置的目标区域",
    type: cc.Node,
    visible: function () {
      return this.hasPickInfo;
    }
  })], _ctor.prototype, "putArea", undefined);
  __decorate([_property({
    displayName: "是否是一一对应",
    tooltip: "如果不勾选,放下时可以是设置的任意一个位置",
    visible: function () {
      return this.hasPickInfo;
    }
  })], _ctor.prototype, "isSort", undefined);
  __decorate([_property({
    displayName: "放下时缩放"
  })], _ctor.prototype, "putScale", undefined);
  __decorate([_property({
    displayName: "按下时的行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo,
    visible: function () {
      return this.hasPickInfo;
    }
  })], _ctor.prototype, "pickBehavior", undefined);
  __decorate([_property({
    displayName: "移动到目标时的行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo,
    visible: function () {
      return this.hasPickInfo;
    }
  })], _ctor.prototype, "putBehavior", undefined);
  __decorate([_property({
    displayName: "完成后执行的行为",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo
  })], _ctor.prototype, "finishedBehaviors", undefined);
  return __decorate([_ccclass, d(r_OperationToolCom.OperationToolCom), _menu("新系统/工具/将多个物体移动到指定的位置")], _ctor);
}(r_ToolComBase.ToolComBase);
exports.MoveToTargetMTMCom = exp_MoveToTargetMTMCom;