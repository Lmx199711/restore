Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveToolToTargetSys = undefined;
var r_MoveToolToTargetCom = require("MoveToolToTargetCom");
var r_DecorateBehavior = require("DecorateBehavior");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_TYEventType = require("TYEventType");
var r_CommonFunc = require("CommonFunc");
var r_BehaviorMgr = require("BehaviorMgr");
var exp_MoveToolToTargetSys = function () {
  function _ctor() {
    this.curCheckPoint = new cc.Vec2(0, 0);
    this.isFinish = false;
  }
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.onDisable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.removeTouchNode(this.entity.node);
    this.entity.node.off(r_TYEventType.TYEventType.ToolEvent.TOOL_DRAG_TOUCH_END, this.onToolEnd, this);
    this.entity.node.off(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_MOVE, this.onToolMove, this);
  };
  _ctor.prototype.onEnable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.addTouchNode(this.entity.node);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOL_DRAG_TOUCH_END, this.onToolEnd, this);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_MOVE, this.onToolMove, this);
  };
  _ctor.prototype.onStart = function () {
    this.isFinish = false;
  };
  _ctor.prototype.onToolMove = function () {
    if (this.entity.checkPoint) {
      this.entity.checkPoint.convertToWorldSpaceAR(cc.Vec2.ZERO, this.curCheckPoint);
    } else {
      this.entity.node.convertToWorldSpaceAR(cc.Vec2.ZERO, this.curCheckPoint);
    }
  };
  _ctor.prototype.onToolEnd = function (e, t) {
    var o = this;
    this.isFinish || t || r_CommonFunc.checkTouchNode(this.curCheckPoint, this.entity.targetPos) && (this.isFinish = true, this.entity.showTargetNode && (this.entity.showTargetNode.active = true), this.entity.finishedBehaviors && this.entity.finishedBehaviors.execute(), this.entity.isAdsorb && (this.entity.isChangeParent ? r_CommonFunc.changNodeParent(this.entity.node, this.entity.targetPos, false) : r_CommonFunc.setNodePosToTargetPos(this.entity.node, this.entity.targetPos)), this.entity.node.active = !this.entity.hideOwner, this.entity.delayShowOwner > 0 && !this.entity.hideOwner && (this.entity.node.active = false, r_BehaviorMgr.BehaviorMgr.timeout(this.entity.delayShowOwner, function () {
      o.entity.node.active = true;
    })), this.entity.isShowOtherNode && this.entity.otherNodeInfo.forEach(function (e) {
      if (e.delay > 0) {
        r_BehaviorMgr.BehaviorMgr.timeout(e.delay, function () {
          e.node.active = e.isShow;
        });
      } else {
        e.node.active = e.isShow;
      }
    }));
  };
  return __decorate([r_DecorateBehavior.bindEventCom(r_MoveToolToTargetCom.MoveToolToTargetCom)], _ctor);
}();
exports.MoveToolToTargetSys = exp_MoveToolToTargetSys;