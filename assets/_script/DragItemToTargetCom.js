var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragItemToTargetCom = undefined;
var r_ExecuteBehaviorInfo = require("ExecuteBehaviorInfo");
var r_PlaceItemToTargetInfo = require("PlaceItemToTargetInfo");
var r_EventComBase = require("EventComBase");
var r_BehaviorDef = require("BehaviorDef");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var _menu = _decorator.menu;
var exp_DragItemToTargetCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.dragToTarget = false;
    t.resetMode = r_BehaviorDef.DragEndResetMode.拖拽后永不重置;
    t.targetHideMode = r_BehaviorDef.DragEndTargetHide.不隐藏;
    t.childNodeName = "childHide";
    t.targets = [];
    t.delayAddKey = 0;
    t.isExpand = false;
    t.beginEvent = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    t.endEvent = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    t.failTriggerAction = new r_ExecuteBehaviorInfo.ExecuteBehaviorInfo();
    return t;
  }
  __extends(_ctor, e);
  __decorate([_property({
    displayName: "拖拽到目标",
    tooltip: "是否拖动到目标"
  })], _ctor.prototype, "dragToTarget", undefined);
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
    displayName: "拖动到的目标",
    tooltip: "可以放置的节点",
    visible: function () {
      return this.dragToTarget;
    },
    type: r_PlaceItemToTargetInfo.PlaceItemToTargetInfo
  })], _ctor.prototype, "targets", undefined);
  __decorate([_property({
    displayName: "高级组"
  })], _ctor.prototype, "isExpand", undefined);
  __decorate([_property({
    displayName: "拖动开始事件",
    visible: function () {
      return this.isExpand;
    }
  })], _ctor.prototype, "beginEvent", undefined);
  __decorate([_property({
    displayName: "拖动结束事件",
    visible: function () {
      return this.isExpand;
    }
  })], _ctor.prototype, "endEvent", undefined);
  __decorate([_property({
    displayName: "没有任何目标被命中时执行",
    type: r_ExecuteBehaviorInfo.ExecuteBehaviorInfo,
    visible: function () {
      return this.dragToTarget;
    }
  })], _ctor.prototype, "failTriggerAction", undefined);
  return __decorate([_ccclass, _menu("新系统/玩家操作/拖动到物体到指定位置(抬起识别)")], _ctor);
}(r_EventComBase.EventComBase);
exports.DragItemToTargetCom = exp_DragItemToTargetCom;