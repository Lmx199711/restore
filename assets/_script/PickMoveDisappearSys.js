Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickMoveDisappearSys = undefined;
var r_DecorateBehavior = require("DecorateBehavior");
var r_RelaxLevelLogicSystem = require("RelaxLevelLogicSystem");
var r_PickMoveDisappearCom = require("PickMoveDisappearCom");
var r_TYEventType = require("TYEventType");
var r_CommonFunc = require("CommonFunc");
var r_SoundMgr = require("SoundMgr");
var exp_PickMoveDisappearSys = function () {
  function _ctor() {
    this.disappearDisSq = 0;
    this.pickX = 0;
    this.pickY = 0;
    this.startX = 0;
    this.startY = 0;
    this.isFinish = false;
    this.curPickIndex = -1;
  }
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.onDisable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.removeTouchNode(this.entity.node);
    this.entity.node.off(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_MOVE, this.onMove, this);
    this.entity.node.off(r_TYEventType.TYEventType.ToolEvent.TOOL_DRAG_TOUCH_END, this.onTouchEnd, this);
  };
  _ctor.prototype.onEnable = function () {
    r_RelaxLevelLogicSystem.RelaxLevelLogicSystem.addTouchNode(this.entity.node);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOl_DRAG_MOVE, this.onMove, this);
    this.entity.node.on(r_TYEventType.TYEventType.ToolEvent.TOOL_DRAG_TOUCH_END, this.onTouchEnd, this);
  };
  _ctor.prototype.onStart = function () {
    this.curPickIndex = -1;
    this.disappearDisSq = this.entity.moveDistance * this.entity.moveDistance;
    null == this.entity.pickPoint && console.error("没有设置拾取点,", this.entity.node);
  };
  _ctor.prototype.onMove = function () {
    this.checkPick();
    this.checkDisappear();
  };
  _ctor.prototype.onTouchEnd = function () {
    this.reset();
    this.checkFinish();
  };
  _ctor.prototype.reset = function () {
    if (-1 != this.curPickIndex) {
      var e = this.entity.pickInfo[this.curPickIndex].targetNode;
      e.parent = this.pickNodeParentNode;
      e.x = this.startX;
      e.y = this.startY;
      this.curPickIndex = -1;
    }
  };
  _ctor.prototype.checkFinish = function () {
    if (!this.isFinish) {
      var e = true;
      this.entity.pickInfo.forEach(function (t) {
        return e && (e = t.isDisappeared);
      });
      if (e) {
        this.entity.finishedBehaviors.execute();
        this.isFinish = true;
      }
    }
  };
  _ctor.prototype.checkPick = function () {
    if (-1 == this.curPickIndex) {
      for (var e = 0; e < this.entity.pickInfo.length; e++) {
        var t = this.entity.pickInfo[e];
        if (!t.isDisappeared && r_CommonFunc.checkNodeOverOtherNode(this.entity.pickPoint, t.targetNode)) {
          this.startX = t.targetNode.x;
          this.startY = t.targetNode.y;
          this.pickNodeParentNode = t.targetNode.parent;
          t.targetNode.parent = this.entity.pickPoint;
          t.targetNode.x = t.targetNode.y = 0;
          this.curPickIndex = e;
          this.pickX = this.entity.node.x;
          this.pickY = this.entity.node.y;
          this.entity.pickSound && r_SoundMgr.SoundMgr.playSound(this.entity.pickSound);
          break;
        }
      }
    }
  };
  _ctor.prototype.checkDisappear = function () {
    if (-1 != this.curPickIndex) {
      var e = this.entity.node.x - this.pickX;
      var t = this.entity.node.y - this.pickY;
      if ((e *= e) + (t *= t) > this.disappearDisSq) {
        this.entity.pickInfo[this.curPickIndex].targetNode.active = false;
        this.entity.pickInfo[this.curPickIndex].isDisappeared = true;
        this.curPickIndex = -1;
        this.entity.disappearSound && r_SoundMgr.SoundMgr.playSound(this.entity.disappearSound);
      }
    }
  };
  return __decorate([r_DecorateBehavior.bindEventCom(r_PickMoveDisappearCom.PickMoveDisappearCom)], _ctor);
}();
exports.PickMoveDisappearSys = exp_PickMoveDisappearSys;