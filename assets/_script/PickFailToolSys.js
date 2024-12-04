Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickFailToolSys = undefined;
var r_DecorateBehavior = require("DecorateBehavior");
var r_BehaviorDef = require("BehaviorDef");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_TYEventType = require("TYEventType");
var r_PickFailToolCom = require("PickFailToolCom");
var exp_PickFailToolSys = function () {
  function _ctor() {
    this.nippingCount = 0;
  }
  _ctor.prototype.onStart = function () {};
  _ctor.prototype.onEnable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.addTouchNode(this.entity.node);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOL_DRAG_TOUCH_START, this.onDragBegin, this);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_MOVE, this.onCheck, this);
    switch (this.entity.judgeMode) {
      case r_BehaviorDef.DragJudgeMode.抬起时检测:
        this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOL_DRAG_TOUCH_END, this.onDragEnd, this);
        break;
      case r_BehaviorDef.DragJudgeMode.移到位置时检测:
    }
  };
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.onDisable = function () {};
  _ctor.prototype.onDragBegin = function () {
    this.startX = this.entity.node.x;
    this.startY = this.entity.node.y;
  };
  _ctor.prototype.onDragEnd = function () {};
  _ctor.prototype.onCheck = function () {};
  return __decorate([r_DecorateBehavior.bindEventCom(r_PickFailToolCom.PickFailToolCom)], _ctor);
}();
exports.PickFailToolSys = exp_PickFailToolSys;