var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerTargetToolCom = undefined;
var r_BehaviorDef = require("BehaviorDef");
var r_PlaceItemToTargetInfo = require("PlaceItemToTargetInfo");
var r_ToolComBase = require("ToolComBase");
var r_OperationToolCom = require("OperationToolCom");
var r_ExecuteBehaviorInfo = require("ExecuteBehaviorInfo");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var f = _decorator.requireComponent;
var exp_TriggerTargetToolCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.judgeMode = r_BehaviorDef.DragJudgeMode.移到位置时检测;
    t.resetMode = r_BehaviorDef.DragEndResetMode.成功失败重置;
    t.targetHideMode = r_BehaviorDef.DragEndTargetHide.不隐藏;
    t.childNodeName = "childHide";
    t.isSingleNode = r_BehaviorDef.TargetAmountMode.单个;
    t.target = null;
    t.targetArray = [];
    t.isExpand = false;
    t.transformIn = cc.v3(1, 1, 0);
    t.transformOut = cc.v3(1, 1, 0);
    t.touchAction = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    t.triggerAction = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    type: cc.Enum(r_BehaviorDef.DragJudgeMode),
    displayName: "触发检测方式"
  })], _ctor.prototype, "judgeMode", undefined);
  __decorate([_property({
    type: cc.Enum(r_BehaviorDef.DragEndResetMode),
    displayName: "是否可以重置回初始点？"
  })], _ctor.prototype, "resetMode", undefined);
  __decorate([_property({
    type: cc.Enum(r_BehaviorDef.DragEndTargetHide),
    displayName: "拖拽成功后要不要隐藏目标节点"
  })], _ctor.prototype, "targetHideMode", undefined);
  __decorate([_property({
    displayName: "子节点名称",
    tooltip: "拖拽成功会导致其隐藏",
    visible: function () {
      return this.targetHideMode == r_BehaviorDef.DragEndTargetHide.隐藏子节点;
    }
  })], _ctor.prototype, "childNodeName", undefined);
  __decorate([_property({
    type: cc.Enum(r_BehaviorDef.TargetAmountMode),
    displayName: "目标数量"
  })], _ctor.prototype, "isSingleNode", undefined);
  __decorate([_property({
    displayName: "目标",
    tooltip: "可以放置的节点",
    type: r_PlaceItemToTargetInfo.PlaceItemToTargetInfo,
    visible: function () {
      return this.isSingleNode == r_BehaviorDef.TargetAmountMode.单个;
    }
  })], _ctor.prototype, "target", undefined);
  __decorate([_property({
    displayName: "目标们",
    tooltip: "可以放置的节点",
    type: r_PlaceItemToTargetInfo.PlaceItemToTargetInfo,
    visible: function () {
      return this.isSingleNode == r_BehaviorDef.TargetAmountMode.多个;
    }
  })], _ctor.prototype, "targetArray", undefined);
  __decorate([_property({
    displayName: "高级组"
  })], _ctor.prototype, "isExpand", undefined);
  __decorate([_property({
    displayName: "拖动开始时的缩放倍率和rotation",
    type: cc.Vec3,
    visible: function () {
      return this.isExpand;
    }
  })], _ctor.prototype, "transformIn", undefined);
  __decorate([_property({
    displayName: "重置时的缩放倍率和rotation",
    visible: function () {
      return this.isExpand;
    },
    type: cc.Vec3
  })], _ctor.prototype, "transformOut", undefined);
  __decorate([_property({
    visible: function () {
      return this.isExpand;
    },
    displayName: "拖动开始的事件",
    type: [r_ExecuteBehaviorInfo.ExecuteBehaviorInfo]
  })], _ctor.prototype, "touchAction", undefined);
  __decorate([_property({
    visible: function () {
      return this.isExpand;
    },
    displayName: "碰到物体的统一事件(可做音效)",
    type: [r_ExecuteBehaviorInfo.ExecuteBehaviorInfo]
  })], _ctor.prototype, "triggerAction", undefined);
  return __decorate([_ccclass, f(r_OperationToolCom.OperationToolCom), _menu("新系统/工具/拖动对象触发")], _ctor);
}(r_ToolComBase.ToolComBase);
exports.TriggerTargetToolCom = exp_TriggerTargetToolCom;