Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveToolToFallTargets = undefined;
var r_DecorateBehavior = require("DecorateBehavior");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_TYEventType = require("TYEventType");
var r_CommonFunc = require("CommonFunc");
var r_MoveToolToFallTargetsCom = require("MoveToolToFallTargetsCom");
var exp_MoveToolToFallTargets = function () {
  function _ctor() {
    this.curCheckPoint = new cc.Vec2(0, 0);
  }
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.onDisable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.removeTouchNode(this.entity.node);
    this.entity.node.off(r_TYEventType.TYEventType.ToolEvent.TOOL_DRAG_TOUCH_START, this.onToolStart, this);
    this.entity.node.off(r_TYEventType.TYEventType.ToolEvent.TOOL_DRAG_TOUCH_END, this.onToolEnd, this);
    this.entity.node.off(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_MOVE, this.onToolMove, this);
  };
  _ctor.prototype.onEnable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.addTouchNode(this.entity.node);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOL_DRAG_TOUCH_START, this.onToolStart, this);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOL_DRAG_TOUCH_END, this.onToolEnd, this);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_MOVE, this.onToolMove, this);
  };
  _ctor.prototype.onStart = function () {
    this.entity.falledCount = 0;
    this.entity.totalCount = this.entity.targets.length;
  };
  _ctor.prototype.onToolStart = function () {
    if (this.entity.checkPoint) {
      this.entity.checkPoint.convertToWorldSpaceAR(cc.Vec2.ZERO, this.curCheckPoint);
    } else {
      this.entity.node.convertToWorldSpaceAR(cc.Vec2.ZERO, this.curCheckPoint);
    }
  };
  _ctor.prototype.onToolMove = function () {
    if (this.entity.checkPoint) {
      this.entity.checkPoint.convertToWorldSpaceAR(cc.Vec2.ZERO, this.curCheckPoint);
    } else {
      this.entity.node.convertToWorldSpaceAR(cc.Vec2.ZERO, this.curCheckPoint);
    }
    for (var e = 0; e < this.entity.targets.length; e++) {
      var t = this.entity.targets[e];
      if (!t.isFalled && r_CommonFunc.checkTouchNode(this.curCheckPoint, t.target)) {
        this.entity.falledCount++;
        t.isFalled = true;
        cc.tween(t.target).to(t.costTime, {
          x: t.fallTarget.x,
          y: t.fallTarget.y
        }).start();
        t.finishedBehaviors && t.finishedBehaviors.execute();
      }
    }
  };
  _ctor.prototype.onToolEnd = function () {
    this.entity.falledCount >= this.entity.totalCount && this.entity.completedBehaviors && this.entity.completedBehaviors.execute();
  };
  return __decorate([r_DecorateBehavior.bindEventCom(r_MoveToolToFallTargetsCom.MoveToolToFallTargetsCom)], _ctor);
}();
exports.MoveToolToFallTargets = exp_MoveToolToFallTargets;