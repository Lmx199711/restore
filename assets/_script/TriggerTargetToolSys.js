Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerTargetToolSys = undefined;
var r_TYEventType = require("TYEventType");
var r_TriggerTargetToolCom = require("TriggerTargetToolCom");
var r_DecorateBehavior = require("DecorateBehavior");
var r_CommonFunc = require("CommonFunc");
var r_BehaviorMgr = require("BehaviorMgr");
var r_BehaviorDef = require("BehaviorDef");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var exp_TriggerTargetToolSys = function () {
  function _ctor() {
    this.nodeArray = [];
    this.isExpand = false;
  }
  _ctor.prototype.onStart = function () {
    this.nodeArray = this.entity.isSingleNode == r_BehaviorDef.TargetAmountMode.单个 ? [this.entity.target] : this.entity.targetArray;
    if (this.entity.isExpand) {
      this.isExpand = this.entity.isExpand;
      this.transformIn = this.entity.transformIn;
      this.transformOut = this.entity.transformOut;
    }
    this.zIndex = this.entity.node.getSiblingIndex();
  };
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.onEnable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.addTouchNode(this.entity.node);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOL_DRAG_TOUCH_START, this.onDragBegin, this);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_MOVE, this.onAreaStaying, this);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOL_DRAG_TOUCH_END, this.onDragEnd, this);
    switch (this.entity.judgeMode) {
      case r_BehaviorDef.DragJudgeMode.抬起时检测:
        break;
      case r_BehaviorDef.DragJudgeMode.移到位置时检测:
        this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_MOVE, this.onCheck, this);
    }
  };
  _ctor.prototype.onDisable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.removeTouchNode(this.entity.node);
  };
  _ctor.prototype.onCheck = function (e) {
    var t = r_CommonFunc.findPlaceTargetIndex(e, this.nodeArray);
    if (t > -1) {
      this.doTrigger(this.nodeArray[t]);
      this.nodeArray.splice(t, 1);
      if (!(this.entity.resetMode != r_BehaviorDef.DragEndResetMode.成功后重置 && this.entity.resetMode != r_BehaviorDef.DragEndResetMode.成功失败重置)) {
        this.resetToHome();
        r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.stopDrag();
      }
    }
  };
  _ctor.prototype.onAreaStaying = function (e) {
    this.lastX = e.x;
    this.lastY = e.y;
  };
  _ctor.prototype.onDragBegin = function () {
    this.entity.node.setSiblingIndex(100);
    this.startX = this.entity.node.x;
    this.startY = this.entity.node.y;
    if (this.isExpand) {
      this.entity.node.scaleX *= this.transformIn.x;
      this.entity.node.scaleY *= this.transformIn.y;
      this.entity.node.angle = this.transformIn.z;
      this.entity.touchAction && r_BehaviorMgr.BehaviorMgr.executeBehavior(this.entity.touchAction);
    }
  };
  _ctor.prototype.onDragEnd = function () {
    this.entity.node.setSiblingIndex(this.zIndex);
    var e = new cc.Vec2(this.lastX, this.lastY);
    var t = r_CommonFunc.findPlaceTarget(e, this.nodeArray);
    if (t) {
      this.doTrigger(t);
      this.entity.resetMode != r_BehaviorDef.DragEndResetMode.成功后重置 && this.entity.resetMode != r_BehaviorDef.DragEndResetMode.成功失败重置 || this.resetToHome();
    } else {
      this.entity.resetMode != r_BehaviorDef.DragEndResetMode.失败后重置 && this.entity.resetMode != r_BehaviorDef.DragEndResetMode.成功失败重置 || this.resetToHome();
    }
  };
  _ctor.prototype.doTrigger = function (e) {
    var t = this;
    this.entity.triggerAction && r_BehaviorMgr.BehaviorMgr.executeBehavior(this.entity.triggerAction);
    switch (this.entity.targetHideMode) {
      case r_BehaviorDef.DragEndTargetHide.隐藏工具自身:
        this.entity.node.active = false;
        break;
      case r_BehaviorDef.DragEndTargetHide.隐藏父节点:
        e.targetArea.active = false;
        break;
      case r_BehaviorDef.DragEndTargetHide.隐藏子节点:
        e.targetArea.children.some(function (e) {
          if (e.name == t.entity.childNodeName) {
            e.active = false;
            return true;
          }
        });
    }
    if (null != e.placeNode) {
      this.entity.node.parent = e.placeNode;
      this.entity.node.active = true;
      this.entity.node.x = 0;
      this.entity.node.y = 0;
    }
    e.successBehaviors && r_BehaviorMgr.BehaviorMgr.executeBehavior(e.successBehaviors);
  };
  _ctor.prototype.resetToHome = function () {
    this.entity.node.x = this.startX;
    this.entity.node.y = this.startY;
    if (this.isExpand) {
      this.entity.node.scaleX *= this.transformOut.x;
      this.entity.node.scaleY *= this.transformOut.y;
      this.entity.node.angle = this.transformOut.z;
    }
  };
  return __decorate([r_DecorateBehavior.bindEventCom(r_TriggerTargetToolCom.TriggerTargetToolCom)], _ctor);
}();
exports.TriggerTargetToolSys = exp_TriggerTargetToolSys;